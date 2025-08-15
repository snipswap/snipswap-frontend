import React, { useState, useEffect } from 'react';
import OrderForm from './components/OrderForm';
import OrderBook from './components/OrderBook';
import TradeList from './components/TradeList';
import './App.css';

// Base URL for market API requests
const API_BASE = '/api/market';

/*
 * The main application component. This component orchestrates the layout
 * of the SnipSwap interface and manages fetching trading data from the
 * backend. It renders a gradient header, a markets list, order forms,
 * an order book and a recent trades list. The design makes liberal use
 * of Tailwind CSS utility classes to achieve a polished look that works
 * in both light and dark themes.
 */
export default function App() {
  const [tradingPairs, setTradingPairs] = useState([]);
  const [selectedPair, setSelectedPair] = useState('');
  const [orderBook, setOrderBook] = useState({ buys: [], sells: [] });
  const [trades, setTrades] = useState([]);

  // Fetch the list of available trading pairs on component mount
  useEffect(() => {
    async function fetchPairs() {
      try {
        const res = await fetch(`${API_BASE}/pairs`);
        const data = await res.json();
        setTradingPairs(data);
        if (data.length > 0) {
          setSelectedPair(data[0].symbol);
        }
      } catch (err) {
        console.error('Failed to fetch trading pairs', err);
      }
    }
    fetchPairs();
  }, []);

  // When the selected pair changes, fetch its order book and recent trades
  useEffect(() => {
    if (!selectedPair) return;
    async function fetchOrderBook() {
      try {
        const res = await fetch(`${API_BASE}/orderbook/${selectedPair}`);
        const data = await res.json();
        setOrderBook(data);
      } catch (err) {
        console.error('Failed to fetch orderbook', err);
      }
    }
    async function fetchTrades() {
      try {
        const res = await fetch(`${API_BASE}/trades/${selectedPair}`);
        const data = await res.json();
        setTrades(data);
      } catch (err) {
        console.error('Failed to fetch trades', err);
      }
    }
    fetchOrderBook();
    fetchTrades();
  }, [selectedPair]);

  // Extract the currently selected pair's summary data (price, change, volume)
  const currentPairData = tradingPairs.find(p => p.symbol === selectedPair) || {};

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      {/*
        Header section with gradient background. It contains the SnipSwap logo,
        descriptive badges for private trading and MEV protection, and basic
        controls for hiding balances and connecting a wallet. All elements are
        flexed for responsive behaviour.
      */}
      <header className="bg-gradient-to-r from-purple-600 to-pink-500 dark:from-purple-800 dark:to-pink-700 text-white">
        <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col md:flex-row md:items-center md:justify-between space-y-2 md:space-y-0">
          <div className="flex items-center space-x-3">
            <span className="text-2xl font-bold">SnipSwap</span>
            <span className="bg-white bg-opacity-20 text-xs px-2 py-1 rounded-full uppercase tracking-wide">DEX</span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="bg-white bg-opacity-20 text-xs px-2 py-1 rounded-full">Private Trading</span>
            <span className="bg-white bg-opacity-20 text-xs px-2 py-1 rounded-full">MEV Protected</span>
          </div>
          <div className="flex items-center space-x-2">
            <button className="text-sm bg-white bg-opacity-20 hover:bg-opacity-30 px-3 py-1 rounded-full">Hide Balances</button>
            <button className="text-sm bg-white bg-opacity-20 hover:bg-opacity-30 px-3 py-1 rounded-full">Connect Keplr</button>
          </div>
        </div>
      </header>

      {/*
        Main content area: uses a responsive grid to lay out a sidebar
        containing markets and a larger content area for the selected pair's
        data, order forms, order book and trades. The max width keeps content
        centred on large screens, while padding ensures breathing room.
      */}
      <main className="max-w-7xl mx-auto p-4 grid grid-cols-1 lg:grid-cols-4 gap-4">
        {/* Sidebar: list of markets */}
        <aside className="lg:col-span-1">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-4">
            <h2 className="text-lg font-bold mb-3">Markets</h2>
            <ul className="divide-y divide-gray-200 dark:divide-gray-700">
              {tradingPairs.map(pair => (
                <li
                  key={pair.symbol}
                  className={`py-2 px-2 cursor-pointer ${pair.symbol === selectedPair ? 'bg-gray-200 dark:bg-gray-700' : ''}`}
                  onClick={() => setSelectedPair(pair.symbol)}
                >
                  <span className="font-semibold">{pair.symbol}</span>
                  <span className="float-right">{pair.price || '-'}</span>
                </li>
              ))}
            </ul>
          </div>
        </aside>

        {/* Primary content area for the selected pair */}
        <section className="lg:col-span-3 space-y-4">
          {/* Summary stats for the current pair */}
          {selectedPair && (
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-4 flex flex-wrap items-center gap-4">
              <h2 className="text-xl font-bold">{selectedPair}</h2>
              <div className="flex items-center space-x-4">
                <span>Price: <strong>{currentPairData.price || '-'}</strong></span>
                <span>24h Change: <strong>{currentPairData.change || '-'}</strong></span>
                <span>Volume: <strong>{currentPairData.volume || '-'}</strong></span>
              </div>
            </div>
          )}

          {/* Two order forms side by side */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <OrderForm pair={selectedPair} side="buy" />
            <OrderForm pair={selectedPair} side="sell" />
          </div>

          {/* Order book and recent trades side by side */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <OrderBook orderBook={orderBook} />
            <TradeList trades={trades} />
          </div>
        </section>
      </main>
    </div>
  );
}