import React, { useState, useEffect, useRef } from 'react';
import './MobileBinanceApp.css';

const MobileBinanceApp = () => {
  const [selectedPair, setSelectedPair] = useState('ATOM/USDC');
  const [selectedTimeframe, setSelectedTimeframe] = useState('3M');
  const [currentPrice, setCurrentPrice] = useState(4.5542);
  const [priceChange, setPriceChange] = useState(1.38);
  const [chartData, setChartData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const canvasRef = useRef(null);

  const timeframes = [
    { label: '1D', value: '1D' },
    { label: '7D', value: '7D' },
    { label: '1M', value: '1M' },
    { label: '3M', value: '3M', active: true },
    { label: '1Y', value: '1Y' },
    { label: 'YTD', value: 'YTD' }
  ];

  const tradingTimeframes = [
    '1m', '5m', '15m', '30m', '1h', '4h', '12h', '1d'
  ];

  const tradingPairs = [
    { symbol: 'ATOM/USDC', name: 'Cosmos', icon: '⚛️', price: 4.5542, change: 1.38 },
    { symbol: 'SCRT/USDC', name: 'Secret Network', icon: '🔐', price: 0.1959, change: -0.25 },
    { symbol: 'OSMO/USDC', name: 'Osmosis', icon: '🌊', price: 0.1679, change: 2.03 },
    { symbol: 'BTC/USDC', name: 'Bitcoin', icon: '₿', price: 115270.09, change: 9.69 },
    { symbol: 'ETH/USDC', name: 'Ethereum', icon: 'Ξ', price: 4319.17, change: -0.07 }
  ];

  // Generate realistic chart data
  const generateChartData = (timeframe, basePrice) => {
    const points = timeframe === '1D' ? 24 : timeframe === '7D' ? 168 : timeframe === '1M' ? 720 : timeframe === '3M' ? 2160 : timeframe === '1Y' ? 8760 : 1000;
    const data = [];
    let price = basePrice * 0.85; // Start lower for upward trend
    
    for (let i = 0; i < points; i++) {
      const volatility = 0.02;
      const trend = 0.0001; // Slight upward trend
      const randomChange = (Math.random() - 0.5) * volatility;
      price = price * (1 + trend + randomChange);
      
      data.push({
        time: Date.now() - (points - i) * (timeframe === '1D' ? 3600000 : timeframe === '7D' ? 3600000 : timeframe === '1M' ? 3600000 : 3600000),
        price: price,
        volume: Math.random() * 1000000
      });
    }
    
    return data;
  };

  // Draw chart on canvas
  const drawChart = () => {
    const canvas = canvasRef.current;
    if (!canvas || chartData.length === 0) return;

    const ctx = canvas.getContext('2d');
    const { width, height } = canvas;
    
    // Clear canvas
    ctx.clearRect(0, 0, width, height);
    
    // Get price range
    const prices = chartData.map(d => d.price);
    const minPrice = Math.min(...prices);
    const maxPrice = Math.max(...prices);
    const priceRange = maxPrice - minPrice;
    
    // Draw grid lines
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
    ctx.lineWidth = 1;
    
    // Horizontal grid lines
    for (let i = 0; i <= 4; i++) {
      const y = (height * i) / 4;
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
      ctx.stroke();
    }
    
    // Vertical grid lines
    for (let i = 0; i <= 6; i++) {
      const x = (width * i) / 6;
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, height);
      ctx.stroke();
    }
    
    // Create gradient
    const gradient = ctx.createLinearGradient(0, 0, 0, height);
    gradient.addColorStop(0, 'rgba(240, 185, 11, 0.8)');
    gradient.addColorStop(0.5, 'rgba(240, 185, 11, 0.4)');
    gradient.addColorStop(1, 'rgba(240, 185, 11, 0.05)');
    
    // Draw area chart
    ctx.beginPath();
    ctx.moveTo(0, height);
    
    chartData.forEach((point, index) => {
      const x = (index / (chartData.length - 1)) * width;
      const y = height - ((point.price - minPrice) / priceRange) * height;
      
      if (index === 0) {
        ctx.lineTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
    });
    
    ctx.lineTo(width, height);
    ctx.closePath();
    ctx.fillStyle = gradient;
    ctx.fill();
    
    // Draw price line
    ctx.beginPath();
    ctx.strokeStyle = '#f0b90b';
    ctx.lineWidth = 2;
    
    chartData.forEach((point, index) => {
      const x = (index / (chartData.length - 1)) * width;
      const y = height - ((point.price - minPrice) / priceRange) * height;
      
      if (index === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
    });
    
    ctx.stroke();
    
    // Draw price labels on right side
    ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
    ctx.font = '12px -apple-system, BlinkMacSystemFont, sans-serif';
    ctx.textAlign = 'right';
    
    for (let i = 0; i <= 4; i++) {
      const price = maxPrice - (priceRange * i) / 4;
      const y = (height * i) / 4;
      const priceText = price > 1000 ? `${(price / 1000).toFixed(2)}K` : price.toFixed(3);
      
      // Background for price label
      const textWidth = ctx.measureText(priceText).width;
      ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
      ctx.fillRect(width - textWidth - 8, y - 8, textWidth + 6, 16);
      
      // Price text
      ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
      ctx.fillText(priceText, width - 4, y + 4);
    }
  };

  // Update chart data when timeframe or pair changes
  useEffect(() => {
    setIsLoading(true);
    const currentPairData = tradingPairs.find(p => p.symbol === selectedPair);
    const basePrice = currentPairData ? currentPairData.price : 4.5542;
    
    setTimeout(() => {
      const newData = generateChartData(selectedTimeframe, basePrice);
      setChartData(newData);
      setCurrentPrice(basePrice);
      setPriceChange(currentPairData ? currentPairData.change : 1.38);
      setIsLoading(false);
    }, 300);
  }, [selectedTimeframe, selectedPair]);

  // Draw chart when data changes
  useEffect(() => {
    if (chartData.length > 0) {
      drawChart();
    }
  }, [chartData]);

  // Handle canvas resize
  useEffect(() => {
    const handleResize = () => {
      const canvas = canvasRef.current;
      if (canvas) {
        const container = canvas.parentElement;
        canvas.width = container.offsetWidth;
        canvas.height = container.offsetHeight;
        drawChart();
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Real-time price updates
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPrice(prev => {
        const change = (Math.random() - 0.5) * 0.01;
        return prev * (1 + change);
      });
      
      setPriceChange(prev => {
        const change = (Math.random() - 0.5) * 0.1;
        return Math.max(-10, Math.min(10, prev + change));
      });
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const handlePairChange = (pair) => {
    setSelectedPair(pair.symbol);
  };

  const handleTimeframeChange = (timeframe) => {
    setSelectedTimeframe(timeframe);
  };

  return (
    <div className="mobile-binance-app">
      {/* Header */}
      <div className="mobile-header">
        <div className="header-left">
          <img src="/logo_snipswap.png" alt="SnipSwap" className="mobile-logo" />
          <span className="brand-name">SnipSwap</span>
        </div>
        
        <div className="privacy-indicator">
          <div className="privacy-icon">🔒</div>
          <div className="privacy-text">
            <span className="privacy-label">Privacy Mode</span>
            <span className="privacy-status">On</span>
          </div>
        </div>
        
        <div className="header-right">
          <button className="signup-btn">Sign Up</button>
          <button className="menu-btn">☰</button>
        </div>
      </div>

      {/* Breadcrumb */}
      <div className="breadcrumb">
        <span>Home</span>
        <span className="separator">›</span>
        <span>Crypto prices</span>
        <span className="separator">›</span>
        <span>{selectedPair.replace('/', ' Price (').replace('USDC', 'USDC)')}</span>
      </div>

      {/* Price Header */}
      <div className="price-header">
        <div className="price-title">
          <div className="coin-icon">
            {tradingPairs.find(p => p.symbol === selectedPair)?.icon || '⚛️'}
          </div>
          <div className="price-info">
            <h1>{selectedPair.replace('/', ' Price (').replace('USDC', 'USDC)')}</h1>
            <span className="hot-badge">HOT</span>
          </div>
          <button className="share-btn">⚡</button>
        </div>
      </div>

      {/* Current Price */}
      <div className="current-price-section">
        <div className="price-label">{selectedPair.split('/')[0]} to USD:</div>
        <div className="price-display">
          <span className="price-amount">
            1 {selectedPair.split('/')[0]} equals ${currentPrice.toLocaleString('en-US', { 
              minimumFractionDigits: currentPrice > 1000 ? 2 : 4,
              maximumFractionDigits: currentPrice > 1000 ? 2 : 4
            })} USD
          </span>
          <span className={`price-change ${priceChange >= 0 ? 'positive' : 'negative'}`}>
            {priceChange >= 0 ? '+' : ''}{priceChange.toFixed(2)}%
          </span>
          <span className="timeframe-indicator">{selectedTimeframe}</span>
        </div>
      </div>

      {/* Timeframe Selector */}
      <div className="timeframe-selector">
        {timeframes.map((tf) => (
          <button
            key={tf.value}
            className={`timeframe-btn ${selectedTimeframe === tf.value ? 'active' : ''}`}
            onClick={() => handleTimeframeChange(tf.value)}
          >
            {tf.label}
          </button>
        ))}
      </div>

      {/* Chart Container */}
      <div className="chart-container">
        {isLoading && (
          <div className="chart-loading">
            <div className="loading-spinner"></div>
            <span>Loading chart data...</span>
          </div>
        )}
        <canvas
          ref={canvasRef}
          className="price-chart"
          style={{ opacity: isLoading ? 0.3 : 1 }}
        />
        
        {/* Price Scale */}
        <div className="price-scale">
          <span className="currency-label">USD</span>
        </div>
      </div>

      {/* Trading Timeframes */}
      <div className="trading-section">
        <h3 className="section-title">Trading Timeframes</h3>
        <div className="trading-timeframes">
          {tradingTimeframes.map((tf) => (
            <button
              key={tf}
              className="trading-timeframe-btn"
              onClick={() => handleTimeframeChange(tf)}
            >
              {tf}
            </button>
          ))}
        </div>
      </div>

      {/* Trading Pairs */}
      <div className="trading-pairs-section">
        <h3 className="section-title">Available Pairs</h3>
        <div className="pairs-grid">
          {tradingPairs.map((pair) => (
            <div
              key={pair.symbol}
              className={`pair-card ${selectedPair === pair.symbol ? 'selected' : ''}`}
              onClick={() => handlePairChange(pair)}
            >
              <div className="pair-icon">{pair.icon}</div>
              <div className="pair-info">
                <div className="pair-symbol">{pair.symbol}</div>
                <div className="pair-name">{pair.name}</div>
              </div>
              <div className="pair-price">
                <div className="price">${pair.price.toLocaleString()}</div>
                <div className={`change ${pair.change >= 0 ? 'positive' : 'negative'}`}>
                  {pair.change >= 0 ? '+' : ''}{pair.change.toFixed(2)}%
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="quick-actions">
        <button className="action-btn buy-btn">
          <span className="action-icon">📈</span>
          <span>Buy {selectedPair.split('/')[0]}</span>
        </button>
        <button className="action-btn trade-btn">
          <span className="action-icon">🔄</span>
          <span>Trade {selectedPair.split('/')[0]}</span>
        </button>
      </div>

      {/* App Promotion */}
      <div className="app-promotion">
        <div className="app-info">
          <div className="app-icon">
            <img src="/logo_snipswap.png" alt="SnipSwap" />
          </div>
          <div className="app-details">
            <h4>SnipSwap App</h4>
            <p>Secure, fast and elegant</p>
          </div>
        </div>
        <button className="download-btn">Download</button>
      </div>
    </div>
  );
};

export default MobileBinanceApp;

