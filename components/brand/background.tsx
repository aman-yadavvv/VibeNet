export function Background() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute -left-40 -top-40 h-[500px] w-[500px] rounded-full bg-violet/25 blur-[120px] animate-float-slow" />
      <div className="absolute -right-40 top-1/4 h-[450px] w-[450px] rounded-full bg-pink/20 blur-[130px] animate-float" />
      <div className="absolute bottom-0 left-1/3 h-[400px] w-[400px] rounded-full bg-mint/15 blur-[120px] animate-float-slow" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,#0A0A0F_80%)]" />
    </div>
  );
}