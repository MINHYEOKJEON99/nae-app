import AppShell from "@/components/layout/AppShell";
import BottomTabBar from "@/components/layout/BottomTabBar";
import TDSProvider from "@/components/layout/TDSProvider";

export default function TabLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <TDSProvider>
        <AppShell>{children}</AppShell>
        <BottomTabBar />
      </TDSProvider>
    </>
  );
}
