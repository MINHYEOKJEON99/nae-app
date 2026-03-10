"use client";

import type { CSSProperties } from "react";
import { colors } from "@/lib/theme";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface MarkdownProps {
  content: string;
  style?: CSSProperties;
}

export default function Markdown({ content, style = {} }: MarkdownProps) {
  return (
    <div style={style}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          p: ({ children }) => (
            <p style={{ fontSize: 14, lineHeight: 1.8, color: colors.textPrimary, marginBottom: 8, wordBreak: 'keep-all' }}>
              {children}
            </p>
          ),
          strong: ({ children }) => (
            <strong style={{ fontWeight: 600, color: colors.accent }}>{children}</strong>
          ),
          ul: ({ children }) => (
            <ul style={{ listStyleType: 'disc', paddingLeft: 24, marginBottom: 8, display: 'flex', flexDirection: 'column', gap: 4 }}>{children}</ul>
          ),
          ol: ({ children }) => (
            <ol style={{ listStyleType: 'decimal', paddingLeft: 24, marginBottom: 8, display: 'flex', flexDirection: 'column', gap: 4 }}>{children}</ol>
          ),
          li: ({ children }) => (
            <li style={{ fontSize: 14, lineHeight: 1.6, color: colors.textPrimary, wordBreak: 'keep-all' }}>
              {children}
            </li>
          ),
          h3: ({ children }) => (
            <h3 style={{ fontSize: 16, fontWeight: 600, color: colors.textPrimary, marginBottom: 4 }}>
              {children}
            </h3>
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
