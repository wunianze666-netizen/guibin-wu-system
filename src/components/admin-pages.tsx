"use client";

import { ActionRow, AdminCard, Field, UploadBox } from "@/components/admin-shell";
import {
  createId,
  type Accent,
  type Certificate,
  type Internship,
  type Message,
  type Post,
  type Project,
  type SiteContent,
  type Work,
} from "@/lib/content-data";
import { useContentStore } from "@/lib/use-content-store";

const accents: Accent[] = ["green", "yellow", "blue", "orange", "purple", "gray"];

function AccentSelect({
  value,
  onChange,
}: {
  value: Accent;
  onChange: (value: Accent) => void;
}) {
  return (
    <label className="grid gap-2 font-bold text-stone-700">
      主题色
      <select
        className="rounded-2xl border border-amber-100 bg-white/76 px-4 py-3 font-normal outline-none focus:border-amber-300"
        value={value}
        onChange={(event) => onChange(event.target.value as Accent)}
      >
        {accents.map((accent) => (
          <option key={accent} value={accent}>
            {accent}
          </option>
        ))}
      </select>
    </label>
  );
}

function useAdminContent() {
  const store = useContentStore();

  function updateRoot<K extends keyof SiteContent>(key: K, value: SiteContent[K]) {
    store.updateContent((current) => ({ ...current, [key]: value }));
  }

  function updateListItem<K extends keyof SiteContent>(
    key: K,
    id: string,
    value: SiteContent[K] extends Array<infer T> ? Partial<T> : never,
  ) {
    store.updateContent((current) => {
      const list = current[key];
      if (!Array.isArray(list)) return current;
      return {
        ...current,
        [key]: list.map((item) =>
          typeof item === "object" && item && "id" in item && item.id === id
            ? { ...item, ...value }
            : item,
        ),
      };
    });
  }

  function addListItem<K extends keyof SiteContent>(key: K, item: SiteContent[K] extends Array<infer T> ? T : never) {
    store.updateContent((current) => {
      const list = current[key];
      if (!Array.isArray(list)) return current;
      return { ...current, [key]: [...list, item] };
    });
  }

  function deleteListItem<K extends keyof SiteContent>(key: K, id: string) {
    store.updateContent((current) => {
      const list = current[key];
      if (!Array.isArray(list)) return current;
      return {
        ...current,
        [key]: list.filter((item) => !(typeof item === "object" && item && "id" in item && item.id === id)),
      };
    });
  }

  return { ...store, updateRoot, updateListItem, addListItem, deleteListItem };
}

export function AdminDashboard() {
  const { content, resetContent } = useAdminContent();
  const stats = [
    ["项目", content.projects.length],
    ["作品", content.works.length],
    ["实习经历", content.internships.length],
    ["证书/奖项", content.certificates.length],
    ["动态", content.posts.length],
    ["留言", content.messages.length],
  ];

  return (
    <div className="space-y-6">
      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {stats.map(([label, value]) => (
          <AdminCard key={label} title={`${label}管理`}>
            <p className="text-5xl font-black text-orange-500">{value}</p>
            <p className="mt-3 text-stone-600">当前可编辑内容数量</p>
          </AdminCard>
        ))}
      </div>
      <AdminCard title="数据操作">
        <p className="text-stone-600">
          当前版本会把管理员编辑内容保存到本机浏览器。部署接入 Supabase 后，所有访客会看到同一份线上数据。
        </p>
        <button
          type="button"
          className="mt-5 rounded-full bg-orange-100 px-5 py-2 font-bold text-orange-700 transition hover:bg-orange-200 active:scale-[0.98]"
          onClick={() => {
            if (window.confirm("确定恢复为默认内容吗？")) resetContent();
          }}
        >
          恢复默认内容
        </button>
      </AdminCard>
    </div>
  );
}

