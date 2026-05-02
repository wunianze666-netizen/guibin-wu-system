"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { BrandLogo } from "@/components/brand-logo";
import { useContentStore } from "@/lib/use-content-store";

export default function AdminLoginPage() {
  const router = useRouter();
  const { content } = useContentStore();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  function login() {
    const expectedEmail = content.site.adminEmail || "admin@example.com";
    if (email.trim() === expectedEmail && password === "admin123") {
      window.sessionStorage.setItem("guibin-wu-admin-session", "true");
      router.push("/admin");
      return;
    }
    setError(`请使用 ${expectedEmail} 和临时密码 admin123 登录。`);
  }

  return (
    <main className="grid min-h-screen place-items-center bg-[radial-gradient(circle_at_15%_10%,rgba(255,210,82,0.35),transparent_20rem),linear-gradient(180deg,#fffdf5,#fff4dd)] px-6">
      <section className="w-full max-w-md rounded-[2rem] border border-amber-200 bg-white/82 p-8 shadow-[0_22px_65px_rgba(192,136,42,0.18)] backdrop-blur-xl">
        <div className="mb-8 flex justify-center">
          <BrandLogo href="/admin/login" />
        </div>
        <h1 className="text-center text-3xl font-black text-ink">后台登录</h1>
        <p className="mt-3 text-center text-stone-600">
          临时本地登录，正式上线会接入 Supabase Auth。
        </p>
        <div className="mt-8 grid gap-4">
          <input
            className="rounded-2xl border border-amber-100 bg-white/80 px-5 py-4 outline-none focus:border-amber-300"
            placeholder="管理员邮箱"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
          <input
            className="rounded-2xl border border-amber-100 bg-white/80 px-5 py-4 outline-none focus:border-amber-300"
            placeholder="密码"
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === "Enter") login();
            }}
          />
          {error ? <p className="rounded-2xl bg-orange-50 p-3 text-sm font-bold text-orange-700">{error}</p> : null}
          <button
            type="button"
            className="rounded-full bg-gradient-to-r from-amber-400 to-orange-500 px-6 py-4 font-black text-white shadow-[0_12px_24px_rgba(255,127,36,0.24)]"
            onClick={login}
          >
            登录后台
          </button>
        </div>
      </section>
    </main>
  );
}
