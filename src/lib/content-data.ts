export type Accent = "green" | "yellow" | "blue" | "orange" | "purple" | "gray";

export type Project = {
  id: string;
  name: string;
  direction: string;
  status: string;
  background: string;
  goals: string;
  link: string;
  date: string;
  note: string;
  accent: Accent;
  cover?: string;
};

export type Work = {
  id: string;
  name: string;
  url: string;
  intro: string;
  tags: string;
  accent: Accent;
  image?: string;
};

export type Internship = {
  id: string;
  company: string;
  role: string;
  period: string;
  duration: string;
  duties: string;
  outcomes: string;
  link: string;
  accent: Accent;
};

export type Certificate = {
  id: string;
  type: string;
  name: string;
  date: string;
  issuer: string;
  accent: Accent;
  image?: string;
};

export type Post = {
  id: string;
  title: string;
  date: string;
  excerpt: string;
};

export type Message = {
  id: string;
  name: string;
  date: string;
  content: string;
  reply?: string;
};

export type SiteContent = {
  site: {
    name: string;
    tagline: string;
    heroTitle: string;
    heroSubtitle: string;
    theme: string;
    adminEmail: string;
  };
  profile: {
    intro: string;
    likes: string;
    github: string;
    emailHint: string;
    xhs: string;
    wechatQr?: string;
  };
  resume: {
    accessCode: string;
    image?: string;
    pdf?: string;
  };
  projects: Project[];
  works: Work[];
  internships: Internship[];
  certificates: Certificate[];
  posts: Post[];
  messages: Message[];
};

export const publicNav = [
  { label: "首页", href: "/" },
  { label: "动态", href: "/posts" },
  { label: "归档", href: "/archive" },
  { label: "留言板", href: "/messages" },
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
    icon: "◆",
  },
  {
    title: "我的作品",
    href: "/works",
    description: "展示我的设计、代码与创作，欢迎浏览反馈。",
    accent: "blue",
    icon: "■",
  },
  {
    title: "实习经历",
    href: "/internships",
    description: "回顾我的实习历程与收获，记录成长足迹。",
    accent: "orange",
    icon: "▲",
  },
  {
    title: "证书/奖项",
    href: "/certificates",
    description: "我的荣誉与阶段成果，见证努力与进步。",
    accent: "purple",
    icon: "✦",
  },
  {
    title: "我的简历",
    href: "/resume",
    description: "完整简历与详细信息，默认需要访问码。",
    accent: "gray",
    icon: "▣",
  },
];

export const defaultContent: SiteContent = {
  site: {
    name: "吴贵宾个人主页",
    tagline: "明亮、清爽、持续生长的个人空间",
    heroTitle: "欢迎来到吴贵宾的个人主页",
    heroSubtitle: "这里记录我的成长、项目、作品和一些认真生活的片段。",
    theme: "橙黄 / 青绿 / 湖蓝",
    adminEmail: "admin@example.com",
  },
  profile: {
    intro:
      "我喜欢把复杂问题整理成清晰的界面与可执行的计划。关注用户体验、数据产品、内容表达，也享受在日常里寻找新的灵感。",
    likes: "设计、阅读、柠檬茶、旅行、音乐",
    github: "guibin-wu",
    emailHint: "g***@example.com",
    xhs: "贵宾小吴",
  },
  resume: {
    accessCode: "123456",
  },
  projects: [
    {
      id: "project-zest",
      name: "Zest 果汁品牌重塑与全渠道数字化体验",
      direction: "品牌设计与数字化",
      status: "进行中",
      background:
        "将清新的夏日感知转化为流畅的线上购买旅程，用透明感设计语言提升品牌活力。",
      goals: "重塑品牌视觉语言、优化浅购买链路、提升移动端留存",
      link: "https://example.com/zest-juice-case",
      date: "2024-06-01",
      note: "阶段性复盘中",
      accent: "yellow",
    },
    {
      id: "project-mini-shop",
      name: "轻量级电商小程序用户体验优化",
      direction: "用户体验设计",
      status: "已完成",
      background:
        "针对小程序电商的高跳出率问题，重构信息层级与转化流程。",
      goals: "降低首屏信息干扰、优化支付流程、构建数据看板",
      link: "https://example.com/mini-shop-ux",
      date: "2024-05-15",
      note: "进入复盘观察期",
      accent: "blue",
    },
  ],
  works: [
    {
      id: "work-citrus",
      name: "Citrus 习惯养成 App",
      url: "https://citrus-habit.com",
      intro: "一款关注心理健康与日常微习惯的移动应用。",
      tags: "UI/UX、产品设计、移动端、健康",
      accent: "green",
    },
    {
      id: "work-dashboard",
      name: "Zest 金融数据看板",
      url: "https://zest-dashboard.com",
      intro: "重新设计复杂金融数据展示平台，提升信息浏览效率。",
      tags: "数据可视化、Web 端、金融、B 端设计",
      accent: "blue",
    },
  ],
  internships: [
    {
      id: "intern-tencent",
      company: "腾讯科技（深圳）有限公司",
      role: "产品实习生",
      period: "2024.06 - 2024.09",
      duration: "4 个月",
      duties:
        "参与产品需求调研与分析，撰写需求文档，协助原型设计，跟进开发进度。",
      outcomes:
        "独立完成 2 个功能模块竞品分析报告，提出 3 项优化建议并被采纳。",
      link: "作品集原型链接",
      accent: "yellow",
    },
    {
      id: "intern-bytedance",
      company: "字节跳动（北京）有限公司",
      role: "数据分析实习生",
      period: "2023.03 - 2023.06",
      duration: "4 个月",
      duties:
        "负责业务数据整理与分析，输出数据分析报告，搭建数据看板。",
      outcomes: "搭建 1 个核心业务数据看板，提升团队数据使用效率。",
      link: "数据看板预览",
      accent: "green",
    },
  ],
  certificates: [
    {
      id: "cert-ixdf",
      type: "证书",
      name: "用户体验设计专业证书",
      date: "2024.05",
      issuer: "Interaction Design Foundation",
      accent: "blue",
    },
    {
      id: "cert-campus",
      type: "奖项",
      name: "校园数字产品设计大赛二等奖",
      date: "2023.11",
      issuer: "校创实践中心",
      accent: "orange",
    },
  ],
  posts: [
    {
      id: "post-summer",
      title: "把夏天的颜色放进界面里",
      date: "2024.06.12",
      excerpt: "一次关于奶油白、橙黄与湖蓝的视觉小实验。",
    },
    {
      id: "post-review",
      title: "项目复盘：从清单到节奏",
      date: "2024.05.28",
      excerpt: "把任务拆成可执行的小步，比等待灵感更可靠。",
    },
  ],
  messages: [
    {
      id: "message-summer",
      name: "夏日访客",
      date: "2024.06.09",
      content: "页面像一杯柠檬气泡水，很清爽。",
    },
    {
      id: "message-classmate",
      name: "同学 A",
      date: "2024.05.30",
      content: "期待看到更多项目细节，也祝实习顺利。",
    },
  ],
};

export function createId(prefix: string) {
  return `${prefix}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
}
