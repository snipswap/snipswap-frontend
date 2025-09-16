import React, { useState, useEffect, useRef } from 'react';
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, AreaChart, Area } from 'recharts';
import BinanceStyleChart from './BinanceStyleChart';
import PrivacyEnhancedTradingForm from './PrivacyEnhancedTradingForm';
import BrandedHeader from './BrandedHeader';
import LoadingScreen from './LoadingScreen';
import NotificationSystem, { notifications } from './NotificationSystem';
import RealTimeOracle from '../services/realTimeOracle';
import { generateRealisticCandlestickData, generateOrderBookData, generateRecentTrades, updateCandlestickData } from '../utils/mockData';
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

  // Handle pair selection change
  const handlePairChange = async (newPair) => {
    setSelectedPair(newPair);
  };

  // Initialize app loading
  useEffect(() => {
    const initializeApp = async () => {
      try {
        // Generate realistic initial data
        const symbol = selectedPair.split('/')[0];
        const initialCandleData = generateRealisticCandlestickData(symbol, 1, '1m'); // 1 day of 1-minute candles
        setCandlestickData(initialCandleData);
        
        // Generate initial order book and trades
        const currentPrice = initialCandleData[initialCandleData.length - 1]?.close || 4.5989;
        const orderBookData = generateOrderBookData(currentPrice);
        setOrderBook(orderBookData);
        
        const tradesData = generateRecentTrades(currentPrice);
        setRecentTrades(tradesData);
        
        // Simulate app initialization
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        // Initialize oracle connection
        notifications.oracleConnected(3);
        
        setIsLoading(false);
      } catch (error) {
        console.error('Failed to initialize app:', error);
        setIsLoading(false);
      }
    };

    initializeApp();
  }, [selectedPair]);

  // Real-time data simulation
  useEffect(() => {
    if (isLoading || candlestickData.length === 0) return;

    const interval = setInterval(() => {
      const currentPrice = candlestickData[candlestickData.length - 1]?.close || 4.5989;
      const priceVariation = (Math.random() - 0.5) * 0.002; // ±0.1% variation
      const newPrice = currentPrice * (1 + priceVariation);
      
      // Update candlestick data
      setCandlestickData(prev => updateCandlestickData(prev, newPrice));
      
      // Update order book occasionally
      if (Math.random() < 0.3) {
        const newOrderBook = generateOrderBookData(newPrice);
        setOrderBook(newOrderBook);
      }
      
      // Add new trade occasionally
      if (Math.random() < 0.2) {
        const newTrade = {
          id: Date.now(),
          price: newPrice,
          amount: Math.random() * 100 + 10,
          time: new Date().toLocaleTimeString(),
          side: Math.random() > 0.5 ? 'buy' : 'sell',
          timestamp: Date.now()
        };
        setRecentTrades(prev => [newTrade, ...prev.slice(0, 19)]);
      }
    }, 2000); // Update every 2 seconds

    return () => clearInterval(interval);
  }, [isLoading, candlestickData.length]);

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
                <button className="filter-btn active">All</button>
                <button className="filter-btn">Cosmos</button>
              </div>
            </div>
            
            <div className="pairs-list">
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
                        <span className="base">{pair.symbol.split('/')[0]}</span>
                        <span className="quote">/{pair.symbol.split('/')[1]}</span>
                      </div>
                      <div className="market-name">{pair.name}</div>
                    </div>
                    <div className="market-data">
                      <div className="price">
                        ${pairData.price ? pairData.price.toFixed(4) : pair.price.toFixed(4)}
                      </div>
                      <div className={`change ${(pairData.change || pair.change) >= 0 ? 'positive' : 'negative'}`}>
                        {(pairData.change || pair.change) >= 0 ? '+' : ''}{(pairData.change || pair.change).toFixed(2)}%
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
                <BinanceStyleChart 
                  data={candlestickData} 
                  chartType={chartType} 
                  selectedPair={selectedPair}
                  showVolume={true}
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
        </div>

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
      </div>
    </>
  );
};

export default ProfessionalTradingApp;

