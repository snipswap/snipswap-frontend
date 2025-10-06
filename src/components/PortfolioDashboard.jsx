import React, { useState, useEffect } from 'react';
import walletService from '../services/walletService';

const PortfolioDashboard = ({ isOpen, onClose }) => {
  const [portfolio, setPortfolio] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    if (isOpen) {
      loadPortfolioData();
    }
  }, [isOpen]);

  const loadPortfolioData = async () => {
    setLoading(true);
    try {
      const portfolioData = walletService.getPortfolioSummary();
      setPortfolio(portfolioData);
      
      if (portfolioData.connected) {
        const txHistory = await walletService.getTransactionHistory(10);
        setTransactions(txHistory.transactions || []);
      }
    } catch (error) {
      console.error('Failed to load portfolio data:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatAddress = (address) => {
    if (!address) return '';
    return `${address.slice(0, 6)}...${address.slice(-6)}`;
  };

  const formatAmount = (amount) => {
    if (amount >= 1000000) {
      return `${(amount / 1000000).toFixed(2)}M`;
    } else if (amount >= 1000) {
      return `${(amount / 1000).toFixed(2)}K`;
    }
    return amount.toFixed(6);
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    // Could add a toast notification here
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-[#1E2329] rounded-lg w-[800px] max-w-[90vw] max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-[#2B3139]">
          <h2 className="text-xl font-bold text-white">Portfolio Dashboard</h2>
          <button
            onClick={onClose}
            className="text-[#848E9C] hover:text-white transition-colors"
          >
            ✕
          </button>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="animate-spin w-8 h-8 border-4 border-[#F0B90B] border-t-transparent rounded-full"></div>
          </div>
        ) : !portfolio?.connected ? (
          <div className="text-center py-20">
            <div className="text-4xl mb-4">👛</div>
            <p className="text-[#848E9C]">No wallet connected</p>
          </div>
        ) : (
          <div className="flex flex-col h-[600px]">
            {/* Tabs */}
            <div className="flex border-b border-[#2B3139]">
              {[
                { key: 'overview', label: 'Overview', icon: '📊' },
                { key: 'balances', label: 'Balances', icon: '💰' },
                { key: 'transactions', label: 'History', icon: '📋' },
                { key: 'privacy', label: 'Privacy', icon: '🔒' }
              ].map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  className={`flex items-center space-x-2 px-6 py-4 border-b-2 transition-colors ${
                    activeTab === tab.key
                      ? 'border-[#F0B90B] text-[#F0B90B]'
                      : 'border-transparent text-[#848E9C] hover:text-white'
                  }`}
                >
                  <span>{tab.icon}</span>
                  <span>{tab.label}</span>
                </button>
              ))}
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-6">
              {activeTab === 'overview' && (
                <div className="space-y-6">
                  {/* Account Info */}
                  <div className="bg-[#0B0E11] rounded-lg p-4">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-white font-semibold">Account Information</h3>
                      <span className="bg-[#0ECB81] text-white px-2 py-1 rounded text-xs">
                        {portfolio.walletType?.toUpperCase()}
                      </span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-[#F0B90B] rounded-full flex items-center justify-center">
                        <span className="text-black font-bold">
                          {portfolio.address?.charAt(0).toUpperCase()}
                        </span>
                      </div>
                      <div className="flex-1">
                        <div className="text-white font-mono text-sm">
                          {formatAddress(portfolio.address)}
                        </div>
                        <div className="text-[#848E9C] text-xs">
                          Click to copy full address
                        </div>
                      </div>
                      <button
                        onClick={() => copyToClipboard(portfolio.address)}
                        className="text-[#848E9C] hover:text-white transition-colors"
                      >
                        📋
                      </button>
                    </div>
                  </div>

                  {/* Portfolio Value */}
                  <div className="bg-[#0B0E11] rounded-lg p-4">
                    <h3 className="text-[#848E9C] text-sm mb-2">Total Portfolio Value</h3>
                    <div className="text-2xl font-bold text-white mb-1">
                      ${portfolio.totalValue?.toFixed(2) || '0.00'}
                    </div>
                    <div className="text-[#0ECB81] text-sm">
                      +2.34% (24h) {/* Mock data */}
                    </div>
                  </div>

                  {/* Top Holdings */}
                  <div className="bg-[#0B0E11] rounded-lg p-4">
                    <h3 className="text-white font-semibold mb-4">Top Holdings</h3>
                    <div className="space-y-3">
                      {Object.entries(portfolio.distribution || {})
                        .sort((a, b) => b[1].value - a[1].value)
                        .slice(0, 5)
                        .map(([symbol, data]) => (
                          <div key={symbol} className="flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                              <div className="w-8 h-8 bg-[#2B3139] rounded-full flex items-center justify-center">
                                <span className="text-xs font-bold text-white">
                                  {symbol.charAt(0)}
                                </span>
                              </div>
                              <div>
                                <div className="text-white font-semibold">{symbol}</div>
                                <div className="text-[#848E9C] text-sm">
                                  {portfolio.balances[symbol]?.amount.toFixed(6)} {symbol}
                                </div>
                              </div>
                            </div>
                            <div className="text-right">
                              <div className="text-white">${data.value.toFixed(2)}</div>
                              <div className="text-[#848E9C] text-sm">
                                {data.percentage.toFixed(1)}%
                              </div>
                            </div>
                          </div>
                        ))}
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'balances' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-white font-semibold">All Balances</h3>
                    <button
                      onClick={loadPortfolioData}
                      className="text-[#F0B90B] hover:text-white transition-colors text-sm"
                    >
                      🔄 Refresh
                    </button>
                  </div>
                  
                  {Object.entries(portfolio.balances || {}).map(([symbol, balance]) => (
                    <div key={symbol} className="bg-[#0B0E11] rounded-lg p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-[#2B3139] rounded-full flex items-center justify-center">
                            <span className="font-bold text-white">
                              {symbol.charAt(0)}
                            </span>
                          </div>
                          <div>
                            <div className="text-white font-semibold">{symbol}</div>
                            <div className="text-[#848E9C] text-sm">{balance.denom}</div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-white font-semibold">
                            {formatAmount(balance.amount)}
                          </div>
                          <div className="text-[#848E9C] text-sm">
                            ${(balance.amount * walletService.getTokenPrice(symbol)).toFixed(2)}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {activeTab === 'transactions' && (
                <div className="space-y-4">
                  <h3 className="text-white font-semibold">Recent Transactions</h3>
                  
                  {transactions.length === 0 ? (
                    <div className="text-center py-8">
                      <div className="text-4xl mb-4">📋</div>
                      <p className="text-[#848E9C]">No transactions found</p>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {transactions.map((tx, index) => (
                        <div key={index} className="bg-[#0B0E11] rounded-lg p-4">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                                tx.type === 'send' ? 'bg-[#F6465D]' : 'bg-[#0ECB81]'
                              }`}>
                                <span className="text-white text-sm">
                                  {tx.type === 'send' ? '↗' : '↙'}
                                </span>
                              </div>
                              <div>
                                <div className="text-white font-semibold capitalize">
                                  {tx.type} {tx.private && '🔒'}
                                </div>
                                <div className="text-[#848E9C] text-sm">
                                  {new Date(tx.timestamp).toLocaleString()}
                                </div>
                              </div>
                            </div>
                            <div className="text-right">
                              <div className="text-white">
                                {formatAmount(parseFloat(tx.amount))} {tx.denom.replace('u', '').toUpperCase()}
                              </div>
                              <div className="text-[#848E9C] text-sm">
                                {tx.status === 'success' ? '✅ Success' : '⏳ Pending'}
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {activeTab === 'privacy' && (
                <div className="space-y-6">
                  <div className="bg-[#0B0E11] rounded-lg p-4">
                    <h3 className="text-white font-semibold mb-4">Privacy Features</h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="text-white">Private Trading</div>
                          <div className="text-[#848E9C] text-sm">
                            Execute trades privately via Secret Network
                          </div>
                        </div>
                        <button className="bg-[#F0B90B] text-black px-4 py-2 rounded font-semibold">
                          Enable
                        </button>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="text-white">Viewing Keys</div>
                          <div className="text-[#848E9C] text-sm">
                            Manage access to your private data
                          </div>
                        </div>
                        <button className="bg-[#2B3139] text-white px-4 py-2 rounded">
                          Manage
                        </button>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="text-white">Transaction Privacy</div>
                          <div className="text-[#848E9C] text-sm">
                            Hide transaction amounts and recipients
                          </div>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input type="checkbox" className="sr-only peer" />
                          <div className="w-11 h-6 bg-[#2B3139] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#F0B90B]"></div>
                        </label>
                      </div>
                    </div>
                  </div>

                  <div className="bg-[#F0B90B] bg-opacity-10 border border-[#F0B90B] rounded-lg p-4">
                    <div className="flex items-start space-x-3">
                      <span className="text-[#F0B90B] text-xl">🔒</span>
                      <div>
                        <h4 className="text-[#F0B90B] font-semibold mb-2">
                          Secret Network Integration
                        </h4>
                        <p className="text-[#F0B90B] text-sm">
                          SnipSwap leverages Secret Network's privacy-preserving smart contracts 
                          to enable confidential trading. Your trading activity, balances, and 
                          transaction history can be kept private from public blockchain explorers.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PortfolioDashboard;
