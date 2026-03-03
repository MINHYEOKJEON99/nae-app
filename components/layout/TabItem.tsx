'use client';

import styled from '@emotion/styled';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface TabItemProps {
  href: string;
  label: string;
  icon: React.ReactNode;
}

const StyledLink = styled(Link)<{ $active: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2px;
  flex: 1;
  padding: ${({ theme }) => theme.spacing.xs} 0;
  color: ${({ theme, $active }) =>
    $active ? theme.colors.text.primary : theme.colors.text.secondary};
  font-weight: ${({ $active }) => ($active ? 600 : 400)};
  text-decoration: none;
  transition: color 0.15s ease;
  -webkit-tap-highlight-color: transparent;
`;

const Label = styled.span`
  font-size: 11px;
  line-height: 14px;
`;

export default function TabItem({ href, label, icon }: TabItemProps) {
  const pathname = usePathname();
  const active = pathname === href;

  return (
    <StyledLink href={href} $active={active}>
      {icon}
      <Label>{label}</Label>
    </StyledLink>
  );
}
