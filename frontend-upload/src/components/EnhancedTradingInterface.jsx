import React, { useState, useEffect } from 'react';
import {
  ComposedChart, CandlestickChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  ResponsiveContainer, BarChart, Bar, ReferenceLine
} from 'recharts';

const EnhancedTradingInterface = () => {
  const [selectedPair, setSelectedPair] = useState('ATOM/USDC');
  const [privacyMode, setPrivacyMode] = useState('Public');
  const [chartType, setChartType] = useState('candlestick');
  const [timeframe, setTimeframe] = useState('1h');
  const [indicators, setIndicators] = useState({
    rsi: false,
    macd: false,
    bollinger: false,
    volume: true
  });

  // Mock candlestick data with OHLCV
  const [candlestickData, setCandlestickData] = useState([
    { time: '09:00', open: 4.58, high: 4.62, low: 4.55, close: 4.60, volume: 1250000 },
    { time: '10:00', open: 4.60, high: 4.65, low: 4.58, close: 4.63, volume: 980000 },
    { time: '11:00', open: 4.63, high: 4.68, low: 4.61, close: 4.65, volume: 1100000 },
    { time: '12:00', open: 4.65, high: 4.70, low: 4.63, close: 4.68, volume: 1350000 },
    { time: '13:00', open: 4.68, high: 4.72, low: 4.66, close: 4.70, volume: 1200000 },
    { time: '14:00', open: 4.70, high: 4.75, low: 4.68, close: 4.73, volume: 1450000 },
    { time: '15:00', open: 4.73, high: 4.78, low: 4.71, close: 4.76, volume: 1300000 },
    { time: '16:00', open: 4.76, high: 4.80, low: 4.74, close: 4.78, volume: 1150000 },
  ]);

  // Privacy mode configurations
  const privacyModes = {
    Public: {
      color: '#64748b',
      fee: '0.30%',
      discount: '0%',
      mevProtection: 25,
      description: 'Standard trading with full transparency'
    },
    Private: {
      color: '#3b82f6',
      fee: '0.25%',
      discount: '17%',
      mevProtection: 70,
      description: 'Hidden amounts, visible prices'
    },
    Stealth: {
      color: '#8b5cf6',
      fee: '0.20%',
      discount: '33%',
      mevProtection: 95,
      description: 'Maximum privacy protection'
    }
  };

  // Custom Candlestick component
  const CustomCandlestick = ({ payload, x, y, width, height }) => {
    if (!payload) return null;
    
    const { open, high, low, close } = payload;
    const isGreen = close > open;
    const color = isGreen ? '#00d4aa' : '#f84960';
    
    const bodyHeight = Math.abs(close - open) * height / (high - low);
    const bodyY = y + (Math.max(close, open) - high) * height / (high - low);
    
    return (
      <g>
        {/* Wick */}
        <line
          x1={x + width / 2}
          y1={y}
          x2={x + width / 2}
          y2={y + height}
          stroke={color}
          strokeWidth={1}
        />
        {/* Body */}
        <rect
          x={x + width * 0.2}
          y={bodyY}
          width={width * 0.6}
          height={bodyHeight}
          fill={color}
        />
      </g>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 text-white">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-700">
        <div className="flex items-center space-x-4">
          <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center font-bold text-xl">
            S
          </div>
          <h1 className="text-2xl font-bold">SnipSwap</h1>
          <span className="text-sm text-gray-400">Privacy-First Trading Platform</span>
        </div>
        
        {/* Privacy Mode Selector */}
        <div className="flex items-center space-x-4">
          <div className="flex bg-gray-800 rounded-lg p-1">
            {Object.keys(privacyModes).map((mode) => (
              <button
                key={mode}
                onClick={() => setPrivacyMode(mode)}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                  privacyMode === mode
                    ? `bg-gradient-to-r text-white shadow-lg`
                    : 'text-gray-400 hover:text-white'
                }`}
                style={{
                  background: privacyMode === mode ? `linear-gradient(135deg, ${privacyModes[mode].color}, ${privacyModes[mode].color}88)` : 'transparent'
                }}
              >
                {mode}
              </button>
            ))}
          </div>
          
          {/* Privacy Benefits Display */}
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-3 border border-gray-700">
            <div className="flex items-center space-x-4">
              <div className="text-center">
                <div className="text-xs text-gray-400">Fee</div>
                <div className="font-bold" style={{ color: privacyModes[privacyMode].color }}>
                  {privacyModes[privacyMode].fee}
                </div>
              </div>
              <div className="text-center">
                <div className="text-xs text-gray-400">Discount</div>
                <div className="font-bold text-green-400">
                  -{privacyModes[privacyMode].discount}
                </div>
              </div>
              <div className="text-center">
                <div className="text-xs text-gray-400">MEV Shield</div>
                <div className="font-bold" style={{ color: privacyModes[privacyMode].color }}>
                  {privacyModes[privacyMode].mevProtection}%
                </div>
              </div>
            </div>
          </div>
          
          <button className="bg-gradient-to-r from-yellow-500 to-orange-500 text-black px-6 py-2 rounded-lg font-bold hover:shadow-lg transition-all">
            Connect Wallet
          </button>
        </div>
      </div>

      <div className="flex h-screen">
        {/* Left Sidebar - Markets */}
        <div className="w-80 bg-gray-900/50 backdrop-blur-sm border-r border-gray-700 p-4">
          <h3 className="text-lg font-bold mb-4">Markets</h3>
          
          {/* Market List */}
          <div className="space-y-2">
            {[
              { symbol: 'ATOM/USDC', price: '$4.5851', change: '+1.23%', volume: '$4.2M' },
              { symbol: 'SCRT/USDC', price: '$0.1946', change: '-0.16%', volume: '$890K' },
              { symbol: 'OSMO/USDC', price: '$0.1691', change: '+2.33%', volume: '$1.2M' },
              { symbol: 'JUNO/USDC', price: '$0.2847', change: '+0.87%', volume: '$650K' },
            ].map((market) => (
              <div
                key={market.symbol}
                onClick={() => setSelectedPair(market.symbol)}
                className={`p-3 rounded-lg cursor-pointer transition-all ${
                  selectedPair === market.symbol
                    ? 'bg-blue-600/20 border border-blue-500'
                    : 'bg-gray-800/30 hover:bg-gray-700/50'
                }`}
              >
                <div className="flex justify-between items-center">
                  <div>
                    <div className="font-medium">{market.symbol}</div>
                    <div className="text-sm text-gray-400">{market.volume}</div>
                  </div>
                  <div className="text-right">
                    <div className="font-medium">{market.price}</div>
                    <div className={`text-sm ${market.change.startsWith('+') ? 'text-green-400' : 'text-red-400'}`}>
                      {market.change}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Main Trading Area */}
        <div className="flex-1 flex flex-col">
          {/* Price Header */}
          <div className="bg-gray-900/50 backdrop-blur-sm border-b border-gray-700 p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-6">
                <h2 className="text-2xl font-bold">{selectedPair}</h2>
                <div className="text-3xl font-bold text-green-400">$4.5851</div>
                <div className="text-green-400">+$0.0553 (+1.23%)</div>
                <div className="text-sm text-gray-400">24h High: $4.6288 | 24h Low: $4.3600 | 24h Volume: $37,482,322</div>
              </div>
              
              {/* Chart Controls */}
              <div className="flex items-center space-x-4">
                <div className="flex bg-gray-800 rounded-lg p-1">
                  {['line', 'candlestick'].map((type) => (
                    <button
                      key={type}
                      onClick={() => setChartType(type)}
                      className={`px-3 py-1 rounded text-sm ${
                        chartType === type ? 'bg-blue-600 text-white' : 'text-gray-400'
                      }`}
                    >
                      {type === 'candlestick' ? 'Candles' : 'Line'}
                    </button>
                  ))}
                </div>
                
                <div className="flex bg-gray-800 rounded-lg p-1">
                  {['1m', '5m', '15m', '1h', '4h', '1d'].map((tf) => (
                    <button
                      key={tf}
                      onClick={() => setTimeframe(tf)}
                      className={`px-3 py-1 rounded text-sm ${
                        timeframe === tf ? 'bg-blue-600 text-white' : 'text-gray-400'
                      }`}
                    >
                      {tf}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Chart Area */}
          <div className="flex-1 p-4">
            <div className="bg-gray-900/30 backdrop-blur-sm rounded-lg p-4 h-full">
              <ResponsiveContainer width="100%" height="70%">
                {chartType === 'candlestick' ? (
                  <ComposedChart data={candlestickData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                    <XAxis dataKey="time" stroke="#9ca3af" />
                    <YAxis domain={['dataMin - 0.02', 'dataMax + 0.02']} stroke="#9ca3af" />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: '#1f2937', 
                        border: '1px solid #374151',
                        borderRadius: '8px'
                      }}
                      formatter={(value, name) => [
                        `$${value.toFixed(4)}`,
                        name.toUpperCase()
                      ]}
                    />
                    {/* Custom candlestick rendering would go here */}
                    <Line 
                      type="monotone" 
                      dataKey="close" 
                      stroke="#00d4aa" 
                      strokeWidth={2}
                      dot={false}
                    />
                  </ComposedChart>
                ) : (
                  <ComposedChart data={candlestickData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                    <XAxis dataKey="time" stroke="#9ca3af" />
                    <YAxis domain={['dataMin - 0.02', 'dataMax + 0.02']} stroke="#9ca3af" />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: '#1f2937', 
                        border: '1px solid #374151',
                        borderRadius: '8px'
                      }}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="close" 
                      stroke="#3b82f6" 
                      strokeWidth={3}
                      dot={false}
                    />
                  </ComposedChart>
                )}
              </ResponsiveContainer>
              
              {/* Volume Chart */}
              {indicators.volume && (
                <ResponsiveContainer width="100%" height="30%">
                  <BarChart data={candlestickData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                    <XAxis dataKey="time" stroke="#9ca3af" />
                    <YAxis stroke="#9ca3af" />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: '#1f2937', 
                        border: '1px solid #374151',
                        borderRadius: '8px'
                      }}
                      formatter={(value) => [value.toLocaleString(), 'Volume']}
                    />
                    <Bar dataKey="volume" fill="#6366f1" opacity={0.7} />
                  </BarChart>
                </ResponsiveContainer>
              )}
            </div>
          </div>
        </div>

        {/* Right Sidebar - Order Book & Trading */}
        <div className="w-96 bg-gray-900/50 backdrop-blur-sm border-l border-gray-700 flex flex-col">
          {/* Privacy Mode Info */}
          <div className="p-4 border-b border-gray-700">
            <div 
              className="bg-gradient-to-r p-4 rounded-lg"
              style={{ 
                background: `linear-gradient(135deg, ${privacyModes[privacyMode].color}20, ${privacyModes[privacyMode].color}10)`
              }}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="font-bold" style={{ color: privacyModes[privacyMode].color }}>
                  {privacyMode} Mode
                </span>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 rounded-full" style={{ backgroundColor: privacyModes[privacyMode].color }}></div>
                  <span className="text-sm">Active</span>
                </div>
              </div>
              <p className="text-sm text-gray-300 mb-3">{privacyModes[privacyMode].description}</p>
              <div className="grid grid-cols-3 gap-2 text-center">
                <div>
                  <div className="text-xs text-gray-400">Fee</div>
                  <div className="font-bold text-green-400">{privacyModes[privacyMode].fee}</div>
                </div>
                <div>
                  <div className="text-xs text-gray-400">Savings</div>
                  <div className="font-bold text-green-400">-{privacyModes[privacyMode].discount}</div>
                </div>
                <div>
                  <div className="text-xs text-gray-400">MEV Shield</div>
                  <div className="font-bold" style={{ color: privacyModes[privacyMode].color }}>
                    {privacyModes[privacyMode].mevProtection}%
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Order Book */}
          <div className="flex-1 p-4">
            <h3 className="text-lg font-bold mb-4">Order Book</h3>
            
            {/* Asks */}
            <div className="mb-4">
              <div className="text-sm text-gray-400 mb-2">Asks (Sell Orders)</div>
              <div className="space-y-1">
                {[
                  { price: 4.5925, amount: 1250, total: 5740.63 },
                  { price: 4.5900, amount: 890, total: 4085.10 },
                  { price: 4.5875, amount: 2100, total: 9633.75 },
                  { price: 4.5851, amount: 1500, total: 6877.65 },
                ].map((order, i) => (
                  <div key={i} className="flex justify-between text-sm bg-red-500/10 p-2 rounded">
                    <span className="text-red-400">{order.price.toFixed(4)}</span>
                    <span>{order.amount}</span>
                    <span className="text-gray-400">{order.total.toFixed(2)}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Current Price */}
            <div className="text-center py-2 mb-4 bg-green-500/20 rounded">
              <span className="text-green-400 font-bold">$4.5851</span>
              <span className="text-sm text-gray-400 ml-2">Last Price</span>
            </div>

            {/* Bids */}
            <div>
              <div className="text-sm text-gray-400 mb-2">Bids (Buy Orders)</div>
              <div className="space-y-1">
                {[
                  { price: 4.5825, amount: 1800, total: 8248.50 },
                  { price: 4.5800, amount: 950, total: 4351.00 },
                  { price: 4.5775, amount: 1200, total: 5493.00 },
                  { price: 4.5750, amount: 2200, total: 10065.00 },
                ].map((order, i) => (
                  <div key={i} className="flex justify-between text-sm bg-green-500/10 p-2 rounded">
                    <span className="text-green-400">{order.price.toFixed(4)}</span>
                    <span>{order.amount}</span>
                    <span className="text-gray-400">{order.total.toFixed(2)}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Trading Forms */}
          <div className="p-4 border-t border-gray-700">
            <div className="grid grid-cols-2 gap-4">
              {/* Buy Form */}
              <div className="bg-green-500/10 p-4 rounded-lg border border-green-500/20">
                <h4 className="font-bold text-green-400 mb-3">Buy ATOM</h4>
                <div className="space-y-3">
                  <div>
                    <label className="text-xs text-gray-400">Price (USDC)</label>
                    <input 
                      type="number" 
                      placeholder="4.5851"
                      className="w-full bg-gray-800 border border-gray-600 rounded p-2 text-white"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-gray-400">Amount (ATOM)</label>
                    <input 
                      type="number" 
                      placeholder="0.00"
                      className="w-full bg-gray-800 border border-gray-600 rounded p-2 text-white"
                    />
                  </div>
                  <button className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded font-bold transition-all">
                    Buy ATOM
                  </button>
                  <div className="text-xs text-gray-400 text-center">
                    Fee: {privacyModes[privacyMode].fee} • MEV Shield: {privacyModes[privacyMode].mevProtection}%
                  </div>
                </div>
              </div>

              {/* Sell Form */}
              <div className="bg-red-500/10 p-4 rounded-lg border border-red-500/20">
                <h4 className="font-bold text-red-400 mb-3">Sell ATOM</h4>
                <div className="space-y-3">
                  <div>
                    <label className="text-xs text-gray-400">Price (USDC)</label>
                    <input 
                      type="number" 
                      placeholder="4.5851"
                      className="w-full bg-gray-800 border border-gray-600 rounded p-2 text-white"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-gray-400">Amount (ATOM)</label>
                    <input 
                      type="number" 
                      placeholder="0.00"
                      className="w-full bg-gray-800 border border-gray-600 rounded p-2 text-white"
                    />
                  </div>
                  <button className="w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded font-bold transition-all">
                    Sell ATOM
                  </button>
                  <div className="text-xs text-gray-400 text-center">
                    Fee: {privacyModes[privacyMode].fee} • MEV Shield: {privacyModes[privacyMode].mevProtection}%
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EnhancedTradingInterface;

