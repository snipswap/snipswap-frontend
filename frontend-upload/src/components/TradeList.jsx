import React from 'react';

/**
 * TradeList component renders a table of recent trades.
 *
 * Each trade is expected to have the following shape:
 * `{ price: number|string, quantity: number|string, side: 'buy'|'sell', timestamp: string }`.
 * Prices for buy trades are coloured green and sell trades red.  The
 * timestamp is converted to a locale time string for display.  If
 * no trades are provided the component displays a placeholder
 * message.
 *
 * Props
 * -----
 * trades: Array<{ price: string|number, quantity: string|number, side: string, timestamp: string }>
 *     The list of recent trades to display.  Trades should be in
 *     descending order (most recent first) for a natural
 *     chronological reading.
 */
export default function TradeList({ trades }) {
  return (
    <div className="mt-6">
      <h4 className="font-semibold mb-2">Recent Trades</h4>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left border-b">
              <th className="py-1 pr-2">Price</th>
              <th className="py-1 pr-2">Quantity</th>
              <th className="py-1">Time</th>
            </tr>
          </thead>
          <tbody>
            {trades && trades.length ? (
              trades.map((trade, idx) => {
                const priceClass =
                  trade.side && trade.side.toLowerCase() === 'buy'
                    ? 'text-green-600'
                    : 'text-red-600';
                const timeString = new Date(trade.timestamp).toLocaleTimeString();
                return (
                  <tr key={idx} className="border-b last:border-b-0">
                    <td className={`py-1 pr-2 ${priceClass}`}>
                      {typeof trade.price === 'number'
                        ? trade.price.toFixed(4)
                        : trade.price}
                    </td>
                    <td className="py-1 pr-2">
                      {typeof trade.quantity === 'number'
                        ? trade.quantity.toFixed(4)
                        : trade.quantity}
                    </td>
                    <td className="py-1">
                      {timeString}
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan="3" className="py-2 text-center text-gray-500">
                  No trades available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
