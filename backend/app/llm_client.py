from __future__ import annotations

import httpx

from .settings import Settings


class LLMClientError(RuntimeError):
    pass


class LLMClient:
    def __init__(self, settings: Settings):
        self.settings = settings

    async def chat(self, question: str) -> str:
        if not self.settings.llm_api_key:
            raise LLMClientError("LLM_API_KEY is not configured")

        base_url = self.settings.llm_base_url.rstrip("/")
        url = f"{base_url}/v1/chat/completions"
        headers = {
            "Authorization": f"Bearer {self.settings.llm_api_key}",
            "Content-Type": "application/json",
        }
        payload = {
            "model": self.settings.teacher_agent_model or self.settings.llm_model,
            "temperature": self.settings.teacher_agent_temperature,
            "messages": [
                {
                    "role": "system",
                    "content": (
                        "你是电路电子课程的智能教师。回答要以课程教学为中心，"
                        "语气清晰、严谨、耐心。学生问你是谁时，要说明你是本课程的 AI 教师，"
                        "可以帮助章节学习、答疑、出题、评分、工程报告和电路图学习。"
                    ),
                },
                {"role": "user", "content": question},
            ],
        }

        try:
            async with httpx.AsyncClient(timeout=60) as client:
                response = await client.post(url, headers=headers, json=payload)
                response.raise_for_status()
        except httpx.HTTPStatusError as exc:
            raise LLMClientError(f"LLM request failed: {exc.response.status_code} {exc.response.text}") from exc
        except httpx.HTTPError as exc:
            raise LLMClientError(f"LLM request failed: {exc}") from exc

        data = response.json()
        try:
            return data["choices"][0]["message"]["content"]
        except (KeyError, IndexError, TypeError) as exc:
            raise LLMClientError("LLM response format is not compatible with OpenAI chat completions") from exc
