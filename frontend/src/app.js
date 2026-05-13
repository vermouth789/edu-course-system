const API_BASE = "http://127.0.0.1:8000";
const COURSE_ID = "course-circuit";
const QUIZ_COURSE_ID = "course-ds";
const QUIZ_CHAPTER_ID = "chapter-stack-queue";

const roleTabs = document.querySelectorAll(".role-tab");
const nav = document.getElementById("main-nav");
const roleTitle = document.getElementById("role-title");
const workspaceTitle = document.getElementById("workspace-title");
const workspaceDesc = document.getElementById("workspace-desc");
const accountInput = document.getElementById("account-input");
const loginButton = document.getElementById("login-btn");
const loginHint = document.getElementById("login-hint");
const apiStatus = document.getElementById("api-status");

const roleConfig = {
  student: {
    title: "学生端",
    workspace: "学生学习空间",
    desc: "课程章节学习、AI 教师、随机出题、工程报告和个人学习画像。",
    account: "student001",
    nav: [
      ["student-dashboard", "学习工作台"],
      ["student-ai", "AI 教师"],
      ["student-quiz", "章节练习"],
      ["student-report", "工程报告"]
    ]
  },
  teacher: {
    title: "教师端",
    workspace: "教师教学管理空间",
    desc: "学生管理、学生画像、学习报告、工程报告评阅和教学干预。",
    account: "teacher001",
    nav: [
      ["teacher-students", "学生管理"],
      ["teacher-reports", "报告评阅"]
    ]
  },
  admin: {
    title: "管理员端",
    workspace: "系统管理空间",
    desc: "权限控制、RAG 参数、模型配置、数据库健康和系统审计。",
    account: "admin001",
    nav: [
      ["admin-permissions", "权限控制"],
      ["admin-rag", "RAG 配置"],
      ["admin-system", "系统状态"]
    ]
  }
};

let currentRole = "student";
let currentPanel = "student-dashboard";
let latestQuestions = [];

function $(id) {
  return document.getElementById(id);
}

async function api(path, options = {}) {
  const response = await fetch(`${API_BASE}${path}`, {
    headers: { "Content-Type": "application/json", ...(options.headers || {}) },
    ...options
  });
  if (!response.ok) {
    const text = await response.text();
    throw new Error(`${response.status} ${text}`);
  }
  return response.json();
}

function percent(value) {
  return `${Math.round(Number(value || 0) * 100)}%`;
}

function renderNav() {
  const config = roleConfig[currentRole];
  nav.innerHTML = config.nav.map(([panel, label]) => `
    <button class="nav-btn ${panel === currentPanel ? "active" : ""}" data-panel="${panel}">${label}</button>
  `).join("");

  nav.querySelectorAll(".nav-btn").forEach((button) => {
    button.addEventListener("click", () => showPanel(button.dataset.panel));
  });
}

function showPanel(panelId) {
  currentPanel = panelId;
  document.querySelectorAll(".panel").forEach((panel) => {
    const shouldShow = panel.id === panelId;
    panel.classList.toggle("active", shouldShow);
  });
  renderNav();
}

function switchRole(role) {
  currentRole = role;
  const config = roleConfig[role];
  currentPanel = config.nav[0][0];

  roleTabs.forEach((tab) => tab.classList.toggle("active", tab.dataset.role === role));
  roleTitle.textContent = config.title;
  workspaceTitle.textContent = config.workspace;
  workspaceDesc.textContent = config.desc;
  accountInput.value = config.account;
  loginHint.textContent = `${config.title}功能已隔离，只显示该身份可访问的模块。`;

  document.querySelectorAll("[data-role-panel]").forEach((panel) => {
    panel.classList.toggle("active", panel.id === currentPanel);
  });
  renderNav();
}

async function checkApiStatus() {
  try {
    await api("/health");
    await api("/health/db");
    apiStatus.textContent = "API / PostgreSQL 正常";
  } catch (error) {
    apiStatus.textContent = "后端未连接";
  }
}

