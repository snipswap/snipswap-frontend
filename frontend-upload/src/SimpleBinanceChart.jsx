import React, { useState, useEffect, useRef } from 'react';

const SimpleBinanceChart = ({ selectedPair, chartType, timeframe }) => {
  const canvasRef = useRef(null);
  const [chartData, setChartData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // Base prices for different trading pairs
  const pairConfig = {
    'ATOM/USDC': { price: 4.5542, volatility: 0.03 },
    'SCRT/USDC': { price: 0.1959, volatility: 0.04 },
    'OSMO/USDC': { price: 0.1679, volatility: 0.035 },
    'BTC/USDC': { price: 112381.2335, volatility: 0.015 },
    'ETH/USDC': { price: 4319.1687, volatility: 0.02 }
  };

  // Generate realistic OHLC data
  const generatePairData = (symbol, basePrice, volatility = 0.02) => {
    const data = [];
    let currentPrice = basePrice;
    
    for (let i = 0; i < 50; i++) {
      const change = (Math.random() - 0.5) * volatility * basePrice;
      const open = currentPrice;
      const close = currentPrice + change;
      const high = Math.max(open, close) + Math.random() * volatility * basePrice * 0.3;
      const low = Math.min(open, close) - Math.random() * volatility * basePrice * 0.3;
      const volume = Math.random() * 1000000 + 100000;
      
      data.push({
        time: new Date(Date.now() - (50 - i) * 60000).toLocaleTimeString('en-US', { 
          hour12: false, 
          hour: '2-digit', 
          minute: '2-digit' 
        }),
        open: parseFloat(open.toFixed(8)),
        high: parseFloat(high.toFixed(8)),
        low: parseFloat(low.toFixed(8)),
        close: parseFloat(close.toFixed(8)),
        volume: Math.floor(volume),
        isGreen: close >= open
      });
      
      currentPrice = close;
    }
    
    return data;
  };

  // Generate data when pair changes
  useEffect(() => {
    setIsLoading(true);
    
    const timer = setTimeout(() => {
      const config = pairConfig[selectedPair];
      if (config) {
        const newData = generatePairData(selectedPair, config.price, config.volatility);
        setChartData(newData);
      }
      setIsLoading(false);
    }, 300);

    return () => clearTimeout(timer);
  }, [selectedPair, timeframe]);

  // Draw chart on canvas
  useEffect(() => {
    if (!chartData.length || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const { width, height } = canvas;

    // Clear canvas
    ctx.fillStyle = '#0a0a0a';
    ctx.fillRect(0, 0, width, height);

    // Calculate scales
    const prices = chartData.flatMap(d => [d.open, d.high, d.low, d.close]);
    const minPrice = Math.min(...prices);
    const maxPrice = Math.max(...prices);
    const priceRange = maxPrice - minPrice;
    const padding = 40;

    const chartWidth = width - padding * 2;
    const chartHeight = height - padding * 2;
    const candleWidth = chartWidth / chartData.length * 0.8;
    const candleSpacing = chartWidth / chartData.length;

    // Draw grid lines
    ctx.strokeStyle = '#333';
    ctx.lineWidth = 1;
    for (let i = 0; i <= 5; i++) {
      const y = padding + (chartHeight / 5) * i;
      ctx.beginPath();
      ctx.moveTo(padding, y);
      ctx.lineTo(width - padding, y);
      ctx.stroke();
    }

    // Draw price labels
    ctx.fillStyle = '#888';
    ctx.font = '12px monospace';
    ctx.textAlign = 'right';
    for (let i = 0; i <= 5; i++) {
      const price = maxPrice - (priceRange / 5) * i;
      const y = padding + (chartHeight / 5) * i + 4;
      ctx.fillText(price.toFixed(4), width - 10, y);
    }

    if (chartType === 'Line') {
      // Draw line chart
      ctx.strokeStyle = '#f0b90b';
      ctx.lineWidth = 2;
      ctx.beginPath();
      
      chartData.forEach((candle, index) => {
        const x = padding + index * candleSpacing + candleSpacing / 2;
        const y = padding + (maxPrice - candle.close) / priceRange * chartHeight;
        
        if (index === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      });
      
      ctx.stroke();

      // Add area fill
      ctx.lineTo(padding + (chartData.length - 1) * candleSpacing + candleSpacing / 2, height - padding);
      ctx.lineTo(padding + candleSpacing / 2, height - padding);
      ctx.closePath();
      
      const gradient = ctx.createLinearGradient(0, padding, 0, height - padding);
      gradient.addColorStop(0, 'rgba(240, 185, 11, 0.3)');
      gradient.addColorStop(1, 'rgba(240, 185, 11, 0)');
      ctx.fillStyle = gradient;
      ctx.fill();

    } else {
      // Draw candlestick chart
      chartData.forEach((candle, index) => {
        const x = padding + index * candleSpacing + (candleSpacing - candleWidth) / 2;
        const centerX = x + candleWidth / 2;
        
        const highY = padding + (maxPrice - candle.high) / priceRange * chartHeight;
        const lowY = padding + (maxPrice - candle.low) / priceRange * chartHeight;
        const openY = padding + (maxPrice - candle.open) / priceRange * chartHeight;
        const closeY = padding + (maxPrice - candle.close) / priceRange * chartHeight;
        
        const color = candle.isGreen ? '#0ecb81' : '#f6465d';
        
        // Draw wick
        ctx.strokeStyle = color;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(centerX, highY);
        ctx.lineTo(centerX, lowY);
        ctx.stroke();
        
        // Draw body
        const bodyTop = Math.min(openY, closeY);
        const bodyHeight = Math.abs(closeY - openY);
        
        if (candle.isGreen) {
          ctx.fillStyle = color;
          ctx.fillRect(x, bodyTop, candleWidth, Math.max(bodyHeight, 1));
        } else {
          ctx.strokeStyle = color;
          ctx.lineWidth = 1;
          ctx.strokeRect(x, bodyTop, candleWidth, Math.max(bodyHeight, 1));
          ctx.fillStyle = '#0a0a0a';
          ctx.fillRect(x + 1, bodyTop + 1, candleWidth - 2, Math.max(bodyHeight - 2, 0));
        }
      });
    }

    // Draw volume bars at bottom
    const volumeHeight = 60;
    const volumeY = height - padding - volumeHeight;
    const maxVolume = Math.max(...chartData.map(d => d.volume));
    
    chartData.forEach((candle, index) => {
      const x = padding + index * candleSpacing + (candleSpacing - candleWidth) / 2;
      const barHeight = (candle.volume / maxVolume) * volumeHeight;
      const color = candle.isGreen ? 'rgba(14, 203, 129, 0.6)' : 'rgba(246, 70, 93, 0.6)';
      
      ctx.fillStyle = color;
      ctx.fillRect(x, volumeY + volumeHeight - barHeight, candleWidth, barHeight);
    });

  }, [chartData, chartType]);

  if (isLoading) {
    return (
      <div className="chart-loading">
        <div className="loading-spinner"></div>
        <span>Loading {selectedPair} data...</span>
      </div>
    );
  }

  return (
    <div className="simple-binance-chart">
      <canvas
        ref={canvasRef}
        width={800}
        height={400}
        style={{ width: '100%', height: '100%' }}
      />
    </div>
  );
};

export default SimpleBinanceChart;

