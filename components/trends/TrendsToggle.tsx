"use client";

import { useState } from "react";
import type { Article } from "@/types/article";
import { colors } from "@/lib/theme";
import TopFiveSection from "./TopFiveSection";
import ArticleList from "./ArticleList";

type Tab = "korea" | "global";

interface TrendsToggleProps {
  globalBest5: Article[];
  globalRest: Article[];
  koreaBest5: Article[];
  koreaRest: Article[];
}

export default function TrendsToggle({ globalBest5, globalRest, koreaBest5, koreaRest }: TrendsToggleProps) {
  const [tab, setTab] = useState<Tab>("korea");

  return (
    <>
      <div style={{ display: 'flex', gap: '8px', marginBottom: '24px' }}>
        <button
          onClick={() => setTab("korea")}
          style={{
            padding: '4px 16px',
            borderRadius: '9999px',
            fontSize: '14px',
            lineHeight: '22px',
            fontWeight: 600,
            border: 'none',
            cursor: 'pointer',
            transition: 'background-color 0.2s, color 0.2s',
            backgroundColor: tab === "korea" ? colors.accent : colors.button,
            color: tab === "korea" ? '#ffffff' : colors.textSecondary,
          }}>
          Ko
        </button>
        <button
          onClick={() => setTab("global")}
          style={{
            padding: '4px 16px',
            borderRadius: '9999px',
            fontSize: '14px',
            lineHeight: '22px',
            fontWeight: 600,
            border: 'none',
            cursor: 'pointer',
            transition: 'background-color 0.2s, color 0.2s',
            backgroundColor: tab === "global" ? colors.accent : colors.button,
            color: tab === "global" ? '#ffffff' : colors.textSecondary,
          }}>
          global
        </button>
      </div>

      {tab === "korea" ? (
        <div>
          <TopFiveSection articles={koreaBest5} title="🔥 Korea BEST 5 🔥" />
          <ArticleList articles={koreaRest} title="Korea Top 뉴스" />
        </div>
      ) : (
        <div>
          <TopFiveSection articles={globalBest5} title="🔥 Global BEST 5 🔥" />
          <ArticleList articles={globalRest} title="Global Top 뉴스" />
        </div>
      )}
    </>
  );
}
