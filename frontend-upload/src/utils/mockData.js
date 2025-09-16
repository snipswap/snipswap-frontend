// Mock data generator for realistic candlestick charts

export const generateRealisticCandlestickData = (symbol = 'ATOM', days = 7, interval = '1m') => {
  const data = [];
  const now = Date.now();
  const intervalMs = getIntervalMs(interval);
  const totalCandles = Math.floor((days * 24 * 60 * 60 * 1000) / intervalMs);
  
  // Base prices for different symbols
  const basePrices = {
    'ATOM': 4.5989,
    'SCRT': 0.1945,
    'OSMO': 0.1689,
    'BTC': 111422.00,
    'ETH': 4307.57
  };
  
  let currentPrice = basePrices[symbol] || 4.5989;
  let trend = 0; // -1 bearish, 0 neutral, 1 bullish
  let trendStrength = 0;
  let volatility = 0.002; // 0.2% base volatility
  
  for (let i = 0; i < totalCandles; i++) {
    const time = now - (totalCandles - i) * intervalMs;
    
    // Simulate market trends and volatility changes
    if (Math.random() < 0.05) { // 5% chance to change trend
      trend = Math.random() < 0.33 ? -1 : Math.random() < 0.5 ? 0 : 1;
      trendStrength = Math.random() * 0.5 + 0.1;
    }
    
    // Adjust volatility based on time (higher during "trading hours")
    const hour = new Date(time).getHours();
    const isActiveHours = (hour >= 8 && hour <= 16) || (hour >= 20 && hour <= 23);
    const timeVolatility = isActiveHours ? volatility * 1.5 : volatility * 0.7;
    
    // Generate OHLC with realistic patterns
    const open = currentPrice;
    
    // Apply trend bias
    const trendBias = trend * trendStrength * 0.001;
    const randomChange = (Math.random() - 0.5) * timeVolatility * 2;
    const priceChange = trendBias + randomChange;
    
    // Calculate close price
    const close = open * (1 + priceChange);
    
    // Generate high and low with realistic wicks
    const wickRange = Math.abs(close - open) * (0.5 + Math.random() * 1.5);
    const maxPrice = Math.max(open, close);
    const minPrice = Math.min(open, close);
    
    const high = maxPrice + (Math.random() * wickRange * 0.7);
    const low = minPrice - (Math.random() * wickRange * 0.7);
    
    // Ensure low is not negative for small price tokens
    const finalLow = Math.max(low, currentPrice * 0.95);
    
    // Generate realistic volume
    const baseVolume = getBaseVolume(symbol);
    const volumeMultiplier = isActiveHours ? 1.2 + Math.random() * 0.8 : 0.3 + Math.random() * 0.4;
    const volatilityBoost = Math.abs(priceChange) > volatility ? 1.5 : 1;
    const volume = Math.floor(baseVolume * volumeMultiplier * volatilityBoost * (0.5 + Math.random()));
    
    data.push({
      time,
      open: parseFloat(open.toFixed(getDecimalPlaces(symbol))),
      high: parseFloat(high.toFixed(getDecimalPlaces(symbol))),
      low: parseFloat(finalLow.toFixed(getDecimalPlaces(symbol))),
      close: parseFloat(close.toFixed(getDecimalPlaces(symbol))),
      volume
    });
    
    currentPrice = close;
    
    // Prevent extreme price movements
    const basePrice = basePrices[symbol] || 4.5989;
    if (currentPrice > basePrice * 1.5 || currentPrice < basePrice * 0.5) {
      currentPrice = basePrice * (0.9 + Math.random() * 0.2);
    }
  }
  
  return data;
};

const getIntervalMs = (interval) => {
  const intervals = {
    '1m': 60 * 1000,
    '5m': 5 * 60 * 1000,
    '15m': 15 * 60 * 1000,
    '1h': 60 * 60 * 1000,
    '4h': 4 * 60 * 60 * 1000,
    '1d': 24 * 60 * 60 * 1000
  };
  return intervals[interval] || intervals['1m'];
};

