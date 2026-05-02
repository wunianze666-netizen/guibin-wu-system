"use client";

import Link from "next/link";
import { Hero } from "@/components/hero";
import { PublicShell } from "@/components/public-shell";
import { homeModules } from "@/lib/content-data";
import { accentStyles } from "@/lib/styles";
import { useContentStore } from "@/lib/use-content-store";

export default function Home() {
  const { content } = useContentStore();

  return (
    <PublicShell home>
      <Hero title={content.site.heroTitle} subtitle={content.site.heroSubtitle} center />
      <section className="grid gap-7 md:grid-cols-2">
        {homeModules.map((module) => {
          const style = accentStyles[module.accent];

          return (
            <Link
              key={module.href}
              href={module.href}
              className={`focus-ring group relative min-h-48 overflow-hidden rounded-[2rem] border bg-gradient-to-br p-8 shadow-[0_18px_45px_rgba(210,154,58,0.12)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_26px_60px_rgba(210,154,58,0.18)] ${style.card}`}
            >
              <div className="relative z-10 flex h-full items-center gap-7">
                <span
                  className={`grid h-24 w-24 shrink-0 place-items-center rounded-full bg-gradient-to-br text-4xl shadow-inner ${style.icon}`}
                >
                  {module.icon}
                </span>
                <div className="min-w-0">
                  <h2 className="text-3xl font-black tracking-normal text-ink">
                    {module.title}
                  </h2>
                  <p className="mt-3 text-lg leading-8 text-stone-600">
                    {module.description}
                  </p>
                </div>
                <span
                  className={`ml-auto grid h-14 w-14 shrink-0 place-items-center rounded-full text-3xl transition group-hover:translate-x-1 ${style.chip}`}
                  aria-hidden="true"
                >
                  →
                </span>
              </div>
              <div className="absolute -bottom-16 -right-10 h-36 w-60 rounded-[100%_0_0_0] bg-white/32" />
              <div className="absolute bottom-2 right-20 h-9 w-9 rounded-full bg-white/45" />
            </Link>
          );
        })}
      </section>
    </PublicShell>
  );
}
