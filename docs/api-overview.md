# API Overview

## 目标

第一版 API 先覆盖 4 条主线：

1. 课程与章节
2. 当前章节随机出题
3. 主观题 AI 评分
4. AI 教师问答

## 推荐接口

### 课程与章节

- `GET /api/courses`
- `GET /api/courses/{course_id}`
- `GET /api/courses/{course_id}/chapters`
- `GET /api/chapters/{chapter_id}`

### 章节抽题

- `POST /api/quiz/generate`

请求体示例：

```json
{
  "course_id": "course-ds",
  "chapter_id": "chapter-stack-queue",
  "question_types": ["single", "judge", "short_answer"],
  "difficulty": "mixed",
  "count": 4
}
```

### AI 评分

- `POST /api/quiz/score`

请求体示例：

```json
{
  "question_id": "q-short-stack-001",
  "answer": "栈是后进先出，队列是先进先出。"
}
```

### AI 教师

- `POST /api/assistant/ask`

请求体示例：

```json
{
  "course_id": "course-ds",
  "chapter_id": "chapter-stack-queue",
  "question": "为什么栈适合做括号匹配？"
}
```
