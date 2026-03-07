interface KeywordChipsProps {
  keywords: string[];
}

export default function KeywordChips({ keywords }: KeywordChipsProps) {
  return (
    <div className="flex gap-sm flex-wrap py-xs">
      {keywords.map((keyword) => (
        <span
          key={keyword}
          className="inline-flex items-center px-[12px] py-[6px] bg-fg rounded-full text-caption text-text-secondary font-medium whitespace-nowrap"
        >
          {keyword}
        </span>
      ))}
    </div>
  );
}