export function AdminAbout() {
  const { content, updateRoot } = useAdminContent();
  const profile = content.profile;

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <AdminCard title="自我介绍">
        <Field
          label="介绍内容"
          value={profile.intro}
          textarea
          onChange={(intro) => updateRoot("profile", { ...profile, intro })}
        />
      </AdminCard>
      <AdminCard title="喜欢的人或事">
        <Field
          label="标签"
          value={profile.likes}
          placeholder="设计、阅读、旅行"
          onChange={(likes) => updateRoot("profile", { ...profile, likes })}
        />
      </AdminCard>
      <AdminCard title="微信二维码上传">
        <UploadBox
          label="点击上传二维码图片"
          value={profile.wechatQr}
          accept="image/*"
          onChange={(wechatQr) => updateRoot("profile", { ...profile, wechatQr })}
        />
      </AdminCard>
      <AdminCard title="社交账号设置">
        <div className="grid gap-4">
          <Field label="GitHub 账号" value={profile.github} onChange={(github) => updateRoot("profile", { ...profile, github })} />
          <Field label="邮箱" value={profile.emailHint} onChange={(emailHint) => updateRoot("profile", { ...profile, emailHint })} />
          <Field label="小红书账号" value={profile.xhs} onChange={(xhs) => updateRoot("profile", { ...profile, xhs })} />
        </div>
      </AdminCard>
    </div>
  );
}

export function AdminProjects() {
  const { content, updateListItem, addListItem, deleteListItem } = useAdminContent();

  function addProject() {
    const item: Project = {
      id: createId("project"),
      name: "新的项目",
      direction: "项目方向",
      status: "进行中",
      background: "填写项目背景。",
      goals: "目标一、目标二、目标三",
      link: "https://example.com",
      date: new Date().toISOString().slice(0, 10),
      note: "备注",
      accent: "yellow",
    };
    addListItem("projects", item);
  }

  return (
    <div className="space-y-6">
      <button type="button" className="rounded-full bg-yellow-100 px-5 py-3 font-black text-amber-800 transition hover:bg-yellow-200 active:scale-[0.98]" onClick={addProject}>
        添加项目
      </button>
      {content.projects.map((project) => (
        <AdminCard key={project.id} title={project.name}>
          <div className="grid gap-5 lg:grid-cols-[220px_1fr]">
            <UploadBox label="更换封面上传区" value={project.cover} accept="image/*" onChange={(cover) => updateListItem("projects", project.id, { cover })} />
            <div className="grid gap-4 md:grid-cols-2">
              <Field label="项目名称" value={project.name} onChange={(name) => updateListItem("projects", project.id, { name })} />
              <Field label="研究方向 / 项目状态" value={project.direction} onChange={(direction) => updateListItem("projects", project.id, { direction })} />
              <Field label="状态" value={project.status} onChange={(status) => updateListItem("projects", project.id, { status })} />
              <Field label="链接" value={project.link} onChange={(link) => updateListItem("projects", project.id, { link })} />
              <Field label="项目背景" value={project.background} textarea onChange={(background) => updateListItem("projects", project.id, { background })} />
              <Field label="核心目标" value={project.goals} textarea onChange={(goals) => updateListItem("projects", project.id, { goals })} />
              <Field label="日期" value={project.date} onChange={(date) => updateListItem("projects", project.id, { date })} />
              <Field label="备注" value={project.note} onChange={(note) => updateListItem("projects", project.id, { note })} />
              <AccentSelect value={project.accent} onChange={(accent) => updateListItem("projects", project.id, { accent })} />
            </div>
          </div>
          <ActionRow onAdd={addProject} onDelete={() => deleteListItem("projects", project.id)} />
        </AdminCard>
      ))}
    </div>
  );
}

export function AdminWorks() {
  const { content, updateListItem, addListItem, deleteListItem } = useAdminContent();

  function addWork() {
    const item: Work = {
      id: createId("work"),
      name: "新的作品",
      url: "https://example.com",
      intro: "填写作品简介。",
      tags: "UI/UX、React",
      accent: "blue",
    };
    addListItem("works", item);
  }

  return (
    <div className="space-y-6">
      <button type="button" className="rounded-full bg-yellow-100 px-5 py-3 font-black text-amber-800 transition hover:bg-yellow-200 active:scale-[0.98]" onClick={addWork}>
        添加作品
      </button>
      {content.works.map((work) => (
        <AdminCard key={work.id} title={work.name}>
          <div className="grid gap-5 lg:grid-cols-[260px_1fr]">
            <UploadBox label="上传作品配图" value={work.image} accept="image/*" onChange={(image) => updateListItem("works", work.id, { image })} />
            <div className="grid gap-4 md:grid-cols-2">
              <Field label="作品名称" value={work.name} onChange={(name) => updateListItem("works", work.id, { name })} />
              <Field label="作品地址" value={work.url} onChange={(url) => updateListItem("works", work.id, { url })} />
              <Field label="简介" value={work.intro} textarea onChange={(intro) => updateListItem("works", work.id, { intro })} />
              <Field label="标签" value={work.tags} onChange={(tags) => updateListItem("works", work.id, { tags })} />
              <AccentSelect value={work.accent} onChange={(accent) => updateListItem("works", work.id, { accent })} />
            </div>
          </div>
          <ActionRow onAdd={addWork} onDelete={() => deleteListItem("works", work.id)} />
        </AdminCard>
      ))}
    </div>
  );
}

