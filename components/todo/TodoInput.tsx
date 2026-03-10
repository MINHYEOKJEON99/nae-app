'use client';

import { useState } from 'react';
import TimePickerModal from './TimePickerModal';
import { colors } from "@/lib/theme";

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
      <form onSubmit={handleSubmit} style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 24 }}>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="할 일 입력..."
          style={{
            flex: 1,
            paddingTop: 12,
            paddingBottom: 12,
            paddingLeft: 16,
            paddingRight: 16,
            backgroundColor: colors.fg,
            borderRadius: 12,
            fontSize: 14,
            color: colors.textPrimary,
            border: '1.5px solid transparent',
            transition: 'color 0.15s, background-color 0.15s',
          }}
        />
        <button
          type="submit"
          style={{
            flexShrink: 0,
            paddingTop: 12,
            paddingBottom: 12,
            paddingLeft: 16,
            paddingRight: 16,
            backgroundColor: colors.accent,
            color: '#fff',
            borderRadius: 12,
            fontSize: 14,
            fontWeight: 600,
            whiteSpace: 'nowrap',
            transition: 'opacity 0.15s',
            border: 'none',
            cursor: 'pointer',
          }}
        >
          추가
        </button>
      </form>
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
