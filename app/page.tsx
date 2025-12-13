'use client';

import { InfoSection } from '@/components/InfoSection';
import { BuyTokensCard } from '@/components/BuyTokensCard';
import { WalletButton } from '@/components/WalletButton';

export default function Home() {
  return (
    <div className="min-h-screen bg-dark-bg">
      <header className="p-6 flex justify-end">
        <WalletButton />
      </header>
      
      <main className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row gap-8">
          <InfoSection />
          <BuyTokensCard />
        </div>
      </main>

      <button
        className="fixed bottom-8 right-8 w-12 h-12 bg-gradient-purple-green rounded-full flex items-center justify-center text-white hover:opacity-90 transition-opacity shadow-lg"
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
        </svg>
      </button>
    </div>
  );
}

