'use client';

import styled from '@emotion/styled';

const Wrapper = styled.header`
  padding: ${({ theme }) => theme.spacing.md} 0;
  margin-bottom: ${({ theme }) => theme.spacing.sm};
`;

const Date = styled.p`
  font-size: ${({ theme }) => theme.typography.caption.fontSize};
  color: ${({ theme }) => theme.colors.text.secondary};
  margin-bottom: 2px;
`;

const Title = styled.h1`
  font-size: ${({ theme }) => theme.typography.heading.fontSize};
  font-weight: ${({ theme }) => theme.typography.heading.fontWeight};
  line-height: ${({ theme }) => theme.typography.heading.lineHeight};
  color: ${({ theme }) => theme.colors.text.primary};
`;

interface HeaderProps {
  date?: string;
  title: string;
}

export default function Header({ date, title }: HeaderProps) {
  return (
    <Wrapper>
      {date && <Date>{date}</Date>}
      <Title>{title}</Title>
    </Wrapper>
  );
}
