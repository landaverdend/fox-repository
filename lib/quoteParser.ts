'use client';

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

const CONTEXT_TAG = '<context>';
const CONTEXT_TAG_END = '</context>';

const SPEAKER_TAG_END = '</speaker>';

/**
 * Parse a quote into a structured format
 * @param quote
 * @returns
 */
export default function parseQuote(quote: string): ParsedQuote {
  const lines: ParsedQuoteLine[] = [];
  let i = 0;

  while (i < quote.length) {
    // Skip all whitespace
    while (i < quote.length && /\s/.test(quote[i])) i++;
    if (i >= quote.length) break;

    // Check for context tag. Grab everything between start and end.
    if (quote.substring(i).startsWith(CONTEXT_TAG)) {
      const endIdx = quote.indexOf(CONTEXT_TAG_END, i);

      if (endIdx === -1) {
        throw new Error('Context tag not closed');
      }

      const text = quote.substring(i + CONTEXT_TAG.length, endIdx);
      lines.push({ type: 'context', text: text });
      i = endIdx + CONTEXT_TAG_END.length;
      continue;
    }

    // Check for speaker tag.
    const speakerMatch = quote.substring(i).match(/^<speaker\s+name="([^"]*)"\s*>/i);
    if (speakerMatch) {
      const speakerName = speakerMatch[1];
      const tagEnd = i + speakerMatch[0].length; // + <speaker name="...">

      const closeIdx = quote.indexOf(SPEAKER_TAG_END, tagEnd);
      if (closeIdx === -1) {
        throw new Error('Speaker tag not closed');
      }

      const text = quote.substring(tagEnd, closeIdx).trim();
      lines.push({ type: 'dialogue', speaker: speakerName, text: text });
      i = closeIdx + SPEAKER_TAG_END.length;
      continue;
    }

    // Plain text - grab everything up to the next tag.
    const nextTag = quote.indexOf('<', i);
    // We reached the end of the string without finding a tag. Break after this.
    if (nextTag === -1) {
      const text = quote.substring(i).trim();
      if (text) lines.push({ type: 'text', text: text });
      break; // End of string
    }

    // If we're at a '<' that doesn't match our known tags, skip past the entire tag
    if (nextTag === i) {
      // Skip to the closing '>' of this unrecognized tag
      const tagEnd = quote.indexOf('>', i);
      if (tagEnd !== -1) {
        i = tagEnd + 1; // Skip past the '>'
      } else {
        // No closing '>', just skip the '<' and continue (malformed)
        i++;
      }
      continue;
    }

    // More tags to follow - extract text between current position and next tag
    const text = quote.substring(i, nextTag).trim();
    if (text) lines.push({ type: 'text', text: text });
    i = nextTag;
 
  }

  return {
    lines,
  } as ParsedQuote;
}