export function AdminInternships() {
  const { content, updateListItem, addListItem, deleteListItem } = useAdminContent();

  function addInternship() {
    const item: Internship = {
      id: createId("intern"),
      company: "新的公司 / 组织",
      role: "岗位名称",
      period: "2026.01 - 2026.03",
      duration: "3 个月",
      duties: "填写主要职责。",
      outcomes: "填写关键成果。",
      link: "相关链接",
      accent: "green",
    };
    addListItem("internships", item);
  }

  return (
    <div className="space-y-6">
      <button type="button" className="rounded-full bg-yellow-100 px-5 py-3 font-black text-amber-800 transition hover:bg-yellow-200 active:scale-[0.98]" onClick={addInternship}>
        添加实习经历
      </button>
      {content.internships.map((job) => (
        <AdminCard key={job.id} title={job.company}>
          <div className="grid gap-4 md:grid-cols-2">
            <Field label="公司 / 组织" value={job.company} onChange={(company) => updateListItem("internships", job.id, { company })} />
            <Field label="岗位" value={job.role} onChange={(role) => updateListItem("internships", job.id, { role })} />
            <Field label="时间" value={job.period} onChange={(period) => updateListItem("internships", job.id, { period })} />
            <Field label="时长" value={job.duration} onChange={(duration) => updateListItem("internships", job.id, { duration })} />
            <Field label="相关链接" value={job.link} onChange={(link) => updateListItem("internships", job.id, { link })} />
            <AccentSelect value={job.accent} onChange={(accent) => updateListItem("internships", job.id, { accent })} />
            <Field label="主要职责" value={job.duties} textarea onChange={(duties) => updateListItem("internships", job.id, { duties })} />
            <Field label="关键成果" value={job.outcomes} textarea onChange={(outcomes) => updateListItem("internships", job.id, { outcomes })} />
          </div>
          <ActionRow onAdd={addInternship} onDelete={() => deleteListItem("internships", job.id)} />
        </AdminCard>
      ))}
    </div>
  );
}

export function AdminCertificates() {
  const { content, updateListItem, addListItem, deleteListItem } = useAdminContent();

  function addCertificate() {
    const item: Certificate = {
      id: createId("cert"),
      type: "证书",
      name: "新的证书 / 奖项",
      date: "2026.05",
      issuer: "颁发机构",
      accent: "purple",
    };
    addListItem("certificates", item);
  }

  return (
    <div className="space-y-6">
      <button type="button" className="rounded-full bg-yellow-100 px-5 py-3 font-black text-amber-800 transition hover:bg-yellow-200 active:scale-[0.98]" onClick={addCertificate}>
        添加证书/奖项
      </button>
      <div className="grid gap-6 lg:grid-cols-2">
        {content.certificates.map((item) => (
          <AdminCard key={item.id} title={item.name}>
            <UploadBox label="上传证书 / 奖项图片" value={item.image} accept="image/*" onChange={(image) => updateListItem("certificates", item.id, { image })} />
            <div className="mt-5 grid gap-4">
              <Field label="类型" value={item.type} onChange={(type) => updateListItem("certificates", item.id, { type })} />
              <Field label="名称" value={item.name} onChange={(name) => updateListItem("certificates", item.id, { name })} />
              <Field label="时间" value={item.date} onChange={(date) => updateListItem("certificates", item.id, { date })} />
              <Field label="颁发机构" value={item.issuer} onChange={(issuer) => updateListItem("certificates", item.id, { issuer })} />
              <AccentSelect value={item.accent} onChange={(accent) => updateListItem("certificates", item.id, { accent })} />
            </div>
            <ActionRow onAdd={addCertificate} onDelete={() => deleteListItem("certificates", item.id)} />
          </AdminCard>
        ))}
      </div>
    </div>
  );
}

