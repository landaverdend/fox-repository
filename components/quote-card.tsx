'use client';

import parseQuote, { ParsedQuoteLine } from '@/lib/quoteParser';

type QCProps = {
  quote: string;
  className?: string;
};
export default function QuoteCard({ quote, className }: QCProps) {
  const parsedQuote = parseQuote(quote);

  return (
    <div className={`bg-foxbg p-4 rounded-md ${className}`}>
      {parsedQuote.lines.map((line) => (
        <QuoteCardContent key={line.text} line={line} />
      ))}
    </div>
  );
}

function QuoteCardContent({ line }: { line: ParsedQuoteLine }) {
  switch (line.type) {
    case 'context':
      return <p className="text-slate text-lg italic">({line.text})</p>;
    case 'dialogue':
      return (
        <p className="text-slate text-lg">
          <span className="font-bold">{line.speaker}:</span> &quot;{line.text}&quot;
        </p>
      );
    default:
    case 'text':
      return <p className="text-slate text-lg">{line.text}</p>;
  }
}
