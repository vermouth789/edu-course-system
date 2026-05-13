const chapters = [
  {
    id: "m1-task-1",
    title: "任务一 需求分析与参数校核",
    summary: "把客户需求转化为电流、功率、寿命和成本等量化指标。",
    coarse: "掌握 LED 正向压降、目标工作电流、限流电阻计算和功率降额校核。",
    fine: "完成限流电阻计算表、物料选型依据和宽温工况校核。",
    resources: ["微课：LED 限流电阻计算", "课件：功率降额设计", "表单：参数校核表"],
    path: ["阅读项目情境", "计算目标阻值", "完成功率校核", "提交选型结论"],
    lesson: "本任务要求你把“亮度适中、寿命长、成本低”翻译成可计算的工程指标。重点是根据电源电压、LED 正向压降和目标电流计算限流电阻，并结合温度和功率降额判断电阻是否可靠。"
  },
  {
    id: "m1-task-2",
    title: "任务二 电路设计与布局规划",
    summary: "绘制标准化 LED 驱动原理图，并规划面包板布局。",
    coarse: "掌握电源、开关、限流电阻、LED、接地之间的连接关系。",
    fine: "完成原理图、电路图连通性检查、线材和接口接茬选择。",
    resources: ["模板：LED 驱动电路图", "工具：电路绘图画布", "规范：IEC 60617 符号来源"],
    path: ["选择标准元件", "连接端子与线材", "检查连通性", "导出电路图"],
    lesson: "本任务进入电路图设计环节。你需要在画布中选择标准元件，区分电源线、信号线和接地线，并选择端子压接、插接件或焊接等接茬方式。完成后需要通过连通性检查。"
  },
  {
    id: "m1-task-3",
    title: "任务三 标准化组装与调试",
    summary: "按工业级规范完成电路组装，并记录关键测量数据。",
    coarse: "掌握万用表电压档、电阻档、二极管档的使用规范。",
    fine: "完成通电前检查、节点电压测量、实测值与理论值偏差分析。",
    resources: ["微课：万用表基础操作规范", "表单：测量记录表", "清单：通电前检查项"],
    path: ["安全确认", "组装电路", "测量节点", "分析偏差"],
    lesson: "本任务强调安全和规范。通电前先检查极性、短路和接线可靠性；通电后记录电源电压、电阻两端电压和 LED 两端电压，并解释实测值与理论值的偏差来源。"
  },
  {
    id: "m1-task-4",
    title: "任务四 故障诊断与运维体系",
    summary: "建立 LED 不亮、频闪、发热等故障的排查流程。",
    coarse: "掌握先静后动、先外后内、先断电后通电的故障诊断原则。",
    fine: "完成故障诊断单、巡检记录表和预防性维护计划。",
    resources: ["案例：LED 不亮故障定位", "表单：巡检记录表", "模板：运维台账"],
    path: ["识别故障现象", "选择测量节点", "定位根因", "输出运维方案"],
    lesson: "本任务把设计结果转化为运维能力。你需要针对 LED 不亮、亮度偏低、频闪、电阻发热等现象列出根因，并给出 10 分钟定位、30 分钟修复的标准化流程。"
  },
  {
    id: "m1-task-5",
    title: "任务五 工况优化与工程文档",
    summary: "针对宽温和电源波动完成优化，并输出工程技术备忘录。",
    coarse: "掌握成本、寿命、可靠性、亮度稳定性之间的工程权衡。",
    fine: "完成技术备忘录、工程履历和教师可评阅的成果归档。",
    resources: ["模板：技术备忘录", "样例：个人工程履历", "清单：ISO 9001 文档要素"],
    path: ["分析复杂工况", "优化参数方案", "整理工程报告", "归档成果"],
    lesson: "本任务收束整个模块。你需要解释为什么选择某个电阻规格，如何应对 -20℃ 到 70℃ 工况和电源波动，并把计算、测量、诊断和运维结论写成工程技术备忘录。"
  }
];

const answers = {
  "为什么栈适合做括号匹配？":
    "因为括号匹配具有最近出现的左括号先被检查的特点，正好符合栈的后进先出。遍历表达式时，遇到左括号入栈，遇到右括号就取栈顶元素比对；如果类型不一致或栈空，就说明匹配失败。这里的回答会优先绑定“第 3 章 栈的应用”这一组细粒度切片，并补充章节摘要作为上下文。",
  "队列和广度优先搜索有什么关系？":
    "广度优先搜索要求先访问当前层，再访问下一层，因此需要一个先进先出的结构来保存待访问节点。队列正好满足这个顺序，所以 BFS 的核心辅助结构就是队列。系统会同时召回“队列定义块”和“图遍历案例块”进行回答。",
  "顺序栈和链栈在实际使用时怎么选？":
    "如果元素数量上界比较稳定，顺序栈实现简单、访问局部性好；如果元素数量波动大或者希望避免连续存储空间限制，链栈更灵活。回答时会参考结构定义块、复杂度块和适用场景块。"
};

const navItems = document.querySelectorAll(".nav-item");
const panels = document.querySelectorAll(".panel");
const loginScreen = document.getElementById("login-screen");
const loginRoleCards = document.querySelectorAll(".login-role-card");
const loginAccount = document.getElementById("login-account");
const loginPassword = document.getElementById("login-password");
const loginSubmitButton = document.getElementById("login-submit-btn");
const loginStatus = document.getElementById("login-status");
const logoutButton = document.getElementById("logout-button");
const currentRoleName = document.getElementById("current-role-name");
const currentRoleDesc = document.getElementById("current-role-desc");
const roleTitle = document.getElementById("role-title");
const roleBadge = document.getElementById("role-badge");
const roleSummary = document.getElementById("role-summary");
const roleTags = document.getElementById("role-tags");
const roleFeatures = document.getElementById("role-features");
const roleMetricA = document.getElementById("role-metric-a");
const roleMetricB = document.getElementById("role-metric-b");
const roleMetricC = document.getElementById("role-metric-c");
const roleLabelA = document.getElementById("role-label-a");
const roleLabelB = document.getElementById("role-label-b");
const roleLabelC = document.getElementById("role-label-c");
const courseListView = document.getElementById("course-list-view");
const courseStudyView = document.getElementById("course-study-view");
const courseTotalTime = document.getElementById("course-total-time");
const chapterList = document.getElementById("chapter-list");
const chapterTitle = document.getElementById("chapter-title");
const chapterSummary = document.getElementById("chapter-summary");
const coarseChunk = document.getElementById("coarse-chunk");
const fineChunk = document.getElementById("fine-chunk");
const chapterResources = document.getElementById("chapter-resources");
const chapterPath = document.getElementById("chapter-path");
const lessonTitle = document.getElementById("lesson-title");
const lessonBody = document.getElementById("lesson-body");
const lessonAskButton = document.getElementById("lesson-ask-btn");
const lessonDrawButton = document.getElementById("lesson-draw-btn");
const lessonReportButton = document.getElementById("lesson-report-btn");
const jumpQuiz = document.getElementById("jump-quiz");
const backToCourseListButton = document.getElementById("back-to-course-list");
const studyTimer = document.getElementById("study-timer");
const studyStartButton = document.getElementById("study-start-btn");
const studyPauseButton = document.getElementById("study-pause-btn");
const studyResetButton = document.getElementById("study-reset-btn");
const scoreButton = document.getElementById("score-answer");
const scoreBox = document.getElementById("score-box");
const answerInput = document.getElementById("answer-input");
const chatBox = document.getElementById("chat-box");
const askButton = document.getElementById("ask-button");
const questionInput = document.getElementById("question-input");
const circuitCanvas = document.getElementById("circuit-canvas");
const circuitComponentsLayer = document.getElementById("circuit-components");
const circuitWiresLayer = document.getElementById("circuit-wires");
const circuitStatusBox = document.getElementById("circuit-status-box");
const circuitModeIndicator = document.getElementById("circuit-mode-indicator");
const wireModeButton = document.getElementById("wire-mode-btn");
const wireTypeSelect = document.getElementById("wire-type-select");
const jointTypeSelect = document.getElementById("joint-type-select");
const deleteSelectedButton = document.getElementById("delete-selected-btn");
const clearDiagramButton = document.getElementById("clear-diagram-btn");
const downloadSvgButton = document.getElementById("download-svg-btn");
const downloadPngButton = document.getElementById("download-png-btn");
const profileList = document.getElementById("profile-list");
const profileName = document.getElementById("profile-name");
const profileSummary = document.getElementById("profile-summary");
const profileTags = document.getElementById("profile-tags");
const personalizedAnswer = document.getElementById("personalized-answer");
const reportProgress = document.getElementById("report-progress");
const reportAccuracy = document.getElementById("report-accuracy");
const reportActivity = document.getElementById("report-activity");
const reportPoints = document.getElementById("report-points");
const reportTemplateList = document.getElementById("report-template-list");
const reportTemplateTitle = document.getElementById("report-template-title");
const reportTemplateSummary = document.getElementById("report-template-summary");
const reportTemplateTags = document.getElementById("report-template-tags");
const reportTitleInput = document.getElementById("report-title-input");
const reportTaskInput = document.getElementById("report-task-input");
const reportBodyInput = document.getElementById("report-body-input");
const reportSaveButton = document.getElementById("report-save-btn");
const reportSubmitButton = document.getElementById("report-submit-btn");
const reportAiBox = document.getElementById("report-ai-box");
const syncTeacherDbButton = document.getElementById("sync-teacher-db-btn");
const teacherStudentCount = document.getElementById("teacher-student-count");
const teacherAvgProgress = document.getElementById("teacher-avg-progress");
const teacherAvgAccuracy = document.getElementById("teacher-avg-accuracy");
const teacherRiskCount = document.getElementById("teacher-risk-count");
const teacherStudentTable = document.getElementById("teacher-student-table");
const teacherStudentName = document.getElementById("teacher-student-name");
const teacherStudentSummary = document.getElementById("teacher-student-summary");
const teacherStudentTags = document.getElementById("teacher-student-tags");
const teacherStudentDetail = document.getElementById("teacher-student-detail");
const teacherReportList = document.getElementById("teacher-report-list");
const foundationSelect = document.getElementById("foundation-select");
const ageInput = document.getElementById("age-input");
const gradeSelect = document.getElementById("grade-select");
const handsOnSelect = document.getElementById("hands-on-select");
const styleSelect = document.getElementById("style-select");
const practiceSelect = document.getElementById("practice-select");
const goalSelect = document.getElementById("goal-select");
const generateProfileButton = document.getElementById("generate-profile-btn");
const initialProfileBox = document.getElementById("initial-profile-box");
const checkConnectivityButton = document.getElementById("check-connectivity-btn");
const saveAdminConfigButton = document.getElementById("save-admin-config");
const adminConfigPreview = document.getElementById("admin-config-preview");
const adminRagCollection = document.getElementById("admin-rag-collection");
const adminTopK = document.getElementById("admin-top-k");
const adminKeywordWeight = document.getElementById("admin-keyword-weight");
const adminVectorWeight = document.getElementById("admin-vector-weight");
const adminRerank = document.getElementById("admin-rerank");
const adminChunkSize = document.getElementById("admin-chunk-size");
const adminChunkOverlap = document.getElementById("admin-chunk-overlap");
const adminLlmModel = document.getElementById("admin-llm-model");
const adminEmbeddingModel = document.getElementById("admin-embedding-model");
const adminTemperature = document.getElementById("admin-temperature");

