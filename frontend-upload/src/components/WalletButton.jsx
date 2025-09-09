import React, { useState, useEffect } from 'react';
import walletService from '../services/walletService';
import WalletConnectModal from './WalletConnectModal';

function WalletButton() {
  const [walletInfo, setWalletInfo] = useState(walletService.getConnectionInfo());
  const [showModal, setShowModal] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    const unsubscribe = walletService.subscribe((info) => {
      setWalletInfo(info);
    });

    return unsubscribe;
  }, []);

  const handleConnect = (connectionInfo) => {
    console.log('Wallet connected:', connectionInfo);
    setShowModal(false);
  };

  const handleDisconnect = () => {
    walletService.disconnect();
    setShowDropdown(false);
  };

  const copyAddress = () => {
    if (walletInfo.address) {
      navigator.clipboard.writeText(walletInfo.address);
      // You could add a toast notification here
    }
  };

  if (!walletInfo.isConnected) {
    return (
      <>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
        >
          <div className="w-5 h-5">
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          </div>
          <span>Connect Wallet</span>
        </button>

        <WalletConnectModal
          isOpen={showModal}
          onClose={() => setShowModal(false)}
          onConnect={handleConnect}
        />
      </>
    );
  }

  return (
    <div className="relative">
      <button
        onClick={() => setShowDropdown(!showDropdown)}
        className="flex items-center gap-3 px-4 py-3 bg-white/10 backdrop-blur-lg border border-white/20 hover:border-white/30 text-white rounded-xl transition-all duration-200 hover:bg-white/15"
      >
        {/* Wallet Icon */}
        <div className="text-lg">
          {walletService.getWalletIcon(walletInfo.walletType)}
        </div>

        {/* Wallet Info */}
        <div className="flex flex-col items-start">
          <div className="text-sm font-medium">
            {walletInfo.shortAddress}
          </div>
          <div className="text-xs text-white/60">
            {walletService.formatBalance(walletInfo.balance)} SCRT
          </div>
        </div>

        {/* Connection Status */}
        <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>

        {/* Dropdown Arrow */}
        <div className={`transition-transform duration-200 ${showDropdown ? 'rotate-180' : ''}`}>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </button>

      {/* Dropdown Menu */}
      {showDropdown && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 z-10"
            onClick={() => setShowDropdown(false)}
          />
          
          {/* Dropdown Content */}
          <div className="absolute right-0 top-full mt-2 w-80 bg-white/10 backdrop-blur-xl border border-white/20 rounded-xl shadow-2xl z-20">
            {/* Header */}
            <div className="p-4 border-b border-white/10">
              <div className="flex items-center gap-3">
                <div className="text-2xl">
                  {walletService.getWalletIcon(walletInfo.walletType)}
                </div>
                <div>
                  <div className="text-white font-semibold capitalize">
                    {walletInfo.walletType}
                  </div>
                  <div className="text-white/60 text-sm">
                    {walletService.getChainName(walletInfo.chainId)}
                  </div>
                </div>
              </div>
            </div>

            {/* Account Info */}
            <div className="p-4 space-y-3">
              {/* Address */}
              <div>
                <div className="text-white/60 text-xs mb-1">Address</div>
                <button
                  onClick={copyAddress}
                  className="flex items-center gap-2 w-full p-2 bg-white/5 hover:bg-white/10 rounded-lg transition-colors group"
                >
                  <span className="text-white text-sm font-mono">
                    {walletInfo.address}
                  </span>
                  <div className="text-white/40 group-hover:text-white/60">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                  </div>
                </button>
              </div>

              {/* Balance */}
              <div>
                <div className="text-white/60 text-xs mb-1">Balance</div>
                <div className="text-white text-lg font-semibold">
                  {walletService.formatBalance(walletInfo.balance, 6)} SCRT
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="p-4 border-t border-white/10 space-y-2">
              <button
                onClick={() => {
                  // Add view on explorer functionality
                  setShowDropdown(false);
                }}
                className="w-full flex items-center gap-3 p-3 text-white/80 hover:text-white hover:bg-white/5 rounded-lg transition-all"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
                <span>View on Explorer</span>
              </button>

              <button
                onClick={handleDisconnect}
                className="w-full flex items-center gap-3 p-3 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg transition-all"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
                <span>Disconnect</span>
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default WalletButton;

