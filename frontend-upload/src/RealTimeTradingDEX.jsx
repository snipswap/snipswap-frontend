import React, { useState, useEffect, useRef, useCallback } from 'react';
import io from 'socket.io-client';

const RealTimeTradingDEX = () => {
  // WebSocket connection
  const [socket, setSocket] = useState(null);
  const [connectionStatus, setConnectionStatus] = useState('disconnected');
  
  // Market data state
  const [prices, setPrices] = useState({});
  const [selectedSymbol, setSelectedSymbol] = useState('ATOM');
  const [orderBook, setOrderBook] = useState({ bids: [], asks: [], spread: '0', mid_price: '0' });
  const [recentTrades, setRecentTrades] = useState([]);
  const [tradingStats, setTradingStats] = useState({});
  
  // Chart and indicators
  const [chartData, setChartData] = useState([]);
  const [activeIndicators, setActiveIndicators] = useState({
    MA7: false, MA25: false, MA99: false, EMA12: false, EMA26: false,
    BB: false, RSI: false, MACD: false
  });
  const [timeframe, setTimeframe] = useState('1D');
  
  // Trading interface
  const [orderType, setOrderType] = useState('limit');
  const [orderSide, setOrderSide] = useState('buy');
  const [orderQuantity, setOrderQuantity] = useState('');
  const [orderPrice, setOrderPrice] = useState('');
  const [userOrders, setUserOrders] = useState([]);
  const [userId] = useState(`user_${Date.now()}`); // Mock user ID
  
  // Privacy features
  const [privateMode, setPrivateMode] = useState(false);
  const [secretNetworkEnabled, setSecretNetworkEnabled] = useState(true);
  
  // System status
  const [systemStatus, setSystemStatus] = useState({});
  const [providerStatus, setProviderStatus] = useState({});
  
  // Chart canvas ref
  const chartCanvasRef = useRef(null);
  
  // Available trading pairs
  const tradingPairs = [
    'ATOM', 'OSMO', 'SCRT', 'JUNO', 'STARS', 'HUAHUA', 'DVPN', 'AKT',
    'INJ', 'LUNA', 'KUJI', 'CMDX', 'BTC', 'ETH'
  ];

  // Initialize WebSocket connection
  useEffect(() => {
    const newSocket = io('http://localhost:5000', {
      transports: ['websocket'],
      upgrade: false
    });

    newSocket.on('connect', () => {
      console.log('Connected to SnipSwap DEX backend');
      setConnectionStatus('connected');
      
      // Subscribe to price updates for all symbols
      newSocket.emit('subscribe_prices', { symbols: tradingPairs });
      
      // Subscribe to order book for selected symbol
      newSocket.emit('subscribe_orderbook', { symbol: selectedSymbol });
      
      // Subscribe to trades for selected symbol
      newSocket.emit('subscribe_trades', { symbol: selectedSymbol });
    });

    newSocket.on('disconnect', () => {
      console.log('Disconnected from SnipSwap DEX backend');
      setConnectionStatus('disconnected');
    });

    newSocket.on('price_update', (data) => {
      setPrices(prevPrices => ({
        ...prevPrices,
        ...data.prices
      }));
      
      // Update chart data with new prices
      if (data.prices[selectedSymbol]) {
        const newPrice = parseFloat(data.prices[selectedSymbol].price);
        updateChartData(newPrice);
      }
    });

    newSocket.on('orderbook_update', (data) => {
      if (data.symbol === `${selectedSymbol}/USDC`) {
        setOrderBook(data.data);
      }
    });

    newSocket.on('trades_update', (data) => {
      if (data.symbol === `${selectedSymbol}/USDC`) {
        setRecentTrades(data.trades);
      }
    });

    newSocket.on('system_status', (data) => {
      setSystemStatus(data);
      setProviderStatus(data.oracle_providers || {});
    });

    setSocket(newSocket);

    return () => {
      newSocket.close();
    };
  }, [selectedSymbol]);

  // Update chart data
  const updateChartData = useCallback((newPrice) => {
    const now = Date.now();
    setChartData(prevData => {
      const newCandle = {
        timestamp: now,
        open: prevData.length > 0 ? prevData[prevData.length - 1].close : newPrice,
        high: newPrice,
        low: newPrice,
        close: newPrice,
        volume: Math.random() * 1000 + 100
      };
      
      const updatedData = [...prevData, newCandle];
      return updatedData.slice(-100); // Keep last 100 candles
    });
  }, []);

  // Fetch trading statistics
  const fetchTradingStats = async (symbol) => {
    try {
      const response = await fetch(`http://localhost:5000/api/stats/${symbol}`);
      const data = await response.json();
      setTradingStats(data);
    } catch (error) {
      console.error('Error fetching trading stats:', error);
    }
  };

  // Fetch user orders
  const fetchUserOrders = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/orders/${userId}`);
      const data = await response.json();
      setUserOrders(data.orders || []);
    } catch (error) {
      console.error('Error fetching user orders:', error);
    }
  };

  // Place order
  const placeOrder = async () => {
    if (!orderQuantity || (orderType === 'limit' && !orderPrice)) {
      alert('Please fill in all required fields');
      return;
    }

    try {
      const orderData = {
        user_id: userId,
        symbol: selectedSymbol,
        side: orderSide,
        type: orderType,
        quantity: parseFloat(orderQuantity),
        price: orderType === 'limit' ? parseFloat(orderPrice) : null,
        private: privateMode
      };

      const response = await fetch('http://localhost:5000/api/order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData),
      });

      const result = await response.json();
      
      if (result.success) {
        alert(`Order placed successfully! Order ID: ${result.order_id}`);
        setOrderQuantity('');
        setOrderPrice('');
        fetchUserOrders();
      } else {
        alert(`Error placing order: ${result.error}`);
      }
    } catch (error) {
      console.error('Error placing order:', error);
      alert('Error placing order. Please try again.');
    }
  };

  // Cancel order
  const cancelOrder = async (orderId) => {
    try {
      const response = await fetch(`http://localhost:5000/api/order/${orderId}?user_id=${userId}`, {
        method: 'DELETE',
      });

      const result = await response.json();
      
      if (result.success) {
        alert('Order cancelled successfully!');
        fetchUserOrders();
      } else {
        alert(`Error cancelling order: ${result.error}`);
      }
    } catch (error) {
      console.error('Error cancelling order:', error);
      alert('Error cancelling order. Please try again.');
    }
  };

  // Handle symbol change
  const handleSymbolChange = (symbol) => {
    setSelectedSymbol(symbol);
    
    // Update subscriptions
    if (socket) {
      socket.emit('subscribe_orderbook', { symbol });
      socket.emit('subscribe_trades', { symbol });
    }
    
    // Fetch new trading stats
    fetchTradingStats(symbol);
    
    // Reset chart data
    setChartData([]);
  };

  // Toggle indicator
  const toggleIndicator = (indicator) => {
    setActiveIndicators(prev => ({
      ...prev,
      [indicator]: !prev[indicator]
    }));
  };

  // Draw chart
  useEffect(() => {
    const canvas = chartCanvasRef.current;
    if (!canvas || chartData.length === 0) return;

    const ctx = canvas.getContext('2d');
    const { width, height } = canvas;
    
    // Clear canvas
    ctx.clearRect(0, 0, width, height);
    
    // Set up chart parameters
    const padding = 40;
    const chartWidth = width - 2 * padding;
    const chartHeight = height - 2 * padding;
    
    if (chartData.length === 0) return;
    
    // Calculate price range
    const prices = chartData.map(d => [d.high, d.low]).flat();
    const minPrice = Math.min(...prices);
    const maxPrice = Math.max(...prices);
    const priceRange = maxPrice - minPrice || 1;
    
    // Draw background
    ctx.fillStyle = '#1E2329';
    ctx.fillRect(0, 0, width, height);
    
    // Draw grid
    ctx.strokeStyle = '#2B3139';
    ctx.lineWidth = 1;
    
    // Horizontal grid lines
    for (let i = 0; i <= 5; i++) {
      const y = padding + (chartHeight * i) / 5;
      ctx.beginPath();
      ctx.moveTo(padding, y);
      ctx.lineTo(width - padding, y);
      ctx.stroke();
      
      // Price labels
      const price = maxPrice - (priceRange * i) / 5;
      ctx.fillStyle = '#848E9C';
      ctx.font = '12px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto';
      ctx.textAlign = 'right';
      ctx.fillText(price.toFixed(4), width - padding - 5, y + 4);
    }
    
    // Vertical grid lines
    const timeStep = Math.max(1, Math.floor(chartData.length / 8));
    for (let i = 0; i < chartData.length; i += timeStep) {
      const x = padding + (chartWidth * i) / (chartData.length - 1);
      ctx.beginPath();
      ctx.moveTo(x, padding);
      ctx.lineTo(x, height - padding);
      ctx.stroke();
    }
    
    // Draw candlesticks
    const candleWidth = Math.max(2, chartWidth / chartData.length - 2);
    
    chartData.forEach((candle, index) => {
      const x = padding + (chartWidth * index) / (chartData.length - 1);
      const openY = padding + ((maxPrice - candle.open) / priceRange) * chartHeight;
      const closeY = padding + ((maxPrice - candle.close) / priceRange) * chartHeight;
      const highY = padding + ((maxPrice - candle.high) / priceRange) * chartHeight;
      const lowY = padding + ((maxPrice - candle.low) / priceRange) * chartHeight;
      
      const isGreen = candle.close >= candle.open;
      ctx.fillStyle = isGreen ? '#0ECB81' : '#F6465D';
      ctx.strokeStyle = isGreen ? '#0ECB81' : '#F6465D';
      
      // Draw wick
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(x, highY);
      ctx.lineTo(x, lowY);
      ctx.stroke();
      
      // Draw body
      const bodyTop = Math.min(openY, closeY);
      const bodyHeight = Math.abs(closeY - openY) || 1;
      ctx.fillRect(x - candleWidth / 2, bodyTop, candleWidth, bodyHeight);
    });
    
    // Draw current price line
    if (prices[selectedSymbol]) {
      const currentPrice = parseFloat(prices[selectedSymbol].price);
      const currentPriceY = padding + ((maxPrice - currentPrice) / priceRange) * chartHeight;
      
      // Dotted line
      ctx.strokeStyle = '#F0B90B';
      ctx.lineWidth = 1;
      ctx.setLineDash([5, 5]);
      ctx.beginPath();
      ctx.moveTo(padding, currentPriceY);
      ctx.lineTo(width - padding, currentPriceY);
      ctx.stroke();
      ctx.setLineDash([]);
      
      // Price label
      ctx.fillStyle = '#F0B90B';
      ctx.fillRect(width - padding - 80, currentPriceY - 10, 75, 20);
      ctx.fillStyle = '#000';
      ctx.font = 'bold 12px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto';
      ctx.textAlign = 'center';
      ctx.fillText(currentPrice.toFixed(4), width - padding - 42.5, currentPriceY + 4);
    }
    
    // Draw indicators
    if (activeIndicators.MA7 && chartData.length >= 7) {
      drawMovingAverage(ctx, 7, '#F7931A', padding, chartWidth, chartHeight, maxPrice, minPrice, priceRange);
    }
    if (activeIndicators.MA25 && chartData.length >= 25) {
      drawMovingAverage(ctx, 25, '#E91E63', padding, chartWidth, chartHeight, maxPrice, minPrice, priceRange);
    }
    if (activeIndicators.MA99 && chartData.length >= 99) {
      drawMovingAverage(ctx, 99, '#9C27B0', padding, chartWidth, chartHeight, maxPrice, minPrice, priceRange);
    }
    
  }, [chartData, activeIndicators, prices, selectedSymbol]);

  // Draw moving average
  const drawMovingAverage = (ctx, period, color, padding, chartWidth, chartHeight, maxPrice, minPrice, priceRange) => {
    if (chartData.length < period) return;
    
    ctx.strokeStyle = color;
    ctx.lineWidth = 2;
    ctx.beginPath();
    
    for (let i = period - 1; i < chartData.length; i++) {
      const sum = chartData.slice(i - period + 1, i + 1).reduce((acc, candle) => acc + candle.close, 0);
      const ma = sum / period;
      
      const x = padding + (chartWidth * i) / (chartData.length - 1);
      const y = padding + ((maxPrice - ma) / priceRange) * chartHeight;
      
      if (i === period - 1) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
    }
    
    ctx.stroke();
  };

  // Load initial data
  useEffect(() => {
    fetchTradingStats(selectedSymbol);
    fetchUserOrders();
  }, [selectedSymbol, userId]);

  // Format number
  const formatNumber = (num, decimals = 4) => {
    if (!num) return '0';
    return parseFloat(num).toFixed(decimals);
  };

  // Format percentage
  const formatPercentage = (num) => {
    if (!num) return '0.00%';
    const value = parseFloat(num);
    return `${value >= 0 ? '+' : ''}${value.toFixed(2)}%`;
  };

  const currentPrice = prices[selectedSymbol];

  return (
    <div className="min-h-screen bg-[#0B0E11] text-white font-sans">
      {/* Header */}
      <header className="bg-[#1E2329] border-b border-[#2B3139] px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <img 
                src="/snipswap-logo-square.png" 
                alt="SnipSwap" 
                className="w-8 h-8 brightness-110"
                onError={(e) => {
                  e.target.style.display = 'none';
                }}
              />
              <span className="text-xl font-bold text-[#F0B90B]">SnipSwap</span>
              <span className="text-sm text-[#848E9C]">Professional Trading</span>
            </div>
            
            {/* Connection Status */}
            <div className="flex items-center space-x-2">
              <div className={`w-2 h-2 rounded-full ${
                connectionStatus === 'connected' ? 'bg-[#0ECB81]' : 'bg-[#F6465D]'
              }`}></div>
              <span className="text-xs text-[#848E9C] capitalize">{connectionStatus}</span>
              {connectionStatus === 'connected' && (
                <span className="text-xs bg-[#0ECB81] text-black px-2 py-1 rounded">Live</span>
              )}
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            {/* Privacy Mode Toggle */}
            <div className="flex items-center space-x-2">
              <span className="text-sm text-[#848E9C]">Private Mode</span>
              <button
                onClick={() => setPrivateMode(!privateMode)}
                className={`w-12 h-6 rounded-full transition-colors ${
                  privateMode ? 'bg-[#F0B90B]' : 'bg-[#2B3139]'
                }`}
              >
                <div className={`w-5 h-5 bg-white rounded-full transition-transform ${
                  privateMode ? 'translate-x-6' : 'translate-x-0.5'
                }`}></div>
              </button>
              {privateMode && (
                <span className="text-xs bg-[#F0B90B] text-black px-2 py-1 rounded">🔒 Secret Network</span>
              )}
            </div>
            
            <button className="bg-[#F0B90B] text-black px-6 py-2 rounded font-semibold hover:bg-[#E6A500] transition-colors">
              Connect Wallet
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex">
        {/* Left Sidebar - Trading Pairs */}
        <div className="w-64 bg-[#1E2329] border-r border-[#2B3139] p-4">
          <h3 className="text-sm font-semibold text-[#848E9C] mb-4">Available Trading Pairs</h3>
          <div className="space-y-1">
            {tradingPairs.map(symbol => {
              const price = prices[symbol];
              const isSelected = symbol === selectedSymbol;
              
              return (
                <button
                  key={symbol}
                  onClick={() => handleSymbolChange(symbol)}
                  className={`w-full text-left p-3 rounded transition-colors ${
                    isSelected ? 'bg-[#2B3139]' : 'hover:bg-[#2B3139]'
                  }`}
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <div className="font-semibold">{symbol}/USDC</div>
                      {price && (
                        <div className="text-sm text-[#848E9C]">
                          ${formatNumber(price.price)}
                        </div>
                      )}
                    </div>
                    {price && (
                      <div className={`text-sm font-semibold ${
                        parseFloat(price.change_24h) >= 0 ? 'text-[#0ECB81]' : 'text-[#F6465D]'
                      }`}>
                        {formatPercentage(price.change_24h)}
                      </div>
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Main Trading Area */}
        <div className="flex-1 flex flex-col">
          {/* Price Header */}
          <div className="bg-[#1E2329] border-b border-[#2B3139] p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-6">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-[#F0B90B] rounded-full flex items-center justify-center">
                    <span className="text-black font-bold text-sm">{selectedSymbol.slice(0, 2)}</span>
                  </div>
                  <div>
                    <h1 className="text-xl font-bold">{selectedSymbol}/USDC</h1>
                    {currentPrice && (
                      <div className="flex items-center space-x-4">
                        <span className="text-2xl font-bold text-[#0ECB81]">
                          ${formatNumber(currentPrice.price)}
                        </span>
                        <span className={`text-sm font-semibold ${
                          parseFloat(currentPrice.change_24h) >= 0 ? 'text-[#0ECB81]' : 'text-[#F6465D]'
                        }`}>
                          {formatPercentage(currentPrice.change_24h)}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
                
                {currentPrice && (
                  <div className="flex space-x-6 text-sm">
                    <div>
                      <div className="text-[#848E9C]">24h High</div>
                      <div className="font-semibold">${formatNumber(currentPrice.high_24h)}</div>
                    </div>
                    <div>
                      <div className="text-[#848E9C]">24h Low</div>
                      <div className="font-semibold">${formatNumber(currentPrice.low_24h)}</div>
                    </div>
                    <div>
                      <div className="text-[#848E9C]">24h Vol({selectedSymbol})</div>
                      <div className="font-semibold">{formatNumber(tradingStats.volume_24h || 0, 0)}</div>
                    </div>
                    <div>
                      <div className="text-[#848E9C]">24h Vol(USDC)</div>
                      <div className="font-semibold">{formatNumber(tradingStats.volume_24h || 0, 0)}</div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Chart and Trading Interface */}
          <div className="flex flex-1">
            {/* Chart Area */}
            <div className="flex-1 bg-[#0B0E11] p-4">
              {/* Chart Controls */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex space-x-2">
                  {['1s', '15m', '1H', '4H', '1D', '1W'].map(tf => (
                    <button
                      key={tf}
                      onClick={() => setTimeframe(tf)}
                      className={`px-3 py-1 rounded text-sm transition-colors ${
                        timeframe === tf 
                          ? 'bg-[#F0B90B] text-black' 
                          : 'bg-[#2B3139] text-[#848E9C] hover:bg-[#3C4043]'
                      }`}
                    >
                      {tf}
                    </button>
                  ))}
                </div>
                
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-[#848E9C]">Indicators:</span>
                  {Object.entries(activeIndicators).map(([indicator, active]) => (
                    <button
                      key={indicator}
                      onClick={() => toggleIndicator(indicator)}
                      className={`px-2 py-1 rounded text-xs transition-colors ${
                        active
                          ? indicator === 'MA7' ? 'bg-[#F7931A] text-white'
                          : indicator === 'MA25' ? 'bg-[#E91E63] text-white'
                          : indicator === 'MA99' ? 'bg-[#9C27B0] text-white'
                          : indicator === 'EMA12' ? 'bg-[#00BCD4] text-white'
                          : indicator === 'EMA26' ? 'bg-[#4CAF50] text-white'
                          : indicator === 'BB' ? 'bg-[#FF9800] text-white'
                          : indicator === 'RSI' ? 'bg-[#2196F3] text-white'
                          : 'bg-[#795548] text-white'
                          : 'bg-[#2B3139] text-[#848E9C] hover:bg-[#3C4043]'
                      }`}
                    >
                      {indicator}
                    </button>
                  ))}
                </div>
              </div>

              {/* Chart Canvas */}
              <div className="bg-[#1E2329] rounded-lg p-4 h-96">
                <canvas
                  ref={chartCanvasRef}
                  width={800}
                  height={350}
                  className="w-full h-full"
                />
              </div>
            </div>

            {/* Right Sidebar - Order Book and Trading */}
            <div className="w-80 bg-[#1E2329] border-l border-[#2B3139]">
              {/* Trading Interface */}
              <div className="p-4 border-b border-[#2B3139]">
                <div className="flex space-x-2 mb-4">
                  <button
                    onClick={() => setOrderSide('buy')}
                    className={`flex-1 py-2 rounded font-semibold transition-colors ${
                      orderSide === 'buy' ? 'bg-[#0ECB81] text-white' : 'bg-[#2B3139] text-[#848E9C]'
                    }`}
                  >
                    Buy
                  </button>
                  <button
                    onClick={() => setOrderSide('sell')}
                    className={`flex-1 py-2 rounded font-semibold transition-colors ${
                      orderSide === 'sell' ? 'bg-[#F6465D] text-white' : 'bg-[#2B3139] text-[#848E9C]'
                    }`}
                  >
                    Sell
                  </button>
                </div>

                <div className="space-y-3">
                  <div>
                    <label className="block text-sm text-[#848E9C] mb-1">Order Type</label>
                    <select
                      value={orderType}
                      onChange={(e) => setOrderType(e.target.value)}
                      className="w-full bg-[#2B3139] border border-[#3C4043] rounded px-3 py-2 text-white"
                    >
                      <option value="limit">Limit</option>
                      <option value="market">Market</option>
                    </select>
                  </div>

                  {orderType === 'limit' && (
                    <div>
                      <label className="block text-sm text-[#848E9C] mb-1">Price (USDC)</label>
                      <input
                        type="number"
                        value={orderPrice}
                        onChange={(e) => setOrderPrice(e.target.value)}
                        placeholder="0.00"
                        className="w-full bg-[#2B3139] border border-[#3C4043] rounded px-3 py-2 text-white"
                      />
                    </div>
                  )}

                  <div>
                    <label className="block text-sm text-[#848E9C] mb-1">Quantity ({selectedSymbol})</label>
                    <input
                      type="number"
                      value={orderQuantity}
                      onChange={(e) => setOrderQuantity(e.target.value)}
                      placeholder="0.00"
                      className="w-full bg-[#2B3139] border border-[#3C4043] rounded px-3 py-2 text-white"
                    />
                  </div>

                  <button
                    onClick={placeOrder}
                    className={`w-full py-3 rounded font-semibold transition-colors ${
                      orderSide === 'buy' 
                        ? 'bg-[#0ECB81] hover:bg-[#0BB574] text-white'
                        : 'bg-[#F6465D] hover:bg-[#E03E52] text-white'
                    }`}
                  >
                    {orderSide === 'buy' ? 'Buy' : 'Sell'} {selectedSymbol}
                  </button>
                </div>
              </div>

              {/* Order Book */}
              <div className="p-4">
                <h3 className="text-sm font-semibold text-[#848E9C] mb-3">Order Book</h3>
                
                {/* Asks (Sell Orders) */}
                <div className="mb-4">
                  <div className="flex justify-between text-xs text-[#848E9C] mb-2">
                    <span>Price (USDC)</span>
                    <span>Amount ({selectedSymbol})</span>
                    <span>Total</span>
                  </div>
                  <div className="space-y-1 max-h-32 overflow-y-auto">
                    {orderBook.asks.slice(0, 8).reverse().map((ask, index) => (
                      <div key={index} className="flex justify-between text-xs">
                        <span className="text-[#F6465D]">{formatNumber(ask.price)}</span>
                        <span className="text-white">{formatNumber(ask.quantity, 2)}</span>
                        <span className="text-[#848E9C]">{formatNumber(ask.total, 2)}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Spread */}
                <div className="text-center py-2 border-y border-[#2B3139] mb-4">
                  <div className="text-xs text-[#848E9C]">Spread</div>
                  <div className="text-sm font-semibold text-[#F0B90B]">
                    {formatNumber(orderBook.spread)} ({formatPercentage((parseFloat(orderBook.spread) / parseFloat(orderBook.mid_price)) * 100)})
                  </div>
                </div>

                {/* Bids (Buy Orders) */}
                <div>
                  <div className="space-y-1 max-h-32 overflow-y-auto">
                    {orderBook.bids.slice(0, 8).map((bid, index) => (
                      <div key={index} className="flex justify-between text-xs">
                        <span className="text-[#0ECB81]">{formatNumber(bid.price)}</span>
                        <span className="text-white">{formatNumber(bid.quantity, 2)}</span>
                        <span className="text-[#848E9C]">{formatNumber(bid.total, 2)}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Recent Trades */}
              <div className="p-4 border-t border-[#2B3139]">
                <h3 className="text-sm font-semibold text-[#848E9C] mb-3">Recent Trades</h3>
                <div className="space-y-1 max-h-40 overflow-y-auto">
                  {recentTrades.slice(0, 10).map((trade, index) => (
                    <div key={index} className="flex justify-between text-xs">
                      <span className={trade.side === 'buy' ? 'text-[#0ECB81]' : 'text-[#F6465D]'}>
                        {formatNumber(trade.price)}
                      </span>
                      <span className="text-white">{formatNumber(trade.quantity, 2)}</span>
                      <span className="text-[#848E9C]">
                        {new Date(trade.timestamp * 1000).toLocaleTimeString()}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Status Bar */}
      <div className="bg-[#1E2329] border-t border-[#2B3139] px-4 py-2">
        <div className="flex items-center justify-between text-xs text-[#848E9C]">
          <div className="flex items-center space-x-4">
            <span>System Status: Operational</span>
            <span>Trading Pairs: {Object.keys(orderBook).length || tradingPairs.length}</span>
            <span>Active Orders: {userOrders.length}</span>
          </div>
          <div className="flex items-center space-x-4">
            <span>Provider Status:</span>
            {Object.entries(providerStatus).map(([provider, status]) => (
              <span key={provider} className={`px-2 py-1 rounded ${
                status.status === 'healthy' ? 'bg-[#0ECB81] text-black' : 
                status.status === 'degraded' ? 'bg-[#F0B90B] text-black' : 'bg-[#F6465D] text-white'
              }`}>
                {provider}: {status.status}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RealTimeTradingDEX;
