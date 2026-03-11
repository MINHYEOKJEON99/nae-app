"use client";

import { useState } from "react";
import { colors } from "@/lib/theme";
import { BottomSheet, CTAButton } from "@toss/tds-mobile";

const PRESETS = [
  "08:00",
  "09:00",
  "10:00",
  "11:00",
  "12:00",
  "13:00",
  "14:00",
  "15:00",
  "16:00",
  "17:00",
  "18:00",
  "19:00",
];

interface TimePickerModalProps {
  open: boolean;
  onConfirm: (time: string) => void;
  onSkip: () => void;
  onCancel: () => void;
}

export default function TimePickerModal({ open, onConfirm, onSkip, onCancel }: TimePickerModalProps) {
  const [selected, setSelected] = useState("09:00");

  return (
    <BottomSheet
      open={open}
      onClose={onCancel}
      header={<BottomSheet.Header>시간 선택</BottomSheet.Header>}
      cta={
        <BottomSheet.DoubleCTA
          leftButton={
            // @ts-expect-error framer-motion type mismatch with React 19
            <CTAButton variant="weak" onClick={onCancel}>
              취소
            </CTAButton>
          }
          rightButton={
            // @ts-expect-error framer-motion type mismatch with React 19
            <CTAButton onClick={() => onConfirm(selected)}>확인</CTAButton>
          }
        />
      }>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: 8,
          marginBottom: 24,
          paddingLeft: 16,
          paddingRight: 16,
        }}>
        {PRESETS.map((t) => (
          <button
            key={t}
            style={{
              paddingTop: 12,
              paddingBottom: 12,
              borderRadius: 12,
              fontSize: 14,
              transition: "all 0.15s",
              border: "none",
              cursor: "pointer",
              ...(selected === t
                ? { fontWeight: 600, backgroundColor: colors.accent, color: "#fff" }
                : { fontWeight: 400, backgroundColor: colors.button, color: colors.textPrimary }),
            }}
            onClick={() => setSelected(t)}>
            {t}
          </button>
        ))}
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 8,
          marginBottom: 16,
        }}>
        <span style={{ fontSize: 13, color: colors.textSecondary }}>직접 입력</span>
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
            backgroundColor: colors.button,
            borderRadius: 12,
            fontSize: 16,
            fontWeight: 600,
            color: colors.textPrimary,
            textAlign: "center",
            border: "1.5px solid transparent",
            appearance: "none",
            WebkitAppearance: "none",
          }}
        />
      </div>
      <button
        onClick={onSkip}
        style={{
          width: "100%",
          paddingTop: 14,
          paddingBottom: 14,
          borderRadius: 12,
          fontSize: 14,
          fontWeight: 500,
          backgroundColor: "transparent",
          color: colors.textSecondary,
          border: "none",
          cursor: "pointer",
        }}>
        시간 없이 추가
      </button>
    </BottomSheet>
  );
}
