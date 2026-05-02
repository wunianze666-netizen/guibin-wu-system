export function FruitCluster() {
  return (
    <div className="fruit-cluster" aria-hidden="true">
      <span className="leaf one" />
      <span className="leaf two" />
      <span className="slice" />
    </div>
  );
}

export function FloatingLeaves() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      <span className="absolute left-[6%] top-36 h-10 w-16 rounded-[100%_0_100%_0] bg-gradient-to-br from-lime-200 to-green-500 opacity-75 rotate-12" />
      <span className="absolute left-[3%] top-52 h-8 w-14 rounded-[100%_0_100%_0] bg-gradient-to-br from-lime-100 to-green-400 opacity-70 -rotate-12" />
      <span className="absolute right-[18%] top-28 h-10 w-10 rounded-full bg-orange-200/70" />
      <span className="absolute right-[25%] top-48 h-3 w-3 rounded-full bg-amber-300/70" />
      <span className="absolute left-0 top-20 h-36 w-44 rounded-br-[7rem] bg-yellow-200/45" />
    </div>
  );
}
