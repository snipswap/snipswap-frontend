import React from 'react';

/*
 * Displays the current order book for a trading pair. Bids and asks are
 * rendered in two separate tables for clarity. Each table features
 * alternating row backgrounds and colour-coded prices (green for bids,
 * red for asks). If there are no orders, a friendly message is shown.
 */
export default function OrderBook({ orderBook }) {
  const { buys = [], sells = [] } = orderBook || {};
  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md">
      <h3 className="text-xl font-bold mb-4">Order Book</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Bids */}
        <div>
          <h4 className="text-lg font-semibold mb-2">Bids</h4>
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left">
                <th className="pb-2">Price</th>
                <th className="pb-2">Quantity</th>
              </tr>
            </thead>
            <tbody>
              {buys.length === 0 && (
                <tr>
                  <td colSpan="2" className="py-1 text-center text-gray-500">No bids</td>
                </tr>
              )}
              {buys.map((o, idx) => (
                <tr key={idx} className={idx % 2 === 0 ? 'bg-gray-50 dark:bg-gray-700' : ''}>
                  <td className="py-1 px-1 text-green-600">{o.price}</td>
                  <td className="py-1 px-1">{o.quantity}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {/* Asks */}
        <div>
          <h4 className="text-lg font-semibold mb-2">Asks</h4>
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left">
                <th className="pb-2">Price</th>
                <th className="pb-2">Quantity</th>
              </tr>
            </thead>
            <tbody>
              {sells.length === 0 && (
                <tr>
                  <td colSpan="2" className="py-1 text-center text-gray-500">No asks</td>
                </tr>
              )}
              {sells.map((o, idx) => (
                <tr key={idx} className={idx % 2 === 0 ? 'bg-gray-50 dark:bg-gray-700' : ''}>
                  <td className="py-1 px-1 text-red-600">{o.price}</td>
                  <td className="py-1 px-1">{o.quantity}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}