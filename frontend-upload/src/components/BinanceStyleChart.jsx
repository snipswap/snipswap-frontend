import React, { useState, useEffect, useRef } from 'react';
import { ResponsiveContainer, ComposedChart, XAxis, YAxis, CartesianGrid, Tooltip, Bar, Line, Area } from 'recharts';
import '../styles/BinanceChart.css';

// Enhanced Candlestick component with Binance-style appearance
const BinanceCandlestick = (props) => {
  const { payload, x, y, width, height } = props;
  
  if (!payload || !payload.open || !payload.high || !payload.low || !payload.close) {
    return null;
  }

  const { open, high, low, close, volume } = payload;
  
  // Determine if it's a bullish (green) or bearish (red) candle
  const isBullish = close >= open;
  const color = isBullish ? '#0ecb81' : '#f6465d';
  
  // Calculate positions with enhanced sizing for Binance look
  const centerX = x + width / 2;
  const bodyTop = Math.min(open, close);
  const bodyBottom = Math.max(open, close);
  const bodyHeight = Math.abs(close - open);
  
  // Scale factor for converting price to pixels
  const priceRange = high - low;
  const pixelPerPrice = height / priceRange;
  
  // Calculate pixel positions
  const highY = y;
  const lowY = y + height;
  const bodyTopY = y + (high - bodyTop) * pixelPerPrice;
  const bodyBottomY = y + (high - bodyBottom) * pixelPerPrice;
  
  // Enhanced sizing for better visibility
  const wickWidth = Math.max(1, width * 0.08);
  const bodyWidth = Math.max(width * 0.7, 3); // Minimum 3px width
  const bodyX = x + (width - bodyWidth) / 2;

  return (
    <g>
      {/* Upper wick with enhanced visibility */}
      <line
        x1={centerX}
        y1={highY}
        x2={centerX}
        y2={bodyTopY}
        stroke={color}
        strokeWidth={wickWidth}
        strokeLinecap="round"
      />
      
      {/* Lower wick with enhanced visibility */}
      <line
        x1={centerX}
        y1={bodyBottomY}
        x2={centerX}
        y2={lowY}
        stroke={color}
        strokeWidth={wickWidth}
        strokeLinecap="round"
      />
      
      {/* Enhanced candle body with better contrast */}
      <rect
        x={bodyX}
        y={bodyTopY}
        width={bodyWidth}
        height={Math.max(bodyHeight * pixelPerPrice, 1)}
        fill={isBullish ? color : '#1e2329'}
        stroke={color}
        strokeWidth={isBullish ? 0 : 1.5}
        rx={1}
        ry={1}
      />
      
      {/* Doji indicator for equal open/close */}
      {bodyHeight === 0 && (
        <line
          x1={bodyX}
          y1={bodyTopY}
          x2={bodyX + bodyWidth}
          y2={bodyTopY}
          stroke={color}
          strokeWidth={2}
          strokeLinecap="round"
        />
      )}
    </g>
  );
};

// Volume bar component
const VolumeBar = (props) => {
  const { payload, x, y, width, height } = props;
  
  if (!payload || !payload.volume || !payload.open || !payload.close) {
    return null;
  }

  const isBullish = payload.close >= payload.open;
  const color = isBullish ? '#0ecb81' : '#f6465d';
  const opacity = 0.6;

  return (
    <rect
      x={x + width * 0.1}
      y={y}
      width={width * 0.8}
      height={height}
      fill={color}
      opacity={opacity}
      rx={1}
      ry={1}
    />
  );
};

