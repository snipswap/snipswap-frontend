import React, { useState, useEffect, useRef } from 'react';
import { LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, ComposedChart } from 'recharts';
import CandlestickChart from './CandlestickChart.jsx';

const ProfessionalTradingApp = () => {
  const [selectedPair, setSelectedPair] = useState('ATOM/USDC');
  const [orderType, setOrderType] = useState('limit');
  const [privacyMode, setPrivacyMode] = useState('private');
  const [chartType, setChartType] = useState('line');
  const [priceData, setPriceData] = useState({});
  const [orderBook, setOrderBook] = useState({ bids: [], asks: [] });
  const [recentTrades, setRecentTrades] = useState([]);
  const [chartData, setChartData] = useState([]);
  const [candlestickData, setCandlestickData] = useState([]);
  const [isConnected, setIsConnected] = useState(false);
  const wsRef = useRef(null);

  // Trading pairs focused on Cosmos ecosystem
  const tradingPairs = [
    { symbol: 'ATOM/USDC', name: 'Cosmos', icon: '⚛️', price: 4.5989, change: 1.34 },
    { symbol: 'SCRT/USDC', name: 'Secret Network', icon: '🔐', price: 0.1945, change: -0.25 },
    { symbol: 'OSMO/USDC', name: 'Osmosis', icon: '🌊', price: 0.1689, change: 2.04 },
    { symbol: 'BTC/USDC', name: 'Bitcoin', icon: '₿', price: 111422.00, change: -0.71 },
    { symbol: 'ETH/USDC', name: 'Ethereum', icon: 'Ξ', price: 4307.57, change: -0.15 }
  ];

  // Privacy modes
  const privacyModes = [
    { id: 'public', name: 'Public', desc: 'Visible on-chain', icon: '👁️' },
    { id: 'private', name: 'Private', desc: 'Secret Network', icon: '🔒' },
    { id: 'stealth', name: 'Stealth', desc: 'Maximum privacy', icon: '👤' }
  ];

  // WebSocket connection for real-time data
  useEffect(() => {
    const connectWebSocket = () => {
      try {
        // In production, this would connect to your WebSocket server
        // For now, we'll simulate real-time updates
        setIsConnected(true);
        
        // Simulate real-time price updates
        const interval = setInterval(() => {
          updatePrices();
          updateOrderBook();
          updateRecentTrades();
          updateChartData();
          updateCandlestickData();
        }, 1000);

        return () => clearInterval(interval);
      } catch (error) {
        console.error('WebSocket connection failed:', error);
        setIsConnected(false);
      }
    };

    connectWebSocket();
  }, []);

  const updatePrices = () => {
    const newPrices = {};
    tradingPairs.forEach(pair => {
      const basePrice = pair.price;
      const variation = (Math.random() - 0.5) * 0.02; // ±1% variation
      newPrices[pair.symbol] = {
        price: basePrice * (1 + variation),
        change: pair.change + (Math.random() - 0.5) * 0.1,
        volume: Math.random() * 1000000,
        high: basePrice * 1.05,
        low: basePrice * 0.95
      };
    });
    setPriceData(newPrices);
  };

  const updateOrderBook = () => {
    const currentPrice = priceData[selectedPair]?.price || tradingPairs.find(p => p.symbol === selectedPair)?.price || 4.5989;
    
    const bids = Array.from({ length: 15 }, (_, i) => ({
      price: currentPrice * (1 - (i + 1) * 0.001),
      amount: Math.random() * 1000,
      total: 0
    }));

    const asks = Array.from({ length: 15 }, (_, i) => ({
      price: currentPrice * (1 + (i + 1) * 0.001),
      amount: Math.random() * 1000,
      total: 0
    }));

    // Calculate cumulative totals
    let bidTotal = 0;
    bids.forEach(bid => {
      bidTotal += bid.amount;
      bid.total = bidTotal;
    });

    let askTotal = 0;
    asks.forEach(ask => {
      askTotal += ask.amount;
      ask.total = askTotal;
    });

    setOrderBook({ bids, asks });
  };

  const updateRecentTrades = () => {
    const currentPrice = priceData[selectedPair]?.price || tradingPairs.find(p => p.symbol === selectedPair)?.price || 4.5989;
    
    const newTrade = {
      id: Date.now(),
      price: currentPrice * (1 + (Math.random() - 0.5) * 0.002),
      amount: Math.random() * 100,
      time: new Date().toLocaleTimeString(),
      side: Math.random() > 0.5 ? 'buy' : 'sell'
    };

    setRecentTrades(prev => [newTrade, ...prev.slice(0, 19)]);
  };

  const updateChartData = () => {
    const currentPrice = priceData[selectedPair]?.price || tradingPairs.find(p => p.symbol === selectedPair)?.price || 4.5989;
    
    const newDataPoint = {
      time: Date.now(),
      price: currentPrice,
      volume: Math.random() * 1000
    };

    setChartData(prev => [...prev.slice(-99), newDataPoint]);
  };

  const updateCandlestickData = () => {
    const currentPrice = priceData[selectedPair]?.price || tradingPairs.find(p => p.symbol === selectedPair)?.price || 4.5989;
    
    setCandlestickData(prev => {
      if (prev.length === 0) {
        // Initialize with realistic candlestick data
        const initialData = [];
        let lastClose = currentPrice;
        
        for (let i = 0; i < 50; i++) {
          // Create realistic price movement
          const volatility = 0.005; // 0.5% volatility
          const trend = (Math.random() - 0.5) * 0.002; // Small trend
          
          const open = lastClose;
          const priceChange = (Math.random() - 0.5) * volatility + trend;
          const close = open * (1 + priceChange);
          
          // High and low should encompass open and close with some extra range
          const maxPrice = Math.max(open, close);
          const minPrice = Math.min(open, close);
          const extraRange = Math.abs(close - open) * 0.5 + volatility * 0.3;
          
          const high = maxPrice + (Math.random() * extraRange);
          const low = minPrice - (Math.random() * extraRange);
          
          initialData.push({
            time: Date.now() - (50 - i) * 60000, // 1 minute intervals
            open: parseFloat(open.toFixed(4)),
            high: parseFloat(high.toFixed(4)),
            low: parseFloat(low.toFixed(4)),
            close: parseFloat(close.toFixed(4)),
            volume: Math.floor(Math.random() * 1000000) + 100000
          });
          
          lastClose = close;
        }
        return initialData;
      }
      
      // Update the last candle with new price data
      const updated = [...prev];
      const lastCandle = { ...updated[updated.length - 1] };
      
      // Simulate realistic price movement within the candle
      const priceVariation = (Math.random() - 0.5) * 0.001;
      const newPrice = currentPrice * (1 + priceVariation);
      
      lastCandle.close = parseFloat(newPrice.toFixed(4));
      lastCandle.high = Math.max(lastCandle.high, newPrice);
      lastCandle.low = Math.min(lastCandle.low, newPrice);
      lastCandle.volume += Math.floor(Math.random() * 10000);
      
      updated[updated.length - 1] = lastCandle;
      
      // Occasionally add a new candle (every ~30 updates)
      if (Math.random() < 0.03) {
        const open = lastCandle.close;
        const priceChange = (Math.random() - 0.5) * 0.005;
        const close = open * (1 + priceChange);
        const maxPrice = Math.max(open, close);
        const minPrice = Math.min(open, close);
        const extraRange = Math.abs(close - open) * 0.5 + 0.001;
        
        const newCandle = {
          time: Date.now(),
          open: parseFloat(open.toFixed(4)),
          high: parseFloat((maxPrice + Math.random() * extraRange).toFixed(4)),
          low: parseFloat((minPrice - Math.random() * extraRange).toFixed(4)),
          close: parseFloat(close.toFixed(4)),
          volume: Math.floor(Math.random() * 1000000) + 100000
        };
        
        updated.push(newCandle);
        // Keep only last 50 candles
        return updated.slice(-50);
      }
      
      return updated;
    });
  };

  const currentPair = tradingPairs.find(p => p.symbol === selectedPair);
  const currentPriceData = priceData[selectedPair] || {};

  return (
    <div className="professional-trading-app">
      {/* Header */}
      <header className="trading-header">
        <div className="header-left">
          <div className="logo">
            <div className="logo-icon">S</div>
            <div className="logo-text">
              <div className="brand-name">SnipSwap</div>
              <div className="brand-tagline">Sovereign Trading Platform</div>
            </div>
          </div>
        </div>
        
        <div className="header-center">
          <div className="connection-status">
            <div className={`status-indicator ${isConnected ? 'connected' : 'disconnected'}`}></div>
            <span>{isConnected ? 'Live Data' : 'Connecting...'}</span>
          </div>
        </div>

        <div className="header-right">
          <div className="privacy-selector">
            {privacyModes.map(mode => (
              <button
                key={mode.id}
                className={`privacy-mode ${privacyMode === mode.id ? 'active' : ''}`}
                onClick={() => setPrivacyMode(mode.id)}
                title={mode.desc}
              >
                <span className="mode-icon">{mode.icon}</span>
                <span className="mode-name">{mode.name}</span>
              </button>
            ))}
          </div>
          <button className="connect-wallet-btn">Connect Wallet</button>
        </div>
      </header>

      {/* Main Trading Interface */}
      <div className="trading-main">
        {/* Left Sidebar - Pairs */}
        <div className="pairs-sidebar">
          <div className="sidebar-header">
            <h3>Markets</h3>
            <div className="market-filter">
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
                <div className="pair-price">
                  <div className="price">${(priceData[pair.symbol]?.price || pair.price).toFixed(4)}</div>
                  <div className={`change ${(priceData[pair.symbol]?.change || pair.change) >= 0 ? 'positive' : 'negative'}`}>
                    {(priceData[pair.symbol]?.change || pair.change) >= 0 ? '+' : ''}{(priceData[pair.symbol]?.change || pair.change).toFixed(2)}%
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Center - Chart and Trading */}
        <div className="trading-center">
          {/* Price Header */}
          <div className="price-header">
            <div className="current-pair">
              <span className="pair-icon">{currentPair?.icon}</span>
              <span className="pair-symbol">{selectedPair}</span>
              <span className="pair-name">{currentPair?.name}</span>
            </div>
            
            <div className="price-stats">
              <div className="main-price">
                <span className="price">${(currentPriceData.price || currentPair?.price || 0).toFixed(4)}</span>
                <span className={`change ${(currentPriceData.change || currentPair?.change || 0) >= 0 ? 'positive' : 'negative'}`}>
                  {(currentPriceData.change || currentPair?.change || 0) >= 0 ? '+' : ''}{(currentPriceData.change || currentPair?.change || 0).toFixed(2)}%
                </span>
              </div>
              
              <div className="price-details">
                <div className="stat">
                  <span className="label">24h High</span>
                  <span className="value">${(currentPriceData.high || 0).toFixed(4)}</span>
                </div>
                <div className="stat">
                  <span className="label">24h Low</span>
                  <span className="value">${(currentPriceData.low || 0).toFixed(4)}</span>
                </div>
                <div className="stat">
                  <span className="label">24h Volume</span>
                  <span className="value">${(currentPriceData.volume || 0).toLocaleString()}</span>
                </div>
              </div>
            </div>

            <div className="privacy-status">
              <div className="privacy-badge">
                <span className="privacy-icon">{privacyModes.find(m => m.id === privacyMode)?.icon}</span>
                <span className="privacy-text">{privacyModes.find(m => m.id === privacyMode)?.name} Mode</span>
              </div>
              <div className="mev-protection">
                <span className="shield-icon">🛡️</span>
                <span>MEV Protected</span>
              </div>
            </div>
          </div>

          {/* Chart */}
          <div className="chart-container">
            <div className="chart-header">
              <div className="chart-controls">
                <button 
                  className={`chart-type ${chartType === 'line' ? 'active' : ''}`}
                  onClick={() => setChartType('line')}
                >
                  Line
                </button>
                <button 
                  className={`chart-type ${chartType === 'candles' ? 'active' : ''}`}
                  onClick={() => setChartType('candles')}
                >
                  Candles
                </button>
                <button className="chart-type">Depth</button>
              </div>
              
              <div className="timeframe-controls">
                {['1m', '5m', '15m', '1h', '4h', '1d'].map(tf => (
                  <button key={tf} className="timeframe-btn">
                    {tf}
                  </button>
                ))}
              </div>
            </div>
            
            <div className="chart-area">
              <ResponsiveContainer width="100%" height={400}>
                {chartType === 'line' ? (
                  <AreaChart data={chartData}>
                    <defs>
                      <linearGradient id="priceGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#00d4aa" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#00d4aa" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#2a2a2a" />
                    <XAxis 
                      dataKey="time" 
                      tickFormatter={(time) => new Date(time).toLocaleTimeString()}
                      stroke="#888"
                    />
                    <YAxis 
                      domain={['dataMin - 0.01', 'dataMax + 0.01']}
                      tickFormatter={(value) => `$${value.toFixed(4)}`}
                      stroke="#888"
                    />
                    <Tooltip 
                      labelFormatter={(time) => new Date(time).toLocaleString()}
                      formatter={(value) => [`$${value.toFixed(4)}`, 'Price']}
                      contentStyle={{
                        backgroundColor: '#1a1a1a',
                        border: '1px solid #333',
                        borderRadius: '8px'
                      }}
                    />
                    <Area 
                      type="monotone" 
                      dataKey="price" 
                      stroke="#00d4aa" 
                      strokeWidth={2}
                      fill="url(#priceGradient)" 
                    />
                  </AreaChart>
                ) : (
                  <CandlestickChart data={candlestickData} />
                )}
              </ResponsiveContainer>
            </div>
          </div>

          {/* Trading Panel */}
          <div className="trading-panel">
            <div className="panel-tabs">
              <button className="tab-btn active">Spot</button>
              <button className="tab-btn">Margin</button>
              <button className="tab-btn">Futures</button>
            </div>

            <div className="trading-forms">
              {/* Buy Form */}
              <div className="trading-form buy-form">
                <div className="form-header">
                  <h4>Buy {selectedPair.split('/')[0]}</h4>
                  <div className="balance">Balance: 1,234.56 USDC</div>
                </div>

                <div className="order-type-selector">
                  <button 
                    className={`order-type-btn ${orderType === 'limit' ? 'active' : ''}`}
                    onClick={() => setOrderType('limit')}
                  >
                    Limit
                  </button>
                  <button 
                    className={`order-type-btn ${orderType === 'market' ? 'active' : ''}`}
                    onClick={() => setOrderType('market')}
                  >
                    Market
                  </button>
                </div>

                <div className="form-fields">
                  {orderType === 'limit' && (
                    <div className="field">
                      <label>Price (USDC)</label>
                      <input 
                        type="number" 
                        placeholder="0.00"
                        defaultValue={(currentPriceData.price || currentPair?.price || 0).toFixed(4)}
                      />
                    </div>
                  )}
                  
                  <div className="field">
                    <label>Amount ({selectedPair.split('/')[0]})</label>
                    <input type="number" placeholder="0.00" />
                  </div>

                  <div className="percentage-buttons">
                    {['25%', '50%', '75%', '100%'].map(pct => (
                      <button key={pct} className="pct-btn">{pct}</button>
                    ))}
                  </div>

                  <div className="field">
                    <label>Total (USDC)</label>
                    <input type="number" placeholder="0.00" />
                  </div>
                </div>

                <button className="trade-btn buy-btn">
                  Buy {selectedPair.split('/')[0]}
                </button>
              </div>

              {/* Sell Form */}
              <div className="trading-form sell-form">
                <div className="form-header">
                  <h4>Sell {selectedPair.split('/')[0]}</h4>
                  <div className="balance">Balance: 12.34 {selectedPair.split('/')[0]}</div>
                </div>

                <div className="order-type-selector">
                  <button 
                    className={`order-type-btn ${orderType === 'limit' ? 'active' : ''}`}
                    onClick={() => setOrderType('limit')}
                  >
                    Limit
                  </button>
                  <button 
                    className={`order-type-btn ${orderType === 'market' ? 'active' : ''}`}
                    onClick={() => setOrderType('market')}
                  >
                    Market
                  </button>
                </div>

                <div className="form-fields">
                  {orderType === 'limit' && (
                    <div className="field">
                      <label>Price (USDC)</label>
                      <input 
                        type="number" 
                        placeholder="0.00"
                        defaultValue={(currentPriceData.price || currentPair?.price || 0).toFixed(4)}
                      />
                    </div>
                  )}
                  
                  <div className="field">
                    <label>Amount ({selectedPair.split('/')[0]})</label>
                    <input type="number" placeholder="0.00" />
                  </div>

                  <div className="percentage-buttons">
                    {['25%', '50%', '75%', '100%'].map(pct => (
                      <button key={pct} className="pct-btn">{pct}</button>
                    ))}
                  </div>

                  <div className="field">
                    <label>Total (USDC)</label>
                    <input type="number" placeholder="0.00" />
                  </div>
                </div>

                <button className="trade-btn sell-btn">
                  Sell {selectedPair.split('/')[0]}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Right Sidebar - Order Book & Trades */}
        <div className="market-data-sidebar">
          {/* Order Book */}
          <div className="order-book">
            <div className="section-header">
              <h4>Order Book</h4>
              <div className="book-controls">
                <button className="book-view active" title="Both">⚌</button>
                <button className="book-view" title="Asks">▲</button>
                <button className="book-view" title="Bids">▼</button>
              </div>
            </div>

            <div className="book-headers">
              <span>Price (USDC)</span>
              <span>Amount</span>
              <span>Total</span>
            </div>

            <div className="book-content">
              {/* Asks (Sell Orders) */}
              <div className="asks">
                {orderBook.asks.slice().reverse().map((ask, index) => (
                  <div key={index} className="book-row ask-row">
                    <span className="price">{ask.price.toFixed(4)}</span>
                    <span className="amount">{ask.amount.toFixed(2)}</span>
                    <span className="total">{ask.total.toFixed(2)}</span>
                    <div 
                      className="depth-bar ask-bar" 
                      style={{ width: `${(ask.total / Math.max(...orderBook.asks.map(a => a.total))) * 100}%` }}
                    ></div>
                  </div>
                ))}
              </div>

              {/* Spread */}
              <div className="spread">
                <div className="spread-value">
                  Spread: {orderBook.asks.length && orderBook.bids.length ? 
                    (orderBook.asks[0].price - orderBook.bids[0].price).toFixed(4) : '0.0000'
                  }
                </div>
              </div>

              {/* Bids (Buy Orders) */}
              <div className="bids">
                {orderBook.bids.map((bid, index) => (
                  <div key={index} className="book-row bid-row">
                    <span className="price">{bid.price.toFixed(4)}</span>
                    <span className="amount">{bid.amount.toFixed(2)}</span>
                    <span className="total">{bid.total.toFixed(2)}</span>
                    <div 
                      className="depth-bar bid-bar" 
                      style={{ width: `${(bid.total / Math.max(...orderBook.bids.map(b => b.total))) * 100}%` }}
                    ></div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Recent Trades */}
          <div className="recent-trades">
            <div className="section-header">
              <h4>Recent Trades</h4>
            </div>

            <div className="trades-headers">
              <span>Price (USDC)</span>
              <span>Amount</span>
              <span>Time</span>
            </div>

            <div className="trades-content">
              {recentTrades.map(trade => (
                <div key={trade.id} className={`trade-row ${trade.side}`}>
                  <span className="price">{trade.price.toFixed(4)}</span>
                  <span className="amount">{trade.amount.toFixed(2)}</span>
                  <span className="time">{trade.time}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="trading-footer">
        <div className="footer-left">
          <div className="network-status">
            <span className="network-icon">🔐</span>
            <span>Secret Network</span>
            <div className="status-dot connected"></div>
          </div>
          <div className="privacy-info">
            Privacy-Optional • Lightning Fast • Trustless
          </div>
        </div>
        
        <div className="footer-right">
          <div className="snip-token-info">
            <span className="token-icon">💎</span>
            <span>$SNIP Token Coming Soon</span>
            <button className="learn-more-btn">Learn More</button>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ProfessionalTradingApp;

