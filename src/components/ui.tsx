import type { Accent } from "@/lib/content-data";
import { accentStyles } from "@/lib/styles";

export function Pill({
  children,
  accent = "yellow",
}: {
  children: React.ReactNode;
  accent?: Accent;
}) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-4 py-1.5 text-sm font-bold ${accentStyles[accent].chip}`}
    >
      {children}
    </span>
  );
}

export function SoftCard({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section className={`soft-card rounded-[2rem] p-7 ${className}`}>
      {children}
    </section>
  );
}

export function ArtPanel({ accent = "yellow" }: { accent?: Accent }) {
  const style = accentStyles[accent];
  return (
    <div
      className={`relative min-h-44 overflow-hidden rounded-[1.7rem] border bg-gradient-to-br ${style.card}`}
    >
      <div className="absolute -left-8 top-12 h-32 w-52 rounded-[50%] bg-white/35" />
      <div className="absolute bottom-0 left-12 h-24 w-64 rounded-t-[100%] bg-white/28" />
      <div className="absolute right-5 top-6 h-12 w-12 rounded-full bg-yellow-300/60" />
      <div className="absolute bottom-6 right-9 h-24 w-36 rounded-[100%_0_100%_0] bg-lime-300/30" />
    </div>
  );
}
