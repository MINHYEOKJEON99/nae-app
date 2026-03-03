import AppShell from '@/components/layout/AppShell';
import BottomTabBar from '@/components/layout/BottomTabBar';

export default function TabLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <AppShell>{children}</AppShell>
      <BottomTabBar />
    </>
  );
}
