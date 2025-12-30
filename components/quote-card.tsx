'use client';

import { ParsedQuote, ParsedQuoteLine, parseQuote } from '@/lib/quoteParser';
import { QuoteWithReactions } from '@/types/types';
import { Popover, PopoverButton, PopoverPanel } from '@headlessui/react';
import EmojiPicker from 'emoji-picker-react';
import { useClientToken } from './client-token-provider';
import { addReaction, removeReaction } from '@/app/(main)/actions';
import { useState } from 'react';

function formatDate(date: Date): string {
  const now = new Date();
  const diffMs = now.getTime() - new Date(date).getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffDays === 0) return 'Today';
  if (diffDays === 1) return 'Yesterday';
  if (diffDays < 7) return `${diffDays} days ago`;
  if (diffDays < 30) return `${Math.floor(diffDays / 7)} week${Math.floor(diffDays / 7) > 1 ? 's' : ''} ago`;

  return new Date(date).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: new Date(date).getFullYear() !== now.getFullYear() ? 'numeric' : undefined
  });
}

type QCProps = {
  quote: QuoteWithReactions;
  className?: string;
  onReactionAdded: (quoteId: number, emoji: string, count: 1 | -1) => void;
};
export default function QuoteCard({ quote, className, onReactionAdded }: QCProps) {
  const clientToken = useClientToken() ?? '';

  const [isHovered, setIsHovered] = useState(false);
  const [parsedQuote, _] = useState<ParsedQuote>(parseQuote(quote.quote));

  const linesLength = parsedQuote.lines.length;
  const hasDialogue = parsedQuote.lines.some((line) => line.type === 'dialogue');

  const handleReactionClick = async (emoji: string) => {
    if (!clientToken) {
      alert('Missing client token!');
      return;
    }

    try {
      // Optimistically update the UI
      onReactionAdded(quote.id, emoji, 1);

      const resp = await addReaction(clientToken, emoji, quote.id);
      if (!resp.success) {
        alert(resp.message);
        // Rollback the UI update
        onReactionAdded(quote.id, emoji, -1);
      }
    } catch (error) {
      console.error(error);
      alert('An error occurred with adding the reaction');
    }
  };

  const handleRemoveReaction = async (emoji: string) => {
    if (!clientToken) {
      alert('Missing client token!');
      return;
    }

    try {
      // Optimistically update the UI
      onReactionAdded(quote.id, emoji, -1);

      const resp = await removeReaction(clientToken, emoji, quote.id);
      if (!resp.success) {
        alert(resp.message);
        // Rollback the UI update
        onReactionAdded(quote.id, emoji, 1);
      }
    } catch (error) {
      console.error(error);
      alert('An error occurred with removing the reaction');
    }
  };

  const handleEmojiDrawerClick = (reaction: { emoji: string; clientReacted?: boolean | undefined; count: number }) => {
    if (reaction.clientReacted) {
      handleRemoveReaction(reaction.emoji);
    } else if (quote.canReact) {
      handleReactionClick(reaction.emoji);
    }
  };

  const totalReactions = quote.reactions.reduce((sum, r) => sum + r.count, 0);

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`${className} group relative bg-gradient-to-br from-foxbg via-foxbg to-foxbg/90 p-6 rounded-2xl flex flex-col justify-between items-center gap-4
        shadow-md hover:shadow-xl border border-foxlight/20 transition-all duration-300 sm:hover:scale-[1.02] sm:hover:-translate-y-1 overflow-hidden`}>

      {/* Decorative quotation mark */}
      <div className="absolute -top-2 -left-1 text-fox/10 text-8xl font-serif pointer-events-none select-none">"</div>

      {/* Quote content */}
      <div
        className={`flex flex-col gap-3 flex-1 w-full relative z-10 ${linesLength > 1 ? 'justify-start' : 'justify-center'} ${
          hasDialogue ? 'items-start' : 'items-center'
        }`}>
        {parsedQuote.lines.map((line) => (
          <QuoteCardContent key={line.text} line={line} />
        ))}
      </div>

      {/* Footer: Date and Reactions */}
      <div className="w-full pt-4 border-t border-foxlight/20 relative z-10">
        {/* Metadata row */}
        <div className="flex items-center justify-between mb-3 text-xs">
          <div className="flex items-center gap-1.5 text-slate/50">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <span>{formatDate(quote.uploadedAt)}</span>
          </div>
          <div className="flex items-center gap-3">
            {quote.uploadedByName && (
              <div className="flex items-center gap-1.5 text-slate/50">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                <span>{quote.uploadedByName}</span>
              </div>
            )}
            {totalReactions > 0 && (
              <div className="flex items-center gap-1 text-fox/70 font-medium">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
                <span>{totalReactions}</span>
              </div>
            )}
          </div>
        </div>

        {/* Reactions drawer */}
        <div className="flex flex-row gap-2 flex-wrap items-center justify-center min-h-[32px]">
          {quote.reactions.map((reaction) => (
            <div
              key={reaction.emoji}
              className={`flex flex-row rounded-full items-center gap-1 px-3 py-1 select-none cursor-pointer transition-all duration-200 ${
                reaction.clientReacted
                  ? 'bg-fox/20 border-fox/60 border text-foxdark shadow-sm scale-105'
                  : 'bg-foxdark/80 hover:bg-foxdark border border-transparent text-white hover:scale-110 hover:shadow-md'
              }`}
              onClick={() => handleEmojiDrawerClick(reaction)}>
              <span className="text-base">{reaction.emoji}</span>
              <span className="text-xs font-semibold">{reaction.count}</span>
            </div>
          ))}

          {quote.canReact && (
            <Popover className="hidden sm:block">
              <PopoverButton className={`bg-foxlight/50 border border-foxlight/60 text-foxdark hover:bg-foxlight hover:scale-110 rounded-full w-8 h-8 flex items-center justify-center text-lg font-medium transition-all duration-200 ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
                +
              </PopoverButton>
              <PopoverPanel anchor="top start" className="z-50">
                <EmojiPicker
                  onEmojiClick={(emoji) => {
                    handleReactionClick(emoji.emoji);
                  }}
                  autoFocusSearch={false}
                  previewConfig={{
                    showPreview: false,
                  }}
                />
              </PopoverPanel>
            </Popover>
          )}
        </div>
      </div>

      {/* Mobile Emoji Picker Icon */}
      {quote.canReact && (
        <Popover className="sm:hidden">
          <PopoverButton className="absolute bottom-3 left-3 w-8 h-8 bg-foxdark border border-foxdark/80 text-white rounded-full text-lg font-medium select-none cursor-pointer hover:bg-fox transition-colors flex items-center justify-center shadow-md">
            +
          </PopoverButton>

          <PopoverPanel anchor="bottom start" className="">
            <EmojiPicker
              onEmojiClick={(emoji) => {
                handleReactionClick(emoji.emoji);
              }}
              className="!w-[290px] xs:!w-[350px]"
              autoFocusSearch={false}
              previewConfig={{
                showPreview: false,
              }}
            />
          </PopoverPanel>
        </Popover>
      )}
    </div>
  );
}

export function QuoteCardContent({ line }: { line: ParsedQuoteLine }) {
  switch (line.type) {
    case 'context':
      return (
        <p className="text-slate/60 text-sm italic self-center bg-foxlight/10 px-3 py-1 rounded-full">
          {line.text}
        </p>
      );
    case 'dialogue':
      return (
        <p className="text-slate text-base sm:text-lg leading-relaxed">
          <span className="font-bold text-foxdark">{line.speaker}:</span>{' '}
          <span className="text-slate/90">&ldquo;{line.text}&rdquo;</span>
        </p>
      );
    default:
    case 'text':
      return (
        <p className="text-slate/90 text-base sm:text-lg leading-relaxed text-center">
          &ldquo;{line.text}&rdquo;
        </p>
      );
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
