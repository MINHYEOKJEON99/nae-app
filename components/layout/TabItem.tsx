'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface TabItemProps {
  href: string;
  label: string;
  icon: React.ReactNode;
}

export default function TabItem({ href, label, icon }: TabItemProps) {
  const pathname = usePathname();
  const active = pathname === href;

  return (
    <Link
      href={href}
      className={`flex flex-col items-center gap-[2px] flex-1 py-xs no-underline transition-colors duration-150 [-webkit-tap-highlight-color:transparent] ${
        active
          ? 'text-text-primary font-semibold'
          : 'text-text-secondary font-normal'
      }`}
    >
      {icon}
      <span className="text-[11px] leading-[14px]">{label}</span>
    </Link>
  );
}
