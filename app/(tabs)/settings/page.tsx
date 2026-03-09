import Header from '@/components/layout/Header';
import ThemeToggle from '@/components/settings/ThemeToggle';

export default function SettingsPage() {
  return (
    <div>
      <Header title="Settings" />
      <div className="flex flex-col gap-3">
        <ThemeToggle />
      </div>
    </div>
  );
}
