import React, { useState, useEffect } from 'react';
import SimpleBinanceChart from './SimpleBinanceChart';
import './EnhancedSnipSwapDEX.css';

// Generate realistic OHLC data for different trading pairs
const generatePairData = (symbol, basePrice, volatility = 0.02) => {
  const data = [];
  let currentPrice = basePrice;
  
  for (let i = 0; i < 100; i++) {
    const change = (Math.random() - 0.5) * volatility * basePrice;
    const open = currentPrice;
    const close = currentPrice + change;
    const high = Math.max(open, close) + Math.random() * volatility * basePrice * 0.5;
    const low = Math.min(open, close) - Math.random() * volatility * basePrice * 0.5;
    const volume = Math.random() * 1000000 + 100000;
    
    data.push({
      time: Date.now() - (100 - i) * 60000,
      open: parseFloat(open.toFixed(8)),
      high: parseFloat(high.toFixed(8)),
      low: parseFloat(low.toFixed(8)),
      close: parseFloat(close.toFixed(8)),
      volume: Math.floor(volume)
    });
    
    currentPrice = close;
  }
  
  return data;
};

// Base prices and volatilities for different trading pairs
const pairConfig = {
  'ATOM/USDC': { price: 4.5542, volatility: 0.03, change: 1.38 },
  'SCRT/USDC': { price: 0.1959, volatility: 0.04, change: -0.25 },
  'OSMO/USDC': { price: 0.1679, volatility: 0.035, change: 2.03 },
  'BTC/USDC': { price: 112381.2335, volatility: 0.015, change: -0.69 },
  'ETH/USDC': { price: 4319.1687, volatility: 0.02, change: -0.07 }
};

