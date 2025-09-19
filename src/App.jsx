import React, { useState, useEffect, useRef } from 'react';
import './App.css';

const SnipSwapDEX = () => {
  const [selectedPair, setSelectedPair] = useState('ATOM/USDC');
  const [timeframe, setTimeframe] = useState('1D');
  const [activeTab, setActiveTab] = useState('Chart');
  
  // Individual indicator states (exactly like Binance)
  const [indicators, setIndicators] = useState({
    ma7: { enabled: false, color: '#f7931a', value: 0, period: 7 },
    ma25: { enabled: false, color: '#e91e63', value: 0, period: 25 },
    ma99: { enabled: false, color: '#9c27b0', value: 0, period: 99 },
    ema12: { enabled: false, color: '#00bcd4', value: 0, period: 12 },
    ema26: { enabled: false, color: '#4caf50', value: 0, period: 26 },
    bb: { enabled: false, color: '#ff9800', upper: 0, middle: 0, lower: 0 },
    rsi: { enabled: false, color: '#2196f3', value: 0 },
    macd: { enabled: false, color: '#795548', macd: 0, signal: 0, histogram: 0 }
  });
  
  // Wallet connection state
  const [walletConnected, setWalletConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState('');
  const [walletType, setWalletType] = useState('');
  const [showWalletModal, setShowWalletModal] = useState(false);
  
  // Market data with real-time updates
  const [marketData, setMarketData] = useState({
    price: 4.6376,
    change: 2.25,
    changeAmount: 0.10,
    volume24h: 119800000,
    high24h: 4.86,
    low24h: 4.40,
    open: 4.5347,
    close: 4.6376,
    amplitude: 0.66,
    source: 'live',
    lastUpdate: Date.now()
  });

  // Chart data and real-time updates
  const [chartData, setChartData] = useState([]);
  const [lastPriceUpdate, setLastPriceUpdate] = useState(null);
  const [realTimeActive, setRealTimeActive] = useState(true);
  const canvasRef = useRef(null);

  // SnipSwap Logo Component
  const SnipSwapLogo = ({ size = 32 }) => (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none">
      <path 
        d="M50 8 L80 26 L80 62 L50 80 L20 62 L20 26 Z" 
        stroke="#f0b90b" 
        strokeWidth="3" 
        fill="none"
      />
      <rect x="38" y="48" width="24" height="20" rx="3" fill="#f0b90b" />
      <path 
        d="M43 48 L43 42 C43 38 46 35 50 35 C54 35 57 38 57 42 L57 48" 
        stroke="#f0b90b" 
        strokeWidth="2.5" 
        fill="none"
      />
      <circle cx="50" cy="56" r="2.5" fill="white" />
      <rect x="49" y="56" width="2" height="6" fill="white" />
      <circle cx="15" cy="44" r="3" fill="#f0b90b" />
      <circle cx="85" cy="44" r="3" fill="#f0b90b" />
      <circle cx="32" cy="20" r="2" fill="#f0b90b" />
      <circle cx="68" cy="20" r="2" fill="#f0b90b" />
      <line x1="18" y1="44" x2="20" y2="44" stroke="#f0b90b" strokeWidth="2" />
      <line x1="80" y1="44" x2="82" y2="44" stroke="#f0b90b" strokeWidth="2" />
      <line x1="30" y1="22" x2="20" y2="30" stroke="#f0b90b" strokeWidth="1.5" />
      <line x1="70" y1="22" x2="80" y2="30" stroke="#f0b90b" strokeWidth="1.5" />
    </svg>
  );

  // Wallet Connection Modal
  const WalletModal = () => {
    if (!showWalletModal) return null;

    const walletOptions = [
      { name: 'Keplr', icon: '🔐', description: 'Cosmos ecosystem wallet' },
      { name: 'MetaMask', icon: '🦊', description: 'Ethereum & EVM chains' },
      { name: 'WalletConnect', icon: '🔗', description: 'Connect any wallet' },
      { name: 'Leap', icon: '🚀', description: 'Multi-chain Cosmos wallet' },
      { name: 'Cosmostation', icon: '🌌', description: 'Cosmos native wallet' }
    ];

    const connectWallet = async (walletName) => {
      try {
        setWalletConnected(true);
        setWalletAddress('cosmos1abc...def789');
        setWalletType(walletName);
        setShowWalletModal(false);
      } catch (error) {
        console.error('Wallet connection failed:', error);
      }
    };

    return (
      <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
        <div className="bg-gray-800 rounded-xl p-6 max-w-md w-full mx-4 border border-gray-600">
          <div className="flex justify-between items-center mb-5">
            <h3 className="text-yellow-400 text-lg font-bold">Connect Wallet</h3>
            <button
              onClick={() => setShowWalletModal(false)}
              className="text-gray-400 hover:text-white text-xl"
            >
              ×
            </button>
          </div>
          
          {walletOptions.map(wallet => (
            <button
              key={wallet.name}
              onClick={() => connectWallet(wallet.name)}
              className="w-full bg-gray-700 hover:bg-gray-600 border border-gray-600 hover:border-yellow-400 rounded-lg p-3 mb-2 text-white flex items-center gap-3 transition-all"
            >
              <span className="text-xl">{wallet.icon}</span>
              <div className="text-left">
                <div className="font-bold">{wallet.name}</div>
                <div className="text-xs text-gray-400">{wallet.description}</div>
              </div>
            </button>
          ))}
        </div>
      </div>
    );
  };

  // Generate realistic chart data with proper OHLCV
  const generateChartData = () => {
    const data = [];
    let basePrice = marketData.price;
    const now = Date.now();
    
    for (let i = 0; i < 120; i++) {
      const timestamp = now - (119 - i) * 3600000; // 1 hour intervals
      const volatility = 0.015;
      const trend = Math.sin(i * 0.08) * 0.003; // Add realistic trend
      const change = (Math.random() - 0.5) * volatility + trend;
      
      const open = basePrice;
      const close = basePrice * (1 + change);
      const high = Math.max(open, close) * (1 + Math.random() * 0.008);
      const low = Math.min(open, close) * (1 - Math.random() * 0.008);
      const volume = 800000 + Math.random() * 1500000;
      
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

  // Calculate individual technical indicators
  const calculateIndicators = (data) => {
    if (data.length < 99) return;

    const prices = data.map(d => d.close);
    const newIndicators = { ...indicators };

    // Moving Averages (exactly like Binance calculation)
    if (data.length >= 7) {
      const ma7 = prices.slice(-7).reduce((a, b) => a + b, 0) / 7;
      newIndicators.ma7.value = ma7;
    }
    
    if (data.length >= 25) {
      const ma25 = prices.slice(-25).reduce((a, b) => a + b, 0) / 25;
      newIndicators.ma25.value = ma25;
    }
    
    if (data.length >= 99) {
      const ma99 = prices.slice(-99).reduce((a, b) => a + b, 0) / 99;
      newIndicators.ma99.value = ma99;
    }

    // EMA calculations (Binance style)
    if (data.length >= 12) {
      let ema12 = prices[0];
      const multiplier12 = 2 / (12 + 1);
      for (let i = 1; i < Math.min(prices.length, 50); i++) {
        ema12 = (prices[prices.length - 50 + i] * multiplier12) + (ema12 * (1 - multiplier12));
      }
      newIndicators.ema12.value = ema12;
    }

    if (data.length >= 26) {
      let ema26 = prices[0];
      const multiplier26 = 2 / (26 + 1);
      for (let i = 1; i < Math.min(prices.length, 50); i++) {
        ema26 = (prices[prices.length - 50 + i] * multiplier26) + (ema26 * (1 - multiplier26));
      }
      newIndicators.ema26.value = ema26;
    }

    // Bollinger Bands
    if (data.length >= 20) {
      const period = 20;
      const recent = prices.slice(-period);
      const sma = recent.reduce((a, b) => a + b, 0) / period;
      const variance = recent.reduce((acc, price) => acc + Math.pow(price - sma, 2), 0) / period;
      const stdDev = Math.sqrt(variance);
      
      newIndicators.bb.middle = sma;
      newIndicators.bb.upper = sma + (stdDev * 2);
      newIndicators.bb.lower = sma - (stdDev * 2);
    }

    // RSI (14 period)
    if (data.length >= 15) {
      const period = 14;
      const changes = [];
      for (let i = 1; i <= period; i++) {
        changes.push(prices[prices.length - i] - prices[prices.length - i - 1]);
      }
      
      const gains = changes.filter(change => change > 0);
      const losses = changes.filter(change => change < 0).map(loss => Math.abs(loss));
      
      const avgGain = gains.length > 0 ? gains.reduce((a, b) => a + b, 0) / period : 0;
      const avgLoss = losses.length > 0 ? losses.reduce((a, b) => a + b, 0) / period : 0;
      
      const rs = avgLoss === 0 ? 100 : avgGain / avgLoss;
      const rsi = 100 - (100 / (1 + rs));
      
      newIndicators.rsi.value = rsi;
    }

    setIndicators(newIndicators);
  };

  // Initialize chart data and real-time updates
  useEffect(() => {
    const data = generateChartData();
    setChartData(data);
    calculateIndicators(data);

    // Simulate real-time price updates
    const interval = setInterval(() => {
      const lastCandle = data[data.length - 1];
      const volatility = 0.003;
      const change = (Math.random() - 0.5) * volatility;
      
      const newPrice = lastCandle.close * (1 + change);
      const newCandle = {
        ...lastCandle,
        close: newPrice,
        high: Math.max(lastCandle.high, newPrice),
        low: Math.min(lastCandle.low, newPrice),
        timestamp: Date.now()
      };
      
      data[data.length - 1] = newCandle;
      setChartData([...data]);
      
      setMarketData(prev => ({
        ...prev,
        price: newPrice,
        change: ((newPrice - prev.open) / prev.open) * 100,
        changeAmount: newPrice - prev.open,
        lastUpdate: Date.now()
      }));
      
      setLastPriceUpdate(Date.now());
      calculateIndicators(data);
    }, 1500); // Update every 1.5 seconds

    return () => clearInterval(interval);
  }, []);

  // Impressive Binance-Style Chart Canvas
  const BinanceChart = () => {
    useEffect(() => {
      const canvas = canvasRef.current;
      if (!canvas || chartData.length === 0) return;
      
      const ctx = canvas.getContext('2d');
      const { width, height } = canvas;
      
      // Clear canvas with dark background
      ctx.fillStyle = '#0b0e11';
      ctx.fillRect(0, 0, width, height);
      
      // Chart dimensions
      const chartWidth = width - 120;
      const chartHeight = height - 100;
      const chartX = 30;
      const chartY = 50;
      
      // Price range with padding
      const prices = chartData.flatMap(d => [d.high, d.low]);
      const minPrice = Math.min(...prices) * 0.9985;
      const maxPrice = Math.max(...prices) * 1.0015;
      const priceRange = maxPrice - minPrice;
      
      // Draw subtle grid (Binance style)
      ctx.strokeStyle = '#1e2329';
      ctx.lineWidth = 1;
      
      // Horizontal grid lines
      for (let i = 0; i <= 10; i++) {
        const y = chartY + (chartHeight * i) / 10;
        ctx.beginPath();
        ctx.moveTo(chartX, y);
        ctx.lineTo(chartX + chartWidth, y);
        ctx.stroke();
      }
      
      // Vertical grid lines
      for (let i = 0; i <= 12; i++) {
        const x = chartX + (chartWidth * i) / 12;
        ctx.beginPath();
        ctx.moveTo(x, chartY);
        ctx.lineTo(x, chartY + chartHeight);
        ctx.stroke();
      }
      
      // Draw price labels (right side)
      ctx.fillStyle = '#848e9c';
      ctx.font = '11px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto';
      ctx.textAlign = 'left';
      for (let i = 0; i <= 10; i++) {
        const y = chartY + (chartHeight * i) / 10;
        const price = maxPrice - (priceRange * i) / 10;
        ctx.fillText(price.toFixed(4), chartX + chartWidth + 8, y + 4);
      }
      
      // Draw time labels (bottom)
      ctx.textAlign = 'center';
      for (let i = 0; i <= 6; i++) {
        const x = chartX + (chartWidth * i) / 6;
        const dataIndex = Math.floor((chartData.length - 1) * i / 6);
        if (dataIndex < chartData.length) {
          const time = new Date(chartData[dataIndex].timestamp);
          ctx.fillText(
            time.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
            x, 
            chartY + chartHeight + 20
          );
        }
      }
      
      // Draw candlesticks with Binance colors
      const candleWidth = Math.max(3, chartWidth / chartData.length * 0.85);
      
      chartData.forEach((candle, index) => {
        const x = chartX + (chartWidth * index) / chartData.length;
        const openY = chartY + chartHeight - ((candle.open - minPrice) / priceRange) * chartHeight;
        const closeY = chartY + chartHeight - ((candle.close - minPrice) / priceRange) * chartHeight;
        const highY = chartY + chartHeight - ((candle.high - minPrice) / priceRange) * chartHeight;
        const lowY = chartY + chartHeight - ((candle.low - minPrice) / priceRange) * chartHeight;
        
        const isGreen = candle.close > candle.open;
        const candleColor = isGreen ? '#0ecb81' : '#f6465d';
        
        ctx.fillStyle = candleColor;
        ctx.strokeStyle = candleColor;
        ctx.lineWidth = 1;
        
        // Draw wick (thin line)
        ctx.beginPath();
        ctx.moveTo(x + candleWidth / 2, highY);
        ctx.lineTo(x + candleWidth / 2, lowY);
        ctx.stroke();
        
        // Draw body
        const bodyTop = Math.min(openY, closeY);
        const bodyHeight = Math.abs(closeY - openY);
        
        if (bodyHeight < 2) {
          // Doji - draw horizontal line
          ctx.lineWidth = 2;
          ctx.beginPath();
          ctx.moveTo(x, openY);
          ctx.lineTo(x + candleWidth, openY);
          ctx.stroke();
        } else {
          // Regular candle body
          ctx.fillRect(x, bodyTop, candleWidth, bodyHeight);
        }
      });
      
      // Draw individual indicators as smooth overlays
      const drawIndicatorLine = (values, color, lineWidth = 2, isDashed = false, isSmooth = true) => {
        if (values.length === 0) return;
        
        ctx.strokeStyle = color;
        ctx.lineWidth = lineWidth;
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        
        if (isDashed) {
          ctx.setLineDash([8, 4]);
        } else {
          ctx.setLineDash([]);
        }
        
        ctx.beginPath();
        let hasStarted = false;
        
        values.forEach((value, index) => {
          if (value && !isNaN(value) && value > 0) {
            const x = chartX + (chartWidth * index) / chartData.length + candleWidth / 2;
            const y = chartY + chartHeight - ((value - minPrice) / priceRange) * chartHeight;
            
            if (!hasStarted) {
              ctx.moveTo(x, y);
              hasStarted = true;
            } else {
              if (isSmooth) {
                // Smooth curve using quadratic curves
                const prevX = chartX + (chartWidth * (index - 1)) / chartData.length + candleWidth / 2;
                const prevY = chartY + chartHeight - ((values[index - 1] - minPrice) / priceRange) * chartHeight;
                const cpX = (prevX + x) / 2;
                const cpY = (prevY + y) / 2;
                ctx.quadraticCurveTo(cpX, cpY, x, y);
              } else {
                ctx.lineTo(x, y);
              }
            }
          }
        });
        
        ctx.stroke();
        ctx.setLineDash([]);
      };
      
      // Draw MA7 (Golden like Binance)
      if (indicators.ma7.enabled && chartData.length >= 7) {
        const ma7Values = chartData.map((_, index) => {
          if (index < 6) return null;
          return chartData.slice(index - 6, index + 1).reduce((sum, d) => sum + d.close, 0) / 7;
        });
        drawIndicatorLine(ma7Values, '#f7931a', 2, false, true);
      }
      
      // Draw MA25 (Pink like Binance)
      if (indicators.ma25.enabled && chartData.length >= 25) {
        const ma25Values = chartData.map((_, index) => {
          if (index < 24) return null;
          return chartData.slice(index - 24, index + 1).reduce((sum, d) => sum + d.close, 0) / 25;
        });
        drawIndicatorLine(ma25Values, '#e91e63', 2, false, true);
      }
      
      // Draw MA99 (Purple like Binance)
      if (indicators.ma99.enabled && chartData.length >= 99) {
        const ma99Values = chartData.map((_, index) => {
          if (index < 98) return null;
          return chartData.slice(index - 98, index + 1).reduce((sum, d) => sum + d.close, 0) / 99;
        });
        drawIndicatorLine(ma99Values, '#9c27b0', 3, false, true);
      }
      
      // Draw EMA12 (Cyan)
      if (indicators.ema12.enabled) {
        const ema12Values = [];
        let ema = chartData[0]?.close || 0;
        const multiplier = 2 / (12 + 1);
        
        chartData.forEach((candle, index) => {
          if (index === 0) {
            ema12Values.push(ema);
          } else {
            ema = (candle.close * multiplier) + (ema * (1 - multiplier));
            ema12Values.push(ema);
          }
        });
        drawIndicatorLine(ema12Values, '#00bcd4', 2, false, true);
      }
      
      // Draw EMA26 (Green)
      if (indicators.ema26.enabled) {
        const ema26Values = [];
        let ema = chartData[0]?.close || 0;
        const multiplier = 2 / (26 + 1);
        
        chartData.forEach((candle, index) => {
          if (index === 0) {
            ema26Values.push(ema);
          } else {
            ema = (candle.close * multiplier) + (ema * (1 - multiplier));
            ema26Values.push(ema);
          }
        });
        drawIndicatorLine(ema26Values, '#4caf50', 2, false, true);
      }
      
      // Draw Bollinger Bands
      if (indicators.bb.enabled && chartData.length >= 20) {
        const bbUpper = [];
        const bbMiddle = [];
        const bbLower = [];
        
        chartData.forEach((_, index) => {
          if (index < 19) {
            bbUpper.push(null);
            bbMiddle.push(null);
            bbLower.push(null);
          } else {
            const period = chartData.slice(index - 19, index + 1);
            const sma = period.reduce((sum, d) => sum + d.close, 0) / 20;
            const variance = period.reduce((acc, d) => acc + Math.pow(d.close - sma, 2), 0) / 20;
            const stdDev = Math.sqrt(variance);
            
            bbUpper.push(sma + (stdDev * 2));
            bbMiddle.push(sma);
            bbLower.push(sma - (stdDev * 2));
          }
        });
        
        drawIndicatorLine(bbUpper, '#ff9800', 1, true, true);
        drawIndicatorLine(bbMiddle, '#ff9800', 1, false, true);
        drawIndicatorLine(bbLower, '#ff9800', 1, true, true);
        
        // Fill area between bands with transparency
        ctx.globalAlpha = 0.1;
        ctx.fillStyle = '#ff9800';
        ctx.beginPath();
        
        // Draw upper band
        bbUpper.forEach((value, index) => {
          if (value && !isNaN(value)) {
            const x = chartX + (chartWidth * index) / chartData.length + candleWidth / 2;
            const y = chartY + chartHeight - ((value - minPrice) / priceRange) * chartHeight;
            if (index === bbUpper.findIndex(v => v !== null)) {
              ctx.moveTo(x, y);
            } else {
              ctx.lineTo(x, y);
            }
          }
        });
        
        // Draw lower band in reverse
        for (let i = bbLower.length - 1; i >= 0; i--) {
          const value = bbLower[i];
          if (value && !isNaN(value)) {
            const x = chartX + (chartWidth * i) / chartData.length + candleWidth / 2;
            const y = chartY + chartHeight - ((value - minPrice) / priceRange) * chartHeight;
            ctx.lineTo(x, y);
          }
        }
        
        ctx.closePath();
        ctx.fill();
        ctx.globalAlpha = 1;
      }
      
      // Draw current price line (dotted like Binance spot)
      const currentPrice = marketData.price;
      const currentPriceY = chartY + chartHeight - ((currentPrice - minPrice) / priceRange) * chartHeight;
      
      ctx.strokeStyle = marketData.change >= 0 ? '#0ecb81' : '#f6465d';
      ctx.lineWidth = 1;
      ctx.setLineDash([6, 3]);
      ctx.beginPath();
      ctx.moveTo(chartX, currentPriceY);
      ctx.lineTo(chartX + chartWidth, currentPriceY);
      ctx.stroke();
      ctx.setLineDash([]);
      
      // Current price label with glow effect
      const labelColor = marketData.change >= 0 ? '#0ecb81' : '#f6465d';
      
      // Glow effect
      ctx.shadowColor = labelColor;
      ctx.shadowBlur = 10;
      ctx.fillStyle = labelColor;
      ctx.fillRect(chartX + chartWidth + 5, currentPriceY - 12, 85, 24);
      ctx.shadowBlur = 0;
      
      ctx.fillStyle = 'white';
      ctx.font = 'bold 12px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto';
      ctx.textAlign = 'center';
      ctx.fillText(currentPrice.toFixed(4), chartX + chartWidth + 47, currentPriceY + 4);
      
      // Real-time pulse indicator
      if (realTimeActive && lastPriceUpdate && Date.now() - lastPriceUpdate < 2000) {
        const pulseSize = 4 + Math.sin(Date.now() * 0.01) * 2;
        ctx.fillStyle = '#f0b90b';
        ctx.shadowColor = '#f0b90b';
        ctx.shadowBlur = 8;
        ctx.beginPath();
        ctx.arc(chartX + chartWidth + 95, currentPriceY, pulseSize, 0, 2 * Math.PI);
        ctx.fill();
        ctx.shadowBlur = 0;
      }
      
    }, [chartData, indicators, marketData, lastPriceUpdate, realTimeActive]);
    
    return (
      <canvas 
        ref={canvasRef}
        width={450}
        height={400}
        className="w-full h-96 rounded"
      />
    );
  };

  // Individual Indicator Controls (exactly like Binance)
  const IndicatorControls = () => (
    <div className="flex flex-wrap gap-2 p-3 bg-gray-900 border-t border-gray-700">
      <div className="text-gray-400 text-xs mr-3 flex items-center">
        Indicators:
      </div>
      
      {Object.entries(indicators).map(([key, indicator]) => (
        <button
          key={key}
          onClick={() => setIndicators(prev => ({
            ...prev,
            [key]: { ...prev[key], enabled: !prev[key].enabled }
          }))}
          className={`px-3 py-1.5 rounded text-xs font-medium transition-all ${
            indicator.enabled 
              ? 'border text-white' 
              : 'border border-gray-600 text-gray-400 hover:border-gray-500'
          }`}
          style={{
            backgroundColor: indicator.enabled ? indicator.color + '15' : 'transparent',
            borderColor: indicator.enabled ? indicator.color : '#4b5563',
            color: indicator.enabled ? indicator.color : '#9ca3af'
          }}
        >
          {key.toUpperCase()}
          {indicator.enabled && indicator.period && (
            <span className="text-xs opacity-80">
              ({indicator.period})
            </span>
          )}
        </button>
      ))}
    </div>
  );

  // Binance-style indicator values display (top left overlay)
  const IndicatorValues = () => {
    const enabledIndicators = Object.entries(indicators).filter(([_, ind]) => ind.enabled);
    if (enabledIndicators.length === 0) return null;

    return (
      <div className="absolute top-4 left-4 bg-gray-900/85 backdrop-blur-sm rounded-lg p-3 text-xs border border-gray-700 min-w-48">
        <div className="text-yellow-400 font-semibold mb-2 text-xs uppercase tracking-wide">
          Active Indicators
        </div>
        
        {enabledIndicators.map(([key, indicator]) => (
          <div key={key} className="flex justify-between items-center mb-1.5 py-1">
            <div className="font-medium text-xs" style={{ color: indicator.color }}>
              {key.toUpperCase()}
              {indicator.period && `(${indicator.period})`}:
            </div>
            <div className="text-white font-semibold text-xs font-mono">
              {indicator.value?.toFixed(4) || '--'}
            </div>
          </div>
        ))}
      </div>
    );
  };

  const formatNumber = (num) => {
    if (num >= 1e9) return (num / 1e9).toFixed(2) + 'B';
    if (num >= 1e6) return (num / 1e6).toFixed(1) + 'M';
    if (num >= 1e3) return (num / 1e3).toFixed(1) + 'K';
    return num.toFixed(2);
  };

  const getAvailablePairs = () => [
    '⚛️ ATOM/USDC', '🌊 OSMO/USDC', '🔐 SCRT/USDC', '🪐 JUNO/USDC',
    '⭐ STARS/USDC', '🐕 HUAHUA/USDC', '🛡️ DVPN/USDC', '☁️ AKT/USDC',
    '🔥 INJ/USDC', '🌙 LUNA/USDC', '🐋 KUJI/USDC', '💎 CMDX/USDC',
    '₿ BTC/USDC', 'Ξ ETH/USDC', '💵 USDT/USDC'
  ];

  return (
    <div className="bg-gray-900 min-h-screen text-white">
      <WalletModal />
      
      {/* Header */}
      <header className="flex justify-between items-center p-4 bg-gray-800 border-b border-gray-700">
        <div className="flex items-center gap-3">
          <SnipSwapLogo size={28} />
          <span className="text-lg font-bold text-yellow-400">
            SnipSwap
          </span>
          <span className="text-xs text-gray-400">
            Professional Trading
          </span>
        </div>
        
        <div className="flex items-center gap-3">
          {!walletConnected ? (
            <button 
              onClick={() => setShowWalletModal(true)}
              className="bg-yellow-400 hover:bg-yellow-300 text-gray-900 px-4 py-2 rounded text-xs font-semibold transition-colors"
            >
              Connect Wallet
            </button>
          ) : (
            <div className="bg-green-500/20 text-green-400 px-3 py-1.5 rounded text-xs border border-green-500/50 font-mono">
              🟢 {walletType} • {walletAddress.slice(0, 6)}...{walletAddress.slice(-4)}
            </div>
          )}
        </div>
      </header>

      {/* Price Section (Binance Mobile Style) */}
      <div className="p-5 bg-gray-800">
        <div className="flex items-center gap-3 mb-4">
          <div className="flex items-center gap-2">
            <span className="text-2xl">⚛️</span>
            <select 
              value={selectedPair} 
              onChange={(e) => setSelectedPair(e.target.value)}
              className="bg-transparent border-none text-white text-xl font-bold"
            >
              {getAvailablePairs().map(pair => (
                <option key={pair} value={pair.replace(/[⚛️🌊🔐🪐⭐🐕🛡️☁️🔥🌙🐋💎₿Ξ💵]\s/, '')}>
                  {pair}
                </option>
              ))}
            </select>
          </div>
          
          {realTimeActive && (
            <div className="flex items-center gap-1 bg-green-500/20 px-2 py-1 rounded-full border border-green-500/30">
              <div className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />
              <span className="text-green-400 text-xs font-medium">Live</span>
            </div>
          )}
        </div>

        <div className="flex items-baseline gap-4 mb-4">
          <div className={`text-4xl font-bold font-mono ${
            marketData.change >= 0 ? 'text-green-400' : 'text-red-400'
          }`}>
            {marketData.price.toFixed(4)}
          </div>
          <div className="text-lg text-gray-400 font-mono">
            ${marketData.price.toFixed(4)}
          </div>
          <div className={`text-sm font-semibold px-2 py-1 rounded ${
            marketData.change >= 0 
              ? 'text-green-400 bg-green-400/20' 
              : 'text-red-400 bg-red-400/20'
          }`}>
            {marketData.change >= 0 ? '+' : ''}{marketData.change.toFixed(2)}%
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 text-xs">
          <div>
            <div className="text-gray-400 mb-1">24h High</div>
            <div className="text-white font-semibold font-mono">
              {marketData.high24h.toFixed(4)}
            </div>
          </div>
          <div>
            <div className="text-gray-400 mb-1">24h Low</div>
            <div className="text-white font-semibold font-mono">
              {marketData.low24h.toFixed(4)}
            </div>
          </div>
          <div>
            <div className="text-gray-400 mb-1">24h Vol(ATOM)</div>
            <div className="text-white font-semibold">
              {formatNumber(marketData.volume24h / marketData.price)}
            </div>
          </div>
          <div>
            <div className="text-gray-400 mb-1">24h Vol(USDC)</div>
            <div className="text-white font-semibold">
              {formatNumber(marketData.volume24h)}
            </div>
          </div>
        </div>
      </div>

      {/* Chart Tabs */}
      <div className="flex bg-gray-800 border-b border-gray-700">
        {['Chart', 'Order Book', 'Trades', 'Info'].map(tab => (
          <button 
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`flex-1 py-3 text-xs font-semibold transition-colors ${
              activeTab === tab 
                ? 'bg-yellow-400 text-gray-900' 
                : 'text-gray-400 hover:text-white'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Timeframe Controls */}
      <div className="flex items-center justify-between p-3 bg-gray-800 border-b border-gray-700">
        <div className="flex gap-2">
          {['1s', '15m', '1H', '4H', '1D', '1W'].map(tf => (
            <button
              key={tf}
              onClick={() => setTimeframe(tf)}
              className={`px-3 py-1.5 rounded text-xs font-semibold transition-colors ${
                timeframe === tf 
                  ? 'bg-yellow-400 text-gray-900' 
                  : 'text-gray-400 border border-gray-600 hover:border-gray-500'
              }`}
            >
              {tf}
            </button>
          ))}
        </div>
      </div>

      {/* Individual Indicator Controls */}
      <IndicatorControls />

      {/* Chart Area */}
      <div className="relative bg-gray-900">
        <IndicatorValues />
        {activeTab === 'Chart' && <BinanceChart />}
      </div>

      {/* Trading Buttons */}
      <div className="grid grid-cols-2 gap-3 p-5 bg-gray-800">
        <button 
          disabled={!walletConnected}
          className={`py-4 rounded-lg text-sm font-bold transition-colors ${
            walletConnected 
              ? 'bg-green-500 hover:bg-green-400 text-white' 
              : 'bg-gray-600 text-gray-400 cursor-not-allowed'
          }`}
        >
          BUY {selectedPair.split('/')[0].replace(/[⚛️🌊🔐🪐⭐🐕🛡️☁️🔥🌙🐋💎₿Ξ💵]\s/, '')}
        </button>
        <button 
          disabled={!walletConnected}
          className={`py-4 rounded-lg text-sm font-bold transition-colors ${
            walletConnected 
              ? 'bg-red-500 hover:bg-red-400 text-white' 
              : 'bg-gray-600 text-gray-400 cursor-not-allowed'
          }`}
        >
          SELL {selectedPair.split('/')[0].replace(/[⚛️🌊🔐🪐⭐🐕🛡️☁️🔥🌙🐋💎₿Ξ💵]\s/, '')}
        </button>
      </div>
    </div>
  );
};

export default SnipSwapDEX;
