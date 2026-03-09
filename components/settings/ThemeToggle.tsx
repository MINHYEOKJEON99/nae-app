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
    <div className="bg-fg rounded-2xl p-4">
      <div className="flex items-center gap-3 mb-3">
        <span className="text-text-primary text-[15px] font-semibold">테마</span>
      </div>
      <div className="flex gap-2">
        {options.map((opt) => (
          <button
            key={opt.value}
            onClick={() => setTheme(opt.value)}
            className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-[13px] font-medium transition-colors ${
              theme === opt.value ? "bg-accent text-white" : "bg-bg text-text-secondary"
            }`}>
            {opt.icon}
            {opt.label}
          </button>
        ))}
      </div>
    </div>
  );
}
