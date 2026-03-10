"use client";

import { useEffect, useState } from "react";
import { SunIcon, MoonIcon } from "@/components/common/IconSet";

type Theme = "light" | "dark" | "system";

function getInitialTheme(): Theme {
  if (typeof window === "undefined") return "system";
  return (localStorage.getItem("theme") as Theme) || "system";
}

export default function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>(getInitialTheme);

  useEffect(() => {
    localStorage.setItem("theme", theme);
    if (theme === "system") {
      const isDark = window.matchMedia("(prefers-color-scheme:dark)").matches;
      document.documentElement.classList.toggle("dark", isDark);
    } else {
      document.documentElement.classList.toggle("dark", theme === "dark");
    }
  }, [theme]);

  const options: { value: Theme; label: string; icon: React.ReactNode }[] = [
    { value: "light", label: "라이트", icon: <SunIcon size={18} /> },
    { value: "dark", label: "다크", icon: <MoonIcon size={18} /> },
    { value: "system", label: "시스템", icon: null },
  ];

  return (
    <div style={{
      backgroundColor: 'var(--color-fg)',
      borderRadius: '16px',
      padding: '16px',
    }}>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        marginBottom: '12px',
      }}>
        <span style={{
          color: 'var(--color-text-primary)',
          fontSize: '15px',
          fontWeight: 600,
        }}>
          테마
        </span>
      </div>
      <div style={{ display: 'flex', gap: '8px' }}>
        {options.map((opt) => (
          <button
            key={opt.value}
            onClick={() => setTheme(opt.value)}
            style={{
              flex: 1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              padding: '10px 0',
              borderRadius: '12px',
              fontSize: '13px',
              fontWeight: 500,
              border: 'none',
              cursor: 'pointer',
              transition: 'background-color 0.2s, color 0.2s',
              backgroundColor: theme === opt.value ? 'var(--color-accent)' : 'var(--color-bg)',
              color: theme === opt.value ? '#ffffff' : 'var(--color-text-secondary)',
            }}>
            {opt.icon}
            {opt.label}
          </button>
        ))}
      </div>
    </div>
  );
}
