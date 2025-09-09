import React, { useState } from 'react';

// Use environment variable for API base URL, fallback to Railway backend
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://snipswap-dex-production.up.railway.app';

const CHAINS = [
  { label: 'Secret', value: 'secret' },
  { label: 'Osmosis', value: 'osmosis' },
  { label: 'Shade', value: 'shade' },
];

function OrderForm({ pair, side }) {
  const [price, setPrice] = useState('');
  const [quantity, setQuantity] = useState('');
  const [isPrivate, setIsPrivate] = useState(false);
  const [targetChain, setTargetChain] = useState('');
  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!pair) return;
    setLoading(true);
    setMessage(null);
    try {
      const payload = {
        user_address: 'demo_user',
        pair_symbol: pair,
        side,
        order_type: 'limit',
        quantity: parseFloat(quantity),
        price: parseFloat(price),
        is_private: isPrivate,
      };
      if (targetChain) {
        payload.target_chain = targetChain;
      }
      const res = await fetch(`${API_BASE_URL}/api/trading/orders`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      setMessage(`Order submitted! ID: ${data.order_id || data.id || 'n/a'}`);
      setPrice('');
      setQuantity('');
      setIsPrivate(false);
      setTargetChain('');
    } catch (err) {
      console.error(err);
      setMessage('Failed to submit order');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="border p-4 rounded space-y-3">
      <h2 className="text-lg font-semibold">
        {side === 'buy' ? 'Buy' : 'Sell'} {pair || ''}
      </h2>
      <div>
        <label className="block text-sm">Price</label>
        <input
          type="number"
          step="any"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="mt-1 w-full border px-2 py-1 rounded"
        />
      </div>
      <div>
        <label className="block text-sm">Quantity</label>
        <input
          type="number"
          step="any"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          className="mt-1 w-full border px-2 py-1 rounded"
        />
      </div>
      <div className="flex items-center space-x-2">
        <input
          type="checkbox"
          checked={isPrivate}
          onChange={(e) => setIsPrivate(e.target.checked)}
          id={`${side}-private`}
        />
        <label htmlFor={`${side}-private`} className="text-sm">
          Privacy Mode
        </label>
      </div>
      <div>
        <label className="block text-sm">Destination Chain</label>
        <select
          value={targetChain}
          onChange={(e) => setTargetChain(e.target.value)}
          className="mt-1 w-full border px-2 py-1 rounded"
        >
          <option value="">None</option>
          {CHAINS.map((ch) => (
            <option key={ch.value} value={ch.value}>
              {ch.label}
            </option>
          ))}
        </select>
      </div>
      <button
        type="submit"
        disabled={loading || !pair || !price || !quantity}
        className="mt-2 px-3 py-1 rounded bg-blue-600 text-white disabled:opacity-50"
      >
        {loading ? 'Submitting...' : `Place ${side}`}
      </button>
      {message && <p className="text-xs mt-1">{message}</p>}
    </form>
  );
}

export default OrderForm;
