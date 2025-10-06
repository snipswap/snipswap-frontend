import React, { useState, useEffect, useRef } from 'react';
import io from 'socket.io-client';
import WalletModal from './components/WalletModal';
import PortfolioDashboard from './components/PortfolioDashboard';
import walletService from './services/walletService';

const FinalSnipSwapDEX = () => {
  // State management
  const [currentPrice, setCurrentPrice] = useState(4.6376);
  const [priceChange, setPriceChange] = useState(2.25);
  const [isLive, setIsLive] = useState(true);
  const [selectedPair, setSelectedPair] = useState('ATOM/USDC');
  const [selectedTimeframe, setSelectedTimeframe] = useState('1W');
  const [activeIndicators, setActiveIndicators] = useState({});
  const [showWalletModal, setShowWalletModal] = useState(false);
  const [showPortfolio, setShowPortfolio] = useState(false);
  const [walletConnected, setWalletConnected] = useState(false);
  const [walletInfo, setWalletInfo] = useState(null);
  const [orderBook, setOrderBook] = useState({ bids: [], asks: [] });
  const [recentTrades, setRecentTrades] = useState([]);
  const [marketStats, setMarketStats] = useState({
    high24h: 4.8600,
    low24h: 4.4000,
    volume24h: 24.2,
    volumeUsdc: 119.8
  });
  
  // WebSocket and chart refs
  const socketRef = useRef(null);
  const chartRef = useRef(null);
  const chartInstanceRef = useRef(null);
  
  // Trading pairs data
  const tradingPairs = [
    { symbol: 'ATOM/USDC', name: 'Cosmos', price: 4.6376, change: 2.25, volume: '24.2M', icon: '⚛️' },
    { symbol: 'OSMO/USDC', name: 'Osmosis', price: 0.164, change: -0.01, volume: '15.8M', icon: '🧪' },
    { symbol: 'SCRT/USDC', name: 'Secret', price: 0.179, change: -0.70, volume: '8.4M', icon: '🔒' },
    { symbol: 'JUNO/USDC', name: 'Juno', price: 0.065, change: 0.50, volume: '5.2M', icon: '🪐' },
    { symbol: 'STARS/USDC', name: 'Stargaze', price: 0.0008, change: -15.91, volume: '2.1M', icon: '⭐' },
    { symbol: 'HUAHUA/USDC', name: 'Chihuahua', price: 0.00002, change: 7.04, volume: '1.8M', icon: '🐕' },
    { symbol: 'DVPN/USDC', name: 'Sentinel', price: 0.0002, change: 2.07, volume: '3.5M', icon: '🛡️' },
    { symbol: 'AKT/USDC', name: 'Akash', price: 1.16, change: -0.89, volume: '4.7M', icon: '☁️' },
    { symbol: 'INJ/USDC', name: 'Injective', price: 14.44, change: 0.08, volume: '12.3M', icon: '💉' },
    { symbol: 'LUNA/USDC', name: 'Terra', price: 0.160, change: 3.36, volume: '6.9M', icon: '🌙' },
    { symbol: 'KUJI/USDC', name: 'Kujira', price: 0.240, change: 0.32, volume: '2.8M', icon: '🐋' },
    { symbol: 'CMDX/USDC', name: 'Comdex', price: 0.0004, change: -25.47, volume: '1.2M', icon: '📈' },
    { symbol: 'BTC/USDC', name: 'Bitcoin', price: 116888, change: -0.38, volume: '2.1B', icon: '₿' },
    { symbol: 'ETH/USDC', name: 'Ethereum', price: 4534, change: -1.28, volume: '1.8B', icon: '⟠' }
  ];
  
  // Indicators configuration
  const indicators = [
    { key: 'MA7', label: 'MA7', color: '#f7931a', active: false },
    { key: 'MA25', label: 'MA25', color: '#e91e63', active: false },
    { key: 'MA99', label: 'MA99', color: '#9c27b0', active: false },
    { key: 'EMA12', label: 'EMA12', color: '#00bcd4', active: false },
    { key: 'EMA26', label: 'EMA26', color: '#4caf50', active: false },
    { key: 'BB', label: 'BB', color: '#ff9800', active: false },
    { key: 'RSI', label: 'RSI', color: '#2196f3', active: false },
    { key: 'MACD', label: 'MACD', color: '#795548', active: false }
  ];
  
  // Initialize WebSocket connection
  useEffect(() => {
    // Connect to backend WebSocket
    socketRef.current = io('ws://localhost:5000', {
      transports: ['websocket'],
      autoConnect: false
    });
    
    // Set up event listeners
    socketRef.current.on('connect', () => {
      console.log('Connected to SnipSwap backend');
      setIsLive(true);
    });
    
    socketRef.current.on('disconnect', () => {
      console.log('Disconnected from backend');
      setIsLive(false);
    });
    
    socketRef.current.on('price_update', (data) => {
      if (data.symbol === selectedPair.replace('/USDC', '')) {
        setCurrentPrice(data.price);
        setPriceChange(data.change_24h);
        updateChart(data);
      }
    });
    
    socketRef.current.on('orderbook_update', (data) => {
      if (data.symbol === selectedPair.replace('/USDC', '')) {
        setOrderBook(data.orderbook);
      }
    });
    
    socketRef.current.on('trade_update', (data) => {
      if (data.symbol === selectedPair.replace('/USDC', '')) {
        setRecentTrades(prev => [data, ...prev.slice(0, 19)]);
      }
    });
    
    // Try to connect
    socketRef.current.connect();
    
    // Fallback to mock data if backend not available
    const fallbackTimer = setTimeout(() => {
      if (!socketRef.current.connected) {
        console.log('Backend not available, using mock data');
        startMockData();
      }
    }, 3000);
    
    return () => {
      clearTimeout(fallbackTimer);
      if (socketRef.current) {
        socketRef.current.disconnect();
      }
    };
  }, [selectedPair]);
  
  // Initialize chart
  useEffect(() => {
    if (chartRef.current && !chartInstanceRef.current) {
      initializeChart();
    }
    
    return () => {
      if (chartInstanceRef.current) {
        chartInstanceRef.current = null;
      }
    };
  }, []);
  
  // Check wallet connection on mount
  useEffect(() => {
    const checkWalletConnection = async () => {
      const connectionInfo = walletService.getConnectionInfo();
      if (connectionInfo.connected) {
        setWalletConnected(true);
        setWalletInfo(connectionInfo);
      }
    };
    
    checkWalletConnection();
  }, []);
  
  const startMockData = () => {
    // Simulate real-time price updates
    const priceTimer = setInterval(() => {
      const change = (Math.random() - 0.5) * 0.02;
      setCurrentPrice(prev => {
        const newPrice = prev * (1 + change);
        return Math.max(newPrice, 0.01);
      });
      
      setPriceChange(prev => prev + (Math.random() - 0.5) * 0.5);
    }, 2000);
    
    // Generate mock order book
    const generateOrderBook = () => {
      const bids = [];
      const asks = [];
      const basePrice = currentPrice;
      
      for (let i = 0; i < 10; i++) {
        bids.push({
          price: (basePrice * (1 - (i + 1) * 0.001)).toFixed(4),
          amount: (Math.random() * 1000 + 100).toFixed(2),
          total: 0
        });
        
        asks.push({
          price: (basePrice * (1 + (i + 1) * 0.001)).toFixed(4),
          amount: (Math.random() * 1000 + 100).toFixed(2),
          total: 0
        });
      }
      
      setOrderBook({ bids, asks });
    };
    
    generateOrderBook();
    const orderBookTimer = setInterval(generateOrderBook, 5000);
    
    // Generate mock trades
    const generateTrade = () => {
      const trade = {
        price: (currentPrice * (1 + (Math.random() - 0.5) * 0.005)).toFixed(4),
        amount: (Math.random() * 100 + 10).toFixed(2),
        side: Math.random() > 0.5 ? 'buy' : 'sell',
        timestamp: Date.now()
      };
      
      setRecentTrades(prev => [trade, ...prev.slice(0, 19)]);
    };
    
    const tradeTimer = setInterval(generateTrade, 3000);
    
    return () => {
      clearInterval(priceTimer);
      clearInterval(orderBookTimer);
      clearInterval(tradeTimer);
    };
  };
  
  const initializeChart = () => {
    const canvas = chartRef.current;
    const ctx = canvas.getContext('2d');
    
    // Set canvas size
    canvas.width = canvas.offsetWidth * window.devicePixelRatio;
    canvas.height = canvas.offsetHeight * window.devicePixelRatio;
    ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    
    // Generate initial candlestick data
    const generateCandlestickData = () => {
      const data = [];
      let price = currentPrice;
      const now = Date.now();
      
      for (let i = 100; i >= 0; i--) {
        const timestamp = now - (i * 3600000); // 1 hour intervals
        const open = price;
        const change = (Math.random() - 0.5) * 0.1;
        const close = open * (1 + change);
        const high = Math.max(open, close) * (1 + Math.random() * 0.02);
        const low = Math.min(open, close) * (1 - Math.random() * 0.02);
        
        data.push({ timestamp, open, high, low, close });
        price = close;
      }
      
      return data;
    };
    
    const candleData = generateCandlestickData();
    chartInstanceRef.current = { data: candleData, ctx, canvas };
    
    drawChart();
  };
  
  const drawChart = () => {
    if (!chartInstanceRef.current) return;
    
    const { ctx, canvas, data } = chartInstanceRef.current;
    const width = canvas.offsetWidth;
    const height = canvas.offsetHeight;
    
    // Clear canvas
    ctx.clearRect(0, 0, width, height);
    
    // Calculate price range
    const prices = data.flatMap(d => [d.high, d.low]);
    const minPrice = Math.min(...prices);
    const maxPrice = Math.max(...prices);
    const priceRange = maxPrice - minPrice;
    
    // Draw grid
    ctx.strokeStyle = '#2B3139';
    ctx.lineWidth = 1;
    
    // Horizontal grid lines
    for (let i = 0; i <= 10; i++) {
      const y = (height / 10) * i;
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
      ctx.stroke();
    }
    
    // Vertical grid lines
    for (let i = 0; i <= 20; i++) {
      const x = (width / 20) * i;
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, height);
      ctx.stroke();
    }
    
    // Draw candlesticks
    const candleWidth = width / data.length * 0.8;
    
    data.forEach((candle, index) => {
      const x = (width / data.length) * index + (width / data.length - candleWidth) / 2;
      const openY = height - ((candle.open - minPrice) / priceRange) * height;
      const closeY = height - ((candle.close - minPrice) / priceRange) * height;
      const highY = height - ((candle.high - minPrice) / priceRange) * height;
      const lowY = height - ((candle.low - minPrice) / priceRange) * height;
      
      const isGreen = candle.close > candle.open;
      ctx.fillStyle = isGreen ? '#0ECB81' : '#F6465D';
      ctx.strokeStyle = isGreen ? '#0ECB81' : '#F6465D';
      
      // Draw wick
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(x + candleWidth / 2, highY);
      ctx.lineTo(x + candleWidth / 2, lowY);
      ctx.stroke();
      
      // Draw body
      const bodyHeight = Math.abs(closeY - openY);
      const bodyY = Math.min(openY, closeY);
      ctx.fillRect(x, bodyY, candleWidth, bodyHeight);
    });
    
    // Draw active indicators
    Object.entries(activeIndicators).forEach(([key, active]) => {
      if (!active) return;
      
      const indicator = indicators.find(i => i.key === key);
      if (!indicator) return;
      
      ctx.strokeStyle = indicator.color;
      ctx.lineWidth = 2;
      ctx.beginPath();
      
      if (key.startsWith('MA') || key.startsWith('EMA')) {
        // Draw moving average line
        const period = parseInt(key.replace(/[^0-9]/g, ''));
        
        data.forEach((candle, index) => {
          if (index < period - 1) return;
          
          // Calculate moving average
          let sum = 0;
          for (let i = 0; i < period; i++) {
            sum += data[index - i].close;
          }
          const ma = sum / period;
          
          const x = (width / data.length) * index + (width / data.length) / 2;
          const y = height - ((ma - minPrice) / priceRange) * height;
          
          if (index === period - 1) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        });
        
        ctx.stroke();
      }
    });
    
    // Draw current price line
    const currentPriceY = height - ((currentPrice - minPrice) / priceRange) * height;
    ctx.strokeStyle = '#F0B90B';
    ctx.lineWidth = 2;
    ctx.setLineDash([5, 5]);
    ctx.beginPath();
    ctx.moveTo(0, currentPriceY);
    ctx.lineTo(width, currentPriceY);
    ctx.stroke();
    ctx.setLineDash([]);
    
    // Draw price label
    ctx.fillStyle = '#F0B90B';
    ctx.fillRect(width - 80, currentPriceY - 12, 75, 24);
    ctx.fillStyle = '#000';
    ctx.font = '12px monospace';
    ctx.textAlign = 'center';
    ctx.fillText(currentPrice.toFixed(4), width - 42.5, currentPriceY + 4);
  };
  
  const updateChart = (priceData) => {
    if (!chartInstanceRef.current) return;
    
    // Update the last candle or add new one
    const { data } = chartInstanceRef.current;
    const lastCandle = data[data.length - 1];
    const now = Date.now();
    
    // If more than 1 hour since last candle, create new one
    if (now - lastCandle.timestamp > 3600000) {
      data.push({
        timestamp: now,
        open: priceData.price,
        high: priceData.price,
        low: priceData.price,
        close: priceData.price
      });
      
      // Keep only last 100 candles
      if (data.length > 100) {
        data.shift();
      }
    } else {
      // Update current candle
      lastCandle.close = priceData.price;
      lastCandle.high = Math.max(lastCandle.high, priceData.price);
      lastCandle.low = Math.min(lastCandle.low, priceData.price);
    }
    
    drawChart();
  };
  
  const toggleIndicator = (indicatorKey) => {
    setActiveIndicators(prev => ({
      ...prev,
      [indicatorKey]: !prev[indicatorKey]
    }));
    
    // Redraw chart with new indicators
    setTimeout(drawChart, 100);
  };
  
  const handleWalletConnect = (connectionResult) => {
    setWalletConnected(true);
    setWalletInfo(connectionResult);
    console.log('Wallet connected:', connectionResult);
  };
  
  const handleWalletDisconnect = async () => {
    await walletService.disconnect();
    setWalletConnected(false);
    setWalletInfo(null);
  };
  
  const formatAddress = (address) => {
    if (!address) return '';
    return `${address.slice(0, 6)}...${address.slice(-6)}`;
  };
  
  return (
    <div className="min-h-screen bg-[#0B0E11] text-white">
      {/* Header */}
      <header className="bg-[#1E2329] border-b border-[#2B3139] px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <img 
              src="/snipswap-logo-square.png" 
              alt="SnipSwap" 
              className="w-8 h-8 brightness-110"
              onError={(e) => {
                e.target.style.display = 'none';
                e.target.nextSibling.style.display = 'flex';
              }}
            />
            <div className="w-8 h-8 bg-[#F0B90B] rounded-lg flex items-center justify-center" style={{display: 'none'}}>
              <span className="text-black font-bold text-sm">S</span>
            </div>
            <div>
              <span className="text-[#F0B90B] text-xl font-bold">SnipSwap</span>
              <span className="text-[#848E9C] text-sm ml-2">Professional Trading</span>
            </div>
          </div>
          
          {/* Wallet Connection */}
          <div className="flex items-center space-x-3">
            {walletConnected ? (
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setShowPortfolio(true)}
                  className="flex items-center space-x-2 bg-[#2B3139] hover:bg-[#3C4043] px-4 py-2 rounded-lg transition-colors"
                >
                  <div className="w-6 h-6 bg-[#F0B90B] rounded-full flex items-center justify-center">
                    <span className="text-black text-xs font-bold">
                      {walletInfo?.address?.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <span className="text-sm font-mono">
                    {formatAddress(walletInfo?.address)}
                  </span>
                </button>
                <button
                  onClick={handleWalletDisconnect}
                  className="text-[#848E9C] hover:text-white transition-colors"
                  title="Disconnect Wallet"
                >
                  🔌
                </button>
              </div>
            ) : (
              <button
                onClick={() => setShowWalletModal(true)}
                className="bg-[#F0B90B] hover:bg-[#E6A500] text-black font-semibold px-6 py-2 rounded-lg transition-colors"
              >
                Connect Wallet
              </button>
            )}
          </div>
        </div>
      </header>
      
      {/* Main Content */}
      <div className="flex flex-col lg:flex-row h-[calc(100vh-73px)]">
        {/* Trading Pairs Sidebar */}
        <div className="w-full lg:w-80 bg-[#1E2329] border-r border-[#2B3139] overflow-y-auto">
          <div className="p-4">
            <h3 className="text-[#848E9C] text-sm font-semibold mb-4">Available Trading Pairs</h3>
            <div className="space-y-1">
              {tradingPairs.map((pair) => (
                <button
                  key={pair.symbol}
                  onClick={() => setSelectedPair(pair.symbol)}
                  className={`w-full flex items-center justify-between p-3 rounded-lg transition-colors ${
                    selectedPair === pair.symbol
                      ? 'bg-[#F0B90B] bg-opacity-20 border border-[#F0B90B]'
                      : 'hover:bg-[#2B3139]'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <span className="text-lg">{pair.icon}</span>
                    <div className="text-left">
                      <div className="font-semibold text-sm">{pair.symbol}</div>
                      <div className="text-[#848E9C] text-xs">{pair.name}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-mono">
                      ${pair.price < 1 ? pair.price.toFixed(6) : pair.price.toFixed(2)}
                    </div>
                    <div className={`text-xs ${
                      pair.change >= 0 ? 'text-[#0ECB81]' : 'text-[#F6465D]'
                    }`}>
                      {pair.change >= 0 ? '+' : ''}{pair.change.toFixed(2)}%
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
        
        {/* Main Trading Interface */}
        <div className="flex-1 flex flex-col">
          {/* Price Header */}
          <div className="bg-[#1E2329] border-b border-[#2B3139] p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-6">
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">
                    {tradingPairs.find(p => p.symbol === selectedPair)?.icon}
                  </span>
                  <div>
                    <h1 className="text-xl font-bold">{selectedPair}</h1>
                    <div className="flex items-center space-x-2">
                      <span className={`text-2xl font-bold ${
                        priceChange >= 0 ? 'text-[#0ECB81]' : 'text-[#F6465D]'
                      }`}>
                        {currentPrice < 1 ? currentPrice.toFixed(6) : currentPrice.toFixed(4)}
                      </span>
                      <span className="text-[#848E9C] text-sm">
                        ${currentPrice < 1 ? currentPrice.toFixed(6) : currentPrice.toFixed(4)}
                      </span>
                      <span className={`text-sm px-2 py-1 rounded ${
                        priceChange >= 0 
                          ? 'bg-[#0ECB81] bg-opacity-20 text-[#0ECB81]' 
                          : 'bg-[#F6465D] bg-opacity-20 text-[#F6465D]'
                      }`}>
                        {priceChange >= 0 ? '+' : ''}{priceChange.toFixed(2)}%
                      </span>
                      {isLive && (
                        <span className="bg-[#0ECB81] text-white text-xs px-2 py-1 rounded-full">
                          Live
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-6 text-sm">
                  <div>
                    <div className="text-[#848E9C]">24h High</div>
                    <div className="font-semibold">{marketStats.high24h.toFixed(4)}</div>
                  </div>
                  <div>
                    <div className="text-[#848E9C]">24h Low</div>
                    <div className="font-semibold">{marketStats.low24h.toFixed(4)}</div>
                  </div>
                  <div>
                    <div className="text-[#848E9C]">24h Vol(ATOM)</div>
                    <div className="font-semibold">{marketStats.volume24h}M</div>
                  </div>
                  <div>
                    <div className="text-[#848E9C]">24h Vol(USDC)</div>
                    <div className="font-semibold">{marketStats.volumeUsdc}M</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Chart Tabs */}
          <div className="bg-[#1E2329] border-b border-[#2B3139] px-4">
            <div className="flex space-x-8">
              {['Chart', 'Order Book', 'Trades', 'Info'].map((tab) => (
                <button
                  key={tab}
                  className="py-4 border-b-2 border-transparent hover:border-[#F0B90B] text-[#848E9C] hover:text-white transition-colors"
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>
          
          {/* Chart Controls */}
          <div className="bg-[#1E2329] border-b border-[#2B3139] p-4">
            <div className="flex items-center justify-between">
              {/* Timeframe Controls */}
              <div className="flex items-center space-x-2">
                <span className="text-[#848E9C] text-sm mr-2">Time:</span>
                {['1s', '15m', '1H', '4H', '1D', '1W'].map((timeframe) => (
                  <button
                    key={timeframe}
                    onClick={() => setSelectedTimeframe(timeframe)}
                    className={`px-3 py-1 rounded text-sm transition-colors ${
                      selectedTimeframe === timeframe
                        ? 'bg-[#F0B90B] text-black'
                        : 'bg-[#2B3139] text-[#848E9C] hover:text-white'
                    }`}
                  >
                    {timeframe}
                  </button>
                ))}
              </div>
              
              {/* Chart Controls */}
              <div className="flex items-center space-x-2">
                <button className="p-2 bg-[#2B3139] hover:bg-[#3C4043] rounded transition-colors">
                  📊
                </button>
                <button className="p-2 bg-[#2B3139] hover:bg-[#3C4043] rounded transition-colors">
                  📈
                </button>
                <button className="p-2 bg-[#2B3139] hover:bg-[#3C4043] rounded transition-colors">
                  ⚙️
                </button>
                <button className="p-2 bg-[#2B3139] hover:bg-[#3C4043] rounded transition-colors">
                  🔍
                </button>
              </div>
            </div>
            
            {/* Indicators */}
            <div className="flex items-center space-x-2 mt-3">
              <span className="text-[#848E9C] text-sm">Indicators:</span>
              {indicators.map((indicator) => (
                <button
                  key={indicator.key}
                  onClick={() => toggleIndicator(indicator.key)}
                  className={`px-3 py-1 rounded text-sm transition-colors ${
                    activeIndicators[indicator.key]
                      ? 'text-white border'
                      : 'bg-[#2B3139] text-[#848E9C] hover:text-white'
                  }`}
                  style={{
                    backgroundColor: activeIndicators[indicator.key] ? indicator.color + '20' : '',
                    borderColor: activeIndicators[indicator.key] ? indicator.color : 'transparent',
                    color: activeIndicators[indicator.key] ? indicator.color : ''
                  }}
                >
                  {indicator.label}
                </button>
              ))}
            </div>
          </div>
          
          {/* Chart Area */}
          <div className="flex-1 bg-[#0B0E11] p-4">
            <div className="relative w-full h-full bg-[#1E2329] rounded-lg overflow-hidden">
              <canvas
                ref={chartRef}
                className="w-full h-full"
                style={{ display: 'block' }}
              />
              
              {!chartInstanceRef.current && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="animate-spin w-8 h-8 border-4 border-[#F0B90B] border-t-transparent rounded-full mx-auto mb-4"></div>
                    <p className="text-[#848E9C]">Loading professional chart...</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        
        {/* Order Book & Trading Panel */}
        <div className="w-full lg:w-80 bg-[#1E2329] border-l border-[#2B3139] flex flex-col">
          {/* Order Book */}
          <div className="flex-1 p-4">
            <h3 className="text-white font-semibold mb-4">Order Book</h3>
            
            {/* Asks */}
            <div className="mb-4">
              <div className="text-[#848E9C] text-xs mb-2 grid grid-cols-3 gap-2">
                <span>Price(USDC)</span>
                <span className="text-right">Amount(ATOM)</span>
                <span className="text-right">Total</span>
              </div>
              <div className="space-y-1">
                {orderBook.asks.slice(0, 8).reverse().map((ask, index) => (
                  <div key={index} className="grid grid-cols-3 gap-2 text-xs hover:bg-[#2B3139] p-1 rounded">
                    <span className="text-[#F6465D] font-mono">{ask.price}</span>
                    <span className="text-right font-mono">{ask.amount}</span>
                    <span className="text-right text-[#848E9C] font-mono">
                      {(parseFloat(ask.price) * parseFloat(ask.amount)).toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Current Price */}
            <div className="text-center py-2 mb-4 bg-[#0B0E11] rounded">
              <span className={`font-mono font-bold ${
                priceChange >= 0 ? 'text-[#0ECB81]' : 'text-[#F6465D]'
              }`}>
                {currentPrice.toFixed(4)}
              </span>
            </div>
            
            {/* Bids */}
            <div>
              <div className="space-y-1">
                {orderBook.bids.slice(0, 8).map((bid, index) => (
                  <div key={index} className="grid grid-cols-3 gap-2 text-xs hover:bg-[#2B3139] p-1 rounded">
                    <span className="text-[#0ECB81] font-mono">{bid.price}</span>
                    <span className="text-right font-mono">{bid.amount}</span>
                    <span className="text-right text-[#848E9C] font-mono">
                      {(parseFloat(bid.price) * parseFloat(bid.amount)).toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          {/* Trading Panel */}
          <div className="border-t border-[#2B3139] p-4">
            <div className="flex space-x-2 mb-4">
              <button className="flex-1 bg-[#0ECB81] hover:bg-[#0BB574] text-white font-semibold py-3 rounded-lg transition-colors">
                Buy {selectedPair.split('/')[0]}
              </button>
              <button className="flex-1 bg-[#F6465D] hover:bg-[#E03E52] text-white font-semibold py-3 rounded-lg transition-colors">
                Sell {selectedPair.split('/')[0]}
              </button>
            </div>
            
            {!walletConnected && (
              <div className="text-center p-4 bg-[#F0B90B] bg-opacity-10 border border-[#F0B90B] rounded-lg">
                <p className="text-[#F0B90B] text-sm mb-2">Connect your wallet to start trading</p>
                <button
                  onClick={() => setShowWalletModal(true)}
                  className="bg-[#F0B90B] text-black px-4 py-2 rounded font-semibold text-sm"
                >
                  Connect Wallet
                </button>
              </div>
            )}
          </div>
          
          {/* Recent Trades */}
          <div className="border-t border-[#2B3139] p-4 max-h-60 overflow-y-auto">
            <h3 className="text-white font-semibold mb-4">Recent Trades</h3>
            <div className="text-[#848E9C] text-xs mb-2 grid grid-cols-3 gap-2">
              <span>Price(USDC)</span>
              <span className="text-right">Amount(ATOM)</span>
              <span className="text-right">Time</span>
            </div>
            <div className="space-y-1">
              {recentTrades.slice(0, 10).map((trade, index) => (
                <div key={index} className="grid grid-cols-3 gap-2 text-xs">
                  <span className={`font-mono ${
                    trade.side === 'buy' ? 'text-[#0ECB81]' : 'text-[#F6465D]'
                  }`}>
                    {trade.price}
                  </span>
                  <span className="text-right font-mono">{trade.amount}</span>
                  <span className="text-right text-[#848E9C]">
                    {new Date(trade.timestamp).toLocaleTimeString().slice(0, 5)}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      {/* Modals */}
      <WalletModal
        isOpen={showWalletModal}
        onClose={() => setShowWalletModal(false)}
        onConnect={handleWalletConnect}
      />
      
      <PortfolioDashboard
        isOpen={showPortfolio}
        onClose={() => setShowPortfolio(false)}
      />
    </div>
  );
};

export default FinalSnipSwapDEX;
