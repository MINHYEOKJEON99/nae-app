'use client';

import { useState } from 'react';
import styled from '@emotion/styled';
import TimePickerModal from './TimePickerModal';

const Form = styled.form`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

const Input = styled.input`
  flex: 1;
  padding: 12px 16px;
  background: ${({ theme }) => theme.colors.foreground};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  font-size: 14px;
  color: ${({ theme }) => theme.colors.text.primary};
  border: 1.5px solid transparent;
  transition: border-color 0.15s ease;

  &::placeholder {
    color: ${({ theme }) => theme.colors.text.tertiary};
  }

  &:focus {
    border-color: ${({ theme }) => theme.colors.accent};
  }
`;

const AddButton = styled.button`
  flex-shrink: 0;
  padding: 12px 16px;
  background: ${({ theme }) => theme.colors.accent};
  color: #fff;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  font-size: 14px;
  font-weight: 600;
  white-space: nowrap;
  transition: opacity 0.15s ease;

  &:active {
    opacity: 0.8;
  }
`;

interface TodoInputProps {
  onAdd: (title: string, time: string) => void;
}

export default function TodoInput({ onAdd }: TodoInputProps) {
  const [title, setTitle] = useState('');
  const [showModal, setShowModal] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    setShowModal(true);
  };

  const handleTimeConfirm = (time: string) => {
    onAdd(title.trim(), time);
    setTitle('');
    setShowModal(false);
  };

  const handleSkipTime = () => {
    onAdd(title.trim(), '');
    setTitle('');
    setShowModal(false);
  };

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <Input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="할 일 입력..."
        />
        <AddButton type="submit">추가</AddButton>
      </Form>
      {showModal && (
        <TimePickerModal
          onConfirm={handleTimeConfirm}
          onSkip={handleSkipTime}
          onCancel={() => setShowModal(false)}
        />
      )}
    </>
  );
}
