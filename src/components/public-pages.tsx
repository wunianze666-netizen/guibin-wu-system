"use client";

import { useState } from "react";
import Link from "next/link";
import { Hero } from "@/components/hero";
import { ArtPanel, Pill, SoftCard } from "@/components/ui";
import type { Message } from "@/lib/content-data";
import { accentStyles } from "@/lib/styles";
import { useContentStore } from "@/lib/use-content-store";

function splitList(value: string) {
  return value
    .split(/[、,，]/)
    .map((item) => item.trim())
    .filter(Boolean);
}

function ImageOrArt({
  src,
  accent,
  alt,
}: {
  src?: string;
  accent: Parameters<typeof ArtPanel>[0]["accent"];
  alt: string;
}) {
  if (!src?.startsWith("data:image")) return <ArtPanel accent={accent} />;

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={alt}
      className="min-h-44 w-full rounded-[1.7rem] border border-amber-100 object-cover"
    />
  );
}

export function AboutContent() {
  const { content } = useContentStore();
  const { profile } = content;

  return (
    <>
      <Hero title="关于我" subtitle="一些背景、兴趣和日常灵感。" icon="●" />
      <div className="grid gap-7 lg:grid-cols-2">
        <SoftCard className="lg:col-span-2">
          <h2 className="mb-4 text-2xl font-black">自我介绍</h2>
          <p className="text-lg leading-9 text-stone-600">{profile.intro}</p>
        </SoftCard>
        <SoftCard>
          <h2 className="mb-5 text-2xl font-black">喜欢的人或事</h2>
          <div className="flex flex-wrap gap-3">
            {splitList(profile.likes).map((like) => (
              <Pill key={like} accent="green">
                {like}
              </Pill>
            ))}
          </div>
        </SoftCard>
        <SoftCard>
          <h2 className="mb-5 text-2xl font-black">联系线索</h2>
          <div className="grid gap-3 text-stone-600">
            <p>GitHub：{profile.github}</p>
            <p>邮箱：{profile.emailHint}</p>
            <p>小红书：{profile.xhs}</p>
            <div className="mt-3 grid min-h-32 place-items-center rounded-[1.5rem] border border-dashed border-lime-200 bg-lime-50/60 text-lime-700">
              {profile.wechatQr?.startsWith("data:image") ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={profile.wechatQr} alt="微信二维码" className="max-h-48 rounded-2xl object-contain" />
              ) : (
                "微信二维码展示区"
              )}
            </div>
          </div>
        </SoftCard>
      </div>
    </>
  );
}

export function ProjectsContent() {
  const { content } = useContentStore();

  return (
    <>
      <Hero title="我的项目" subtitle="查看我参与的项目与实践。" icon="◆" />
      <div className="space-y-7">
        {content.projects.map((project) => (
          <SoftCard key={project.id}>
            <div className="grid gap-7 lg:grid-cols-[240px_1fr]">
              <ImageOrArt src={project.cover} accent={project.accent} alt={project.name} />
              <div>
                <div className="mb-3 flex flex-wrap items-center gap-3">
                  <h2 className="text-2xl font-black">{project.name}</h2>
                  <Pill accent={project.accent}>{project.status}</Pill>
                </div>
                <p className="font-bold text-stone-500">{project.direction}</p>
                <p className="mt-4 leading-8 text-stone-600">{project.background}</p>
                <div className="mt-5 grid gap-3 md:grid-cols-3">
                  {splitList(project.goals).map((goal) => (
                    <div key={goal} className="rounded-2xl border border-amber-100 bg-white/60 px-4 py-3 text-sm font-bold text-stone-600">
                      {goal}
                    </div>
                  ))}
                </div>
                <div className="mt-5 flex flex-wrap gap-3 text-sm text-stone-500">
                  <span>{project.date}</span>
                  <span>{project.link}</span>
                  <span>{project.note}</span>
                </div>
              </div>
            </div>
          </SoftCard>
        ))}
      </div>
    </>
  );
}

export function WorksContent() {
  const { content } = useContentStore();

  return (
    <>
      <Hero title="我的作品" subtitle="展示我的设计、代码与创作。" icon="■" />
      <div className="space-y-6">
        {content.works.map((work) => (
          <SoftCard key={work.id}>
            <div className="grid gap-7 lg:grid-cols-[280px_1fr]">
              <ImageOrArt src={work.image} accent={work.accent} alt={work.name} />
              <div>
                <h2 className="text-2xl font-black">{work.name}</h2>
                <p className="mt-2 text-sky-700">{work.url}</p>
                <p className="mt-4 leading-8 text-stone-600">{work.intro}</p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {splitList(work.tags).map((tag) => (
                    <Pill key={tag} accent={work.accent}>
                      {tag}
                    </Pill>
                  ))}
                </div>
              </div>
            </div>
          </SoftCard>
        ))}
      </div>
    </>
  );
}

