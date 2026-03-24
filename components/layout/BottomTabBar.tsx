import { colors } from "@/lib/theme";
import TabItem from "./TabItem";
import { BriefingIcon, TrendIcon, TodoIcon } from "@/components/common/IconSet";

export default function BottomTabBar() {
  return (
    <nav
      style={{
        position: "fixed",
        bottom: 20,
        left: "50%",
        transform: "translateX(-50%)",
        width: "90%",
        height: 60,
        paddingBottom: "env(safe-area-inset-bottom, 0px)",
        backgroundColor: colors.bg,
        borderTop: `0.5px solid ${colors.border}`,
        borderRadius: 9999,
        boxShadow: "0px -4px 30px rgba(0,0,0,0.1)",
        display: "flex",
        alignItems: "start",
        paddingTop: 8,
        zIndex: 100,
      }}>
      <TabItem href="/today" label="오늘의 요약" icon={<BriefingIcon size={22} />} />
      <TabItem href="/trends" label="IT 뉴스" icon={<TrendIcon size={22} />} />
      <TabItem href="/todo" label="할 일" icon={<TodoIcon size={22} />} />
      {/* <TabItem href="/settings" label="설정" icon={<SettingsIcon size={22} />} /> */}
    </nav>
  );
}
