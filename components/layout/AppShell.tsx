export default function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="max-w-[480px] mx-auto min-h-dvh bg-bg relative desktop:shadow-[0_0_40px_rgba(0,0,0,0.06)]">
      <main className="p-md pb-[calc(56px+env(safe-area-inset-bottom,0px)+16px)]">
        {children}
      </main>
    </div>
  );
}
