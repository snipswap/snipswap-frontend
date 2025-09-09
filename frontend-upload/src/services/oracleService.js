/**
 * SnipSwap Oracle Service
 * Real-time price data integration with multi-source aggregation
 */

class OracleService {
  constructor() {
    // Use the live oracle API we deployed
    this.oracleApiUrl = 'https://5000-ix339uctyx53xzl83bj4b-3b5a5a66.manusvm.computer';
    this.priceCache = new Map();
    this.subscriptions = new Map();
    this.updateInterval = 30000; // 30 seconds
    this.isConnected = false;
    this.healthStatus = null;
    
    // Start background updates
    this.startBackgroundUpdates();
    this.checkHealth();
  }

  /**
   * Get real-time price for a single symbol
   */
  async getPrice(symbol) {
    try {
      const response = await fetch(`${this.oracleApiUrl}/price/${symbol.toUpperCase()}`);
      
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
      
      const data = await response.json();
      
      // Cache the price data
      this.priceCache.set(symbol.toUpperCase(), {
        ...data,
        lastUpdated: Date.now()
      });
      
      // Notify subscribers
      this.notifySubscribers(symbol.toUpperCase(), data);
      
      return data;
    } catch (error) {
      console.error(`Failed to fetch price for ${symbol}:`, error);
      
      // Return cached data if available
      const cached = this.priceCache.get(symbol.toUpperCase());
      if (cached && Date.now() - cached.lastUpdated < 300000) { // 5 minutes
        return cached;
      }
      
      throw error;
    }
  }

  /**
   * Get real-time prices for multiple symbols
   */
  async getPrices(symbols = ['BTC', 'ETH', 'ATOM', 'OSMO', 'SCRT', 'USDC']) {
    try {
      const symbolsParam = symbols.join(',');
      const response = await fetch(`${this.oracleApiUrl}/prices?symbols=${symbolsParam}`);
      
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
      
      const data = await response.json();
      
      // Cache all prices
      Object.entries(data).forEach(([symbol, priceData]) => {
        this.priceCache.set(symbol, {
          ...priceData,
          lastUpdated: Date.now()
        });
        
        // Notify subscribers
        this.notifySubscribers(symbol, priceData);
      });
      
      return data;
    } catch (error) {
      console.error('Failed to fetch prices:', error);
      
      // Return cached data if available
      const cachedPrices = {};
      symbols.forEach(symbol => {
        const cached = this.priceCache.get(symbol.toUpperCase());
        if (cached && Date.now() - cached.lastUpdated < 300000) {
          cachedPrices[symbol.toUpperCase()] = cached;
        }
      });
      
      if (Object.keys(cachedPrices).length > 0) {
        return cachedPrices;
      }
      
      throw error;
    }
  }

  /**
   * Get TWAP (Time-Weighted Average Price) for a symbol
   */
  async getTWAP(symbol, hours = 1) {
    try {
      const response = await fetch(`${this.oracleApiUrl}/twap/${symbol.toUpperCase()}/${hours}`);
      
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error(`Failed to fetch TWAP for ${symbol}:`, error);
      throw error;
    }
  }

  /**
   * Check oracle health status
   */
  async checkHealth() {
    try {
      const response = await fetch(`${this.oracleApiUrl}/health`);
      
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
      
      this.healthStatus = await response.json();
      this.isConnected = true;
      
      return this.healthStatus;
    } catch (error) {
      console.error('Oracle health check failed:', error);
      this.isConnected = false;
      this.healthStatus = null;
      throw error;
    }
  }

  /**
   * Get supported symbols
   */
  async getSupportedSymbols() {
    try {
      const response = await fetch(`${this.oracleApiUrl}/supported-symbols`);
      
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('Failed to fetch supported symbols:', error);
      return { symbols: ['BTC', 'ETH', 'ATOM', 'OSMO', 'SCRT', 'USDC'] };
    }
  }

