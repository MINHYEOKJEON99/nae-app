"use client";

import type { MainIssue } from "@/types/briefing";
import { colors } from "@/lib/theme";
import Markdown from "./Markdown";
import { BoardRow } from "@toss/tds-mobile";

interface MainIssueCardProps {
  issue: MainIssue;
  index: number;
}

export default function MainIssueCard({ issue, index }: MainIssueCardProps) {
  return (
    <div
      style={{ background: colors.fg, borderRadius: 16, paddingTop: 24, paddingBottom: 24, marginBottom: 16 }}>
      <div
        style={{
          paddingLeft: 24,
          paddingRight: 24,
        }}>
        <div
          style={{
            display: "flex",
            alignItems: "flex-start",
            gap: 16,
            marginBottom: 16,
          }}>
          <div
            style={{
              flexShrink: 0,
              width: 28,
              height: 28,
              borderRadius: 9999,
              background: colors.accent,
              color: "#ffffff",
              fontSize: 13,
              fontWeight: 700,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}>
            {index + 1}
          </div>
          <h3
            style={{
              fontSize: 16,
              fontWeight: 600,

              lineHeight: "24px",
              color: colors.textPrimary,
              wordBreak: "keep-all",
            }}>
            {issue.title}
          </h3>
        </div>
        <Markdown content={issue.summary} />
      </div>
      <BoardRow
        initialOpened
        title="왜 중요한가요?"
        prefix={<BoardRow.Prefix>Q</BoardRow.Prefix>}
        icon={<BoardRow.ArrowIcon />}>
        <BoardRow.Text>{issue.whyImportant}</BoardRow.Text>
      </BoardRow>
    </div>
  );
}
