'use client';

import styled from '@emotion/styled';

const Banner = styled.div`
  background: ${({ theme }) => theme.colors.button};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  padding: ${({ theme }) => theme.spacing.lg};
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

const TitleRow = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

const Icon = styled.span`
  font-size: 16px;
`;

const Title = styled.span`
  font-size: ${({ theme }) => theme.typography.body.fontSize};
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text.primary};
`;

const Item = styled.p`
  font-size: 13px;
  line-height: 1.6;
  color: ${({ theme }) => theme.colors.text.secondary};
  padding-left: ${({ theme }) => theme.spacing.md};
  position: relative;

  &::before {
    content: '•';
    position: absolute;
    left: 4px;
    color: ${({ theme }) => theme.colors.text.tertiary};
  }
`;

interface UpdateBannerProps {
  type: 'midday' | 'evening';
  items: string[];
}

export default function UpdateBanner({ type, items }: UpdateBannerProps) {
  const label = type === 'midday' ? 'Midday Update' : 'Evening Update';

  return (
    <Banner>
      <TitleRow>
        <Icon>🔄</Icon>
        <Title>{label}</Title>
      </TitleRow>
      {items.map((item, i) => (
        <Item key={i}>{item}</Item>
      ))}
    </Banner>
  );
}
