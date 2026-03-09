export default function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="max-w-[480px] mx-auto min-h-dvh bg-bg relative">
      <main className="p-md pb-[calc(56px+env(safe-area-inset-bottom,0px)+16px)]">{children}</main>
    </div>
  );
}
