import React, { useState, useEffect } from 'react';
import './CleanSnipSwap.css';

const CleanSnipSwapDEX = () => {
  const [selectedPair, setSelectedPair] = useState('ATOM/USDC');
  const [timeframe, setTimeframe] = useState('1d');
  const [showIndicators, setShowIndicators] = useState(false);
  const [indicatorType, setIndicatorType] = useState('VWAP-MACD');
  const [activeTab, setActiveTab] = useState('Chart');
  const [activeBottomTab, setActiveBottomTab] = useState('Open Orders');
  
  const [marketData, setMarketData] = useState({
    price: 4.6376,
    change: 2.25,
    changeAmount: 0.1024,
    volume24h: 99800000,
    high24h: 4.8615,
    low24h: 4.3985,
    volumeUSDT: 119800000
  });

  // Real SnipSwap Logo Component
  const SnipSwapLogo = ({ size = 32 }) => (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none">
      {/* Hexagonal Border */}
      <path 
        d="M50 8 L80 26 L80 62 L50 80 L20 62 L20 26 Z" 
        stroke="#f0b90b" 
        strokeWidth="3" 
        fill="none"
      />
      
      {/* Lock Body */}
      <rect 
        x="38" 
        y="48" 
        width="24" 
        height="20" 
        rx="3" 
        fill="#f0b90b"
      />
      
      {/* Lock Shackle */}
      <path 
        d="M43 48 L43 42 C43 38 46 35 50 35 C54 35 57 38 57 42 L57 48" 
        stroke="#f0b90b" 
        strokeWidth="2.5" 
        fill="none"
      />
      
      {/* Keyhole */}
      <circle cx="50" cy="56" r="2.5" fill="white" />
      <rect x="49" y="56" width="2" height="6" fill="white" />
      
      {/* Connection Nodes */}
      <circle cx="15" cy="44" r="3" fill="#f0b90b" />
      <circle cx="85" cy="44" r="3" fill="#f0b90b" />
      <circle cx="32" cy="20" r="2" fill="#f0b90b" />
      <circle cx="68" cy="20" r="2" fill="#f0b90b" />
      
      {/* Connection Lines */}
      <line x1="18" y1="44" x2="20" y2="44" stroke="#f0b90b" strokeWidth="2" />
      <line x1="80" y1="44" x2="82" y2="44" stroke="#f0b90b" strokeWidth="2" />
      <line x1="30" y1="22" x2="20" y2="30" stroke="#f0b90b" strokeWidth="1.5" />
      <line x1="70" y1="22" x2="80" y2="30" stroke="#f0b90b" strokeWidth="1.5" />
    </svg>
  );

  // Generate realistic chart data
  const generateChartData = () => {
    const data = [];
    let basePrice = 4.3985;
    const now = Date.now();
    
    for (let i = 0; i < 50; i++) {
      const timestamp = now - (49 - i) * 3600000; // 1 hour intervals
      const volatility = 0.02;
      const change = (Math.random() - 0.5) * volatility;
      
      const open = basePrice;
      const close = basePrice + change;
      const high = Math.max(open, close) + Math.random() * 0.01;
      const low = Math.min(open, close) - Math.random() * 0.01;
      const volume = 1000000 + Math.random() * 2000000;
      
      data.push({
        timestamp,
        open,
        high,
        low,
        close,
        volume
      });
      
      basePrice = close;
    }
    
    return data;
  };

  const chartData = generateChartData();

  // Chart Canvas Component
  const ChartCanvas = () => {
    const canvasRef = React.useRef(null);
    
    React.useEffect(() => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      
      const ctx = canvas.getContext('2d');
      const { width, height } = canvas;
      
      // Clear canvas
      ctx.fillStyle = '#1a1a1a';
      ctx.fillRect(0, 0, width, height);
      
      // Chart dimensions
      const chartWidth = width - 80;
      const chartHeight = height - 100;
      const chartX = 10;
      const chartY = 20;
      
      // Price range
      const prices = chartData.flatMap(d => [d.high, d.low]);
      const minPrice = Math.min(...prices) * 0.999;
      const maxPrice = Math.max(...prices) * 1.001;
      const priceRange = maxPrice - minPrice;
      
      // Draw grid lines
      ctx.strokeStyle = '#333';
      ctx.lineWidth = 0.5;
      
      // Horizontal grid lines (price levels)
      for (let i = 0; i <= 5; i++) {
        const y = chartY + (chartHeight * i) / 5;
        ctx.beginPath();
        ctx.moveTo(chartX, y);
        ctx.lineTo(chartX + chartWidth, y);
        ctx.stroke();
        
        // Price labels
        const price = maxPrice - (priceRange * i) / 5;
        ctx.fillStyle = '#888';
        ctx.font = '10px Arial';
        ctx.textAlign = 'left';
        ctx.fillText(price.toFixed(2), chartX + chartWidth + 5, y + 3);
      }
      
      // Vertical grid lines
      for (let i = 0; i <= 6; i++) {
        const x = chartX + (chartWidth * i) / 6;
        ctx.beginPath();
        ctx.moveTo(x, chartY);
        ctx.lineTo(x, chartY + chartHeight);
        ctx.stroke();
      }
      
      // Draw candlesticks
      const candleWidth = chartWidth / chartData.length * 0.7;
      
      chartData.forEach((candle, index) => {
        const x = chartX + (chartWidth * index) / chartData.length + candleWidth / 4;
        const openY = chartY + chartHeight - ((candle.open - minPrice) / priceRange) * chartHeight;
        const closeY = chartY + chartHeight - ((candle.close - minPrice) / priceRange) * chartHeight;
        const highY = chartY + chartHeight - ((candle.high - minPrice) / priceRange) * chartHeight;
        const lowY = chartY + chartHeight - ((candle.low - minPrice) / priceRange) * chartHeight;
        
        const isGreen = candle.close > candle.open;
        ctx.fillStyle = isGreen ? '#26a69a' : '#ef5350';
        ctx.strokeStyle = isGreen ? '#26a69a' : '#ef5350';
        ctx.lineWidth = 1;
        
        // Draw wick
        ctx.beginPath();
        ctx.moveTo(x + candleWidth / 2, highY);
        ctx.lineTo(x + candleWidth / 2, lowY);
        ctx.stroke();
        
        // Draw body
        const bodyTop = Math.min(openY, closeY);
        const bodyHeight = Math.abs(closeY - openY);
        ctx.fillRect(x, bodyTop, candleWidth, Math.max(bodyHeight, 1));
      });
      
      // Draw VWAP if indicators are shown
      if (showIndicators) {
        ctx.strokeStyle = '#2196f3';
        ctx.lineWidth = 2;
        ctx.beginPath();
        
        chartData.forEach((candle, index) => {
          const x = chartX + (chartWidth * index) / chartData.length + candleWidth / 2;
          const vwapPrice = (candle.high + candle.low + candle.close) / 3; // Simplified VWAP
          const y = chartY + chartHeight - ((vwapPrice - minPrice) / priceRange) * chartHeight;
          
          if (index === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        });
        ctx.stroke();
        
        // VWAP label
        ctx.fillStyle = '#2196f3';
        ctx.font = '10px Arial';
        ctx.fillText('VWAP(14)', chartX + 5, chartY + 15);
      }
      
      // Current price line
      const currentPriceY = chartY + chartHeight - ((marketData.price - minPrice) / priceRange) * chartHeight;
      ctx.strokeStyle = '#26a69a';
      ctx.lineWidth = 1;
      ctx.setLineDash([5, 5]);
      ctx.beginPath();
      ctx.moveTo(chartX, currentPriceY);
      ctx.lineTo(chartX + chartWidth, currentPriceY);
      ctx.stroke();
      ctx.setLineDash([]);
      
      // Current price label
      ctx.fillStyle = '#26a69a';
      ctx.fillRect(chartX + chartWidth + 2, currentPriceY - 8, 50, 16);
      ctx.fillStyle = 'white';
      ctx.font = 'bold 10px Arial';
      ctx.textAlign = 'center';
      ctx.fillText(marketData.price.toFixed(4), chartX + chartWidth + 27, currentPriceY + 3);
      
    }, [showIndicators]);
    
    return (
      <canvas 
        ref={canvasRef}
        width={350}
        height={300}
        style={{ width: '100%', height: '300px' }}
      />
    );
  };

  // MACD Indicator Component
  const MACDIndicator = () => {
    if (!showIndicators) return null;
    
    return (
      <div className="macd-indicator">
        <canvas 
          width={350}
          height={80}
          style={{ width: '100%', height: '80px' }}
          ref={(canvas) => {
            if (!canvas) return;
            const ctx = canvas.getContext('2d');
            const { width, height } = canvas;
            
            // Clear
            ctx.fillStyle = '#1a1a1a';
            ctx.fillRect(0, 0, width, height);
            
            // Draw MACD histogram
            const barWidth = width / chartData.length;
            chartData.forEach((_, index) => {
              const x = index * barWidth;
              const macdValue = (Math.random() - 0.5) * 0.02;
              const barHeight = Math.abs(macdValue) * height * 50;
              const y = height / 2 - (macdValue > 0 ? barHeight : 0);
              
              ctx.fillStyle = macdValue > 0 ? '#26a69a' : '#ef5350';
              ctx.fillRect(x, y, barWidth * 0.8, Math.abs(barHeight));
            });
            
            // MACD and Signal lines
            ctx.strokeStyle = '#e91e63';
            ctx.lineWidth = 1;
            ctx.beginPath();
            chartData.forEach((_, index) => {
              const x = index * barWidth + barWidth / 2;
              const y = height / 2 + Math.sin(index * 0.3) * 10;
              if (index === 0) ctx.moveTo(x, y);
              else ctx.lineTo(x, y);
            });
            ctx.stroke();
            
            ctx.strokeStyle = '#9c27b0';
            ctx.beginPath();
            chartData.forEach((_, index) => {
              const x = index * barWidth + barWidth / 2;
              const y = height / 2 + Math.sin(index * 0.3 + 0.5) * 8;
              if (index === 0) ctx.moveTo(x, y);
              else ctx.lineTo(x, y);
            });
            ctx.stroke();
          }}
        />
      </div>
    );
  };

  const formatNumber = (num) => {
    if (num >= 1e9) return (num / 1e9).toFixed(2) + 'B';
    if (num >= 1e6) return (num / 1e6).toFixed(1) + 'M';
    if (num >= 1e3) return (num / 1e3).toFixed(1) + 'K';
    return num.toFixed(2);
  };

  return (
    <div className="clean-dex">
      {/* Header */}
      <header className="clean-header">
        <div className="header-left">
          <SnipSwapLogo size={32} />
          <span className="brand-text">SnipSwap</span>
        </div>
        <div className="header-right">
          <button className="menu-btn">☰</button>
        </div>
      </header>

      {/* Price Section */}
      <div className="price-section">
        <div className="pair-selector">
          <select value={selectedPair} onChange={(e) => setSelectedPair(e.target.value)}>
            <option>⚛️ ATOM/USDC</option>
            <option>🔐 SCRT/USDC</option>
            <option>🌊 OSMO/USDC</option>
            <option>₿ BTC/USDC</option>
            <option>Ξ ETH/USDC</option>
          </select>
        </div>

        <div className="price-display">
          <div className="main-price">{marketData.price.toFixed(4)}</div>
          <div className="price-usd">${marketData.price.toFixed(4)}</div>
        </div>

        <div className="stats-grid">
          <div className="stat-item">
            <span className="stat-label">24h Change</span>
            <span className="stat-value positive">
              {formatNumber(marketData.changeAmount)} +{marketData.change.toFixed(2)}%
            </span>
          </div>
          <div className="stat-item">
            <span className="stat-label">24h High</span>
            <span className="stat-value">{marketData.high24h.toFixed(2)}</span>
          </div>
          <div className="stat-item">
            <span className="stat-label">24h Low</span>
            <span className="stat-value">{marketData.low24h.toFixed(2)}</span>
          </div>
          <div className="stat-item">
            <span className="stat-label">24h Volume</span>
            <span className="stat-value">{formatNumber(marketData.volumeUSDT)} USDT</span>
          </div>
        </div>
      </div>

      {/* Chart Tabs */}
      <div className="chart-tabs">
        {['Chart', 'Order Book', 'Trades'].map(tab => (
          <button 
            key={tab}
            className={`chart-tab ${activeTab === tab ? 'active' : ''}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Chart Controls */}
      <div className="chart-controls">
        <div className="timeframe-control">
          <select value={timeframe} onChange={(e) => setTimeframe(e.target.value)}>
            <option value="1m">1m</option>
            <option value="5m">5m</option>
            <option value="15m">15m</option>
            <option value="1h">1h</option>
            <option value="4h">4h</option>
            <option value="1d">1d</option>
          </select>
        </div>

        <div className="indicator-controls">
          {showIndicators && (
            <select value={indicatorType} onChange={(e) => setIndicatorType(e.target.value)}>
              <option value="VWAP-MACD">VWAP-MACD</option>
              <option value="RSI">RSI</option>
              <option value="MA">Moving Averages</option>
            </select>
          )}
          <button 
            className="indicator-toggle"
            onClick={() => setShowIndicators(!showIndicators)}
          >
            {showIndicators ? 'Hide' : 'Show'} Indicators
          </button>
        </div>

        <div className="depth-label">Depth</div>
      </div>

      {/* Chart Area */}
      <div className="chart-area">
        {showIndicators && (
          <div className="indicator-label">VWAP(14)</div>
        )}
        <ChartCanvas />
        <MACDIndicator />
      </div>

      {/* Bottom Tabs */}
      <div className="bottom-tabs">
        {['Open Orders (0)', 'Order History', 'Trade History', 'Funds'].map(tab => (
          <button 
            key={tab}
            className={`bottom-tab ${activeBottomTab === tab ? 'active' : ''}`}
            onClick={() => setActiveBottomTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Trading Buttons */}
      <div className="trading-buttons">
        <button className="buy-btn">BUY</button>
        <button className="sell-btn">SELL</button>
      </div>
    </div>
  );
};

export default CleanSnipSwapDEX;