const SVG_NS = "http://www.w3.org/2000/svg";
const componentTemplates = {
  source: { label: "V", width: 88, height: 88, terminals: [{ x: -44, y: 0 }, { x: 44, y: 0 }] },
  acSource: { label: "AC", width: 92, height: 88, terminals: [{ x: -46, y: 0 }, { x: 46, y: 0 }] },
  resistor: { label: "R", width: 124, height: 46, terminals: [{ x: -62, y: 0 }, { x: 62, y: 0 }] },
  diode: { label: "D", width: 100, height: 58, terminals: [{ x: -50, y: 0 }, { x: 50, y: 0 }] },
  led: { label: "LED", width: 110, height: 62, terminals: [{ x: -55, y: 0 }, { x: 55, y: 0 }] },
  capacitor: { label: "C", width: 92, height: 52, terminals: [{ x: -46, y: 0 }, { x: 46, y: 0 }] },
  inductor: { label: "L", width: 128, height: 52, terminals: [{ x: -64, y: 0 }, { x: 64, y: 0 }] },
  switch: { label: "S", width: 118, height: 48, terminals: [{ x: -59, y: 0 }, { x: 59, y: 0 }] },
  fuse: { label: "F", width: 118, height: 44, terminals: [{ x: -59, y: 0 }, { x: 59, y: 0 }] },
  terminal: { label: "XT", width: 98, height: 72, terminals: [{ x: -49, y: -14 }, { x: -49, y: 14 }, { x: 49, y: -14 }, { x: 49, y: 14 }] },
  connector: { label: "J", width: 98, height: 72, terminals: [{ x: -49, y: -14 }, { x: -49, y: 14 }, { x: 49, y: -14 }, { x: 49, y: 14 }] },
  junction: { label: "JNT", width: 58, height: 58, terminals: [{ x: -29, y: 0 }, { x: 29, y: 0 }, { x: 0, y: -29 }, { x: 0, y: 29 }] },
  lamp: { label: "HL", width: 86, height: 86, terminals: [{ x: -43, y: 0 }, { x: 43, y: 0 }] },
  ground: { label: "GND", width: 72, height: 54, terminals: [{ x: 0, y: -28 }] }
};

let components = [];
let wires = [];
let componentCounter = 0;
let wireCounter = 0;
let selectedComponentId = null;
let isWireMode = false;
let pendingWireStart = null;
let dragState = null;
let lastConnectivityResult = null;
let activeReportTemplateId = "memo";
let studySeconds = 0;
let studyTimerHandle = null;
let selectedLoginRole = "student";
let currentRole = "student";
let onboardingCompleted = false;

const roleConfigs = {
  student: {
    name: "学生端",
    desc: "学习、问答、绘图、提交报告",
    title: "学生端 · 电路电子学习空间",
    badge: "Student",
    summary: "学生端聚焦章节学习、首次问卷、AI 教师、电路图绘制、工程报告提交和学习画像更新。",
    tags: ["章节学习", "AI 教师", "电路绘图", "工程报告"],
    features: ["首次登录问卷生成初始画像", "章节学习正计时与学习轨迹记录", "AI 教师按画像调整讲解方式"],
    metrics: ["68%", "24m", "3"],
    labels: ["章节完成率", "今日学习", "待提交任务"]
  },
  teacher: {
    name: "教师端",
    desc: "课程管理、任务发布、报告评阅",
    title: "教师端 · 课程与学情工作台",
    badge: "Teacher",
    summary: "教师端用于维护章节、发布项目任务、管理题库、评阅工程报告，并查看学生画像和学习报告。",
    tags: ["课程管理", "题库管理", "报告评阅", "学情分析"],
    features: ["发布项目化任务和工程报告模板", "查看 AI 初评与教师复核入口", "按学生画像调整教学干预策略"],
    metrics: ["91", "18", "12"],
    labels: ["班级人数", "待评报告", "风险学生"]
  },
  admin: {
    name: "管理员端",
    desc: "账号权限、标准库、系统配置",
    title: "管理员端 · 平台与标准资源管理",
    badge: "Admin",
    summary: "管理员端负责账号权限、课程资源、IEC 标准元件库、模型配置和系统审计。",
    tags: ["账号权限", "资源库", "标准库", "系统审计"],
    features: ["管理教师、学生和班级权限", "维护 IEC 标准来源与本地元件库映射", "配置模型、向量库和安全审计策略"],
    metrics: ["23", "8", "99%"],
    labels: ["课程数量", "资源库", "服务可用率"]
  }
};

