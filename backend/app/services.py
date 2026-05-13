from __future__ import annotations

from typing import List

from sqlalchemy import func, select
from sqlalchemy.orm import Session, selectinload

from .data import ASSISTANT_ANSWERS, CHAPTER_DATA, COURSE_DATA, QUESTION_BANK
from .models import EngineeringReportRecord, Enrollment, RagConfig, User
from .schemas import (
    AskAssistantResponse,
    Chapter,
    Course,
    GenerateQuizRequest,
    PermissionItem,
    QuizQuestion,
    RagConfigRead,
    RagConfigUpdate,
    ScoreResponse,
    TeacherOverview,
    TeacherReportRead,
    TeacherStudentRead,
)


class CourseService:
    @staticmethod
    def list_courses() -> List[Course]:
        return [Course(**item) for item in COURSE_DATA]

    @staticmethod
    def get_course(course_id: str) -> Course | None:
        for item in COURSE_DATA:
            if item["id"] == course_id:
                return Course(**item)
        return None

    @staticmethod
    def list_chapters(course_id: str) -> List[Chapter]:
        items = [Chapter(**item) for item in CHAPTER_DATA if item["course_id"] == course_id]
        return sorted(items, key=lambda chapter: chapter.order)

    @staticmethod
    def get_chapter(chapter_id: str) -> Chapter | None:
        for item in CHAPTER_DATA:
            if item["id"] == chapter_id:
                return Chapter(**item)
        return None


class QuizService:
    @staticmethod
    def generate_quiz(payload: GenerateQuizRequest) -> List[QuizQuestion]:
        questions = [
            QuizQuestion(**item)
            for item in QUESTION_BANK
            if item["chapter_id"] == payload.chapter_id
            and (not payload.question_types or item["type"] in payload.question_types)
        ]
        return questions[: payload.count]

    @staticmethod
    def score_short_answer(question_id: str, answer: str) -> ScoreResponse:
        score = 4
        strengths: List[str] = []
        weaknesses: List[str] = []
        evidence = [
            "定义块：栈具有后进先出特征。",
            "定义块：队列具有先进先出特征。",
            "案例块：括号匹配与广度优先搜索分别体现了栈和队列的典型应用。",
        ]

        if "后进先出" in answer or "栈" in answer:
            score += 2
            strengths.append("识别了栈的访问顺序。")
        else:
            weaknesses.append("没有准确说明栈的后进先出特征。")

        if "先进先出" in answer or "队列" in answer:
            score += 2
            strengths.append("识别了队列的访问顺序。")
        else:
            weaknesses.append("没有准确说明队列的先进先出特征。")

        if any(token in answer for token in ["括号", "广度优先", "排队", "函数调用"]):
            score += 2
            strengths.append("给出了可对应知识点的应用示例。")
        else:
            weaknesses.append("缺少应用场景示例。")

        if not strengths:
            strengths.append("答案与当前章节相关，但关键术语还不够完整。")

        return ScoreResponse(
            score=min(score, 10),
            max_score=10,
            strengths=strengths,
            weaknesses=weaknesses,
            feedback="评分时先按 rubric 提取得分点，再结合课程知识库切片校验证据，最后生成评价。",
            evidence=evidence,
        )


class AssistantService:
    @staticmethod
    def ask(question: str) -> AskAssistantResponse:
        result = ASSISTANT_ANSWERS.get(question)
        if result:
            return AskAssistantResponse(
                answer=result["answer"],
                evidence=result["evidence"],
                retrieval_mode="hybrid",
            )

        return AskAssistantResponse(
            answer="这个问题会先经过课程与章节过滤，再用向量检索召回细粒度知识块，并回查粗粒度摘要后生成回答。",
            evidence=[
                "粗粒度摘要：用于补足章节上下文。",
                "细粒度知识块：用于支撑具体定义、例题和步骤解释。",
            ],
            retrieval_mode="hybrid",
        )


