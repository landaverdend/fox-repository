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
    <Popover className="self-center flex flex-col ">
      <PopoverButton className="bg-fox text-white text-semibold text-2xl px-4 py-2 rounded-md hover:bg-foxdark/80 select-none cursor-pointer">
        Donate <span className="text-2xl">₿</span>{' '}
      </PopoverButton>
      <PopoverPanel
        className="self-center flex flex-col items-center justify-center gap-2 bg-gray-100 border border-foxdark p-4 rounded-md"
        anchor={{ to: 'top', gap: 10 }}>
        <QRCodeSVG value={DONATE_ADDRESS} size={240} level="H" className="" />
        <span className="flex items-center justify-center gap-1 text-xs text-center sm:text-md">
          <span className="bg-foxlight p-1 rounded-md">{DONATE_ADDRESS}</span>
          {isCopied ? (
            <Check className="size-4 text-green-500 cursor-pointer hover:text-green-600" />
          ) : (
            <Copy
              className="size-4 text-black cursor-pointer hover:text-orange-300"
              onClick={() => copyToClipboard(DONATE_ADDRESS)}
            />
          )}
        </span>
      </PopoverPanel>
    </Popover>
  );
}
