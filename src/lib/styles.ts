import type { Accent } from "./content-data";

export const accentStyles: Record<
  Accent,
  {
    card: string;
    icon: string;
    chip: string;
    border: string;
    text: string;
  }
> = {
  green: {
    card: "from-lime-50/95 to-emerald-50/80 border-lime-200",
    icon: "from-lime-200 to-green-500 text-green-900",
    chip: "bg-lime-100 text-lime-800",
    border: "border-lime-200",
    text: "text-lime-700",
  },
  yellow: {
    card: "from-yellow-50/95 to-amber-50/80 border-yellow-200",
    icon: "from-yellow-200 to-amber-500 text-amber-950",
    chip: "bg-yellow-100 text-amber-800",
    border: "border-yellow-200",
    text: "text-amber-700",
  },
  blue: {
    card: "from-sky-50/95 to-cyan-50/80 border-sky-200",
    icon: "from-sky-200 to-cyan-500 text-sky-950",
    chip: "bg-sky-100 text-sky-800",
    border: "border-sky-200",
    text: "text-sky-700",
  },
  orange: {
    card: "from-orange-50/95 to-amber-50/80 border-orange-200",
    icon: "from-orange-200 to-orange-500 text-orange-950",
    chip: "bg-orange-100 text-orange-800",
    border: "border-orange-200",
    text: "text-orange-700",
  },
  purple: {
    card: "from-violet-50/95 to-fuchsia-50/70 border-violet-200",
    icon: "from-violet-200 to-purple-500 text-purple-950",
    chip: "bg-violet-100 text-violet-800",
    border: "border-violet-200",
    text: "text-violet-700",
  },
  gray: {
    card: "from-stone-50/95 to-zinc-50/80 border-stone-200",
    icon: "from-stone-200 to-zinc-400 text-stone-900",
    chip: "bg-stone-100 text-stone-700",
    border: "border-stone-200",
    text: "text-stone-600",
  },
};
