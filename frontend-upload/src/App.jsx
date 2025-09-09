import React, { useState, useEffect } from 'react';
import './App.css';
import OrderForm from './components/OrderForm';
import OrderBook from './components/OrderBook';
import TradeList from './components/TradeList';

// Use environment variable for API base URL, fallback to Railway backend
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://snipswap-dex-production.up.railway.app';
const API_BASE = `${API_BASE_URL}/api/market`;

function App() {
  const [tradingPairs, setTradingPairs] = useState([]);
  const [selectedPair, setSelectedPair] = useState('');
  const [orderBook, setOrderBook] = useState({ sells: [], buys: [] });
  const [trades, setTrades] = useState([]);

  // Fetch trading pairs on mount
  useEffect(() => {
    async function fetchPairs() {
      try {
        const res = await fetch(`${API_BASE}/pairs`);
        const data = await res.json();
        setTradingPairs(data);
        if (data.length > 0) {
          setSelectedPair(data[0].symbol);
        }
      } catch (error) {
        console.error('Failed to fetch trading pairs:', error);
      }
    }
    fetchPairs();
  }, []);

  // Fetch orderbook and trades when selectedPair changes
  useEffect(() => {
    if (!selectedPair) return;
    async function fetchOrderBook() {
      try {
        const res = await fetch(`${API_BASE}/orderbook/${selectedPair}`);
        const data = await res.json();
        setOrderBook(data);
      } catch (error) {
        console.error('Failed to fetch orderbook:', error);
      }
    }
    async function fetchTrades() {
      try {
        const res = await fetch(`${API_BASE}/trades/${selectedPair}`);
        const data = await res.json();
        setTrades(data);
      } catch (error) {
        console.error('Failed to fetch trades:', error);
      }
    }
    fetchOrderBook();
    fetchTrades();
  }, [selectedPair]);

  const currentPairData = tradingPairs.find(p => p.symbol === selectedPair) || {};

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">SnipSwap DEX</h1>
      <div className="flex flex-col md:flex-row md:items-center gap-4">
        <div>
          <label htmlFor="pair-select" className="mr-2">Trading Pair:</label>
          <select
            id="pair-select"
            value={selectedPair}
            onChange={e => setSelectedPair(e.target.value)}
            className="px-2 py-1 border rounded"
          >
            {tradingPairs.map(pair => (
              <option key={pair.symbol} value={pair.symbol}>
                {pair.symbol}
              </option>
            ))}
          </select>
        </div>
        {selectedPair && (
          <div className="flex flex-col md:flex-row gap-2">
            <span>Price: {currentPairData.price || '-'}</span>
            <span>24h Δ: {currentPairData.change || '-'}</span>
            <span>Volume: {currentPairData.volume || '-'}</span>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
        <OrderForm pair={selectedPair} side="buy" />
        <OrderForm pair={selectedPair} side="sell" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
        <OrderBook orderBook={orderBook} />
        <TradeList trades={trades} />
      </div>
    </div>
  );
}

export default App;
