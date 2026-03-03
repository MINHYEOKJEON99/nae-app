'use client';

import styled from '@emotion/styled';
import TabItem from './TabItem';
import { BriefingIcon, TrendIcon, TodoIcon } from '@/components/common/IconSet';

const Nav = styled.nav`
  position: fixed;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
  max-width: ${({ theme }) => theme.maxWidth};
  height: 56px;
  padding-bottom: env(safe-area-inset-bottom, 0px);
  background: ${({ theme }) => theme.colors.foreground};
  border-top: 1px solid ${({ theme }) => theme.colors.border};
  display: flex;
  align-items: center;
  z-index: 100;
`;

export default function BottomTabBar() {
  return (
    <Nav>
      <TabItem href="/today" label="Today AI" icon={<BriefingIcon size={22} />} />
      <TabItem href="/trends" label="Trends" icon={<TrendIcon size={22} />} />
      <TabItem href="/todo" label="Todo" icon={<TodoIcon size={22} />} />
    </Nav>
  );
}
