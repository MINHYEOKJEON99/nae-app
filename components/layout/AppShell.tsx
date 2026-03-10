import { colors } from "@/lib/theme";

export default function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        maxWidth: 480,
        marginLeft: "auto",
        marginRight: "auto",
        minHeight: "100dvh",
        backgroundColor: colors.bg,
        position: "relative",
      }}>
      <main
        style={{
          padding: 16,
          paddingBottom: "calc(56px + env(safe-area-inset-bottom, 0px) + 16px)",
        }}>
        {children}
      </main>
    </div>
  );
}
