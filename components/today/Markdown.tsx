"use client";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface MarkdownProps {
  content: string;
  className?: string;
}

export default function Markdown({ content, className = "" }: MarkdownProps) {
  return (
    <div className={className}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          p: ({ children }) => (
            <p className="text-body leading-[1.8] text-text-primary mb-sm word-keep-all">
              {children}
            </p>
          ),
          strong: ({ children }) => (
            <strong className="font-semibold text-accent">{children}</strong>
          ),
          ul: ({ children }) => (
            <ul className="list-disc pl-lg mb-sm space-y-xs">{children}</ul>
          ),
          ol: ({ children }) => (
            <ol className="list-decimal pl-lg mb-sm space-y-xs">{children}</ol>
          ),
          li: ({ children }) => (
            <li className="text-body leading-[1.6] text-text-primary word-keep-all">
              {children}
            </li>
          ),
          h3: ({ children }) => (
            <h3 className="text-subheading font-semibold text-text-primary mb-xs">
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
