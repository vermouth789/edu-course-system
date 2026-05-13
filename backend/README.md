# Backend Skeleton

这是正式版后端的起步骨架，目标技术栈是：

- `FastAPI`
- `PostgreSQL`
- `Qdrant`
- `Redis`

当前代码已经接入 `SQLAlchemy + PostgreSQL` 作为正式数据底座，同时保留少量内存数据用于章节学习 demo：

- 课程列表和章节详情
- 当前章节出题
- 主观题评分
- AI 教师问答
- 教师端学生管理、学生画像、工程报告评阅列表
- 管理员端 RAG 配置读取

## PostgreSQL 初始化

`.env` 中默认数据库地址：

```bash
DATABASE_URL=postgresql+psycopg://eduspark:eduspark@127.0.0.1:5432/eduspark
```

需要先在本机 PostgreSQL 中创建用户和数据库：

```bash
createuser eduspark --pwprompt
createdb eduspark -O eduspark
```

如果用 `psql`：

```sql
CREATE USER eduspark WITH PASSWORD 'eduspark';
CREATE DATABASE eduspark OWNER eduspark;
```

正式开发不再依赖启动时自动建表，数据库结构通过 `Alembic` 迁移管理：

```bash
alembic upgrade head
```

如果需要写入当前教师端演示数据，可以调用：

```bash
curl -X POST http://127.0.0.1:8000/api/admin/database/init
```

## 安装依赖

```bash
pip3 install -r backend/requirements.txt
```

## 配置环境变量

根目录已经提供 `.env.example`。

```bash
cp .env.example .env
```

然后在 `.env` 中填写：

- `LLM_API_KEY`
- `LLM_BASE_URL`
- `LLM_MODEL`
- `EMBEDDING_API_KEY`
- `EMBEDDING_BASE_URL`
- `EMBEDDING_MODEL`
- `QDRANT_URL`
- `QDRANT_API_KEY`
- `DATABASE_URL`

## 启动服务

```bash
uvicorn backend.app.main:app --reload
```

## 下一步怎么接正式版

1. 拆分正式鉴权、RBAC 权限和三端路由
2. 用 `qdrant-client` 接 `Qdrant`
3. 用异步任务处理课件解析和切片入库
4. 接大模型实现真实出题和评分工作流
