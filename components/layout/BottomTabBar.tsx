import TabItem from "./TabItem";
import { BriefingIcon, TrendIcon, TodoIcon, SettingsIcon } from "@/components/common/IconSet";

export default function BottomTabBar() {
  return (
    <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full h-14 safe-area-bottom bg-fg border-t border-border flex items-center z-100">
      <TabItem href="/today" label="Today AI" icon={<BriefingIcon size={22} />} />
      <TabItem href="/trends" label="Trends" icon={<TrendIcon size={22} />} />
      <TabItem href="/todo" label="Todo" icon={<TodoIcon size={22} />} />
      <TabItem href="/settings" label="Settings" icon={<SettingsIcon size={22} />} />
    </nav>
  );
}
