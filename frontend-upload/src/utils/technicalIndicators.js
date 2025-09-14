// Technical Indicators Calculation Utilities

// Simple Moving Average
export const calculateSMA = (data, period) => {
  const result = [];
  for (let i = period - 1; i < data.length; i++) {
    const sum = data.slice(i - period + 1, i + 1).reduce((acc, val) => acc + val.close, 0);
    result.push({
      ...data[i],
      sma: sum / period
    });
  }
  return result;
};

// Exponential Moving Average
export const calculateEMA = (data, period) => {
  const result = [];
  const multiplier = 2 / (period + 1);
  
  // Start with SMA for first value
  let ema = data.slice(0, period).reduce((acc, val) => acc + val.close, 0) / period;
  result.push({ ...data[period - 1], ema });
  
  for (let i = period; i < data.length; i++) {
    ema = (data[i].close * multiplier) + (ema * (1 - multiplier));
    result.push({ ...data[i], ema });
  }
  
  return result;
};

// Relative Strength Index
export const calculateRSI = (data, period = 14) => {
  const result = [];
  const gains = [];
  const losses = [];
  
  // Calculate price changes
  for (let i = 1; i < data.length; i++) {
    const change = data[i].close - data[i - 1].close;
    gains.push(change > 0 ? change : 0);
    losses.push(change < 0 ? Math.abs(change) : 0);
  }
  
  // Calculate RSI
  for (let i = period - 1; i < gains.length; i++) {
    const avgGain = gains.slice(i - period + 1, i + 1).reduce((a, b) => a + b, 0) / period;
    const avgLoss = losses.slice(i - period + 1, i + 1).reduce((a, b) => a + b, 0) / period;
    
    const rs = avgGain / (avgLoss || 0.0001); // Avoid division by zero
    const rsi = 100 - (100 / (1 + rs));
    
    result.push({
      ...data[i + 1],
      rsi: rsi
    });
  }
  
  return result;
};

// MACD (Moving Average Convergence Divergence)
export const calculateMACD = (data, fastPeriod = 12, slowPeriod = 26, signalPeriod = 9) => {
  const fastEMA = calculateEMA(data, fastPeriod);
  const slowEMA = calculateEMA(data, slowPeriod);
  
  const macdLine = [];
  const minLength = Math.min(fastEMA.length, slowEMA.length);
  
  for (let i = 0; i < minLength; i++) {
    const macd = fastEMA[i].ema - slowEMA[i].ema;
    macdLine.push({
      ...data[i + slowPeriod - 1],
      macd: macd
    });
  }
  
  // Calculate signal line (EMA of MACD)
  const signalEMA = calculateEMA(macdLine.map(item => ({ close: item.macd })), signalPeriod);
  
  const result = [];
  for (let i = 0; i < signalEMA.length; i++) {
    const histogram = macdLine[i + signalPeriod - 1].macd - signalEMA[i].ema;
    result.push({
      ...macdLine[i + signalPeriod - 1],
      signal: signalEMA[i].ema,
      histogram: histogram
    });
  }
  
  return result;
};

// Bollinger Bands
export const calculateBollingerBands = (data, period = 20, stdDev = 2) => {
  const result = [];
  
  for (let i = period - 1; i < data.length; i++) {
    const slice = data.slice(i - period + 1, i + 1);
    const sma = slice.reduce((acc, val) => acc + val.close, 0) / period;
    
    // Calculate standard deviation
    const variance = slice.reduce((acc, val) => acc + Math.pow(val.close - sma, 2), 0) / period;
    const standardDeviation = Math.sqrt(variance);
    
    result.push({
      ...data[i],
      bb_middle: sma,
      bb_upper: sma + (standardDeviation * stdDev),
      bb_lower: sma - (standardDeviation * stdDev)
    });
  }
  
  return result;
};

// Stochastic Oscillator
export const calculateStochastic = (data, kPeriod = 14, dPeriod = 3) => {
  const result = [];
  
  for (let i = kPeriod - 1; i < data.length; i++) {
    const slice = data.slice(i - kPeriod + 1, i + 1);
    const highestHigh = Math.max(...slice.map(d => d.high));
    const lowestLow = Math.min(...slice.map(d => d.low));
    
    const k = ((data[i].close - lowestLow) / (highestHigh - lowestLow)) * 100;
    
    result.push({
      ...data[i],
      stoch_k: k
    });
  }
  
  // Calculate %D (SMA of %K)
  for (let i = dPeriod - 1; i < result.length; i++) {
    const dValue = result.slice(i - dPeriod + 1, i + 1)
      .reduce((acc, val) => acc + val.stoch_k, 0) / dPeriod;
    
    result[i].stoch_d = dValue;
  }
  
  return result;
};

// Volume Weighted Average Price (VWAP)
export const calculateVWAP = (data) => {
  let cumulativeVolume = 0;
  let cumulativeVolumePrice = 0;
  
  return data.map(candle => {
    const typicalPrice = (candle.high + candle.low + candle.close) / 3;
    const volumePrice = typicalPrice * candle.volume;
    
    cumulativeVolume += candle.volume;
    cumulativeVolumePrice += volumePrice;
    
    return {
      ...candle,
      vwap: cumulativeVolumePrice / cumulativeVolume
    };
  });
};

// Support and Resistance Levels
export const calculateSupportResistance = (data, lookback = 20) => {
  const levels = [];
  
  for (let i = lookback; i < data.length - lookback; i++) {
    const slice = data.slice(i - lookback, i + lookback + 1);
    const current = data[i];
    
    // Check if current high is a resistance level
    const isResistance = slice.every(candle => candle.high <= current.high);
    if (isResistance && current.high > current.open && current.high > current.close) {
      levels.push({
        price: current.high,
        type: 'resistance',
        time: current.time,
        strength: slice.filter(c => Math.abs(c.high - current.high) < current.high * 0.001).length
      });
    }
    
    // Check if current low is a support level
    const isSupport = slice.every(candle => candle.low >= current.low);
    if (isSupport && current.low < current.open && current.low < current.close) {
      levels.push({
        price: current.low,
        type: 'support',
        time: current.time,
        strength: slice.filter(c => Math.abs(c.low - current.low) < current.low * 0.001).length
      });
    }
  }
  
  return levels;
};

// Heikin Ashi Transformation
export const calculateHeikinAshi = (data) => {
  const result = [];
  
  for (let i = 0; i < data.length; i++) {
    const current = data[i];
    
    if (i === 0) {
      // First candle
      result.push({
        ...current,
        ha_open: (current.open + current.close) / 2,
        ha_close: (current.open + current.high + current.low + current.close) / 4,
        ha_high: current.high,
        ha_low: current.low
      });
    } else {
      const prev = result[i - 1];
      const ha_close = (current.open + current.high + current.low + current.close) / 4;
      const ha_open = (prev.ha_open + prev.ha_close) / 2;
      
      result.push({
        ...current,
        ha_open: ha_open,
        ha_close: ha_close,
        ha_high: Math.max(current.high, ha_open, ha_close),
        ha_low: Math.min(current.low, ha_open, ha_close)
      });
    }
  }
  
  return result;
};

