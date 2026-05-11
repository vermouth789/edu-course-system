# EduSpark Demo


- 前端方向：`Next.js`
- 后端方向：`FastAPI`
- 主数据库：`PostgreSQL`
- 向量数据库：`Qdrant`
- 课程切片：`双层切片`

当前仓库先提供两部分内容：

1. `demo/`
   一个零依赖可预览的静态原型，方便快速看产品方向。

2. `backend/`
   一个面向正式版的 `FastAPI` 代码骨架，包含课程、章节、章节抽题、AI 教师问答等示例接口。

3. `docs/`
   包含 API、RAG 设计和系统架构图说明。

## 先看 Demo

在仓库根目录执行：

```bash
python3 -m http.server 8080
```

然后打开：

```text
http://localhost:8080/demo/
```

## 项目结构

```text
demo/                  前端静态原型
backend/               FastAPI 后端骨架
docs/                  架构与 RAG 方案说明
```

其中架构图见 [docs/architecture.md](/Users/vermouth/Downloads/edu/docs/architecture.md)。
老师 Agent 设计见 [docs/teacher-agent.md](/Users/vermouth/Downloads/edu/docs/teacher-agent.md)。
对外展示说明见 [docs/solution-summary.md](/Users/vermouth/Downloads/edu/docs/solution-summary.md)。
电路图功能设计见 [docs/circuit-editor.md](/Users/vermouth/Downloads/edu/docs/circuit-editor.md)。
个性化老师 Agent 设计见 [docs/personalized-teacher-agent.md](/Users/vermouth/Downloads/edu/docs/personalized-teacher-agent.md)。
学生学习报告设计见 [docs/student-report.md](/Users/vermouth/Downloads/edu/docs/student-report.md)。
工程报告提交模块设计见 [docs/engineering-report.md](/Users/vermouth/Downloads/edu/docs/engineering-report.md)。

## 当前已初步确定的方案

- 前端：`Next.js`
- 后端：`FastAPI`
- AI 架构：`LangChain + LangGraph`
- 主数据库：`PostgreSQL`
- 向量数据库：`Qdrant`
- 文件存储：第一版本地目录，后续可升级 `MinIO`
- 知识库切片：`双层切片`

## 当前展示重点

当前 demo 主要用于展示以下方向：

- 类似课程平台的基础教学能力
- 围绕章节学习的 AI 增强能力
- “老师 Agent” 而不是普通聊天机器人的设计思路
- 电路电子课程的学生端电路绘图与下载能力
- 面向不同学生的个性化教学风格与学习报告能力
- 项目化课程中的工程报告提交与成果归档能力
- 首次登录问卷生成初始画像，并在学习过程中动态修正
- IEC 风格电路图编辑与基础连通性检查能力
- 后续按“IEC 60617 标准来源 + 本地元件库”路线扩展正式版电路编辑器
- 登录入口已加入账号密码字段，并按身份进入学生端、教师端或管理员端
- 学生首次登录会先进入问卷，提交后再进入学习空间
- 章节学习页增加正计时、资源清单和任务路径
- 电路图模块增加线材选用、接口接茬、端子排、插接件和更多常用元件
- 管理员端增加角色权限控制、RAG 数据库参数调节、模型配置预览和系统审计展示
- RAG 管理支持 Top K、精准/向量权重、重排序、切片大小与切片重叠等参数

## 下一步

- 安装 `FastAPI`、`uvicorn`、`qdrant-client`
- 接入真实 `PostgreSQL`
- 接入真实 `Qdrant`
- 用 `Next.js` 重建正式前端
