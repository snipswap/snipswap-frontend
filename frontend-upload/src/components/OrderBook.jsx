import React from 'react';

/**
 * OrderBook component renders the bids and asks for a trading pair.
 *
 * It expects an object with `bids` and `asks` arrays, where each
 * entry has a `price` and `quantity` property.  Bids are assumed
 * sorted descending by price and asks ascending.  Prices are
 * coloured green for bids and red for asks.  This component is
 * purely presentational and does not perform any data fetching.
 *
 * Props
 * -----
 * bids: Array<{ price: string | number, quantity: string | number }>
 *     The list of bid orders.  Highest price first.
 * asks: Array<{ price: string | number, quantity: string | number }>
 *     The list of ask orders.  Lowest price first.
 */
export default function OrderBook({ bids, asks }) {
  return (
    <div className="grid grid-cols-2 gap-4">
      {/* Bids table */}
      <div>
        <h4 className="font-semibold mb-2">Bids</h4>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left border-b">
                <th className="py-1 pr-2">Price</th>
                <th className="py-1">Quantity</th>
              </tr>
            </thead>
            <tbody>
              {bids && bids.length ? (
                bids.map((bid, idx) => (
                  <tr key={idx} className="border-b last:border-b-0">
                    <td className="py-1 pr-2 text-green-600">
                      {typeof bid.price === 'number' ? bid.price.toFixed(4) : bid.price}
                    </td>
                    <td className="py-1">
                      {typeof bid.quantity === 'number' ? bid.quantity.toFixed(4) : bid.quantity}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="2" className="py-2 text-center text-gray-500">
                    No bids available
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      {/* Asks table */}
      <div>
        <h4 className="font-semibold mb-2">Asks</h4>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left border-b">
                <th className="py-1 pr-2">Price</th>
                <th className="py-1">Quantity</th>
              </tr>
            </thead>
            <tbody>
              {asks && asks.length ? (
                asks.map((ask, idx) => (
                  <tr key={idx} className="border-b last:border-b-0">
                    <td className="py-1 pr-2 text-red-600">
                      {typeof ask.price === 'number' ? ask.price.toFixed(4) : ask.price}
                    </td>
                    <td className="py-1">
                      {typeof ask.quantity === 'number' ? ask.quantity.toFixed(4) : ask.quantity}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="2" className="py-2 text-center text-gray-500">
                    No asks available
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
