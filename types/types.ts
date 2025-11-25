import { JsonValue } from "@prisma/client/runtime/library";

export type NeonAuthUser = {
  id: string;
  role: string | null;
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

  uploadedAt: Date;

  uploadedBy: NeonAuthUser;
};
