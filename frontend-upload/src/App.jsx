import React, { useState, useEffect, useRef, useCallback } from 'react';
import priceService from './services/priceService';

const SnipSwapDEX = () => {
  // Market data state
  const [prices, setPrices] = useState({});
  const [selectedSymbol, setSelectedSymbol] = useState('ATOM');
  const [loading, setLoading] = useState(true);
  
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
  
  // Privacy features
  const [privateMode, setPrivateMode] = useState(false);
  
  // Chart canvas ref
  const chartCanvasRef = useRef(null);
  
  // Available trading pairs
  const tradingPairs = [
    'ATOM', 'OSMO', 'SCRT', 'JUNO', 'STARS', 'HUAHUA', 'DVPN', 'AKT',
    'INJ', 'LUNA', 'KUJI', 'CMDX', 'BTC', 'ETH'
  ];

  // Fetch prices on mount and periodically
  useEffect(() => {
    const fetchPrices = async () => {
      try {
        const priceData = await priceService.fetchPrices(tradingPairs);
        setPrices(priceData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching prices:', error);
      }
    };

    // Initial fetch
    fetchPrices();

    // Update every 30 seconds
    const interval = setInterval(fetchPrices, 30000);

    return () => clearInterval(interval);
  }, []);

  // Fetch historical data when symbol changes
  useEffect(() => {
    const fetchHistoricalData = async () => {
      try {
        const days = timeframe === '1D' ? 1 : timeframe === '1W' ? 7 : 1;
        const data = await priceService.fetchHistoricalData(selectedSymbol, days);
        setChartData(data);
      } catch (error) {
        console.error('Error fetching historical data:', error);
      }
    };

    if (selectedSymbol) {
      fetchHistoricalData();
    }
  }, [selectedSymbol, timeframe]);

  // Handle symbol change
  const handleSymbolChange = (symbol) => {
    setSelectedSymbol(symbol);
  };

  // Toggle indicator
  const toggleIndicator = (indicator) => {
    setActiveIndicators(prev => ({
      ...prev,
      [indicator]: !prev[indicator]
    }));
  };

  // Calculate moving average
  const calculateMA = (data, period) => {
    const ma = [];
    for (let i = period - 1; i < data.length; i++) {
      const sum = data.slice(i - period + 1, i + 1).reduce((acc, candle) => acc + candle.close, 0);
      ma.push({ index: i, value: sum / period });
    }
    return ma;
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
    
    // Calculate price range
    const allPrices = chartData.map(d => [d.high, d.low]).flat();
    const minPrice = Math.min(...allPrices);
    const maxPrice = Math.max(...allPrices);
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
    const currentPrice = prices[selectedSymbol];
    if (currentPrice) {
      const currentPriceY = padding + ((maxPrice - currentPrice.price) / priceRange) * chartHeight;
      
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
      ctx.fillText(currentPrice.price.toFixed(4), width - padding - 42.5, currentPriceY + 4);
    }
    
    // Draw indicators
    if (activeIndicators.MA7 && chartData.length >= 7) {
      drawMovingAverage(ctx, 7, '#F7931A');
    }
    if (activeIndicators.MA25 && chartData.length >= 25) {
      drawMovingAverage(ctx, 25, '#E91E63');
    }
    if (activeIndicators.MA99 && chartData.length >= 99) {
      drawMovingAverage(ctx, 99, '#9C27B0');
    }
    
    function drawMovingAverage(ctx, period, color) {
      if (chartData.length < period) return;
      
      const ma = calculateMA(chartData, period);
      
      ctx.strokeStyle = color;
      ctx.lineWidth = 2;
      ctx.beginPath();
      
      ma.forEach((point, idx) => {
        const x = padding + (chartWidth * point.index) / (chartData.length - 1);
        const y = padding + ((maxPrice - point.value) / priceRange) * chartHeight;
        
        if (idx === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      });
      
      ctx.stroke();
    }
    
  }, [chartData, activeIndicators, prices, selectedSymbol]);

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
    <div style={{ minHeight: '100vh', backgroundColor: '#0B0E11', color: 'white', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}>
      {/* Header */}
      <header style={{ backgroundColor: '#1E2329', borderBottom: '1px solid #2B3139', padding: '12px 16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontSize: '20px', fontWeight: 'bold', color: '#F0B90B' }}>SnipSwap</span>
              <span style={{ fontSize: '14px', color: '#848E9C' }}>Professional Trading</span>
            </div>
            
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#0ECB81' }}></div>
              <span style={{ fontSize: '12px', color: '#848E9C' }}>Live</span>
              <span style={{ fontSize: '11px', backgroundColor: '#0ECB81', color: 'black', padding: '2px 8px', borderRadius: '4px' }}>Real-Time</span>
            </div>
          </div>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontSize: '14px', color: '#848E9C' }}>Private Mode</span>
              <button
                onClick={() => setPrivateMode(!privateMode)}
                style={{
                  width: '48px',
                  height: '24px',
                  borderRadius: '12px',
                  backgroundColor: privateMode ? '#F0B90B' : '#2B3139',
                  border: 'none',
                  cursor: 'pointer',
                  position: 'relative',
                  transition: 'all 0.3s'
                }}
              >
                <div style={{
                  width: '20px',
                  height: '20px',
                  backgroundColor: 'white',
                  borderRadius: '50%',
                  position: 'absolute',
                  top: '2px',
                  left: privateMode ? '26px' : '2px',
                  transition: 'all 0.3s'
                }}></div>
              </button>
              {privateMode && (
                <span style={{ fontSize: '11px', backgroundColor: '#F0B90B', color: 'black', padding: '2px 8px', borderRadius: '4px' }}>🔒 Secret Network</span>
              )}
            </div>
            
            <button style={{
              backgroundColor: '#F0B90B',
              color: 'black',
              padding: '8px 24px',
              borderRadius: '4px',
              fontWeight: '600',
              border: 'none',
              cursor: 'pointer'
            }}>
              Connect Wallet
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div style={{ display: 'flex' }}>
        {/* Left Sidebar - Trading Pairs */}
        <div style={{ width: '256px', backgroundColor: '#1E2329', borderRight: '1px solid #2B3139', padding: '16px' }}>
          <h3 style={{ fontSize: '14px', fontWeight: '600', color: '#848E9C', marginBottom: '16px' }}>Available Trading Pairs</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            {tradingPairs.map(symbol => {
              const price = prices[symbol];
              const isSelected = symbol === selectedSymbol;
              
              return (
                <button
                  key={symbol}
                  onClick={() => handleSymbolChange(symbol)}
                  style={{
                    width: '100%',
                    textAlign: 'left',
                    padding: '12px',
                    borderRadius: '4px',
                    backgroundColor: isSelected ? '#2B3139' : 'transparent',
                    border: 'none',
                    color: 'white',
                    cursor: 'pointer',
                    transition: 'background-color 0.2s'
                  }}
                  onMouseEnter={(e) => !isSelected && (e.target.style.backgroundColor = '#2B3139')}
                  onMouseLeave={(e) => !isSelected && (e.target.style.backgroundColor = 'transparent')}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                      <div style={{ fontWeight: '600' }}>{symbol}/USDC</div>
                      {price && (
                        <div style={{ fontSize: '12px', color: '#848E9C' }}>
                          ${formatNumber(price.price)}
                        </div>
                      )}
                    </div>
                    {price && (
                      <div style={{
                        fontSize: '12px',
                        fontWeight: '600',
                        color: price.change_24h >= 0 ? '#0ECB81' : '#F6465D'
                      }}>
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
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
          {/* Price Header */}
          <div style={{ backgroundColor: '#1E2329', borderBottom: '1px solid #2B3139', padding: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{
                    width: '32px',
                    height: '32px',
                    backgroundColor: '#F0B90B',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <span style={{ color: 'black', fontWeight: 'bold', fontSize: '14px' }}>{selectedSymbol.slice(0, 2)}</span>
                  </div>
                  <div>
                    <h1 style={{ fontSize: '20px', fontWeight: 'bold', margin: 0 }}>{selectedSymbol}/USDC</h1>
                    {currentPrice && (
                      <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginTop: '4px' }}>
                        <span style={{ fontSize: '24px', fontWeight: 'bold', color: '#0ECB81' }}>
                          ${formatNumber(currentPrice.price)}
                        </span>
                        <span style={{
                          fontSize: '14px',
                          fontWeight: '600',
                          color: currentPrice.change_24h >= 0 ? '#0ECB81' : '#F6465D'
                        }}>
                          {formatPercentage(currentPrice.change_24h)}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
                
                {currentPrice && (
                  <div style={{ display: 'flex', gap: '24px', fontSize: '14px' }}>
                    <div>
                      <div style={{ color: '#848E9C' }}>24h High</div>
                      <div style={{ fontWeight: '600' }}>${formatNumber(currentPrice.high_24h)}</div>
                    </div>
                    <div>
                      <div style={{ color: '#848E9C' }}>24h Low</div>
                      <div style={{ fontWeight: '600' }}>${formatNumber(currentPrice.low_24h)}</div>
                    </div>
                    <div>
                      <div style={{ color: '#848E9C' }}>24h Vol({selectedSymbol})</div>
                      <div style={{ fontWeight: '600' }}>{formatNumber(currentPrice.volume_24h, 0)}</div>
                    </div>
                    <div>
                      <div style={{ color: '#848E9C' }}>Source</div>
                      <div style={{ fontWeight: '600', textTransform: 'capitalize' }}>{currentPrice.source}</div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Chart Area */}
          <div style={{ flex: 1, backgroundColor: '#0B0E11', padding: '16px' }}>
            {/* Chart Controls */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
              <div style={{ display: 'flex', gap: '8px' }}>
                {['1s', '15m', '1H', '4H', '1D', '1W'].map(tf => (
                  <button
                    key={tf}
                    onClick={() => setTimeframe(tf)}
                    style={{
                      padding: '4px 12px',
                      borderRadius: '4px',
                      fontSize: '14px',
                      backgroundColor: timeframe === tf ? '#F0B90B' : '#2B3139',
                      color: timeframe === tf ? 'black' : '#848E9C',
                      border: 'none',
                      cursor: 'pointer',
                      transition: 'all 0.2s'
                    }}
                  >
                    {tf}
                  </button>
                ))}
              </div>
              
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontSize: '14px', color: '#848E9C' }}>Indicators:</span>
                {Object.entries(activeIndicators).map(([indicator, active]) => {
                  const colors = {
                    MA7: '#F7931A',
                    MA25: '#E91E63',
                    MA99: '#9C27B0',
                    EMA12: '#00BCD4',
                    EMA26: '#4CAF50',
                    BB: '#FF9800',
                    RSI: '#2196F3',
                    MACD: '#795548'
                  };
                  
                  return (
                    <button
                      key={indicator}
                      onClick={() => toggleIndicator(indicator)}
                      style={{
                        padding: '4px 8px',
                        borderRadius: '4px',
                        fontSize: '12px',
                        backgroundColor: active ? colors[indicator] : '#2B3139',
                        color: active ? 'white' : '#848E9C',
                        border: 'none',
                        cursor: 'pointer',
                        transition: 'all 0.2s'
                      }}
                    >
                      {indicator}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Chart Canvas */}
            <div style={{ backgroundColor: '#1E2329', borderRadius: '8px', padding: '16px' }}>
              {loading ? (
                <div style={{ height: '384px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <span style={{ color: '#848E9C' }}>Loading chart data...</span>
                </div>
              ) : (
                <canvas
                  ref={chartCanvasRef}
                  width={1000}
                  height={400}
                  style={{ width: '100%', height: '400px' }}
                />
              )}
            </div>
          </div>
        </div>

        {/* Right Sidebar - Trading Interface */}
        <div style={{ width: '320px', backgroundColor: '#1E2329', borderLeft: '1px solid #2B3139' }}>
          {/* Trading Interface */}
          <div style={{ padding: '16px', borderBottom: '1px solid #2B3139' }}>
            <div style={{ display: 'flex', gap: '8px', marginBottom: '16px' }}>
              <button
                onClick={() => setOrderSide('buy')}
                style={{
                  flex: 1,
                  padding: '8px',
                  borderRadius: '4px',
                  fontWeight: '600',
                  backgroundColor: orderSide === 'buy' ? '#0ECB81' : '#2B3139',
                  color: orderSide === 'buy' ? 'white' : '#848E9C',
                  border: 'none',
                  cursor: 'pointer',
                  transition: 'all 0.2s'
                }}
              >
                Buy
              </button>
              <button
                onClick={() => setOrderSide('sell')}
                style={{
                  flex: 1,
                  padding: '8px',
                  borderRadius: '4px',
                  fontWeight: '600',
                  backgroundColor: orderSide === 'sell' ? '#F6465D' : '#2B3139',
                  color: orderSide === 'sell' ? 'white' : '#848E9C',
                  border: 'none',
                  cursor: 'pointer',
                  transition: 'all 0.2s'
                }}
              >
                Sell
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '14px', color: '#848E9C', marginBottom: '4px' }}>Order Type</label>
                <select
                  value={orderType}
                  onChange={(e) => setOrderType(e.target.value)}
                  style={{
                    width: '100%',
                    backgroundColor: '#2B3139',
                    border: '1px solid #3C4043',
                    borderRadius: '4px',
                    padding: '8px 12px',
                    color: 'white',
                    fontSize: '14px'
                  }}
                >
                  <option value="limit">Limit</option>
                  <option value="market">Market</option>
                </select>
              </div>

              {orderType === 'limit' && (
                <div>
                  <label style={{ display: 'block', fontSize: '14px', color: '#848E9C', marginBottom: '4px' }}>Price (USDC)</label>
                  <input
                    type="number"
                    value={orderPrice}
                    onChange={(e) => setOrderPrice(e.target.value)}
                    placeholder="0.00"
                    style={{
                      width: '100%',
                      backgroundColor: '#2B3139',
                      border: '1px solid #3C4043',
                      borderRadius: '4px',
                      padding: '8px 12px',
                      color: 'white',
                      fontSize: '14px'
                    }}
                  />
                </div>
              )}

              <div>
                <label style={{ display: 'block', fontSize: '14px', color: '#848E9C', marginBottom: '4px' }}>Quantity ({selectedSymbol})</label>
                <input
                  type="number"
                  value={orderQuantity}
                  onChange={(e) => setOrderQuantity(e.target.value)}
                  placeholder="0.00"
                  style={{
                    width: '100%',
                    backgroundColor: '#2B3139',
                    border: '1px solid #3C4043',
                    borderRadius: '4px',
                    padding: '8px 12px',
                    color: 'white',
                    fontSize: '14px'
                  }}
                />
              </div>

              <button
                style={{
                  width: '100%',
                  padding: '12px',
                  borderRadius: '4px',
                  fontWeight: '600',
                  backgroundColor: orderSide === 'buy' ? '#0ECB81' : '#F6465D',
                  color: 'white',
                  border: 'none',
                  cursor: 'pointer',
                  fontSize: '14px',
                  transition: 'all 0.2s'
                }}
              >
                {orderSide === 'buy' ? 'Buy' : 'Sell'} {selectedSymbol}
              </button>
            </div>
          </div>

          {/* Market Info */}
          <div style={{ padding: '16px' }}>
            <h3 style={{ fontSize: '14px', fontWeight: '600', color: '#848E9C', marginBottom: '12px' }}>Market Information</h3>
            {currentPrice && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '13px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: '#848E9C' }}>Current Price:</span>
                  <span style={{ fontWeight: '600' }}>${formatNumber(currentPrice.price)}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: '#848E9C' }}>24h Change:</span>
                  <span style={{
                    fontWeight: '600',
                    color: currentPrice.change_24h >= 0 ? '#0ECB81' : '#F6465D'
                  }}>
                    {formatPercentage(currentPrice.change_24h)}
                  </span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: '#848E9C' }}>Data Source:</span>
                  <span style={{ fontWeight: '600', textTransform: 'capitalize' }}>{currentPrice.source}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: '#848E9C' }}>Confidence:</span>
                  <span style={{ fontWeight: '600' }}>{(currentPrice.confidence * 100).toFixed(0)}%</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Bottom Status Bar */}
      <div style={{ backgroundColor: '#1E2329', borderTop: '1px solid #2B3139', padding: '8px 16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '12px', color: '#848E9C' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <span>System Status: Operational</span>
            <span>Trading Pairs: {tradingPairs.length}</span>
            <span>Loaded Prices: {Object.keys(prices).length}</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <span>Powered by CoinGecko & DeFiLlama</span>
            <span>© 2025 SnipSwap</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SnipSwapDEX;
