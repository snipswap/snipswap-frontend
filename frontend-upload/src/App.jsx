import React, { useState } from 'react';
import './App.css';

function App() {
  const [selectedPair, setSelectedPair] = useState('SCRT/USDT');
  const [orderType, setOrderType] = useState('buy');
  const [price, setPrice] = useState('');
  const [amount, setAmount] = useState('');

  const tradingPairs = [
    { symbol: 'SCRT/USDT', price: '0.4521', change: '+5.23%', volume: '2.1M', positive: true },
    { symbol: 'ATOM/USDT', price: '12.34', change: '-2.15%', volume: '5.8M', positive: false },
    { symbol: 'OSMO/USDT', price: '0.8765', change: '+8.91%', volume: '1.9M', positive: true },
    { symbol: 'JUNO/USDT', price: '3.21', change: '-0.87%', volume: '890K', positive: false },
    { symbol: 'EVMOS/USDT', price: '0.1234', change: '+12.45%', volume: '3.2M', positive: true },
    { symbol: 'STARS/USDT', price: '0.0234', change: '-5.67%', volume: '1.5M', positive: false },
    { symbol: 'HUAHUA/USDT', price: '0.000012', change: '+23.45%', volume: '890K', positive: true },
    { symbol: 'CMDX/USDT', price: '0.1567', change: '+7.89%', volume: '2.3M', positive: true },
  ];

  const orderBookData = {
    sells: [
      { price: '0.4536', amount: '1.8K', total: '22.5K' },
      { price: '0.4535', amount: '2.4K', total: '20.7K' },
      { price: '0.4534', amount: '737', total: '18.2K' },
      { price: '0.4533', amount: '1.0K', total: '17.5K' },
      { price: '0.4532', amount: '1.7K', total: '16.5K' },
    ],
    buys: [
      { price: '0.4520', amount: '1.4K', total: '1.4K' },
      { price: '0.4519', amount: '2.2K', total: '3.7K' },
      { price: '0.4518', amount: '1.6K', total: '5.2K' },
      { price: '0.4517', amount: '832', total: '6.1K' },
      { price: '0.4516', amount: '1.6K', total: '7.7K' },
    ]
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="header">
        <div className="header-content">
          <div className="logo">
            <span>SnipSwap</span>
            <span className="text-sm font-normal">DEX</span>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-3">
              <span className="privacy-badge">Private Trading</span>
              <span className="mev-badge">MEV Protected</span>
              <span className="privacy-badge">No KYC</span>
            </div>
            
            <div className="flex space-x-3">
              <button className="btn-primary">Hide Balances</button>
              <button className="btn-primary">Connect Keplr</button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Container with Grid Layout */}
      <div className="main-container">
        {/* Sidebar - Trading Pairs */}
        <div className="sidebar">
          <div className="trading-card">
            <h3 className="text-xl font-bold mb-4 text-gradient">Markets</h3>
            
            {/* Filter Buttons */}
            <div className="flex space-x-2 mb-4">
              <button className="chart-button active">All</button>
              <button className="chart-button">★</button>
              <button className="chart-button">↗</button>
              <button className="chart-button">↘</button>
            </div>

            {/* Search */}
            <input 
              type="text" 
              placeholder="Search pairs..." 
              className="form-input mb-4"
            />

            {/* Trading Pairs List */}
            <div className="space-y-3">
              {tradingPairs.map((pair) => (
                <div 
                  key={pair.symbol}
                  className={`trading-pair-item ${selectedPair === pair.symbol ? 'border-primary-500' : ''}`}
                  onClick={() => setSelectedPair(pair.symbol)}
                >
                  <div className="trading-pair-symbol">{pair.symbol}</div>
                  <div className="text-xs text-muted-foreground mb-1">Vol: {pair.volume}</div>
                  <div className="flex justify-between items-center">
                    <span className="trading-pair-price">{pair.price}</span>
                    <span className={`text-sm font-semibold ${pair.positive ? 'price-positive' : 'price-negative'}`}>
                      {pair.change}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="main-content">
          {/* Price Header */}
          <div className="trading-card">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-3xl font-bold text-gradient">{selectedPair}</h2>
                <div className="flex items-center space-x-4 mt-2">
                  <span className="text-2xl font-bold">0.4521</span>
                  <span className="price-positive text-lg font-semibold">+5.23%</span>
                </div>
                <div className="flex space-x-6 mt-2 text-sm text-muted-foreground">
                  <span>24h Volume: 2.1M</span>
                  <span>High: 0.4747</span>
                  <span>Low: 0.4295</span>
                </div>
              </div>
            </div>
          </div>

          {/* Chart Section */}
          <div className="chart-container">
            <div className="chart-header">
              <h3 className="chart-title">{selectedPair}</h3>
              <div className="chart-controls">
                <button className="chart-button">1m</button>
                <button className="chart-button">5m</button>
                <button className="chart-button">15m</button>
                <button className="chart-button">1H</button>
                <button className="chart-button">4H</button>
                <button className="chart-button active">1D</button>
                <button className="chart-button">1W</button>
                <button className="chart-button">1M</button>
                <button className="btn-primary ml-4">Indicators</button>
              </div>
            </div>
            <div className="flex-1 flex items-center justify-center text-muted-foreground">
              <div className="text-center">
                <div className="text-6xl mb-4">📈</div>
                <p>Chart visualization will be implemented here</p>
              </div>
            </div>
          </div>

          {/* Trading Section */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Order Book */}
            <div className="trading-card">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold">Order Book</h3>
                <div className="flex space-x-2">
                  <button className="chart-button active">Order Book</button>
                  <button className="chart-button">Recent Trades</button>
                </div>
              </div>

              <div className="order-book-table">
                <div className="grid grid-cols-3 order-book-header">
                  <span>Price (USDT)</span>
                  <span className="text-right">Amount (SCRT)</span>
                  <span className="text-right">Total</span>
                </div>

                {/* Sell Orders */}
                <div className="space-y-1 mb-4">
                  {orderBookData.sells.map((order, index) => (
                    <div key={index} className="grid grid-cols-3 order-book-row py-1">
                      <span className="order-book-sell">{order.price}</span>
                      <span className="text-right text-sm">{order.amount}</span>
                      <span className="text-right text-sm">{order.total}</span>
                    </div>
                  ))}
                </div>

                {/* Current Price */}
                <div className="text-center py-2 border-y border-border">
                  <span className="text-lg font-bold price-positive">0.4521</span>
                  <span className="text-sm ml-2 price-positive">+2.34%</span>
                </div>

                {/* Buy Orders */}
                <div className="space-y-1 mt-4">
                  {orderBookData.buys.map((order, index) => (
                    <div key={index} className="grid grid-cols-3 order-book-row py-1">
                      <span className="order-book-buy">{order.price}</span>
                      <span className="text-right text-sm">{order.amount}</span>
                      <span className="text-right text-sm">{order.total}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Order Forms */}
            <div className="lg:col-span-2 space-y-6">
              {/* Market Depth */}
              <div className="trading-card">
                <h3 className="text-lg font-bold mb-4">Market Depth</h3>
                <div className="flex space-x-2">
                  <button className="chart-button">0.01</button>
                  <button className="chart-button">0.001</button>
                  <button className="chart-button active">0.0001</button>
                </div>
              </div>

              {/* Buy/Sell Forms */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Buy Form */}
                <div className="trading-card border-success/20">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-bold text-success">Buy</h3>
                    <select className="chart-button">
                      <option>Limit Order</option>
                      <option>Market Order</option>
                    </select>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="form-label">Price (USDT)</label>
                      <input 
                        type="text" 
                        placeholder="0.0000" 
                        className="form-input"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                      />
                    </div>

                    <div>
                      <label className="form-label">Amount (SCRT)</label>
                      <input 
                        type="text" 
                        placeholder="0.0000" 
                        className="form-input"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                      />
                    </div>

                    <div className="text-sm text-muted-foreground">
                      Total: 0.0000 USDT
                    </div>

                    <button className="btn-success w-full py-3">
                      Connect Wallet to Trade
                    </button>
                  </div>
                </div>

                {/* Sell Form */}
                <div className="trading-card border-danger/20">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-bold text-danger">Sell</h3>
                    <select className="chart-button">
                      <option>Limit Order</option>
                      <option>Market Order</option>
                    </select>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="form-label">Price (USDT)</label>
                      <input 
                        type="text" 
                        placeholder="0.0000" 
                        className="form-input"
                      />
                    </div>

                    <div>
                      <label className="form-label">Amount (SCRT)</label>
                      <input 
                        type="text" 
                        placeholder="0.0000" 
                        className="form-input"
                      />
                    </div>

                    <div className="text-sm text-muted-foreground">
                      Total: 0.0000 USDT
                    </div>

                    <button className="btn-danger w-full py-3">
                      Connect Wallet to Trade
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;