const studentProfiles = [
  {
    id: "student-a",
    name: "学生 A · 基础薄弱型",
    short: "偏好步骤讲解，容易跳步骤",
    summary: "当前学习到电路基础分析章节，喜欢步骤化讲解，遇到综合题时容易跳步。",
    tags: ["步骤型", "鼓励型", "基础巩固", "电路分析薄弱"],
    answer:
      "先别急着套公式，我们一步一步看。只要这段支路里电阻的电流和阻值明确，根据欧姆定律 `U = IR` 就能求电压。你可以先确认这只电阻有没有和别的元件构成复杂支路，然后先求电流，再求电压。",
    progress: "61%",
    accuracy: "58%",
    activity: "高",
    reportPoints: [
      "近期提问集中在串并联分析与欧姆定律应用。",
      "对分步骤解释反馈较好，图示辅助理解效果明显。",
      "建议先加强基础电路分析，再逐步增加综合题练习。"
    ]
  },
  {
    id: "student-b",
    name: "学生 B · 稳定提升型",
    short: "理解较稳，适合平衡型训练",
    summary: "当前章节完成度较高，能接受概念和例题结合的讲解，对中等难度练习适配良好。",
    tags: ["平衡型", "概念+例题", "中等难度", "进度稳定"],
    answer:
      "可以，因为当这只电阻的电流已知，且它本身阻值确定时，欧姆定律直接给出两端电压。这里要注意前提是你求到的是流经该电阻本身的电流，而不是整段电路的总电流。",
    progress: "78%",
    accuracy: "74%",
    activity: "中",
    reportPoints: [
      "章节完成率和测验表现比较稳定。",
      "对“概念解释 + 小例题”形式吸收较快。",
      "建议开始增加稍复杂的节点电压分析题。"
    ]
  },
  {
    id: "student-c",
    name: "学生 C · 进阶推导型",
    short: "喜欢原理和推导，适合挑战题",
    summary: "倾向用公式与逻辑推导理解知识点，提问较简洁，但会追问边界条件和特殊情况。",
    tags: ["严谨型", "推导型", "进阶练习", "追问深入"],
    answer:
      "本质上是因为电阻元件满足伏安关系 `u = Ri`。如果你已经明确该元件支路电流，那么电阻两端电压就是该关系的直接结果。真正需要警惕的是，复杂网络中你必须先确认参考方向和支路电流定义一致。",
    progress: "89%",
    accuracy: "86%",
    activity: "中高",
    reportPoints: [
      "对原理推导和边界条件讨论较敏感。",
      "提问少但质量高，适合加入拓展型题目。",
      "建议增加戴维南等效与复杂网络分析训练。"
    ]
  }
];
let activeProfileId = "student-a";
let activeTeacherStudentId = "student-a";
let teacherStudents = [
  {
    id: "student-a",
    name: "林同学",
    className: "电气 2401",
    progress: 0.61,
    accuracy: 0.58,
    activity: "高",
    risk: "需关注",
    tags: ["基础薄弱", "步骤化", "鼓励型"],
    summary: "基础薄弱，适合步骤化、鼓励型讲解。",
    advice: "建议安排串并联分析的低难度变式训练，并要求补充计算单位和参考方向。"
  },
  {
    id: "student-b",
    name: "周同学",
    className: "电气 2401",
    progress: 0.78,
    accuracy: 0.74,
    activity: "中",
    risk: "正常",
    tags: ["基础稳定", "概念+例题", "平衡型"],
    summary: "理解较稳，适合中等难度练习和工程情境题。",
    advice: "建议增加节点电压法与复杂支路分析题，保持稳定提升。"
  },
  {
    id: "student-c",
    name: "陈同学",
    className: "电气 2402",
    progress: 0.89,
    accuracy: 0.86,
    activity: "中高",
    risk: "优秀",
    tags: ["进阶推导", "严谨型", "挑战题"],
    summary: "理解能力较强，适合推导型讲解和挑战题。",
    advice: "建议加入戴维南等效、复杂网络分析和工程表达训练。"
  }
];
let teacherReports = [
  { studentName: "林同学", status: "AI 初评 72，待教师复核" },
  { studentName: "周同学", status: "AI 初评 84，报告复核中" }
];
const reportTemplates = [
  {
    id: "memo",
    name: "技术备忘录",
    short: "参数校核、选型与优化结论",
    title: "LED 驱动电路优化技术备忘录",
    task: "任务五 · 工况优化与工程文档输出",
    summary: "面向模块一任务五，要求学生输出完整的设计背景、参数校核、元器件选型和工况优化结论。",
    tags: ["工程结论", "参数计算", "工况优化"],
    body:
      "项目背景：焊装车间 PLC 控制柜 LED 指示灯频繁出现烧毁、频闪和限流电阻发热问题。\n\n参数校核：以 5V 电源、LED 正向压降 2V 为基础，计算限流电阻并完成功率降额校核。\n\n选型结论：优先采用 330Ω 1/2W 电阻方案，在宽温环境下保留足够设计余量。\n\n运维建议：建立每周巡检表，重点记录亮度、电阻温升与异常现象。"
  },
  {
    id: "inspection",
    name: "巡检记录表",
    short: "设备状态、测量值与异常记录",
    title: "LED 指示灯系统每周巡检记录表",
    task: "任务四 · 故障诊断与运维体系设计",
    summary: "面向设备巡检与运维场景，要求学生按结构化字段记录测量值、异常现象和处理建议。",
    tags: ["结构化记录", "巡检项目", "异常处理"],
    body:
      "巡检对象：PLC 控制柜 12 号柜。\n\n巡检项目：电源电压、LED 亮度、电阻温升、接线状态。\n\n测量结果：电源 5.02V，LED 状态正常，限流电阻表面温升偏高。\n\n处理建议：建议下次停机维护时更换为更高功率等级电阻，并复查通风条件。"
  },
  {
    id: "resume",
    name: "工程履历",
    short: "项目成果沉淀与个人总结",
    title: "模块一项目工程履历归档",
    task: "任务五 · 工况优化与工程文档输出",
    summary: "面向成果归档与能力展示，要求学生沉淀项目背景、关键数据、问题解决过程和反思总结。",
    tags: ["成果归档", "项目总结", "能力展示"],
    body:
      "项目主题：模块一点亮 LED 直流驱动电路设计与运维。\n\n完成内容：需求分析、原理图绘制、面包板搭建、参数测量、故障排查、运维方案设计。\n\n个人收获：理解了功率降额设计的重要性，建立了“安全、规范、权衡、求实”的工程意识。"
  }
];

function showPanel(panelId) {
  navItems.forEach((item) => item.classList.toggle("active", item.dataset.panel === panelId));
  panels.forEach((panel) => panel.classList.toggle("active", panel.id === panelId));
}

navItems.forEach((item) => {
  item.addEventListener("click", () => showPanel(item.dataset.panel));
});

function updateRole(role) {
  const config = roleConfigs[role];
  if (!config) return;

  currentRoleName.textContent = config.name;
  currentRoleDesc.textContent = config.desc;
  roleTitle.textContent = config.title;
  roleBadge.textContent = config.badge;
  roleSummary.textContent = config.summary;
  roleTags.innerHTML = config.tags.map((tag) => `<span class="chip">${tag}</span>`).join("");
  roleFeatures.innerHTML = config.features.map((feature) => `<li>${feature}</li>`).join("");
  [roleMetricA.textContent, roleMetricB.textContent, roleMetricC.textContent] = config.metrics;
  [roleLabelA.textContent, roleLabelB.textContent, roleLabelC.textContent] = config.labels;

  navItems.forEach((item) => {
    const allowedRoles = (item.dataset.roles || "student,teacher,admin").split(",");
    item.hidden = !allowedRoles.includes(role);
  });
}

function loginAs(role) {
  currentRole = role;
  updateRole(role);
  loginScreen.classList.add("hidden");
  if (role === "admin") {
    showPanel("admin");
    return;
  }

  showPanel(role === "student" && !onboardingCompleted ? "onboarding" : "dashboard");
}

loginRoleCards.forEach((button) => {
  button.addEventListener("click", () => {
    selectedLoginRole = button.dataset.loginRole;
    loginRoleCards.forEach((item) => item.classList.toggle("active", item === button));
    loginAccount.value = selectedLoginRole === "student" ? "student001" : selectedLoginRole === "teacher" ? "teacher001" : "admin001";
  });
});

loginSubmitButton.addEventListener("click", () => {
  if (!loginAccount.value.trim() || !loginPassword.value.trim()) {
    loginStatus.textContent = "请输入账号和密码。";
    return;
  }

  loginStatus.textContent = selectedLoginRole === "student" && !onboardingCompleted
    ? "学生首次登录，需要先完成问卷。"
    : "登录成功。";
  loginAs(selectedLoginRole);
});

logoutButton.addEventListener("click", () => {
  loginScreen.classList.remove("hidden");
  loginStatus.textContent = "已退出登录，请重新选择身份并登录。";
  showPanel("dashboard");
});

function formatDuration(totalSeconds) {
  const hours = String(Math.floor(totalSeconds / 3600)).padStart(2, "0");
  const minutes = String(Math.floor((totalSeconds % 3600) / 60)).padStart(2, "0");
  const seconds = String(totalSeconds % 60).padStart(2, "0");
  return `${hours}:${minutes}:${seconds}`;
}

function renderStudyTimer() {
  studyTimer.textContent = formatDuration(studySeconds);
  courseTotalTime.textContent = formatDuration(studySeconds);
}

function startStudyTimer() {
  if (studyTimerHandle) return;
  studyTimerHandle = window.setInterval(() => {
    studySeconds += 1;
    renderStudyTimer();
  }, 1000);
}

function pauseStudyTimer() {
  window.clearInterval(studyTimerHandle);
  studyTimerHandle = null;
}

function resetStudyTimer() {
  pauseStudyTimer();
  studySeconds = 0;
  renderStudyTimer();
}

function renderChapters() {
  chapters.forEach((chapter, index) => {
    const item = document.createElement("button");
    item.className = "chapter-item";
    item.innerHTML = `<h5>${chapter.title}</h5><p>${chapter.summary}</p><span class="chapter-enter">进入学习</span>`;
    item.addEventListener("click", () => {
      document.querySelectorAll(".chapter-item").forEach((node) => node.classList.remove("active"));
      item.classList.add("active");
      openChapter(chapter);
    });
    chapterList.appendChild(item);
  });
}

function openChapter(chapter) {
  courseListView.classList.add("hidden-view");
  courseStudyView.classList.remove("hidden-view");
  chapterTitle.textContent = chapter.title;
  chapterSummary.textContent = chapter.summary;
  coarseChunk.textContent = chapter.coarse;
  fineChunk.textContent = chapter.fine;
  chapterResources.innerHTML = chapter.resources.map((item) => `<li>${item}</li>`).join("");
  chapterPath.innerHTML = chapter.path.map((item) => `<li>${item}</li>`).join("");
  lessonTitle.textContent = chapter.title;
  lessonBody.textContent = chapter.lesson;
  startStudyTimer();
}

function backToCourseList() {
  courseStudyView.classList.add("hidden-view");
  courseListView.classList.remove("hidden-view");
}

function appendMessage(text, role) {
  const node = document.createElement("div");
  node.className = `chat-message ${role}`;
  node.textContent = text;
  chatBox.appendChild(node);
  chatBox.scrollTop = chatBox.scrollHeight;
}

document.querySelectorAll(".prompt-item").forEach((item) => {
  item.addEventListener("click", () => {
    questionInput.value = item.dataset.question;
    askQuestion();
  });
});

async function askQuestion() {
  const question = questionInput.value.trim();
  if (!question) return;

  appendMessage(question, "student");
  questionInput.value = "";
  appendMessage("正在调用 AI 教师...", "teacher");

  try {
    const response = await fetch("http://127.0.0.1:8000/api/assistant/ask", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        course_id: "course-circuit-electronics",
        chapter_id: "m1-task-1",
        question
      })
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    const data = await response.json();
    chatBox.lastElementChild.textContent = data.answer || "AI 教师暂时没有返回内容。";
  } catch (error) {
    chatBox.lastElementChild.textContent = `没有连上后端 AI 服务：${error.message}。请确认 FastAPI 已启动在 8000 端口。`;
  }
}

askButton.addEventListener("click", askQuestion);
questionInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    event.preventDefault();
    askQuestion();
  }
});

