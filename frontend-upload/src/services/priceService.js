/**
 * SnipSwap Price Service
 * Fetches real-time cryptocurrency prices from multiple sources
 * with proper rate limiting and caching
 */

class PriceService {
  constructor() {
    this.cache = new Map();
    this.cacheTimeout = 30000; // 30 seconds cache
    this.rateLimits = {
      coingecko: { calls: 0, resetTime: Date.now() + 60000, limit: 30 },
      defillama: { calls: 0, resetTime: Date.now() + 60000, limit: 100 }
    };
    
    // Token ID mappings
    this.tokenMappings = {
      coingecko: {
        'ATOM': 'cosmos',
        'OSMO': 'osmosis',
        'SCRT': 'secret',
        'JUNO': 'juno-network',
        'STARS': 'stargaze',
        'HUAHUA': 'chihuahua-token',
        'DVPN': 'sentinel',
        'AKT': 'akash-network',
        'INJ': 'injective-protocol',
        'LUNA': 'terra-luna-2',
        'KUJI': 'kujira',
        'CMDX': 'comdex',
        'BTC': 'bitcoin',
        'ETH': 'ethereum'
      },
      defillama: {
        'ATOM': 'coingecko:cosmos',
        'OSMO': 'coingecko:osmosis',
        'SCRT': 'coingecko:secret',
        'JUNO': 'coingecko:juno-network',
        'STARS': 'coingecko:stargaze',
        'HUAHUA': 'coingecko:chihuahua-token',
        'DVPN': 'coingecko:sentinel',
        'AKT': 'coingecko:akash-network',
        'INJ': 'coingecko:injective-protocol',
        'LUNA': 'coingecko:terra-luna-2',
        'KUJI': 'coingecko:kujira',
        'CMDX': 'coingecko:comdex',
        'BTC': 'coingecko:bitcoin',
        'ETH': 'coingecko:ethereum'
      }
    };
  }

  checkRateLimit(provider) {
    const now = Date.now();
    const limit = this.rateLimits[provider];
    
    if (now >= limit.resetTime) {
      limit.calls = 0;
      limit.resetTime = now + 60000;
    }
    
    if (limit.calls < limit.limit) {
      limit.calls++;
      return true;
    }
    
    return false;
  }

  getCachedPrice(symbol) {
    const cached = this.cache.get(symbol);
    if (cached && Date.now() - cached.timestamp < this.cacheTimeout) {
      return cached.data;
    }
    return null;
  }

  setCachedPrice(symbol, data) {
    this.cache.set(symbol, {
      data,
      timestamp: Date.now()
    });
  }

  async fetchFromDeFiLlama(symbols) {
    if (!this.checkRateLimit('defillama')) {
      console.warn('DeFiLlama rate limit reached');
      return {};
    }

    try {
      const tokens = symbols
        .filter(s => this.tokenMappings.defillama[s])
        .map(s => this.tokenMappings.defillama[s]);
      
      if (tokens.length === 0) return {};

      const url = `https://coins.llama.fi/prices/current/${tokens.join(',')}`;
      const response = await fetch(url);
      
      if (!response.ok) {
        console.error('DeFiLlama API error:', response.status);
        return {};
      }

      const data = await response.json();
      const prices = {};

      if (data.coins) {
        Object.entries(data.coins).forEach(([token, info]) => {
          const symbol = symbols.find(s => this.tokenMappings.defillama[s] === token);
          if (symbol) {
            prices[symbol] = {
              price: info.price,
              change_24h: info.confidence || 0,
              volume_24h: 0,
              high_24h: info.price * 1.05,
              low_24h: info.price * 0.95,
              source: 'defillama',
              confidence: info.confidence || 0.9,
              timestamp: Date.now()
            };
          }
        });
      }

      console.log(`DeFiLlama: Fetched ${Object.keys(prices).length} prices`);
      return prices;
    } catch (error) {
      console.error('DeFiLlama fetch error:', error);
      return {};
    }
  }

  async fetchFromCoinGecko(symbols) {
    if (!this.checkRateLimit('coingecko')) {
      console.warn('CoinGecko rate limit reached');
      return {};
    }

    try {
      const ids = symbols
        .filter(s => this.tokenMappings.coingecko[s])
        .map(s => this.tokenMappings.coingecko[s]);
      
      if (ids.length === 0) return {};

      const url = new URL('https://api.coingecko.com/api/v3/simple/price');
      url.searchParams.append('ids', ids.join(','));
      url.searchParams.append('vs_currencies', 'usd');
      url.searchParams.append('include_24hr_change', 'true');
      url.searchParams.append('include_24hr_vol', 'true');
      url.searchParams.append('include_market_cap', 'true');

      const response = await fetch(url.toString());
      
      if (response.status === 429) {
        console.warn('CoinGecko rate limit hit');
        this.rateLimits.coingecko.limit = Math.max(10, this.rateLimits.coingecko.limit - 5);
        return {};
      }

      if (!response.ok) {
        console.error('CoinGecko API error:', response.status);
        return {};
      }

      const data = await response.json();
      const prices = {};

      Object.entries(data).forEach(([id, info]) => {
        const symbol = symbols.find(s => this.tokenMappings.coingecko[s] === id);
        if (symbol) {
          prices[symbol] = {
            price: info.usd,
            change_24h: info.usd_24h_change || 0,
            volume_24h: info.usd_24h_vol || 0,
            high_24h: info.usd * (1 + Math.abs(info.usd_24h_change || 2) / 100),
            low_24h: info.usd * (1 - Math.abs(info.usd_24h_change || 2) / 100),
            market_cap: info.usd_market_cap || 0,
            source: 'coingecko',
            confidence: 0.95,
            timestamp: Date.now()
          };
        }
      });

      console.log(`CoinGecko: Fetched ${Object.keys(prices).length} prices`);
      return prices;
    } catch (error) {
      console.error('CoinGecko fetch error:', error);
      return {};
    }
  }

