import { FruitCluster } from "@/components/decorative";

export function Hero({
  title,
  subtitle,
  icon,
  center = false,
}: {
  title: string;
  subtitle: string;
  icon?: string;
  center?: boolean;
}) {
  return (
    <section
      className={`relative mb-12 min-h-48 overflow-hidden ${center ? "text-center" : ""}`}
    >
      <FruitCluster />
      <div className={center ? "mx-auto max-w-4xl pt-12" : "max-w-3xl pt-10"}>
        <div className="mb-4 flex items-center gap-4 max-sm:flex-col max-sm:items-start">
          {icon ? (
            <span className="grid h-20 w-20 place-items-center rounded-[2rem] bg-gradient-to-br from-yellow-100 to-orange-300 text-4xl shadow-[0_18px_35px_rgba(255,178,31,0.22)]">
              {icon}
            </span>
          ) : null}
          <h1 className="text-5xl font-black leading-tight tracking-normal text-ink drop-shadow-[0_5px_0_rgba(255,204,97,0.28)] max-md:text-4xl">
            {title}
          </h1>
        </div>
        <p className="text-xl leading-9 text-stone-600 max-md:text-lg">{subtitle}</p>
      </div>
    </section>
  );
}
