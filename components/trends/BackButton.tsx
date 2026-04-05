"use client";

import { useRouter } from "next/navigation";

export default function BackButton() {
  const router = useRouter();
  return (
    <button onClick={() => router.back()} className="text-accent text-[14px] bg-transparent border-none cursor-pointer p-0">
      ← 목록으로
    </button>
  );
}