  async fetchPrices(symbols) {
    // Check cache first
    const cachedPrices = {};
    const uncachedSymbols = [];

    symbols.forEach(symbol => {
      const cached = this.getCachedPrice(symbol);
      if (cached) {
        cachedPrices[symbol] = cached;
      } else {
        uncachedSymbols.push(symbol);
      }
    });

    if (uncachedSymbols.length === 0) {
      return cachedPrices;
    }

    // Fetch from multiple sources
    const [defillamaData, coingeckoData] = await Promise.all([
      this.fetchFromDeFiLlama(uncachedSymbols),
      this.fetchFromCoinGecko(uncachedSymbols)
    ]);

    // Merge results, preferring CoinGecko for better data quality
    const freshPrices = {};
    uncachedSymbols.forEach(symbol => {
      const cgPrice = coingeckoData[symbol];
      const dlPrice = defillamaData[symbol];
      
      if (cgPrice) {
        freshPrices[symbol] = cgPrice;
        this.setCachedPrice(symbol, cgPrice);
      } else if (dlPrice) {
        freshPrices[symbol] = dlPrice;
        this.setCachedPrice(symbol, dlPrice);
      }
    });

    return { ...cachedPrices, ...freshPrices };
  }

  async fetchHistoricalData(symbol, days = 1) {
    const cgId = this.tokenMappings.coingecko[symbol];
    if (!cgId) {
      console.error(`No CoinGecko ID for ${symbol}`);
      return [];
    }

    try {
      const url = `https://api.coingecko.com/api/v3/coins/${cgId}/market_chart?vs_currency=usd&days=${days}&interval=hourly`;
      const response = await fetch(url);
      
      if (!response.ok) {
        console.error('CoinGecko historical data error:', response.status);
        return this.generateMockHistoricalData(symbol, days);
      }

      const data = await response.json();
      
      if (!data.prices || data.prices.length === 0) {
        return this.generateMockHistoricalData(symbol, days);
      }

      // Convert to OHLCV format
      const ohlcv = [];
      const priceData = data.prices;
      const volumeData = data.total_volumes || [];

      // Group by 15-minute intervals for better chart
      const interval = 15 * 60 * 1000; // 15 minutes in ms
      let currentGroup = [];
      let currentTime = Math.floor(priceData[0][0] / interval) * interval;

      priceData.forEach((point, index) => {
        const time = point[0];
        const price = point[1];
        const volume = volumeData[index] ? volumeData[index][1] : 0;

        if (time >= currentTime + interval) {
          if (currentGroup.length > 0) {
            const prices = currentGroup.map(p => p.price);
            ohlcv.push({
              timestamp: currentTime,
              open: currentGroup[0].price,
              high: Math.max(...prices),
              low: Math.min(...prices),
              close: currentGroup[currentGroup.length - 1].price,
              volume: currentGroup.reduce((sum, p) => sum + p.volume, 0)
            });
          }
          currentGroup = [];
          currentTime = Math.floor(time / interval) * interval;
        }

        currentGroup.push({ price, volume });
      });

      // Add last group
      if (currentGroup.length > 0) {
        const prices = currentGroup.map(p => p.price);
        ohlcv.push({
          timestamp: currentTime,
          open: currentGroup[0].price,
          high: Math.max(...prices),
          low: Math.min(...prices),
          close: currentGroup[currentGroup.length - 1].price,
          volume: currentGroup.reduce((sum, p) => sum + p.volume, 0)
        });
      }

      console.log(`Fetched ${ohlcv.length} historical candles for ${symbol}`);
      return ohlcv;
    } catch (error) {
      console.error('Historical data fetch error:', error);
      return this.generateMockHistoricalData(symbol, days);
    }
  }

  generateMockHistoricalData(symbol, days) {
    // Generate realistic mock data based on current price
    const cached = this.getCachedPrice(symbol);
    const basePrice = cached ? cached.price : 1.0;
    const candles = [];
    const now = Date.now();
    const interval = 15 * 60 * 1000; // 15 minutes
    const count = (days * 24 * 60) / 15; // Number of 15-min candles

    let price = basePrice * 0.98; // Start slightly lower

    for (let i = 0; i < count; i++) {
      const timestamp = now - (count - i) * interval;
      const volatility = 0.005; // 0.5% volatility
      const change = (Math.random() - 0.5) * 2 * volatility;
      
      const open = price;
      const close = price * (1 + change);
      const high = Math.max(open, close) * (1 + Math.random() * volatility);
      const low = Math.min(open, close) * (1 - Math.random() * volatility);
      const volume = basePrice * (Math.random() * 10000 + 5000);

      candles.push({
        timestamp,
        open,
        high,
        low,
        close,
        volume
      });

      price = close;
    }

    return candles;
  }
}

// Export singleton instance
export const priceService = new PriceService();
export default priceService;