jumpQuiz.addEventListener("click", () => showPanel("quiz"));
backToCourseListButton.addEventListener("click", backToCourseList);
lessonAskButton.addEventListener("click", () => showPanel("assistant"));
lessonDrawButton.addEventListener("click", () => showPanel("circuit"));
lessonReportButton.addEventListener("click", () => showPanel("report"));

scoreButton.addEventListener("click", () => {
  const answer = answerInput.value.trim();
  if (!answer) {
    scoreBox.innerHTML = `
      <div class="score-pill">请先作答</div>
      <p class="muted">示例答案至少需要说明“栈是后进先出、队列是先进先出”，并举出一个应用场景。</p>
    `;
    return;
  }

  const hasStack = answer.includes("后进先出") || answer.includes("栈");
  const hasQueue = answer.includes("先进先出") || answer.includes("队列");
  const hasExample = answer.includes("括号") || answer.includes("排队") || answer.includes("浏览器") || answer.includes("搜索");
  const score = 4 + (hasStack ? 2 : 0) + (hasQueue ? 2 : 0) + (hasExample ? 2 : 0);

  scoreBox.innerHTML = `
    <div class="score-pill">AI 评分：${score}/10</div>
    <p><strong>得分点：</strong> ${hasStack ? "提到了栈的访问顺序。" : "未准确说明栈的核心顺序。"} ${hasQueue ? "提到了队列的访问顺序。" : "未准确说明队列的核心顺序。"} ${hasExample ? "给出了应用示例。" : "缺少具体应用示例。"}</p>
    <p><strong>评分依据：</strong> 先按 rubric 识别核心概念，再结合课程知识库中的“定义块”和“应用块”给出解释。</p>
    <p><strong>改进建议：</strong> 可以再明确写出“栈是后进先出，队列是先进先出”，并把例子和顺序特点对应起来。</p>
  `;
});

renderChapters();

function renderProfiles() {
  profileList.innerHTML = "";
  studentProfiles.forEach((profile) => {
    const button = document.createElement("button");
    button.className = `profile-item${profile.id === activeProfileId ? " active" : ""}`;
    button.innerHTML = `<h5>${profile.name}</h5><p>${profile.short}</p>`;
    button.addEventListener("click", () => {
      activeProfileId = profile.id;
      updateProfileView();
    });
    profileList.appendChild(button);
  });
}

function updateProfileView() {
  const profile = studentProfiles.find((item) => item.id === activeProfileId);
  if (!profile) return;

  profileName.textContent = profile.name;
  profileSummary.textContent = profile.summary;
  profileTags.innerHTML = profile.tags.map((tag) => `<span class="chip">${tag}</span>`).join("");
  personalizedAnswer.textContent = profile.answer;
  reportProgress.textContent = profile.progress;
  reportAccuracy.textContent = profile.accuracy;
  reportActivity.textContent = profile.activity;
  reportPoints.innerHTML = profile.reportPoints.map((item) => `<li>${item}</li>`).join("");
  renderProfiles();
}

function percent(value) {
  return `${Math.round(value * 100)}%`;
}

function renderTeacherOverview() {
  const count = teacherStudents.length;
  const avgProgress = count ? teacherStudents.reduce((sum, item) => sum + item.progress, 0) / count : 0;
  const avgAccuracy = count ? teacherStudents.reduce((sum, item) => sum + item.accuracy, 0) / count : 0;
  const riskCount = teacherStudents.filter((item) => item.risk === "需关注").length;

  teacherStudentCount.textContent = String(count);
  teacherAvgProgress.textContent = percent(avgProgress);
  teacherAvgAccuracy.textContent = percent(avgAccuracy);
  teacherRiskCount.textContent = String(riskCount);
}

function renderTeacherStudentDetail() {
  const student = teacherStudents.find((item) => item.id === activeTeacherStudentId) || teacherStudents[0];
  if (!student) return;

  teacherStudentName.textContent = student.name;
  teacherStudentSummary.textContent = student.summary;
  teacherStudentTags.innerHTML = student.tags.map((tag) => `<span class="chip">${tag}</span>`).join("");
  teacherStudentDetail.innerHTML = `
    <div class="score-pill">干预建议</div>
    <p><strong>学习状态：</strong> ${student.className} / 进度 ${percent(student.progress)} / 正确率 ${percent(student.accuracy)} / 风险 ${student.risk}</p>
    <p class="muted">${student.advice}</p>
  `;
}

function renderTeacherStudents() {
  renderTeacherOverview();
  teacherStudentTable.innerHTML = teacherStudents.map((student) => `
    <button class="student-row ${student.id === activeTeacherStudentId ? "active" : ""}" data-teacher-student-id="${student.id}">
      <strong>${student.name}</strong>
      <span>${student.className}</span>
      <span>${percent(student.progress)}</span>
      <span>${percent(student.accuracy)}</span>
      <span>${student.risk}</span>
    </button>
  `).join("");

  document.querySelectorAll("[data-teacher-student-id]").forEach((button) => {
    button.addEventListener("click", () => {
      activeTeacherStudentId = button.dataset.teacherStudentId;
      renderTeacherStudents();
    });
  });

  renderTeacherStudentDetail();
  teacherReportList.innerHTML = teacherReports.map((report) => `
    <div><strong>${report.studentName}</strong><span>${report.status}</span></div>
  `).join("");
}

async function syncTeacherDataFromBackend() {
  syncTeacherDbButton.textContent = "同步中...";
  try {
    const [studentsResponse, reportsResponse] = await Promise.all([
      fetch("http://127.0.0.1:8000/api/teacher/courses/course-circuit/students"),
      fetch("http://127.0.0.1:8000/api/teacher/courses/course-circuit/reports")
    ]);

    if (!studentsResponse.ok) throw new Error("学生接口未返回成功状态");

    const students = await studentsResponse.json();
    const reports = reportsResponse.ok ? await reportsResponse.json() : [];
    teacherStudents = students.map((item) => ({
      id: `student-${item.student_id}`,
      name: item.display_name,
      className: item.class_name,
      progress: item.progress,
      accuracy: item.accuracy,
      activity: item.activity_level,
      risk: item.risk_level,
      tags: [item.profile?.foundation, item.profile?.learning_style, item.profile?.answer_tone].filter(Boolean),
      summary: item.profile?.long_term_summary || "暂无长期画像摘要。",
      advice: item.profile?.weak_points ? `重点关注：${item.profile.weak_points}。常错类型：${item.profile.common_mistakes}` : "暂无干预建议。"
    }));
    teacherReports = reports.map((item) => ({
      studentName: item.student_name,
      status: `AI 初评 ${item.ai_score}，${item.status}`
    }));
    activeTeacherStudentId = teacherStudents[0]?.id || activeTeacherStudentId;
    renderTeacherStudents();
    syncTeacherDbButton.textContent = "已同步 PostgreSQL";
  } catch (error) {
    syncTeacherDbButton.textContent = "同步失败，使用本地演示数据";
    teacherStudentDetail.innerHTML = `
      <div class="score-pill">数据库未连接</div>
      <p class="muted">请先启动后端和 PostgreSQL。当前页面继续展示本地演示数据。</p>
    `;
  }
}

function renderReportTemplates() {
  reportTemplateList.innerHTML = "";
  reportTemplates.forEach((template) => {
    const button = document.createElement("button");
    button.className = `profile-item${template.id === activeReportTemplateId ? " active" : ""}`;
    button.innerHTML = `<h5>${template.name}</h5><p>${template.short}</p>`;
    button.addEventListener("click", () => {
      activeReportTemplateId = template.id;
      updateReportTemplateView();
    });
    reportTemplateList.appendChild(button);
  });
}

function updateReportTemplateView() {
  const template = reportTemplates.find((item) => item.id === activeReportTemplateId);
  if (!template) return;

  reportTemplateTitle.textContent = template.title;
  reportTemplateSummary.textContent = template.summary;
  reportTemplateTags.innerHTML = template.tags.map((tag) => `<span class="chip">${tag}</span>`).join("");
  reportTitleInput.value = template.title;
  reportTaskInput.value = template.task;
  reportBodyInput.value = template.body;
  renderReportTemplates();
}

