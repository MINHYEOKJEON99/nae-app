'use client';

import styled from '@emotion/styled';

const Wrapper = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.sm};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

const Chip = styled('button', {
  shouldForwardProp: (prop) => prop !== '$active',
})<{ $active: boolean }>`
  padding: 8px 16px;
  border-radius: ${({ theme }) => theme.borderRadius.full};
  font-size: 13px;
  font-weight: ${({ $active }) => ($active ? 600 : 400)};
  background: ${({ theme, $active }) =>
    $active ? theme.colors.text.primary : theme.colors.foreground};
  color: ${({ theme, $active }) =>
    $active ? theme.colors.foreground : theme.colors.text.secondary};
  transition: all 0.15s ease;
`;

type FilterValue = 'all' | 'global' | 'korea';

interface CategoryFilterProps {
  value: FilterValue;
  onChange: (v: FilterValue) => void;
}

const filters: { label: string; value: FilterValue }[] = [
  { label: '전체', value: 'all' },
  { label: '글로벌', value: 'global' },
  { label: '한국', value: 'korea' },
];

export default function CategoryFilter({
  value,
  onChange,
}: CategoryFilterProps) {
  return (
    <Wrapper>
      {filters.map((f) => (
        <Chip
          key={f.value}
          $active={value === f.value}
          onClick={() => onChange(f.value)}
        >
          {f.label}
        </Chip>
      ))}
    </Wrapper>
  );
}
