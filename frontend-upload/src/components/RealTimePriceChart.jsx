import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import oracleService from '../services/oracleService';

const TIMEFRAMES = [
  { label: '1m', value: '1m', seconds: 60 },
  { label: '5m', value: '5m', seconds: 300 },
  { label: '15m', value: '15m', seconds: 900 },
  { label: '1h', value: '1h', seconds: 3600 },
  { label: '4h', value: '4h', seconds: 14400 },
  { label: '1d', value: '1d', seconds: 86400 },
];

function RealTimePriceChart({ symbol = 'BTC', height = 400 }) {
  const [chartData, setChartData] = useState([]);
  const [currentPrice, setCurrentPrice] = useState(null);
  const [timeframe, setTimeframe] = useState('1h');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Subscribe to real-time price updates
  useEffect(() => {
    if (!symbol) return;

    setLoading(true);
    setError(null);

    const unsubscribe = oracleService.subscribe(symbol, (sym, data) => {
      setCurrentPrice(data);
      
      // Add new data point to chart
      const timestamp = Date.now();
      const newDataPoint = {
        timestamp,
        price: data.price,
        volume: data.volume_24h || 0,
        confidence: data.confidence,
        time: new Date(timestamp).toLocaleTimeString('en-US', {
          hour12: false,
          hour: '2-digit',
          minute: '2-digit'
        }),
        fullTime: new Date(timestamp).toLocaleString()
      };

      setChartData(prev => {
        const updated = [...prev, newDataPoint];
        // Keep only last 100 data points for performance
        return updated.slice(-100);
      });
      
      setLoading(false);
    });

    // Initial price fetch
    oracleService.getPrice(symbol)
      .then(data => {
        setCurrentPrice(data);
        
        // Initialize chart with current price
        const timestamp = Date.now();
        const initialDataPoint = {
          timestamp,
          price: data.price,
          volume: data.volume_24h || 0,
          confidence: data.confidence,
          time: new Date(timestamp).toLocaleTimeString('en-US', {
            hour12: false,
            hour: '2-digit',
            minute: '2-digit'
          }),
          fullTime: new Date(timestamp).toLocaleString()
        };
        
        setChartData([initialDataPoint]);
        setLoading(false);
      })
      .catch(err => {
        console.error('Failed to fetch initial price:', err);
        setError('Failed to load price data');
        setLoading(false);
      });

    return unsubscribe;
  }, [symbol]);

  // Custom tooltip for the chart
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-black/80 backdrop-blur-sm border border-white/20 rounded-lg p-3 text-white">
          <p className="text-sm text-white/70">{data.fullTime}</p>
          <p className="text-lg font-bold">
            Price: {oracleService.formatPrice(data.price)}
          </p>
          <p className="text-sm text-white/70">
            Confidence: {(data.confidence * 100).toFixed(1)}%
          </p>
          {data.volume > 0 && (
            <p className="text-sm text-white/70">
              Volume: {oracleService.formatVolume(data.volume)}
            </p>
          )}
        </div>
      );
    }
    return null;
  };

  if (loading) {
    return (
      <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-6">
        <div className="flex items-center justify-center h-64">
          <div className="flex items-center gap-3">
            <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
            <span className="text-white/70">Loading price data...</span>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-6">
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="text-red-400 text-lg mb-2">⚠️</div>
            <p className="text-red-400">{error}</p>
            <button 
              onClick={() => window.location.reload()}
              className="mt-3 px-4 py-2 bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500/30 transition-colors"
            >
              Retry
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-6">
      {/* Chart Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <div>
          <h3 className="text-xl font-bold text-white mb-2">
            {symbol} Price Chart
          </h3>
          {currentPrice && (
            <div className="flex items-center gap-4">
              <span className="text-2xl font-bold text-white">
                {oracleService.formatPrice(currentPrice.price)}
              </span>
              <span className={`text-lg font-semibold ${
                currentPrice.change_24h >= 0 ? 'text-green-400' : 'text-red-400'
              }`}>
                {oracleService.formatChange(currentPrice.change_24h)}
              </span>
              <span className="text-sm text-white/70">
                {oracleService.getConfidenceDescription(currentPrice.confidence)} Confidence
              </span>
            </div>
          )}
        </div>

        {/* Timeframe Selector */}
        <div className="flex gap-1 bg-white/5 rounded-lg p-1">
          {TIMEFRAMES.map(tf => (
            <button
              key={tf.value}
              onClick={() => setTimeframe(tf.value)}
              className={`px-3 py-1 rounded text-sm font-medium transition-all ${
                timeframe === tf.value
                  ? 'bg-blue-500 text-white'
                  : 'text-white/70 hover:text-white hover:bg-white/10'
              }`}
            >
              {tf.label}
            </button>
          ))}
        </div>
      </div>

      {/* Price Chart */}
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={chartData}>
            <defs>
              <linearGradient id="priceGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.4}/>
                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.1}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
            <XAxis 
              dataKey="time" 
              stroke="rgba(255,255,255,0.7)"
              fontSize={12}
              tick={{ fill: 'rgba(255,255,255,0.7)' }}
            />
            <YAxis 
              stroke="rgba(255,255,255,0.7)"
              fontSize={12}
              tick={{ fill: 'rgba(255,255,255,0.7)' }}
              tickFormatter={(value) => oracleService.formatPrice(value)}
              domain={['dataMin - 10', 'dataMax + 10']}
            />
            <Tooltip content={<CustomTooltip />} />
            <Area 
              type="monotone" 
              dataKey="price" 
              stroke="#3b82f6" 
              fillOpacity={1} 
              fill="url(#priceGradient)" 
              strokeWidth={2}
              dot={false}
              activeDot={{ r: 4, fill: '#3b82f6' }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Chart Stats */}
      {currentPrice && (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6 pt-4 border-t border-white/20">
          <div className="text-center">
            <p className="text-xs text-white/60 mb-1">24h Volume</p>
            <p className="text-sm font-semibold text-white">
              {oracleService.formatVolume(currentPrice.volume_24h)}
            </p>
          </div>
          <div className="text-center">
            <p className="text-xs text-white/60 mb-1">Data Sources</p>
            <p className="text-sm font-semibold text-white">
              {currentPrice.sources?.length || 0}
            </p>
          </div>
          <div className="text-center">
            <p className="text-xs text-white/60 mb-1">TWAP 1h</p>
            <p className="text-sm font-semibold text-white">
              {currentPrice.twap_1h ? oracleService.formatPrice(currentPrice.twap_1h) : 'N/A'}
            </p>
          </div>
          <div className="text-center">
            <p className="text-xs text-white/60 mb-1">TWAP 24h</p>
            <p className="text-sm font-semibold text-white">
              {currentPrice.twap_24h ? oracleService.formatPrice(currentPrice.twap_24h) : 'N/A'}
            </p>
          </div>
        </div>
      )}

      {/* Data Sources */}
      {currentPrice?.sources && (
        <div className="mt-4 pt-4 border-t border-white/20">
          <p className="text-xs text-white/60 mb-2">Price Sources:</p>
          <div className="flex flex-wrap gap-2">
            {currentPrice.sources.map((source, index) => (
              <span 
                key={index}
                className="px-2 py-1 bg-white/10 rounded text-xs text-white/80"
              >
                {source}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Live Update Indicator */}
      <div className="flex items-center justify-center mt-4 pt-4 border-t border-white/20">
        <div className="flex items-center gap-2 text-xs text-white/60">
          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
          <span>Live data • Updates every 30 seconds</span>
        </div>
      </div>
    </div>
  );
}

export default RealTimePriceChart;

