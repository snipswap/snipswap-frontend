import React, { useState, useEffect, useRef } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { TrendingUp, TrendingDown, Activity, DollarSign, BarChart3, Zap, Wifi, WifiOff } from 'lucide-react';
import { cryptoApi, formatPrice, formatVolume, formatPercentage } from './services/cryptoApi';

// Enhanced Order Form Component
const EnhancedOrderForm = ({ side, pair, currentPrice, onSubmit }) => {
  const [price, setPrice] = useState('');
  const [quantity, setQuantity] = useState('');
  const [orderType, setOrderType] = useState('limit');
  const [privacyMode, setPrivacyMode] = useState(false);

  // Auto-fill current price for market orders
  useEffect(() => {
    if (orderType === 'market' && currentPrice) {
      setPrice(currentPrice.toFixed(2));
    }
  }, [orderType, currentPrice]);

  const isBuy = side === 'buy';
  const borderColor = isBuy ? 'border-green-500/30' : 'border-red-500/30';
  const accentColor = isBuy ? 'bg-green-500' : 'bg-red-500';
  const hoverColor = isBuy ? 'hover:bg-green-600' : 'hover:bg-red-600';

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSubmit) {
      onSubmit({ side, price: parseFloat(price), quantity: parseFloat(quantity), orderType, privacyMode });
    }
  };

  const total = price && quantity ? (parseFloat(price) * parseFloat(quantity)).toFixed(2) : '0.00';

  return (
    <div className={`bg-gray-900/50 backdrop-blur-sm border ${borderColor} rounded-xl p-6`}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold text-white capitalize">{side} {pair?.split('/')[0] || 'BTC'}</h3>
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
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Price {orderType === 'market' && '(Market)'}
          </label>
          <div className="relative">
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder={currentPrice ? currentPrice.toFixed(2) : "0.00"}
              disabled={orderType === 'market'}
              className="w-full bg-gray-800/80 border border-gray-600 text-white text-lg font-medium rounded-lg px-3 py-3 pr-12 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all placeholder-gray-500 disabled:opacity-60"
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
            <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 font-medium">
              {pair?.split('/')[0] || 'BTC'}
            </span>
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
            disabled={!price || !quantity}
            className={`w-full ${accentColor} ${hoverColor} text-white font-bold py-3 px-4 rounded-lg transition-all transform hover:scale-[1.02] active:scale-[0.98] shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none`}
          >
            Place {side.charAt(0).toUpperCase() + side.slice(1)} Order
          </button>
        </div>

        <div className="text-xs text-gray-400 space-y-1">
          <div className="flex justify-between">
            <span>Total:</span>
            <span className="text-white font-medium">${total}</span>
          </div>
          <div className="flex justify-between">
            <span>Fee (0.1%):</span>
            <span className="text-green-400">${(parseFloat(total) * 0.001).toFixed(2)}</span>
          </div>
        </div>
      </form>
    </div>
  );
};

