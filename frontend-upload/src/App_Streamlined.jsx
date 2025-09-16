import React, { useState, useEffect } from 'react';
import BinanceStyleChart from './components/BinanceStyleChart';
import { generateRealisticCandlestickData, generateOrderBookData, generateRecentTrades } from './utils/mockData';
import './App.css';

const StreamlinedTradingApp = () => {
  const [selectedPair, setSelectedPair] = useState('ATOM/USDC');
  const [chartType, setChartType] = useState('candlestick');
  const [candlestickData, setCandlestickData] = useState([]);
  const [orderBook, setOrderBook] = useState({ bids: [], asks: [] });
  const [recentTrades, setRecentTrades] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Trading pairs
  const tradingPairs = [
    { symbol: 'ATOM/USDC', name: 'Cosmos', icon: '⚛️', price: 4.5989, change: 1.34 },
    { symbol: 'SCRT/USDC', name: 'Secret Network', icon: '🔐', price: 0.1945, change: -0.25 },
    { symbol: 'OSMO/USDC', name: 'Osmosis', icon: '🌊', price: 0.1689, change: 2.04 },
    { symbol: 'BTC/USDC', name: 'Bitcoin', icon: '₿', price: 111422.00, change: -0.71 },
    { symbol: 'ETH/USDC', name: 'Ethereum', icon: 'Ξ', price: 4307.57, change: -0.15 }
  ];

  // Initialize data
  useEffect(() => {
    const initializeData = async () => {
      try {
        const symbol = selectedPair.split('/')[0];
        const initialCandleData = generateRealisticCandlestickData(symbol, 1, '1m');
        setCandlestickData(initialCandleData);
        
        const currentPrice = initialCandleData[initialCandleData.length - 1]?.close || 4.5989;
        const orderBookData = generateOrderBookData(currentPrice);
        setOrderBook(orderBookData);
        
        const tradesData = generateRecentTrades(currentPrice);
        setRecentTrades(tradesData);
        
        await new Promise(resolve => setTimeout(resolve, 1000));
        setIsLoading(false);
      } catch (error) {
        console.error('Failed to initialize data:', error);
        setIsLoading(false);
      }
    };

    initializeData();
  }, [selectedPair]);

  const currentPair = tradingPairs.find(p => p.symbol === selectedPair);

  if (isLoading) {
    return (
      <div className="loading-screen">
        <div className="loading-content">
          <img src="/logo_snipswap.png" alt="SnipSwap" className="loading-logo" />
          <h2>Loading SnipSwap DEX...</h2>
          <div className="loading-spinner"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="streamlined-trading-app">
      {/* Header */}
      <header className="app-header">
        <div className="header-left">
          <div className="logo-container">
            <img src="/logo_snipswap.png" alt="SnipSwap" className="app-logo" />
            <div className="brand-info">
              <h1>SnipSwap</h1>
              <p>Privacy-First DEX</p>
            </div>
          </div>
        </div>
        
        <div className="header-center">
          <nav className="main-nav">
            <button className="nav-btn active">Trade</button>
            <button className="nav-btn">Pools</button>
            <button className="nav-btn">Portfolio</button>
          </nav>
        </div>
        
        <div className="header-right">
          <div className="network-info">
            <span className="network-icon">🔐</span>
            <span>Secret Network</span>
          </div>
          <button className="connect-wallet-btn">Connect Wallet</button>
        </div>
      </header>

      {/* Main Content */}
      <div className="main-content">
        {/* Left Sidebar - Pairs */}
        <div className="pairs-sidebar">
          <h3>Markets</h3>
          <div className="pairs-list">
            {tradingPairs.map(pair => (
              <div 
                key={pair.symbol} 
                className={`pair-item ${selectedPair === pair.symbol ? 'selected' : ''}`}
                onClick={() => setSelectedPair(pair.symbol)}
              >
                <div className="pair-info">
                  <span className="pair-icon">{pair.icon}</span>
                  <div className="pair-details">
                    <div className="pair-symbol">{pair.symbol}</div>
                    <div className="pair-name">{pair.name}</div>
                  </div>
                </div>
                <div className="pair-data">
                  <div className="price">${pair.price.toFixed(4)}</div>
                  <div className={`change ${pair.change >= 0 ? 'positive' : 'negative'}`}>
                    {pair.change >= 0 ? '+' : ''}{pair.change.toFixed(2)}%
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Center - Chart */}
        <div className="chart-section">
          <div className="chart-header">
            <div className="pair-info">
              <span className="current-pair">{selectedPair}</span>
              <span className="current-price">${currentPair?.price.toFixed(4)}</span>
              <span className={`current-change ${currentPair?.change >= 0 ? 'positive' : 'negative'}`}>
                {currentPair?.change >= 0 ? '+' : ''}{currentPair?.change.toFixed(2)}%
              </span>
            </div>
            
            <div className="chart-controls">
              <button 
                className={`chart-btn ${chartType === 'line' ? 'active' : ''}`}
                onClick={() => setChartType('line')}
              >
                Line
              </button>
              <button 
                className={`chart-btn ${chartType === 'candlestick' ? 'active' : ''}`}
                onClick={() => setChartType('candlestick')}
              >
                Candles
              </button>
            </div>
          </div>
          
          <div className="chart-container">
            <BinanceStyleChart 
              data={candlestickData} 
              chartType={chartType} 
              selectedPair={selectedPair}
              showVolume={true}
            />
          </div>
        </div>

        {/* Right Sidebar - Order Book & Trades */}
        <div className="market-sidebar">
          {/* Order Book */}
          <div className="order-book">
            <h4>Order Book</h4>
            <div className="book-headers">
              <span>Price</span>
              <span>Amount</span>
              <span>Total</span>
            </div>
            
            <div className="asks">
              {orderBook.asks.slice(0, 8).reverse().map((ask, index) => (
                <div key={index} className="book-row ask">
                  <span className="price">{ask.price.toFixed(4)}</span>
                  <span className="amount">{ask.amount.toFixed(2)}</span>
                  <span className="total">{ask.total.toFixed(2)}</span>
                </div>
              ))}
            </div>
            
            <div className="spread">
              Spread: {orderBook.asks.length && orderBook.bids.length ? 
                (orderBook.asks[0].price - orderBook.bids[0].price).toFixed(4) : '0.0000'
              }
            </div>
            
            <div className="bids">
              {orderBook.bids.slice(0, 8).map((bid, index) => (
                <div key={index} className="book-row bid">
                  <span className="price">{bid.price.toFixed(4)}</span>
                  <span className="amount">{bid.amount.toFixed(2)}</span>
                  <span className="total">{bid.total.toFixed(2)}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Trades */}
          <div className="recent-trades">
            <h4>Recent Trades</h4>
            <div className="trades-headers">
              <span>Price</span>
              <span>Amount</span>
              <span>Time</span>
            </div>
            <div className="trades-list">
              {recentTrades.slice(0, 10).map(trade => (
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
      <footer className="app-footer">
        <div className="footer-content">
          <div className="footer-left">
            <span>🔐 Privacy-First Trading</span>
            <span>⚡ Lightning Fast</span>
            <span>🛡️ MEV Protected</span>
          </div>
          <div className="footer-right">
            <span>Powered by Secret Network</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default StreamlinedTradingApp;

