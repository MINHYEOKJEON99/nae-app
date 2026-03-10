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
      style={{
        position: 'fixed',
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        backgroundColor: 'rgba(0,0,0,0.45)',
        display: 'flex',
        zIndex: 200,
        alignItems: 'flex-end',
        justifyContent: 'center',
      }}
    >
      <div style={{
        width: '100%',
        maxWidth: 480,
        backgroundColor: 'var(--color-fg)',
        padding: 24,
        borderTopLeftRadius: 16,
        borderTopRightRadius: 16,
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0,
        paddingBottom: 'calc(32px + env(safe-area-inset-bottom, 0px))',
      }}>
        <h3 style={{
          fontSize: 16,
          lineHeight: '24px',
          fontWeight: 600,
          color: 'var(--color-text-primary)',
          marginBottom: 24,
          textAlign: 'center',
        }}>
          시간 선택
        </h3>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: 8,
          marginBottom: 24,
        }}>
          {PRESETS.map((t) => (
            <button
              key={t}
              style={{
                paddingTop: 12,
                paddingBottom: 12,
                borderRadius: 12,
                fontSize: 14,
                transition: 'all 0.15s',
                border: 'none',
                cursor: 'pointer',
                ...(selected === t
                  ? { fontWeight: 600, backgroundColor: 'var(--color-accent)', color: '#fff' }
                  : { fontWeight: 400, backgroundColor: 'var(--color-button)', color: 'var(--color-text-primary)' }
                ),
              }}
              onClick={() => setSelected(t)}
            >
              {t}
            </button>
          ))}
        </div>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 8,
          marginBottom: 24,
        }}>
          <span style={{ fontSize: 13, color: 'var(--color-text-secondary)' }}>직접 입력</span>
          <input
            type="time"
            value={selected}
            onChange={(e) => setSelected(e.target.value)}
            style={{
              width: 200,
              paddingTop: 10,
              paddingBottom: 10,
              paddingLeft: 16,
              paddingRight: 16,
              backgroundColor: 'var(--color-button)',
              borderRadius: 12,
              fontSize: 20,
              fontWeight: 600,
              color: 'var(--color-text-primary)',
              textAlign: 'center',
              border: '1.5px solid transparent',
              appearance: 'none',
              WebkitAppearance: 'none',
            }}
          />
        </div>
        <button
          onClick={onSkip}
          style={{
            width: '100%',
            paddingTop: 14,
            paddingBottom: 14,
            borderRadius: 12,
            fontSize: 14,
            fontWeight: 500,
            backgroundColor: 'transparent',
            color: 'var(--color-text-secondary)',
            marginBottom: 8,
            border: 'none',
            cursor: 'pointer',
          }}
        >
          시간 없이 추가
        </button>
        <div style={{ display: 'flex', gap: 8 }}>
          <button
            onClick={onCancel}
            style={{
              flex: 1,
              paddingTop: 14,
              paddingBottom: 14,
              borderRadius: 12,
              fontSize: 15,
              fontWeight: 600,
              backgroundColor: 'var(--color-button)',
              color: 'var(--color-text-primary)',
              border: 'none',
              cursor: 'pointer',
            }}
          >
            취소
          </button>
          <button
            onClick={() => onConfirm(selected)}
            style={{
              flex: 1,
              paddingTop: 14,
              paddingBottom: 14,
              borderRadius: 12,
              fontSize: 15,
              fontWeight: 600,
              backgroundColor: 'var(--color-accent)',
              color: '#fff',
              border: 'none',
              cursor: 'pointer',
            }}
          >
            확인
          </button>
        </div>
      </div>
    </div>
  );
}
