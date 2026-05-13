from __future__ import annotations

from datetime import datetime
from typing import Optional

from sqlalchemy import Boolean, DateTime, Float, ForeignKey, Integer, String, Text, UniqueConstraint
from sqlalchemy.orm import Mapped, mapped_column, relationship

from .database import Base


class User(Base):
    __tablename__ = "users"

    id: Mapped[int] = mapped_column(primary_key=True)
    username: Mapped[str] = mapped_column(String(64), unique=True, index=True)
    display_name: Mapped[str] = mapped_column(String(80))
    role: Mapped[str] = mapped_column(String(24), index=True)
    is_active: Mapped[bool] = mapped_column(Boolean, default=True)
    created_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow)

    student_profile: Mapped[Optional["StudentProfile"]] = relationship(back_populates="student", uselist=False)
    enrollments: Mapped[list["Enrollment"]] = relationship(back_populates="student")


class CourseRecord(Base):
    __tablename__ = "course_records"

    id: Mapped[str] = mapped_column(String(64), primary_key=True)
    name: Mapped[str] = mapped_column(String(120))
    teacher_name: Mapped[str] = mapped_column(String(80))
    semester: Mapped[str] = mapped_column(String(40))
    description: Mapped[str] = mapped_column(Text)

    enrollments: Mapped[list["Enrollment"]] = relationship(back_populates="course")


class Enrollment(Base):
    __tablename__ = "enrollments"
    __table_args__ = (UniqueConstraint("student_id", "course_id", name="uq_student_course"),)

    id: Mapped[int] = mapped_column(primary_key=True)
    student_id: Mapped[int] = mapped_column(ForeignKey("users.id"), index=True)
    course_id: Mapped[str] = mapped_column(ForeignKey("course_records.id"), index=True)
    class_name: Mapped[str] = mapped_column(String(80))
    progress: Mapped[float] = mapped_column(Float, default=0)
    accuracy: Mapped[float] = mapped_column(Float, default=0)
    activity_level: Mapped[str] = mapped_column(String(24), default="中")
    risk_level: Mapped[str] = mapped_column(String(24), default="正常")
    last_active_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow)

    student: Mapped[User] = relationship(back_populates="enrollments")
    course: Mapped[CourseRecord] = relationship(back_populates="enrollments")


class StudentProfile(Base):
    __tablename__ = "student_profiles"

    id: Mapped[int] = mapped_column(primary_key=True)
    student_id: Mapped[int] = mapped_column(ForeignKey("users.id"), unique=True, index=True)
    age: Mapped[int] = mapped_column(Integer, default=18)
    foundation: Mapped[str] = mapped_column(String(80))
    learning_style: Mapped[str] = mapped_column(String(80))
    answer_tone: Mapped[str] = mapped_column(String(80))
    weak_points: Mapped[str] = mapped_column(Text, default="")
    common_mistakes: Mapped[str] = mapped_column(Text, default="")
    long_term_summary: Mapped[str] = mapped_column(Text, default="")
    updated_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    student: Mapped[User] = relationship(back_populates="student_profile")


class EngineeringReportRecord(Base):
    __tablename__ = "engineering_reports"

    id: Mapped[int] = mapped_column(primary_key=True)
    student_id: Mapped[int] = mapped_column(ForeignKey("users.id"), index=True)
    course_id: Mapped[str] = mapped_column(ForeignKey("course_records.id"), index=True)
    title: Mapped[str] = mapped_column(String(160))
    status: Mapped[str] = mapped_column(String(24), default="submitted")
    ai_score: Mapped[float] = mapped_column(Float, default=0)
    teacher_score: Mapped[Optional[float]] = mapped_column(Float, nullable=True)
    ai_feedback: Mapped[str] = mapped_column(Text, default="")
    submitted_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow)


class RagConfig(Base):
    __tablename__ = "rag_configs"

    id: Mapped[int] = mapped_column(primary_key=True)
    course_id: Mapped[str] = mapped_column(ForeignKey("course_records.id"), index=True)
    collection_name: Mapped[str] = mapped_column(String(120))
    top_k: Mapped[int] = mapped_column(Integer, default=6)
    keyword_weight: Mapped[float] = mapped_column(Float, default=0.4)
    vector_weight: Mapped[float] = mapped_column(Float, default=0.6)
    rerank_strategy: Mapped[str] = mapped_column(String(80), default="chapter-first")
    chunk_size: Mapped[int] = mapped_column(Integer, default=800)
    chunk_overlap: Mapped[int] = mapped_column(Integer, default=120)
    updated_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
