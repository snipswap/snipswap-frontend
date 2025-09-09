// CoinGecko API service for real-time cryptocurrency data
const COINGECKO_BASE_URL = 'https://api.coingecko.com/api/v3';

// Rate limiting helper
class RateLimiter {
  constructor(maxRequests = 10, windowMs = 60000) {
    this.maxRequests = maxRequests;
    this.windowMs = windowMs;
    this.requests = [];
  }

  canMakeRequest() {
    const now = Date.now();
    this.requests = this.requests.filter(time => now - time < this.windowMs);
    return this.requests.length < this.maxRequests;
  }

  recordRequest() {
    this.requests.push(Date.now());
  }
}

const rateLimiter = new RateLimiter(10, 60000); // 10 requests per minute

// API service class
export class CryptoApiService {
  constructor() {
    this.cache = new Map();
    this.cacheTimeout = 30000; // 30 seconds cache
  }

  // Get cached data or fetch new data
  async getCachedData(key, fetchFunction) {
    const cached = this.cache.get(key);
    if (cached && Date.now() - cached.timestamp < this.cacheTimeout) {
      return cached.data;
    }

    if (!rateLimiter.canMakeRequest()) {
      console.warn('Rate limit reached, using cached data or mock data');
      return cached ? cached.data : this.getMockData(key);
    }

    try {
      rateLimiter.recordRequest();
      const data = await fetchFunction();
      this.cache.set(key, { data, timestamp: Date.now() });
      return data;
    } catch (error) {
      console.error('API request failed:', error);
      return cached ? cached.data : this.getMockData(key);
    }
  }

  // Get current price for a specific coin
  async getCurrentPrice(coinId = 'bitcoin') {
    return this.getCachedData(`price_${coinId}`, async () => {
      const response = await fetch(
        `${COINGECKO_BASE_URL}/simple/price?ids=${coinId}&vs_currencies=usd&include_24hr_change=true&include_24hr_vol=true`
      );
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      return data[coinId];
    });
  }

  // Get market data for multiple coins
  async getMarketData(coinIds = ['bitcoin', 'ethereum', 'cardano'], limit = 10) {
    return this.getCachedData('market_data', async () => {
      const response = await fetch(
        `${COINGECKO_BASE_URL}/coins/markets?vs_currency=usd&ids=${coinIds.join(',')}&order=market_cap_desc&per_page=${limit}&page=1&sparkline=true&price_change_percentage=24h`
      );
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    });
  }

  // Get historical price data for charts
  async getHistoricalData(coinId = 'bitcoin', days = 1) {
    return this.getCachedData(`historical_${coinId}_${days}`, async () => {
      const response = await fetch(
        `${COINGECKO_BASE_URL}/coins/${coinId}/market_chart?vs_currency=usd&days=${days}&interval=${days <= 1 ? 'hourly' : 'daily'}`
      );
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      
      // Transform data for chart
      return data.prices.map(([timestamp, price], index) => ({
        time: new Date(timestamp).toLocaleTimeString(),
        price: price.toFixed(2),
        volume: data.total_volumes[index] ? data.total_volumes[index][1] : 0
      }));
    });
  }

