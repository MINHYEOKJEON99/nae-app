"use client";

import { useState } from "react";
import type { Article } from "@/types/article";
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
      <div className="flex gap-sm mb-lg">
        <button
          onClick={() => setTab("korea")}
          className={`px-md py-xs rounded-full text-body font-semibold transition-colors ${
            tab === "korea" ? "bg-accent text-white" : "bg-button text-text-secondary"
          }`}>
          Ko
        </button>
        <button
          onClick={() => setTab("global")}
          className={`px-md py-xs rounded-full text-body font-semibold transition-colors ${
            tab === "global" ? "bg-accent text-white" : "bg-button text-text-secondary"
          }`}>
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
