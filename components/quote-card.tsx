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

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`${className} relative bg-gradient-to-br from-foxbg to-foxbg/80 p-5 rounded-xl flex flex-col justify-between items-center gap-4
        shadow-md hover:shadow-lg border border-foxlight/30 transition-all duration-200 sm:hover:scale-[1.02] sm:hover:border-fox/40`}>

      {/* Quote content */}
      <div
        className={`flex flex-col gap-2 flex-1 w-full ${linesLength > 1 ? 'justify-start' : 'justify-center'} ${
          hasDialogue ? 'items-start' : 'items-center'
        }`}>
        {parsedQuote.lines.map((line) => (
          <QuoteCardContent key={line.text} line={line} />
        ))}
      </div>

      {/* Footer: Date and Reactions */}
      <div className="w-full pt-3 border-t border-foxlight/30">
        {/* Date posted */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-1.5 text-slate/60 text-xs">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <span>{formatDate(quote.uploadedAt)}</span>
          </div>
          {quote.uploadedByName && (
            <div className="flex items-center gap-1.5 text-slate/60 text-xs">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              <span>{quote.uploadedByName}</span>
            </div>
          )}
        </div>

        {/* Reactions drawer */}
        <div className="flex flex-row gap-1.5 flex-wrap items-center justify-center">
          {quote.reactions.map((reaction) => (
            <div
              key={reaction.emoji}
              className={`flex flex-row rounded-full items-center gap-1 px-2.5 py-0.5 select-none cursor-pointer transition-all duration-150 ${
                reaction.clientReacted
                  ? 'bg-fox/20 border-fox border text-foxdark shadow-sm'
                  : 'bg-foxdark/90 hover:bg-foxdark border border-foxdark/80 text-white hover:scale-105'
              }`}
              onClick={() => handleEmojiDrawerClick(reaction)}>
              <span className="text-lg">{reaction.emoji}</span>
              <span className="text-sm font-medium">{reaction.count}</span>
            </div>
          ))}

          {quote.canReact && (
            <Popover className="hidden sm:block">
              <PopoverButton className={`bg-foxdark/90 border border-foxdark/80 text-white hover:bg-foxdark hover:scale-105 rounded-full w-7 h-7 flex items-center justify-center text-sm font-medium transition-all duration-150 ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
                +
              </PopoverButton>
              <PopoverPanel anchor="top start">
                <EmojiPicker
                  onEmojiClick={(emoji) => {
                    handleReactionClick(emoji.emoji);
                  }}
                  className=""
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
      return <p className="text-slate text-sm sm:text-md italic self-center">({line.text})</p>;
    case 'dialogue':
      return (
        <p className="text-slate text-md sm:text-lg">
          <span className="font-bold">{line.speaker}:</span> &quot;{line.text}&quot;
        </p>
      );
    default:
    case 'text':
      return <p className="text-slate text-md sm:text-lg">&quot;{line.text}&quot;</p>;
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
