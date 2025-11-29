'use client';

import { QuoteCardContent } from '@/components/quote-card';
import { ParsedQuote } from '@/lib/quoteParser';
import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/react';
import { useState } from 'react';

export default function AddQuotePage() {
  const [draftQuote, setDraftQuote] = useState<ParsedQuote>({ lines: [] });

  const [directQuote, setDirectQuote] = useState<string>('');
  const [context, setContext] = useState<string>('');

  const [speaker, setSpeaker] = useState<string>('');
  const [dialogueText, setDialogueText] = useState<string>('');

  return (
    <div className="bg-foxdarkbg min-h-screen flex flex-col items-center gap-20 ">
      <div className="mt-10 flex flex-col gap-4 items-center">
        <h1 className="text-2xl font-bold">Quote Builder</h1>

        <div className="flex flex-col gap-2 justify-center items-center">
          <Disclosure>
            <DisclosureButton className="bg-foxdark text-white py-2 px-4 rounded-md hover:bg-foxdark/80">
              Direct Quote Entry
            </DisclosureButton>
            <DisclosurePanel className="flex flex-row bg-foxbg p-4 rounded-md gap-2 items-center">
              <textarea
                className="w-full p-2 rounded-md border border-foxdark"
                placeholder="Enter your quote here"
                value={directQuote}
                onChange={(e) => setDirectQuote(e.target.value)}
              />
              <AddButton
                onClick={() => {
                  if (directQuote.trim() === '') return;
                  setDraftQuote({ lines: [...draftQuote.lines, { type: 'text', text: directQuote.trim() }] });
                  setDirectQuote('');
                }}
                text="+"
              />
            </DisclosurePanel>
          </Disclosure>

          <Disclosure>
            <DisclosureButton className="bg-foxdark text-white py-2 px-4 rounded-md hover:bg-foxdark/80 ">
              Context Entry
            </DisclosureButton>

            <DisclosurePanel className="flex flex-row bg-foxbg p-4 rounded-md gap-2 items-center ">
              <textarea
                className="w-full p-2 rounded-md border border-foxdark"
                placeholder="Enter your context here"
                value={context}
                onChange={(e) => setContext(e.target.value)}
              />
              <AddButton
                onClick={() => {
                  if (context.trim() === '') return;

                  setDraftQuote({ lines: [...draftQuote.lines, { type: 'context', text: context.trim() }] });
                  setContext('');
                }}
                text="+"
              />
            </DisclosurePanel>
          </Disclosure>
          <Disclosure>
            <DisclosureButton className="bg-foxdark text-white py-2 px-4 rounded-md hover:bg-foxdark/80 ">
              Dialogue Entry
            </DisclosureButton>
            <DisclosurePanel className="flex flex-col bg-foxbg p-4 rounded-md gap-2 items-center w-full">
              <input
                type="text"
                className="w-full p-2 rounded-md border border-foxdark"
                placeholder="Speaker Name"
                value={speaker}
                onChange={(e) => setSpeaker(e.target.value)}
              />
              <input
                type="text"
                className="w-full p-2 rounded-md border border-foxdark"
                placeholder="Dialogue Text"
                value={dialogueText}
                onChange={(e) => setDialogueText(e.target.value)}
              />
              <AddButton
                onClick={() => {
                  if (speaker.trim() === '' || dialogueText.trim() === '') return;

                  setDraftQuote({
                    lines: [...draftQuote.lines, { type: 'dialogue', speaker: speaker, text: dialogueText.trim() }],
                  });
                  // clear the rest
                  setSpeaker('');
                  setDialogueText('');
                }}
                text="+"
              />
            </DisclosurePanel>
          </Disclosure>
        </div>
      </div>

      <div className="flex flex-col items-center justify-center gap-2 w-3/4">
        <h2 className="text-xl font-semibold">Quote Preview:</h2>

        <div className="flex flex-col gap-2 bg-foxbg p-4 rounded-md w-[300px]">
          {draftQuote.lines.map((line, index) => (
            <QuoteCardContent key={line.text + index} line={line} />
          ))}
        </div>
      </div>
    </div>
  );
}

type AddButtonProps = {
  onClick: () => void;
  text: string;
};
function AddButton({ onClick, text }: AddButtonProps) {
  return (
    <button
      type="button"
      className="bg-foxdark text-white px-4 py-2 rounded-md hover:bg-foxdark/80 text-2xl cursor-pointer hover:opacity-80 h-fit"
      onClick={onClick}>
      {text}
    </button>
  );
}