function generateInitialProfile() {
  const foundationMap = {
    weak: "基础偏弱，建议从概念和步骤化讲解开始。",
    mid: "基础中等，适合概念讲解与章节练习并行。",
    strong: "基础较好，可加入推导和进阶题。"
  };
  const styleMap = {
    stepwise: "偏好分步骤拆解，回答宜更慢更细。",
    example: "偏好先举例再解释，适合用场景化说明。",
    rigorous: "偏好公式与原理推导，可提高理论密度。"
  };
  const practiceMap = {
    solid: "练习策略偏基础巩固，先稳住正确率。",
    balanced: "练习策略偏平衡推进，难度逐步抬升。",
    challenge: "练习策略偏挑战型，可加入综合题。"
  };
  const goalMap = {
    concept: "近期目标是先把概念听明白。",
    calculation: "近期目标是提高计算题与参数校核能力。",
    diagram: "近期目标是掌握电路图绘制与连通性检查。"
  };
  const gradeMap = {
    freshman: "处于入门阶段，建议保留更多概念铺垫。",
    sophomore: "处于专业基础阶段，适合从项目任务中强化知识迁移。",
    junior: "处于专业深化阶段，可增加工程约束与综合设计。",
    vocational: "处于项目实践阶段，适合强化操作规范和成果交付。"
  };
  const handsOnMap = {
    none: "实操经验较少，应优先补安全规范和仪器操作。",
    basic: "有基础实操经验，可结合面包板和万用表任务推进。",
    skilled: "实操基础较好，可加入故障诊断和工况优化任务。"
  };

  const generatedAt = new Date().toLocaleTimeString("zh-CN", { hour: "2-digit", minute: "2-digit", second: "2-digit" });

  initialProfileBox.innerHTML = `
    <div class="score-pill">初始画像已生成</div>
    <p><strong>基础信息：</strong> 年龄 ${ageInput.value || "未填"}，${gradeMap[gradeSelect.value]} ${handsOnMap[handsOnSelect.value]}</p>
    <p><strong>初始结论：</strong> ${foundationMap[foundationSelect.value]} ${styleMap[styleSelect.value]} ${practiceMap[practiceSelect.value]} ${goalMap[goalSelect.value]}</p>
    <p><strong>系统策略：</strong> 先给出一个模糊学生画像，后续再根据 AI 对话、章节作答、工程报告和电路图表现自动修正标签。</p>
    <p><strong>当前标签：</strong> ${[
      `${ageInput.value || "未知年龄"}岁`,
      gradeSelect.options[gradeSelect.selectedIndex].text,
      handsOnSelect.options[handsOnSelect.selectedIndex].text,
      foundationSelect.options[foundationSelect.selectedIndex].text,
      styleSelect.options[styleSelect.selectedIndex].text,
      practiceSelect.options[practiceSelect.selectedIndex].text
    ].join(" / ")}</p>
    <p><strong>生成时间：</strong> ${generatedAt}</p>
  `;
  onboardingCompleted = true;
  generateProfileButton.textContent = "重新生成画像";
  generateProfileButton.dataset.generated = "true";

  if (currentRole === "student") {
    window.setTimeout(() => {
      showPanel("dashboard");
    }, 450);
  }
}

function setCircuitStatus(title, description) {
  circuitStatusBox.innerHTML = `
    <div class="score-pill">${title}</div>
    <p class="muted">${description}</p>
  `;
}

function updateModeIndicator() {
  circuitModeIndicator.textContent = isWireMode ? "连线模式" : "普通模式";
}

function createComponent(type, x, y) {
  componentCounter += 1;
  return {
    id: `${type}-${componentCounter}`,
    type,
    x,
    y,
    label: `${componentTemplates[type].label}${componentCounter}`
  };
}

function initializeCircuitDemo() {
  components = [
    createComponent("source", 160, 180),
    createComponent("resistor", 380, 180),
    createComponent("led", 600, 180),
    createComponent("ground", 160, 330)
  ];
  wires = [
    { id: `wire-${++wireCounter}`, from: `${components[0].id}:1`, to: `${components[1].id}:0`, type: "power", jointType: "terminal" },
    { id: `wire-${++wireCounter}`, from: `${components[1].id}:1`, to: `${components[2].id}:0`, type: "power", jointType: "terminal" },
    { id: `wire-${++wireCounter}`, from: `${components[2].id}:1`, to: `${components[3].id}:0`, type: "ground", jointType: "terminal" },
    { id: `wire-${++wireCounter}`, from: `${components[0].id}:0`, to: `${components[3].id}:0`, type: "ground", jointType: "terminal" }
  ];
  renderCircuit();
}

function getComponentById(componentId) {
  return components.find((item) => item.id === componentId);
}

function getTerminalPosition(componentId, terminalIndex) {
  const component = getComponentById(componentId);
  if (!component) return null;
  const terminal = componentTemplates[component.type].terminals[terminalIndex];
  return {
    x: component.x + terminal.x,
    y: component.y + terminal.y
  };
}

function parseTerminalRef(ref) {
  const [componentId, terminalIndex] = ref.split(":");
  return { componentId, terminalIndex: Number(terminalIndex) };
}

function renderWire(wire) {
  const fromRef = parseTerminalRef(wire.from);
  const toRef = parseTerminalRef(wire.to);
  const from = getTerminalPosition(fromRef.componentId, fromRef.terminalIndex);
  const to = getTerminalPosition(toRef.componentId, toRef.terminalIndex);
  if (!from || !to) return;

  const line = document.createElementNS(SVG_NS, "line");
  line.setAttribute("x1", from.x);
  line.setAttribute("y1", from.y);
  line.setAttribute("x2", to.x);
  line.setAttribute("y2", to.y);
  line.setAttribute("class", `wire-line ${wire.type || "power"}`);
  line.dataset.wireId = wire.id;
  line.dataset.jointType = wire.jointType || "terminal";
  circuitWiresLayer.appendChild(line);
}

function renderSource(group, component) {
  const circle = document.createElementNS(SVG_NS, "circle");
  circle.setAttribute("cx", 0);
  circle.setAttribute("cy", 0);
  circle.setAttribute("r", 28);
  circle.setAttribute("fill", "rgba(255,255,255,0.94)");
  circle.setAttribute("stroke", "#8d3e1e");
  circle.setAttribute("stroke-width", "3");
  circle.setAttribute("class", "symbol-body");
  group.appendChild(circle);

  const plus = document.createElementNS(SVG_NS, "text");
  plus.setAttribute("x", 0);
  plus.setAttribute("y", 7);
  plus.setAttribute("text-anchor", "middle");
  plus.setAttribute("fill", "#8d3e1e");
  plus.setAttribute("font-size", "28");
  plus.textContent = "+";
  group.appendChild(plus);
}

function renderAcSource(group) {
  const circle = document.createElementNS(SVG_NS, "circle");
  circle.setAttribute("cx", 0);
  circle.setAttribute("cy", 0);
  circle.setAttribute("r", 28);
  circle.setAttribute("fill", "rgba(255,255,255,0.94)");
  circle.setAttribute("stroke", "#8d3e1e");
  circle.setAttribute("stroke-width", "3");
  circle.setAttribute("class", "symbol-body");
  group.appendChild(circle);

  const wave = document.createElementNS(SVG_NS, "path");
  wave.setAttribute("d", "M -18 0 C -10 -18, -2 -18, 6 0 C 12 14, 20 14, 26 0");
  wave.setAttribute("fill", "none");
  wave.setAttribute("stroke", "#8d3e1e");
  wave.setAttribute("stroke-width", "3");
  group.appendChild(wave);
}

function renderResistor(group) {
  const lineLeft = document.createElementNS(SVG_NS, "line");
  lineLeft.setAttribute("x1", -62);
  lineLeft.setAttribute("y1", 0);
  lineLeft.setAttribute("x2", -32);
  lineLeft.setAttribute("y2", 0);
  lineLeft.setAttribute("stroke", "#8d3e1e");
  lineLeft.setAttribute("stroke-width", "3");
  group.appendChild(lineLeft);

  const body = document.createElementNS(SVG_NS, "rect");
  body.setAttribute("x", -32);
  body.setAttribute("y", -18);
  body.setAttribute("width", 64);
  body.setAttribute("height", 36);
  body.setAttribute("fill", "rgba(255,255,255,0.94)");
  body.setAttribute("stroke", "#8d3e1e");
  body.setAttribute("stroke-width", "3");
  body.setAttribute("class", "symbol-body");
  group.appendChild(body);

  const lineRight = document.createElementNS(SVG_NS, "line");
  lineRight.setAttribute("x1", 32);
  lineRight.setAttribute("y1", 0);
  lineRight.setAttribute("x2", 62);
  lineRight.setAttribute("y2", 0);
  lineRight.setAttribute("stroke", "#8d3e1e");
  lineRight.setAttribute("stroke-width", "3");
  group.appendChild(lineRight);
}

function renderLed(group) {
  const leftWire = document.createElementNS(SVG_NS, "line");
  leftWire.setAttribute("x1", -55);
  leftWire.setAttribute("y1", 0);
  leftWire.setAttribute("x2", -16);
  leftWire.setAttribute("y2", 0);
  leftWire.setAttribute("stroke", "#8d3e1e");
  leftWire.setAttribute("stroke-width", "3");
  group.appendChild(leftWire);

  const triangle = document.createElementNS(SVG_NS, "polygon");
  triangle.setAttribute("points", "-16,-24 18,0 -16,24");
  triangle.setAttribute("fill", "rgba(255,255,255,0.94)");
  triangle.setAttribute("stroke", "#8d3e1e");
  triangle.setAttribute("stroke-width", "3");
  triangle.setAttribute("class", "symbol-body");
  group.appendChild(triangle);

  const cathode = document.createElementNS(SVG_NS, "line");
  cathode.setAttribute("x1", 20);
  cathode.setAttribute("y1", -24);
  cathode.setAttribute("x2", 20);
  cathode.setAttribute("y2", 24);
  cathode.setAttribute("stroke", "#8d3e1e");
  cathode.setAttribute("stroke-width", "3");
  cathode.setAttribute("class", "symbol-body");
  group.appendChild(cathode);

  const rightWire = document.createElementNS(SVG_NS, "line");
  rightWire.setAttribute("x1", 20);
  rightWire.setAttribute("y1", 0);
  rightWire.setAttribute("x2", 55);
  rightWire.setAttribute("y2", 0);
  rightWire.setAttribute("stroke", "#8d3e1e");
  rightWire.setAttribute("stroke-width", "3");
  group.appendChild(rightWire);

  [[8, -18, 26, -34], [18, -10, 36, -26]].forEach((coords) => {
    const arrow = document.createElementNS(SVG_NS, "line");
    arrow.setAttribute("x1", coords[0]);
    arrow.setAttribute("y1", coords[1]);
    arrow.setAttribute("x2", coords[2]);
    arrow.setAttribute("y2", coords[3]);
    arrow.setAttribute("stroke", "#8d3e1e");
    arrow.setAttribute("stroke-width", "2.5");
    group.appendChild(arrow);

    const head = document.createElementNS(SVG_NS, "polyline");
    head.setAttribute("points", `${coords[2] - 8},${coords[3] + 4} ${coords[2]},${coords[3]} ${coords[2] - 4},${coords[3] + 8}`);
    head.setAttribute("fill", "none");
    head.setAttribute("stroke", "#8d3e1e");
    head.setAttribute("stroke-width", "2.5");
    group.appendChild(head);
  });
}

