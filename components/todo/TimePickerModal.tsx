'use client';

import { useState } from 'react';

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
    <div
      onClick={handleOverlayClick}
      className="fixed inset-0 bg-black/45 flex z-200 items-end justify-center desktop:items-center"
    >
      <div className="w-full max-w-[480px] bg-fg p-lg rounded-t-lg rounded-b-none pb-[calc(var(--spacing-xl)+env(safe-area-inset-bottom,0px))] desktop:max-w-[400px] desktop:rounded-lg desktop:pb-lg">
        <h3 className="text-subheading font-semibold text-text-primary mb-lg text-center">
          시간 선택
        </h3>
        <div className="grid grid-cols-4 gap-sm mb-lg">
          {PRESETS.map((t) => (
            <button
              key={t}
              className={`py-[12px] rounded-md text-[14px] transition-all duration-150 ${
                selected === t
                  ? 'font-semibold bg-accent text-white'
                  : 'font-normal bg-button text-text-primary'
              }`}
              onClick={() => setSelected(t)}
            >
              {t}
            </button>
          ))}
        </div>
        <div className="flex items-center justify-center gap-sm mb-lg">
          <span className="text-[13px] text-text-secondary">직접 입력</span>
          <input
            type="time"
            value={selected}
            onChange={(e) => setSelected(e.target.value)}
            className="w-[200px] py-[10px] px-[16px] bg-button rounded-md text-[20px] font-semibold text-text-primary text-center border-[1.5px] border-transparent appearance-none focus:border-accent [&::-webkit-calendar-picker-indicator]:cursor-pointer dark:[&::-webkit-calendar-picker-indicator]:invert dark:[&::-webkit-calendar-picker-indicator]:brightness-[0.8]"
          />
        </div>
        <button
          onClick={onSkip}
          className="w-full py-[14px] rounded-md text-[14px] font-medium bg-transparent text-text-secondary mb-sm"
        >
          시간 없이 추가
        </button>
        <div className="flex gap-sm">
          <button
            onClick={onCancel}
            className="flex-1 py-[14px] rounded-md text-[15px] font-semibold bg-button text-text-primary"
          >
            취소
          </button>
          <button
            onClick={() => onConfirm(selected)}
            className="flex-1 py-[14px] rounded-md text-[15px] font-semibold bg-accent text-white"
          >
            확인
          </button>
        </div>
      </div>
    </div>
  );
}