async function loadStudentCourses() {
  const courses = await api("/api/courses");
  $("student-course-count").textContent = String(courses.length);
  $("student-course-list").innerHTML = courses.map((course) => `
    <div class="item">
      <strong>${course.name}</strong>
      <p class="muted">${course.teacher} / ${course.semester}</p>
      <p>${course.description}</p>
    </div>
  `).join("");
}

function appendMessage(text, type) {
  const message = document.createElement("div");
  message.className = `message ${type}`;
  message.textContent = text;
  $("chat-box").appendChild(message);
  $("chat-box").scrollTop = $("chat-box").scrollHeight;
  return message;
}

async function askAiTeacher() {
  const input = $("student-question");
  const question = input.value.trim();
  if (!question) return;

  appendMessage(question, "student");
  input.value = "";
  const pending = appendMessage("正在调用教师 Agent...", "teacher");

  try {
    const data = await api("/api/assistant/ask", {
      method: "POST",
      body: JSON.stringify({ course_id: COURSE_ID, chapter_id: null, question })
    });
    pending.textContent = data.answer;
  } catch (error) {
    pending.textContent = `AI 教师暂时不可用：${error.message}`;
  }
}

async function generateQuiz() {
  const questions = await api("/api/quiz/generate", {
    method: "POST",
    body: JSON.stringify({
      course_id: QUIZ_COURSE_ID,
      chapter_id: QUIZ_CHAPTER_ID,
      question_types: [],
      difficulty: "mixed",
      count: 4
    })
  });
  latestQuestions = questions;
  $("quiz-list").innerHTML = questions.map((question, index) => `
    <div class="item">
      <strong>${index + 1}. ${question.stem}</strong>
      ${question.options ? `<p class="muted">${question.options.join(" / ")}</p>` : ""}
      <p class="muted">类型：${question.type} / 难度：${question.difficulty}</p>
    </div>
  `).join("");
}

async function scoreQuiz() {
  const shortAnswerQuestion = latestQuestions.find((question) => question.type === "short_answer") || { id: "q-short-stack-001" };
  const data = await api("/api/quiz/score", {
    method: "POST",
    body: JSON.stringify({ question_id: shortAnswerQuestion.id, answer: $("quiz-answer").value })
  });
  $("score-result").innerHTML = `
    <strong>${data.score}/${data.max_score}</strong>
    <p>${data.feedback}</p>
    <p class="muted">优点：${data.strengths.join("；")}</p>
    <p class="muted">问题：${data.weaknesses.join("；")}</p>
  `;
}

function renderTeacherStudents(students) {
  $("teacher-student-list").innerHTML = students.map((student) => `
    <button class="table-row" data-student="${student.student_id}">
      <strong>${student.display_name}</strong>
      <span>${student.class_name}</span>
      <span>${percent(student.progress)}</span>
      <span>${student.risk_level}</span>
    </button>
  `).join("");

  $("teacher-student-list").querySelectorAll("[data-student]").forEach((button) => {
    button.addEventListener("click", () => {
      const student = students.find((item) => String(item.student_id) === button.dataset.student);
      $("teacher-profile-detail").innerHTML = `
        <strong>${student.display_name}</strong>
        <div class="tag-row">
          <span class="tag">${student.profile?.foundation || "未画像"}</span>
          <span class="tag">${student.profile?.learning_style || "未记录"}</span>
          <span class="tag">${student.profile?.answer_tone || "默认语气"}</span>
        </div>
        <p>${student.profile?.long_term_summary || "暂无长期摘要。"}</p>
        <p class="muted">薄弱点：${student.profile?.weak_points || "暂无"}</p>
        <p class="muted">常错类型：${student.profile?.common_mistakes || "暂无"}</p>
      `;
    });
  });
}

