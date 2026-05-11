# Backend Skeleton

这是正式版后端的起步骨架，目标技术栈是：

- `FastAPI`
- `PostgreSQL`
- `Qdrant`
- `Redis`

当前代码先用内存假数据模拟：

- 课程列表
- 章节详情
- 当前章节出题
- 主观题评分
- AI 教师问答

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

1. 用 `SQLAlchemy` 接 `PostgreSQL`
2. 用 `qdrant-client` 接 `Qdrant`
3. 用异步任务处理课件解析和切片入库
4. 接大模型实现真实问答、出题和评分
