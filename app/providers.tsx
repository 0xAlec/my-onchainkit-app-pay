'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { base } from 'wagmi/chains';
import { http, cookieStorage, createConfig, createStorage } from 'wagmi';
import { coinbaseWallet } from 'wagmi/connectors';
import { OnchainKitProvider } from '@alec-chen/onchainkit';
import { type ReactNode, useState } from 'react';
import { type State, WagmiProvider } from 'wagmi';

const config = createConfig({
  chains: [base],
  connectors: [
    coinbaseWallet({
      appName: 'My OnchainKit App',
      appLogoUrl: 'https://avatars.githubusercontent.com/u/108554348?v=4',
      preference: process.env.NEXT_PUBLIC_ONCHAINKIT_WALLET_CONFIG as
        | 'smartWalletOnly'
        | 'all',
    }),
  ],
  storage: createStorage({
    storage: cookieStorage,
  }),
  ssr: true,
  transports: {
    [base.id]: http(),
  },
});

export function Providers(props: {
  children: ReactNode;
  initialState?: State;
}) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <WagmiProvider config={config} initialState={props.initialState}>
      <QueryClientProvider client={queryClient}>
        <OnchainKitProvider
          apiKey={process.env.NEXT_PUBLIC_ONCHAINKIT_CDP_KEY}
          config={{
            paymaster:
              'https://api.developer.coinbase.com/rpc/v1/base/Ksweqq69clyFxJOY_TUXmpd7rt-wBhQ-',
          }}
          chain={base}
        >
          {props.children}
        </OnchainKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
