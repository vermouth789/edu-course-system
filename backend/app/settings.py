from functools import lru_cache
from pathlib import Path
from typing import Optional

from pydantic import Field
from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    model_config = SettingsConfigDict(
        env_file=Path(__file__).resolve().parents[2] / ".env",
        env_file_encoding="utf-8",
        extra="ignore",
    )

    app_env: str = "development"
    app_name: str = "EduSpark"
    app_host: str = "127.0.0.1"
    app_port: int = 8000

    jwt_secret: str = "change-me"
    jwt_expires_minutes: int = 1440

    database_url: str = "postgresql+psycopg://eduspark:eduspark@127.0.0.1:5432/eduspark"
    sql_echo: bool = False
    database_auto_init: bool = False
    database_seed_demo_data: bool = False
    redis_url: str = "redis://127.0.0.1:6379/0"

    qdrant_url: str = "http://127.0.0.1:6333"
    qdrant_api_key: Optional[str] = None
    qdrant_collection: str = "course_knowledge"

    llm_provider: str = "LongCat-Flash-Thinking-2601"
    llm_api_key: Optional[str] = Field(default=None, repr=False)
    llm_base_url: str = "https://api.longcat.chat/openai"
    llm_model: str = "LongCat-Flash-Thinking-2601"

    teacher_agent_model: str = "LongCat-Flash-Thinking-2601"
    teacher_agent_temperature: float = 0.3
    teacher_agent_max_context_chunks: int = 8

    embedding_provider: str = "openai"
    embedding_api_key: Optional[str] = Field(default=None, repr=False)
    embedding_base_url: str = "https://api.openai.com/v1"
    embedding_model: str = "text-embedding-3-small"

    local_storage_dir: str = "./storage/uploads"


@lru_cache
def get_settings() -> Settings:
    return Settings()
