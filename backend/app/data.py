COURSE_DATA = [
    {
        "id": "course-ds",
        "name": "数据结构与算法",
        "teacher": "王老师",
        "semester": "2026 春",
        "description": "围绕线性表、栈、队列、树、图等基础知识展开，并接入章节问答与 AI 评分。",
    }
]

CHAPTER_DATA = [
    {
        "id": "chapter-intro",
        "course_id": "course-ds",
        "order": 1,
        "title": "第 1 章 绪论",
        "summary": "介绍数据结构的基本概念、逻辑结构与存储结构的区别。",
        "coarse_chunk": "课程导论摘要：解释数据、数据元素、数据对象、逻辑结构、存储结构与算法评价指标。",
        "fine_chunks": [
            "定义块：数据结构是相互之间存在一种或多种特定关系的数据元素集合。",
            "知识块：逻辑结构强调元素关系，存储结构强调物理表示。",
        ],
    },
    {
        "id": "chapter-linear-list",
        "course_id": "course-ds",
        "order": 2,
        "title": "第 2 章 线性表",
        "summary": "覆盖顺序表与链表的定义、实现方式、常见操作和复杂度。",
        "coarse_chunk": "线性表摘要：包含顺序表、单链表、双链表、循环链表的结构差异。",
        "fine_chunks": [
            "步骤块：顺序表插入操作需要移动元素。",
            "场景块：链表适合频繁插入删除。",
        ],
    },
    {
        "id": "chapter-stack-queue",
        "course_id": "course-ds",
        "order": 3,
        "title": "第 3 章 栈与队列",
        "summary": "介绍栈与队列的定义、实现、应用和复杂度分析。",
        "coarse_chunk": "栈与队列小节摘要：涵盖顺序栈、链栈、循环队列、共享栈和典型应用。",
        "fine_chunks": [
            "定义块：栈是只允许在一端进行插入和删除的线性表，具有后进先出特征。",
            "定义块：队列是只允许在一端插入、另一端删除的线性表，具有先进先出特征。",
            "案例块：括号匹配适合用栈，因为最近进入的左括号应当最先被匹配。",
            "案例块：广度优先搜索适合用队列，因为需要按层次顺序访问结点。",
        ],
    },
]

QUESTION_BANK = [
    {
        "id": "q-single-stack-001",
        "chapter_id": "chapter-stack-queue",
        "type": "single",
        "difficulty": "easy",
        "stem": "栈的访问特点是？",
        "options": ["先进先出", "后进先出", "随机访问", "双向访问"],
        "answer": "后进先出",
    },
    {
        "id": "q-judge-queue-001",
        "chapter_id": "chapter-stack-queue",
        "type": "judge",
        "difficulty": "easy",
        "stem": "队列的访问特点是先进先出。",
        "answer": True,
    },
    {
        "id": "q-short-stack-001",
        "chapter_id": "chapter-stack-queue",
        "type": "short_answer",
        "difficulty": "medium",
        "stem": "请说明栈和队列在访问顺序上的本质区别，并举一个实际应用例子。",
        "rubric": [
            "说明栈是后进先出",
            "说明队列是先进先出",
            "给出至少一个合理应用场景",
        ],
        "reference_answer": "栈是后进先出，常见应用如括号匹配、函数调用栈；队列是先进先出，常见应用如排队系统、广度优先搜索。",
    },
]

ASSISTANT_ANSWERS = {
    "为什么栈适合做括号匹配？": {
        "answer": "因为括号匹配要求最近遇到的左括号最先和后续右括号进行配对，这正好符合栈的后进先出特征。",
        "evidence": [
            "定义块：栈具有后进先出特征。",
            "案例块：括号匹配适合用栈，因为最近进入的左括号应当最先被匹配。",
        ],
    },
    "队列和广度优先搜索有什么关系？": {
        "answer": "广度优先搜索需要按层次顺序访问结点，因此要先处理先进入等待集合的结点，这正符合队列的先进先出特征。",
        "evidence": [
            "定义块：队列具有先进先出特征。",
            "案例块：广度优先搜索适合用队列，因为需要按层次顺序访问结点。",
        ],
    },
}
