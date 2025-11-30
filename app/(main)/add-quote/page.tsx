'use client';

import { QuoteCardContent } from '@/components/quote-card';
import { DialogueBlock, ParsedQuote, serializeQuote } from '@/lib/quoteParser';
import { useState } from 'react';
import { saveQuoteToDB } from './actions';

export default function AddQuotePage() {
  const [draftQuote, setDraftQuote] = useState<ParsedQuote>({ lines: [] });

  const removeIndex = (index: number) => {
    setDraftQuote((prev) => {
      const newLines = [...prev.lines];
      newLines.splice(index, 1);
      return { lines: newLines };
    });
  };

  const saveQuote = async () => {
    const serializedQuote = serializeQuote(draftQuote);

    const resp = await saveQuoteToDB(serializedQuote);

    alert(resp);
  };

  return (
    <div className="bg-foxdarkbg min-h-screen flex flex-col items-center gap-20 text-slate md:flex-row md:items-start md:justify-center">
      <div className="mt-10 flex flex-col gap-4 items-center md:flex-row md:items-start">
        <div className="flex flex-col gap-2 justify-center items-center bg-foxbg p-2 rounded-md ">
          <h2 className="text-xl font-semibold">Quote Blocks</h2>
          <AddButton
            onClick={() => {
              setDraftQuote({ lines: [...draftQuote.lines, { type: 'text', text: '' }] });
            }}>
            Add Direct Quote Entry
          </AddButton>
          <AddButton
            onClick={() => {
              setDraftQuote({ lines: [...draftQuote.lines, { type: 'context', text: '' }] });
            }}>
            Add Context Entry
          </AddButton>
          <AddButton
            onClick={() => {
              setDraftQuote({ lines: [...draftQuote.lines, { type: 'dialogue', speaker: '', text: '' }] });
            }}>
            Add Dialogue Entry
          </AddButton>
        </div>
        {/* Stack component for draft quote lines */}
        <div className="flex flex-col gap-2 bg-foxbg p-4 rounded-md items-center w-full min-h-[200px] min-w-[255px]">
          <h2 className="text-xl font-semibold">Quote Editor</h2>

          {draftQuote.lines.map((line, i) => {
            switch (line.type) {
              case 'dialogue':
                return (
                  <div key={i} className="flex flex-row gap-2 items-center justify-center bg-slate/50 rounded-md p-2">
                    <div className="flex flex-col gap-2">
                      <EditorInput
                        placeholder="Enter Speaker Name..."
                        value={(draftQuote.lines[i] as DialogueBlock).speaker}
                        onChange={(e) => {
                          setDraftQuote((prev) => {
                            const newLines = [...prev.lines];
                            newLines[i] = { type: 'dialogue', speaker: e.target.value, text: prev.lines[i].text };
                            return { lines: newLines };
                          });
                        }}
                      />
                      <EditorInput
                        placeholder="Enter Dialogue..."
                        value={draftQuote.lines[i].text}
                        onChange={(e) => {
                          setDraftQuote((prev) => {
                            const newLines = [...prev.lines];
                            const speaker = (newLines[i] as DialogueBlock).speaker || '<Unknown Speaker>';
                            newLines[i] = { type: 'dialogue', speaker: speaker, text: e.target.value };
                            return { lines: newLines };
                          });
                        }}
                      />
                    </div>

                    <RemoveButton onClick={() => removeIndex(i)} />
                  </div>
                );
              case 'context':
                return (
                  <div key={i} className="flex flex-row gap-2 items-center border bg-slate/50 rounded-md p-2">
                    <EditorInput
                      value={draftQuote.lines[i].text}
                      onChange={(e) => {
                        setDraftQuote((prev) => {
                          const newLines = [...prev.lines];
                          newLines[i] = { type: 'context', text: e.target.value };
                          return { lines: newLines };
                        });
                      }}
                      placeholder="Enter context entry..."
                    />
                    <RemoveButton onClick={() => removeIndex(i)} />
                  </div>
                );
              default:
              case 'text':
                return (
                  <div key={i} className="flex flex-row gap-2 items-center bg-slate/50 rounded-md p-2">
                    <EditorInput
                      value={draftQuote.lines[i].text}
                      onChange={(e) => {
                        setDraftQuote((prev) => {
                          const newLines = [...prev.lines];
                          newLines[i] = { type: 'text', text: e.target.value };
                          return { lines: newLines };
                        });
                      }}
                      placeholder="Enter direct quote entry..."
                    />
                    <RemoveButton onClick={() => removeIndex(i)} />
                  </div>
                );
            }
          })}
        </div>
        <div className="flex flex-col items-center justify-center gap-2 bg-foxbg rounded-md p-4">
          <h2 className="text-xl font-semibold">Quote Preview:</h2>

          <div className="flex flex-col gap-2 min-w-[225px] lg:w-[300px] min-h-[100px] ">
            {draftQuote.lines.map((line, index) => (
              <QuoteCardContent key={line.text + index} line={line} />
            ))}
          </div>

          <button className="bg-green-500 text-white text-semibold text-2xl px-4 py-2 rounded-md " onClick={saveQuote}>
            Save Quote
          </button>
        </div>
      </div>
    </div>
  );
}

type InputProps = {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
};
function EditorInput({ value, onChange, placeholder }: InputProps) {
  return <input value={value} onChange={onChange} placeholder={placeholder ?? ''} className="py-2 rounded-md  px-2" />;
}

type RemoveButtonProps = {
  onClick: () => void;
};
function RemoveButton({ onClick }: RemoveButtonProps) {
  return (
    <button
      type="button"
      className="bg-red-400 text-white px-2 pb-1 pt-[2px] rounded-md text-2xl cursor-pointer hover:opacity-80 h-fit text-center"
      onClick={onClick}>
      x
    </button>
  );
}

type AddButtonProps = {
  onClick: () => void;
  children: React.ReactNode;
};
function AddButton({ onClick, children }: AddButtonProps) {
  return (
    <button
      type="button"
      className="bg-foxdark text-white px-2 py-2 rounded-md text-2xl cursor-pointer hover:opacity-80 h-fit w-full md:w-[200px] md:text-xl"
      onClick={onClick}>
      {children}
    </button>
  );
}