export function AdminResume() {
  const { content, updateRoot } = useAdminContent();
  const resume = content.resume;

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <AdminCard title="上传简历图片">
        <UploadBox label="点击或拖拽图片到此处上传" value={resume.image} accept="image/*" onChange={(image) => updateRoot("resume", { ...resume, image })} />
      </AdminCard>
      <AdminCard title="上传 PDF 简历">
        <UploadBox label="点击上传 PDF" value={resume.pdf} accept=".pdf,application/pdf" onChange={(pdf) => updateRoot("resume", { ...resume, pdf })} />
      </AdminCard>
      <AdminCard title="访问码设置">
        <Field label="简历访问码" value={resume.accessCode} onChange={(accessCode) => updateRoot("resume", { ...resume, accessCode })} />
      </AdminCard>
    </div>
  );
}

export function AdminPosts() {
  const { content, updateListItem, addListItem, deleteListItem } = useAdminContent();

  function addPost() {
    const item: Post = {
      id: createId("post"),
      title: "新的动态",
      date: new Date().toISOString().slice(0, 10),
      excerpt: "写下新的内容。",
    };
    addListItem("posts", item);
  }

  return (
    <div className="space-y-6">
      <button type="button" className="rounded-full bg-yellow-100 px-5 py-3 font-black text-amber-800 transition hover:bg-yellow-200 active:scale-[0.98]" onClick={addPost}>
        添加动态
      </button>
      {content.posts.map((post) => (
        <AdminCard key={post.id} title={post.title}>
          <div className="grid gap-4">
            <Field label="标题" value={post.title} onChange={(title) => updateListItem("posts", post.id, { title })} />
            <Field label="日期" value={post.date} onChange={(date) => updateListItem("posts", post.id, { date })} />
            <Field label="内容" value={post.excerpt} textarea onChange={(excerpt) => updateListItem("posts", post.id, { excerpt })} />
          </div>
          <ActionRow onAdd={addPost} onDelete={() => deleteListItem("posts", post.id)} />
        </AdminCard>
      ))}
    </div>
  );
}

export function AdminMessages() {
  const { content, updateListItem, addListItem, deleteListItem } = useAdminContent();

  function addMessage() {
    const item: Message = {
      id: createId("message"),
      name: "新访客",
      date: new Date().toISOString().slice(0, 10),
      content: "新的留言内容。",
      reply: "",
    };
    addListItem("messages", item);
  }

  return (
    <div className="space-y-6">
      <button type="button" className="rounded-full bg-yellow-100 px-5 py-3 font-black text-amber-800 transition hover:bg-yellow-200 active:scale-[0.98]" onClick={addMessage}>
        添加留言
      </button>
      {content.messages.map((message) => (
        <AdminCard key={message.id} title={message.name}>
          <div className="grid gap-4">
            <Field label="称呼" value={message.name} onChange={(name) => updateListItem("messages", message.id, { name })} />
            <Field label="日期" value={message.date} onChange={(date) => updateListItem("messages", message.id, { date })} />
            <Field label="留言内容" value={message.content} textarea onChange={(content) => updateListItem("messages", message.id, { content })} />
            <Field label="回复留言" value={message.reply ?? ""} textarea onChange={(reply) => updateListItem("messages", message.id, { reply })} />
          </div>
          <ActionRow onAdd={addMessage} onDelete={() => deleteListItem("messages", message.id)} />
        </AdminCard>
      ))}
    </div>
  );
}

export function AdminSettings() {
  const { content, updateRoot } = useAdminContent();
  const site = content.site;
  const resume = content.resume;

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <AdminCard title="站点设置">
        <div className="grid gap-4">
          <Field label="网站标题" value={site.name} onChange={(name) => updateRoot("site", { ...site, name })} />
          <Field label="副标题" value={site.tagline} onChange={(tagline) => updateRoot("site", { ...site, tagline })} />
          <Field label="首页标题" value={site.heroTitle} onChange={(heroTitle) => updateRoot("site", { ...site, heroTitle })} />
          <Field label="首页说明" value={site.heroSubtitle} textarea onChange={(heroSubtitle) => updateRoot("site", { ...site, heroSubtitle })} />
          <Field label="主题色" value={site.theme} onChange={(theme) => updateRoot("site", { ...site, theme })} />
        </div>
      </AdminCard>
      <AdminCard title="安全设置">
        <div className="grid gap-4">
          <Field label="管理员邮箱" value={site.adminEmail} onChange={(adminEmail) => updateRoot("site", { ...site, adminEmail })} />
          <Field label="简历访问码" value={resume.accessCode} onChange={(accessCode) => updateRoot("resume", { ...resume, accessCode })} />
        </div>
      </AdminCard>
    </div>
  );
}