  // Get trending coins
  async getTrendingCoins() {
    return this.getCachedData('trending', async () => {
      const response = await fetch(`${COINGECKO_BASE_URL}/search/trending`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      return data.coins.map(coin => ({
        id: coin.item.id,
        name: coin.item.name,
        symbol: coin.item.symbol,
        thumb: coin.item.thumb,
        market_cap_rank: coin.item.market_cap_rank
      }));
    });
  }

  // Mock data fallback
  getMockData(key) {
    const mockData = {
      price_bitcoin: {
        usd: 43250.67 + (Math.random() - 0.5) * 1000,
        usd_24h_change: (Math.random() - 0.5) * 10,
        usd_24h_vol: 28000000000 + Math.random() * 5000000000
      },
      market_data: [
        {
          id: 'bitcoin',
          symbol: 'btc',
          name: 'Bitcoin',
          current_price: 43250.67,
          price_change_percentage_24h: 2.34,
          market_cap: 850000000000,
          total_volume: 28000000000,
          sparkline_in_7d: { price: Array.from({length: 168}, () => 43000 + Math.random() * 1000) }
        },
        {
          id: 'ethereum',
          symbol: 'eth',
          name: 'Ethereum',
          current_price: 2485.67,
          price_change_percentage_24h: 1.87,
          market_cap: 300000000000,
          total_volume: 15000000000,
          sparkline_in_7d: { price: Array.from({length: 168}, () => 2400 + Math.random() * 200) }
        }
      ],
      trending: [
        { id: 'bitcoin', name: 'Bitcoin', symbol: 'BTC', market_cap_rank: 1 },
        { id: 'ethereum', name: 'Ethereum', symbol: 'ETH', market_cap_rank: 2 }
      ]
    };

    return mockData[key] || mockData.price_bitcoin;
  }

  // WebSocket-like price updates (simulated)
  subscribeToPrice(coinId, callback) {
    const updatePrice = async () => {
      try {
        const priceData = await this.getCurrentPrice(coinId);
        callback({
          coinId,
          price: priceData.usd,
          change24h: priceData.usd_24h_change,
          volume24h: priceData.usd_24h_vol,
          timestamp: Date.now()
        });
      } catch (error) {
        console.error('Price update failed:', error);
        // Fallback to mock data
        callback({
          coinId,
          price: 43250.67 + (Math.random() - 0.5) * 100,
          change24h: (Math.random() - 0.5) * 5,
          volume24h: 28000000000,
          timestamp: Date.now()
        });
      }
    };

    // Initial update
    updatePrice();

    // Set up periodic updates (every 30 seconds to respect rate limits)
    const interval = setInterval(updatePrice, 30000);

    // Return cleanup function
    return () => clearInterval(interval);
  }

  // Get order book data (simulated since CoinGecko doesn't provide this)
  generateOrderBook(basePrice = 43250) {
    const orderBook = {
      bids: [],
      asks: []
    };

    // Generate realistic bid/ask data
    for (let i = 0; i < 15; i++) {
      const bidPrice = basePrice - (i + 1) * (Math.random() * 10 + 5);
      const askPrice = basePrice + (i + 1) * (Math.random() * 10 + 5);
      const bidSize = Math.random() * 2 + 0.1;
      const askSize = Math.random() * 2 + 0.1;

      orderBook.bids.push({
        price: bidPrice.toFixed(2),
        size: bidSize.toFixed(4),
        total: (bidPrice * bidSize).toFixed(2)
      });

      orderBook.asks.push({
        price: askPrice.toFixed(2),
        size: askSize.toFixed(4),
        total: (askPrice * askSize).toFixed(2)
      });
    }

    return orderBook;
  }

  // Get recent trades (simulated)
  generateRecentTrades(basePrice = 43250) {
    const trades = [];
    const now = Date.now();

    for (let i = 0; i < 20; i++) {
      const price = basePrice + (Math.random() - 0.5) * 100;
      const size = Math.random() * 1 + 0.01;
      const side = Math.random() > 0.5 ? 'buy' : 'sell';
      const timestamp = now - (i * 60000); // 1 minute intervals

      trades.push({
        price: price.toFixed(2),
        size: size.toFixed(4),
        side,
        timestamp: new Date(timestamp).toLocaleTimeString(),
        total: (price * size).toFixed(2)
      });
    }

    return trades;
  }
}

// Export singleton instance
export const cryptoApi = new CryptoApiService();

// Export utility functions
export const formatPrice = (price) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(price);
};

export const formatVolume = (volume) => {
  if (volume >= 1e9) {
    return `$${(volume / 1e9).toFixed(2)}B`;
  } else if (volume >= 1e6) {
    return `$${(volume / 1e6).toFixed(2)}M`;
  } else if (volume >= 1e3) {
    return `$${(volume / 1e3).toFixed(2)}K`;
  }
  return `$${volume.toFixed(2)}`;
};

export const formatPercentage = (percentage) => {
  const sign = percentage >= 0 ? '+' : '';
  return `${sign}${percentage.toFixed(2)}%`;
};

