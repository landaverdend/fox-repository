import ms from 'ms';
import { createHash } from 'crypto';

export const timeAgo = (timestamp: Date, timeOnly?: boolean): string => {
  if (!timestamp) return 'never';
  return `${ms(Date.now() - new Date(timestamp).getTime())}${timeOnly ? '' : ' ago'}`;
};

export const hashString = (str: string): string => {
  return createHash('sha256').update(str).digest('hex');
};
