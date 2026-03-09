import Markdown from "./Markdown";

interface ClosingSummaryProps {
  text: string;
}

export default function ClosingSummary({ text }: ClosingSummaryProps) {
  return (
    <div className="bg-fg rounded-lg p-lg mb-md">
      <Markdown content={text} />
    </div>
  );
}
