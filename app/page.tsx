'use client';

import React, { useState } from 'react';
import {
  ConnectWallet,
  ConnectWalletText,
  Wallet,
  WalletDropdown,
  WalletDropdownLink,
  WalletDropdownDisconnect,
} from '@alec-chen/onchainkit/wallet';
import {
  Address,
  Avatar,
  Name,
  Identity,
  EthBalance,
} from '@alec-chen/onchainkit/identity';
import { Pay, PayButton, PayStatus } from '@alec-chen/onchainkit/pay';
import ArrowSvg from './svg/ArrowSvg';
import ImageSvg from './svg/Image';
import OnchainkitSvg from './svg/OnchainKit';

export default function App() {
  const [productId, setProductId] = useState(
    '842e3c7d-1b7a-480e-9a5b-dabc52bae448'
  );

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <header className="pt-4 pr-4">
        <div className="flex justify-end">
          <div className="wallet-container">
            <Wallet>
              <ConnectWallet className="bg-blue-800 hover:bg-blue-700">
                <ConnectWalletText className="text-white">
                  Connect
                </ConnectWalletText>
                <Avatar className="h-6 w-6" />
                <Name className="text-white" />
              </ConnectWallet>
              <WalletDropdown>
                <Identity className="px-4 pt-3 pb-2" hasCopyAddressOnClick>
                  <Avatar />
                  <Name />
                  <Address />
                  <EthBalance />
                </Identity>
                <WalletDropdownLink
                  icon="wallet"
                  href="https://keys.coinbase.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Wallet
                </WalletDropdownLink>
                <WalletDropdownDisconnect />
              </WalletDropdown>
            </Wallet>
          </div>
        </div>
      </header>

      <main className="flex-grow flex items-center justify-center">
        <div className="max-w-4xl w-full p-4">
          <div className="w-1/2 mx-auto mb-6">
            <ImageSvg />
          </div>
          <div className="flex justify-center mb-6">
            <OnchainkitSvg className="text-blue-600" />
          </div>
          <div className="mb-4">
            <label
              htmlFor="productId"
              className="block text-sm font-medium text-gray-700"
            >
              Product ID:
            </label>
            <input
              type="text"
              id="productId"
              value={productId}
              onChange={(e) => setProductId(e.target.value)}
              className="w-full px-3 py-2 text-gray-700 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
            />
          </div>
          <Pay key={productId} productId={productId} isSponsored>
            <PayButton coinbaseBranded />
            <PayStatus />
          </Pay>
        </div>
      </main>
    </div>
  );
}
