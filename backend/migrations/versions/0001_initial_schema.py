"""initial schema

Revision ID: 0001_initial_schema
Revises:
Create Date: 2026-05-13 00:00:00
"""

from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


revision: str = "0001_initial_schema"
down_revision: Union[str, None] = None
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    op.create_table(
        "users",
        sa.Column("id", sa.Integer(), nullable=False),
        sa.Column("username", sa.String(length=64), nullable=False),
        sa.Column("display_name", sa.String(length=80), nullable=False),
        sa.Column("role", sa.String(length=24), nullable=False),
        sa.Column("is_active", sa.Boolean(), nullable=False),
        sa.Column("created_at", sa.DateTime(), nullable=False),
        sa.PrimaryKeyConstraint("id"),
        sa.UniqueConstraint("username"),
    )
    op.create_index(op.f("ix_users_role"), "users", ["role"], unique=False)
    op.create_index(op.f("ix_users_username"), "users", ["username"], unique=False)

    op.create_table(
        "course_records",
        sa.Column("id", sa.String(length=64), nullable=False),
        sa.Column("name", sa.String(length=120), nullable=False),
        sa.Column("teacher_name", sa.String(length=80), nullable=False),
        sa.Column("semester", sa.String(length=40), nullable=False),
        sa.Column("description", sa.Text(), nullable=False),
        sa.PrimaryKeyConstraint("id"),
    )

    op.create_table(
        "enrollments",
        sa.Column("id", sa.Integer(), nullable=False),
        sa.Column("student_id", sa.Integer(), nullable=False),
        sa.Column("course_id", sa.String(length=64), nullable=False),
        sa.Column("class_name", sa.String(length=80), nullable=False),
        sa.Column("progress", sa.Float(), nullable=False),
        sa.Column("accuracy", sa.Float(), nullable=False),
        sa.Column("activity_level", sa.String(length=24), nullable=False),
        sa.Column("risk_level", sa.String(length=24), nullable=False),
        sa.Column("last_active_at", sa.DateTime(), nullable=False),
        sa.ForeignKeyConstraint(["course_id"], ["course_records.id"]),
        sa.ForeignKeyConstraint(["student_id"], ["users.id"]),
        sa.PrimaryKeyConstraint("id"),
        sa.UniqueConstraint("student_id", "course_id", name="uq_student_course"),
    )
    op.create_index(op.f("ix_enrollments_course_id"), "enrollments", ["course_id"], unique=False)
    op.create_index(op.f("ix_enrollments_student_id"), "enrollments", ["student_id"], unique=False)

    op.create_table(
        "engineering_reports",
        sa.Column("id", sa.Integer(), nullable=False),
        sa.Column("student_id", sa.Integer(), nullable=False),
        sa.Column("course_id", sa.String(length=64), nullable=False),
        sa.Column("title", sa.String(length=160), nullable=False),
        sa.Column("status", sa.String(length=24), nullable=False),
        sa.Column("ai_score", sa.Float(), nullable=False),
        sa.Column("teacher_score", sa.Float(), nullable=True),
        sa.Column("ai_feedback", sa.Text(), nullable=False),
        sa.Column("submitted_at", sa.DateTime(), nullable=False),
        sa.ForeignKeyConstraint(["course_id"], ["course_records.id"]),
        sa.ForeignKeyConstraint(["student_id"], ["users.id"]),
        sa.PrimaryKeyConstraint("id"),
    )
    op.create_index(op.f("ix_engineering_reports_course_id"), "engineering_reports", ["course_id"], unique=False)
    op.create_index(op.f("ix_engineering_reports_student_id"), "engineering_reports", ["student_id"], unique=False)

    op.create_table(
        "rag_configs",
        sa.Column("id", sa.Integer(), nullable=False),
        sa.Column("course_id", sa.String(length=64), nullable=False),
        sa.Column("collection_name", sa.String(length=120), nullable=False),
        sa.Column("top_k", sa.Integer(), nullable=False),
        sa.Column("keyword_weight", sa.Float(), nullable=False),
        sa.Column("vector_weight", sa.Float(), nullable=False),
        sa.Column("rerank_strategy", sa.String(length=80), nullable=False),
        sa.Column("chunk_size", sa.Integer(), nullable=False),
        sa.Column("chunk_overlap", sa.Integer(), nullable=False),
        sa.Column("updated_at", sa.DateTime(), nullable=False),
        sa.ForeignKeyConstraint(["course_id"], ["course_records.id"]),
        sa.PrimaryKeyConstraint("id"),
    )
    op.create_index(op.f("ix_rag_configs_course_id"), "rag_configs", ["course_id"], unique=False)

    op.create_table(
        "student_profiles",
        sa.Column("id", sa.Integer(), nullable=False),
        sa.Column("student_id", sa.Integer(), nullable=False),
        sa.Column("age", sa.Integer(), nullable=False),
        sa.Column("foundation", sa.String(length=80), nullable=False),
        sa.Column("learning_style", sa.String(length=80), nullable=False),
        sa.Column("answer_tone", sa.String(length=80), nullable=False),
        sa.Column("weak_points", sa.Text(), nullable=False),
        sa.Column("common_mistakes", sa.Text(), nullable=False),
        sa.Column("long_term_summary", sa.Text(), nullable=False),
        sa.Column("updated_at", sa.DateTime(), nullable=False),
        sa.ForeignKeyConstraint(["student_id"], ["users.id"]),
        sa.PrimaryKeyConstraint("id"),
    )
    op.create_index(op.f("ix_student_profiles_student_id"), "student_profiles", ["student_id"], unique=True)


def downgrade() -> None:
    op.drop_index(op.f("ix_student_profiles_student_id"), table_name="student_profiles")
    op.drop_table("student_profiles")
    op.drop_index(op.f("ix_rag_configs_course_id"), table_name="rag_configs")
    op.drop_table("rag_configs")
    op.drop_index(op.f("ix_engineering_reports_student_id"), table_name="engineering_reports")
    op.drop_index(op.f("ix_engineering_reports_course_id"), table_name="engineering_reports")
    op.drop_table("engineering_reports")
    op.drop_index(op.f("ix_enrollments_student_id"), table_name="enrollments")
    op.drop_index(op.f("ix_enrollments_course_id"), table_name="enrollments")
    op.drop_table("enrollments")
    op.drop_table("course_records")
    op.drop_index(op.f("ix_users_username"), table_name="users")
    op.drop_index(op.f("ix_users_role"), table_name="users")
    op.drop_table("users")
