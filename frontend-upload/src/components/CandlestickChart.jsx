import React from 'react';
import { ResponsiveContainer, ComposedChart, XAxis, YAxis, CartesianGrid, Tooltip, Bar } from 'recharts';

// Custom Candlestick component that renders proper OHLC candles
const Candlestick = (props) => {
  const { payload, x, y, width, height } = props;
  
  if (!payload || !payload.open || !payload.high || !payload.low || !payload.close) {
    return null;
  }

  const { open, high, low, close } = payload;
  
  // Determine if it's a bullish (green) or bearish (red) candle
  const isBullish = close > open;
  const color = isBullish ? '#00d4aa' : '#f84960';
  
  // Calculate positions
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
  
  const wickWidth = 1;
  const bodyWidth = width * 0.6;
  const bodyX = x + (width - bodyWidth) / 2;

  return (
    <g>
      {/* Upper wick */}
      <line
        x1={centerX}
        y1={highY}
        x2={centerX}
        y2={bodyTopY}
        stroke={color}
        strokeWidth={wickWidth}
      />
      
      {/* Lower wick */}
      <line
        x1={centerX}
        y1={bodyBottomY}
        x2={centerX}
        y2={lowY}
        stroke={color}
        strokeWidth={wickWidth}
      />
      
      {/* Candle body */}
      <rect
        x={bodyX}
        y={bodyTopY}
        width={bodyWidth}
        height={Math.max(bodyHeight * pixelPerPrice, 1)}
        fill={isBullish ? color : 'transparent'}
        stroke={color}
        strokeWidth={isBullish ? 0 : 1}
      />
    </g>
  );
};

// Custom Bar component that renders as candlesticks
const CandlestickBar = (props) => {
  return <Candlestick {...props} />;
};

const CandlestickChart = ({ data }) => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <ComposedChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#2a2a2a" />
        <XAxis 
          dataKey="time" 
          tickFormatter={(time) => new Date(time).toLocaleTimeString()}
          stroke="#888"
          fontSize={12}
        />
        <YAxis 
          domain={['dataMin - 0.01', 'dataMax + 0.01']}
          tickFormatter={(value) => `$${value.toFixed(4)}`}
          stroke="#888"
          fontSize={12}
        />
        <Tooltip 
          labelFormatter={(time) => new Date(time).toLocaleString()}
          formatter={(value, name) => {
            if (name === 'open') return [`$${value.toFixed(4)}`, 'Open'];
            if (name === 'high') return [`$${value.toFixed(4)}`, 'High'];
            if (name === 'low') return [`$${value.toFixed(4)}`, 'Low'];
            if (name === 'close') return [`$${value.toFixed(4)}`, 'Close'];
            return [`$${value.toFixed(4)}`, name];
          }}
          contentStyle={{
            backgroundColor: '#1a1a1a',
            border: '1px solid #333',
            borderRadius: '8px',
            color: '#fff'
          }}
        />
        <Bar 
          dataKey="high" 
          shape={<CandlestickBar />}
          fill="transparent"
        />
      </ComposedChart>
    </ResponsiveContainer>
  );
};

export default CandlestickChart;

