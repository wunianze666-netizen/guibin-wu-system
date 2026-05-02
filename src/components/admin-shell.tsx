"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { BrandLogo } from "@/components/brand-logo";
import { adminNav } from "@/lib/content-data";
import { useContentStore } from "@/lib/use-content-store";

export function AdminShell({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  const router = useRouter();
  const { lastError, saveContent, saveStatus } = useContentStore();
  const [allowed] = useState(
    () =>
      typeof window !== "undefined" &&
      window.sessionStorage.getItem("guibin-wu-admin-session") === "true",
  );

  useEffect(() => {
    if (!allowed) router.replace("/admin/login");
  }, [allowed, router]);

  if (!allowed) {
    return (
      <main className="grid min-h-screen place-items-center bg-[#fffaf0] px-6 text-center">
        <p className="rounded-2xl bg-white/80 px-6 py-4 font-bold text-stone-700">
          正在进入后台登录...
        </p>
      </main>
    );
  }

  const statusLabel =
    saveStatus === "saving"
      ? "正在保存..."
      : saveStatus === "dirty"
        ? "有未保存修改"
        : saveStatus === "error"
          ? "保存失败"
          : "已保存";

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_0_0,rgba(255,225,123,0.32),transparent_22rem),linear-gradient(180deg,#fffdf5,#fff5df)]">
      <header className="border-b border-amber-100 bg-white/76 backdrop-blur-2xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-5 px-6 py-4 max-md:flex-col max-md:items-start">
          <BrandLogo href="/admin" />
          <div className="flex flex-wrap gap-3">
            <Link
              href="/"
              className="rounded-full border border-amber-200 bg-white px-5 py-2 font-bold text-amber-800"
            >
              预览主页
            </Link>
            <span className="rounded-full bg-amber-100 px-5 py-2 font-bold text-amber-800">
              管理后台
            </span>
          </div>
        </div>
      </header>
      <div className="mx-auto grid max-w-7xl gap-8 px-6 py-8 lg:grid-cols-[260px_1fr]">
        <aside className="soft-card h-fit rounded-[2rem] p-4">
          <nav className="grid gap-2">
            {adminNav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="focus-ring rounded-2xl px-4 py-3 font-bold text-stone-700 transition hover:bg-yellow-100 hover:text-orange-600"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </aside>
        <main>
          <section className="mb-7 rounded-[2rem] border border-yellow-200 bg-white/72 p-8 shadow-[0_18px_50px_rgba(204,147,51,0.12)]">
            <div className="flex flex-wrap items-center justify-between gap-5">
              <div>
                <h1 className="text-4xl font-black text-ink">{title}</h1>
                <p className="mt-3 text-lg text-stone-600">{description}</p>
              </div>
              <div className="flex flex-wrap items-center gap-3">
                <span
                  className={`rounded-full px-5 py-3 font-black ${
                    saveStatus === "error"
                      ? "bg-orange-100 text-orange-700"
                      : saveStatus === "dirty"
                        ? "bg-yellow-100 text-amber-800"
                        : "bg-lime-100 text-lime-800"
                  }`}
                >
                  {statusLabel}
                </span>
                <button
                  type="button"
                  className="rounded-full bg-gradient-to-r from-amber-400 to-orange-500 px-5 py-3 font-black text-white shadow-[0_12px_24px_rgba(255,127,36,0.22)]"
                  onClick={saveContent}
                >
                  保存到云端
                </button>
              </div>
            </div>
            {lastError ? (
              <p className="mt-5 rounded-2xl bg-orange-50 p-4 font-bold text-orange-700">
                {lastError}
              </p>
            ) : null}
          </section>
          {children}
        </main>
      </div>
    </div>
  );
}

export function AdminCard({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="soft-card rounded-[2rem] p-7">
      <h2 className="mb-5 text-2xl font-black text-ink">{title}</h2>
      {children}
    </section>
  );
}

export function Field({
  label,
  value,
  placeholder,
  textarea = false,
  onChange,
}: {
  label: string;
  value: string;
  placeholder?: string;
  textarea?: boolean;
  onChange: (value: string) => void;
}) {
  return (
    <label className="grid gap-2 font-bold text-stone-700">
      {label}
      {textarea ? (
        <textarea
          className="min-h-32 rounded-2xl border border-amber-100 bg-white/76 px-4 py-3 font-normal outline-none focus:border-amber-300"
          placeholder={placeholder}
          value={value}
          onChange={(event) => onChange(event.target.value)}
        />
      ) : (
        <input
          className="rounded-2xl border border-amber-100 bg-white/76 px-4 py-3 font-normal outline-none focus:border-amber-300"
          placeholder={placeholder}
          value={value}
          onChange={(event) => onChange(event.target.value)}
        />
      )}
    </label>
  );
}

export function UploadBox({
  label,
  value,
  accept = "image/*,.pdf",
  onChange,
}: {
  label: string;
  value?: string;
  accept?: string;
  onChange: (value: string) => void;
}) {
  const inputRef = useRef<HTMLInputElement>(null);

  function handleFile(file?: File) {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => onChange(String(reader.result));
    reader.readAsDataURL(file);
  }

  return (
    <div className="grid min-h-40 place-items-center rounded-[1.5rem] border border-dashed border-amber-300 bg-amber-50/60 p-5 text-center">
      <input
        ref={inputRef}
        type="file"
        accept={accept}
        className="sr-only"
        onChange={(event) => handleFile(event.target.files?.[0])}
      />
      <button
        type="button"
        className="w-full rounded-[1.25rem] p-3 transition hover:bg-white/55"
        onClick={() => inputRef.current?.click()}
      >
        {value?.startsWith("data:image") ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={value}
            alt={label}
            className="mx-auto mb-4 max-h-48 rounded-2xl object-contain"
          />
        ) : (
          <div className="mx-auto mb-3 grid h-12 w-12 place-items-center rounded-full bg-white text-2xl text-orange-500">
            ↑
          </div>
        )}
        <p className="font-black text-stone-700">
          {value ? "已选择文件，点击可替换" : label}
        </p>
        <p className="mt-2 text-sm text-stone-500">支持 JPG / PNG / PDF，本地预览保存</p>
      </button>
      {value ? (
        <button
          type="button"
          className="mt-3 rounded-full bg-orange-100 px-4 py-2 font-bold text-orange-700"
          onClick={() => onChange("")}
        >
          移除文件
        </button>
      ) : null}
    </div>
  );
}

export function ActionRow({
  onAdd,
  onDelete,
  addLabel = "添加",
  deleteLabel = "删除",
}: {
  onAdd?: () => void;
  onDelete?: () => void;
  addLabel?: string;
  deleteLabel?: string;
}) {
  return (
    <div className="mt-5 flex flex-wrap gap-3">
      {onAdd ? (
        <button
          type="button"
          className="rounded-full bg-yellow-100 px-5 py-2 font-bold text-amber-800"
          onClick={onAdd}
        >
          {addLabel}
        </button>
      ) : null}
      {onDelete ? (
        <button
          type="button"
          className="rounded-full bg-orange-100 px-5 py-2 font-bold text-orange-700"
          onClick={onDelete}
        >
          {deleteLabel}
        </button>
      ) : null}
    </div>
  );
}