class TeacherService:
    @staticmethod
    def get_overview(db: Session, course_id: str) -> TeacherOverview:
        enrollments = db.scalars(select(Enrollment).where(Enrollment.course_id == course_id)).all()
        report_count = db.scalar(
            select(func.count(EngineeringReportRecord.id)).where(
                EngineeringReportRecord.course_id == course_id,
                EngineeringReportRecord.status.in_(["submitted", "reviewing"]),
            )
        ) or 0

        if not enrollments:
            return TeacherOverview(
                course_id=course_id,
                student_count=0,
                average_progress=0,
                average_accuracy=0,
                risk_student_count=0,
                submitted_report_count=report_count,
            )

        return TeacherOverview(
            course_id=course_id,
            student_count=len(enrollments),
            average_progress=round(sum(item.progress for item in enrollments) / len(enrollments), 3),
            average_accuracy=round(sum(item.accuracy for item in enrollments) / len(enrollments), 3),
            risk_student_count=sum(1 for item in enrollments if item.risk_level == "需关注"),
            submitted_report_count=report_count,
        )

    @staticmethod
    def list_students(db: Session, course_id: str) -> list[TeacherStudentRead]:
        enrollments = db.scalars(
            select(Enrollment)
            .options(selectinload(Enrollment.student).selectinload(User.student_profile))
            .where(Enrollment.course_id == course_id)
            .order_by(Enrollment.class_name, Enrollment.id)
        ).all()

        result: list[TeacherStudentRead] = []
        for enrollment in enrollments:
            student = enrollment.student
            profile = student.student_profile
            result.append(
                TeacherStudentRead(
                    student_id=student.id,
                    username=student.username,
                    display_name=student.display_name,
                    class_name=enrollment.class_name,
                    progress=enrollment.progress,
                    accuracy=enrollment.accuracy,
                    activity_level=enrollment.activity_level,
                    risk_level=enrollment.risk_level,
                    last_active_at=enrollment.last_active_at,
                    profile=profile,
                )
            )
        return result

    @staticmethod
    def list_reports(db: Session, course_id: str) -> list[TeacherReportRead]:
        reports = db.scalars(
            select(EngineeringReportRecord)
            .where(EngineeringReportRecord.course_id == course_id)
            .order_by(EngineeringReportRecord.submitted_at.desc())
        ).all()
        enrollments = db.scalars(
            select(Enrollment)
            .options(selectinload(Enrollment.student))
            .where(Enrollment.course_id == course_id)
        ).all()
        students = {item.student.id: item.student for item in enrollments}

        return [
            TeacherReportRead(
                id=report.id,
                student_id=report.student_id,
                student_name=students.get(report.student_id).display_name if students.get(report.student_id) else "未知学生",
                title=report.title,
                status=report.status,
                ai_score=report.ai_score,
                teacher_score=report.teacher_score,
                ai_feedback=report.ai_feedback,
                submitted_at=report.submitted_at,
            )
            for report in reports
        ]

    @staticmethod
    def get_rag_config(db: Session, course_id: str) -> RagConfigRead | None:
        config = db.scalar(select(RagConfig).where(RagConfig.course_id == course_id))
        if not config:
            return None
        return RagConfigRead(
            course_id=config.course_id,
            collection_name=config.collection_name,
            top_k=config.top_k,
            keyword_weight=config.keyword_weight,
            vector_weight=config.vector_weight,
            rerank_strategy=config.rerank_strategy,
            chunk_size=config.chunk_size,
            chunk_overlap=config.chunk_overlap,
            updated_at=config.updated_at,
        )


class AdminService:
    @staticmethod
    def list_permissions() -> list[PermissionItem]:
        return [
            PermissionItem(
                key="student.learning",
                name="学生学习",
                description="章节学习、计时、查看资源、提交学习记录。",
                roles=["student"],
            ),
            PermissionItem(
                key="student.ai_teacher",
                name="AI 教师问答",
                description="向教师 Agent 提问，并基于画像获得个性化回答。",
                roles=["student", "teacher"],
            ),
            PermissionItem(
                key="student.report_submit",
                name="工程报告提交",
                description="学生保存草稿、正式提交工程报告和附件。",
                roles=["student"],
            ),
            PermissionItem(
                key="teacher.student_manage",
                name="学生管理",
                description="教师查看班级学生、画像、学情和干预建议。",
                roles=["teacher"],
            ),
            PermissionItem(
                key="teacher.report_review",
                name="报告评阅",
                description="教师复核 AI 评分并给出最终评价。",
                roles=["teacher"],
            ),
            PermissionItem(
                key="admin.rag_config",
                name="RAG 配置",
                description="管理员调整知识库集合、Top K、权重、切片和重排序策略。",
                roles=["admin"],
            ),
            PermissionItem(
                key="admin.permission",
                name="权限控制",
                description="管理员维护三端角色和功能权限。",
                roles=["admin"],
            ),
        ]

    @staticmethod
    def update_rag_config(db: Session, course_id: str, payload: RagConfigUpdate) -> RagConfigRead | None:
        config = db.scalar(select(RagConfig).where(RagConfig.course_id == course_id))
        if not config:
            return None

        update_data = payload.model_dump(exclude_unset=True)
        for key, value in update_data.items():
            if value is not None:
                setattr(config, key, value)
        db.commit()
        db.refresh(config)
        return RagConfigRead(
            course_id=config.course_id,
            collection_name=config.collection_name,
            top_k=config.top_k,
            keyword_weight=config.keyword_weight,
            vector_weight=config.vector_weight,
            rerank_strategy=config.rerank_strategy,
            chunk_size=config.chunk_size,
            chunk_overlap=config.chunk_overlap,
            updated_at=config.updated_at,
        )
