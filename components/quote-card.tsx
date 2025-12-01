'use client';

import { ParsedQuote, ParsedQuoteLine, parseQuote } from '@/lib/quoteParser';
import { QuoteWithReactions } from '@/types/types';
import { Popover, PopoverButton, PopoverPanel } from '@headlessui/react';
import EmojiPicker from 'emoji-picker-react';
import { useClientToken } from './client-token-provider';
import { addReaction, removeReaction } from '@/app/(main)/actions';
import { useState } from 'react';

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
      className={`${className} relative bg-foxbg p-4 rounded-md flex flex-col justify-between items-center gap-5 hover:bg-foxlight`}>
      <div
        className={`flex flex-col gap-2  ${linesLength > 1 ? 'justify-start' : 'justify-center'} ${
          hasDialogue ? 'items-start' : 'items-center'
        }`}>
        {parsedQuote.lines.map((line) => (
          <QuoteCardContent key={line.text} line={line} />
        ))}
      </div>

      {/* Drawer of reactions */}
      <div className="flex flex-row gap-1 flex-wrap items-center justify-center">
        {quote.reactions.map((reaction) => (
          <div
            key={reaction.emoji}
            className={`flex flex-row rounded-md items-center gap-1 px-2 select-none cursor-pointer text-white ${
              reaction.clientReacted
                ? 'bg-[#e2e3f9] border-[#5761eb] border text-[#4450b9]'
                : 'bg-foxdark hover:bg-foxdark/80 border border-foxdark'
            }`}
            onClick={() => handleEmojiDrawerClick(reaction)}>
            <span className="text-xl">{reaction.emoji}</span>
            <span className="text-semibold">{reaction.count}</span>
          </div>
        ))}

        {isHovered && (
          <Popover className="hidden sm:block">
            <PopoverButton className="bg-foxdark border border-foxdark text-white hover:bg-foxdark/80 rounded-md px-2 text-sm">
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

      {/* Mobile Emoji Picker Icon */}
      {quote.canReact && (
        <Popover className="sm:hidden">
          <PopoverButton className="absolute bottom-[-12px] left-[5px] px-2 pb-[1px] bg-foxlight/80 border border-foxdark text-white rounded-full text-sm select-none cursor-pointer hover:bg-foxlight/60">
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
