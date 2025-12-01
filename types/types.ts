import { JsonValue } from '@prisma/client/runtime/library';

export type NeonAuthUser = {
  id: string;
  raw_json: JsonValue;
  name: string | null;
  email: string | null;
  created_at: Date | null;
  updated_at: Date | null;
  deleted_at: Date | null;
};

export type QuoteEntity = {
  id: number;
  quote: string;
  quoteHash: string;
  uploadedAt: Date;

  uploadedById: string;
  uploadedBy?: NeonAuthUser | null;
};

// DTO object for UI
export type QuoteWithReactions = {
  id: number;
  quote: string;
  uploadedAt: Date;
  uploadedByName: string | null;
  reactions: {
    emoji: string;
    count: number;
    clientReacted?: boolean | undefined; // If the client reacted with this emoji, notify the UI to highlight it
  }[];
  canReact: boolean;
};

export type PendingQuote = {
  quote: string;
  id: number;
  ipAddress: string;
  uploadedAt: Date;
  quoteHash: string;
};

export type Reaction = {
  id: number;
  quoteId: number;
  emoji: string;
  clientToken: string | null;
  userId: string | null;
  ipAddress: string;
  createdAt: Date;
};

export type StackPermission = 'admin' | 'readonly';
