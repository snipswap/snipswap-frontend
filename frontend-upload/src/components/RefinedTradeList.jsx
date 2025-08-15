import React from 'react';

/*
 * Renders a list of recent trades for a trading pair. Each trade shows
 * the price, quantity and timestamp. Buy trades are coloured green while
 * sell trades are coloured red. Alternating row backgrounds improve
 * readability. If there are no trades available, a friendly message
 * informs the user.
 */
export default function TradeList({ trades }) {
  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md">
      <h3 className="text-xl font-bold mb-4">Recent Trades</h3>
      <table className="w-full text-sm">
        <thead>
          <tr className="text-left">
            <th className="pb-2">Price</th>
            <th className="pb-2">Quantity</th>
            <th className="pb-2">Time</th>
          </tr>
        </thead>
        <tbody>
          {(!trades || trades.length === 0) && (
            <tr>
              <td colSpan="3" className="py-2 text-center text-gray-500">No trades</td>
            </tr>
          )}
          {trades && trades.map((t, idx) => (
            <tr key={idx} className={idx % 2 === 0 ? 'bg-gray-50 dark:bg-gray-700' : ''}>
              <td className={`py-1 px-1 ${t.side === 'buy' ? 'text-green-600' : 'text-red-600'}`}>{t.price}</td>
              <td className="py-1 px-1">{t.quantity}</td>
              <td className="py-1 px-1">{
                new Date(t.timestamp || t.time || 0).toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit', second: '2-digit' })
              }</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}