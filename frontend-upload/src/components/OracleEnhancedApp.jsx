import React, { useState, useEffect } from 'react';
import EnhancedOrderForm from './EnhancedOrderForm';
import RealTimePriceChart from './RealTimePriceChart';
import WalletButton from './WalletButton';
import oracleService from '../services/oracleService';

const SUPPORTED_PAIRS = [
  { symbol: 'BTC', name: 'Bitcoin', icon: '₿' },
  { symbol: 'ETH', name: 'Ethereum', icon: 'Ξ' },
  { symbol: 'ATOM', name: 'Cosmos', icon: '⚛️' },
  { symbol: 'OSMO', name: 'Osmosis', icon: '🌊' },
  { symbol: 'SCRT', name: 'Secret', icon: '🔐' },
  { symbol: 'USDC', name: 'USD Coin', icon: '💵' },
];

function OracleEnhancedApp() {
  const [selectedPair, setSelectedPair] = useState('BTC');
  const [prices, setPrices] = useState({});
  const [oracleStatus, setOracleStatus] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Initialize oracle connection and fetch initial data
  useEffect(() => {
    const initializeOracle = async () => {
      try {
        setLoading(true);
        
        // Check oracle health
        const health = await oracleService.checkHealth();
        setOracleStatus(health);
        
        // Fetch initial prices for all supported pairs
        const symbols = SUPPORTED_PAIRS.map(pair => pair.symbol);
        const initialPrices = await oracleService.getPrices(symbols);
        setPrices(initialPrices);
        
        setError(null);
      } catch (err) {
        console.error('Failed to initialize oracle:', err);
        setError('Failed to connect to price oracle');
      } finally {
        setLoading(false);
      }
    };

    initializeOracle();

    // Subscribe to price updates for all pairs
    const unsubscribe = oracleService.subscribeToMultiple(
      SUPPORTED_PAIRS.map(pair => pair.symbol),
      (symbol, data) => {
        setPrices(prev => ({
          ...prev,
          [symbol]: data
        }));
      }
    );

    return unsubscribe;
  }, []);

  // Periodic health checks
  useEffect(() => {
    const healthCheckInterval = setInterval(async () => {
      try {
        const health = await oracleService.checkHealth();
        setOracleStatus(health);
      } catch (err) {
        console.error('Health check failed:', err);
        setOracleStatus(null);
      }
    }, 60000); // Check every minute

    return () => clearInterval(healthCheckInterval);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-20 h-20 border-4 border-white/20 border-t-blue-500 rounded-full animate-spin mx-auto mb-6"></div>
          <h2 className="text-3xl font-bold text-white mb-3">Initializing SnipSwap Oracle</h2>
          <p className="text-white/70 text-lg">Connecting to real-time price feeds...</p>
          <div className="flex items-center justify-center gap-2 mt-4">
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
            <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse delay-100"></div>
            <div className="w-2 h-2 bg-pink-500 rounded-full animate-pulse delay-200"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Header */}
      <header className="bg-black/30 backdrop-blur-xl border-b border-white/10 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-xl">S</span>
              </div>
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
                  SnipSwap Oracle DEX
                </h1>
                <p className="text-white/70 mt-1 text-sm">
                  Your human-AI collaboration creates wealth you capture
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              {/* Oracle Status */}
              {oracleStatus ? (
                <div className="flex items-center gap-2 bg-green-500/20 backdrop-blur-sm text-green-400 px-4 py-2 rounded-xl border border-green-500/30">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <span className="text-sm font-medium">
                    Oracle Active • {oracleStatus.providers?.filter(p => p.healthy).length || 0} Sources
                  </span>
                </div>
              ) : (
                <div className="flex items-center gap-2 bg-red-500/20 backdrop-blur-sm text-red-400 px-4 py-2 rounded-xl border border-red-500/30">
                  <div className="w-2 h-2 bg-red-400 rounded-full"></div>
                  <span className="text-sm font-medium">Oracle Offline</span>
                </div>
              )}

              {/* Wallet Connect Button */}
              <WalletButton />
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {error && (
          <div className="bg-red-500/20 backdrop-blur-sm border border-red-500/30 text-red-400 rounded-2xl p-6 mb-8">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-red-500/20 rounded-full flex items-center justify-center">
                <span className="text-lg">⚠️</span>
              </div>
              <div>
                <div className="font-semibold">Oracle Connection Error</div>
                <div className="text-sm text-red-300">{error}</div>
              </div>
            </div>
          </div>
        )}

        {/* Price Overview Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 mb-8">
          {SUPPORTED_PAIRS.map(pair => {
            const priceData = prices[pair.symbol];
            const isSelected = selectedPair === pair.symbol;
            
            return (
              <div
                key={pair.symbol}
                onClick={() => setSelectedPair(pair.symbol)}
                className={`group relative bg-white/5 backdrop-blur-xl border rounded-2xl p-5 cursor-pointer transition-all duration-300 hover:bg-white/10 hover:scale-105 hover:shadow-2xl ${
                  isSelected 
                    ? 'border-blue-400/50 bg-blue-500/10 shadow-blue-500/20 shadow-lg' 
                    : 'border-white/10 hover:border-white/20'
                }`}
              >
                {/* Selection Indicator */}
                {isSelected && (
                  <div className="absolute -top-1 -right-1 w-4 h-4 bg-blue-500 rounded-full border-2 border-white"></div>
                )}
                
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-2xl">{pair.icon}</span>
                  <div>
                    <span className="font-bold text-white text-lg">{pair.symbol}</span>
                    <div className="text-white/50 text-xs">{pair.name}</div>
                  </div>
                </div>
                
                {priceData ? (
                  <>
                    <div className="text-xl font-bold text-white mb-2">
                      {oracleService.formatPrice(priceData.price)}
                    </div>
                    <div className={`text-sm font-semibold mb-2 ${
                      priceData.change_24h >= 0 ? 'text-green-400' : 'text-red-400'
                    }`}>
                      {oracleService.formatChange(priceData.change_24h)}
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                      <span className="text-xs text-white/60">
                        {(priceData.confidence * 100).toFixed(1)}% confidence
                      </span>
                    </div>
                  </>
                ) : (
                  <div className="space-y-2">
                    <div className="h-6 bg-white/10 rounded animate-pulse"></div>
                    <div className="h-4 bg-white/10 rounded animate-pulse w-2/3"></div>
                    <div className="h-3 bg-white/10 rounded animate-pulse w-1/2"></div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Main Trading Interface */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Price Chart */}
          <div className="lg:col-span-2">
            <RealTimePriceChart symbol={selectedPair} />
          </div>

          {/* Trading Forms */}
          <div className="space-y-6">
            {/* Buy Form */}
            <EnhancedOrderForm pair={selectedPair} side="buy" />
            
            {/* Sell Form */}
            <EnhancedOrderForm pair={selectedPair} side="sell" />
          </div>
        </div>

        {/* Enhanced Market Stats */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all duration-300">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-blue-500/20 rounded-xl flex items-center justify-center">
                <span className="text-blue-400 text-lg">📊</span>
              </div>
              <h3 className="text-lg font-semibold text-white">Market Overview</h3>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-white/70">Total Pairs:</span>
                <span className="text-white font-medium">{SUPPORTED_PAIRS.length}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-white/70">Active Sources:</span>
                <span className="text-white font-medium">
                  {oracleStatus?.providers?.filter(p => p.healthy).length || 0}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-white/70">Update Frequency:</span>
                <span className="text-white font-medium">30s</span>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-purple-500/10 to-blue-500/10 backdrop-blur-xl border border-purple-500/20 rounded-2xl p-6 hover:from-purple-500/20 hover:to-blue-500/20 transition-all duration-300">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-purple-500/20 rounded-xl flex items-center justify-center">
                <span className="text-purple-400 text-lg">💎</span>
              </div>
              <h3 className="text-lg font-semibold text-white">$SNIP Token</h3>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-white/70">Price:</span>
                <span className="text-white font-medium">$2.34</span>
              </div>
              <div className="flex justify-between">
                <span className="text-white/70">Fee Share:</span>
                <span className="text-green-400 font-medium">0.5%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-white/70">Holders:</span>
                <span className="text-white font-medium">1,247</span>
              </div>
            </div>
          </div>

          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all duration-300">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-green-500/20 rounded-xl flex items-center justify-center">
                <span className="text-green-400 text-lg">📈</span>
              </div>
              <h3 className="text-lg font-semibold text-white">Trading Volume</h3>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-white/70">24h Volume:</span>
                <span className="text-white font-medium">$2.4M</span>
              </div>
              <div className="flex justify-between">
                <span className="text-white/70">Fees Collected:</span>
                <span className="text-white font-medium">$7.2K</span>
              </div>
              <div className="flex justify-between">
                <span className="text-white/70">To SNIP Holders:</span>
                <span className="text-green-400 font-medium">$12K</span>
              </div>
            </div>
          </div>

          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all duration-300">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-emerald-500/20 rounded-xl flex items-center justify-center">
                <span className="text-emerald-400 text-lg">🛡️</span>
              </div>
              <h3 className="text-lg font-semibold text-white">Privacy Features</h3>
            </div>
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <span className="text-green-400">✓</span>
                <span className="text-white/70 text-sm">MEV Protection</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-green-400">✓</span>
                <span className="text-white/70 text-sm">Private Orders</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-green-400">✓</span>
                <span className="text-white/70 text-sm">Secret Network</span>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Footer */}
        <footer className="mt-16 pt-12 border-t border-white/10">
          <div className="bg-gradient-to-r from-purple-500/10 via-blue-500/10 to-purple-500/10 backdrop-blur-xl rounded-3xl p-8 border border-purple-500/20">
            <div className="text-center">
              <h3 className="text-3xl font-bold bg-gradient-to-r from-white via-blue-200 to-purple-200 bg-clip-text text-transparent mb-4">
                🚀 This is where it all comes together
              </h3>
              <p className="text-white/80 text-lg mb-6 max-w-3xl mx-auto">
                A collaboration platform built on the sovereignty stack, where your AI-human partnerships 
                create value that flows to you, not to surveillance systems.
              </p>
              <div className="flex flex-wrap justify-center gap-6 text-sm">
                <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-xl">
                  <span>🔐</span>
                  <span className="text-white/80">Secret Network</span>
                </div>
                <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-xl">
                  <span>🌊</span>
                  <span className="text-white/80">Osmosis</span>
                </div>
                <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-xl">
                  <span>⚛️</span>
                  <span className="text-white/80">Cosmos SDK</span>
                </div>
                <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-xl">
                  <span>🛡️</span>
                  <span className="text-white/80">MEV Protected</span>
                </div>
                <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-xl">
                  <span>💎</span>
                  <span className="text-white/80">$SNIP Rewards</span>
                </div>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default OracleEnhancedApp;

