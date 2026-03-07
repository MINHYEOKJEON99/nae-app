interface ClosingSummaryProps {
  text: string;
}

export default function ClosingSummary({ text }: ClosingSummaryProps) {
  return (
    <div className="bg-fg rounded-lg p-lg mb-md">
      <p className="text-body leading-[1.7] text-text-secondary word-keep-all">
        {text}
      </p>
    </div>
  );
}
