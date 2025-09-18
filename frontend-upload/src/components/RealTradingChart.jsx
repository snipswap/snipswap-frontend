import React, { useEffect, useRef, useState } from 'react';

const RealTradingChart = ({ 
  chartData = [], 
  chartType = 'candlestick', 
  timeframe = '1h',
  currentPrice = 0,
  priceChange = 0 
}) => {
  const canvasRef = useRef(null);
  const [dimensions, setDimensions] = useState({ width: 800, height: 400 });

  useEffect(() => {
    const updateDimensions = () => {
      if (canvasRef.current) {
        const container = canvasRef.current.parentElement;
        setDimensions({
          width: container.clientWidth - 40,
          height: 400
        });
      }
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  useEffect(() => {
    if (!chartData.length || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    // Set canvas size
    canvas.width = dimensions.width;
    canvas.height = dimensions.height;
    
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Chart settings
    const padding = { top: 40, right: 80, bottom: 60, left: 20 };
    const chartWidth = canvas.width - padding.left - padding.right;
    const chartHeight = canvas.height - padding.top - padding.bottom;
    
    // Get price range
    const prices = chartData.flatMap(d => [d.high, d.low, d.open, d.close]);
    const minPrice = Math.min(...prices) * 0.999;
    const maxPrice = Math.max(...prices) * 1.001;
    const priceRange = maxPrice - minPrice;
    
    // Get volume range
    const volumes = chartData.map(d => d.volume);
    const maxVolume = Math.max(...volumes);
    
    // Helper functions
    const getX = (index) => padding.left + (index / (chartData.length - 1)) * chartWidth;
    const getY = (price) => padding.top + ((maxPrice - price) / priceRange) * chartHeight;
    const getVolumeHeight = (volume) => (volume / maxVolume) * 60;
    
    if (chartType === 'candlestick') {
      // Draw candlestick chart
      chartData.forEach((candle, index) => {
        const x = getX(index);
        const openY = getY(candle.open);
        const closeY = getY(candle.close);
        const highY = getY(candle.high);
        const lowY = getY(candle.low);
        
        const isGreen = candle.close > candle.open;
        const color = isGreen ? '#00d4aa' : '#ff6b6b';
        const bodyHeight = Math.abs(closeY - openY);
        const bodyTop = Math.min(openY, closeY);
        
        // Draw wick
        ctx.strokeStyle = color;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(x, highY);
        ctx.lineTo(x, lowY);
        ctx.stroke();
        
        // Draw body
        ctx.fillStyle = color;
        ctx.fillRect(x - 4, bodyTop, 8, Math.max(bodyHeight, 1));
        
        // Draw volume bar
        const volumeHeight = getVolumeHeight(candle.volume);
        ctx.fillStyle = `${color}40`;
        ctx.fillRect(x - 4, canvas.height - padding.bottom + 10, 8, volumeHeight);
      });
    } else if (chartType === 'line') {
      // Draw line chart
      ctx.strokeStyle = '#00d4aa';
      ctx.lineWidth = 2;
      ctx.beginPath();
      
      chartData.forEach((candle, index) => {
        const x = getX(index);
        const y = getY(candle.close);
        
        if (index === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      });
      
      ctx.stroke();
      
      // Fill area under line
      ctx.lineTo(getX(chartData.length - 1), canvas.height - padding.bottom);
      ctx.lineTo(getX(0), canvas.height - padding.bottom);
      ctx.closePath();
      
      const gradient = ctx.createLinearGradient(0, padding.top, 0, canvas.height - padding.bottom);
      gradient.addColorStop(0, 'rgba(0, 212, 170, 0.3)');
      gradient.addColorStop(1, 'rgba(0, 212, 170, 0.05)');
      ctx.fillStyle = gradient;
      ctx.fill();
      
      // Draw volume bars for line chart too
      chartData.forEach((candle, index) => {
        const x = getX(index);
        const volumeHeight = getVolumeHeight(candle.volume);
        ctx.fillStyle = 'rgba(240, 185, 11, 0.3)';
        ctx.fillRect(x - 2, canvas.height - padding.bottom + 10, 4, volumeHeight);
      });
    }
    
    // Draw price scale
    const priceSteps = 8;
    ctx.fillStyle = '#888';
    ctx.font = '11px Monaco, monospace';
    ctx.textAlign = 'left';
    
    for (let i = 0; i <= priceSteps; i++) {
      const price = minPrice + (priceRange * i / priceSteps);
      const y = getY(price);
      
      // Price line
      ctx.strokeStyle = '#333';
      ctx.lineWidth = 1;
      ctx.setLineDash([2, 2]);
      ctx.beginPath();
      ctx.moveTo(padding.left, y);
      ctx.lineTo(canvas.width - padding.right, y);
      ctx.stroke();
      ctx.setLineDash([]);
      
      // Price label
      ctx.fillText(price.toFixed(4), canvas.width - padding.right + 5, y + 4);
    }
    
    // Draw time labels
    const timeSteps = 6;
    ctx.textAlign = 'center';
    
    for (let i = 0; i <= timeSteps; i++) {
      const index = Math.floor((chartData.length - 1) * i / timeSteps);
      const candle = chartData[index];
      if (!candle) continue;
      
      const x = getX(index);
      const time = new Date(candle.time);
      const timeLabel = time.toLocaleTimeString('en-US', { 
        hour: '2-digit', 
        minute: '2-digit',
        hour12: false 
      });
      
      ctx.fillStyle = '#888';
      ctx.fillText(timeLabel, x, canvas.height - padding.bottom + 20);
    }
    
    // Draw current price line
    if (currentPrice > 0) {
      const currentY = getY(currentPrice);
      
      ctx.strokeStyle = priceChange >= 0 ? '#00d4aa' : '#ff6b6b';
      ctx.lineWidth = 2;
      ctx.setLineDash([5, 5]);
      ctx.beginPath();
      ctx.moveTo(padding.left, currentY);
      ctx.lineTo(canvas.width - padding.right, currentY);
      ctx.stroke();
      ctx.setLineDash([]);
      
      // Current price label
      ctx.fillStyle = priceChange >= 0 ? '#00d4aa' : '#ff6b6b';
      ctx.fillRect(canvas.width - padding.right + 2, currentY - 10, 70, 20);
      ctx.fillStyle = '#000';
      ctx.font = 'bold 11px Monaco, monospace';
      ctx.textAlign = 'center';
      ctx.fillText(currentPrice.toFixed(4), canvas.width - padding.right + 37, currentY + 4);
    }
    
  }, [chartData, chartType, dimensions, currentPrice, priceChange]);

  return (
    <div className="trading-chart-container" style={{ width: '100%', height: '400px', position: 'relative' }}>
      <canvas
        ref={canvasRef}
        style={{
          width: '100%',
          height: '100%',
          background: 'linear-gradient(180deg, #0b0e11 0%, #1a1a1a 100%)',
          borderRadius: '8px',
          border: '1px solid #333'
        }}
      />
      
      {/* Chart Info Overlay */}
      <div style={{
        position: 'absolute',
        top: '10px',
        left: '10px',
        background: 'rgba(26, 26, 26, 0.9)',
        border: '1px solid #333',
        borderRadius: '6px',
        padding: '8px 12px',
        fontSize: '12px',
        fontFamily: 'Monaco, monospace'
      }}>
        <div style={{ color: '#fff', fontWeight: 'bold' }}>
          ${currentPrice.toFixed(4)}
        </div>
        <div style={{ 
          color: priceChange >= 0 ? '#00d4aa' : '#ff6b6b',
          fontSize: '11px'
        }}>
          {priceChange >= 0 ? '+' : ''}{priceChange.toFixed(2)}%
        </div>
      </div>
      
      {/* Chart Type Indicator */}
      <div style={{
        position: 'absolute',
        top: '10px',
        right: '10px',
        background: 'rgba(26, 26, 26, 0.9)',
        border: '1px solid #333',
        borderRadius: '6px',
        padding: '4px 8px',
        fontSize: '11px',
        color: '#f0b90b',
        fontWeight: '500'
      }}>
        {chartType === 'candlestick' ? '📊 Candles' : '📈 Line'} • {timeframe}
      </div>
    </div>
  );
};

export default RealTradingChart;

