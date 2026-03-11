"use client";

import { useState } from "react";
import { BottomCTA, Post, ConfirmDialog } from "@toss/tds-mobile";
import { openURL } from "@apps-in-toss/web-framework";
import { colors } from "@/lib/theme";

interface ArticleDetailProps {
  article: {
    _id: string;
    title: string;
    url: string;
    category: string;
    aiSummaryShort: string;
    aiSummaryLong: string;
    keywords: string[];
    isHot: boolean;
    createdAt: string;
  };
}

/** 마지막 문장이 완결되지 않았으면 말줄임 처리 */
function ensureEnding(text: string): string {
  const trimmed = text.trim();
  if (!trimmed) return trimmed;
  const lastChar = trimmed[trimmed.length - 1];
  if (/[.!?。다요함임됨음)」』]/.test(lastChar)) return trimmed;
  // 마지막 완결 문장까지만 자르기
  const lastSentenceEnd = Math.max(
    trimmed.lastIndexOf("."),
    trimmed.lastIndexOf("다."),
    trimmed.lastIndexOf("요."),
    trimmed.lastIndexOf("니다."),
  );
  if (lastSentenceEnd > trimmed.length * 0.5) {
    return trimmed.slice(0, lastSentenceEnd + 1);
  }
  return trimmed + "...";
}

export default function ArticleDetail({ article }: ArticleDetailProps) {
  const [showDialog, setShowDialog] = useState(false);

  const handleOpenDialog = () => setShowDialog(true);
  const handleCloseDialog = () => setShowDialog(false);
  const handleNavigate = () => {
    openURL(article.url);
    setShowDialog(false);
  };

  return (
    <div>
      <Post.H1 paddingBottom={8}>{article.title}</Post.H1>

      <div
        style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 24, paddingLeft: 24, paddingRight: 24 }}>
        <span
          style={{
            fontSize: 11,
            fontWeight: 600,
            padding: "2px 8px",
            borderRadius: 9999,
            ...(article.category === "global"
              ? { backgroundColor: "#dbeafe", color: "#2563eb" }
              : { backgroundColor: "#d1fae5", color: "#059669" }),
          }}>
          {article.category === "global" ? "Global" : "Ko"}
        </span>
        {article.keywords.slice(0, 5).map((kw) => (
          <span
            key={kw}
            style={{
              fontSize: 11,
              padding: "3px 8px",
              backgroundColor: colors.button,
              borderRadius: 9999,
              color: colors.textSecondary,
            }}>
            {kw}
          </span>
        ))}
      </div>

      {article.aiSummaryShort && (
        <>
          <Post.H3 paddingBottom={8}>요약</Post.H3>
          <Post.Paragraph paddingBottom={24}>{ensureEnding(article.aiSummaryShort)}</Post.Paragraph>
        </>
      )}

      {article.aiSummaryLong && (
        <>
          <Post.Hr paddingBottom={24} />
          <Post.H3 paddingBottom={8}>상세 분석</Post.H3>
          <Post.Paragraph>{ensureEnding(article.aiSummaryLong)}</Post.Paragraph>
        </>
      )}

      <Post.Hr paddingBottom={24} />

      {/* @ts-expect-error framer-motion type mismatch with React 19 */}
      <BottomCTA.Single onClick={handleOpenDialog}>원문보기</BottomCTA.Single>

      <ConfirmDialog
        open={showDialog}
        onClose={handleCloseDialog}
        title="외부 페이지 이동"
        description="확인 버튼을 누르면 외부 브라우저로 이동합니다. 이동하시겠습니까?"
        cancelButton={<ConfirmDialog.CancelButton onClick={handleCloseDialog}>닫기</ConfirmDialog.CancelButton>}
        confirmButton={<ConfirmDialog.ConfirmButton onClick={handleNavigate}>이동하기</ConfirmDialog.ConfirmButton>}
      />
    </div>
  );
}
