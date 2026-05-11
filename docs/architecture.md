# System Architecture

## 总体架构图

```mermaid
flowchart LR
    U["学生 / 教师 / 管理员"] --> FE["前端应用<br/>Next.js"]

    FE --> API["后端 API<br/>FastAPI"]
    FE --> AUTH["认证与会话"]

    API --> PG["PostgreSQL<br/>业务主数据库"]
    API --> REDIS["Redis<br/>缓存 / 队列 / 会话状态"]
    API --> FILES["本地文件存储<br/>后续可切 MinIO"]
    API --> QD["Qdrant<br/>向量数据库"]
    API --> LC["LangChain<br/>模型与工具封装"]
    LC --> LG["LangGraph<br/>老师 Agent 编排"]
    LG --> LLM["大模型服务"]

    FILES --> PARSER["课件解析与切片服务"]
    PARSER --> PG
    PARSER --> QD

    API --> QUIZ["章节抽题服务"]
    API --> SCORE["AI 评分服务"]
    API --> RAG["AI 教师 RAG 服务"]

    QUIZ --> PG
    QUIZ --> QD
    QUIZ --> LLM

    SCORE --> PG
    SCORE --> QD
    SCORE --> LLM

    RAG --> PG
    RAG --> QD
    RAG --> LLM
```

## 模块分层图

```mermaid
flowchart TB
    subgraph Frontend["前端层"]
        Student["学生端"]
        Teacher["教师端"]
        Admin["管理后台"]
    end

    subgraph Backend["应用服务层"]
        Auth["认证 / 权限 / 审计服务"]
        Course["课程与章节服务"]
        Resource["资源与课件服务"]
        Exam["作业 / 考试 / 题库服务"]
        Assistant["AI 教师服务"]
        Grading["AI 评分服务"]
        Analytics["学情分析服务"]
        AdminConfig["系统配置服务<br/>模型 / RAG 参数 / 标准库"]
    end

    subgraph AIInfra["AI 基础设施层"]
        Agent["Teacher Agent<br/>LangGraph"]
        Tools["Tools / Retriever<br/>LangChain"]
        Chunk["双层切片服务"]
        Retrieve["混合检索服务"]
        ReRank["重排服务"]
        Model["大模型调用层"]
        RagConfig["RAG 参数配置<br/>Top K / 权重 / 切片策略"]
    end

    subgraph Data["数据层"]
        DB["PostgreSQL"]
        Vector["Qdrant"]
        Cache["Redis"]
        Storage["本地文件存储 / MinIO"]
    end

    Frontend --> Backend
    Backend --> AIInfra
    Backend --> Data
    AIInfra --> Data
    Agent --> Tools
    Tools --> Model
    Admin --> Auth
    Admin --> AdminConfig
    AdminConfig --> RagConfig
    RagConfig --> Retrieve
```

## 管理员端职责

- 账号与权限：维护学生、教师、管理员角色，并按课程、班级、功能点绑定可操作范围。
- RAG 数据库调节：管理课程知识库集合、Top K、精准检索权重、向量检索权重、重排序策略、切片大小和切片重叠。
- 模型配置：区分 `LLM` 和 `Embedding` 配置，避免聊天模型与向量化模型混用。
- 标准资源库：维护 IEC 60617 元件映射、本地元件库版本、线材和接口接茬配置。
- 系统审计：记录用户、时间、操作对象、旧值、新值和回滚版本，尤其是重建向量库和切换模型等高风险操作。

## AI 老师 Agent 架构

```mermaid
flowchart LR
    Student["学生请求"] --> Router["意图判断"]
    Router --> Context["学生 / 课程 / 章节上下文"]
    Router --> Tools["LangChain Tools"]

    Tools --> Retrieve["课程知识检索"]
    Tools --> Quiz["章节出题"]
    Tools --> Score["主观题评分"]
    Tools --> Suggest["复习建议"]

    Context --> Agent["LangGraph Teacher Agent"]
    Retrieve --> Agent
    Quiz --> Agent
    Score --> Agent
    Suggest --> Agent

    Agent --> Response["老师式回答 / 题目 / 评分 / 建议"]
```

## 关键数据流

### 1. 课件上传与入库

```mermaid
sequenceDiagram
    participant T as 教师
    participant FE as 前端
    participant API as FastAPI
    participant FS as 文件存储
    participant CK as 切片服务
    participant PG as PostgreSQL
    participant QD as Qdrant

    T->>FE: 上传 PPT / PDF / 讲义
    FE->>API: 提交课程资源
    API->>FS: 保存原始文件
    API->>CK: 创建解析与切片任务
    CK->>FS: 读取课件内容
    CK->>PG: 保存章节 / 元数据 / 粗粒度切片
    CK->>QD: 保存细粒度向量切片
```

### 2. AI 教师问答

```mermaid
sequenceDiagram
    participant S as 学生
    participant FE as 前端
    participant API as FastAPI
    participant PG as PostgreSQL
    participant QD as Qdrant
    participant LLM as 大模型

    S->>FE: 提问课程问题
    FE->>API: 提交问题 + 课程/章节上下文
    API->>PG: 精准过滤课程 / 章节 / 知识点
    API->>QD: 向量召回细粒度知识块
    API->>PG: 回查粗粒度摘要
    API->>LLM: 组合上下文生成答案
    LLM-->>API: 返回回答
    API-->>FE: 展示答案 + 证据片段
```

### 3. 当前章节随机出题与 AI 评分

```mermaid
sequenceDiagram
    participant S as 学生
    participant FE as 前端
    participant API as FastAPI
    participant PG as PostgreSQL
    participant QD as Qdrant
    participant LLM as 大模型

    S->>FE: 进入当前章节
    FE->>API: 请求章节随机出题
    API->>PG: 获取章节、题库、知识点
    API->>QD: 召回相关知识切片
    API->>LLM: 按题型模板生成或筛选题目
    API-->>FE: 返回试题

    S->>FE: 提交主观题答案
    FE->>API: 请求 AI 评分
    API->>QD: 召回评分依据知识片段
    API->>LLM: 结合 rubric 评分
    API->>PG: 保存作答记录与评分结果
    API-->>FE: 返回分数、得分点、改进建议
```

## 当前 Demo 对应范围

- 前端原型：`/demo`
- 后端骨架：`/backend/app`
- RAG 设计说明：`/docs/rag-design.md`
- API 清单：`/docs/api-overview.md`
- 老师 Agent 设计：`/docs/teacher-agent.md`
- 对外展示说明：`/docs/solution-summary.md`

## 设计原则

- 业务数据和向量数据分开管理：`PostgreSQL + Qdrant`
- 文件存储先本地目录，后续平滑升级 `MinIO`
- AI 能力不直接裸调用模型，而是走 `RAG + 规则 + 模型` 组合策略
- 双层切片同时服务问答、出题、评分三条主线
- 三端入口通过登录身份认证分流，正式版建议采用 `RBAC` 权限模型
