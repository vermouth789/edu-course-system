from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware

from .llm_client import LLMClient, LLMClientError
from .schemas import AskAssistantRequest, GenerateQuizRequest, ScoreRequest
from .services import AssistantService, CourseService, QuizService
from .settings import get_settings

settings = get_settings()
llm_client = LLMClient(settings)

app = FastAPI(
    title=f"{settings.app_name} API",
    version="0.1.0",
    description="课程管理系统 demo API，面向 B + 3 方案。",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://127.0.0.1:8080", "http://localhost:8080"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/health")
def health_check() -> dict:
    return {"status": "ok", "env": settings.app_env}


@app.get("/api/config/status")
def config_status() -> dict:
    return {
        "llm_provider": settings.llm_provider,
        "llm_base_url": settings.llm_base_url,
        "llm_model": settings.llm_model,
        "embedding_provider": settings.embedding_provider,
        "embedding_base_url": settings.embedding_base_url,
        "embedding_model": settings.embedding_model,
        "qdrant_url": settings.qdrant_url,
        "qdrant_collection": settings.qdrant_collection,
        "has_llm_api_key": bool(settings.llm_api_key),
        "has_embedding_api_key": bool(settings.embedding_api_key),
        "has_qdrant_api_key": bool(settings.qdrant_api_key),
    }


@app.get("/api/courses")
def list_courses():
    return CourseService.list_courses()


@app.get("/api/courses/{course_id}")
def get_course(course_id: str):
    course = CourseService.get_course(course_id)
    if not course:
        raise HTTPException(status_code=404, detail="Course not found")
    return course


@app.get("/api/courses/{course_id}/chapters")
def list_chapters(course_id: str):
    return CourseService.list_chapters(course_id)


@app.get("/api/chapters/{chapter_id}")
def get_chapter(chapter_id: str):
    chapter = CourseService.get_chapter(chapter_id)
    if not chapter:
        raise HTTPException(status_code=404, detail="Chapter not found")
    return chapter


@app.post("/api/quiz/generate")
def generate_quiz(payload: GenerateQuizRequest):
    return QuizService.generate_quiz(payload)


@app.post("/api/quiz/score")
def score_quiz(payload: ScoreRequest):
    return QuizService.score_short_answer(payload.question_id, payload.answer)


@app.post("/api/assistant/ask")
async def ask_assistant(payload: AskAssistantRequest):
    try:
        answer = await llm_client.chat(payload.question)
        return {
            "answer": answer,
            "evidence": ["LLM_PROVIDER: " + settings.llm_provider, "LLM_MODEL: " + settings.teacher_agent_model],
            "retrieval_mode": "llm_direct",
        }
    except LLMClientError as exc:
        fallback = AssistantService.ask(payload.question)
        return {
            "answer": f"当前没有成功调用真实 LLM，原因：{exc}。下面是本地兜底回答：{fallback.answer}",
            "evidence": fallback.evidence,
            "retrieval_mode": "fallback",
        }
