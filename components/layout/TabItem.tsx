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
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 2,
        flex: 1,
        paddingTop: 4,
        paddingBottom: 4,
        textDecoration: 'none',
        transition: 'color 150ms',
        WebkitTapHighlightColor: 'transparent',
        color: active ? 'var(--color-text-primary)' : 'var(--color-text-secondary)',
        fontWeight: active ? 600 : 400,
      }}
    >
      {icon}
      <span style={{ fontSize: 11, lineHeight: '14px' }}>{label}</span>
    </Link>
  );
}