  /**
   * Subscribe to real-time price updates
   */
  subscribe(symbol, callback) {
    const upperSymbol = symbol.toUpperCase();
    
    if (!this.subscriptions.has(upperSymbol)) {
      this.subscriptions.set(upperSymbol, new Set());
    }
    
    this.subscriptions.get(upperSymbol).add(callback);
    
    // Return unsubscribe function
    return () => {
      const callbacks = this.subscriptions.get(upperSymbol);
      if (callbacks) {
        callbacks.delete(callback);
        if (callbacks.size === 0) {
          this.subscriptions.delete(upperSymbol);
        }
      }
    };
  }

  /**
   * Subscribe to multiple symbols
   */
  subscribeToMultiple(symbols, callback) {
    const unsubscribeFunctions = symbols.map(symbol => 
      this.subscribe(symbol, callback)
    );
    
    // Return function to unsubscribe from all
    return () => {
      unsubscribeFunctions.forEach(unsubscribe => unsubscribe());
    };
  }

  /**
   * Notify subscribers of price updates
   */
  notifySubscribers(symbol, data) {
    const callbacks = this.subscriptions.get(symbol);
    if (callbacks) {
      callbacks.forEach(callback => {
        try {
          callback(symbol, data);
        } catch (error) {
          console.error('Error in price update callback:', error);
        }
      });
    }
  }

  /**
   * Start background price updates
   */
  startBackgroundUpdates() {
    // Update prices every 30 seconds
    setInterval(async () => {
      try {
        if (this.subscriptions.size > 0) {
          const symbols = Array.from(this.subscriptions.keys());
          await this.getPrices(symbols);
        }
      } catch (error) {
        console.error('Background price update failed:', error);
      }
    }, this.updateInterval);

    // Health check every 60 seconds
    setInterval(async () => {
      try {
        await this.checkHealth();
      } catch (error) {
        console.error('Background health check failed:', error);
      }
    }, 60000);
  }

  /**
   * Get cached price data
   */
  getCachedPrice(symbol) {
    return this.priceCache.get(symbol.toUpperCase());
  }

  /**
   * Get connection status
   */
  getConnectionStatus() {
    return {
      isConnected: this.isConnected,
      healthStatus: this.healthStatus,
      lastUpdate: this.healthStatus?.timestamp || null,
      activeProviders: this.healthStatus?.providers?.filter(p => p.healthy).length || 0,
      totalProviders: this.healthStatus?.providers?.length || 0
    };
  }

  /**
   * Format price for display
   */
  formatPrice(price, decimals = 4) {
    if (typeof price !== 'number' || isNaN(price)) {
      return 'N/A';
    }
    
    if (price >= 1000) {
      return `$${price.toLocaleString(undefined, { 
        minimumFractionDigits: 2, 
        maximumFractionDigits: 2 
      })}`;
    }
    
    return `$${price.toFixed(decimals)}`;
  }

  /**
   * Format percentage change
   */
  formatChange(change) {
    if (typeof change !== 'number' || isNaN(change)) {
      return '0.00%';
    }
    
    const sign = change >= 0 ? '+' : '';
    return `${sign}${change.toFixed(2)}%`;
  }

  /**
   * Format volume for display
   */
  formatVolume(volume) {
    if (typeof volume !== 'number' || isNaN(volume)) {
      return 'N/A';
    }
    
    if (volume >= 1e9) return `$${(volume / 1e9).toFixed(2)}B`;
    if (volume >= 1e6) return `$${(volume / 1e6).toFixed(2)}M`;
    if (volume >= 1e3) return `$${(volume / 1e3).toFixed(2)}K`;
    return `$${volume.toFixed(2)}`;
  }

  /**
   * Calculate confidence level description
   */
  getConfidenceDescription(confidence) {
    if (confidence >= 0.9) return 'Very High';
    if (confidence >= 0.8) return 'High';
    if (confidence >= 0.7) return 'Good';
    if (confidence >= 0.6) return 'Fair';
    return 'Low';
  }
}

// Create singleton instance
const oracleService = new OracleService();

export default oracleService;

