import React, { useRef, useEffect, useState } from 'react';

const BinanceStyleChart = ({ 
  chartData, 
  chartType, 
  timeframe, 
  currentPrice, 
  priceChange,
  ohlcData,
  volume24h 
}) => {
  const canvasRef = useRef(null);
  const [isZooming, setIsZooming] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [panOffset, setPanOffset] = useState({ x: 0, y: 0 });
  const [showMA7, setShowMA7] = useState(true);
  const [showMA25, setShowMA25] = useState(true);
  const [showMA99, setShowMA99] = useState(true);
  const [showVolume, setShowVolume] = useState(true);
  const [showVWAP, setShowVWAP] = useState(true);
  const [showRSI, setShowRSI] = useState(true);
  const [showMACD, setShowMACD] = useState(true);
  const [crosshair, setCrosshair] = useState({ x: 0, y: 0, visible: false });

  // Generate realistic chart data if not provided
  const generateChartData = () => {
    const data = [];
    const basePrice = currentPrice || 4.63;
    const now = new Date();
    
    for (let i = 100; i >= 0; i--) {
      const time = new Date(now.getTime() - i * 60000); // 1 minute intervals
      const variation = (Math.random() - 0.5) * 0.1;
      const open = basePrice + variation;
      const close = open + (Math.random() - 0.5) * 0.05;
      const high = Math.max(open, close) + Math.random() * 0.02;
      const low = Math.min(open, close) - Math.random() * 0.02;
      const volume = Math.random() * 1000000;
      
      data.push({ time, open, high, low, close, volume });
    }
    return data;
  };

  const data = chartData.length > 0 ? chartData : generateChartData();

  // Calculate moving averages
  const calculateMA = (period) => {
    return data.map((_, index) => {
      if (index < period - 1) return null;
      const sum = data.slice(index - period + 1, index + 1)
        .reduce((acc, item) => acc + item.close, 0);
      return sum / period;
    });
  };

  const ma7 = calculateMA(7);
  const ma25 = calculateMA(25);
  const ma99 = calculateMA(99);

  // Calculate VWAP (Volume Weighted Average Price)
  const calculateVWAP = () => {
    let cumulativeTPV = 0; // Typical Price * Volume
    let cumulativeVolume = 0;
    
    return data.map((candle) => {
      const typicalPrice = (candle.high + candle.low + candle.close) / 3;
      cumulativeTPV += typicalPrice * candle.volume;
      cumulativeVolume += candle.volume;
      return cumulativeVolume > 0 ? cumulativeTPV / cumulativeVolume : typicalPrice;
    });
  };

  // Calculate RSI (Relative Strength Index)
  const calculateRSI = (period = 14) => {
    const rsi = [];
    const gains = [];
    const losses = [];
    
    for (let i = 1; i < data.length; i++) {
      const change = data[i].close - data[i - 1].close;
      gains.push(change > 0 ? change : 0);
      losses.push(change < 0 ? Math.abs(change) : 0);
    }
    
    for (let i = 0; i < gains.length; i++) {
      if (i < period - 1) {
        rsi.push(null);
      } else {
        const avgGain = gains.slice(i - period + 1, i + 1).reduce((a, b) => a + b, 0) / period;
        const avgLoss = losses.slice(i - period + 1, i + 1).reduce((a, b) => a + b, 0) / period;
        const rs = avgLoss === 0 ? 100 : avgGain / avgLoss;
        rsi.push(100 - (100 / (1 + rs)));
      }
    }
    
    return [null, ...rsi]; // Add null for first data point
  };

  // Calculate MACD (Moving Average Convergence Divergence)
  const calculateMACD = () => {
    const ema12 = calculateEMA(12);
    const ema26 = calculateEMA(26);
    const macdLine = ema12.map((val, i) => val && ema26[i] ? val - ema26[i] : null);
    const signalLine = calculateEMAFromArray(macdLine.filter(v => v !== null), 9);
    const histogram = macdLine.map((val, i) => {
      const signal = signalLine[i - macdLine.findIndex(v => v !== null)];
      return val && signal ? val - signal : null;
    });
    
    return { macdLine, signalLine: signalLine, histogram };
  };

  // Calculate EMA (Exponential Moving Average)
  const calculateEMA = (period) => {
    const ema = [];
    const multiplier = 2 / (period + 1);
    
    data.forEach((candle, index) => {
      if (index === 0) {
        ema.push(candle.close);
      } else {
        ema.push((candle.close * multiplier) + (ema[index - 1] * (1 - multiplier)));
      }
    });
    
    return ema;
  };

  // Calculate EMA from array
  const calculateEMAFromArray = (values, period) => {
    const ema = [];
    const multiplier = 2 / (period + 1);
    
    values.forEach((value, index) => {
      if (index === 0) {
        ema.push(value);
      } else {
        ema.push((value * multiplier) + (ema[index - 1] * (1 - multiplier)));
      }
    });
    
    return ema;
  };

  const vwap = calculateVWAP();
  const rsi = calculateRSI();
  const macd = calculateMACD();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const rect = canvas.getBoundingClientRect();
    
    // Set canvas size for high DPI
    const dpr = window.devicePixelRatio || 1;
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);

    // Clear canvas
    ctx.fillStyle = '#1a1a1a';
    ctx.fillRect(0, 0, rect.width, rect.height);

    if (data.length === 0) return;

    // Chart dimensions
    const padding = { top: 20, right: 80, bottom: showVolume ? 100 : 40, left: 10 };
    const chartWidth = rect.width - padding.left - padding.right;
    const chartHeight = rect.height - padding.top - padding.bottom;
    const volumeHeight = showVolume ? 60 : 0;
    const priceChartHeight = chartHeight - volumeHeight;

    // Price range
    const prices = data.flatMap(d => [d.high, d.low]);
    const minPrice = Math.min(...prices) * 0.999;
    const maxPrice = Math.max(...prices) * 1.001;
    const priceRange = maxPrice - minPrice;

    // Volume range
    const maxVolume = Math.max(...data.map(d => d.volume));

    // Helper functions
    const getX = (index) => padding.left + (index / (data.length - 1)) * chartWidth;
    const getPriceY = (price) => padding.top + ((maxPrice - price) / priceRange) * priceChartHeight;
    const getVolumeY = (volume) => {
      const volumeTop = padding.top + priceChartHeight + 10;
      return volumeTop + ((maxVolume - volume) / maxVolume) * volumeHeight;
    };

    // Draw price grid
    ctx.strokeStyle = '#333';
    ctx.lineWidth = 1;
    const priceSteps = 8;
    for (let i = 0; i <= priceSteps; i++) {
      const price = minPrice + (priceRange * i / priceSteps);
      const y = getPriceY(price);
      
      ctx.beginPath();
      ctx.moveTo(padding.left, y);
      ctx.lineTo(padding.left + chartWidth, y);
      ctx.stroke();
      
      // Price labels
      ctx.fillStyle = '#888';
      ctx.font = '11px Arial';
      ctx.textAlign = 'left';
      ctx.fillText(price.toFixed(4), padding.left + chartWidth + 5, y + 4);
    }

    // Draw time grid
    const timeSteps = 6;
    for (let i = 0; i <= timeSteps; i++) {
      const x = padding.left + (chartWidth * i / timeSteps);
      
      ctx.beginPath();
      ctx.moveTo(x, padding.top);
      ctx.lineTo(x, padding.top + priceChartHeight);
      ctx.stroke();
      
      // Time labels
      if (i < data.length) {
        const dataIndex = Math.floor((data.length - 1) * i / timeSteps);
        const time = data[dataIndex].time;
        ctx.fillStyle = '#888';
        ctx.font = '10px Arial';
        ctx.textAlign = 'center';
        ctx.fillText(
          time.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
          x, 
          rect.height - 10
        );
      }
    }

    // Draw moving averages
    const drawMA = (maData, color, lineWidth = 1) => {
      ctx.strokeStyle = color;
      ctx.lineWidth = lineWidth;
      ctx.beginPath();
      
      let started = false;
      maData.forEach((value, index) => {
        if (value !== null) {
          const x = getX(index);
          const y = getPriceY(value);
          
          if (!started) {
            ctx.moveTo(x, y);
            started = true;
          } else {
            ctx.lineTo(x, y);
          }
        }
      });
      ctx.stroke();
    };

    if (showMA7) drawMA(ma7, '#f39c12', 1);
    if (showMA25) drawMA(ma25, '#e74c3c', 1);
    if (showMA99) drawMA(ma99, '#9b59b6', 2);
    if (showVWAP) drawMA(vwap, '#00bcd4', 2); // VWAP in cyan

    // Draw candlesticks or line chart
    if (chartType === 'candlestick') {
      data.forEach((candle, index) => {
        const x = getX(index);
        const openY = getPriceY(candle.open);
        const closeY = getPriceY(candle.close);
        const highY = getPriceY(candle.high);
        const lowY = getPriceY(candle.low);
        
        const isGreen = candle.close > candle.open;
        const candleWidth = Math.max(2, chartWidth / data.length * 0.8);
        
        // Wick
        ctx.strokeStyle = isGreen ? '#26a69a' : '#ef5350';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(x, highY);
        ctx.lineTo(x, lowY);
        ctx.stroke();
        
        // Body
        ctx.fillStyle = isGreen ? '#26a69a' : '#ef5350';
        const bodyHeight = Math.abs(closeY - openY);
        const bodyY = Math.min(openY, closeY);
        
        if (bodyHeight < 1) {
          // Doji - draw line
          ctx.fillRect(x - candleWidth/2, bodyY, candleWidth, 1);
        } else {
          ctx.fillRect(x - candleWidth/2, bodyY, candleWidth, bodyHeight);
        }
      });
    } else {
      // Line chart
      ctx.strokeStyle = '#26a69a';
      ctx.lineWidth = 2;
      ctx.beginPath();
      
      data.forEach((point, index) => {
        const x = getX(index);
        const y = getPriceY(point.close);
        
        if (index === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      });
      ctx.stroke();
      
      // Fill area under line
      ctx.lineTo(getX(data.length - 1), padding.top + priceChartHeight);
      ctx.lineTo(getX(0), padding.top + priceChartHeight);
      ctx.closePath();
      
      const gradient = ctx.createLinearGradient(0, padding.top, 0, padding.top + priceChartHeight);
      gradient.addColorStop(0, 'rgba(38, 166, 154, 0.3)');
      gradient.addColorStop(1, 'rgba(38, 166, 154, 0.05)');
      ctx.fillStyle = gradient;
      ctx.fill();
    }

    // Draw volume bars
    if (showVolume) {
      data.forEach((candle, index) => {
        const x = getX(index);
        const volumeBarHeight = (candle.volume / maxVolume) * volumeHeight;
        const volumeY = padding.top + priceChartHeight + 10 + volumeHeight - volumeBarHeight;
        
        const isGreen = candle.close > candle.open;
        ctx.fillStyle = isGreen ? 'rgba(38, 166, 154, 0.6)' : 'rgba(239, 83, 80, 0.6)';
        
        const barWidth = Math.max(1, chartWidth / data.length * 0.8);
        ctx.fillRect(x - barWidth/2, volumeY, barWidth, volumeBarHeight);
      });
    }

    // Draw current price line
    if (currentPrice) {
      const currentY = getPriceY(currentPrice);
      ctx.strokeStyle = priceChange >= 0 ? '#26a69a' : '#ef5350';
      ctx.lineWidth = 1;
      ctx.setLineDash([5, 5]);
      ctx.beginPath();
      ctx.moveTo(padding.left, currentY);
      ctx.lineTo(padding.left + chartWidth, currentY);
      ctx.stroke();
      ctx.setLineDash([]);
      
      // Current price label
      ctx.fillStyle = priceChange >= 0 ? '#26a69a' : '#ef5350';
      ctx.fillRect(padding.left + chartWidth + 2, currentY - 10, 70, 20);
      ctx.fillStyle = 'white';
      ctx.font = 'bold 11px Arial';
      ctx.textAlign = 'center';
      ctx.fillText(currentPrice.toFixed(4), padding.left + chartWidth + 37, currentY + 4);
    }

    // Draw crosshair
    if (crosshair.visible) {
      ctx.strokeStyle = '#666';
      ctx.lineWidth = 1;
      ctx.setLineDash([3, 3]);
      
      // Vertical line
      ctx.beginPath();
      ctx.moveTo(crosshair.x, padding.top);
      ctx.lineTo(crosshair.x, padding.top + priceChartHeight);
      ctx.stroke();
      
      // Horizontal line
      ctx.beginPath();
      ctx.moveTo(padding.left, crosshair.y);
      ctx.lineTo(padding.left + chartWidth, crosshair.y);
      ctx.stroke();
      
      ctx.setLineDash([]);
    }

  }, [data, chartType, showMA7, showMA25, showMA99, showVolume, currentPrice, priceChange, crosshair, zoomLevel, panOffset]);

  // Mouse event handlers
  const handleMouseMove = (e) => {
    const rect = canvasRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setCrosshair({ x, y, visible: true });
  };

  const handleMouseLeave = () => {
    setCrosshair({ x: 0, y: 0, visible: false });
  };

  const handleWheel = (e) => {
    e.preventDefault();
    const delta = e.deltaY > 0 ? 0.9 : 1.1;
    setZoomLevel(prev => Math.max(0.5, Math.min(5, prev * delta)));
  };

  return (
    <div className="binance-chart-container" style={{ position: 'relative', width: '100%', height: '400px' }}>
      {/* Chart Info Overlay */}
      <div style={{
        position: 'absolute',
        top: '10px',
        left: '10px',
        color: 'white',
        fontSize: '14px',
        zIndex: 10
      }}>
        <div style={{ color: priceChange >= 0 ? '#26a69a' : '#ef5350', fontSize: '16px', fontWeight: 'bold' }}>
          ${currentPrice?.toFixed(4)} {priceChange >= 0 ? '+' : ''}{priceChange?.toFixed(2)}%
        </div>
        <div style={{ fontSize: '12px', color: '#888', marginTop: '5px' }}>
          📊 {chartType === 'candlestick' ? 'Candles' : 'Line'} • {timeframe}
        </div>
      </div>

      {/* OHLC Data Overlay */}
      <div style={{
        position: 'absolute',
        top: '10px',
        left: '200px',
        color: 'white',
        fontSize: '12px',
        zIndex: 10
      }}>
        <div>Open: <span style={{ color: '#888' }}>{ohlcData?.open?.toFixed(4)}</span></div>
        <div>High: <span style={{ color: '#26a69a' }}>{ohlcData?.high?.toFixed(4)}</span></div>
        <div>Low: <span style={{ color: '#ef5350' }}>{ohlcData?.low?.toFixed(4)}</span></div>
        <div>Close: <span style={{ color: '#888' }}>{ohlcData?.close?.toFixed(4)}</span></div>
        <div>Volume: <span style={{ color: '#888' }}>{(volume24h / 1000000).toFixed(1)}M</span></div>
      </div>

      {/* Moving Averages Display */}
      <div style={{
        position: 'absolute',
        top: '10px',
        right: '10px',
        color: 'white',
        fontSize: '11px',
        zIndex: 10
      }}>
        {showMA7 && <div style={{ color: '#f39c12' }}>MA(7): {ma7[ma7.length - 1]?.toFixed(2)}</div>}
        {showMA25 && <div style={{ color: '#e74c3c' }}>MA(25): {ma25[ma25.length - 1]?.toFixed(2)}</div>}
        {showMA99 && <div style={{ color: '#9b59b6' }}>MA(99): {ma99[ma99.length - 1]?.toFixed(2)}</div>}
        {showVWAP && <div style={{ color: '#00bcd4' }}>VWAP: {vwap[vwap.length - 1]?.toFixed(4)}</div>}
        {showRSI && <div style={{ color: '#ff9800' }}>RSI(14): {rsi[rsi.length - 1]?.toFixed(1)}</div>}
        {showMACD && <div style={{ color: '#4caf50' }}>MACD: {macd.macdLine[macd.macdLine.length - 1]?.toFixed(4)}</div>}
      </div>

      {/* Indicators Panel */}
      <div style={{
        position: 'absolute',
        bottom: '10px',
        left: '10px',
        color: 'white',
        fontSize: '11px',
        zIndex: 10
      }}>
        <label style={{ marginRight: '10px' }}>
          <input 
            type="checkbox" 
            checked={showMA7} 
            onChange={(e) => setShowMA7(e.target.checked)}
            style={{ marginRight: '5px' }}
          />
          MA(7)
        </label>
        <label style={{ marginRight: '10px' }}>
          <input 
            type="checkbox" 
            checked={showMA25} 
            onChange={(e) => setShowMA25(e.target.checked)}
            style={{ marginRight: '5px' }}
          />
          MA(25)
        </label>
        <label style={{ marginRight: '10px' }}>
          <input 
            type="checkbox" 
            checked={showMA99} 
            onChange={(e) => setShowMA99(e.target.checked)}
            style={{ marginRight: '5px' }}
          />
          MA(99)
        </label>
        <label style={{ marginRight: '10px' }}>
          <input 
            type="checkbox" 
            checked={showVWAP} 
            onChange={(e) => setShowVWAP(e.target.checked)}
            style={{ marginRight: '5px' }}
          />
          VWAP
        </label>
        <label style={{ marginRight: '10px' }}>
          <input 
            type="checkbox" 
            checked={showRSI} 
            onChange={(e) => setShowRSI(e.target.checked)}
            style={{ marginRight: '5px' }}
          />
          RSI
        </label>
        <label style={{ marginRight: '10px' }}>
          <input 
            type="checkbox" 
            checked={showMACD} 
            onChange={(e) => setShowMACD(e.target.checked)}
            style={{ marginRight: '5px' }}
          />
          MACD
        </label>
        <label>
          <input 
            type="checkbox" 
            checked={showVolume} 
            onChange={(e) => setShowVolume(e.target.checked)}
            style={{ marginRight: '5px' }}
          />
          Volume
        </label>
      </div>

      {/* Zoom Level Display */}
      <div style={{
        position: 'absolute',
        bottom: '10px',
        right: '10px',
        color: 'white',
        fontSize: '11px',
        zIndex: 10
      }}>
        Zoom: {(zoomLevel * 100).toFixed(0)}%
        <div style={{ fontSize: '10px', color: '#666' }}>
          Scroll to zoom • Drag to pan
        </div>
      </div>

      <canvas
        ref={canvasRef}
        style={{ 
          width: '100%', 
          height: '100%', 
          cursor: 'crosshair',
          backgroundColor: '#1a1a1a'
        }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onWheel={handleWheel}
      />
    </div>
  );
};

export default BinanceStyleChart;

