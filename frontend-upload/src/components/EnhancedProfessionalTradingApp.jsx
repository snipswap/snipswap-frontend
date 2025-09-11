import React, { useState, useEffect, useRef } from 'react';
import { LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, ComposedChart } from 'recharts';

const EnhancedProfessionalTradingApp = () => {
  const [selectedPair, setSelectedPair] = useState('ATOM/USDC');
  const [orderType, setOrderType] = useState('limit');
  const [privacyMode, setPrivacyMode] = useState('private');
  const [chartType, setChartType] = useState('candlestick');
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

  // Privacy modes with fee discounts
  const privacyModes = [
    { 
      id: 'public', 
      name: 'Public', 
      desc: 'Visible on-chain', 
      icon: '👁️',
      fee: '0.30%',
      discount: '0%',
      mevProtection: 25,
      color: '#64748b'
    },
    { 
      id: 'private', 
      name: 'Private', 
      desc: 'Secret Network', 
      icon: '🔒',
      fee: '0.25%',
      discount: '17%',
      mevProtection: 70,
      color: '#3b82f6'
    },
    { 
      id: 'stealth', 
      name: 'Stealth', 
      desc: 'Maximum privacy', 
      icon: '👤',
      fee: '0.20%',
      discount: '33%',
      mevProtection: 95,
      color: '#8b5cf6'
    }
  ];

  // Initialize candlestick data
  useEffect(() => {
    const initialCandlestickData = [
      { time: '4:30:14 PM', open: 4.58, high: 4.62, low: 4.55, close: 4.60, volume: 1250000 },
      { time: '4:31:14 PM', open: 4.60, high: 4.65, low: 4.58, close: 4.63, volume: 980000 },
      { time: '4:32:14 PM', open: 4.63, high: 4.68, low: 4.61, close: 4.65, volume: 1100000 },
      { time: '4:33:14 PM', open: 4.65, high: 4.70, low: 4.63, close: 4.68, volume: 1350000 },
      { time: '4:34:14 PM', open: 4.68, high: 4.72, low: 4.66, close: 4.70, volume: 1200000 },
      { time: '4:35:14 PM', open: 4.70, high: 4.75, low: 4.68, close: 4.73, volume: 1450000 },
      { time: '4:36:14 PM', open: 4.73, high: 4.78, low: 4.71, close: 4.76, volume: 1300000 },
      { time: '4:37:14 PM', open: 4.76, high: 4.80, low: 4.74, close: 4.78, volume: 1150000 },
      { time: '4:38:14 PM', open: 4.78, high: 4.82, low: 4.76, close: 4.80, volume: 1400000 },
      { time: '4:39:14 PM', open: 4.80, high: 4.85, low: 4.78, close: 4.83, volume: 1600000 },
    ];
    setCandlestickData(initialCandlestickData);
  }, []);

  // WebSocket connection for real-time data
  useEffect(() => {
    const connectWebSocket = () => {
      try {
        setIsConnected(true);
        
        // Simulate real-time price updates
        const interval = setInterval(() => {
          updatePrices();
          updateOrderBook();
          updateRecentTrades();
          updateChartData();
          updateCandlestickData();
        }, 2000);

        return () => clearInterval(interval);
      } catch (error) {
        console.error('WebSocket connection failed:', error);
        setIsConnected(false);
      }
    };

    const cleanup = connectWebSocket();
    return cleanup;
  }, []);

  const updatePrices = () => {
    const newPrices = {};
    tradingPairs.forEach(pair => {
      const currentPrice = pair.price;
      const variation = (Math.random() - 0.5) * 0.02; // ±1% variation
      newPrices[pair.symbol] = {
        price: currentPrice * (1 + variation),
        change: pair.change + (Math.random() - 0.5) * 0.5,
        volume: Math.floor(Math.random() * 10000000) + 1000000
      };
    });
    setPriceData(newPrices);
  };

  const updateOrderBook = () => {
    const currentPrice = 4.5989;
    const bids = [];
    const asks = [];
    
    // Generate realistic order book data
    for (let i = 0; i < 15; i++) {
      bids.push({
        price: (currentPrice - (i + 1) * 0.0001).toFixed(4),
        amount: Math.floor(Math.random() * 5000) + 100,
        total: 0
      });
      
      asks.push({
        price: (currentPrice + (i + 1) * 0.0001).toFixed(4),
        amount: Math.floor(Math.random() * 5000) + 100,
        total: 0
      });
    }
    
    setOrderBook({ bids, asks });
  };

  const updateRecentTrades = () => {
    const trades = [];
    const currentPrice = 4.5989;
    
    for (let i = 0; i < 20; i++) {
      const variation = (Math.random() - 0.5) * 0.001;
      const price = currentPrice + variation;
      const amount = Math.floor(Math.random() * 1000) + 10;
      const side = Math.random() > 0.5 ? 'buy' : 'sell';
      
      trades.push({
        price: price.toFixed(4),
        amount: amount.toFixed(2),
        side,
        time: new Date(Date.now() - i * 1000).toLocaleTimeString()
      });
    }
    
    setRecentTrades(trades);
  };

  const updateChartData = () => {
    const newData = [];
    const basePrice = 4.5989;
    
    for (let i = 0; i < 50; i++) {
      const time = new Date(Date.now() - (49 - i) * 60000);
      const variation = Math.sin(i * 0.1) * 0.02 + (Math.random() - 0.5) * 0.01;
      newData.push({
        time: time.toLocaleTimeString(),
        price: basePrice * (1 + variation),
        volume: Math.floor(Math.random() * 1000000) + 500000
      });
    }
    
    setChartData(newData);
  };

  const updateCandlestickData = () => {
    setCandlestickData(prev => {
      const newCandle = { ...prev[prev.length - 1] };
      const variation = (Math.random() - 0.5) * 0.02;
      newCandle.close = newCandle.close * (1 + variation);
      newCandle.high = Math.max(newCandle.high, newCandle.close);
      newCandle.low = Math.min(newCandle.low, newCandle.close);
      newCandle.volume = Math.floor(Math.random() * 2000000) + 500000;
      
      const updated = [...prev];
      updated[updated.length - 1] = newCandle;
      return updated;
    });
  };

  const getCurrentPrivacyMode = () => {
    return privacyModes.find(mode => mode.id === privacyMode);
  };

  // Custom Candlestick component for Recharts
  const CandlestickBar = (props) => {
    const { payload, x, y, width, height } = props;
    if (!payload) return null;
    
    const { open, high, low, close } = payload;
    const isGreen = close > open;
    const color = isGreen ? '#00d4aa' : '#f84960';
    
    const yScale = height / (high - low);
    const bodyTop = y + (high - Math.max(open, close)) * yScale;
    const bodyHeight = Math.abs(close - open) * yScale;
    const wickX = x + width / 2;
    
    return (
      <g>
        {/* Wick */}
        <line
          x1={wickX}
          y1={y + (high - high) * yScale}
          x2={wickX}
          y2={y + (high - low) * yScale}
          stroke={color}
          strokeWidth={1}
        />
        {/* Body */}
        <rect
          x={x + width * 0.2}
          y={bodyTop}
          width={width * 0.6}
          height={Math.max(bodyHeight, 1)}
          fill={isGreen ? color : 'transparent'}
          stroke={color}
          strokeWidth={isGreen ? 0 : 1}
        />
      </g>
    );
  };

  return (
    <div className="trading-app">
      {/* Header */}
      <div className="header">
        <div className="header-left">
          <div className="logo">
            <div className="logo-icon">S</div>
            <span className="logo-text">SnipSwap</span>
          </div>
          <div className="header-info">
            <span className="tagline">Privacy-First Trading Platform</span>
            <div className="connection-status">
              <div className={`status-dot ${isConnected ? 'connected' : 'disconnected'}`}></div>
              <span>{isConnected ? 'Live Data' : 'Connecting...'}</span>
            </div>
          </div>
        </div>
        
        <div className="header-right">
          {/* Privacy Mode Selector */}
          <div className="privacy-selector">
            {privacyModes.map(mode => (
              <button
                key={mode.id}
                className={`privacy-mode ${privacyMode === mode.id ? 'active' : ''}`}
                onClick={() => setPrivacyMode(mode.id)}
                style={{
                  '--mode-color': mode.color,
                  backgroundColor: privacyMode === mode.id ? `${mode.color}20` : 'transparent',
                  borderColor: privacyMode === mode.id ? mode.color : 'transparent'
                }}
              >
                <span className="mode-icon">{mode.icon}</span>
                <span className="mode-name">{mode.name}</span>
              </button>
            ))}
          </div>
          
          {/* Privacy Benefits Display */}
          <div className="privacy-benefits">
            <div className="benefit-item">
              <span className="benefit-label">Fee</span>
              <span className="benefit-value" style={{ color: getCurrentPrivacyMode().color }}>
                {getCurrentPrivacyMode().fee}
              </span>
            </div>
            <div className="benefit-item">
              <span className="benefit-label">Discount</span>
              <span className="benefit-value discount">-{getCurrentPrivacyMode().discount}</span>
            </div>
            <div className="benefit-item">
              <span className="benefit-label">MEV Shield</span>
              <span className="benefit-value" style={{ color: getCurrentPrivacyMode().color }}>
                {getCurrentPrivacyMode().mevProtection}%
              </span>
            </div>
          </div>
          
          <button className="connect-wallet">Connect Wallet</button>
        </div>
      </div>

      <div className="main-content">
        {/* Left Sidebar - Markets */}
        <div className="sidebar-left">
          <div className="sidebar-header">
            <h3>Markets</h3>
          </div>
          
          <div className="markets-list">
            {tradingPairs.map(pair => (
              <div
                key={pair.symbol}
                className={`market-item ${selectedPair === pair.symbol ? 'selected' : ''}`}
                onClick={() => setSelectedPair(pair.symbol)}
              >
                <div className="market-info">
                  <div className="market-symbol">
                    <span className="market-icon">{pair.icon}</span>
                    <span className="symbol">{pair.symbol}</span>
                  </div>
                  <div className="market-name">{pair.name}</div>
                </div>
                <div className="market-data">
                  <div className="price">${pair.price.toLocaleString()}</div>
                  <div className={`change ${pair.change >= 0 ? 'positive' : 'negative'}`}>
                    {pair.change >= 0 ? '+' : ''}{pair.change.toFixed(2)}%
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Center - Chart */}
        <div className="chart-container">
          <div className="chart-header">
            <div className="pair-info">
              <h2 className="pair-name">{selectedPair}</h2>
              <div className="price-info">
                <span className="current-price">$4.6143</span>
                <span className="price-change positive">+1.37%</span>
              </div>
              <div className="market-stats">
                <span>24h High: $4.6288</span>
                <span>24h Low: $4.3600</span>
                <span>24h Volume: $726,703,458</span>
              </div>
            </div>
            
            <div className="chart-controls">
              <div className="chart-type-selector">
                <button
                  className={chartType === 'line' ? 'active' : ''}
                  onClick={() => setChartType('line')}
                >
                  Line
                </button>
                <button
                  className={chartType === 'candlestick' ? 'active' : ''}
                  onClick={() => setChartType('candlestick')}
                >
                  Candles
                </button>
              </div>
              
              <div className="timeframe-selector">
                {['1m', '5m', '15m', '1h', '4h', '1d', '7d'].map(tf => (
                  <button key={tf} className="timeframe-btn">{tf}</button>
                ))}
              </div>
            </div>
          </div>
          
          <div className="chart-area">
            <ResponsiveContainer width="100%" height="100%">
              {chartType === 'candlestick' ? (
                <ComposedChart data={candlestickData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#2a2a2a" />
                  <XAxis 
                    dataKey="time" 
                    stroke="#888"
                    fontSize={12}
                  />
                  <YAxis 
                    domain={['dataMin - 0.01', 'dataMax + 0.01']}
                    stroke="#888"
                    fontSize={12}
                  />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#1a1a1a', 
                      border: '1px solid #333',
                      borderRadius: '4px',
                      color: '#fff'
                    }}
                    formatter={(value, name) => [
                      `$${value.toFixed(4)}`,
                      name.toUpperCase()
                    ]}
                  />
                  <Bar dataKey="close" fill="#00d4aa" />
                </ComposedChart>
              ) : (
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
                    stroke="#888"
                    fontSize={12}
                  />
                  <YAxis 
                    domain={['dataMin - 0.01', 'dataMax + 0.01']}
                    stroke="#888"
                    fontSize={12}
                  />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#1a1a1a', 
                      border: '1px solid #333',
                      borderRadius: '4px',
                      color: '#fff'
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
              )}
            </ResponsiveContainer>
          </div>
        </div>

        {/* Right Sidebar - Order Book & Trading */}
        <div className="sidebar-right">
          <div className="privacy-mode-display">
            <div 
              className="privacy-card"
              style={{ 
                backgroundColor: `${getCurrentPrivacyMode().color}15`,
                borderColor: getCurrentPrivacyMode().color
              }}
            >
              <div className="privacy-header">
                <span className="privacy-icon">{getCurrentPrivacyMode().icon}</span>
                <span className="privacy-name">{getCurrentPrivacyMode().name} Mode</span>
                <div className="privacy-status">
                  <div 
                    className="status-indicator"
                    style={{ backgroundColor: getCurrentPrivacyMode().color }}
                  ></div>
                  <span>Active</span>
                </div>
              </div>
              <p className="privacy-description">{getCurrentPrivacyMode().desc}</p>
              <div className="privacy-stats">
                <div className="stat">
                  <span className="stat-label">Fee</span>
                  <span className="stat-value">{getCurrentPrivacyMode().fee}</span>
                </div>
                <div className="stat">
                  <span className="stat-label">Savings</span>
                  <span className="stat-value discount">-{getCurrentPrivacyMode().discount}</span>
                </div>
                <div className="stat">
                  <span className="stat-label">MEV Shield</span>
                  <span className="stat-value">{getCurrentPrivacyMode().mevProtection}%</span>
                </div>
              </div>
            </div>
          </div>

          <div className="order-book">
            <div className="section-header">
              <h3>Order Book</h3>
            </div>
            
            <div className="order-book-content">
              <div className="asks">
                <div className="book-header">
                  <span>Price (USDC)</span>
                  <span>Amount (ATOM)</span>
                  <span>Total</span>
                </div>
                {orderBook.asks.slice(0, 8).reverse().map((ask, i) => (
                  <div key={i} className="order-row ask">
                    <span className="price">{ask.price}</span>
                    <span className="amount">{ask.amount}</span>
                    <span className="total">{(ask.price * ask.amount).toFixed(2)}</span>
                  </div>
                ))}
              </div>
              
              <div className="spread">
                <span className="spread-value">$4.6143</span>
                <span className="spread-label">Spread: $0.0002</span>
              </div>
              
              <div className="bids">
                {orderBook.bids.slice(0, 8).map((bid, i) => (
                  <div key={i} className="order-row bid">
                    <span className="price">{bid.price}</span>
                    <span className="amount">{bid.amount}</span>
                    <span className="total">{(bid.price * bid.amount).toFixed(2)}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="recent-trades">
            <div className="section-header">
              <h3>Recent Trades</h3>
            </div>
            
            <div className="trades-content">
              <div className="trades-header">
                <span>Price (USDC)</span>
                <span>Amount (ATOM)</span>
                <span>Time</span>
              </div>
              {recentTrades.slice(0, 10).map((trade, i) => (
                <div key={i} className={`trade-row ${trade.side}`}>
                  <span className="price">{trade.price}</span>
                  <span className="amount">{trade.amount}</span>
                  <span className="time">{trade.time}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Trading Panel */}
      <div className="trading-panel">
        <div className="trading-forms">
          <div className="buy-form">
            <div className="form-header">
              <h4>Buy ATOM</h4>
              <span className="balance">Balance: 1,234.56 USDC</span>
            </div>
            
            <div className="form-content">
              <div className="input-group">
                <label>Price (USDC)</label>
                <input type="number" placeholder="4.6143" />
              </div>
              
              <div className="input-group">
                <label>Amount (ATOM)</label>
                <input type="number" placeholder="0.00" />
              </div>
              
              <div className="percentage-buttons">
                <button>25%</button>
                <button>50%</button>
                <button>75%</button>
                <button>100%</button>
              </div>
              
              <button className="buy-button">
                Buy ATOM
              </button>
              
              <div className="fee-info">
                <span>Fee: {getCurrentPrivacyMode().fee}</span>
                <span>MEV Shield: {getCurrentPrivacyMode().mevProtection}%</span>
              </div>
            </div>
          </div>

          <div className="sell-form">
            <div className="form-header">
              <h4>Sell ATOM</h4>
              <span className="balance">Balance: 0.24 ATOM</span>
            </div>
            
            <div className="form-content">
              <div className="input-group">
                <label>Price (USDC)</label>
                <input type="number" placeholder="4.6143" />
              </div>
              
              <div className="input-group">
                <label>Amount (ATOM)</label>
                <input type="number" placeholder="0.00" />
              </div>
              
              <div className="percentage-buttons">
                <button>25%</button>
                <button>50%</button>
                <button>75%</button>
                <button>100%</button>
              </div>
              
              <button className="sell-button">
                Sell ATOM
              </button>
              
              <div className="fee-info">
                <span>Fee: {getCurrentPrivacyMode().fee}</span>
                <span>MEV Shield: {getCurrentPrivacyMode().mevProtection}%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EnhancedProfessionalTradingApp;

