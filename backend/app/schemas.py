from typing import List, Literal, Optional, Union

from pydantic import BaseModel, Field


class Course(BaseModel):
    id: str
    name: str
    teacher: str
    semester: str
    description: str


class Chapter(BaseModel):
    id: str
    course_id: str
    order: int
    title: str
    summary: str
    coarse_chunk: str
    fine_chunks: List[str]


class QuizQuestion(BaseModel):
    id: str
    chapter_id: str
    type: Literal["single", "judge", "short_answer"]
    difficulty: str
    stem: str
    options: Optional[List[str]] = None
    answer: Optional[Union[str, bool]] = None
    rubric: Optional[List[str]] = None
    reference_answer: Optional[str] = None


class GenerateQuizRequest(BaseModel):
    course_id: str
    chapter_id: str
    question_types: List[str] = Field(default_factory=list)
    difficulty: str = "mixed"
    count: int = 4


class ScoreRequest(BaseModel):
    question_id: str
    answer: str


class ScoreResponse(BaseModel):
    score: int
    max_score: int
    strengths: List[str]
    weaknesses: List[str]
    feedback: str
    evidence: List[str]


class AskAssistantRequest(BaseModel):
    course_id: str
    chapter_id: Optional[str] = None
    question: str


class AskAssistantResponse(BaseModel):
    answer: str
    evidence: List[str]
    retrieval_mode: str
