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

export type Quote = {
  id: number;
  quote: string;
  quoteHash: string;
  uploadedAt: Date;

  uploadedById: string;
  uploadedBy?: NeonAuthUser | null;
};

export type PendingQuote = {
  quote: string;
  id: number;
  ipAddress: string;
  uploadedAt: Date;
  quoteHash: string;
};

export type StackPermission = 'admin' | 'readonly';
