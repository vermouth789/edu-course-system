from datetime import datetime
from typing import List, Literal, Optional, Union

from pydantic import BaseModel, ConfigDict, Field


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


class InitDatabaseResponse(BaseModel):
    status: str
    database_url: str


class StudentProfileRead(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    age: int
    foundation: str
    learning_style: str
    answer_tone: str
    weak_points: str
    common_mistakes: str
    long_term_summary: str
    updated_at: datetime


class TeacherStudentRead(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    student_id: int
    username: str
    display_name: str
    class_name: str
    progress: float
    accuracy: float
    activity_level: str
    risk_level: str
    last_active_at: datetime
    profile: Optional[StudentProfileRead] = None


class TeacherOverview(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    course_id: str
    student_count: int
    average_progress: float
    average_accuracy: float
    risk_student_count: int
    submitted_report_count: int


class TeacherReportRead(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    student_id: int
    student_name: str
    title: str
    status: str
    ai_score: float
    teacher_score: Optional[float]
    ai_feedback: str
    submitted_at: datetime


class RagConfigRead(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    course_id: str
    collection_name: str
    top_k: int
    keyword_weight: float
    vector_weight: float
    rerank_strategy: str
    chunk_size: int
    chunk_overlap: int
    updated_at: datetime


class RagConfigUpdate(BaseModel):
    collection_name: Optional[str] = None
    top_k: Optional[int] = Field(default=None, ge=1, le=30)
    keyword_weight: Optional[float] = Field(default=None, ge=0, le=1)
    vector_weight: Optional[float] = Field(default=None, ge=0, le=1)
    rerank_strategy: Optional[str] = None
    chunk_size: Optional[int] = Field(default=None, ge=200, le=3000)
    chunk_overlap: Optional[int] = Field(default=None, ge=0, le=800)


class PermissionItem(BaseModel):
    key: str
    name: str
    description: str
    roles: List[str]
