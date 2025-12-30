'use client';

import { Popover, PopoverButton, PopoverPanel } from '@headlessui/react';
import { QRCodeSVG } from 'qrcode.react';
import { useState } from 'react';
import { Check, Copy } from 'lucide-react';

const DONATE_ADDRESS = 'bc1qk38q3aa38hrr0sxhnh6k569el3prxlf0mc234r';

export default function DonateButton() {
  const [isCopied, setIsCopied] = useState(false);

  const copyToClipboard = async (text: string) => {
    await navigator.clipboard.writeText(text);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <Popover className="self-center flex flex-col">
      <PopoverButton className="bg-foxbg text-foxdark border-2 border-foxdark font-semibold text-lg px-6 py-3 rounded-xl hover:bg-foxlight/50 shadow-md hover:shadow-lg transition-all duration-200 hover:scale-105 select-none cursor-pointer">
        Donate <span className="text-lg">₿</span>
      </PopoverButton>
      <PopoverPanel
        className="self-center flex flex-col items-center justify-center gap-3 bg-foxbg border-2 border-foxdark/30 p-5 rounded-xl shadow-xl"
        anchor={{ to: 'top', gap: 12 }}>
        <QRCodeSVG value={DONATE_ADDRESS} size={220} level="H" className="rounded-lg" />
        <span className="flex items-center justify-center gap-2 text-xs text-center sm:text-sm">
          <span className="bg-foxdarkbg text-slate/80 px-2 py-1 rounded-lg font-mono text-xs">{DONATE_ADDRESS}</span>
          {isCopied ? (
            <Check className="size-5 text-green-600 cursor-pointer" />
          ) : (
            <Copy
              className="size-5 text-foxdark cursor-pointer hover:text-fox transition-colors"
              onClick={() => copyToClipboard(DONATE_ADDRESS)}
            />
          )}
        </span>
      </PopoverPanel>
    </Popover>
  );
}