const BinanceStyleChart = ({ data, chartType, selectedPair, showVolume = true }) => {
  const [processedData, setProcessedData] = useState([]);
  const [priceScale, setPriceScale] = useState({ min: 0, max: 0 });
  const [volumeScale, setVolumeScale] = useState({ min: 0, max: 0 });
  const chartRef = useRef(null);

  useEffect(() => {
    if (!data || data.length === 0) return;

    // Process data for better display
    const processed = data.map((item, index) => ({
      ...item,
      index,
      formattedTime: new Date(item.time).toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit'
      })
    }));

    // Calculate price and volume scales
    const prices = data.flatMap(d => [d.open, d.high, d.low, d.close]);
    const volumes = data.map(d => d.volume || 0);
    
    const minPrice = Math.min(...prices);
    const maxPrice = Math.max(...prices);
    const priceRange = maxPrice - minPrice;
    
    setPriceScale({
      min: minPrice - priceRange * 0.02,
      max: maxPrice + priceRange * 0.02
    });

    setVolumeScale({
      min: 0,
      max: Math.max(...volumes) * 1.1
    });

    setProcessedData(processed);
  }, [data]);

  const formatPrice = (value) => {
    if (value >= 1000) {
      return `$${(value / 1000).toFixed(1)}K`;
    }
    return `$${value.toFixed(4)}`;
  };

  const formatVolume = (value) => {
    if (value >= 1000000) {
      return `${(value / 1000000).toFixed(1)}M`;
    }
    if (value >= 1000) {
      return `${(value / 1000).toFixed(1)}K`;
    }
    return value.toFixed(0);
  };

  const CustomTooltip = ({ active, payload, label }) => {
    if (!active || !payload || !payload.length) return null;

    const data = payload[0].payload;
    if (!data) return null;

    return (
      <div className="binance-tooltip">
        <div className="tooltip-header">
          <span className="tooltip-time">
            {new Date(data.time).toLocaleString()}
          </span>
        </div>
        <div className="tooltip-content">
          <div className="tooltip-row">
            <span className="tooltip-label">Open:</span>
            <span className="tooltip-value">{formatPrice(data.open)}</span>
          </div>
          <div className="tooltip-row">
            <span className="tooltip-label">High:</span>
            <span className="tooltip-value high">{formatPrice(data.high)}</span>
          </div>
          <div className="tooltip-row">
            <span className="tooltip-label">Low:</span>
            <span className="tooltip-value low">{formatPrice(data.low)}</span>
          </div>
          <div className="tooltip-row">
            <span className="tooltip-label">Close:</span>
            <span className={`tooltip-value ${data.close >= data.open ? 'bullish' : 'bearish'}`}>
              {formatPrice(data.close)}
            </span>
          </div>
          {data.volume && (
            <div className="tooltip-row">
              <span className="tooltip-label">Volume:</span>
              <span className="tooltip-value">{formatVolume(data.volume)}</span>
            </div>
          )}
        </div>
      </div>
    );
  };

  const renderChart = () => {
    if (chartType === 'line') {
      return (
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart data={processedData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="lineGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#0ecb81" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#0ecb81" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid 
              strokeDasharray="1 1" 
              stroke="#2b3139" 
              horizontal={true}
              vertical={false}
            />
            <XAxis 
              dataKey="formattedTime"
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 11, fill: '#848e9c' }}
              interval="preserveStartEnd"
            />
            <YAxis 
              domain={[priceScale.min, priceScale.max]}
              orientation="right"
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 11, fill: '#848e9c' }}
              tickFormatter={formatPrice}
              width={80}
            />
            <Tooltip content={<CustomTooltip />} />
            <Area
              type="monotone"
              dataKey="close"
              stroke="#0ecb81"
              strokeWidth={2}
              fill="url(#lineGradient)"
              dot={false}
            />
          </ComposedChart>
        </ResponsiveContainer>
      );
    }

    return (
      <ResponsiveContainer width="100%" height="100%">
        <ComposedChart data={processedData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
          <CartesianGrid 
            strokeDasharray="1 1" 
            stroke="#2b3139" 
            horizontal={true}
            vertical={false}
          />
          <XAxis 
            dataKey="formattedTime"
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 11, fill: '#848e9c' }}
            interval="preserveStartEnd"
          />
          <YAxis 
            domain={[priceScale.min, priceScale.max]}
            orientation="right"
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 11, fill: '#848e9c' }}
            tickFormatter={formatPrice}
            width={80}
          />
          <Tooltip content={<CustomTooltip />} />
          <Bar 
            dataKey="high" 
            shape={<BinanceCandlestick />}
            fill="transparent"
          />
        </ComposedChart>
      </ResponsiveContainer>
    );
  };

  const renderVolumeChart = () => {
    if (!showVolume) return null;

    return (
      <div className="volume-chart">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart data={processedData} margin={{ top: 0, right: 30, left: 0, bottom: 0 }}>
            <XAxis 
              dataKey="formattedTime"
              axisLine={false}
              tickLine={false}
              tick={false}
            />
            <YAxis 
              domain={[0, volumeScale.max]}
              orientation="right"
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 10, fill: '#848e9c' }}
              tickFormatter={formatVolume}
              width={80}
            />
            <Bar 
              dataKey="volume" 
              shape={<VolumeBar />}
              fill="transparent"
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    );
  };

  return (
    <div className="binance-style-chart" ref={chartRef}>
      <div className="price-chart">
        {renderChart()}
      </div>
      {showVolume && renderVolumeChart()}
    </div>
  );
};

export default BinanceStyleChart;