async function loadTeacherData() {
  const [overview, students] = await Promise.all([
    api(`/api/teacher/courses/${COURSE_ID}/overview`),
    api(`/api/teacher/courses/${COURSE_ID}/students`)
  ]);
  $("teacher-count").textContent = overview.student_count;
  $("teacher-progress").textContent = percent(overview.average_progress);
  $("teacher-accuracy").textContent = percent(overview.average_accuracy);
  $("teacher-risk").textContent = overview.risk_student_count;
  renderTeacherStudents(students);
  if (students[0]) {
    $("teacher-student-list").querySelector("[data-student]")?.click();
  }
}

async function loadTeacherReports() {
  const reports = await api(`/api/teacher/courses/${COURSE_ID}/reports`);
  $("teacher-report-list").innerHTML = reports.map((report) => `
    <div class="table-row">
      <strong>${report.student_name}</strong>
      <span>${report.title}</span>
      <span>AI ${report.ai_score}</span>
      <span>${report.status}</span>
    </div>
  `).join("");
}

async function loadPermissions() {
  const permissions = await api("/api/admin/permissions");
  $("permission-list").innerHTML = permissions.map((item) => `
    <div class="item">
      <strong>${item.name}</strong>
      <p>${item.description}</p>
      <p class="muted">角色：${item.roles.join(" / ")}</p>
    </div>
  `).join("");
}

function fillRagForm(config) {
  $("rag-collection").value = config.collection_name;
  $("rag-top-k").value = config.top_k;
  $("rag-keyword-weight").value = config.keyword_weight;
  $("rag-vector-weight").value = config.vector_weight;
  $("rag-rerank").value = config.rerank_strategy;
  $("rag-chunk-size").value = config.chunk_size;
  $("rag-chunk-overlap").value = config.chunk_overlap;
  $("rag-preview").innerHTML = `
    <strong>${config.collection_name}</strong>
    <p>Top K=${config.top_k}，精准=${config.keyword_weight}，向量=${config.vector_weight}</p>
    <p class="muted">切片：${config.chunk_size} / overlap ${config.chunk_overlap}，重排序：${config.rerank_strategy}</p>
  `;
}

async function loadRagConfig() {
  const config = await api(`/api/admin/courses/${COURSE_ID}/rag-config`);
  fillRagForm(config);
}

async function saveRagConfig() {
  const config = await api(`/api/admin/courses/${COURSE_ID}/rag-config`, {
    method: "PATCH",
    body: JSON.stringify({
      collection_name: $("rag-collection").value,
      top_k: Number($("rag-top-k").value),
      keyword_weight: Number($("rag-keyword-weight").value),
      vector_weight: Number($("rag-vector-weight").value),
      rerank_strategy: $("rag-rerank").value,
      chunk_size: Number($("rag-chunk-size").value),
      chunk_overlap: Number($("rag-chunk-overlap").value)
    })
  });
  fillRagForm(config);
}

async function checkSystem() {
  try {
    await api("/health");
    $("api-health").textContent = "OK";
  } catch {
    $("api-health").textContent = "FAIL";
  }

  try {
    await api("/health/db");
    $("db-health").textContent = "OK";
  } catch {
    $("db-health").textContent = "FAIL";
  }
}

roleTabs.forEach((tab) => tab.addEventListener("click", () => switchRole(tab.dataset.role)));
loginButton.addEventListener("click", () => switchRole(currentRole));
$("load-student-btn").addEventListener("click", loadStudentCourses);
$("ask-ai-btn").addEventListener("click", askAiTeacher);
$("student-question").addEventListener("keydown", (event) => {
  if (event.key === "Enter") askAiTeacher();
});
$("generate-quiz-btn").addEventListener("click", generateQuiz);
$("score-quiz-btn").addEventListener("click", scoreQuiz);
$("load-teacher-btn").addEventListener("click", loadTeacherData);
$("load-report-btn").addEventListener("click", loadTeacherReports);
$("load-permission-btn").addEventListener("click", loadPermissions);
$("load-rag-btn").addEventListener("click", loadRagConfig);
$("save-rag-btn").addEventListener("click", saveRagConfig);
$("check-db-btn").addEventListener("click", checkSystem);

switchRole("student");
checkApiStatus();
loadStudentCourses().catch(() => {});
