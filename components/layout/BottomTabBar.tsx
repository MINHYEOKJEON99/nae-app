import TabItem from "./TabItem";
import { BriefingIcon, TrendIcon, TodoIcon, SettingsIcon } from "@/components/common/IconSet";

export default function BottomTabBar() {
  return (
    <nav
      style={{
        position: 'fixed',
        bottom: 0,
        left: '50%',
        transform: 'translateX(-50%)',
        width: '100%',
        height: 56,
        paddingBottom: 'env(safe-area-inset-bottom, 0px)',
        backgroundColor: 'var(--color-fg)',
        borderTop: '1px solid var(--color-border)',
        display: 'flex',
        alignItems: 'center',
        zIndex: 100,
      }}
    >
      <TabItem href="/today" label="Today AI" icon={<BriefingIcon size={22} />} />
      <TabItem href="/trends" label="Trends" icon={<TrendIcon size={22} />} />
      <TabItem href="/todo" label="Todo" icon={<TodoIcon size={22} />} />
      <TabItem href="/settings" label="Settings" icon={<SettingsIcon size={22} />} />
    </nav>
  );
}
