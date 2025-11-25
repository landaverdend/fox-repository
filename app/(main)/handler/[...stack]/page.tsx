'use client';

import { StackHandler } from '@stackframe/stack';
import { Suspense } from 'react';

export default function Handler() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <StackHandler fullPage={true} />
    </Suspense>
  );
}