function renderDiode(group) {
  const leftWire = document.createElementNS(SVG_NS, "line");
  leftWire.setAttribute("x1", -50);
  leftWire.setAttribute("y1", 0);
  leftWire.setAttribute("x2", -16);
  leftWire.setAttribute("y2", 0);
  leftWire.setAttribute("stroke", "#8d3e1e");
  leftWire.setAttribute("stroke-width", "3");
  group.appendChild(leftWire);

  const triangle = document.createElementNS(SVG_NS, "polygon");
  triangle.setAttribute("points", "-16,-22 16,0 -16,22");
  triangle.setAttribute("fill", "rgba(255,255,255,0.94)");
  triangle.setAttribute("stroke", "#8d3e1e");
  triangle.setAttribute("stroke-width", "3");
  triangle.setAttribute("class", "symbol-body");
  group.appendChild(triangle);

  const cathode = document.createElementNS(SVG_NS, "line");
  cathode.setAttribute("x1", 18);
  cathode.setAttribute("y1", -22);
  cathode.setAttribute("x2", 18);
  cathode.setAttribute("y2", 22);
  cathode.setAttribute("stroke", "#8d3e1e");
  cathode.setAttribute("stroke-width", "3");
  cathode.setAttribute("class", "symbol-body");
  group.appendChild(cathode);

  const rightWire = document.createElementNS(SVG_NS, "line");
  rightWire.setAttribute("x1", 18);
  rightWire.setAttribute("y1", 0);
  rightWire.setAttribute("x2", 50);
  rightWire.setAttribute("y2", 0);
  rightWire.setAttribute("stroke", "#8d3e1e");
  rightWire.setAttribute("stroke-width", "3");
  group.appendChild(rightWire);
}

function renderCapacitor(group) {
  const leftWire = document.createElementNS(SVG_NS, "line");
  leftWire.setAttribute("x1", -46);
  leftWire.setAttribute("y1", 0);
  leftWire.setAttribute("x2", -12);
  leftWire.setAttribute("y2", 0);
  leftWire.setAttribute("stroke", "#8d3e1e");
  leftWire.setAttribute("stroke-width", "3");
  group.appendChild(leftWire);

  const leftPlate = document.createElementNS(SVG_NS, "line");
  leftPlate.setAttribute("x1", -12);
  leftPlate.setAttribute("y1", -22);
  leftPlate.setAttribute("x2", -12);
  leftPlate.setAttribute("y2", 22);
  leftPlate.setAttribute("stroke", "#8d3e1e");
  leftPlate.setAttribute("stroke-width", "3");
  leftPlate.setAttribute("class", "symbol-body");
  group.appendChild(leftPlate);

  const rightPlate = document.createElementNS(SVG_NS, "line");
  rightPlate.setAttribute("x1", 12);
  rightPlate.setAttribute("y1", -22);
  rightPlate.setAttribute("x2", 12);
  rightPlate.setAttribute("y2", 22);
  rightPlate.setAttribute("stroke", "#8d3e1e");
  rightPlate.setAttribute("stroke-width", "3");
  rightPlate.setAttribute("class", "symbol-body");
  group.appendChild(rightPlate);

  const rightWire = document.createElementNS(SVG_NS, "line");
  rightWire.setAttribute("x1", 12);
  rightWire.setAttribute("y1", 0);
  rightWire.setAttribute("x2", 46);
  rightWire.setAttribute("y2", 0);
  rightWire.setAttribute("stroke", "#8d3e1e");
  rightWire.setAttribute("stroke-width", "3");
  group.appendChild(rightWire);
}

function renderInductor(group) {
  const leftWire = document.createElementNS(SVG_NS, "line");
  leftWire.setAttribute("x1", -64);
  leftWire.setAttribute("y1", 0);
  leftWire.setAttribute("x2", -40);
  leftWire.setAttribute("y2", 0);
  leftWire.setAttribute("stroke", "#8d3e1e");
  leftWire.setAttribute("stroke-width", "3");
  group.appendChild(leftWire);

  [-24, -8, 8, 24].forEach((cx) => {
    const arc = document.createElementNS(SVG_NS, "path");
    arc.setAttribute("d", `M ${cx - 16} 0 A 16 16 0 0 1 ${cx + 16} 0`);
    arc.setAttribute("fill", "none");
    arc.setAttribute("stroke", "#8d3e1e");
    arc.setAttribute("stroke-width", "3");
    arc.setAttribute("class", "symbol-body");
    group.appendChild(arc);
  });

  const rightWire = document.createElementNS(SVG_NS, "line");
  rightWire.setAttribute("x1", 40);
  rightWire.setAttribute("y1", 0);
  rightWire.setAttribute("x2", 64);
  rightWire.setAttribute("y2", 0);
  rightWire.setAttribute("stroke", "#8d3e1e");
  rightWire.setAttribute("stroke-width", "3");
  group.appendChild(rightWire);
}

function renderSwitch(group) {
  const leftWire = document.createElementNS(SVG_NS, "line");
  leftWire.setAttribute("x1", -59);
  leftWire.setAttribute("y1", 0);
  leftWire.setAttribute("x2", -18);
  leftWire.setAttribute("y2", 0);
  leftWire.setAttribute("stroke", "#8d3e1e");
  leftWire.setAttribute("stroke-width", "3");
  group.appendChild(leftWire);

  const rightWire = document.createElementNS(SVG_NS, "line");
  rightWire.setAttribute("x1", 18);
  rightWire.setAttribute("y1", 0);
  rightWire.setAttribute("x2", 59);
  rightWire.setAttribute("y2", 0);
  rightWire.setAttribute("stroke", "#8d3e1e");
  rightWire.setAttribute("stroke-width", "3");
  group.appendChild(rightWire);

  const contactLeft = document.createElementNS(SVG_NS, "circle");
  contactLeft.setAttribute("cx", -18);
  contactLeft.setAttribute("cy", 0);
  contactLeft.setAttribute("r", 4);
  contactLeft.setAttribute("fill", "#8d3e1e");
  group.appendChild(contactLeft);

  const contactRight = document.createElementNS(SVG_NS, "circle");
  contactRight.setAttribute("cx", 18);
  contactRight.setAttribute("cy", 0);
  contactRight.setAttribute("r", 4);
  contactRight.setAttribute("fill", "#8d3e1e");
  group.appendChild(contactRight);

  const blade = document.createElementNS(SVG_NS, "line");
  blade.setAttribute("x1", -14);
  blade.setAttribute("y1", -4);
  blade.setAttribute("x2", 14);
  blade.setAttribute("y2", -18);
  blade.setAttribute("stroke", "#8d3e1e");
  blade.setAttribute("stroke-width", "3");
  blade.setAttribute("class", "symbol-body");
  group.appendChild(blade);
}

function renderFuse(group) {
  const leftWire = document.createElementNS(SVG_NS, "line");
  leftWire.setAttribute("x1", -59);
  leftWire.setAttribute("y1", 0);
  leftWire.setAttribute("x2", -34);
  leftWire.setAttribute("y2", 0);
  leftWire.setAttribute("stroke", "#8d3e1e");
  leftWire.setAttribute("stroke-width", "3");
  group.appendChild(leftWire);

  const body = document.createElementNS(SVG_NS, "rect");
  body.setAttribute("x", -34);
  body.setAttribute("y", -14);
  body.setAttribute("width", 68);
  body.setAttribute("height", 28);
  body.setAttribute("fill", "rgba(255,255,255,0.94)");
  body.setAttribute("stroke", "#8d3e1e");
  body.setAttribute("stroke-width", "3");
  body.setAttribute("class", "symbol-body");
  group.appendChild(body);

  const rightWire = document.createElementNS(SVG_NS, "line");
  rightWire.setAttribute("x1", 34);
  rightWire.setAttribute("y1", 0);
  rightWire.setAttribute("x2", 59);
  rightWire.setAttribute("y2", 0);
  rightWire.setAttribute("stroke", "#8d3e1e");
  rightWire.setAttribute("stroke-width", "3");
  group.appendChild(rightWire);
}

function renderTerminalBlock(group) {
  const body = document.createElementNS(SVG_NS, "rect");
  body.setAttribute("x", -34);
  body.setAttribute("y", -26);
  body.setAttribute("width", 68);
  body.setAttribute("height", 52);
  body.setAttribute("rx", 5);
  body.setAttribute("fill", "rgba(255,255,255,0.94)");
  body.setAttribute("stroke", "#8d3e1e");
  body.setAttribute("stroke-width", "3");
  body.setAttribute("class", "symbol-body");
  group.appendChild(body);

  [-14, 14].forEach((y) => {
    const screw = document.createElementNS(SVG_NS, "circle");
    screw.setAttribute("cx", 0);
    screw.setAttribute("cy", y);
    screw.setAttribute("r", 7);
    screw.setAttribute("fill", "none");
    screw.setAttribute("stroke", "#8d3e1e");
    screw.setAttribute("stroke-width", "2");
    group.appendChild(screw);
  });
}

