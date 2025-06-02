// src/lib/StoreProvider.tsx
'use client';

import { PropsWithChildren } from 'react';
import { Provider }        from 'react-redux';
import { store }           from './store';

export default function StoreProvider({ children }: PropsWithChildren<{}>) {
  return <Provider store={store}>{children}</Provider>;
}