export function InternshipsContent() {
  const { content } = useContentStore();

  return (
    <>
      <Hero title="实习经历" subtitle="回顾我的实习历程与收获。" icon="▲" />
      <div className="relative space-y-6 border-l-2 border-yellow-200 pl-8">
        {content.internships.map((job) => (
          <SoftCard key={job.id}>
            <span className={`absolute -left-[0.72rem] mt-8 h-5 w-5 rounded-full border-4 border-white ${accentStyles[job.accent].chip}`} />
            <div className="grid gap-6 lg:grid-cols-[320px_1fr]">
              <div>
                <h2 className="text-2xl font-black">{job.company}</h2>
                <p className="mt-3 text-lg text-stone-600">{job.role}</p>
                <p className="mt-6 font-bold text-stone-500">
                  {job.period}（{job.duration}）
                </p>
              </div>
              <div className="space-y-4 leading-8 text-stone-600">
                <p><strong className="text-ink">主要职责：</strong>{job.duties}</p>
                <p><strong className="text-ink">关键成果：</strong>{job.outcomes}</p>
                <p className={accentStyles[job.accent].text}>{job.link}</p>
              </div>
            </div>
          </SoftCard>
        ))}
      </div>
    </>
  );
}

export function CertificatesContent() {
  const { content } = useContentStore();

  return (
    <>
      <Hero title="证书/奖项" subtitle="记录我的荣誉与阶段成果。" icon="✦" />
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {content.certificates.map((item) => (
          <SoftCard key={item.id}>
            <Pill accent={item.accent}>{item.type}</Pill>
            <div className="my-5">
              <ImageOrArt src={item.image} accent={item.accent} alt={item.name} />
            </div>
            <h2 className="text-2xl font-black">{item.name}</h2>
            <div className="mt-5 space-y-2 text-stone-600">
              <p>时间：{item.date}</p>
              <p>颁发机构：{item.issuer}</p>
            </div>
          </SoftCard>
        ))}
      </div>
    </>
  );
}

export function ResumeContent() {
  const { content } = useContentStore();
  const [code, setCode] = useState("");
  const [unlocked, setUnlocked] = useState(false);
  const resume = content.resume;

  if (unlocked) {
    return (
      <>
        <Hero title="我的简历" subtitle="已通过访问码验证。" icon="▣" />
        <div className="grid gap-6 lg:grid-cols-2">
          <SoftCard>
            <h2 className="mb-5 text-2xl font-black">简历图片</h2>
            {resume.image?.startsWith("data:image") ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={resume.image} alt="简历图片" className="w-full rounded-2xl object-contain" />
            ) : (
              <p className="text-stone-600">还没有上传简历图片。</p>
            )}
          </SoftCard>
          <SoftCard>
            <h2 className="mb-5 text-2xl font-black">PDF 简历</h2>
            {resume.pdf ? (
              <a className="rounded-full bg-yellow-100 px-5 py-3 font-black text-amber-800" href={resume.pdf} target="_blank">
                打开 PDF
              </a>
            ) : (
              <p className="text-stone-600">还没有上传 PDF 简历。</p>
            )}
          </SoftCard>
        </div>
      </>
    );
  }

  return (
    <>
      <Hero title="我的简历" subtitle="此区域包含完整简历与详细信息。" icon="▣" />
      <div className="mx-auto max-w-xl rounded-[2rem] border border-amber-200 bg-white/84 p-8 text-center shadow-[0_22px_60px_rgba(174,123,37,0.16)] backdrop-blur-xl">
        <div className="mx-auto mb-6 grid h-20 w-20 place-items-center rounded-full bg-yellow-100 text-4xl text-amber-700">▣</div>
        <h2 className="text-3xl font-black">输入访问码查看简历</h2>
        <p className="mx-auto mt-4 max-w-md leading-8 text-stone-600">为保护隐私，请输入访问码继续访问。</p>
        <input
          className="mt-8 w-full rounded-full border border-amber-200 bg-white/80 px-6 py-4 text-center outline-none focus:border-amber-400"
          placeholder="输入访问码"
          aria-label="输入访问码"
          value={code}
          onChange={(event) => setCode(event.target.value)}
        />
        <button
          className="mt-5 w-full rounded-full bg-gradient-to-r from-amber-500 to-orange-500 px-6 py-4 font-black text-white shadow-[0_14px_30px_rgba(255,127,36,0.24)] transition hover:brightness-105 active:scale-[0.98]"
          onClick={() => setUnlocked(code === resume.accessCode)}
        >
          验证访问码
        </button>
        <div className="mt-6 flex justify-center gap-6 text-amber-800">
          <Link href="/about">查看公开简介</Link>
          <Link href="/messages">联系获取访问码</Link>
        </div>
      </div>
    </>
  );
}

