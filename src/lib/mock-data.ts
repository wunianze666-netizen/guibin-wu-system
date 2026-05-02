export type Accent = "green" | "yellow" | "blue" | "orange" | "purple" | "gray";

export const site = {
  name: "贵宾小吴系统",
  tagline: "明亮、清爽、持续生长的个人空间",
};

export const publicNav = [
  { label: "首页", href: "/" },
  { label: "动态", href: "/posts" },
  { label: "归档", href: "/archive" },
  { label: "留言板", href: "/messages" },
];

export const homeModules: Array<{
  title: string;
  href: string;
  description: string;
  accent: Accent;
  icon: string;
}> = [
  {
    title: "关于我",
    href: "/about",
    description: "了解我的背景、兴趣与价值观，认识真实的我。",
    accent: "green",
    icon: "●",
  },
  {
    title: "我的项目",
    href: "/projects",
    description: "查看我参与的项目与实践，记录探索过程。",
    accent: "yellow",
    icon: "★",
  },
  {
    title: "我的作品",
    href: "/works",
    description: "展示我的设计、代码与创作，欢迎浏览反馈。",
    accent: "blue",
    icon: "◆",
  },
  {
    title: "实习经历",
    href: "/internships",
    description: "回顾我的实习历程与收获，记录成长足迹。",
    accent: "orange",
    icon: "▣",
  },
  {
    title: "证书/奖项",
    href: "/certificates",
    description: "我的荣誉与成就，见证努力与进步。",
    accent: "purple",
    icon: "✦",
  },
  {
    title: "我的简历",
    href: "/resume",
    description: "我的完整简历与详细信息，受保护的内容。",
    accent: "gray",
    icon: "■",
  },
];

export const profile = {
  intro:
    "喜欢把复杂问题整理成清爽的界面与可执行的计划。关注用户体验、数据产品、内容表达，也享受在夏天的阳光里寻找新的灵感。",
  likes: ["设计", "阅读", "柠檬茶", "旅行", "音乐"],
  github: "guibin-wu",
  emailHint: "g***@example.com",
  xhs: "贵宾小吴",
};

export const projects = [
  {
    name: "Zest 果汁品牌重塑与全渠道数字化体验",
    direction: "品牌设计与数字化",
    status: "进行中",
    background:
      "将清新的夏日感知转化为流畅的线上购买旅程，用透明感设计语言提升品牌活力。",
    goals: ["重塑品牌视觉语言", "优化浅购买链路", "提升移动端留存"],
    link: "https://example.com/zest-juice-case",
    date: "2024-06-01",
    note: "阶段性复盘中",
    accent: "yellow" as Accent,
  },
  {
    name: "轻量级电商小程序用户体验优化",
    direction: "用户体验设计",
    status: "已完成",
    background:
      "针对小程序电商的高跳出率问题，重构信息层级与转化流程。",
    goals: ["降低首屏信息干扰", "优化支付流程", "构建数据看板"],
    link: "https://example.com/mini-shop-ux",
    date: "2024-05-15",
    note: "进入复盘观察期",
    accent: "blue" as Accent,
  },
];

export const works = [
  {
    name: "Citrus 习惯养成 App",
    url: "https://citrus-habit.com",
    intro: "一款关注心理健康与日常微习惯的移动应用。",
    tags: ["UI/UX", "产品设计", "移动端", "健康"],
    accent: "green" as Accent,
  },
  {
    name: "Zest 金融数据看板",
    url: "https://zest-dashboard.com",
    intro: "重新设计复杂金融数据展示平台，提升信息浏览效率。",
    tags: ["数据可视化", "Web 端", "金融", "B 端设计"],
    accent: "blue" as Accent,
  },
  {
    name: "Flow Layout 组件库",
    url: "https://flow-layout.dev",
    intro: "一套高性能、可定制的前端组件库。",
    tags: ["前端开发", "React", "TypeScript", "开源"],
    accent: "purple" as Accent,
  },
  {
    name: "Sunny Motion 品牌动画",
    url: "https://sunnymotion.studio",
    intro: "为品牌形象设计的一系列动效短片。",
    tags: ["动效设计", "品牌", "动画", "AE"],
    accent: "orange" as Accent,
  },
];

export const internships = [
  {
    company: "腾讯科技（深圳）有限公司",
    role: "产品实习生",
    period: "2024.06 - 2024.09",
    duration: "4个月",
    duties:
      "参与产品需求调研与分析，撰写需求文档，协助原型设计，跟进开发进度。",
    outcomes:
      "独立完成 2 个功能模块竞品分析报告，提出 3 项优化建议并被采纳。",
    link: "作品集原型链接",
    accent: "yellow" as Accent,
  },
  {
    company: "字节跳动（北京）有限公司",
    role: "数据分析实习生",
    period: "2023.03 - 2023.06",
    duration: "4个月",
    duties:
      "负责业务数据整理与分析，输出数据分析报告，搭建数据看板。",
    outcomes:
      "搭建 1 个核心业务数据看板，提升团队数据使用效率。",
    link: "数据看板预览",
    accent: "green" as Accent,
  },
  {
    company: "美团（北京）有限公司",
    role: "运营实习生",
    period: "2022.07 - 2022.09",
    duration: "3个月",
    duties:
      "协助运营活动策划与执行，整理活动数据，支持日常用户运营工作。",
    outcomes:
      "参与策划并执行 2 场线下用户活动，活动参与人数累计 800+。",
    link: "活动复盘文档",
    accent: "blue" as Accent,
  },
];

export const certificates = [
  {
    type: "证书",
    name: "用户体验设计专业证书",
    date: "2024.05",
    issuer: "Interaction Design Foundation",
    accent: "blue" as Accent,
  },
  {
    type: "奖项",
    name: "校园数字产品设计大赛二等奖",
    date: "2023.11",
    issuer: "校创新实践中心",
    accent: "orange" as Accent,
  },
  {
    type: "证书",
    name: "前端工程实践训练营结业证书",
    date: "2023.08",
    issuer: "OpenBuild",
    accent: "green" as Accent,
  },
];

export const posts = [
  {
    title: "把夏天的颜色放进界面里",
    date: "2024.06.12",
    excerpt: "一次关于奶油白、橙黄与湖蓝的视觉小实验。",
  },
  {
    title: "项目复盘：从清单到节奏",
    date: "2024.05.28",
    excerpt: "把任务拆成可执行的小步，比等待灵感更可靠。",
  },
  {
    title: "近期阅读札记",
    date: "2024.05.10",
    excerpt: "关于体验设计、表达方式和长期主义的一点记录。",
  },
];

export const messages = [
  {
    name: "夏日访客",
    date: "2024.06.09",
    content: "页面像一杯柠檬气泡水，很清爽。",
  },
  {
    name: "同学 A",
    date: "2024.05.30",
    content: "期待看到更多项目细节，也祝实习顺利。",
  },
];

export const adminNav = [
  { label: "后台首页", href: "/admin" },
  { label: "关于我", href: "/admin/about" },
  { label: "项目管理", href: "/admin/projects" },
  { label: "作品管理", href: "/admin/works" },
  { label: "实习经历", href: "/admin/internships" },
  { label: "证书/奖项", href: "/admin/certificates" },
  { label: "简历管理", href: "/admin/resume" },
  { label: "动态管理", href: "/admin/posts" },
  { label: "留言管理", href: "/admin/messages" },
  { label: "系统设置", href: "/admin/settings" },
];
