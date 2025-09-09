import React, { useState, useEffect } from 'react';
import walletService from '../services/walletService';

function WalletConnectModal({ isOpen, onClose, onConnect }) {
  const [availableWallets, setAvailableWallets] = useState([]);
  const [connecting, setConnecting] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (isOpen) {
      setAvailableWallets(walletService.getAvailableWallets());
      setError(null);
      setConnecting(null);
    }
  }, [isOpen]);

  const handleConnect = async (walletType) => {
    setConnecting(walletType);
    setError(null);

    try {
      const connectionInfo = await walletService.connect(walletType);
      onConnect(connectionInfo);
      onClose();
    } catch (err) {
      console.error('Wallet connection failed:', err);
      setError(err.message);
    } finally {
      setConnecting(null);
    }
  };

  const handleInstallWallet = (walletType) => {
    const installUrls = {
      keplr: 'https://chrome.google.com/webstore/detail/keplr/dmkamcknogkgcdfhhbddcghachkejeap',
      metamask: 'https://metamask.io/download/',
      cosmostation: 'https://chrome.google.com/webstore/detail/cosmostation/fpkhgmpbidmiogeglndfbkegfdlnajnf',
      leap: 'https://chrome.google.com/webstore/detail/leap-cosmos-wallet/fcfcfllfndlomdhbehjjcoimbgofdncg'
    };
    
    window.open(installUrls[walletType], '_blank');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8 max-w-md w-full mx-4 shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-white">Connect Wallet</h2>
          <button
            onClick={onClose}
            className="text-white/60 hover:text-white transition-colors p-2 hover:bg-white/10 rounded-full"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Description */}
        <p className="text-white/70 text-sm mb-6">
          Connect your wallet to start trading on SnipSwap with privacy and MEV protection.
        </p>

        {/* Error Message */}
        {error && (
          <div className="bg-red-500/20 border border-red-500/30 text-red-400 rounded-xl p-4 mb-6">
            <div className="flex items-center gap-2">
              <span className="text-lg">⚠️</span>
              <span className="text-sm">{error}</span>
            </div>
          </div>
        )}

        {/* Wallet Options */}
        <div className="space-y-3">
          {availableWallets.map((wallet) => (
            <button
              key={wallet.key}
              onClick={() => handleConnect(wallet.key)}
              disabled={connecting === wallet.key}
              className="w-full flex items-center gap-4 p-4 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 rounded-xl transition-all group disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <div className="text-3xl">{wallet.icon}</div>
              <div className="flex-1 text-left">
                <div className="text-white font-semibold">{wallet.name}</div>
                <div className="text-white/60 text-sm">{wallet.description}</div>
              </div>
              {connecting === wallet.key ? (
                <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <div className="text-white/40 group-hover:text-white/60 transition-colors">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              )}
            </button>
          ))}
        </div>

        {/* Install Wallets Section */}
        {availableWallets.length === 0 && (
          <div className="text-center py-6">
            <div className="text-white/60 mb-4">No wallets detected</div>
            <div className="space-y-2">
              {['keplr', 'metamask', 'cosmostation', 'leap'].map((walletType) => {
                const walletInfo = walletService.availableWallets[walletType];
                return (
                  <button
                    key={walletType}
                    onClick={() => handleInstallWallet(walletType)}
                    className="w-full flex items-center gap-3 p-3 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 rounded-lg transition-all text-left"
                  >
                    <span className="text-2xl">{walletInfo.icon}</span>
                    <div className="flex-1">
                      <div className="text-white text-sm font-medium">Install {walletInfo.name}</div>
                      <div className="text-white/50 text-xs">{walletInfo.description}</div>
                    </div>
                    <div className="text-white/40">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="mt-6 pt-6 border-t border-white/10">
          <div className="flex items-center gap-2 text-white/50 text-xs">
            <div className="w-2 h-2 bg-green-400 rounded-full"></div>
            <span>Secured by Secret Network • MEV Protected</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default WalletConnectModal;

