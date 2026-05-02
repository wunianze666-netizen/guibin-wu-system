import Link from "next/link";
import { BrandLogo } from "@/components/brand-logo";
import { FloatingLeaves } from "@/components/decorative";
import { publicNav } from "@/lib/content-data";

export function PublicShell({
  children,
  home = false,
}: {
  children: React.ReactNode;
  home?: boolean;
}) {
  return (
    <div className="relative min-h-screen overflow-hidden">
      <FloatingLeaves />
      <header className="sticky top-0 z-20 border-b border-amber-100/80 bg-white/72 shadow-[0_8px_28px_rgba(196,148,65,0.08)] backdrop-blur-2xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-5 px-6 py-4 max-md:flex-col max-md:items-start">
          <BrandLogo />
          <nav className="flex flex-wrap items-center gap-2 text-base font-bold text-stone-800">
            {publicNav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="focus-ring rounded-full px-6 py-3 transition hover:bg-yellow-100 hover:text-orange-600"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      </header>
      <main className="relative z-10 mx-auto max-w-7xl px-6 pb-20 pt-12">
        {children}
      </main>
      {home ? <div className="home-watermark" /> : null}
    </div>
  );
}
