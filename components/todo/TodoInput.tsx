'use client';

import { useState } from 'react';
import TimePickerModal from './TimePickerModal';

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
      <form onSubmit={handleSubmit} className="flex items-center gap-sm mb-lg">
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="할 일 입력..."
          className="flex-1 py-[12px] px-[16px] bg-fg rounded-md text-[14px] text-text-primary border-[1.5px] border-transparent transition-colors duration-150 placeholder:text-text-tertiary focus:border-accent"
        />
        <button
          type="submit"
          className="shrink-0 py-[12px] px-[16px] bg-accent text-white rounded-md text-[14px] font-semibold whitespace-nowrap transition-opacity duration-150 active:opacity-80"
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
