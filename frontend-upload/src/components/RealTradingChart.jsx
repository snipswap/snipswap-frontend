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
        const isMobile = window.innerWidth < 768;
        setDimensions({
          width: Math.max(container.clientWidth - (isMobile ? 20 : 40), 300),
          height: isMobile ? 350 : 400
        });
      }
    };

    // Initial update with delay to ensure container is ready
    setTimeout(updateDimensions, 100);
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
    
    // Chart settings with mobile optimization
    const isMobile = window.innerWidth < 768;
    const padding = { 
      top: isMobile ? 30 : 40, 
      right: isMobile ? 60 : 80, 
      bottom: isMobile ? 80 : 60, 
      left: isMobile ? 10 : 20 
    };
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
      // Draw candlestick chart with mobile optimization
      const candleWidth = isMobile ? Math.max(chartWidth / chartData.length * 0.8, 2) : 8;
      const candleSpacing = chartWidth / (chartData.length - 1);
      
      chartData.forEach((candle, index) => {
        const x = padding.left + (index * candleSpacing);
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
        ctx.lineWidth = isMobile ? 1 : 1;
        ctx.beginPath();
        ctx.moveTo(x, highY);
        ctx.lineTo(x, lowY);
        ctx.stroke();
        
        // Draw body
        ctx.fillStyle = color;
        const halfWidth = candleWidth / 2;
        ctx.fillRect(x - halfWidth, bodyTop, candleWidth, Math.max(bodyHeight, 1));
        
        // Draw volume bar
        const volumeHeight = getVolumeHeight(candle.volume);
        ctx.fillStyle = `${color}40`;
        ctx.fillRect(x - halfWidth, canvas.height - padding.bottom + 10, candleWidth, volumeHeight);
      });
    } else if (chartType === 'line') {
      // Draw line chart with mobile optimization
      ctx.strokeStyle = '#00d4aa';
      ctx.lineWidth = isMobile ? 2 : 2;
      ctx.beginPath();
      
      const lineSpacing = chartWidth / (chartData.length - 1);
      
      chartData.forEach((candle, index) => {
        const x = padding.left + (index * lineSpacing);
        const y = getY(candle.close);
        
        if (index === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      });
      
      ctx.stroke();
      
      // Fill area under line
      ctx.lineTo(padding.left + ((chartData.length - 1) * lineSpacing), canvas.height - padding.bottom);
      ctx.lineTo(padding.left, canvas.height - padding.bottom);
      ctx.closePath();
      
      const gradient = ctx.createLinearGradient(0, padding.top, 0, canvas.height - padding.bottom);
      gradient.addColorStop(0, 'rgba(0, 212, 170, 0.3)');
      gradient.addColorStop(1, 'rgba(0, 212, 170, 0.05)');
      ctx.fillStyle = gradient;
      ctx.fill();
      
      // Draw volume bars for line chart too
      chartData.forEach((candle, index) => {
        const x = padding.left + (index * lineSpacing);
        const volumeHeight = getVolumeHeight(candle.volume);
        const barWidth = isMobile ? Math.max(lineSpacing * 0.6, 2) : 4;
        ctx.fillStyle = 'rgba(240, 185, 11, 0.3)';
        ctx.fillRect(x - barWidth/2, canvas.height - padding.bottom + 10, barWidth, volumeHeight);
      });
    }
    
    // Draw price scale with mobile optimization
    const priceSteps = isMobile ? 6 : 8;
    ctx.fillStyle = '#888';
    ctx.font = isMobile ? '10px Monaco, monospace' : '11px Monaco, monospace';
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
    
    // Draw time labels with mobile optimization
    const timeSteps = isMobile ? 4 : 6;
    ctx.textAlign = 'center';
    ctx.font = isMobile ? '9px Monaco, monospace' : '11px Monaco, monospace';
    
    for (let i = 0; i <= timeSteps; i++) {
      const index = Math.floor((chartData.length - 1) * i / timeSteps);
      const candle = chartData[index];
      if (!candle) continue;
      
      const x = padding.left + (index * (chartWidth / (chartData.length - 1)));
      const time = new Date(candle.time);
      const timeLabel = isMobile ? 
        time.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false }) :
        time.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false });
      
      ctx.fillStyle = '#888';
      ctx.fillText(timeLabel, x, canvas.height - padding.bottom + (isMobile ? 15 : 20));
    }
    
    // Draw current price line with mobile optimization
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
      
      // Current price label with mobile sizing
      const labelWidth = isMobile ? 60 : 70;
      const labelHeight = isMobile ? 16 : 20;
      ctx.fillStyle = priceChange >= 0 ? '#00d4aa' : '#ff6b6b';
      ctx.fillRect(canvas.width - padding.right + 2, currentY - labelHeight/2, labelWidth, labelHeight);
      ctx.fillStyle = '#000';
      ctx.font = isMobile ? '10px Monaco, monospace' : 'bold 11px Monaco, monospace';
      ctx.textAlign = 'center';
      ctx.fillText(currentPrice.toFixed(4), canvas.width - padding.right + 2 + labelWidth/2, currentY + 4);
    }
    
  }, [chartData, chartType, dimensions, currentPrice, priceChange]);

  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

  return (
    <div className="trading-chart-container" style={{ 
      width: '100%', 
      height: isMobile ? '350px' : '400px', 
      position: 'relative',
      margin: isMobile ? '10px 5px' : '15px 10px',
      padding: isMobile ? '5px' : '10px'
    }}>
      <canvas
        ref={canvasRef}
        style={{
          width: '100%',
          height: '100%',
          background: 'linear-gradient(180deg, #0b0e11 0%, #1a1a1a 100%)',
          borderRadius: '8px',
          border: '1px solid #333',
          display: 'block'
        }}
      />
      
      {/* Chart Info Overlay */}
      <div style={{
        position: 'absolute',
        top: isMobile ? '8px' : '10px',
        left: isMobile ? '8px' : '10px',
        background: 'rgba(26, 26, 26, 0.9)',
        border: '1px solid #333',
        borderRadius: '6px',
        padding: isMobile ? '6px 10px' : '8px 12px',
        fontSize: isMobile ? '11px' : '12px',
        fontFamily: 'Monaco, monospace'
      }}>
        <div style={{ color: '#fff', fontWeight: 'bold' }}>
          ${currentPrice.toFixed(4)}
        </div>
        <div style={{ 
          color: priceChange >= 0 ? '#00d4aa' : '#ff6b6b',
          fontSize: isMobile ? '10px' : '11px'
        }}>
          {priceChange >= 0 ? '+' : ''}{priceChange.toFixed(2)}%
        </div>
      </div>
      
      {/* Chart Type Indicator */}
      <div style={{
        position: 'absolute',
        top: isMobile ? '8px' : '10px',
        right: isMobile ? '8px' : '10px',
        background: 'rgba(26, 26, 26, 0.9)',
        border: '1px solid #333',
        borderRadius: '6px',
        padding: isMobile ? '3px 6px' : '4px 8px',
        fontSize: isMobile ? '10px' : '11px',
        color: '#f0b90b',
        fontWeight: '500'
      }}>
        {chartType === 'candlestick' ? '📊 Candles' : '📈 Line'} • {timeframe}
      </div>
    </div>
  );
};

export default RealTradingChart;

