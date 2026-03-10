import { colors } from "@/lib/theme";
import TabItem from "./TabItem";
import { BriefingIcon, TrendIcon, TodoIcon } from "@/components/common/IconSet";

export default function BottomTabBar() {
  return (
    <nav
      style={{
        position: "fixed",
        bottom: 0,
        left: "50%",
        transform: "translateX(-50%)",
        width: "100%",
        height: 82,
        paddingBottom: "env(safe-area-inset-bottom, 0px)",
        backgroundColor: colors.bg,
        borderTop: `0.5px solid ${colors.border}`,
        borderTopRightRadius: 25,
        borderTopLeftRadius: 25,
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