const getBaseVolume = (symbol) => {
  const volumes = {
    'ATOM': 500000,
    'SCRT': 200000,
    'OSMO': 300000,
    'BTC': 50000,
    'ETH': 100000
  };
  return volumes[symbol] || 500000;
};

const getDecimalPlaces = (symbol) => {
  const decimals = {
    'ATOM': 4,
    'SCRT': 4,
    'OSMO': 4,
    'BTC': 2,
    'ETH': 2
  };
  return decimals[symbol] || 4;
};

// Generate order book data
export const generateOrderBookData = (currentPrice, spread = 0.001) => {
  const bids = [];
  const asks = [];
  
  // Generate realistic bid/ask levels
  for (let i = 0; i < 15; i++) {
    const bidPrice = currentPrice * (1 - spread * (i + 1));
    const askPrice = currentPrice * (1 + spread * (i + 1));
    
    // Generate realistic amounts with depth tapering
    const baseAmount = 100 + Math.random() * 900;
    const depthFactor = Math.exp(-i * 0.1); // Exponential decay
    
    const bidAmount = baseAmount * depthFactor * (0.8 + Math.random() * 0.4);
    const askAmount = baseAmount * depthFactor * (0.8 + Math.random() * 0.4);
    
    bids.push({
      price: parseFloat(bidPrice.toFixed(4)),
      amount: parseFloat(bidAmount.toFixed(2)),
      total: 0 // Will be calculated later
    });
    
    asks.push({
      price: parseFloat(askPrice.toFixed(4)),
      amount: parseFloat(askAmount.toFixed(2)),
      total: 0 // Will be calculated later
    });
  }
  
  // Calculate cumulative totals
  let bidTotal = 0;
  bids.forEach(bid => {
    bidTotal += bid.amount;
    bid.total = bidTotal;
  });
  
  let askTotal = 0;
  asks.forEach(ask => {
    askTotal += ask.amount;
    ask.total = askTotal;
  });
  
  return { bids, asks };
};

// Generate recent trades data
export const generateRecentTrades = (currentPrice, count = 20) => {
  const trades = [];
  const now = Date.now();
  
  for (let i = 0; i < count; i++) {
    const time = now - (count - i) * (Math.random() * 30000 + 5000); // Random intervals
    const priceVariation = (Math.random() - 0.5) * 0.002; // ±0.1% variation
    const price = currentPrice * (1 + priceVariation);
    const amount = Math.random() * 100 + 10;
    const side = Math.random() > 0.5 ? 'buy' : 'sell';
    
    trades.push({
      id: `trade_${i}`,
      price: parseFloat(price.toFixed(4)),
      amount: parseFloat(amount.toFixed(2)),
      time: new Date(time).toLocaleTimeString(),
      side,
      timestamp: time
    });
  }
  
  return trades.sort((a, b) => b.timestamp - a.timestamp);
};

// Update candlestick data with new tick
export const updateCandlestickData = (data, newPrice, volume = null) => {
  if (!data || data.length === 0) return data;
  
  const updated = [...data];
  const lastCandle = { ...updated[updated.length - 1] };
  const now = Date.now();
  
  // Check if we need a new candle (1 minute intervals)
  const timeDiff = now - lastCandle.time;
  if (timeDiff > 60000) { // New candle every minute
    const newCandle = {
      time: now,
      open: lastCandle.close,
      high: Math.max(lastCandle.close, newPrice),
      low: Math.min(lastCandle.close, newPrice),
      close: newPrice,
      volume: volume || Math.floor(Math.random() * 100000) + 50000
    };
    updated.push(newCandle);
    
    // Keep only last 200 candles
    return updated.slice(-200);
  } else {
    // Update current candle
    lastCandle.close = newPrice;
    lastCandle.high = Math.max(lastCandle.high, newPrice);
    lastCandle.low = Math.min(lastCandle.low, newPrice);
    if (volume) lastCandle.volume += volume;
    
    updated[updated.length - 1] = lastCandle;
    return updated;
  }
};