export function PostsContent() {
  const { content } = useContentStore();

  return (
    <>
      <Hero title="动态" subtitle="一些近期记录与想法。" icon="✦" />
      <div className="grid gap-6 lg:grid-cols-3">
        {content.posts.map((post) => (
          <SoftCard key={post.id}>
            <p className="font-bold text-amber-700">{post.date}</p>
            <h2 className="mt-4 text-2xl font-black">{post.title}</h2>
            <p className="mt-4 leading-8 text-stone-600">{post.excerpt}</p>
          </SoftCard>
        ))}
      </div>
    </>
  );
}

export function ArchiveContent() {
  const { content } = useContentStore();
  const items = [...content.posts.map((item) => item.title), ...content.works.map((item) => item.name), ...content.projects.map((item) => item.name)];

  return (
    <>
      <Hero title="归档" subtitle="按内容整理公开记录。" icon="◆" />
      <div className="grid gap-6 lg:grid-cols-2">
        {items.map((item, index) => (
          <SoftCard key={`${item}-${index}`}>
            <h2 className="text-2xl font-black">{item}</h2>
            <p className="mt-5 text-stone-600">来自当前主页内容库</p>
          </SoftCard>
        ))}
      </div>
    </>
  );
}

export function MessagesContent() {
  const { content, updateContent } = useContentStore();
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [submitStatus, setSubmitStatus] = useState<"idle" | "submitting" | "success" | "error">(
    "idle",
  );
  const [submitError, setSubmitError] = useState("");

  async function submitMessage() {
    if (!name.trim() || !message.trim()) return;
    setSubmitStatus("submitting");
    setSubmitError("");

    try {
      const response = await fetch("/api/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, content: message }),
      });

      const data = (await response.json()) as { message?: Message; error?: string };
      if (!response.ok || !data.message) {
        throw new Error(data.error || "留言提交失败");
      }

      updateContent((current) => ({
        ...current,
        messages: [...current.messages, data.message as Message],
      }));
      setName("");
      setMessage("");
      setSubmitStatus("success");
    } catch (error) {
      setSubmitStatus("error");
      setSubmitError(error instanceof Error ? error.message : "留言提交失败");
    }
  }

  return (
    <>
      <Hero title="留言板" subtitle="留下想说的话，像夏天寄来的明信片。" icon="✦" />
      <div className="grid gap-7 lg:grid-cols-[1fr_420px]">
        <div className="space-y-5">
          {content.messages.map((item) => (
            <SoftCard key={item.id}>
              <div className="flex items-center justify-between gap-4">
                <h2 className="text-xl font-black">{item.name}</h2>
                <span className="text-sm text-stone-500">{item.date}</span>
              </div>
              <p className="mt-4 leading-8 text-stone-600">{item.content}</p>
              {item.reply ? <p className="mt-4 rounded-2xl bg-lime-50 p-4 text-lime-800">回复：{item.reply}</p> : null}
            </SoftCard>
          ))}
        </div>
        <SoftCard>
          <h2 className="text-2xl font-black">写一条留言</h2>
          <div className="mt-5 space-y-4">
            <input className="w-full rounded-2xl border border-amber-100 bg-white/70 px-5 py-4 outline-none focus:border-amber-300" placeholder="你的称呼" value={name} onChange={(event) => setName(event.target.value)} />
            <textarea className="min-h-36 w-full rounded-2xl border border-amber-100 bg-white/70 px-5 py-4 outline-none focus:border-amber-300" placeholder="想说的话" value={message} onChange={(event) => setMessage(event.target.value)} />
            <button
              type="button"
              className={`w-full rounded-full px-6 py-4 font-black text-white shadow-[0_12px_24px_rgba(255,127,36,0.2)] transition active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-70 ${
                submitStatus === "success"
                  ? "bg-lime-600"
                  : submitStatus === "error"
                    ? "bg-orange-600"
                    : "bg-gradient-to-r from-amber-400 to-orange-400"
              }`}
              disabled={submitStatus === "submitting"}
              onClick={() => void submitMessage()}
            >
              {submitStatus === "submitting"
                ? "提交中..."
                : submitStatus === "success"
                  ? "已提交"
                  : submitStatus === "error"
                    ? "重新提交"
                    : "提交留言"}
            </button>
            {submitStatus === "success" ? (
              <p className="rounded-2xl bg-lime-50 p-3 text-sm font-bold text-lime-700">
                留言已保存，刷新后也会保留。
              </p>
            ) : null}
            {submitError ? (
              <p className="rounded-2xl bg-orange-50 p-3 text-sm font-bold text-orange-700">
                {submitError}
              </p>
            ) : null}
          </div>
        </SoftCard>
      </div>
    </>
  );
}
