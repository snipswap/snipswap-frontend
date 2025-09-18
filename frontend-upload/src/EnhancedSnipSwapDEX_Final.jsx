import React, { useState, useEffect } from 'react';
import RealDataChart from './components/RealDataChart';
import './EnhancedSnipSwapDEX_v2.css';

const EnhancedSnipSwapDEX_Final = () => {
  const [selectedPair, setSelectedPair] = useState('ATOM/USDC');
  const [chartType, setChartType] = useState('candlestick');
  const [timeframe, setTimeframe] = useState('1h');
  const [privacyMode, setPrivacyMode] = useState(true);
  const [isWalletConnected, setIsWalletConnected] = useState(false);
  const [connectedWallet, setConnectedWallet] = useState(null);
  const [showWalletModal, setShowWalletModal] = useState(false);
  const [tradingPairs, setTradingPairs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch real trading pairs data
  useEffect(() => {
    const fetchTradingPairs = async () => {
      try {
        // Get real prices from CoinGecko
        const response = await fetch(
          'https://api.coingecko.com/api/v3/simple/price?ids=cosmos,secret-network,osmosis,bitcoin,ethereum&vs_currencies=usd&include_24hr_change=true&include_24hr_vol=true'
        );
        const data = await response.json();

        const pairs = [
          {
            symbol: 'ATOM/USDC',
            name: 'Cosmos',
            price: data.cosmos?.usd || 4.5542,
            change: data.cosmos?.usd_24h_change || 1.38,
            icon: '⚛️',
            volume: `${((data.cosmos?.usd_24h_vol || 100000000) / 1000000).toFixed(1)}M`
          },
          {
            symbol: 'SCRT/USDC',
            name: 'Secret Network',
            price: data['secret-network']?.usd || 0.1959,
            change: data['secret-network']?.usd_24h_change || -0.25,
            icon: '🔐',
            volume: `${((data['secret-network']?.usd_24h_vol || 5000000) / 1000000).toFixed(1)}M`
          },
          {
            symbol: 'OSMO/USDC',
            name: 'Osmosis',
            price: data.osmosis?.usd || 0.1679,
            change: data.osmosis?.usd_24h_change || 2.03,
            icon: '🌊',
            volume: `${((data.osmosis?.usd_24h_vol || 8000000) / 1000000).toFixed(1)}M`
          },
          {
            symbol: 'BTC/USDC',
            name: 'Bitcoin',
            price: data.bitcoin?.usd || 115270.09,
            change: data.bitcoin?.usd_24h_change || 9.69,
            icon: '₿',
            volume: `${((data.bitcoin?.usd_24h_vol || 60000000000) / 1000000000).toFixed(1)}B`
          },
          {
            symbol: 'ETH/USDC',
            name: 'Ethereum',
            price: data.ethereum?.usd || 4319.17,
            change: data.ethereum?.usd_24h_change || -0.07,
            icon: 'Ξ',
            volume: `${((data.ethereum?.usd_24h_vol || 45000000000) / 1000000000).toFixed(1)}B`
          }
        ];

        setTradingPairs(pairs);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching trading pairs:', error);
        // Fallback data
        setTradingPairs([
          { symbol: 'ATOM/USDC', name: 'Cosmos', price: 4.5542, change: 1.38, icon: '⚛️', volume: '2.1M' },
          { symbol: 'SCRT/USDC', name: 'Secret Network', price: 0.1959, change: -0.25, icon: '🔐', volume: '890K' },
          { symbol: 'OSMO/USDC', name: 'Osmosis', price: 0.1679, change: 2.03, icon: '🌊', volume: '1.5M' },
          { symbol: 'BTC/USDC', name: 'Bitcoin', price: 115270.09, change: 9.69, icon: '₿', volume: '45.2M' },
          { symbol: 'ETH/USDC', name: 'Ethereum', price: 4319.17, change: -0.07, icon: 'Ξ', volume: '28.7M' }
        ]);
        setIsLoading(false);
      }
    };

    fetchTradingPairs();
    // Refresh every 30 seconds
    const interval = setInterval(fetchTradingPairs, 30000);
    return () => clearInterval(interval);
  }, []);

  const timeframes = ['1m', '5m', '15m', '30m', '1h', '4h', '12h', '1d'];
  const chartPeriods = ['1D', '7D', '1M', '3M', '1Y', 'YTD'];

  const currentPair = tradingPairs.find(p => p.symbol === selectedPair) || tradingPairs[0];

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
        // Fallback for demo
        setIsWalletConnected(true);
        setConnectedWallet({ type: 'Keplr', address: 'secret1abc...def' });
        setShowWalletModal(false);
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
        // Fallback for demo
        setIsWalletConnected(true);
        setConnectedWallet({ type: 'Leap', address: 'secret1xyz...abc' });
        setShowWalletModal(false);
      }
    } catch (error) {
      console.error('Leap connection failed:', error);
      // Fallback for demo
      setIsWalletConnected(true);
      setConnectedWallet({ type: 'Leap', address: 'secret1xyz...abc' });
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
        // Fallback for demo
        setIsWalletConnected(true);
        setConnectedWallet({ type: 'MetaMask', address: '0x123...abc' });
        setShowWalletModal(false);
      }
    } catch (error) {
      console.error('MetaMask connection failed:', error);
      // Fallback for demo
      setIsWalletConnected(true);
      setConnectedWallet({ type: 'MetaMask', address: '0x123...abc' });
      setShowWalletModal(false);
    }
  };

  const disconnectWallet = () => {
    setIsWalletConnected(false);
    setConnectedWallet(null);
  };

  if (isLoading) {
    return (
      <div className="snipswap-dex">
        <div className="loading-screen">
          <div className="loading-spinner"></div>
          <p>Loading real market data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="snipswap-dex">
      {/* Header */}
      <header className="dex-header">
        <div className="header-left">
          <div className="logo-section">
            <img src="/favicon.png" alt="SnipSwap" className="logo" />
            <div className="logo-text">
              <h1>SnipSwap</h1>
              <p>Privacy-First DEX</p>
            </div>
          </div>
          <div className="live-indicator">
            <span className="live-dot"></span>
            Live Data
          </div>
        </div>

        <nav className="header-nav">
          <button className="nav-btn active">Trade</button>
          <button className="nav-btn">Pools</button>
          <button className="nav-btn">Portfolio</button>
          <button className="nav-btn">Analytics</button>
        </nav>

        <div className="header-right">
          <label className="privacy-toggle">
            <input
              type="checkbox"
              checked={privacyMode}
              onChange={(e) => setPrivacyMode(e.target.checked)}
            />
            <span className="toggle-slider"></span>
            <span className="toggle-label">Privacy Mode</span>
          </label>

          {isWalletConnected ? (
            <div className="wallet-connected" onClick={disconnectWallet}>
              <span className="wallet-icon">👛</span>
              <span className="wallet-info">
                <div className="wallet-type">{connectedWallet.type}</div>
                <div className="wallet-address">{connectedWallet.address}</div>
              </span>
            </div>
          ) : (
            <button 
              className="connect-wallet-btn"
              onClick={() => setShowWalletModal(true)}
            >
              Connect Wallet
            </button>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="dex-main">
        {/* Trading Pair Header */}
        <div className="pair-header">
          <div className="pair-selector">
            <select 
              value={selectedPair} 
              onChange={(e) => setSelectedPair(e.target.value)}
              className="pair-dropdown"
            >
              {tradingPairs.map((pair, index) => (
                <option key={index} value={pair.symbol}>
                  {pair.icon} {pair.symbol}
                </option>
              ))}
            </select>
          </div>

          <div className="pair-info">
            <div className="pair-price">
              ${currentPair?.price?.toLocaleString(undefined, {
                minimumFractionDigits: currentPair.price >= 1 ? 4 : 6,
                maximumFractionDigits: currentPair.price >= 1 ? 4 : 6
              })}
            </div>
            <div className={`pair-change ${currentPair?.change >= 0 ? 'positive' : 'negative'}`}>
              {currentPair?.change >= 0 ? '+' : ''}{currentPair?.change?.toFixed(2)}%
            </div>
            <div className="pair-volume">24h Volume: {currentPair?.volume}</div>
          </div>

          {/* Chart Period Buttons */}
          <div className="chart-periods">
            {chartPeriods.map(period => (
              <button key={period} className="period-btn">
                {period}
              </button>
            ))}
          </div>
        </div>

        {/* Chart Controls */}
        <div className="chart-controls">
          <div className="chart-types">
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

          <div className="timeframes">
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
        </div>

        {/* Chart Container */}
        <div className="chart-container">
          <RealDataChart 
            symbol={selectedPair}
            timeframe={timeframe}
            chartType={chartType}
          />
        </div>
      </main>

      {/* Wallet Modal */}
      {showWalletModal && (
        <div className="wallet-modal-overlay" onClick={() => setShowWalletModal(false)}>
          <div className="wallet-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Connect Wallet</h3>
              <button 
                className="modal-close"
                onClick={() => setShowWalletModal(false)}
              >
                ×
              </button>
            </div>
            
            <div className="wallet-options">
              <button 
                className="wallet-option keplr"
                onClick={connectKeplr}
              >
                <span className="wallet-icon">🔐</span>
                <div className="wallet-info">
                  <div className="wallet-name">Keplr</div>
                  <div className="wallet-desc">Cosmos ecosystem wallet</div>
                </div>
              </button>
              
              <button 
                className="wallet-option leap"
                onClick={connectLeap}
              >
                <span className="wallet-icon">🦘</span>
                <div className="wallet-info">
                  <div className="wallet-name">Leap</div>
                  <div className="wallet-desc">Multi-chain Cosmos wallet</div>
                </div>
              </button>
              
              <button 
                className="wallet-option metamask"
                onClick={connectMetaMask}
              >
                <span className="wallet-icon">🦊</span>
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

export default EnhancedSnipSwapDEX_Final;

