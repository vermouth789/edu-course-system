from sqlalchemy import select
from sqlalchemy.orm import Session

from .models import CourseRecord, EngineeringReportRecord, Enrollment, RagConfig, StudentProfile, User


def seed_demo_data(db: Session) -> None:
    existing = db.scalar(select(User).where(User.username == "student001"))
    if existing:
        return

    teacher = User(username="teacher001", display_name="王老师", role="teacher")
    students = [
        User(username="student001", display_name="林同学", role="student"),
        User(username="student002", display_name="周同学", role="student"),
        User(username="student003", display_name="陈同学", role="student"),
    ]
    admin = User(username="admin001", display_name="系统管理员", role="admin")
    course = CourseRecord(
        id="course-circuit",
        name="电路电子技术基础",
        teacher_name="王老师",
        semester="2026 春",
        description="围绕 LED 直流驱动电路设计、组装、调试、故障诊断和工程报告展开。",
    )

    db.add_all([teacher, admin, course, *students])
    db.flush()

    enrollments = [
        Enrollment(student_id=students[0].id, course_id=course.id, class_name="电气 2401", progress=0.61, accuracy=0.58, activity_level="高", risk_level="需关注"),
        Enrollment(student_id=students[1].id, course_id=course.id, class_name="电气 2401", progress=0.78, accuracy=0.74, activity_level="中", risk_level="正常"),
        Enrollment(student_id=students[2].id, course_id=course.id, class_name="电气 2402", progress=0.89, accuracy=0.86, activity_level="中高", risk_level="优秀"),
    ]
    profiles = [
        StudentProfile(
            student_id=students[0].id,
            age=18,
            foundation="基础薄弱",
            learning_style="步骤化讲解",
            answer_tone="鼓励型",
            weak_points="串并联分析、欧姆定律应用、计算步骤完整性",
            common_mistakes="容易跳过参考方向确认，计算题缺少单位",
            long_term_summary="适合先拆小步骤，再通过图示和低难度变式题建立信心。",
        ),
        StudentProfile(
            student_id=students[1].id,
            age=19,
            foundation="基础稳定",
            learning_style="概念加例题",
            answer_tone="平衡型",
            weak_points="节点电压法、复杂支路分析",
            common_mistakes="综合题中偶尔混淆总电流和支路电流",
            long_term_summary="适合中等难度题持续训练，逐步加入工程情境。",
        ),
        StudentProfile(
            student_id=students[2].id,
            age=18,
            foundation="进阶推导",
            learning_style="原理推导",
            answer_tone="严谨型",
            weak_points="工程报告表达完整性",
            common_mistakes="答案推导充分，但工程结论有时不够面向读者",
            long_term_summary="适合挑战题、边界条件讨论和工程化表达训练。",
        ),
    ]
    reports = [
        EngineeringReportRecord(
            student_id=students[0].id,
            course_id=course.id,
            title="LED 驱动电路优化技术备忘录",
            status="submitted",
            ai_score=72,
            ai_feedback="结构完整，但功率降额计算过程需要补充。",
        ),
        EngineeringReportRecord(
            student_id=students[1].id,
            course_id=course.id,
            title="LED 指示灯系统每周巡检记录表",
            status="reviewing",
            ai_score=84,
            ai_feedback="数据记录较规范，建议增加异常处理依据。",
        ),
    ]
    rag_config = RagConfig(
        course_id=course.id,
        collection_name="circuit-electronics-m1",
        top_k=6,
        keyword_weight=0.4,
        vector_weight=0.6,
        rerank_strategy="chapter-first",
        chunk_size=800,
        chunk_overlap=120,
    )

    db.add_all([*enrollments, *profiles, *reports, rag_config])
    db.commit()