function renderConnector(group) {
  const body = document.createElementNS(SVG_NS, "rect");
  body.setAttribute("x", -32);
  body.setAttribute("y", -24);
  body.setAttribute("width", 64);
  body.setAttribute("height", 48);
  body.setAttribute("rx", 6);
  body.setAttribute("fill", "rgba(255,255,255,0.94)");
  body.setAttribute("stroke", "#8d3e1e");
  body.setAttribute("stroke-width", "3");
  body.setAttribute("class", "symbol-body");
  group.appendChild(body);

  [-14, 14].forEach((y) => {
    const pin = document.createElementNS(SVG_NS, "line");
    pin.setAttribute("x1", -16);
    pin.setAttribute("y1", y);
    pin.setAttribute("x2", 16);
    pin.setAttribute("y2", y);
    pin.setAttribute("stroke", "#8d3e1e");
    pin.setAttribute("stroke-width", "3");
    group.appendChild(pin);
  });
}

function renderJunction(group) {
  const dot = document.createElementNS(SVG_NS, "circle");
  dot.setAttribute("cx", 0);
  dot.setAttribute("cy", 0);
  dot.setAttribute("r", 9);
  dot.setAttribute("fill", "#8d3e1e");
  dot.setAttribute("class", "symbol-body");
  group.appendChild(dot);
}

function renderLamp(group) {
  const circle = document.createElementNS(SVG_NS, "circle");
  circle.setAttribute("cx", 0);
  circle.setAttribute("cy", 0);
  circle.setAttribute("r", 28);
  circle.setAttribute("fill", "rgba(255,255,255,0.94)");
  circle.setAttribute("stroke", "#8d3e1e");
  circle.setAttribute("stroke-width", "3");
  circle.setAttribute("class", "symbol-body");
  group.appendChild(circle);

  [[-16, -16, 16, 16], [-16, 16, 16, -16]].forEach((coords) => {
    const line = document.createElementNS(SVG_NS, "line");
    line.setAttribute("x1", coords[0]);
    line.setAttribute("y1", coords[1]);
    line.setAttribute("x2", coords[2]);
    line.setAttribute("y2", coords[3]);
    line.setAttribute("stroke", "#8d3e1e");
    line.setAttribute("stroke-width", "3");
    group.appendChild(line);
  });
}

function renderGround(group) {
  const wire = document.createElementNS(SVG_NS, "line");
  wire.setAttribute("x1", 0);
  wire.setAttribute("y1", -28);
  wire.setAttribute("x2", 0);
  wire.setAttribute("y2", -4);
  wire.setAttribute("stroke", "#8d3e1e");
  wire.setAttribute("stroke-width", "3");
  group.appendChild(wire);

  [[-20, 0, 20, 0], [-14, 8, 14, 8], [-8, 16, 8, 16]].forEach((coords) => {
    const line = document.createElementNS(SVG_NS, "line");
    line.setAttribute("x1", coords[0]);
    line.setAttribute("y1", coords[1]);
    line.setAttribute("x2", coords[2]);
    line.setAttribute("y2", coords[3]);
    line.setAttribute("stroke", "#8d3e1e");
    line.setAttribute("stroke-width", "3");
    line.setAttribute("class", "symbol-body");
    group.appendChild(line);
  });
}

function renderComponent(component) {
  const template = componentTemplates[component.type];
  const group = document.createElementNS(SVG_NS, "g");
  group.setAttribute("transform", `translate(${component.x} ${component.y})`);
  group.setAttribute("class", `component-shape${selectedComponentId === component.id ? " selected" : ""}`);
  group.dataset.componentId = component.id;

  const selectionBox = document.createElementNS(SVG_NS, "rect");
  selectionBox.setAttribute("x", -template.width / 2 - 16);
  selectionBox.setAttribute("y", -template.height / 2 - 16);
  selectionBox.setAttribute("width", template.width + 32);
  selectionBox.setAttribute("height", template.height + 32);
  selectionBox.setAttribute("rx", 18);
  selectionBox.setAttribute("class", "selection-box");
  group.appendChild(selectionBox);

  if (component.type === "source") renderSource(group, component);
  if (component.type === "acSource") renderAcSource(group, component);
  if (component.type === "resistor") renderResistor(group, component);
  if (component.type === "diode") renderDiode(group, component);
  if (component.type === "led") renderLed(group, component);
  if (component.type === "capacitor") renderCapacitor(group, component);
  if (component.type === "inductor") renderInductor(group, component);
  if (component.type === "switch") renderSwitch(group, component);
  if (component.type === "fuse") renderFuse(group, component);
  if (component.type === "terminal") renderTerminalBlock(group, component);
  if (component.type === "connector") renderConnector(group, component);
  if (component.type === "junction") renderJunction(group, component);
  if (component.type === "lamp") renderLamp(group, component);
  if (component.type === "ground") renderGround(group, component);

  const label = document.createElementNS(SVG_NS, "text");
  label.setAttribute("x", 0);
  label.setAttribute("y", template.height / 2 + 26);
  label.setAttribute("class", "label-text");
  label.textContent = component.label;
  group.appendChild(label);

  template.terminals.forEach((terminal, index) => {
    const dot = document.createElementNS(SVG_NS, "circle");
    dot.setAttribute("cx", terminal.x);
    dot.setAttribute("cy", terminal.y);
    dot.setAttribute("r", 6);
    dot.setAttribute("class", "terminal-dot");
    dot.dataset.componentId = component.id;
    dot.dataset.terminalIndex = String(index);
    dot.addEventListener("click", (event) => {
      event.stopPropagation();
      handleTerminalClick(component.id, index);
    });
    group.appendChild(dot);
  });

  group.addEventListener("pointerdown", (event) => startDrag(event, component.id));
  group.addEventListener("click", (event) => {
    event.stopPropagation();
    selectedComponentId = component.id;
    renderCircuit();
  });

  circuitComponentsLayer.appendChild(group);
}

function renderCircuit() {
  circuitWiresLayer.innerHTML = "";
  circuitComponentsLayer.innerHTML = "";

  wires.forEach(renderWire);
  components.forEach(renderComponent);

  if (pendingWireStart) {
    const start = getTerminalPosition(pendingWireStart.componentId, pendingWireStart.terminalIndex);
    if (start) {
      const preview = document.createElementNS(SVG_NS, "line");
      preview.setAttribute("x1", start.x);
      preview.setAttribute("y1", start.y);
      preview.setAttribute("x2", start.x + 90);
      preview.setAttribute("y2", start.y);
      preview.setAttribute("class", "wire-line pending");
      circuitWiresLayer.appendChild(preview);
    }
  }
}

function startDrag(event, componentId) {
  if (isWireMode) return;
  selectedComponentId = componentId;
  const point = getSvgPoint(event);
  const component = getComponentById(componentId);
  if (!component) return;
  dragState = {
    componentId,
    offsetX: point.x - component.x,
    offsetY: point.y - component.y
  };
  renderCircuit();
}

function getSvgPoint(event) {
  const rect = circuitCanvas.getBoundingClientRect();
  const scaleX = 900 / rect.width;
  const scaleY = 520 / rect.height;
  return {
    x: (event.clientX - rect.left) * scaleX,
    y: (event.clientY - rect.top) * scaleY
  };
}

function handlePointerMove(event) {
  if (!dragState) return;
  const point = getSvgPoint(event);
  const component = getComponentById(dragState.componentId);
  if (!component) return;
  component.x = Math.max(60, Math.min(840, point.x - dragState.offsetX));
  component.y = Math.max(60, Math.min(460, point.y - dragState.offsetY));
  renderCircuit();
}

function handlePointerUp() {
  dragState = null;
}

function handleTerminalClick(componentId, terminalIndex) {
  selectedComponentId = componentId;
  if (!isWireMode) {
    setCircuitStatus("提示", "点击“开始连线”后，再依次选择两个引脚完成连接。");
    renderCircuit();
    return;
  }

  if (!pendingWireStart) {
    pendingWireStart = { componentId, terminalIndex };
    setCircuitStatus("连线中", `已选择 ${componentId} 的引脚，请再选择另一个引脚完成连线。`);
    renderCircuit();
    return;
  }

  if (pendingWireStart.componentId === componentId && pendingWireStart.terminalIndex === terminalIndex) {
    setCircuitStatus("连线取消", "起点和终点不能是同一个引脚，请重新选择。");
    pendingWireStart = null;
    renderCircuit();
    return;
  }

  wireCounter += 1;
  wires.push({
    id: `wire-${wireCounter}`,
    from: `${pendingWireStart.componentId}:${pendingWireStart.terminalIndex}`,
    to: `${componentId}:${terminalIndex}`,
    type: wireTypeSelect.value,
    jointType: jointTypeSelect.value
  });
  pendingWireStart = null;
  setCircuitStatus("连线完成", `导线已创建，线材类型为 ${wireTypeSelect.options[wireTypeSelect.selectedIndex].text}，接口接茬为 ${jointTypeSelect.options[jointTypeSelect.selectedIndex].text}。`);
  renderCircuit();
}

