import React, { useState, useEffect } from 'react';
import oracleService from '../services/oracleService';

// Use environment variable for API base URL, fallback to Railway backend
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://snipswap-dex-production.up.railway.app';

const CHAINS = [
  { label: 'Secret Network', value: 'secret', icon: '🔐' },
  { label: 'Osmosis', value: 'osmosis', icon: '🌊' },
  { label: 'Shade Protocol', value: 'shade', icon: '🌑' },
];

function EnhancedOrderForm({ pair, side }) {
  const [price, setPrice] = useState('');
  const [quantity, setQuantity] = useState('');
  const [isPrivate, setIsPrivate] = useState(true); // Default to private
  const [targetChain, setTargetChain] = useState('secret');
  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [priceData, setPriceData] = useState(null);
  const [useMarketPrice, setUseMarketPrice] = useState(false);
  const [slippage, setSlippage] = useState(0.5);
  const [orderType, setOrderType] = useState('limit');

  // Subscribe to real-time price updates
  useEffect(() => {
    if (!pair) return;

    const unsubscribe = oracleService.subscribe(pair, (symbol, data) => {
      setPriceData(data);
      
      // Auto-fill market price if enabled
      if (useMarketPrice && data.price) {
        setPrice(data.price.toString());
      }
    });

    // Initial price fetch
    oracleService.getPrice(pair).then(data => {
      setPriceData(data);
      if (useMarketPrice && data.price) {
        setPrice(data.price.toString());
      }
    }).catch(console.error);

    return unsubscribe;
  }, [pair, useMarketPrice]);

  // Update price when market price toggle changes
  useEffect(() => {
    if (useMarketPrice && priceData?.price) {
      const marketPrice = priceData.price;
      const adjustedPrice = side === 'buy' 
        ? marketPrice * (1 + slippage / 100) 
        : marketPrice * (1 - slippage / 100);
      setPrice(adjustedPrice.toFixed(6));
    }
  }, [useMarketPrice, priceData, side, slippage]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!pair) return;
    
    setLoading(true);
    setMessage(null);
    
    try {
      const payload = {
        user_address: 'demo_user',
        pair_symbol: pair,
        side,
        order_type: orderType,
        quantity: parseFloat(quantity),
        price: parseFloat(price),
        is_private: isPrivate,
        slippage: slippage,
        target_chain: targetChain,
        timestamp: Date.now()
      };

      const res = await fetch(`${API_BASE_URL}/api/trading/orders`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      
      setMessage({
        type: 'success',
        text: `✅ Order submitted successfully! ID: ${data.order_id || data.id || 'pending'}`
      });
      
      // Reset form
      setPrice('');
      setQuantity('');
      setSlippage(0.5);
      
    } catch (err) {
      console.error('Order submission error:', err);
      setMessage({
        type: 'error',
        text: '❌ Failed to submit order. Please try again.'
      });
    } finally {
      setLoading(false);
    }
  };

  const calculateTotal = () => {
    const priceNum = parseFloat(price) || 0;
    const quantityNum = parseFloat(quantity) || 0;
    return priceNum * quantityNum;
  };

  const calculateFees = () => {
    const total = calculateTotal();
    const tradingFee = total * 0.003; // 0.3% trading fee
    const snipFee = total * 0.005; // 0.5% to SNIP holders
    return { tradingFee, snipFee, total: tradingFee + snipFee };
  };

  const fees = calculateFees();

  return (
    <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-6 space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-white">
          {side === 'buy' ? '🟢 Buy' : '🔴 Sell'} {pair || 'Select Pair'}
        </h2>
        <div className="flex items-center gap-2">
          <span className="text-sm text-white/70">MEV Protected</span>
          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
        </div>
      </div>

      {/* Real-time Price Display */}
      {priceData && (
        <div className="bg-white/5 rounded-lg p-3 space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-sm text-white/70">Market Price</span>
            <span className="text-sm text-white/70">
              Confidence: {oracleService.getConfidenceDescription(priceData.confidence)}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-lg font-bold text-white">
              {oracleService.formatPrice(priceData.price)}
            </span>
            <span className={`text-sm font-semibold ${
              priceData.change_24h >= 0 ? 'text-green-400' : 'text-red-400'
            }`}>
              {oracleService.formatChange(priceData.change_24h)}
            </span>
          </div>
          <div className="text-xs text-white/50">
            Sources: {priceData.sources?.join(', ') || 'Multiple'}
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Order Type */}
        <div>
          <label className="block text-sm font-medium text-white/90 mb-2">
            Order Type
          </label>
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => setOrderType('limit')}
              className={`p-2 rounded-lg text-sm font-medium transition-all ${
                orderType === 'limit'
                  ? 'bg-blue-500 text-white'
                  : 'bg-white/10 text-white/70 hover:bg-white/20'
              }`}
            >
              Limit Order
            </button>
            <button
              type="button"
              onClick={() => setOrderType('market')}
              className={`p-2 rounded-lg text-sm font-medium transition-all ${
                orderType === 'market'
                  ? 'bg-blue-500 text-white'
                  : 'bg-white/10 text-white/70 hover:bg-white/20'
              }`}
            >
              Market Order
            </button>
          </div>
        </div>

        {/* Price Input */}
        <div>
          <div className="flex justify-between items-center mb-2">
            <label className="text-sm font-medium text-white/90">
              Price (USDC)
            </label>
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="use-market-price"
                checked={useMarketPrice}
                onChange={(e) => setUseMarketPrice(e.target.checked)}
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded"
              />
              <label htmlFor="use-market-price" className="text-xs text-white/70">
                Use Market Price
              </label>
            </div>
          </div>
          <input
            type="number"
            step="any"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            disabled={useMarketPrice}
            className="w-full bg-white/10 border border-white/30 rounded-lg px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:border-blue-400 disabled:opacity-50"
            placeholder="Enter price"
          />
        </div>

        {/* Quantity Input */}
        <div>
          <label className="block text-sm font-medium text-white/90 mb-2">
            Quantity ({pair || 'Token'})
          </label>
          <input
            type="number"
            step="any"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            className="w-full bg-white/10 border border-white/30 rounded-lg px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:border-blue-400"
            placeholder="Enter quantity"
          />
        </div>

        {/* Slippage (for market orders) */}
        {orderType === 'market' && (
          <div>
            <label className="block text-sm font-medium text-white/90 mb-2">
              Slippage Tolerance: {slippage}%
            </label>
            <input
              type="range"
              min="0.1"
              max="5"
              step="0.1"
              value={slippage}
              onChange={(e) => setSlippage(parseFloat(e.target.value))}
              className="w-full h-2 bg-white/20 rounded-lg appearance-none cursor-pointer"
            />
            <div className="flex justify-between text-xs text-white/50 mt-1">
              <span>0.1%</span>
              <span>5%</span>
            </div>
          </div>
        )}

        {/* Privacy Mode */}
        <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-white">🛡️ Privacy Mode</span>
              <span className="text-xs bg-green-500/20 text-green-400 px-2 py-1 rounded">
                Recommended
              </span>
            </div>
            <p className="text-xs text-white/60 mt-1">
              Hide your trading activity from MEV bots
            </p>
          </div>
          <input
            type="checkbox"
            checked={isPrivate}
            onChange={(e) => setIsPrivate(e.target.checked)}
            className="w-5 h-5 text-blue-600 bg-gray-100 border-gray-300 rounded"
          />
        </div>

        {/* Destination Chain */}
        <div>
          <label className="block text-sm font-medium text-white/90 mb-2">
            Destination Chain
          </label>
          <select
            value={targetChain}
            onChange={(e) => setTargetChain(e.target.value)}
            className="w-full bg-white/10 border border-white/30 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-400"
          >
            {CHAINS.map((chain) => (
              <option key={chain.value} value={chain.value} className="bg-gray-800">
                {chain.icon} {chain.label}
              </option>
            ))}
          </select>
        </div>

        {/* Order Summary */}
        {price && quantity && (
          <div className="bg-white/5 rounded-lg p-3 space-y-2">
            <h4 className="text-sm font-medium text-white/90">Order Summary</h4>
            <div className="space-y-1 text-sm">
              <div className="flex justify-between">
                <span className="text-white/70">Total Value:</span>
                <span className="text-white">{oracleService.formatPrice(calculateTotal())}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-white/70">Trading Fee (0.3%):</span>
                <span className="text-white">{oracleService.formatPrice(fees.tradingFee)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-white/70">SNIP Holders (0.5%):</span>
                <span className="text-green-400">{oracleService.formatPrice(fees.snipFee)}</span>
              </div>
              <div className="border-t border-white/20 pt-1 flex justify-between font-medium">
                <span className="text-white">Total Cost:</span>
                <span className="text-white">{oracleService.formatPrice(calculateTotal() + fees.total)}</span>
              </div>
            </div>
          </div>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading || !pair || !price || !quantity}
          className={`w-full py-4 rounded-lg font-semibold text-white transition-all ${
            side === 'buy'
              ? 'bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700'
              : 'bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700'
          } disabled:opacity-50 disabled:cursor-not-allowed`}
        >
          {loading ? (
            <div className="flex items-center justify-center gap-2">
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              Processing...
            </div>
          ) : (
            `${side === 'buy' ? 'Buy' : 'Sell'} ${pair || 'Token'}`
          )}
        </button>

        {/* Message Display */}
        {message && (
          <div className={`p-3 rounded-lg text-sm ${
            message.type === 'success' 
              ? 'bg-green-500/20 text-green-400 border border-green-500/30' 
              : 'bg-red-500/20 text-red-400 border border-red-500/30'
          }`}>
            {message.text}
          </div>
        )}
      </form>

      {/* SNIP Token Info */}
      <div className="bg-gradient-to-r from-purple-500/20 to-blue-500/20 rounded-lg p-3 border border-purple-500/30">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-lg">💎</span>
          <span className="text-sm font-medium text-white">$SNIP Token Benefits</span>
        </div>
        <p className="text-xs text-white/70">
          Your human-AI collaboration creates wealth you capture. 
          0.5% of all trading fees are distributed to $SNIP token holders.
        </p>
      </div>
    </div>
  );
}

export default EnhancedOrderForm;

