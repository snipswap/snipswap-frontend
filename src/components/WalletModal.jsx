import React, { useState, useEffect } from 'react';
import walletService from '../services/walletService';

const WalletModal = ({ isOpen, onClose, onConnect }) => {
  const [availableWallets, setAvailableWallets] = useState([]);
  const [connecting, setConnecting] = useState(false);
  const [selectedWallet, setSelectedWallet] = useState(null);
  const [error, setError] = useState('');
  const [step, setStep] = useState('select'); // 'select', 'connecting', 'success'

  useEffect(() => {
    if (isOpen) {
      loadAvailableWallets();
    }
  }, [isOpen]);

  const loadAvailableWallets = async () => {
    try {
      await walletService.checkWalletAvailability();
      const wallets = walletService.getAvailableWallets();
      setAvailableWallets(wallets);
      
      if (wallets.length === 0) {
        setError('No compatible wallets found. Please install Keplr, Leap, or Cosmostation.');
      }
    } catch (error) {
      setError('Failed to check wallet availability');
    }
  };

  const handleWalletConnect = async (walletType) => {
    setConnecting(true);
    setSelectedWallet(walletType);
    setError('');
    setStep('connecting');

    try {
      const result = await walletService.connectWallet(walletType, 'cosmoshub-4');
      
      if (result.success) {
        setStep('success');
        setTimeout(() => {
          onConnect(result);
          onClose();
          resetModal();
        }, 2000);
      }
    } catch (error) {
      console.error('Wallet connection failed:', error);
      setError(error.message || 'Failed to connect wallet');
      setStep('select');
    } finally {
      setConnecting(false);
    }
  };

  const resetModal = () => {
    setStep('select');
    setSelectedWallet(null);
    setError('');
    setConnecting(false);
  };

  const handleClose = () => {
    if (!connecting) {
      onClose();
      resetModal();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-[#1E2329] rounded-lg p-6 w-96 max-w-[90vw]">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-white">Connect Wallet</h2>
          {!connecting && (
            <button
              onClick={handleClose}
              className="text-[#848E9C] hover:text-white transition-colors"
            >
              ✕
            </button>
          )}
        </div>

        {/* Content */}
        {step === 'select' && (
          <div>
            <p className="text-[#848E9C] text-sm mb-4">
              Choose your preferred wallet to connect to SnipSwap DEX
            </p>

            {error && (
              <div className="bg-[#F6465D] bg-opacity-20 border border-[#F6465D] rounded p-3 mb-4">
                <p className="text-[#F6465D] text-sm">{error}</p>
              </div>
            )}

            <div className="space-y-3">
              {availableWallets.map((wallet) => (
                <button
                  key={wallet.key}
                  onClick={() => handleWalletConnect(wallet.key)}
                  className="w-full flex items-center justify-between p-4 bg-[#2B3139] hover:bg-[#3C4043] rounded-lg transition-colors"
                >
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl">{wallet.icon}</span>
                    <div className="text-left">
                      <div className="text-white font-semibold">{wallet.name}</div>
                      <div className="text-[#848E9C] text-sm">
                        {wallet.key === 'keplr' && 'Most popular Cosmos wallet'}
                        {wallet.key === 'leap' && 'Fast and secure'}
                        {wallet.key === 'cosmostation' && 'Mobile-first experience'}
                      </div>
                    </div>
                  </div>
                  <div className="text-[#848E9C]">→</div>
                </button>
              ))}
            </div>

            {availableWallets.length === 0 && !error && (
              <div className="text-center py-8">
                <div className="text-4xl mb-4">🔍</div>
                <p className="text-[#848E9C]">Checking for available wallets...</p>
              </div>
            )}

            <div className="mt-6 p-4 bg-[#0B0E11] rounded-lg">
              <h3 className="text-white font-semibold mb-2">Don't have a wallet?</h3>
              <p className="text-[#848E9C] text-sm mb-3">
                Install one of these browser extensions to get started:
              </p>
              <div className="flex space-x-2">
                <a
                  href="https://wallet.keplr.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 bg-[#2B3139] hover:bg-[#3C4043] rounded px-3 py-2 text-center text-sm text-white transition-colors"
                >
                  Get Keplr
                </a>
                <a
                  href="https://www.leapwallet.io/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 bg-[#2B3139] hover:bg-[#3C4043] rounded px-3 py-2 text-center text-sm text-white transition-colors"
                >
                  Get Leap
                </a>
              </div>
            </div>
          </div>
        )}

        {step === 'connecting' && (
          <div className="text-center py-8">
            <div className="animate-spin w-12 h-12 border-4 border-[#F0B90B] border-t-transparent rounded-full mx-auto mb-4"></div>
            <h3 className="text-white font-semibold mb-2">Connecting to {selectedWallet}...</h3>
            <p className="text-[#848E9C] text-sm">
              Please approve the connection in your wallet extension
            </p>
          </div>
        )}

        {step === 'success' && (
          <div className="text-center py-8">
            <div className="w-12 h-12 bg-[#0ECB81] rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-white text-xl">✓</span>
            </div>
            <h3 className="text-white font-semibold mb-2">Successfully Connected!</h3>
            <p className="text-[#848E9C] text-sm">
              Your wallet is now connected to SnipSwap DEX
            </p>
          </div>
        )}

        {/* Privacy Notice */}
        <div className="mt-6 p-3 bg-[#F0B90B] bg-opacity-10 border border-[#F0B90B] rounded">
          <div className="flex items-start space-x-2">
            <span className="text-[#F0B90B] text-sm">🔒</span>
            <div>
              <p className="text-[#F0B90B] text-sm font-semibold">Privacy-First Trading</p>
              <p className="text-[#F0B90B] text-xs mt-1">
                SnipSwap supports private trading via Secret Network. Your trading activity can be kept confidential.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WalletModal;
