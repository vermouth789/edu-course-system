from __future__ import annotations

from typing import List

from .data import ASSISTANT_ANSWERS, CHAPTER_DATA, COURSE_DATA, QUESTION_BANK
from .schemas import (
    AskAssistantResponse,
    Chapter,
    Course,
    GenerateQuizRequest,
    QuizQuestion,
    ScoreResponse,
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
