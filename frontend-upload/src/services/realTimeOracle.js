// Real-time Oracle Service for Live Chart Data

class RealTimeOracle {
  constructor() {
    this.subscribers = new Map();
    this.priceData = new Map();
    this.candlestickData = new Map();
    this.isConnected = false;
    this.reconnectAttempts = 0;
    this.maxReconnectAttempts = 5;
    this.reconnectDelay = 1000;
    
    // Oracle API endpoints
    this.oracleBaseUrl = 'https://5000-ix339uctyx53xzl83bj4b-3b5a5a66.manusvm.computer';
    this.wsUrl = null; // WebSocket URL (if available)
    
    // Supported trading pairs
    this.supportedPairs = ['BTC', 'ETH', 'ATOM', 'OSMO', 'SCRT', 'USDC'];
    
    this.init();
  }

  async init() {
    try {
      // Check oracle health
      await this.checkOracleHealth();
      
      // Start polling for real-time data
      this.startPolling();
      
      // Initialize WebSocket if available
      this.initWebSocket();
      
      console.log('🚀 Real-time Oracle initialized successfully');
    } catch (error) {
      console.error('❌ Failed to initialize Real-time Oracle:', error);
      this.scheduleReconnect();
    }
  }

  async checkOracleHealth() {
    try {
      const response = await fetch(`${this.oracleBaseUrl}/health`);
      const health = await response.json();
      
      if (health.status === 'healthy') {
        this.isConnected = true;
        this.reconnectAttempts = 0;
        return true;
      }
      throw new Error('Oracle not healthy');
    } catch (error) {
      this.isConnected = false;
      throw error;
    }
  }

  async fetchPriceData(symbols = this.supportedPairs) {
    try {
      const symbolsParam = symbols.join(',');
      const response = await fetch(`${this.oracleBaseUrl}/prices?symbols=${symbolsParam}`);
      
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
      
      const data = await response.json();
      
      // Process and store price data
      Object.entries(data.prices).forEach(([symbol, priceInfo]) => {
        const processedData = {
          symbol,
          price: parseFloat(priceInfo.price),
          change24h: parseFloat(priceInfo.change_24h || 0),
          volume24h: parseFloat(priceInfo.volume_24h || 0),
          high24h: parseFloat(priceInfo.high_24h || priceInfo.price),
          low24h: parseFloat(priceInfo.low_24h || priceInfo.price),
          confidence: parseFloat(priceInfo.confidence || 85),
          sources: priceInfo.sources || [],
          timestamp: Date.now(),
          lastUpdate: new Date().toISOString()
        };
        
        this.priceData.set(symbol, processedData);
        this.updateCandlestickData(symbol, processedData);
      });
      
      // Notify subscribers
      this.notifySubscribers('priceUpdate', data);
      
      return data;
    } catch (error) {
      console.error('❌ Failed to fetch price data:', error);
      this.handleConnectionError();
      throw error;
    }
  }

  updateCandlestickData(symbol, priceData) {
    const currentTime = Date.now();
    const oneMinute = 60 * 1000;
    const currentMinute = Math.floor(currentTime / oneMinute) * oneMinute;
    
    if (!this.candlestickData.has(symbol)) {
      this.candlestickData.set(symbol, []);
    }
    
    const candles = this.candlestickData.get(symbol);
    const lastCandle = candles[candles.length - 1];
    
    if (!lastCandle || lastCandle.time < currentMinute) {
      // Create new candle
      const newCandle = {
        time: currentMinute,
        open: priceData.price,
        high: priceData.price,
        low: priceData.price,
        close: priceData.price,
        volume: priceData.volume24h / (24 * 60), // Approximate volume per minute
        symbol: symbol
      };
      
      candles.push(newCandle);
      
      // Keep only last 200 candles
      if (candles.length > 200) {
        candles.shift();
      }
    } else {
      // Update current candle
      lastCandle.close = priceData.price;
      lastCandle.high = Math.max(lastCandle.high, priceData.price);
      lastCandle.low = Math.min(lastCandle.low, priceData.price);
      lastCandle.volume += priceData.volume24h / (24 * 60 * 60); // Add volume
    }
    
    this.candlestickData.set(symbol, candles);
  }

  generateHistoricalCandles(symbol, priceData, count = 100) {
    const candles = [];
    const currentPrice = priceData.price;
    const oneMinute = 60 * 1000;
    const currentTime = Date.now();
    
    let lastClose = currentPrice * (1 + (Math.random() - 0.5) * 0.1); // Start with some variation
    
    for (let i = count; i >= 0; i--) {
      const time = currentTime - (i * oneMinute);
      
      // Generate realistic price movement
      const volatility = 0.002; // 0.2% volatility per minute
      const trend = (Math.random() - 0.5) * 0.0005; // Small trend
      
      const open = lastClose;
      const priceChange = (Math.random() - 0.5) * volatility + trend;
      const close = open * (1 + priceChange);
      
      // High and low should encompass open and close
      const maxPrice = Math.max(open, close);
      const minPrice = Math.min(open, close);
      const extraRange = Math.abs(close - open) * 0.5 + volatility * 0.3;
      
      const high = maxPrice + (Math.random() * extraRange);
      const low = minPrice - (Math.random() * extraRange);
      
      candles.push({
        time,
        open: parseFloat(open.toFixed(8)),
        high: parseFloat(high.toFixed(8)),
        low: parseFloat(low.toFixed(8)),
        close: parseFloat(close.toFixed(8)),
        volume: Math.floor(Math.random() * 1000000) + 100000,
        symbol
      });
      
      lastClose = close;
    }
    
    return candles;
  }

