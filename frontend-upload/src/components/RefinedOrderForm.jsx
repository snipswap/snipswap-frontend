import React, { useState } from 'react';

/*
 * A reusable order form component that supports both buy and sell orders. It
 * captures price, quantity, privacy preference and destination chain from
 * the user and sends the order to the backend API. The component is
 * presented inside a card with generous padding, rounded corners and a
 * gradient submit button. Messages are shown above the form on success
 * or failure.
 */
export default function OrderForm({ pair, side }) {
  const [price, setPrice] = useState('');
  const [quantity, setQuantity] = useState('');
  const [isPrivate, setIsPrivate] = useState(false);
  const [targetChain, setTargetChain] = useState('secret');
  const [message, setMessage] = useState(null);

  // Submit the order to the API
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(null);
    const body = {
      user_address: 'user', // placeholder address; integrate wallet later
      pair_symbol: pair,
      side,
      order_type: 'market',
      quantity: parseFloat(quantity),
      price: price ? parseFloat(price) : null,
      is_private: isPrivate,
      target_chain: targetChain === 'secret' ? null : targetChain,
    };
    try {
      const res = await fetch('/api/orders/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      if (!res.ok) throw new Error('Failed to submit order');
      const data = await res.json();
      setMessage({ type: 'success', text: `Order submitted: ${data.order_id}` });
      setPrice('');
      setQuantity('');
    } catch (err) {
      setMessage({ type: 'error', text: err.message });
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md space-y-4">
      <h3 className="text-xl font-bold capitalize">{side} {pair}</h3>
      {message && (
        <div className={`${message.type === 'success' ? 'text-green-600' : 'text-red-600'} text-sm`}>
          {message.text}
        </div>
      )}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1">Price</label>
          <input
            type="number"
            step="any"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="w-full p-2 border border-gray-300 dark:border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
            placeholder="Enter price"
          />
        </div>
        <div>
          <label className="block mb-1">Quantity</label>
          <input
            type="number"
            step="any"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            className="w-full p-2 border border-gray-300 dark:border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
            placeholder="Enter quantity"
          />
        </div>
        <div className="flex items-center space-x-2">
          <input
            id={`${side}-private`}
            type="checkbox"
            checked={isPrivate}
            onChange={(e) => setIsPrivate(e.target.checked)}
            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
          />
          <label htmlFor={`${side}-private`} className="text-sm">
            Private Order
          </label>
        </div>
        <div>
          <label className="block mb-1">Chain</label>
          <select
            value={targetChain}
            onChange={(e) => setTargetChain(e.target.value)}
            className="w-full p-2 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-900"
          >
            <option value="secret">Secret</option>
            <option value="osmosis">Osmosis</option>
            <option value="shade">Shade</option>
          </select>
        </div>
        <button
          type="submit"
          className="w-full py-2 px-4 text-white font-semibold rounded-md bg-gradient-to-r from-blue-600 to-purple-600 hover:opacity-90 focus:outline-none"
        >
          Submit {side} Order
        </button>
      </form>
    </div>
  );
}