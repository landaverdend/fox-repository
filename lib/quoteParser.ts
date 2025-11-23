export type ContextBlock = {
  type: 'context';
  text: string;
};

export type DialogueBlock = {
  type: 'dialogue';
  speaker: string;
  text: string;
};

export type TextBlock = {
  type: 'text';
  text: string;
};

export type ParsedQuoteLine = ContextBlock | DialogueBlock | TextBlock;

export type ParsedQuote = {
  lines: ParsedQuoteLine[];
};


const contextRegex = /<context>(.*?)<\/context>/g;
const dialogueRegex = /<([^>]+)>([^<]+)<\/([^>]+)>/g;


/**
 * Parse a quote into a structured format
 * @param quote 
 * @returns 
 */
export default function parseQuote(quote: string): ParsedQuote {

  const lines: ParsedQuoteLine[] = [];

  // Go through from left to right, and build up the lines array.


  return {
    lines: [],
  };
}
