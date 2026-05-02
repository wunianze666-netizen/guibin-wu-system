"use client";

import Link from "next/link";
import { useContentStore } from "@/lib/use-content-store";

export function BrandLogo({ href = "/" }: { href?: string }) {
  const { content } = useContentStore();

  return (
    <Link
      href={href}
      className="focus-ring flex items-center gap-3 rounded-full"
      aria-label={content.site.name}
    >
      <span className="relative grid h-11 w-11 shrink-0 place-items-center rounded-full border-2 border-amber-300 bg-gradient-to-br from-yellow-200 to-orange-400 shadow-[0_10px_25px_rgba(255,178,31,0.28)]">
        <span className="h-8 w-8 rounded-full border-2 border-white/80 bg-[repeating-conic-gradient(from_0deg,#ffb21f_0_28deg,#fff3b0_28deg_32deg)]" />
        <span className="absolute -right-1 -top-1 h-4 w-6 rounded-[100%_0_100%_0] bg-gradient-to-br from-lime-300 to-green-600" />
      </span>
      <span className="text-2xl font-black tracking-normal text-ink max-sm:text-xl">
        {content.site.name}
      </span>
    </Link>
  );
}
