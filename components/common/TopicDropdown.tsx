"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { useState, useRef, useEffect } from "react";

const TOPICS = [
  { value: "IT", label: "IT" },
  { value: "주식", label: "주식" },
] as const;

interface TopicDropdownProps {
  currentTopic: string;
}

export default function TopicDropdown({ currentTopic }: TopicDropdownProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const current = TOPICS.find((t) => t.value === currentTopic) ?? TOPICS[0];

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  function select(value: string) {
    setOpen(false);
    const params = new URLSearchParams(searchParams.toString());
    if (value === "IT") {
      params.delete("topic");
    } else {
      params.set("topic", value);
    }
    const qs = params.toString();
    router.push(qs ? `${pathname}?${qs}` : pathname);
  }

  return (
    <div ref={ref} className="relative inline-block">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-[4px] text-text-secondary text-[13px] font-medium px-[8px] py-[4px] rounded-md bg-button"
      >
        {current.label}
        <svg width="12" height="12" viewBox="0 0 12 12" className={`transition-transform ${open ? "rotate-180" : ""}`}>
          <path d="M3 4.5L6 7.5L9 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        </svg>
      </button>

      {open && (
        <div className="absolute top-full left-0 mt-[4px] bg-fg border border-border rounded-lg shadow-lg z-50 min-w-[80px] overflow-hidden">
          {TOPICS.map((t) => (
            <button
              key={t.value}
              onClick={() => select(t.value)}
              className={`block w-full text-left px-[12px] py-[8px] text-[13px] ${
                t.value === currentTopic
                  ? "text-accent font-semibold bg-button"
                  : "text-text-primary hover:bg-button"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
