import React, { useState, useEffect } from 'react';
import EnhancedOrderForm from './EnhancedOrderForm';
import RealTimePriceChart from './RealTimePriceChart';
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
      <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-white/30 border-t-white rounded-full animate-spin mx-auto mb-4"></div>
          <h2 className="text-2xl font-bold text-white mb-2">Initializing SnipSwap Oracle</h2>
          <p className="text-white/70">Connecting to real-time price feeds...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900">
      {/* Header */}
      <header className="bg-black/20 backdrop-blur-lg border-b border-white/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h1 className="text-3xl font-bold text-white">
                SnipSwap Oracle DEX
              </h1>
              <p className="text-white/70 mt-1">
                Your human-AI collaboration creates wealth you capture
              </p>
            </div>
            
            {/* Oracle Status */}
            <div className="flex items-center gap-3">
              {oracleStatus ? (
                <div className="flex items-center gap-2 bg-green-500/20 text-green-400 px-3 py-2 rounded-lg">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <span className="text-sm font-medium">
                    Oracle Active • {oracleStatus.providers?.filter(p => p.healthy).length || 0} Sources
                  </span>
                </div>
              ) : (
                <div className="flex items-center gap-2 bg-red-500/20 text-red-400 px-3 py-2 rounded-lg">
                  <div className="w-2 h-2 bg-red-400 rounded-full"></div>
                  <span className="text-sm font-medium">Oracle Offline</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {error && (
          <div className="bg-red-500/20 border border-red-500/30 text-red-400 rounded-lg p-4 mb-6">
            <div className="flex items-center gap-2">
              <span className="text-lg">⚠️</span>
              <span>{error}</span>
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
                className={`bg-white/10 backdrop-blur-lg border rounded-xl p-4 cursor-pointer transition-all hover:bg-white/20 ${
                  isSelected 
                    ? 'border-blue-400 bg-blue-500/20' 
                    : 'border-white/20'
                }`}
              >
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-lg">{pair.icon}</span>
                  <span className="font-semibold text-white">{pair.symbol}</span>
                </div>
                
                {priceData ? (
                  <>
                    <div className="text-lg font-bold text-white mb-1">
                      {oracleService.formatPrice(priceData.price)}
                    </div>
                    <div className={`text-sm font-medium ${
                      priceData.change_24h >= 0 ? 'text-green-400' : 'text-red-400'
                    }`}>
                      {oracleService.formatChange(priceData.change_24h)}
                    </div>
                    <div className="text-xs text-white/60 mt-1">
                      {(priceData.confidence * 100).toFixed(1)}% confidence
                    </div>
                  </>
                ) : (
                  <div className="text-white/50 text-sm">Loading...</div>
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

        {/* Market Stats */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Market Overview</h3>
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

          <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-white mb-4">$SNIP Token</h3>
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

          <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Trading Volume</h3>
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

          <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Privacy Features</h3>
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

        {/* Footer */}
        <footer className="mt-12 pt-8 border-t border-white/20 text-center">
          <div className="bg-gradient-to-r from-purple-500/20 to-blue-500/20 rounded-xl p-6 border border-purple-500/30">
            <h3 className="text-xl font-bold text-white mb-2">
              🚀 This is where it all comes together
            </h3>
            <p className="text-white/80 mb-4">
              A collaboration platform built on the sovereignty stack, where your AI-human partnerships 
              create value that flows to you, not to surveillance systems.
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm text-white/60">
              <span>🔐 Secret Network</span>
              <span>🌊 Osmosis</span>
              <span>⚛️ Cosmos SDK</span>
              <span>🛡️ MEV Protected</span>
              <span>💎 $SNIP Rewards</span>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default OracleEnhancedApp;

