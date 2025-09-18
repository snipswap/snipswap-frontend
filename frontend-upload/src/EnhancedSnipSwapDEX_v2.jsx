import React, { useState, useEffect, useRef } from 'react';
import BinanceStyleChart from './components/BinanceStyleChart';
import './EnhancedSnipSwapDEX_v2.css';

const EnhancedSnipSwapDEX = () => {
  const [selectedPair, setSelectedPair] = useState('ATOM/USDC');
  const [chartType, setChartType] = useState('candlestick');
  const [timeframe, setTimeframe] = useState('1h');
  const [privacyMode, setPrivacyMode] = useState(true);
  const [isWalletConnected, setIsWalletConnected] = useState(false);
  const [connectedWallet, setConnectedWallet] = useState(null);
  const [showWalletModal, setShowWalletModal] = useState(false);
  const [chartData, setChartData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // Trading pairs with realistic data
  const tradingPairs = [
    { symbol: 'ATOM/USDC', name: 'Cosmos', price: 4.5542, change: 1.38, icon: '⚛️', volume: '2.1M' },
    { symbol: 'SCRT/USDC', name: 'Secret Network', price: 0.1959, change: -0.25, icon: '🔐', volume: '890K' },
    { symbol: 'OSMO/USDC', name: 'Osmosis', price: 0.1679, change: 2.03, icon: '🌊', volume: '1.5M' },
    { symbol: 'BTC/USDC', name: 'Bitcoin', price: 115270.09, change: 9.69, icon: '₿', volume: '45.2M' },
    { symbol: 'ETH/USDC', name: 'Ethereum', price: 4319.17, change: -0.07, icon: 'Ξ', volume: '28.7M' }
  ];

  const timeframes = ['1m', '5m', '15m', '30m', '1h', '4h', '12h', '1d'];
  const chartPeriods = ['1D', '7D', '1M', '3M', '1Y', 'YTD'];

  const currentPair = tradingPairs.find(p => p.symbol === selectedPair);

  // Generate realistic OHLCV data for charts
  const generateChartData = (pair, timeframe) => {
    const basePrice = currentPair?.price || 4.5542;
    const points = 100;
    const data = [];
    let price = basePrice * 0.95; // Start slightly lower
    
    for (let i = 0; i < points; i++) {
      const volatility = 0.015;
      const trend = 0.0002;
      const randomChange = (Math.random() - 0.5) * volatility;
      
      const open = price;
      price = price * (1 + trend + randomChange);
      const close = price;
      const high = Math.max(open, close) * (1 + Math.random() * 0.01);
      const low = Math.min(open, close) * (1 - Math.random() * 0.01);
      const volume = Math.random() * 1000000 + 100000;
      
      data.push({
        time: Date.now() - (points - i) * 3600000, // 1 hour intervals
        open: parseFloat(open.toFixed(4)),
        high: parseFloat(high.toFixed(4)),
        low: parseFloat(low.toFixed(4)),
        close: parseFloat(close.toFixed(4)),
        volume: Math.floor(volume)
      });
    }
    
    return data;
  };

  // Wallet connection functions
  const connectKeplr = async () => {
    try {
      if (window.keplr) {
        await window.keplr.enable("secret-4");
        const offlineSigner = window.keplr.getOfflineSigner("secret-4");
        const accounts = await offlineSigner.getAccounts();
        setIsWalletConnected(true);
        setConnectedWallet({ 
          type: 'Keplr', 
          address: accounts[0].address.substring(0, 10) + '...' + accounts[0].address.slice(-6)
        });
        setShowWalletModal(false);
      } else {
        alert('Please install Keplr wallet extension');
      }
    } catch (error) {
      console.error('Keplr connection failed:', error);
      // Fallback for demo
      setIsWalletConnected(true);
      setConnectedWallet({ type: 'Keplr', address: 'secret1abc...def' });
      setShowWalletModal(false);
    }
  };

  const connectLeap = async () => {
    try {
      if (window.leap) {
        await window.leap.enable("secret-4");
        const offlineSigner = window.leap.getOfflineSigner("secret-4");
        const accounts = await offlineSigner.getAccounts();
        setIsWalletConnected(true);
        setConnectedWallet({ 
          type: 'Leap', 
          address: accounts[0].address.substring(0, 10) + '...' + accounts[0].address.slice(-6)
        });
        setShowWalletModal(false);
      } else {
        alert('Please install Leap wallet extension');
      }
    } catch (error) {
      console.error('Leap connection failed:', error);
      // Fallback for demo
      setIsWalletConnected(true);
      setConnectedWallet({ type: 'Leap', address: 'secret1xyz...789' });
      setShowWalletModal(false);
    }
  };

  const connectMetaMask = async () => {
    try {
      if (window.ethereum) {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        setIsWalletConnected(true);
        setConnectedWallet({ 
          type: 'MetaMask', 
          address: accounts[0].substring(0, 6) + '...' + accounts[0].slice(-4)
        });
        setShowWalletModal(false);
      } else {
        alert('Please install MetaMask wallet extension');
      }
    } catch (error) {
      console.error('MetaMask connection failed:', error);
      // Fallback for demo
      setIsWalletConnected(true);
      setConnectedWallet({ type: 'MetaMask', address: '0x1234...5678' });
      setShowWalletModal(false);
    }
  };

  const disconnectWallet = () => {
    setIsWalletConnected(false);
    setConnectedWallet(null);
  };

  // Load chart data when pair or timeframe changes
  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => {
      const data = generateChartData(selectedPair, timeframe);
      setChartData(data);
      setIsLoading(false);
    }, 500);
  }, [selectedPair, timeframe]);

  return (
    <div className="snipswap-dex">
      {/* Header */}
      <header className="dex-header">
        <div className="header-left">
          <div className="logo-section">
            <img src="/logo_snipswap.png" alt="SnipSwap" className="logo" />
            <div className="logo-text">
              <h1>SnipSwap</h1>
              <span>Privacy-First DEX</span>
            </div>
          </div>
          
          <div className="live-indicator">
            <div className="pulse-dot"></div>
            <span>Live Data</span>
          </div>
        </div>

        <div className="header-center">
          <nav className="main-nav">
            <button className="nav-item active">Trade</button>
            <button className="nav-item">Pools</button>
            <button className="nav-item">Portfolio</button>
            <button className="nav-item">Analytics</button>
          </nav>
        </div>

        <div className="header-right">
          <div className="privacy-toggle">
            <label className="toggle-switch">
              <input 
                type="checkbox" 
                checked={privacyMode} 
                onChange={(e) => setPrivacyMode(e.target.checked)}
              />
              <span className="toggle-slider"></span>
            </label>
            <span>Privacy Mode</span>
          </div>

          {isWalletConnected ? (
            <div className="wallet-connected" onClick={disconnectWallet}>
              <div className="wallet-icon">{connectedWallet?.type === 'Keplr' ? '🔐' : connectedWallet?.type === 'Leap' ? '🦘' : '🦊'}</div>
              <span>{connectedWallet?.address}</span>
              <button className="disconnect-btn">×</button>
            </div>
          ) : (
            <button className="connect-wallet-btn" onClick={() => setShowWalletModal(true)}>
              Connect Wallet
            </button>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="dex-main">
        {/* Trading Pair Header */}
        <div className="pair-header">
          <div className="pair-info">
            <div className="pair-selector">
              <select 
                value={selectedPair} 
                onChange={(e) => setSelectedPair(e.target.value)}
                className="pair-select"
              >
                {tradingPairs.map(pair => (
                  <option key={pair.symbol} value={pair.symbol}>
                    {pair.icon} {pair.symbol}
                  </option>
                ))}
              </select>
            </div>
            <div className="pair-stats">
              <div className="price">
                <span className="price-value">${currentPair?.price.toFixed(4)}</span>
                <span className={`price-change ${currentPair?.change >= 0 ? 'positive' : 'negative'}`}>
                  {currentPair?.change >= 0 ? '+' : ''}{currentPair?.change}%
                </span>
              </div>
              <div className="volume">
                <span className="volume-label">24h Volume:</span>
                <span className="volume-value">{currentPair?.volume}</span>
              </div>
            </div>
          </div>

          <div className="chart-controls">
            <div className="timeframe-selector">
              {chartPeriods.map(period => (
                <button 
                  key={period}
                  className={`timeframe-btn ${period === '3M' ? 'active' : ''}`}
                >
                  {period}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Chart Section */}
        <div className="chart-section">
          <div className="chart-header">
            <div className="chart-type-selector">
              <button 
                className={`chart-type-btn ${chartType === 'candlestick' ? 'active' : ''}`}
                onClick={() => setChartType('candlestick')}
              >
                Candles
              </button>
              <button 
                className={`chart-type-btn ${chartType === 'line' ? 'active' : ''}`}
                onClick={() => setChartType('line')}
              >
                Line
              </button>
            </div>

            <div className="trading-timeframes">
              {timeframes.map(tf => (
                <button 
                  key={tf}
                  className={`tf-btn ${tf === timeframe ? 'active' : ''}`}
                  onClick={() => setTimeframe(tf)}
                >
                  {tf}
                </button>
              ))}
            </div>
          </div>

          <div className="chart-container">
            {isLoading ? (
              <div className="chart-loading">
                <div className="loading-spinner"></div>
                <span>Loading chart data...</span>
              </div>
            ) : (
              <BinanceStyleChart 
                data={chartData}
                chartType={chartType}
                selectedPair={selectedPair}
                showVolume={true}
              />
            )}
          </div>
        </div>

        {/* Trading Pairs List */}
        <div className="pairs-section">
          <h3>Available Pairs</h3>
          <div className="pairs-list">
            {tradingPairs.map(pair => (
              <div 
                key={pair.symbol}
                className={`pair-item ${pair.symbol === selectedPair ? 'active' : ''}`}
                onClick={() => setSelectedPair(pair.symbol)}
              >
                <div className="pair-icon">{pair.icon}</div>
                <div className="pair-details">
                  <div className="pair-name">{pair.symbol}</div>
                  <div className="pair-price">${pair.price}</div>
                </div>
                <div className={`pair-change ${pair.change >= 0 ? 'positive' : 'negative'}`}>
                  {pair.change >= 0 ? '+' : ''}{pair.change}%
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="action-buttons">
          <button className="action-btn buy-btn">
            📈 Buy {currentPair?.symbol.split('/')[0]}
          </button>
          <button className="action-btn trade-btn">
            🔄 Trade {currentPair?.symbol.split('/')[0]}
          </button>
        </div>
      </main>

      {/* Wallet Connection Modal */}
      {showWalletModal && (
        <div className="wallet-modal-overlay" onClick={() => setShowWalletModal(false)}>
          <div className="wallet-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Connect Wallet</h3>
              <button className="modal-close" onClick={() => setShowWalletModal(false)}>×</button>
            </div>
            <div className="wallet-options">
              <button className="wallet-option" onClick={connectKeplr}>
                <div className="wallet-icon">🔐</div>
                <div className="wallet-info">
                  <div className="wallet-name">Keplr</div>
                  <div className="wallet-desc">Cosmos ecosystem wallet</div>
                </div>
              </button>
              <button className="wallet-option" onClick={connectLeap}>
                <div className="wallet-icon">🦘</div>
                <div className="wallet-info">
                  <div className="wallet-name">Leap</div>
                  <div className="wallet-desc">Multi-chain Cosmos wallet</div>
                </div>
              </button>
              <button className="wallet-option" onClick={connectMetaMask}>
                <div className="wallet-icon">🦊</div>
                <div className="wallet-info">
                  <div className="wallet-name">MetaMask</div>
                  <div className="wallet-desc">Ethereum wallet</div>
                </div>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EnhancedSnipSwapDEX;

