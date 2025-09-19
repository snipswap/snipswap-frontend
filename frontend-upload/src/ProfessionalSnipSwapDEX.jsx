import React, { useState, useEffect } from 'react';
import SnipSwapLogo from './components/SnipSwapLogo';
import BinanceStyleChart from './BinanceStyleChart';
import './Perfect.css';

const ProfessionalSnipSwapDEX = () => {
  const [selectedPair, setSelectedPair] = useState('ATOM/USDC');
  const [chartType, setChartType] = useState('candlestick');
  const [timeframe, setTimeframe] = useState('1h');
  const [privacyMode, setPrivacyMode] = useState(true);
  const [isWalletConnected, setIsWalletConnected] = useState(false);
  const [showWalletModal, setShowWalletModal] = useState(false);
  const [connectedWallet, setConnectedWallet] = useState(null);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [marketData, setMarketData] = useState({
    price: 4.6300,
    change: 2.25,
    volume24h: 98400000,
    high24h: 4.8615,
    low24h: 4.3985,
    open: 4.6254,
    marketCap: 1240000000,
    lastUpdate: new Date()
  });

  // Update time every second for professional feel
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Simulate real-time price updates
  useEffect(() => {
    const priceTimer = setInterval(() => {
      setMarketData(prev => ({
        ...prev,
        price: prev.price + (Math.random() - 0.5) * 0.01,
        lastUpdate: new Date()
      }));
    }, 5000);
    return () => clearInterval(priceTimer);
  }, []);

  const tradingPairs = [
    { symbol: 'ATOM/USDC', icon: '⚛️', name: 'Cosmos', price: 4.6300, change: 2.25 },
    { symbol: 'SCRT/USDC', icon: '🔐', name: 'Secret Network', price: 0.4521, change: -1.34 },
    { symbol: 'OSMO/USDC', icon: '🌊', name: 'Osmosis', price: 0.7892, change: 3.45 },
    { symbol: 'BTC/USDC', icon: '₿', name: 'Bitcoin', price: 63150.00, change: 0.87 },
    { symbol: 'ETH/USDC', icon: 'Ξ', name: 'Ethereum', price: 2456.78, change: 1.23 }
  ];

  const timeframes = ['1m', '5m', '15m', '30m', '1h', '4h', '12h', '1d'];
  const periods = ['1D', '7D', '1M', '3M', '1Y', 'YTD'];

  const connectKeplr = async () => {
    try {
      if (window.keplr) {
        await window.keplr.enable("cosmoshub-4");
        const offlineSigner = window.keplr.getOfflineSigner("cosmoshub-4");
        const accounts = await offlineSigner.getAccounts();
        setConnectedWallet({
          type: 'Keplr',
          address: accounts[0].address.slice(0, 8) + '...' + accounts[0].address.slice(-6)
        });
        setIsWalletConnected(true);
        setShowWalletModal(false);
      } else {
        // Demo mode
        setConnectedWallet({
          type: 'Keplr',
          address: 'cosmos1abc...def123'
        });
        setIsWalletConnected(true);
        setShowWalletModal(false);
      }
    } catch (error) {
      console.error('Keplr connection failed:', error);
    }
  };

  const connectLeap = async () => {
    try {
      if (window.leap) {
        await window.leap.enable("cosmoshub-4");
        const offlineSigner = window.leap.getOfflineSigner("cosmoshub-4");
        const accounts = await offlineSigner.getAccounts();
        setConnectedWallet({
          type: 'Leap',
          address: accounts[0].address.slice(0, 8) + '...' + accounts[0].address.slice(-6)
        });
        setIsWalletConnected(true);
        setShowWalletModal(false);
      } else {
        // Demo mode
        setConnectedWallet({
          type: 'Leap',
          address: 'cosmos1xyz...abc789'
        });
        setIsWalletConnected(true);
        setShowWalletModal(false);
      }
    } catch (error) {
      console.error('Leap connection failed:', error);
    }
  };

  const connectMetaMask = async () => {
    try {
      if (window.ethereum) {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        setConnectedWallet({
          type: 'MetaMask',
          address: accounts[0].slice(0, 6) + '...' + accounts[0].slice(-4)
        });
        setIsWalletConnected(true);
        setShowWalletModal(false);
      } else {
        // Demo mode
        setConnectedWallet({
          type: 'MetaMask',
          address: '0x1234...5678'
        });
        setIsWalletConnected(true);
        setShowWalletModal(false);
      }
    } catch (error) {
      console.error('MetaMask connection failed:', error);
    }
  };

  const disconnectWallet = () => {
    setIsWalletConnected(false);
    setConnectedWallet(null);
  };

  const formatNumber = (num, decimals = 2) => {
    if (num >= 1e9) return (num / 1e9).toFixed(1) + 'B';
    if (num >= 1e6) return (num / 1e6).toFixed(1) + 'M';
    if (num >= 1e3) return (num / 1e3).toFixed(1) + 'K';
    return num.toFixed(decimals);
  };

  const getMarketStatus = () => {
    const now = new Date();
    const hour = now.getUTCHours();
    // Crypto markets are always open, but we can show different statuses
    return {
      status: 'Live',
      color: '#26a69a',
      text: 'Market Open 24/7'
    };
  };

  const marketStatus = getMarketStatus();

  return (
    <div className="professional-dex">
      {/* Professional Header */}
      <header className="professional-header">
        <div className="header-left">
          <div className="logo-section">
            <SnipSwapLogo size={48} />
            <div className="brand-info">
              <h1 className="brand-name">SnipSwap</h1>
              <span className="brand-tagline">Privacy-First DEX</span>
            </div>
          </div>
          
          <div className="market-status">
            <div className="status-indicator" style={{ color: marketStatus.color }}>
              <span className="status-dot"></span>
              {marketStatus.text}
            </div>
            <div className="current-time">
              {currentTime.toLocaleTimeString('en-US', { 
                hour12: false, 
                timeZone: 'UTC' 
              })} UTC
            </div>
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
          <div className="privacy-controls">
            <label className="privacy-toggle-pro">
              <span className="privacy-icon">🔐</span>
              <span className="privacy-label">Privacy Shield</span>
              <div className="toggle-switch-pro">
                <input
                  type="checkbox"
                  checked={privacyMode}
                  onChange={(e) => setPrivacyMode(e.target.checked)}
                />
                <span className="slider-pro"></span>
              </div>
              <span className="privacy-status">{privacyMode ? 'ON' : 'OFF'}</span>
            </label>
          </div>

          {isWalletConnected ? (
            <div className="wallet-connected-pro" onClick={disconnectWallet}>
              <span className="wallet-icon">👛</span>
              <div className="wallet-info">
                <div className="wallet-type">{connectedWallet.type}</div>
                <div className="wallet-address">{connectedWallet.address}</div>
              </div>
            </div>
          ) : (
            <button 
              className="connect-wallet-btn-pro"
              onClick={() => setShowWalletModal(true)}
            >
              Connect Wallet
            </button>
          )}
        </div>
      </header>

      {/* Trading Interface */}
      <main className="trading-main">
        {/* Symbol and Price Header */}
        <div className="symbol-header">
          <div className="symbol-selector">
            <select 
              value={selectedPair} 
              onChange={(e) => setSelectedPair(e.target.value)}
              className="pair-select-pro"
            >
              {tradingPairs.map(pair => (
                <option key={pair.symbol} value={pair.symbol}>
                  {pair.icon} {pair.symbol}
                </option>
              ))}
            </select>
          </div>

          <div className="price-display">
            <div className="current-price">
              ${marketData.price.toFixed(4)}
              <span className={`price-change ${marketData.change >= 0 ? 'positive' : 'negative'}`}>
                {marketData.change >= 0 ? '+' : ''}{marketData.change.toFixed(2)}%
              </span>
            </div>
            <div className="market-stats">
              <span>24h Volume: {formatNumber(marketData.volume24h)}</span>
              <span>Market Cap: {formatNumber(marketData.marketCap)}</span>
              <span>Last Update: {marketData.lastUpdate.toLocaleTimeString()}</span>
            </div>
          </div>

          <div className="period-controls">
            {periods.map(period => (
              <button 
                key={period}
                className={`period-btn ${period === '1D' ? 'active' : ''}`}
              >
                {period}
              </button>
            ))}
          </div>
        </div>

        {/* Chart Controls */}
        <div className="chart-controls-pro">
          <div className="chart-types">
            <button 
              className={`chart-type-btn ${chartType === 'candlestick' ? 'active' : ''}`}
              onClick={() => setChartType('candlestick')}
            >
              📊 Candles
            </button>
            <button 
              className={`chart-type-btn ${chartType === 'line' ? 'active' : ''}`}
              onClick={() => setChartType('line')}
            >
              📈 Line
            </button>
          </div>

          <div className="timeframes-pro">
            {timeframes.map(tf => (
              <button 
                key={tf}
                className={`timeframe-btn ${timeframe === tf ? 'active' : ''}`}
                onClick={() => setTimeframe(tf)}
              >
                {tf}
              </button>
            ))}
          </div>

          <div className="chart-tools">
            <button className="tool-btn" title="Drawing Tools">📏</button>
            <button className="tool-btn" title="Indicators">📊</button>
            <button className="tool-btn" title="Settings">⚙️</button>
            <button className="tool-btn" title="Fullscreen">⛶</button>
          </div>
        </div>

        {/* Professional Chart */}
        <div className="chart-container-pro">
          <BinanceStyleChart 
            chartData={[]}
            chartType={chartType}
            timeframe={timeframe}
            currentPrice={marketData.price}
            priceChange={marketData.change}
            ohlcData={{ 
              open: marketData.open, 
              high: marketData.high24h, 
              low: marketData.low24h, 
              close: marketData.price 
            }}
            volume24h={marketData.volume24h}
          />
        </div>

        {/* Market Data Panel */}
        <div className="market-data-panel">
          <div className="data-section">
            <h3>Market Data</h3>
            <div className="data-grid">
              <div className="data-item">
                <span className="data-label">Open</span>
                <span className="data-value">${marketData.open.toFixed(4)}</span>
              </div>
              <div className="data-item">
                <span className="data-label">High</span>
                <span className="data-value positive">${marketData.high24h.toFixed(4)}</span>
              </div>
              <div className="data-item">
                <span className="data-label">Low</span>
                <span className="data-value negative">${marketData.low24h.toFixed(4)}</span>
              </div>
              <div className="data-item">
                <span className="data-label">Volume</span>
                <span className="data-value">{formatNumber(marketData.volume24h)}</span>
              </div>
            </div>
          </div>

          <div className="data-section">
            <h3>Trading</h3>
            <div className="trading-actions">
              <button className="trade-btn buy-btn">Buy {selectedPair.split('/')[0]}</button>
              <button className="trade-btn sell-btn">Sell {selectedPair.split('/')[0]}</button>
            </div>
          </div>
        </div>
      </main>

      {/* Professional Wallet Modal */}
      {showWalletModal && (
        <div className="wallet-modal-overlay-pro" onClick={() => setShowWalletModal(false)}>
          <div className="wallet-modal-pro" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header-pro">
              <h3>Connect Your Wallet</h3>
              <p>Choose your preferred wallet to start trading</p>
              <button 
                className="modal-close-pro"
                onClick={() => setShowWalletModal(false)}
              >
                ×
              </button>
            </div>
            
            <div className="wallet-options-pro">
              <button className="wallet-option-pro keplr" onClick={connectKeplr}>
                <div className="wallet-icon-large">🔐</div>
                <div className="wallet-details">
                  <h4>Keplr</h4>
                  <p>Cosmos ecosystem wallet</p>
                </div>
              </button>

              <button className="wallet-option-pro leap" onClick={connectLeap}>
                <div className="wallet-icon-large">🦘</div>
                <div className="wallet-details">
                  <h4>Leap</h4>
                  <p>Multi-chain Cosmos wallet</p>
                </div>
              </button>

              <button className="wallet-option-pro metamask" onClick={connectMetaMask}>
                <div className="wallet-icon-large">🦊</div>
                <div className="wallet-details">
                  <h4>MetaMask</h4>
                  <p>Ethereum wallet</p>
                </div>
              </button>
            </div>

            <div className="modal-footer-pro">
              <p>New to crypto wallets? <a href="#" className="help-link">Learn more</a></p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfessionalSnipSwapDEX;

