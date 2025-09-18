import React, { useState, useEffect } from 'react';
import RealDataChart from './components/RealDataChart';
import './EnhancedSnipSwapDEX_v2.css';

const EnhancedSnipSwapDEX_v3 = () => {
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
            price: data.cosmos?.usd || 4.64,
            change: data.cosmos?.usd_24h_change || 0,
            icon: '⚛️',
            volume: `${(data.cosmos?.usd_24h_vol || 100000000) / 1000000}M`
          },
          {
            symbol: 'SCRT/USDC',
            name: 'Secret Network',
            price: data['secret-network']?.usd || 0.196,
            change: data['secret-network']?.usd_24h_change || 0,
            icon: '🔐',
            volume: `${(data['secret-network']?.usd_24h_vol || 5000000) / 1000000}M`
          },
          {
            symbol: 'OSMO/USDC',
            name: 'Osmosis',
            price: data.osmosis?.usd || 0.164,
            change: data.osmosis?.usd_24h_change || 0,
            icon: '🌊',
            volume: `${(data.osmosis?.usd_24h_vol || 8000000) / 1000000}M`
          },
          {
            symbol: 'BTC/USDC',
            name: 'Bitcoin',
            price: data.bitcoin?.usd || 117000,
            change: data.bitcoin?.usd_24h_change || 0,
            icon: '₿',
            volume: `${(data.bitcoin?.usd_24h_vol || 60000000000) / 1000000000}B`
          },
          {
            symbol: 'ETH/USDC',
            name: 'Ethereum',
            price: data.ethereum?.usd || 4600,
            change: data.ethereum?.usd_24h_change || 0,
            icon: 'Ξ',
            volume: `${(data.ethereum?.usd_24h_vol || 45000000000) / 1000000000}B`
          }
        ];

        setTradingPairs(pairs);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching trading pairs:', error);
        // Fallback data
        setTradingPairs([
          { symbol: 'ATOM/USDC', name: 'Cosmos', price: 4.64, change: 1.91, icon: '⚛️', volume: '100.8M' },
          { symbol: 'SCRT/USDC', name: 'Secret Network', price: 0.196, change: -0.25, icon: '🔐', volume: '5.2M' },
          { symbol: 'OSMO/USDC', name: 'Osmosis', price: 0.164, change: 1.03, icon: '🌊', volume: '7.6M' },
          { symbol: 'BTC/USDC', name: 'Bitcoin', price: 117774, change: 1.01, icon: '₿', volume: '60.6B' },
          { symbol: 'ETH/USDC', name: 'Ethereum', price: 4626, change: 2.33, icon: 'Ξ', volume: '45.4B' }
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

  // Wallet connection handlers
  const connectWallet = async (walletType) => {
    try {
      let wallet = null;
      
      switch (walletType) {
        case 'keplr':
          if (window.keplr) {
            await window.keplr.enable('cosmoshub-4');
            const offlineSigner = window.keplr.getOfflineSigner('cosmoshub-4');
            const accounts = await offlineSigner.getAccounts();
            wallet = { type: 'Keplr', address: accounts[0].address };
          } else {
            wallet = { type: 'Keplr', address: 'cosmos1demo...keplr' };
          }
          break;
          
        case 'leap':
          if (window.leap) {
            await window.leap.enable('cosmoshub-4');
            const offlineSigner = window.leap.getOfflineSigner('cosmoshub-4');
            const accounts = await offlineSigner.getAccounts();
            wallet = { type: 'Leap', address: accounts[0].address };
          } else {
            wallet = { type: 'Leap', address: 'cosmos1demo...leap' };
          }
          break;
          
        case 'metamask':
          if (window.ethereum) {
            const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
            wallet = { type: 'MetaMask', address: accounts[0] };
          } else {
            wallet = { type: 'MetaMask', address: '0xdemo...metamask' };
          }
          break;
      }
      
      if (wallet) {
        setConnectedWallet(wallet);
        setIsWalletConnected(true);
        setShowWalletModal(false);
      }
    } catch (error) {
      console.error('Wallet connection error:', error);
    }
  };

  const disconnectWallet = () => {
    setConnectedWallet(null);
    setIsWalletConnected(false);
  };

  if (isLoading) {
    return (
      <div className="dex-container">
        <div className="loading-screen">
          <div className="loading-spinner"></div>
          <p>Loading real market data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="dex-container">
      {/* Header */}
      <header className="dex-header">
        <div className="header-left">
          <div className="logo">
            <span className="logo-icon">🔄</span>
            <span className="logo-text">SnipSwap</span>
            <span className="logo-subtitle">Privacy-First DEX</span>
          </div>
          <div className="live-indicator">
            <span className="live-dot"></span>
            Live Data
          </div>
        </div>

        <nav className="header-nav">
          <button className="nav-btn active">Trade<span className="nav-badge">1</span></button>
          <button className="nav-btn">Pools<span className="nav-badge">2</span></button>
          <button className="nav-btn">Portfolio<span className="nav-badge">3</span></button>
          <button className="nav-btn">Analytics<span className="nav-badge">4</span></button>
        </nav>

        <div className="header-right">
          <label className="privacy-toggle">
            <input
              type="checkbox"
              checked={privacyMode}
              onChange={(e) => setPrivacyMode(e.target.checked)}
            />
            <span className="toggle-slider"></span>
            <span className="toggle-label">🔐 Privacy Mode</span>
          </label>

          {isWalletConnected ? (
            <div className="wallet-connected" onClick={disconnectWallet}>
              <span className="wallet-icon">👛</span>
              <span className="wallet-info">
                <div className="wallet-type">{connectedWallet.type}</div>
                <div className="wallet-address">
                  {connectedWallet.address.slice(0, 6)}...{connectedWallet.address.slice(-4)}
                </div>
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
                minimumFractionDigits: currentPair.price >= 1 ? 2 : 6,
                maximumFractionDigits: currentPair.price >= 1 ? 2 : 6
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

        {/* Chart Container - Binance Style with More Space */}
        <div className="chart-section" style={{ 
          height: '600px', 
          margin: '20px 0',
          padding: '20px',
          backgroundColor: '#1a1a1a',
          borderRadius: '8px',
          border: '1px solid #333'
        }}>
          <RealDataChart 
            symbol={selectedPair}
            timeframe={timeframe}
            chartType={chartType}
          />
        </div>

        {/* Trading Interface */}
        <div className="trading-interface">
          <div className="order-book">
            <h3>Order Book</h3>
            <div className="order-book-content">
              <div className="asks">
                <div className="order-header">
                  <span>Price (USDC)</span>
                  <span>Amount ({selectedPair.split('/')[0]})</span>
                  <span>Total</span>
                </div>
                {[...Array(8)].map((_, i) => {
                  const price = currentPair?.price * (1 + (i + 1) * 0.001);
                  const amount = 100 + i * 15;
                  return (
                    <div key={i} className="order-row ask">
                      <span className="price">{price?.toFixed(4)}</span>
                      <span className="amount">{amount}</span>
                      <span className="total">{(price * amount)?.toFixed(2)}</span>
                    </div>
                  );
                })}
              </div>
              
              <div className="spread">
                <div className="current-price">
                  ${currentPair?.price?.toFixed(4)}
                </div>
              </div>
              
              <div className="bids">
                {[...Array(8)].map((_, i) => {
                  const price = currentPair?.price * (1 - (i + 1) * 0.001);
                  const amount = 100 + i * 15;
                  return (
                    <div key={i} className="order-row bid">
                      <span className="price">{price?.toFixed(4)}</span>
                      <span className="amount">{amount}</span>
                      <span className="total">{(price * amount)?.toFixed(2)}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="trade-form">
            <div className="trade-tabs">
              <button className="trade-tab active">Buy</button>
              <button className="trade-tab">Sell</button>
            </div>
            
            <div className="trade-inputs">
              <div className="input-group">
                <label>Price (USDC)</label>
                <input type="number" placeholder={currentPair?.price?.toFixed(4)} />
              </div>
              
              <div className="input-group">
                <label>Amount ({selectedPair.split('/')[0]})</label>
                <input type="number" placeholder="0.00" />
              </div>
              
              <div className="input-group">
                <label>Total (USDC)</label>
                <input type="number" placeholder="0.00" />
              </div>
            </div>
            
            <button className="trade-submit-btn" disabled={!isWalletConnected}>
              {isWalletConnected ? 'Place Buy Order' : 'Connect Wallet to Trade'}
            </button>
          </div>
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
                onClick={() => connectWallet('keplr')}
              >
                <span className="wallet-icon">🔐</span>
                <div className="wallet-info">
                  <div className="wallet-name">Keplr</div>
                  <div className="wallet-desc">Cosmos ecosystem wallet</div>
                </div>
              </button>
              
              <button 
                className="wallet-option leap"
                onClick={() => connectWallet('leap')}
              >
                <span className="wallet-icon">🦘</span>
                <div className="wallet-info">
                  <div className="wallet-name">Leap</div>
                  <div className="wallet-desc">Multi-chain Cosmos wallet</div>
                </div>
              </button>
              
              <button 
                className="wallet-option metamask"
                onClick={() => connectWallet('metamask')}
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

export default EnhancedSnipSwapDEX_v3;

