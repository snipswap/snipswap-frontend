import React, { useState, useEffect, useRef } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { TrendingUp, TrendingDown, Activity, DollarSign, BarChart3, Zap } from 'lucide-react';
import io from 'socket.io-client';

// Use environment variable for API base URL, fallback to Railway backend
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://snipswap-dex-production.up.railway.app';
const API_BASE = `${API_BASE_URL}/api/market`;

// Mock real-time price data generator
const generateMockPriceData = () => {
  const basePrice = 2500;
  const data = [];
  const now = Date.now();
  
  for (let i = 0; i < 50; i++) {
    const time = now - (50 - i) * 60000; // 1 minute intervals
    const price = basePrice + (Math.random() - 0.5) * 200 + Math.sin(i / 10) * 100;
    data.push({
      time: new Date(time).toLocaleTimeString(),
      price: price.toFixed(2),
      volume: Math.random() * 1000000
    });
  }
  return data;
};

// Enhanced Order Form Component
const EnhancedOrderForm = ({ side, pair, onSubmit }) => {
  const [price, setPrice] = useState('');
  const [quantity, setQuantity] = useState('');
  const [orderType, setOrderType] = useState('limit');
  const [privacyMode, setPrivacyMode] = useState(false);

  const isBuy = side === 'buy';
  const borderColor = isBuy ? 'border-green-500/30' : 'border-red-500/30';
  const accentColor = isBuy ? 'bg-green-500' : 'bg-red-500';
  const hoverColor = isBuy ? 'hover:bg-green-600' : 'hover:bg-red-600';

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSubmit) {
      onSubmit({ side, price, quantity, orderType, privacyMode });
    }
  };

  return (
    <div className={`bg-gray-900/50 backdrop-blur-sm border ${borderColor} rounded-xl p-6`}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold text-white capitalize">{side} Order</h3>
        <div className="flex items-center gap-2">
          <Zap className="w-4 h-4 text-yellow-400" />
          <span className="text-xs text-gray-400">MEV Protected</span>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Order Type</label>
          <select 
            value={orderType} 
            onChange={(e) => setOrderType(e.target.value)}
            className="w-full bg-gray-800/80 border border-gray-600 text-white rounded-lg px-3 py-2.5 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
          >
            <option value="limit">Limit Order</option>
            <option value="market">Market Order</option>
            <option value="stop">Stop Loss</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Price</label>
          <div className="relative">
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="0.00"
              className="w-full bg-gray-800/80 border border-gray-600 text-white text-lg font-medium rounded-lg px-3 py-3 pr-12 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all placeholder-gray-500"
              step="0.01"
            />
            <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 font-medium">USD</span>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Quantity</label>
          <div className="relative">
            <input
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              placeholder="0.00"
              className="w-full bg-gray-800/80 border border-gray-600 text-white text-lg font-medium rounded-lg px-3 py-3 pr-16 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all placeholder-gray-500"
              step="0.001"
            />
            <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 font-medium">{pair?.split('/')[0] || 'BTC'}</span>
          </div>
        </div>

        <div className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg">
          <span className="text-sm text-gray-300">Privacy Mode</span>
          <button
            type="button"
            onClick={() => setPrivacyMode(!privacyMode)}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
              privacyMode ? 'bg-purple-600' : 'bg-gray-600'
            }`}
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                privacyMode ? 'translate-x-6' : 'translate-x-1'
              }`}
            />
          </button>
        </div>

        <div className="pt-2">
          <button
            type="submit"
            className={`w-full ${accentColor} ${hoverColor} text-white font-bold py-3 px-4 rounded-lg transition-all transform hover:scale-[1.02] active:scale-[0.98] shadow-lg`}
          >
            Place {side.charAt(0).toUpperCase() + side.slice(1)} Order
          </button>
        </div>

        <div className="text-xs text-gray-400 space-y-1">
          <div className="flex justify-between">
            <span>Total:</span>
            <span className="text-white font-medium">
              {price && quantity ? `$${(parseFloat(price) * parseFloat(quantity)).toFixed(2)}` : '$0.00'}
            </span>
          </div>
          <div className="flex justify-between">
            <span>Fee:</span>
            <span className="text-green-400">0.1%</span>
          </div>
        </div>
      </form>
    </div>
  );
};

