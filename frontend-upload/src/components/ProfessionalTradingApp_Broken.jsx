import React, { useState, useEffect, useRef } from 'react';
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, AreaChart, Area } from 'recharts';
import AdvancedTradingChart from './AdvancedTradingChart';
import PrivacyEnhancedTradingForm from './PrivacyEnhancedTradingForm';
import BrandedHeader from './BrandedHeader';
import LoadingScreen from './LoadingScreen';
import NotificationSystem, { notifications } from './NotificationSystem';
import RealTimeOracle from '../services/realTimeOracle';
import '../styles/ProfessionalTrading.css';

const ProfessionalTradingApp = () => {
  const [selectedPair, setSelectedPair] = useState('ATOM/USDC');
  const [orderType, setOrderType] = useState('limit');
  const [privacyMode, setPrivacyMode] = useState('private');
  const [chartType, setChartType] = useState('line');
  const [priceData, setPriceData] = useState({});
  const [orderBook, setOrderBook] = useState({ bids: [], asks: [] });
  const [recentTrades, setRecentTrades] = useState([]);
  const [chartData, setChartData] = useState([]);
  const [candlestickData, setCandlestickData] = useState([]);
  const [isConnected, setIsConnected] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [walletConnected, setWalletConnected] = useState(false);
  const [oracleStatus, setOracleStatus] = useState({ isConnected: false, lastUpdate: null });
  const [realTimePrices, setRealTimePrices] = useState({});
  const wsRef = useRef(null);

  // Trading pairs focused on Cosmos ecosystem
  const tradingPairs = [
    { symbol: 'ATOM/USDC', name: 'Cosmos', icon: '⚛️', price: 4.5989, change: 1.34 },
    { symbol: 'SCRT/USDC', name: 'Secret Network', icon: '🔐', price: 0.1945, change: -0.25 },
    { symbol: 'OSMO/USDC', name: 'Osmosis', icon: '🌊', price: 0.1689, change: 2.04 },
    { symbol: 'BTC/USDC', name: 'Bitcoin', icon: '₿', price: 111422.00, change: -0.71 },
    { symbol: 'ETH/USDC', name: 'Ethereum', icon: 'Ξ', price: 4307.57, change: -0.15 }
  ];

  // Privacy modes
  const privacyModes = [
    { id: 'public', name: 'Public', desc: 'Visible on-chain', icon: '👁️' },
    { id: 'private', name: 'Private', desc: 'Secret Network', icon: '🔒' },
    { id: 'stealth', name: 'Stealth', desc: 'Maximum privacy', icon: '👤' }
  ];

  // WebSocket connection for real-time data
  useEffect(() => {
    // Initialize real-time oracle connection
    const initializeOracle = async () => {
      try {
        console.log('🚀 Initializing real-time oracle connection...');
        
        // Subscribe to price updates
        const unsubscribePrices = realTimeOracle.subscribe('priceUpdate', (data) => {
          console.log('📊 Received price update:', data);
          setRealTimePrices(data.prices || {});
          updatePricesFromOracle(data.prices || {});
          setIsConnected(true);
        });
        
        // Subscribe to candle updates
        const unsubscribeCandles = realTimeOracle.subscribe('candleUpdate', (data) => {
          console.log('🕯️ Received candle update:', data);
          updateCandlesFromOracle(data);
        });
        
        // Get initial data
        await loadInitialData();
        
        // Update oracle status
        const status = realTimeOracle.getConnectionStatus();
        setOracleStatus(status);
        setIsConnected(status.isConnected);
        
        // Cleanup function
        return () => {
          unsubscribePrices();
          unsubscribeCandles();
        };
      } catch (error) {
        console.error('❌ Failed to initialize oracle:', error);
        setIsConnected(false);
      }
    };

    initializeOracle();
  }, []);

  // Load initial data from oracle
  const loadInitialData = async () => {
    try {
      const selectedSymbol = selectedPair.split('/')[0]; // Get base symbol (e.g., 'ATOM' from 'ATOM/USDC')
      
      // Load candlestick data
      const candles = await realTimeOracle.getCandlestickData(selectedSymbol);
      if (candles && candles.length > 0) {
        setCandlestickData(candles);
        
        // Convert to line chart data
        const lineData = candles.map(candle => ({
          time: candle.time,
          price: candle.close,
          volume: candle.volume
        }));
        setChartData(lineData);
      }
      
      // Load current price data
      const priceInfo = await realTimeOracle.getPriceData(selectedSymbol);
      if (priceInfo) {
        updatePricesFromOracle({ [selectedSymbol]: priceInfo });
      }
      
    } catch (error) {
      console.error('❌ Failed to load initial data:', error);
    }
  };

  // Update prices from oracle data
  const updatePricesFromOracle = (oraclePrices) => {
    const newPrices = {};
    
    Object.entries(oraclePrices).forEach(([symbol, priceInfo]) => {
      // Map oracle data to our price format
      newPrices[`${symbol}/USDC`] = {
        price: priceInfo.price || priceInfo,
        change: priceInfo.change24h || 0,
        volume: priceInfo.volume24h || 0,
        high: priceInfo.high24h || priceInfo.price || priceInfo,
        low: priceInfo.low24h || priceInfo.price || priceInfo,
        confidence: priceInfo.confidence || 85,
        sources: priceInfo.sources || [],
        lastUpdate: priceInfo.lastUpdate || new Date().toISOString()
      };
    });
    
    setPriceData(prev => ({ ...prev, ...newPrices }));
    
    // Update order book with real prices
    updateOrderBookFromPrices(newPrices);
    
    // Update recent trades
    updateRecentTradesFromPrices(newPrices);
  };

  // Update candles from oracle data
  const updateCandlesFromOracle = (candleData) => {
    if (candleData && candleData.symbol) {
      const symbol = `${candleData.symbol}/USDC`;
      if (symbol === selectedPair) {
        setCandlestickData(prev => {
          const updated = [...prev];
          const lastCandle = updated[updated.length - 1];
          
          if (lastCandle && lastCandle.time === candleData.time) {
            // Update existing candle
            updated[updated.length - 1] = candleData;
          } else {
            // Add new candle
            updated.push(candleData);
            // Keep only last 200 candles
            return updated.slice(-200);
          }
          
          return updated;
        });
      }
    }
  };

  // Update order book based on real prices
  const updateOrderBookFromPrices = (prices) => {
    const currentPriceData = prices[selectedPair];
    if (!currentPriceData) return;
    
    const currentPrice = currentPriceData.price;
    const spread = currentPrice * 0.001; // 0.1% spread
    
    const bids = Array.from({ length: 15 }, (_, i) => ({
      price: currentPrice - (spread * (i + 1)),
      amount: Math.random() * 1000 + 100,
      total: 0
    }));

    const asks = Array.from({ length: 15 }, (_, i) => ({
      price: currentPrice + (spread * (i + 1)),
      amount: Math.random() * 1000 + 100,
      total: 0
    }));

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

    setOrderBook({ bids, asks });
  };

  // Update recent trades from real prices
  const updateRecentTradesFromPrices = (prices) => {
    const currentPriceData = prices[selectedPair];
    if (!currentPriceData) return;
    
    // Simulate realistic trades based on real price
    if (Math.random() < 0.3) { // 30% chance to add a new trade
      const newTrade = {
        id: Date.now(),
        price: currentPriceData.price * (1 + (Math.random() - 0.5) * 0.002),
        amount: Math.random() * 100 + 10,
        time: new Date().toLocaleTimeString(),
        side: Math.random() > 0.5 ? 'buy' : 'sell'
      };

      setRecentTrades(prev => [newTrade, ...prev.slice(0, 19)]);
    }
  };

  // Handle pair selection change
  const handlePairChange = async (newPair) => {
    setSelectedPair(newPair);
    
    // Load data for new pair
    const symbol = newPair.split('/')[0];
    try {
      const candles = await realTimeOracle.getCandlestickData(symbol);
      if (candles && candles.length > 0) {
        setCandlestickData(candles);
        
        const lineData = candles.map(candle => ({
          time: candle.time,
          price: candle.close,
          volume: candle.volume
        }));
        setChartData(lineData);
      }
    } catch (error) {
      console.error('❌ Failed to load data for new pair:', error);
    }
  };

  // Handle trade submission from privacy-enhanced form
  const handleTrade = (tradeData) => {
    console.log('🚀 Executing privacy-enhanced trade:', tradeData);
    
    // Add trade to recent trades
    const newTrade = {
      id: Date.now(),
      price: tradeData.price,
      amount: tradeData.amount,
      time: new Date().toLocaleTimeString(),
      side: tradeData.side,
      privacyMode: tradeData.privacyMode,
      fees: tradeData.fees,
      mevProtected: tradeData.mevProtectionEnabled
    };

    setRecentTrades(prev => [newTrade, ...prev.slice(0, 19)]);
    
    // Update privacy streak if using private/stealth mode
    if (tradeData.privacyMode !== 'public') {
      const currentStreak = parseInt(localStorage.getItem('privacyStreak') || '0');
      localStorage.setItem('privacyStreak', (currentStreak + 1).toString());
    }
    
    // Show success notification
    notifications.tradeSuccess(
      tradeData.pair, 
      tradeData.amount, 
      tradeData.side, 
      tradeData.privacyMode
    );
    console.log('✅ Trade executed successfully with privacy mode:', tradeData.privacyMode);
  };

  // Handle wallet connection
  const handleWalletConnect = async () => {
    try {
      setIsLoading(true);
      
      // Simulate wallet connection process
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setWalletConnected(true);
      notifications.walletConnected('secret1abc...def123');
      
    } catch (error) {
      notifications.tradeError('Failed to connect wallet');
    } finally {
      setIsLoading(false);
    }
  };

  // Initialize app loading
  useEffect(() => {
    const initializeApp = async () => {
      try {
        // Simulate app initialization
        await new Promise(resolve => setTimeout(resolve, 3000));
        
        // Initialize oracle connection
        notifications.oracleConnected(3);
        
        setIsLoading(false);
      } catch (error) {
        console.error('Failed to initialize app:', error);
        setIsLoading(false);
      }
    };

    initializeApp();
  }, []);

  const updatePrices = () => {
    const newPrices = {};
    tradingPairs.forEach(pair => {
      const basePrice = pair.price;
      const variation = (Math.random() - 0.5) * 0.02; // ±1% variation
      newPrices[pair.symbol] = {
        price: basePrice * (1 + variation),
        change: pair.change + (Math.random() - 0.5) * 0.1,
        volume: Math.random() * 1000000,
        high: basePrice * 1.05,
        low: basePrice * 0.95
      };
    });
    setPriceData(newPrices);
  };

  const updateOrderBook = () => {
    const currentPrice = priceData[selectedPair]?.price || tradingPairs.find(p => p.symbol === selectedPair)?.price || 4.5989;
    
    const bids = Array.from({ length: 15 }, (_, i) => ({
      price: currentPrice * (1 - (i + 1) * 0.001),
      amount: Math.random() * 1000,
      total: 0
    }));

    const asks = Array.from({ length: 15 }, (_, i) => ({
      price: currentPrice * (1 + (i + 1) * 0.001),
      amount: Math.random() * 1000,
      total: 0
    }));

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

    setOrderBook({ bids, asks });
  };

  const updateRecentTrades = () => {
    const currentPrice = priceData[selectedPair]?.price || tradingPairs.find(p => p.symbol === selectedPair)?.price || 4.5989;
    
    const newTrade = {
      id: Date.now(),
      price: currentPrice * (1 + (Math.random() - 0.5) * 0.002),
      amount: Math.random() * 100,
      time: new Date().toLocaleTimeString(),
      side: Math.random() > 0.5 ? 'buy' : 'sell'
    };

    setRecentTrades(prev => [newTrade, ...prev.slice(0, 19)]);
  };

  const updateChartData = () => {
    const currentPrice = priceData[selectedPair]?.price || tradingPairs.find(p => p.symbol === selectedPair)?.price || 4.5989;
    
    const newDataPoint = {
      time: Date.now(),
      price: currentPrice,
      volume: Math.random() * 1000
    };

    setChartData(prev => [...prev.slice(-99), newDataPoint]);
  };

  const updateCandlestickData = () => {
    const currentPrice = priceData[selectedPair]?.price || tradingPairs.find(p => p.symbol === selectedPair)?.price || 4.5989;
    
    setCandlestickData(prev => {
      if (prev.length === 0) {
        // Initialize with realistic candlestick data
        const initialData = [];
        let lastClose = currentPrice;
        
        for (let i = 0; i < 50; i++) {
          // Create realistic price movement
          const volatility = 0.005; // 0.5% volatility
          const trend = (Math.random() - 0.5) * 0.002; // Small trend
          
          const open = lastClose;
          const priceChange = (Math.random() - 0.5) * volatility + trend;
          const close = open * (1 + priceChange);
          
          // High and low should encompass open and close with some extra range
          const maxPrice = Math.max(open, close);
          const minPrice = Math.min(open, close);
          const extraRange = Math.abs(close - open) * 0.5 + volatility * 0.3;
          
          const high = maxPrice + (Math.random() * extraRange);
          const low = minPrice - (Math.random() * extraRange);
          
          initialData.push({
            time: Date.now() - (50 - i) * 60000, // 1 minute intervals
            open: parseFloat(open.toFixed(4)),
            high: parseFloat(high.toFixed(4)),
            low: parseFloat(low.toFixed(4)),
            close: parseFloat(close.toFixed(4)),
            volume: Math.floor(Math.random() * 1000000) + 100000
          });
          
          lastClose = close;
        }
        return initialData;
      }
      
      // Update the last candle with new price data
      const updated = [...prev];
      const lastCandle = { ...updated[updated.length - 1] };
      
      // Simulate realistic price movement within the candle
      const priceVariation = (Math.random() - 0.5) * 0.001;
      const newPrice = currentPrice * (1 + priceVariation);
      
      lastCandle.close = parseFloat(newPrice.toFixed(4));
      lastCandle.high = Math.max(lastCandle.high, newPrice);
      lastCandle.low = Math.min(lastCandle.low, newPrice);
      lastCandle.volume += Math.floor(Math.random() * 10000);
      
      updated[updated.length - 1] = lastCandle;
      
      // Occasionally add a new candle (every ~30 updates)
      if (Math.random() < 0.03) {
        const open = lastCandle.close;
        const priceChange = (Math.random() - 0.5) * 0.005;
        const close = open * (1 + priceChange);
        const maxPrice = Math.max(open, close);
        const minPrice = Math.min(open, close);
        const extraRange = Math.abs(close - open) * 0.5 + 0.001;
        
        const newCandle = {
          time: Date.now(),
          open: parseFloat(open.toFixed(4)),
          high: parseFloat((maxPrice + Math.random() * extraRange).toFixed(4)),
          low: parseFloat((minPrice - Math.random() * extraRange).toFixed(4)),
          close: parseFloat(close.toFixed(4)),
          volume: Math.floor(Math.random() * 1000000) + 100000
        };
        
        updated.push(newCandle);
        // Keep only last 50 candles
        return updated.slice(-50);
      }
      
      return updated;
    });
  };

  const currentPair = tradingPairs.find(p => p.symbol === selectedPair);
  const currentPriceData = priceData[selectedPair] || {};

  return (
    <>
      <LoadingScreen isLoading={isLoading} />
      <NotificationSystem />
      
      <div className="professional-trading-app">
        {/* Branded Header */}
        <BrandedHeader 
          isConnected={walletConnected}
          onConnect={handleWalletConnect}
        />
        
        {/* Main Trading Interface */}
        <div className="trading-main">
        {/* Left Sidebar - Pairs */}
        <div className="pairs-sidebar">
          <div className="sidebar-header">
            <h3>Markets</h3>
            <div className="market-filter">
              <button className="filter-btn active">Cosmos</button>
            {tradingPairs.map(pair => {
              const pairData = priceData[pair.symbol] || {};
              const isSelected = selectedPair === pair.symbol;
              const confidence = pairData.confidence || 0;
              const sources = pairData.sources || [];
              
              return (
                <div 
                  key={pair.symbol} 
                  className={`market-item ${isSelected ? 'selected' : ''}`}
                  onClick={() => handlePairChange(pair.symbol)}
                >
                  <div className="market-info">
                    <div className="market-symbol">
                      <span className="base">{pair.base}</span>
                      <span className="quote">/{pair.quote}</span>
                    </div>
                    <div className="market-name">{pair.name}</div>
                  </div>
                  <div className="market-data">
                    <div className="price">
                      ${pairData.price ? pairData.price.toFixed(4) : '0.0000'}
                    </div>
                    <div className={`change ${(pairData.change || 0) >= 0 ? 'positive' : 'negative'}`}>
                      {(pairData.change || 0) >= 0 ? '+' : ''}{(pairData.change || 0).toFixed(2)}%
                    </div>
                    <div className="oracle-info">
                      <div className="confidence">
                        <span className="confidence-dot" style={{
                          backgroundColor: confidence >= 80 ? '#4ade80' : confidence >= 60 ? '#fbbf24' : '#f87171'
                        }}></span>
                        {confidence.toFixed(0)}%
                      </div>
                      <div className="sources-count">
                        {sources.length} sources
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Center - Chart and Trading */}
          <div className="trading-center">
            {/* Price Header */}
            <div className="price-header">
              <div className="current-pair">
                <span className="pair-icon">{currentPair?.icon}</span>
                <span className="pair-symbol">{selectedPair}</span>
                <span className="pair-name">{currentPair?.name}</span>
              </div>
              
              <div className="price-stats">
              <div className="main-price">
                <span className="price">${(currentPriceData.price || currentPair?.price || 0).toFixed(4)}</span>
                <span className={`change ${(currentPriceData.change || currentPair?.change || 0) >= 0 ? 'positive' : 'negative'}`}>
                  {(currentPriceData.change || currentPair?.change || 0) >= 0 ? '+' : ''}{(currentPriceData.change || currentPair?.change || 0).toFixed(2)}%
                </span>
              </div>
              
              <div className="price-details">
                <div className="stat">
                  <span className="label">24h High</span>
                  <span className="value">${(currentPriceData.high || 0).toFixed(4)}</span>
                </div>
                <div className="stat">
                  <span className="label">24h Low</span>
                  <span className="value">${(currentPriceData.low || 0).toFixed(4)}</span>
                </div>
                <div className="stat">
                  <span className="label">24h Volume</span>
                  <span className="value">${(currentPriceData.volume || 0).toLocaleString()}</span>
                </div>
              </div>
            </div>

            <div className="privacy-status">
              <div className="privacy-badge">
                <span className="privacy-icon">{privacyModes.find(m => m.id === privacyMode)?.icon}</span>
                <span className="privacy-text">{privacyModes.find(m => m.id === privacyMode)?.name} Mode</span>
              </div>
              <div className="mev-protection">
                <span className="shield-icon">🛡️</span>
                <span>MEV Protected</span>
              </div>
            </div>
          </div>

          {/* Chart */}
          <div className="chart-container">
            <div className="chart-header">
              <div className="chart-controls">
                <button 
                  className={`chart-type ${chartType === 'line' ? 'active' : ''}`}
                  onClick={() => setChartType('line')}
                >
                  Line
                </button>
                <button 
                  className={`chart-type ${chartType === 'candlestick' ? 'active' : ''}`}
                  onClick={() => setChartType('candlestick')}
                >
                  Candles
                </button>
                <button 
                  className={`chart-type ${chartType === 'area' ? 'active' : ''}`}
                  onClick={() => setChartType('area')}
                >
                  Area
                </button>
                <button 
                  className={`chart-type ${chartType === 'ohlc' ? 'active' : ''}`}
                  onClick={() => setChartType('ohlc')}
                >
                  OHLC
                </button>
                <button 
                  className={`chart-type ${chartType === 'heikin-ashi' ? 'active' : ''}`}
                  onClick={() => setChartType('heikin-ashi')}
                >
                  Heikin Ashi
                </button>
                <button 
                  className={`chart-type ${chartType === 'depth' ? 'active' : ''}`}
                  onClick={() => setChartType('depth')}
                >
                  Depth
                </button>
              </div>
              
              <div className="timeframe-controls">
                {['1m', '5m', '15m', '1h', '4h', '1d'].map(tf => (
                  <button key={tf} className="timeframe-btn">
                    {tf}
                  </button>
                ))}
              </div>
            </div>
            
            <div className="chart-area">
              <AdvancedTradingChart 
                data={candlestickData} 
                chartType={chartType} 
                selectedPair={selectedPair}
              />
            </div>
          </div>

          {/* Trading Panel */}
          <div className="trading-panel">
            <div className="panel-tabs">
              <button className="tab-btn active">Spot</button>
              <button className="tab-btn">Margin</button>
              <button className="tab-btn">Futures</button>
            </div>

            {/* Privacy-Enhanced Trading Form */}
            <PrivacyEnhancedTradingForm
              selectedPair={selectedPair}
              priceData={priceData}
              onTrade={handleTrade}
            />
          </div>
        </div>

        {/* Right Sidebar - Order Book & Trades */}
        <div className="market-data-sidebar">
          {/* Order Book */}
          <div className="order-book">
            <div className="section-header">
              <h4>Order Book</h4>
              <div className="book-controls">
                <button className="book-view active" title="Both">⚌</button>
                <button className="book-view" title="Asks">▲</button>
                <button className="book-view" title="Bids">▼</button>
              </div>
            </div>

            <div className="book-headers">
              <span>Price (USDC)</span>
              <span>Amount</span>
              <span>Total</span>
            </div>

            <div className="book-content">
              {/* Asks (Sell Orders) */}
              <div className="asks">
                {orderBook.asks.slice().reverse().map((ask, index) => (
                  <div key={index} className="book-row ask-row">
                    <span className="price">{ask.price.toFixed(4)}</span>
                    <span className="amount">{ask.amount.toFixed(2)}</span>
                    <span className="total">{ask.total.toFixed(2)}</span>
                    <div 
                      className="depth-bar ask-bar" 
                      style={{ width: `${(ask.total / Math.max(...orderBook.asks.map(a => a.total))) * 100}%` }}
                    ></div>
                  </div>
                ))}
              </div>

              {/* Spread */}
              <div className="spread">
                <div className="spread-value">
                  Spread: {orderBook.asks.length && orderBook.bids.length ? 
                    (orderBook.asks[0].price - orderBook.bids[0].price).toFixed(4) : '0.0000'
                  }
                </div>
              </div>

              {/* Bids (Buy Orders) */}
              <div className="bids">
                {orderBook.bids.map((bid, index) => (
                  <div key={index} className="book-row bid-row">
                    <span className="price">{bid.price.toFixed(4)}</span>
                    <span className="amount">{bid.amount.toFixed(2)}</span>
                    <span className="total">{bid.total.toFixed(2)}</span>
                    <div 
                      className="depth-bar bid-bar" 
                      style={{ width: `${(bid.total / Math.max(...orderBook.bids.map(b => b.total))) * 100}%` }}
                    ></div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Recent Trades */}
          <div className="recent-trades">
            <div className="section-header">
              <h4>Recent Trades</h4>
            </div>

            <div className="trades-headers">
              <span>Price (USDC)</span>
              <span>Amount</span>
              <span>Time</span>
            </div>

            <div className="trades-content">
              {recentTrades.map(trade => (
                <div key={trade.id} className={`trade-row ${trade.side}`}>
                  <span className="price">{trade.price.toFixed(4)}</span>
                  <span className="amount">{trade.amount.toFixed(2)}</span>
                  <span className="time">{trade.time}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
        </div> {/* Close trading-main */}

        {/* Footer */}
        <footer className="trading-footer">
          <div className="footer-left">
            <div className="network-status">
              <span className="network-icon">🔐</span>
              <span>Secret Network</span>
              <div className="status-dot connected"></div>
            </div>
            <div className="privacy-info">
              Privacy-Optional • Lightning Fast • Trustless
            </div>
          </div>
          
          <div className="footer-right">
            <div className="snip-token-info">
              <span className="token-icon">💎</span>
              <span>$SNIP Token Coming Soon</span>
              <button className="learn-more-btn">Learn More</button>
            </div>
          </div>
        </footer>
      </div> {/* Close professional-trading-app */}
    </>
  );
};

export default ProfessionalTradingApp;

