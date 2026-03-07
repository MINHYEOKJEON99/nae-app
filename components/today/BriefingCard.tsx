interface BriefingCardProps {
  intro: string;
}

export default function BriefingCard({ intro }: BriefingCardProps) {
  return (
    <div className="bg-fg rounded-lg p-lg mb-md">
      <span className="inline-block text-caption text-accent font-semibold mb-md">
        오늘의 브리핑
      </span>
      <p className="text-[15px] leading-[1.8] text-text-primary word-keep-all">
        {intro}
      </p>
    </div>
  );
}
