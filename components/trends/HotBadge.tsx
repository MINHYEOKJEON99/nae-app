'use client';

import styled from '@emotion/styled';

const Badge = styled.span`
  display: inline-flex;
  align-items: center;
  padding: 2px 8px;
  background: ${({ theme }) => theme.colors.hot};
  color: #fff;
  font-size: 11px;
  font-weight: 700;
  border-radius: ${({ theme }) => theme.borderRadius.full};
  letter-spacing: 0.5px;
`;

export default function HotBadge() {
  return <Badge>HOT</Badge>;
}