const EnhancedSnipSwapDEX = () => {
  const [selectedPair, setSelectedPair] = useState('ATOM/USDC');
  const [chartType, setChartType] = useState('Candles');
  const [timeframe, setTimeframe] = useState('1h');
  const [privacyMode, setPrivacyMode] = useState('Public');
  const [orderType, setOrderType] = useState('Limit');
  const [sellOrderType, setSellOrderType] = useState('Limit');
  const [chartData, setChartData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isWalletConnected, setIsWalletConnected] = useState(false);
  const [connectedWallet, setConnectedWallet] = useState(null);

  // Trading pairs data with proper configuration
  const tradingPairs = [
    { 
      symbol: 'ATOM/USDC', 
      name: 'Cosmos', 
      price: pairConfig['ATOM/USDC'].price, 
      change: pairConfig['ATOM/USDC'].change, 
      icon: '⚛️' 
    },
    { 
      symbol: 'SCRT/USDC', 
      name: 'Secret Network', 
      price: pairConfig['SCRT/USDC'].price, 
      change: pairConfig['SCRT/USDC'].change, 
      icon: '🔐' 
    },
    { 
      symbol: 'OSMO/USDC', 
      name: 'Osmosis', 
      price: pairConfig['OSMO/USDC'].price, 
      change: pairConfig['OSMO/USDC'].change, 
      icon: '🌊' 
    },
    { 
      symbol: 'BTC/USDC', 
      name: 'Bitcoin', 
      price: pairConfig['BTC/USDC'].price, 
      change: pairConfig['BTC/USDC'].change, 
      icon: '₿' 
    },
    { 
      symbol: 'ETH/USDC', 
      name: 'Ethereum', 
      price: pairConfig['ETH/USDC'].price, 
      change: pairConfig['ETH/USDC'].change, 
      icon: 'Ξ' 
    }
  ];

  // Generate chart data when pair or timeframe changes
  useEffect(() => {
    setIsLoading(true);
    
    // Simulate realistic loading time
    const timer = setTimeout(() => {
      const config = pairConfig[selectedPair];
      if (config) {
        const newData = generatePairData(selectedPair, config.price, config.volatility);
        setChartData(newData);
      }
      setIsLoading(false);
    }, 500); // Slightly longer for realism

    return () => clearTimeout(timer);
  }, [selectedPair, timeframe]);

  // Wallet connection functions
  const connectKeplr = async () => {
    try {
      if (window.keplr) {
        await window.keplr.enable('secret-4');
        const offlineSigner = window.keplr.getOfflineSigner('secret-4');
        const accounts = await offlineSigner.getAccounts();
        setIsWalletConnected(true);
        setConnectedWallet({ type: 'Keplr', address: accounts[0].address });
      } else {
        alert('Please install Keplr wallet');
      }
    } catch (error) {
      console.error('Keplr connection failed:', error);
    }
  };

  const connectLeap = async () => {
    try {
      if (window.leap) {
        await window.leap.enable('secret-4');
        const offlineSigner = window.leap.getOfflineSigner('secret-4');
        const accounts = await offlineSigner.getAccounts();
        setIsWalletConnected(true);
        setConnectedWallet({ type: 'Leap', address: accounts[0].address });
      } else {
        alert('Please install Leap wallet');
      }
    } catch (error) {
      console.error('Leap connection failed:', error);
    }
  };

  const connectMetaMask = async () => {
    try {
      if (window.ethereum) {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        setIsWalletConnected(true);
        setConnectedWallet({ type: 'MetaMask', address: accounts[0] });
      } else {
        alert('Please install MetaMask');
      }
    } catch (error) {
      console.error('MetaMask connection failed:', error);
    }
  };

  const disconnectWallet = () => {
    setIsWalletConnected(false);
    setConnectedWallet(null);
  };

  const currentPair = tradingPairs.find(p => p.symbol === selectedPair);

  return (
    <div className="enhanced-snipswap-dex">
      {/* Header */}
      <header className="dex-header">
        <div className="header-left">
          <div className="logo-section">
            <img src="/logo_snipswap.png" alt="SnipSwap" className="snipswap-logo" />
            <div className="brand-text">
              <h1>SnipSwap</h1>
              <p>Sovereign Trading Platform</p>
            </div>
          </div>
          <div className="live-indicator">
            <div className="live-dot"></div>
            <span>Live Data</span>
          </div>
        </div>

        <div className="header-center">
          <div className="privacy-modes">
            {['👁️Public', '🔒Private', '👤Stealth'].map(mode => (
              <button
                key={mode}
                className={`privacy-btn ${privacyMode === mode.slice(2) ? 'active' : ''}`}
                onClick={() => setPrivacyMode(mode.slice(2))}
              >
                {mode}
              </button>
            ))}
          </div>
        </div>

        <div className="header-right">
          {!isWalletConnected ? (
            <div className="wallet-connect-dropdown">
              <button className="connect-wallet-btn">Connect Wallet</button>
              <div className="wallet-options">
                <button onClick={connectKeplr} className="wallet-option">
                  <span className="wallet-icon">🔑</span>
                  Keplr
                </button>
                <button onClick={connectLeap} className="wallet-option">
                  <span className="wallet-icon">🦘</span>
                  Leap
                </button>
                <button onClick={connectMetaMask} className="wallet-option">
                  <span className="wallet-icon">🦊</span>
                  MetaMask
                </button>
              </div>
            </div>
          ) : (
            <div className="connected-wallet">
              <span className="wallet-type">{connectedWallet.type}</span>
              <span className="wallet-address">
                {connectedWallet.address.slice(0, 6)}...{connectedWallet.address.slice(-4)}
              </span>
              <button onClick={disconnectWallet} className="disconnect-btn">×</button>
            </div>
          )}
        </div>
      </header>

      {/* Main Content */}
      <div className="dex-main">
        {/* Markets Sidebar */}
        <div className="markets-sidebar">
          <div className="sidebar-header">
            <h3>Markets</h3>
            <div className="market-filters">
              <button className="filter-btn active">Cosmos</button>
              <button className="filter-btn">All</button>
            </div>
          </div>
          
          <div className="pairs-list">
            {tradingPairs.map(pair => (
              <div
                key={pair.symbol}
                className={`pair-item ${selectedPair === pair.symbol ? 'selected' : ''}`}
                onClick={() => setSelectedPair(pair.symbol)}
              >
                <div className="pair-info">
                  <span className="pair-icon">{pair.icon}</span>
                  <div className="pair-details">
                    <div className="pair-symbol">{pair.symbol}</div>
                    <div className="pair-name">{pair.name}</div>
                  </div>
                </div>
                <div className="pair-stats">
                  <div className="pair-price">${pair.price.toFixed(4)}</div>
                  <div className={`pair-change ${pair.change >= 0 ? 'positive' : 'negative'}`}>
                    {pair.change >= 0 ? '+' : ''}{pair.change.toFixed(2)}%
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Chart Section */}
        <div className="chart-section">
          <div className="chart-header">
            <div className="pair-display">
              <span className="current-pair-icon">{currentPair?.icon}</span>
              <span className="current-pair-symbol">{selectedPair}</span>
              <span className="current-pair-name">{currentPair?.name}</span>
              <div className="pair-stats-header">
                <span className="current-price">${currentPair?.price.toFixed(4)}</span>
                <span className={`current-change ${currentPair?.change >= 0 ? 'positive' : 'negative'}`}>
                  {currentPair?.change >= 0 ? '+' : ''}{currentPair?.change.toFixed(2)}%
                </span>
              </div>
            </div>

            <div className="chart-stats">
              <div className="stat-item">
                <span className="stat-label">24h High</span>
                <span className="stat-value">$4.8288</span>
              </div>
              <div className="stat-item">
                <span className="stat-label">24h Low</span>
                <span className="stat-value">$4.3690</span>
              </div>
              <div className="stat-item">
                <span className="stat-label">24h Volume</span>
                <span className="stat-value">$536.7M</span>
              </div>
            </div>
          </div>

          <div className="chart-controls">
            <div className="chart-types">
              {['Line', 'Candles', 'Area', 'OHLC', 'Heikin Ashi', 'Depth'].map(type => (
                <button
                  key={type}
                  className={`chart-type-btn ${chartType === type ? 'active' : ''}`}
                  onClick={() => setChartType(type)}
                >
                  {type}
                </button>
              ))}
            </div>

            <div className="timeframes">
              {['1m', '5m', '15m', '1h', '4h', '1d'].map(tf => (
                <button
                  key={tf}
                  className={`timeframe-btn ${timeframe === tf ? 'active' : ''}`}
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
                <span>Loading {selectedPair} data...</span>
              </div>
            ) : (
              <SimpleBinanceChart 
                selectedPair={selectedPair}
                chartType={chartType}
                timeframe={timeframe}
              />
            )}
          </div>

          <div className="trading-controls">
            <div className="trading-types">
              <button className="trading-type-btn active">Spot</button>
              <button className="trading-type-btn">Margin</button>
              <button className="trading-type-btn">Futures</button>
            </div>
          </div>

          {/* Trading Forms */}
          <div className="trading-forms">
            {/* Buy Form */}
            <div className="trading-form buy-form">
              <h4>Buy ATOM</h4>
              <div className="balance">Balance: 1,234.56 USDC</div>
              
              <div className="order-type-selector">
                <button
                  className={`order-type-btn ${orderType === 'Limit' ? 'active' : ''}`}
                  onClick={() => setOrderType('Limit')}
                >
                  Limit
                </button>
                <button
                  className={`order-type-btn ${orderType === 'Market' ? 'active' : ''}`}
                  onClick={() => setOrderType('Market')}
                >
                  Market
                </button>
              </div>

              <div className="form-group">
                <label>Price (USDC)</label>
                <input type="number" placeholder="4.5989" />
              </div>

              <div className="form-group">
                <label>Amount (ATOM)</label>
                <input type="number" placeholder="0.00" />
                <div className="percentage-buttons">
                  {['25%', '50%', '75%', '100%'].map(pct => (
                    <button key={pct} className="percentage-btn">{pct}</button>
                  ))}
                </div>
              </div>

              <div className="form-group">
                <label>Total (USDC)</label>
                <input type="number" placeholder="0.00" />
              </div>

              <button className="trade-btn buy-btn">Buy ATOM</button>
            </div>

            {/* Sell Form */}
            <div className="trading-form sell-form">
              <h4>Sell ATOM</h4>
              <div className="balance">Balance: 12.34 ATOM</div>
              
              <div className="order-type-selector">
                <button
                  className={`order-type-btn ${sellOrderType === 'Limit' ? 'active' : ''}`}
                  onClick={() => setSellOrderType('Limit')}
                >
                  Limit
                </button>
                <button
                  className={`order-type-btn ${sellOrderType === 'Market' ? 'active' : ''}`}
                  onClick={() => setSellOrderType('Market')}
                >
                  Market
                </button>
              </div>

              <div className="form-group">
                <label>Price (USDC)</label>
                <input type="number" placeholder="4.5989" />
              </div>

              <div className="form-group">
                <label>Amount (ATOM)</label>
                <input type="number" placeholder="0.00" />
                <div className="percentage-buttons">
                  {['25%', '50%', '75%', '100%'].map(pct => (
                    <button key={pct} className="percentage-btn">{pct}</button>
                  ))}
                </div>
              </div>

              <div className="form-group">
                <label>Total (USDC)</label>
                <input type="number" placeholder="0.00" />
              </div>

              <button className="trade-btn sell-btn">Sell ATOM</button>
            </div>
          </div>
        </div>

        {/* Order Book & Trades Sidebar */}
        <div className="orderbook-sidebar">
          <div className="orderbook-section">
            <div className="section-header">
              <h4>Order Book</h4>
              <div className="orderbook-controls">
                <button className="control-btn">⚌</button>
                <button className="control-btn">▲</button>
                <button className="control-btn">▼</button>
              </div>
            </div>

            <div className="orderbook-headers">
              <span>Price (USDC)</span>
              <span>Amount</span>
              <span>Total</span>
            </div>

            <div className="orderbook-content">
              {/* Mock order book data */}
              {Array.from({ length: 10 }, (_, i) => (
                <div key={i} className="orderbook-row ask">
                  <span className="price">{(4.5542 + i * 0.001).toFixed(4)}</span>
                  <span className="amount">{(Math.random() * 1000).toFixed(2)}</span>
                  <span className="total">{(Math.random() * 5000).toFixed(2)}</span>
                </div>
              ))}
              
              <div className="spread">Spread: 0.0092</div>
              
              {Array.from({ length: 10 }, (_, i) => (
                <div key={i} className="orderbook-row bid">
                  <span className="price">{(4.5542 - i * 0.001).toFixed(4)}</span>
                  <span className="amount">{(Math.random() * 1000).toFixed(2)}</span>
                  <span className="total">{(Math.random() * 5000).toFixed(2)}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="trades-section">
            <h4>Recent Trades</h4>
            <div className="trades-headers">
              <span>Price (USDC)</span>
              <span>Amount</span>
              <span>Time</span>
            </div>
            <div className="trades-content">
              {Array.from({ length: 15 }, (_, i) => (
                <div key={i} className={`trade-row ${Math.random() > 0.5 ? 'buy' : 'sell'}`}>
                  <span className="price">{(4.5542 + (Math.random() - 0.5) * 0.01).toFixed(4)}</span>
                  <span className="amount">{(Math.random() * 100).toFixed(2)}</span>
                  <span className="time">{new Date(Date.now() - i * 30000).toLocaleTimeString()}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EnhancedSnipSwapDEX;