// Enhanced Price Chart Component with Real Data
const RealTimePriceChart = ({ data, timeframe, setTimeframe, coinId }) => {
  const timeframes = [
    { label: '1H', value: '1h', days: 1 },
    { label: '4H', value: '4h', days: 1 },
    { label: '1D', value: '1d', days: 1 },
    { label: '7D', value: '7d', days: 7 },
    { label: '30D', value: '30d', days: 30 },
    { label: '1Y', value: '1y', days: 365 }
  ];

  return (
    <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <BarChart3 className="w-5 h-5 text-blue-400" />
          <h3 className="text-lg font-bold text-white">Price Chart</h3>
          <span className="text-sm text-gray-400 uppercase">{coinId}</span>
        </div>
        <div className="flex gap-1 bg-gray-800/50 rounded-lg p-1">
          {timeframes.map((tf) => (
            <button
              key={tf.value}
              onClick={() => setTimeframe(tf)}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all ${
                timeframe.value === tf.value
                  ? 'bg-blue-500 text-white'
                  : 'text-gray-400 hover:text-white hover:bg-gray-700'
              }`}
            >
              {tf.label}
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
              tickFormatter={(value) => `$${value.toLocaleString()}`}
            />
            <Tooltip 
              contentStyle={{
                backgroundColor: '#1F2937',
                border: '1px solid #374151',
                borderRadius: '8px',
                color: '#F9FAFB'
              }}
              formatter={(value, name) => [`$${parseFloat(value).toLocaleString()}`, 'Price']}
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

// Enhanced Market Stats Component with Real Data
const RealTimeMarketStats = ({ priceData, isConnected }) => {
  if (!priceData) return null;

  const isPositive = priceData.change24h >= 0;

  return (
    <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-white">Market Overview</h2>
        <div className={`flex items-center gap-2 px-3 py-1 rounded-full text-xs ${
          isConnected ? 'bg-green-500/20 text-green-300' : 'bg-red-500/20 text-red-300'
        }`}>
          {isConnected ? <Wifi className="w-3 h-3" /> : <WifiOff className="w-3 h-3" />}
          {isConnected ? 'Live Data' : 'Connecting...'}
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-5 gap-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <DollarSign className="w-4 h-4 text-blue-400" />
            <span className="text-sm text-gray-400">Current Price</span>
          </div>
          <div className="text-2xl font-bold text-white">
            {formatPrice(priceData.price)}
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
            {formatPercentage(priceData.change24h)}
          </div>
        </div>

        <div>
          <div className="flex items-center gap-2 mb-2">
            <Activity className="w-4 h-4 text-purple-400" />
            <span className="text-sm text-gray-400">24h Volume</span>
          </div>
          <div className="text-xl font-bold text-white">
            {formatVolume(priceData.volume24h)}
          </div>
        </div>

        <div>
          <span className="text-sm text-gray-400 block mb-2">Market Cap</span>
          <div className="text-xl font-bold text-blue-400">
            {formatVolume(priceData.price * 19000000)} {/* Approximate BTC supply */}
          </div>
        </div>

        <div>
          <span className="text-sm text-gray-400 block mb-2">Last Updated</span>
          <div className="text-sm font-medium text-gray-300">
            {new Date(priceData.timestamp).toLocaleTimeString()}
          </div>
        </div>
      </div>
    </div>
  );
};

// Enhanced Order Book Component with Real Data
const RealTimeOrderBook = ({ orderBook }) => {
  return (
    <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6">
      <h3 className="text-lg font-bold text-white mb-4">Order Book</h3>
      
      <div className="space-y-4">
        {/* Sell Orders (Asks) */}
        <div>
          <div className="grid grid-cols-3 gap-4 text-xs text-gray-400 font-medium mb-2 px-2">
            <span>Price (USD)</span>
            <span className="text-right">Size (BTC)</span>
            <span className="text-right">Total</span>
          </div>
          <div className="space-y-1 max-h-32 overflow-y-auto">
            {orderBook.asks.slice(0, 8).reverse().map((ask, i) => (
              <div key={i} className="grid grid-cols-3 gap-4 text-sm py-1 px-2 hover:bg-red-500/10 rounded cursor-pointer transition-colors">
                <span className="text-red-400 font-medium">{parseFloat(ask.price).toLocaleString()}</span>
                <span className="text-right text-gray-300">{ask.size}</span>
                <span className="text-right text-gray-400">{parseFloat(ask.total).toLocaleString()}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Spread */}
        <div className="border-t border-b border-gray-700 py-2">
          <div className="text-center text-sm">
            <span className="text-gray-400">Spread: </span>
            <span className="text-white font-medium">
              ${(parseFloat(orderBook.asks[0]?.price || 0) - parseFloat(orderBook.bids[0]?.price || 0)).toFixed(2)} 
              ({(((parseFloat(orderBook.asks[0]?.price || 0) - parseFloat(orderBook.bids[0]?.price || 0)) / parseFloat(orderBook.asks[0]?.price || 1)) * 100).toFixed(3)}%)
            </span>
          </div>
        </div>

        {/* Buy Orders (Bids) */}
        <div>
          <div className="space-y-1 max-h-32 overflow-y-auto">
            {orderBook.bids.slice(0, 8).map((bid, i) => (
              <div key={i} className="grid grid-cols-3 gap-4 text-sm py-1 px-2 hover:bg-green-500/10 rounded cursor-pointer transition-colors">
                <span className="text-green-400 font-medium">{parseFloat(bid.price).toLocaleString()}</span>
                <span className="text-right text-gray-300">{bid.size}</span>
                <span className="text-right text-gray-400">{parseFloat(bid.total).toLocaleString()}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// Recent Trades Component
const RecentTrades = ({ trades }) => {
  return (
    <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6">
      <h3 className="text-lg font-bold text-white mb-4">Recent Trades</h3>
      
      <div className="space-y-2">
        <div className="grid grid-cols-4 gap-4 text-xs text-gray-400 font-medium mb-2 px-2">
          <span>Time</span>
          <span className="text-right">Price</span>
          <span className="text-right">Size</span>
          <span className="text-right">Side</span>
        </div>
        
        <div className="space-y-1 max-h-64 overflow-y-auto">
          {trades.map((trade, i) => (
            <div key={i} className="grid grid-cols-4 gap-4 text-sm py-1 px-2 hover:bg-gray-700/30 rounded transition-colors">
              <span className="text-gray-400">{trade.timestamp}</span>
              <span className="text-right text-white font-medium">{parseFloat(trade.price).toLocaleString()}</span>
              <span className="text-right text-gray-300">{trade.size}</span>
              <span className={`text-right font-medium ${trade.side === 'buy' ? 'text-green-400' : 'text-red-400'}`}>
                {trade.side.toUpperCase()}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Main Real-Time App Component
function RealTimeApp() {
  const [selectedCoin, setSelectedCoin] = useState('bitcoin');
  const [selectedPair, setSelectedPair] = useState('BTC/USD');
  const [timeframe, setTimeframe] = useState({ label: '1H', value: '1h', days: 1 });
  const [priceData, setPriceData] = useState(null);
  const [chartData, setChartData] = useState([]);
  const [orderBook, setOrderBook] = useState({ bids: [], asks: [] });
  const [recentTrades, setRecentTrades] = useState([]);
  const [isConnected, setIsConnected] = useState(false);
  const [loading, setLoading] = useState(true);
  
  const unsubscribeRef = useRef(null);

  // Initialize data and real-time updates
  useEffect(() => {
    const initializeData = async () => {
      setLoading(true);
      try {
        // Get initial price data
        const initialPrice = await cryptoApi.getCurrentPrice(selectedCoin);
        setPriceData({
          price: initialPrice.usd,
          change24h: initialPrice.usd_24h_change,
          volume24h: initialPrice.usd_24h_vol,
          timestamp: Date.now()
        });

        // Get historical chart data
        const historical = await cryptoApi.getHistoricalData(selectedCoin, timeframe.days);
        setChartData(historical);

        // Generate order book and trades
        setOrderBook(cryptoApi.generateOrderBook(initialPrice.usd));
        setRecentTrades(cryptoApi.generateRecentTrades(initialPrice.usd));

        setIsConnected(true);
      } catch (error) {
        console.error('Failed to initialize data:', error);
        setIsConnected(false);
      } finally {
        setLoading(false);
      }
    };

    initializeData();

    // Subscribe to real-time price updates
    unsubscribeRef.current = cryptoApi.subscribeToPrice(selectedCoin, (update) => {
      setPriceData(update);
      setOrderBook(cryptoApi.generateOrderBook(update.price));
      setRecentTrades(cryptoApi.generateRecentTrades(update.price));
      setIsConnected(true);
    });

    return () => {
      if (unsubscribeRef.current) {
        unsubscribeRef.current();
      }
    };
  }, [selectedCoin]);

  // Update chart data when timeframe changes
  useEffect(() => {
    const updateChartData = async () => {
      try {
        const historical = await cryptoApi.getHistoricalData(selectedCoin, timeframe.days);
        setChartData(historical);
      } catch (error) {
        console.error('Failed to update chart data:', error);
      }
    };

    updateChartData();
  }, [timeframe, selectedCoin]);

  const handleOrderSubmit = (orderData) => {
    console.log('Order submitted:', orderData);
    // Here you would typically send the order to your backend
    alert(`${orderData.side.toUpperCase()} order placed: ${orderData.quantity} ${selectedPair.split('/')[0]} at $${orderData.price}`);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-white text-lg">Loading SnipSwap DEX...</p>
        </div>
      </div>
    );
  }

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
              <select
                value={selectedCoin}
                onChange={(e) => {
                  setSelectedCoin(e.target.value);
                  setSelectedPair(e.target.value === 'bitcoin' ? 'BTC/USD' : 'ETH/USD');
                }}
                className="bg-gray-800 border border-gray-600 text-white rounded-lg px-3 py-2 text-sm"
              >
                <option value="bitcoin">BTC/USD</option>
                <option value="ethereum">ETH/USD</option>
              </select>
              
              <div className={`flex items-center gap-2 px-3 py-1 rounded-full text-xs ${
                isConnected ? 'bg-green-500/20 text-green-300' : 'bg-red-500/20 text-red-300'
              }`}>
                {isConnected ? <Wifi className="w-3 h-3" /> : <WifiOff className="w-3 h-3" />}
                {isConnected ? 'Live Data' : 'Connecting...'}
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
        <RealTimeMarketStats priceData={priceData} isConnected={isConnected} />

        {/* Price Chart */}
        <RealTimePriceChart 
          data={chartData}
          timeframe={timeframe}
          setTimeframe={setTimeframe}
          coinId={selectedCoin}
        />

        {/* Trading Section */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Order Forms */}
          <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
            <EnhancedOrderForm 
              side="buy" 
              pair={selectedPair}
              currentPrice={priceData?.price}
              onSubmit={handleOrderSubmit}
            />
            <EnhancedOrderForm 
              side="sell" 
              pair={selectedPair}
              currentPrice={priceData?.price}
              onSubmit={handleOrderSubmit}
            />
          </div>

          {/* Order Book */}
          <RealTimeOrderBook orderBook={orderBook} />

          {/* Recent Trades */}
          <RecentTrades trades={recentTrades} />
        </div>
      </main>
    </div>
  );
}

export default RealTimeApp;

