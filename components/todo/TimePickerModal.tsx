'use client';

import { useState } from 'react';
import styled from '@emotion/styled';

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.45);
  display: flex;
  z-index: 200;

  /* 모바일: 바텀시트 */
  align-items: flex-end;
  justify-content: center;

  /* 데스크탑: 중앙 모달 */
  @media (min-width: 481px) {
    align-items: center;
  }
`;

const Sheet = styled.div`
  width: 100%;
  max-width: ${({ theme }) => theme.maxWidth};
  background: ${({ theme }) => theme.colors.foreground};
  padding: ${({ theme }) => theme.spacing.lg};

  /* 모바일: 바텀시트 (하단 붙음, 위만 둥글게) */
  border-radius: ${({ theme }) => theme.borderRadius.lg}
    ${({ theme }) => theme.borderRadius.lg} 0 0;
  padding-bottom: calc(${({ theme }) => theme.spacing.xl} + env(safe-area-inset-bottom, 0px));

  /* 데스크탑: 중앙 모달 (전체 둥글게) */
  @media (min-width: 481px) {
    max-width: 400px;
    border-radius: ${({ theme }) => theme.borderRadius.lg};
    padding-bottom: ${({ theme }) => theme.spacing.lg};
  }
`;

const Title = styled.h3`
  font-size: ${({ theme }) => theme.typography.subheading.fontSize};
  font-weight: ${({ theme }) => theme.typography.subheading.fontWeight};
  color: ${({ theme }) => theme.colors.text.primary};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  text-align: center;
`;

const TimeGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: ${({ theme }) => theme.spacing.sm};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

const TimeChip = styled.button<{ $selected: boolean }>`
  padding: 12px 0;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  font-size: 14px;
  font-weight: ${({ $selected }) => ($selected ? 600 : 400)};
  background: ${({ theme, $selected }) =>
    $selected ? theme.colors.accent : theme.colors.button};
  color: ${({ theme, $selected }) =>
    $selected ? '#fff' : theme.colors.text.primary};
  transition: all 0.15s ease;
`;

const CustomTimeRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing.sm};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

const CustomLabel = styled.span`
  font-size: 13px;
  color: ${({ theme }) => theme.colors.text.secondary};
`;

const CustomInput = styled.input`
  width: 200px;
  padding: 10px 16px;
  background: ${({ theme }) => theme.colors.button};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  font-size: 20px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text.primary};
  text-align: center;
  border: 1.5px solid transparent;
  -webkit-appearance: none;
  appearance: none;

  &:focus {
    border-color: ${({ theme }) => theme.colors.accent};
  }

  &::-webkit-calendar-picker-indicator {
    filter: ${({ theme }) =>
      theme.colors.background === '#101012'
        ? 'invert(1) brightness(0.8)'
        : 'none'};
    cursor: pointer;
  }
`;

const ButtonRow = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.sm};
`;

const SkipButton = styled.button`
  width: 100%;
  padding: 14px 0;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  font-size: 14px;
  font-weight: 500;
  background: none;
  color: ${({ theme }) => theme.colors.text.secondary};
  margin-bottom: ${({ theme }) => theme.spacing.sm};
`;

const CancelButton = styled.button`
  flex: 1;
  padding: 14px 0;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  font-size: 15px;
  font-weight: 600;
  background: ${({ theme }) => theme.colors.button};
  color: ${({ theme }) => theme.colors.text.primary};
`;

const ConfirmButton = styled.button`
  flex: 1;
  padding: 14px 0;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  font-size: 15px;
  font-weight: 600;
  background: ${({ theme }) => theme.colors.accent};
  color: #fff;
`;

const PRESETS = [
  '08:00', '09:00', '10:00', '11:00',
  '12:00', '13:00', '14:00', '15:00',
  '16:00', '17:00', '18:00', '19:00',
];

interface TimePickerModalProps {
  onConfirm: (time: string) => void;
  onSkip: () => void;
  onCancel: () => void;
}

export default function TimePickerModal({
  onConfirm,
  onSkip,
  onCancel,
}: TimePickerModalProps) {
  const [selected, setSelected] = useState('09:00');

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) onCancel();
  };

  return (
    <Overlay onClick={handleOverlayClick}>
      <Sheet>
        <Title>시간 선택</Title>
        <TimeGrid>
          {PRESETS.map((t) => (
            <TimeChip
              key={t}
              $selected={selected === t}
              onClick={() => setSelected(t)}
            >
              {t}
            </TimeChip>
          ))}
        </TimeGrid>
        <CustomTimeRow>
          <CustomLabel>직접 입력</CustomLabel>
          <CustomInput
            type="time"
            value={selected}
            onChange={(e) => setSelected(e.target.value)}
          />
        </CustomTimeRow>
        <SkipButton onClick={onSkip}>시간 없이 추가</SkipButton>
        <ButtonRow>
          <CancelButton onClick={onCancel}>취소</CancelButton>
          <ConfirmButton onClick={() => onConfirm(selected)}>확인</ConfirmButton>
        </ButtonRow>
      </Sheet>
    </Overlay>
  );
}
