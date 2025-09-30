import React, { useEffect, useRef, useState } from 'react';

const BinanceCarbonCopy = () => {
  const [selectedPair, setSelectedPair] = useState('ATOM/USDC');
  const [currentPrice, setCurrentPrice] = useState(4.6376);
  const [priceChange, setPriceChange] = useState(2.25);
  const [isLive, setIsLive] = useState(true);
  const [activeTab, setActiveTab] = useState('Chart');
  const [activeTimeframe, setActiveTimeframe] = useState('1D');
  const [showIndicators, setShowIndicators] = useState(false);
  const [activeIndicators, setActiveIndicators] = useState({
    'MA(7)': false,
    'MA(25)': false,
    'MA(99)': false
  });

  const chartContainerRef = useRef();

  // Exact Binance color scheme
  const binanceColors = {
    background: '#0B0E11',
    cardBg: '#1E2329',
    borderColor: '#2B3139',
    textPrimary: '#EAECEF',
    textSecondary: '#848E9C',
    green: '#0ECB81',
    red: '#F6465D',
    yellow: '#F0B90B',
    blue: '#1E90FF',
    purple: '#C99400'
  };

  // Trading pairs with Cosmos ecosystem
  const tradingPairs = [
    { symbol: 'ATOM/USDC', name: 'Cosmos Hub', price: 4.6376, change: 2.25, volume: '25.8M', icon: '⚛️' },
    { symbol: 'OSMO/USDC', name: 'Osmosis', price: 0.164, change: -0.01, volume: '12.8M', icon: '🌊' },
    { symbol: 'SCRT/USDC', name: 'Secret Network', price: 0.179, change: -0.70, volume: '8.4M', icon: '🔐' },
    { symbol: 'JUNO/USDC', name: 'Juno Network', price: 0.065, change: 0.50, volume: '5.2M', icon: '🪐' },
    { symbol: 'BTC/USDC', name: 'Bitcoin', price: 116888, change: -0.38, volume: '2.1B', icon: '₿' },
    { symbol: 'ETH/USDC', name: 'Ethereum', price: 4534, change: -1.28, volume: '1.8B', icon: 'Ξ' }
  ];

  // Generate realistic OHLCV data
  const generateCandlestickData = (basePrice, days = 100) => {
    const data = [];
    let price = basePrice * 0.85;
    
    for (let i = 0; i < days; i++) {
      const volatility = 0.02;
      const trend = i / days * 0.15;
      const randomChange = (Math.random() - 0.5) * volatility;
      
      price = price * (1 + trend/days + randomChange);
      
      const open = price;
      const high = price * (1 + Math.random() * 0.015);
      const low = price * (1 - Math.random() * 0.015);
      const close = low + Math.random() * (high - low);
      
      data.push({ open, high, low, close });
      price = close;
    }
    
    return data;
  };

  // Calculate moving averages
  const calculateMA = (data, period) => {
    const maData = [];
    for (let i = period - 1; i < data.length; i++) {
      const sum = data.slice(i - period + 1, i + 1).reduce((acc, item) => acc + item.close, 0);
      maData.push(sum / period);
    }
    return maData;
  };

  // Render Binance-style candlestick chart
  const renderBinanceChart = () => {
    if (!chartContainerRef.current) return;
    
    const canvas = document.createElement('canvas');
    const container = chartContainerRef.current;
    const rect = container.getBoundingClientRect();
    
    canvas.width = rect.width * 2; // High DPI
    canvas.height = 400 * 2;
    canvas.style.width = '100%';
    canvas.style.height = '400px';
    
    container.innerHTML = '';
    container.appendChild(canvas);
    
    const ctx = canvas.getContext('2d');
    ctx.scale(2, 2); // High DPI scaling
    
    const { width, height } = { width: rect.width, height: 400 };
    
    // Clear with Binance background
    ctx.fillStyle = binanceColors.background;
    ctx.fillRect(0, 0, width, height);
    
    // Generate data
    const currentPairData = tradingPairs.find(pair => pair.symbol === selectedPair);
    const candleData = generateCandlestickData(currentPairData.price, 80);
    
    // Chart dimensions
    const chartPadding = { top: 20, right: 80, bottom: 40, left: 20 };
    const chartWidth = width - chartPadding.left - chartPadding.right;
    const chartHeight = height - chartPadding.top - chartPadding.bottom;
    
    // Price range
    const prices = candleData.flatMap(d => [d.high, d.low]);
    const minPrice = Math.min(...prices) * 0.998;
    const maxPrice = Math.max(...prices) * 1.002;
    const priceRange = maxPrice - minPrice;
    
    // Draw grid (Binance style)
    ctx.strokeStyle = '#2B3139';
    ctx.lineWidth = 0.5;
    
    // Horizontal grid lines
    for (let i = 0; i <= 8; i++) {
      const y = chartPadding.top + (chartHeight * i) / 8;
      ctx.beginPath();
      ctx.moveTo(chartPadding.left, y);
      ctx.lineTo(chartPadding.left + chartWidth, y);
      ctx.stroke();
    }
    
    // Vertical grid lines
    for (let i = 0; i <= 12; i++) {
      const x = chartPadding.left + (chartWidth * i) / 12;
      ctx.beginPath();
      ctx.moveTo(x, chartPadding.top);
      ctx.lineTo(x, chartPadding.top + chartHeight);
      ctx.stroke();
    }
    
    // Draw price labels (Binance style)
    ctx.fillStyle = binanceColors.textSecondary;
    ctx.font = '11px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
    ctx.textAlign = 'left';
    
    for (let i = 0; i <= 8; i++) {
      const y = chartPadding.top + (chartHeight * i) / 8;
      const price = maxPrice - (priceRange * i) / 8;
      const priceText = price > 1000 ? price.toLocaleString() : price.toFixed(4);
      ctx.fillText(priceText, chartPadding.left + chartWidth + 8, y + 4);
    }
    
    // Draw candlesticks (Binance colors)
    const candleWidth = Math.max(2, (chartWidth / candleData.length) * 0.7);
    const candleSpacing = chartWidth / candleData.length;
    
    candleData.forEach((candle, index) => {
      const x = chartPadding.left + (index * candleSpacing) + (candleSpacing - candleWidth) / 2;
      const openY = chartPadding.top + chartHeight - ((candle.open - minPrice) / priceRange) * chartHeight;
      const closeY = chartPadding.top + chartHeight - ((candle.close - minPrice) / priceRange) * chartHeight;
      const highY = chartPadding.top + chartHeight - ((candle.high - minPrice) / priceRange) * chartHeight;
      const lowY = chartPadding.top + chartHeight - ((candle.low - minPrice) / priceRange) * chartHeight;
      
      const isGreen = candle.close > candle.open;
      const candleColor = isGreen ? binanceColors.green : binanceColors.red;
      
      ctx.fillStyle = candleColor;
      ctx.strokeStyle = candleColor;
      ctx.lineWidth = 1;
      
      // Draw wick
      ctx.beginPath();
      ctx.moveTo(x + candleWidth / 2, highY);
      ctx.lineTo(x + candleWidth / 2, lowY);
      ctx.stroke();
      
      // Draw body
      const bodyTop = Math.min(openY, closeY);
      const bodyHeight = Math.abs(closeY - openY);
      
      if (bodyHeight < 1) {
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(x, openY);
        ctx.lineTo(x + candleWidth, openY);
        ctx.stroke();
      } else {
        ctx.fillRect(x, bodyTop, candleWidth, bodyHeight);
      }
    });
    
    // Draw current price line (Binance yellow)
    const currentPriceY = chartPadding.top + chartHeight - ((currentPrice - minPrice) / priceRange) * chartHeight;
    ctx.strokeStyle = binanceColors.yellow;
    ctx.lineWidth = 1;
    ctx.setLineDash([4, 4]);
    ctx.beginPath();
    ctx.moveTo(chartPadding.left, currentPriceY);
    ctx.lineTo(chartPadding.left + chartWidth, currentPriceY);
    ctx.stroke();
    ctx.setLineDash([]);
    
    // Draw current price label
    ctx.fillStyle = binanceColors.yellow;
    ctx.fillRect(chartPadding.left + chartWidth + 2, currentPriceY - 10, 76, 20);
    ctx.fillStyle = binanceColors.background;
    ctx.font = 'bold 11px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(currentPrice.toFixed(4), chartPadding.left + chartWidth + 40, currentPriceY + 3);
    
    // Draw moving averages if active
    Object.entries(activeIndicators).forEach(([indicator, isActive]) => {
      if (isActive) {
        let color, period;
        if (indicator === 'MA(7)') { color = binanceColors.yellow; period = 7; }
        else if (indicator === 'MA(25)') { color = '#E91E63'; period = 25; }
        else if (indicator === 'MA(99)') { color = '#9C27B0'; period = 99; }
        
        const maData = calculateMA(candleData, period);
        
        ctx.strokeStyle = color;
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        
        maData.forEach((ma, index) => {
          const x = chartPadding.left + ((index + period - 1) * candleSpacing) + candleSpacing / 2;
          const y = chartPadding.top + chartHeight - ((ma - minPrice) / priceRange) * chartHeight;
          
          if (index === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        });
        
        ctx.stroke();
      }
    });
  };

  // Initialize chart
  useEffect(() => {
    renderBinanceChart();
  }, [selectedPair, activeIndicators, currentPrice]);

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      setTimeout(renderBinanceChart, 100);
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Simulate real-time price updates
  useEffect(() => {
    const interval = setInterval(() => {
      if (isLive) {
        const volatility = 0.0008;
        const change = (Math.random() - 0.5) * volatility;
        const newPrice = currentPrice * (1 + change);
        const basePrice = tradingPairs.find(p => p.symbol === selectedPair).price;
        const newChange = ((newPrice - basePrice) / basePrice) * 100;
        
        setCurrentPrice(newPrice);
        setPriceChange(newChange);
      }
    }, 2000);

    return () => clearInterval(interval);
  }, [currentPrice, selectedPair, isLive]);

  const currentPairData = tradingPairs.find(pair => pair.symbol === selectedPair);

  return (
    <div className="min-h-screen" style={{ backgroundColor: binanceColors.background, color: binanceColors.textPrimary }}>
      {/* Binance Header */}
      <div className="flex items-center justify-between px-4 py-3" style={{ backgroundColor: binanceColors.cardBg, borderBottom: `1px solid ${binanceColors.borderColor}` }}>
        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-2">
            <img 
              src="/snipswap-logo-square.png" 
              alt="SnipSwap" 
              className="w-8 h-8 rounded"
              onError={(e) => {
                e.target.style.display = 'none';
                e.target.nextSibling.style.display = 'block';
              }}
            />
            <span className="text-2xl" style={{ display: 'none' }}>🔒</span>
            <span className="text-xl font-bold" style={{ color: binanceColors.yellow }}>SnipSwap</span>
          </div>
          <span style={{ color: binanceColors.textSecondary }}>Professional Trading</span>
        </div>
        <button 
          className="px-4 py-2 rounded font-semibold transition-colors"
          style={{ backgroundColor: binanceColors.yellow, color: binanceColors.background }}
        >
          Connect Wallet
        </button>
      </div>

      {/* Binance Trading Pair Section */}
      <div className="px-4 py-3" style={{ backgroundColor: binanceColors.cardBg, borderBottom: `1px solid ${binanceColors.borderColor}` }}>
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-3">
            <select 
              value={selectedPair}
              onChange={(e) => setSelectedPair(e.target.value)}
              className="px-3 py-1 rounded text-sm"
              style={{ 
                backgroundColor: binanceColors.background, 
                color: binanceColors.textPrimary,
                border: `1px solid ${binanceColors.borderColor}`
              }}
            >
              {tradingPairs.map((pair) => (
                <option key={pair.symbol} value={pair.symbol}>
                  {pair.icon} {pair.symbol}
                </option>
              ))}
            </select>
            {isLive && (
              <span 
                className="text-xs px-2 py-1 rounded-full font-medium"
                style={{ backgroundColor: binanceColors.green, color: binanceColors.background }}
              >
                Live
              </span>
            )}
          </div>
        </div>

        {/* Binance Price Display */}
        <div className="mb-4">
          <div className="flex items-baseline space-x-4 mb-2">
            <div className="text-2xl font-bold" style={{ color: priceChange >= 0 ? binanceColors.green : binanceColors.red }}>
              {currentPrice > 1000 ? currentPrice.toLocaleString() : currentPrice.toFixed(4)}
            </div>
            <div className="text-sm" style={{ color: binanceColors.textSecondary }}>
              ${currentPrice > 1000 ? currentPrice.toLocaleString() : currentPrice.toFixed(4)}
            </div>
            <div 
              className="text-sm font-medium px-2 py-1 rounded"
              style={{ 
                color: priceChange >= 0 ? binanceColors.green : binanceColors.red,
                backgroundColor: priceChange >= 0 ? `${binanceColors.green}20` : `${binanceColors.red}20`
              }}
            >
              {priceChange >= 0 ? '+' : ''}{priceChange.toFixed(2)}%
            </div>
          </div>

          {/* Binance Market Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div>
              <div style={{ color: binanceColors.textSecondary }}>24h High</div>
              <div className="font-medium">{(currentPrice * 1.04).toFixed(4)}</div>
            </div>
            <div>
              <div style={{ color: binanceColors.textSecondary }}>24h Low</div>
              <div className="font-medium">{(currentPrice * 0.96).toFixed(4)}</div>
            </div>
            <div>
              <div style={{ color: binanceColors.textSecondary }}>24h Vol({selectedPair.split('/')[0]})</div>
              <div className="font-medium">{currentPairData.volume}</div>
            </div>
            <div>
              <div style={{ color: binanceColors.textSecondary }}>24h Vol(USDC)</div>
              <div className="font-medium">119.8M</div>
            </div>
          </div>
        </div>
      </div>

      {/* Binance Chart Tabs */}
      <div className="px-4" style={{ backgroundColor: binanceColors.cardBg }}>
        <div className="flex items-center space-x-6 border-b" style={{ borderColor: binanceColors.borderColor }}>
          {['Chart', 'Order Book', 'Trades', 'Info'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`py-3 px-1 text-sm font-medium border-b-2 transition-colors ${
                activeTab === tab 
                  ? 'border-yellow-400 text-yellow-400' 
                  : 'border-transparent'
              }`}
              style={{ 
                color: activeTab === tab ? binanceColors.yellow : binanceColors.textSecondary,
                borderBottomColor: activeTab === tab ? binanceColors.yellow : 'transparent'
              }}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Binance Chart Controls */}
      <div className="px-4 py-3" style={{ backgroundColor: binanceColors.cardBg }}>
        {/* Timeframe Controls */}
        <div className="flex items-center space-x-2 mb-3">
          {['1s', '15m', '1H', '4H', '1D', '1W'].map((timeframe) => (
            <button
              key={timeframe}
              onClick={() => setActiveTimeframe(timeframe)}
              className={`px-3 py-1 text-xs rounded transition-colors ${
                activeTimeframe === timeframe 
                  ? 'text-black font-medium' 
                  : 'hover:bg-gray-700'
              }`}
              style={{ 
                backgroundColor: activeTimeframe === timeframe ? binanceColors.yellow : binanceColors.background,
                color: activeTimeframe === timeframe ? binanceColors.background : binanceColors.textSecondary
              }}
            >
              {timeframe}
            </button>
          ))}
        </div>

        {/* Binance Indicators */}
        <div className="mb-4">
          <div className="flex items-center space-x-4 mb-2">
            <span className="text-sm" style={{ color: binanceColors.textSecondary }}>Indicators:</span>
            <button
              onClick={() => setShowIndicators(!showIndicators)}
              className="text-xs px-2 py-1 rounded"
              style={{ 
                backgroundColor: binanceColors.background,
                color: binanceColors.textSecondary,
                border: `1px solid ${binanceColors.borderColor}`
              }}
            >
              {showIndicators ? 'Hide' : 'Show'} Indicators
            </button>
          </div>
          
          {showIndicators && (
            <div className="flex flex-wrap gap-2">
              {Object.entries(activeIndicators).map(([indicator, isActive]) => (
                <button
                  key={indicator}
                  onClick={() => setActiveIndicators(prev => ({ ...prev, [indicator]: !prev[indicator] }))}
                  className={`text-xs px-2 py-1 rounded border transition-colors ${
                    isActive ? 'font-medium' : ''
                  }`}
                  style={{
                    backgroundColor: isActive ? 
                      (indicator === 'MA(7)' ? binanceColors.yellow : 
                       indicator === 'MA(25)' ? '#E91E63' : '#9C27B0') : 
                      binanceColors.background,
                    color: isActive ? binanceColors.background : binanceColors.textSecondary,
                    borderColor: isActive ? 
                      (indicator === 'MA(7)' ? binanceColors.yellow : 
                       indicator === 'MA(25)' ? '#E91E63' : '#9C27B0') : 
                      binanceColors.borderColor
                  }}
                >
                  {indicator}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Binance Chart */}
      <div className="px-4 pb-4" style={{ backgroundColor: binanceColors.cardBg }}>
        <div 
          ref={chartContainerRef} 
          className="w-full rounded"
          style={{ backgroundColor: binanceColors.background, minHeight: '400px' }}
        />
      </div>

      {/* Binance Buy/Sell Buttons */}
      <div className="px-4 pb-4" style={{ backgroundColor: binanceColors.cardBg }}>
        <div className="grid grid-cols-2 gap-3">
          <button 
            className="py-3 rounded font-semibold transition-colors"
            style={{ backgroundColor: binanceColors.green, color: binanceColors.background }}
          >
            BUY {selectedPair.split('/')[0]}
          </button>
          <button 
            className="py-3 rounded font-semibold transition-colors"
            style={{ backgroundColor: binanceColors.red, color: binanceColors.background }}
          >
            SELL {selectedPair.split('/')[0]}
          </button>
        </div>
      </div>
    </div>
  );
};

export default BinanceCarbonCopy;