function addComponentToCanvas(type) {
  const x = 220 + (components.length % 3) * 180;
  const y = 150 + Math.floor(components.length / 3) * 120;
  const component = createComponent(type, x, y);
  components.push(component);
  selectedComponentId = component.id;
  setCircuitStatus("元件已添加", `已将 ${component.label} 放入画布，可继续拖动或连线。`);
  renderCircuit();
}

function getWiredTerminalRefs() {
  const refs = new Set();
  wires.forEach((wire) => {
    refs.add(wire.from);
    refs.add(wire.to);
  });
  return refs;
}

function buildConnectivityGraph() {
  const adjacency = new Map();

  function addEdge(a, b) {
    if (!adjacency.has(a)) adjacency.set(a, new Set());
    if (!adjacency.has(b)) adjacency.set(b, new Set());
    adjacency.get(a).add(b);
    adjacency.get(b).add(a);
  }

  wires.forEach((wire) => addEdge(wire.from, wire.to));

  components.forEach((component) => {
    const template = componentTemplates[component.type];
    if (!template || template.terminals.length < 2) return;
    if (component.type === "source") return;
    if (component.type === "switch") return;

    const refs = template.terminals.map((_, index) => `${component.id}:${index}`);
    for (let i = 0; i < refs.length - 1; i += 1) {
      addEdge(refs[i], refs[i + 1]);
    }
  });

  return adjacency;
}

function runConnectivityCheck() {
  const source = components.find((component) => component.type === "source");
  if (!source) {
    setCircuitStatus("检查失败", "当前图纸没有电源元件，无法执行连通性检查。");
    return;
  }

  const wiredRefs = getWiredTerminalRefs();
  const adjacency = buildConnectivityGraph();
  const floatingTerminals = [];

  components.forEach((component) => {
    const template = componentTemplates[component.type];
    template.terminals.forEach((_, index) => {
      const ref = `${component.id}:${index}`;
      if (!wiredRefs.has(ref)) floatingTerminals.push(ref);
    });
  });

  const startRef = `${source.id}:1`;
  const endRef = `${source.id}:0`;
  const queue = [startRef];
  const visited = new Set([startRef]);

  while (queue.length) {
    const current = queue.shift();
    const nextNodes = adjacency.get(current) || new Set();
    nextNodes.forEach((node) => {
      if (!visited.has(node)) {
        visited.add(node);
        queue.push(node);
      }
    });
  }

  const hasClosedPath = visited.has(endRef);
  const isolatedComponents = components
    .filter((component) => {
      const template = componentTemplates[component.type];
      return template.terminals.every((_, index) => !wiredRefs.has(`${component.id}:${index}`));
    })
    .map((component) => component.label);

  lastConnectivityResult = { hasClosedPath, floatingTerminals, isolatedComponents };

  if (hasClosedPath && floatingTerminals.length === 0) {
    setCircuitStatus("连通性通过", "检测到从电源正极到负极的闭合路径，当前元件端子均已接入，可视为基础连通性正常。");
    return;
  }

  const issues = [];
  if (!hasClosedPath) issues.push("未形成从电源正极到负极的闭合路径，存在开路风险。");
  if (floatingTerminals.length > 0) issues.push(`发现 ${floatingTerminals.length} 个悬空端子：${floatingTerminals.join("，")}。`);
  if (isolatedComponents.length > 0) issues.push(`存在未接入网络的元件：${isolatedComponents.join("，")}。`);
  setCircuitStatus("连通性异常", issues.join(" "));
}

function deleteSelectedComponent() {
  if (!selectedComponentId) {
    setCircuitStatus("未选中元件", "请先点击一个元件，再执行删除。");
    return;
  }
  components = components.filter((component) => component.id !== selectedComponentId);
  wires = wires.filter((wire) => !wire.from.startsWith(`${selectedComponentId}:`) && !wire.to.startsWith(`${selectedComponentId}:`));
  setCircuitStatus("删除完成", `已删除 ${selectedComponentId} 及其关联导线。`);
  selectedComponentId = null;
  renderCircuit();
}

function clearDiagram() {
  components = [];
  wires = [];
  selectedComponentId = null;
  pendingWireStart = null;
  setCircuitStatus("画布已清空", "你可以重新添加元件，快速搭一个新的电路图。");
  renderCircuit();
}

function downloadSvg() {
  const clone = circuitCanvas.cloneNode(true);
  clone.removeAttribute("class");
  const serializer = new XMLSerializer();
  const source = serializer.serializeToString(clone);
  const blob = new Blob([source], { type: "image/svg+xml;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "circuit-diagram.svg";
  link.click();
  URL.revokeObjectURL(url);
  setCircuitStatus("下载完成", "已导出 SVG 文件，适合打印或继续编辑。");
}

function downloadPng() {
  const serializer = new XMLSerializer();
  const source = serializer.serializeToString(circuitCanvas);
  const svgBlob = new Blob([source], { type: "image/svg+xml;charset=utf-8" });
  const url = URL.createObjectURL(svgBlob);
  const image = new Image();

  image.onload = () => {
    const canvas = document.createElement("canvas");
    canvas.width = 1800;
    canvas.height = 1040;
    const context = canvas.getContext("2d");
    context.fillStyle = "#fffaf2";
    context.fillRect(0, 0, canvas.width, canvas.height);
    context.drawImage(image, 0, 0, canvas.width, canvas.height);
    URL.revokeObjectURL(url);

    const link = document.createElement("a");
    link.href = canvas.toDataURL("image/png");
    link.download = "circuit-diagram.png";
    link.click();
    setCircuitStatus("下载完成", "已导出 PNG 文件，适合插入实验报告或作业。");
  };

  image.src = url;
}

document.querySelectorAll(".tool-button[data-component]").forEach((button) => {
  button.addEventListener("click", () => addComponentToCanvas(button.dataset.component));
});

wireModeButton.addEventListener("click", () => {
  isWireMode = !isWireMode;
  pendingWireStart = null;
  updateModeIndicator();
  setCircuitStatus(
    isWireMode ? "连线模式已开启" : "普通模式已开启",
    isWireMode ? "依次点击两个元件引脚即可生成导线。" : "现在可以拖动元件位置，整理电路布局。"
  );
  renderCircuit();
});

generateProfileButton.onclick = (event) => {
  event.preventDefault();
  generateInitialProfile();
};
checkConnectivityButton.addEventListener("click", runConnectivityCheck);
studyStartButton.addEventListener("click", startStudyTimer);
studyPauseButton.addEventListener("click", pauseStudyTimer);
studyResetButton.addEventListener("click", resetStudyTimer);
deleteSelectedButton.addEventListener("click", deleteSelectedComponent);
clearDiagramButton.addEventListener("click", clearDiagram);
downloadSvgButton.addEventListener("click", downloadSvg);
downloadPngButton.addEventListener("click", downloadPng);
syncTeacherDbButton?.addEventListener("click", syncTeacherDataFromBackend);

saveAdminConfigButton?.addEventListener("click", () => {
  const keywordWeight = Number(adminKeywordWeight.value || 0);
  const vectorWeight = Number(adminVectorWeight.value || 0);
  const totalWeight = keywordWeight + vectorWeight;
  const weightWarning = Math.abs(totalWeight - 1) > 0.01
    ? "<p><strong>提示：</strong> 精准检索权重和向量检索权重建议合计为 1，正式保存时后端会做校验。</p>"
    : "";

  adminConfigPreview.innerHTML = `
    <div class="score-pill">配置预览已更新</div>
    <p><strong>知识库：</strong> ${adminRagCollection.value}</p>
    <p><strong>检索策略：</strong> Top K=${adminTopK.value}，精准=${adminKeywordWeight.value}，向量=${adminVectorWeight.value}，重排序=${adminRerank.options[adminRerank.selectedIndex].text}</p>
    <p><strong>切片策略：</strong> chunk_size=${adminChunkSize.value}，overlap=${adminChunkOverlap.value}</p>
    <p><strong>模型策略：</strong> LLM=${adminLlmModel.value}，Embedding=${adminEmbeddingModel.value}，temperature=${adminTemperature.value}</p>
    <p class="muted">当前是前端 demo 预览。正式版会写入管理员配置表，并记录操作者、时间、旧值、新值和回滚版本。</p>
    ${weightWarning}
  `;
});

circuitCanvas.addEventListener("pointermove", handlePointerMove);
window.addEventListener("pointerup", handlePointerUp);
circuitCanvas.addEventListener("click", () => {
  selectedComponentId = null;
  renderCircuit();
});

initializeCircuitDemo();
updateModeIndicator();
updateProfileView();
renderTeacherStudents();
updateReportTemplateView();
updateRole("student");
renderStudyTimer();

reportSaveButton.addEventListener("click", () => {
  reportAiBox.innerHTML = `
    <div class="score-pill">草稿已保存</div>
    <p class="muted">系统已保存当前工程报告内容，学生可以稍后继续补充参数表、附件和总结。</p>
  `;
});

reportSubmitButton.addEventListener("click", () => {
  reportAiBox.innerHTML = `
    <div class="score-pill">AI 初评完成</div>
    <p><strong>完整性：</strong> 报告已覆盖项目背景、参数校核、选型结论和运维建议，结构较完整。</p>
    <p><strong>规范性：</strong> 工程术语基本准确，建议补充电阻功率降额计算过程与测量数据截图。</p>
    <p><strong>教师关注点：</strong> 可重点复核高温工况下的选型依据，以及学生是否对故障定位流程进行了量化说明。</p>
  `;
});