// Enhanced Price Chart Component
const PriceChart = ({ data, timeframe, setTimeframe }) => {
  const timeframes = ['1m', '5m', '15m', '1h', '4h', '1d'];

  return (
    <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <BarChart3 className="w-5 h-5 text-blue-400" />
          <h3 className="text-lg font-bold text-white">Price Chart</h3>
        </div>
        <div className="flex gap-1 bg-gray-800/50 rounded-lg p-1">
          {timeframes.map((tf) => (
            <button
              key={tf}
              onClick={() => setTimeframe(tf)}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all ${
                timeframe === tf
                  ? 'bg-blue-500 text-white'
                  : 'text-gray-400 hover:text-white hover:bg-gray-700'
              }`}
            >
              {tf}
            </button>
          ))}
        </div>
      </div>

      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <defs>
              <linearGradient id="priceGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#3B82F6" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
            <XAxis 
              dataKey="time" 
              stroke="#9CA3AF" 
              fontSize={12}
              tickLine={false}
            />
            <YAxis 
              stroke="#9CA3AF" 
              fontSize={12}
              tickLine={false}
              domain={['dataMin - 10', 'dataMax + 10']}
            />
            <Tooltip 
              contentStyle={{
                backgroundColor: '#1F2937',
                border: '1px solid #374151',
                borderRadius: '8px',
                color: '#F9FAFB'
              }}
            />
            <Area
              type="monotone"
              dataKey="price"
              stroke="#3B82F6"
              strokeWidth={2}
              fill="url(#priceGradient)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

// Enhanced Market Stats Component
const MarketStats = ({ currentPrice, priceChange, volume, high24h, low24h }) => {
  const isPositive = priceChange >= 0;

  return (
    <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6">
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <DollarSign className="w-4 h-4 text-blue-400" />
            <span className="text-sm text-gray-400">Current Price</span>
          </div>
          <div className="text-2xl font-bold text-white">
            ${currentPrice?.toLocaleString() || '2,485.67'}
          </div>
        </div>

        <div>
          <div className="flex items-center gap-2 mb-2">
            {isPositive ? (
              <TrendingUp className="w-4 h-4 text-green-400" />
            ) : (
              <TrendingDown className="w-4 h-4 text-red-400" />
            )}
            <span className="text-sm text-gray-400">24h Change</span>
          </div>
          <div className={`text-xl font-bold ${isPositive ? 'text-green-400' : 'text-red-400'}`}>
            {isPositive ? '+' : ''}{priceChange?.toFixed(2) || '+2.34'}%
          </div>
        </div>

        <div>
          <div className="flex items-center gap-2 mb-2">
            <Activity className="w-4 h-4 text-purple-400" />
            <span className="text-sm text-gray-400">24h Volume</span>
          </div>
          <div className="text-xl font-bold text-white">
            ${volume?.toLocaleString() || '1,234,567'}
          </div>
        </div>

        <div>
          <span className="text-sm text-gray-400 block mb-2">24h High</span>
          <div className="text-xl font-bold text-green-400">
            ${high24h?.toLocaleString() || '2,521.89'}
          </div>
        </div>

        <div>
          <span className="text-sm text-gray-400 block mb-2">24h Low</span>
          <div className="text-xl font-bold text-red-400">
            ${low24h?.toLocaleString() || '2,398.12'}
          </div>
        </div>
      </div>
    </div>
  );
};

// Enhanced Order Book Component
const EnhancedOrderBook = ({ orderBook }) => {
  return (
    <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6">
      <h3 className="text-lg font-bold text-white mb-4">Order Book</h3>
      
      <div className="space-y-4">
        {/* Sell Orders */}
        <div>
          <div className="grid grid-cols-3 gap-4 text-xs text-gray-400 font-medium mb-2 px-2">
            <span>Price (USD)</span>
            <span className="text-right">Size (BTC)</span>
            <span className="text-right">Total</span>
          </div>
          <div className="space-y-1 max-h-32 overflow-y-auto">
            {[...Array(8)].map((_, i) => {
              const price = 2500 + i * 5;
              const size = (Math.random() * 2).toFixed(4);
              const total = (price * size).toFixed(2);
              return (
                <div key={i} className="grid grid-cols-3 gap-4 text-sm py-1 px-2 hover:bg-red-500/10 rounded cursor-pointer transition-colors">
                  <span className="text-red-400 font-medium">{price.toLocaleString()}</span>
                  <span className="text-right text-gray-300">{size}</span>
                  <span className="text-right text-gray-400">{total}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Spread */}
        <div className="border-t border-b border-gray-700 py-2">
          <div className="text-center text-sm">
            <span className="text-gray-400">Spread: </span>
            <span className="text-white font-medium">$2.50 (0.10%)</span>
          </div>
        </div>

        {/* Buy Orders */}
        <div>
          <div className="space-y-1 max-h-32 overflow-y-auto">
            {[...Array(8)].map((_, i) => {
              const price = 2485 - i * 5;
              const size = (Math.random() * 2).toFixed(4);
              const total = (price * size).toFixed(2);
              return (
                <div key={i} className="grid grid-cols-3 gap-4 text-sm py-1 px-2 hover:bg-green-500/10 rounded cursor-pointer transition-colors">
                  <span className="text-green-400 font-medium">{price.toLocaleString()}</span>
                  <span className="text-right text-gray-300">{size}</span>
                  <span className="text-right text-gray-400">{total}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

// Main Enhanced App Component
function EnhancedApp() {
  const [selectedPair, setSelectedPair] = useState('BTC/USD');
  const [timeframe, setTimeframe] = useState('1h');
  const [priceData, setPriceData] = useState([]);
  const [currentPrice, setCurrentPrice] = useState(2485.67);
  const [priceChange, setPriceChange] = useState(2.34);
  const [isConnected, setIsConnected] = useState(false);
  const socketRef = useRef(null);

  // Initialize mock data and WebSocket connection
  useEffect(() => {
    // Generate initial mock data
    setPriceData(generateMockPriceData());

    // Simulate real-time price updates
    const priceInterval = setInterval(() => {
      const newPrice = currentPrice + (Math.random() - 0.5) * 10;
      setCurrentPrice(newPrice);
      
      // Update price data
      setPriceData(prevData => {
        const newData = [...prevData];
        newData.shift(); // Remove oldest
        newData.push({
          time: new Date().toLocaleTimeString(),
          price: newPrice.toFixed(2),
          volume: Math.random() * 1000000
        });
        return newData;
      });
    }, 3000); // Update every 3 seconds

    return () => clearInterval(priceInterval);
  }, [currentPrice]);

  const handleOrderSubmit = (orderData) => {
    console.log('Order submitted:', orderData);
    // Here you would typically send the order to your backend
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      {/* Header */}
      <header className="border-b border-gray-700 bg-gray-900/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                  <Zap className="w-5 h-5 text-white" />
                </div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  SnipSwap DEX
                </h1>
              </div>
              <div className="hidden md:flex items-center gap-2">
                <div className="px-3 py-1 bg-purple-500/20 text-purple-300 rounded-full text-xs font-medium">
                  Privacy-First
                </div>
                <div className="px-3 py-1 bg-blue-500/20 text-blue-300 rounded-full text-xs font-medium">
                  MEV Protected
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <div className={`flex items-center gap-2 px-3 py-1 rounded-full text-xs ${
                isConnected ? 'bg-green-500/20 text-green-300' : 'bg-red-500/20 text-red-300'
              }`}>
                <div className={`w-2 h-2 rounded-full ${isConnected ? 'bg-green-400' : 'bg-red-400'}`} />
                {isConnected ? 'Connected' : 'Connecting...'}
              </div>
              <button className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-2 rounded-lg font-medium hover:from-blue-600 hover:to-purple-700 transition-all">
                Connect Wallet
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-6 space-y-6">
        {/* Market Stats */}
        <MarketStats 
          currentPrice={currentPrice}
          priceChange={priceChange}
          volume={1234567}
          high24h={2521.89}
          low24h={2398.12}
        />

        {/* Price Chart */}
        <PriceChart 
          data={priceData}
          timeframe={timeframe}
          setTimeframe={setTimeframe}
        />

        {/* Trading Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Order Forms */}
          <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
            <EnhancedOrderForm 
              side="buy" 
              pair={selectedPair}
              onSubmit={handleOrderSubmit}
            />
            <EnhancedOrderForm 
              side="sell" 
              pair={selectedPair}
              onSubmit={handleOrderSubmit}
            />
          </div>

          {/* Order Book */}
          <EnhancedOrderBook />
        </div>
      </main>
    </div>
  );
}

export default EnhancedApp;

