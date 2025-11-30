'use client';

import { ParsedQuote, ParsedQuoteLine, parseQuote } from '@/lib/quoteParser';
import { Quote } from '@/types/types';

type QCProps = {
  quote: Quote;
  className?: string;
};
export default function QuoteCard({ quote, className }: QCProps) {
  const parsedQuote = parseQuote(quote.quote);

  const linesLength = parsedQuote.lines.length;
  const hasDialogue = parsedQuote.lines.some((line) => line.type === 'dialogue');

  return (
    <div
      className={`bg-foxbg p-4 rounded-md ${className} flex flex-col gap-2  
      ${linesLength > 1 ? 'justify-start' : 'justify-center'}
      ${hasDialogue ? 'items-start' : 'items-center'}`}>
      {parsedQuote.lines.map((line) => (
        <QuoteCardContent key={line.text} line={line} />
      ))}
    </div>
  );
}

export function QuoteCardContent({ line }: { line: ParsedQuoteLine }) {
  switch (line.type) {
    case 'context':
      return <p className="text-slate text-sm sm:text-md italic self-center">({line.text})</p>;
    case 'dialogue':
      return (
        <p className="text-slate text-sm sm:text-lg">
          <span className="font-bold">{line.speaker}:</span> &quot;{line.text}&quot;
        </p>
      );
    default:
    case 'text':
      return <p className="text-slate text-sm sm:text-lg">&quot;{line.text}&quot;</p>;
  }
}

export function MiniQuoteCard({ parsedQuote }: { parsedQuote: ParsedQuote }) {
  return (
    <div className="flex flex-col gap-1 text-sm sm:text-lg">
      {parsedQuote.lines.map((line) => (
        <QuoteCardContent key={line.text} line={line} />
      ))}
    </div>
  );
}