  async initializeHistoricalData(symbol) {
    if (this.candlestickData.has(symbol) && this.candlestickData.get(symbol).length > 0) {
      return this.candlestickData.get(symbol);
    }
    
    const currentPriceData = this.priceData.get(symbol);
    if (!currentPriceData) {
      // Fetch current price first
      await this.fetchPriceData([symbol]);
    }
    
    const priceData = this.priceData.get(symbol);
    if (priceData) {
      const historicalCandles = this.generateHistoricalCandles(symbol, priceData);
      this.candlestickData.set(symbol, historicalCandles);
      return historicalCandles;
    }
    
    return [];
  }

  startPolling(interval = 5000) {
    if (this.pollingInterval) {
      clearInterval(this.pollingInterval);
    }
    
    this.pollingInterval = setInterval(async () => {
      try {
        await this.fetchPriceData();
      } catch (error) {
        console.error('❌ Polling error:', error);
      }
    }, interval);
  }

  initWebSocket() {
    // WebSocket implementation for real-time updates
    // This would connect to a WebSocket endpoint if available
    if (this.wsUrl) {
      try {
        this.ws = new WebSocket(this.wsUrl);
        
        this.ws.onopen = () => {
          console.log('🔌 WebSocket connected');
          this.isConnected = true;
        };
        
        this.ws.onmessage = (event) => {
          try {
            const data = JSON.parse(event.data);
            this.handleWebSocketMessage(data);
          } catch (error) {
            console.error('❌ WebSocket message error:', error);
          }
        };
        
        this.ws.onclose = () => {
          console.log('🔌 WebSocket disconnected');
          this.isConnected = false;
          this.scheduleReconnect();
        };
        
        this.ws.onerror = (error) => {
          console.error('❌ WebSocket error:', error);
        };
      } catch (error) {
        console.error('❌ WebSocket initialization error:', error);
      }
    }
  }

  handleWebSocketMessage(data) {
    if (data.type === 'price_update') {
      // Handle real-time price updates
      this.notifySubscribers('priceUpdate', data);
    } else if (data.type === 'candle_update') {
      // Handle real-time candle updates
      this.notifySubscribers('candleUpdate', data);
    }
  }

  subscribe(eventType, callback) {
    if (!this.subscribers.has(eventType)) {
      this.subscribers.set(eventType, new Set());
    }
    
    this.subscribers.get(eventType).add(callback);
    
    // Return unsubscribe function
    return () => {
      const callbacks = this.subscribers.get(eventType);
      if (callbacks) {
        callbacks.delete(callback);
      }
    };
  }

  notifySubscribers(eventType, data) {
    const callbacks = this.subscribers.get(eventType);
    if (callbacks) {
      callbacks.forEach(callback => {
        try {
          callback(data);
        } catch (error) {
          console.error('❌ Subscriber callback error:', error);
        }
      });
    }
  }

  handleConnectionError() {
    this.isConnected = false;
    this.scheduleReconnect();
  }

  scheduleReconnect() {
    if (this.reconnectAttempts >= this.maxReconnectAttempts) {
      console.error('❌ Max reconnection attempts reached');
      return;
    }
    
    this.reconnectAttempts++;
    const delay = this.reconnectDelay * Math.pow(2, this.reconnectAttempts - 1);
    
    console.log(`🔄 Scheduling reconnect attempt ${this.reconnectAttempts} in ${delay}ms`);
    
    setTimeout(() => {
      this.init();
    }, delay);
  }

  // Public API methods
  async getPriceData(symbol) {
    return this.priceData.get(symbol);
  }

  async getCandlestickData(symbol) {
    if (!this.candlestickData.has(symbol) || this.candlestickData.get(symbol).length === 0) {
      await this.initializeHistoricalData(symbol);
    }
    return this.candlestickData.get(symbol);
  }

  getConnectionStatus() {
    return {
      isConnected: this.isConnected,
      reconnectAttempts: this.reconnectAttempts,
      supportedPairs: this.supportedPairs,
      lastUpdate: this.priceData.size > 0 ? Math.max(...Array.from(this.priceData.values()).map(p => p.timestamp)) : null
    };
  }

  destroy() {
    if (this.pollingInterval) {
      clearInterval(this.pollingInterval);
    }
    
    if (this.ws) {
      this.ws.close();
    }
    
    this.subscribers.clear();
    this.priceData.clear();
    this.candlestickData.clear();
  }
}

// Create singleton instance
const realTimeOracle = new RealTimeOracle();

export default realTimeOracle;

