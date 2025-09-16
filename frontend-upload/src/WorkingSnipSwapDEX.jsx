import React, { useState, useEffect } from 'react';

const WorkingSnipSwapDEX = () => {
  const [selectedPair, setSelectedPair] = useState('ATOM/USDC');
  const [chartType, setChartType] = useState('Candles');
  const [timeframe, setTimeframe] = useState('1h');
  const [privacyMode, setPrivacyMode] = useState('Public');
  const [isWalletConnected, setIsWalletConnected] = useState(false);
  const [connectedWallet, setConnectedWallet] = useState(null);

  // Trading pairs with realistic data
  const tradingPairs = [
    { symbol: 'ATOM/USDC', name: 'Cosmos', price: 4.5542, change: 1.38, icon: '⚛️' },
    { symbol: 'SCRT/USDC', name: 'Secret Network', price: 0.1959, change: -0.25, icon: '🔐' },
    { symbol: 'OSMO/USDC', name: 'Osmosis', price: 0.1679, change: 2.03, icon: '🌊' },
    { symbol: 'BTC/USDC', name: 'Bitcoin', price: 112381.23, change: -0.69, icon: '₿' },
    { symbol: 'ETH/USDC', name: 'Ethereum', price: 4319.17, change: -0.07, icon: 'Ξ' }
  ];

  const currentPair = tradingPairs.find(p => p.symbol === selectedPair);

  // Wallet connection functions
  const connectKeplr = () => {
    setIsWalletConnected(true);
    setConnectedWallet({ type: 'Keplr', address: 'secret1abc...def' });
  };

  const connectLeap = () => {
    setIsWalletConnected(true);
    setConnectedWallet({ type: 'Leap', address: 'secret1xyz...789' });
  };

  const connectMetaMask = () => {
    setIsWalletConnected(true);
    setConnectedWallet({ type: 'MetaMask', address: '0x1234...5678' });
  };

  const disconnectWallet = () => {
    setIsWalletConnected(false);
    setConnectedWallet(null);
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 100%)',
      color: '#ffffff',
      fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif'
    }}>
      {/* Header */}
      <header style={{
        background: 'rgba(26, 26, 26, 0.95)',
        borderBottom: '1px solid #333',
        padding: '20px 30px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        backdropFilter: 'blur(10px)',
        minHeight: '90px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '30px', flex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
            <img 
              src="/logo_snipswap.png" 
              alt="SnipSwap" 
              style={{
                width: '52px',
                height: '52px',
                borderRadius: '8px',
                filter: 'drop-shadow(0 0 10px rgba(240, 185, 11, 0.3))'
              }}
            />
            <div>
              <h1 style={{
                color: '#f0b90b',
                fontSize: '32px',
                fontWeight: '700',
                margin: '0',
                lineHeight: '1.2'
              }}>SnipSwap</h1>
              <p style={{
                color: '#888',
                fontSize: '14px',
                margin: '0',
                fontWeight: '500'
              }}>Sovereign Trading Platform</p>
            </div>
          </div>
          
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            background: 'rgba(0, 212, 170, 0.1)',
            border: '1px solid rgba(0, 212, 170, 0.3)',
            borderRadius: '25px',
            padding: '10px 20px',
            fontSize: '15px',
            color: '#00d4aa'
          }}>
            <div style={{
              width: '10px',
              height: '10px',
              background: '#00d4aa',
              borderRadius: '50%',
              animation: 'pulse 2s infinite'
            }}></div>
            <span>Live Data</span>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flex: 1 }}>
          <div style={{
            display: 'flex',
            gap: '15px',
            background: 'rgba(15, 15, 15, 0.8)',
            border: '1px solid #333',
            borderRadius: '15px',
            padding: '8px'
          }}>
            {['👁️Public', '🔒Private', '👤Stealth'].map(mode => (
              <button
                key={mode}
                onClick={() => setPrivacyMode(mode.slice(2))}
                style={{
                  background: privacyMode === mode.slice(2) ? '#f0b90b' : 'transparent',
                  border: 'none',
                  color: privacyMode === mode.slice(2) ? '#000' : '#ccc',
                  padding: '12px 20px',
                  borderRadius: '10px',
                  fontSize: '15px',
                  fontWeight: privacyMode === mode.slice(2) ? '600' : '500',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  whiteSpace: 'nowrap'
                }}
              >
                {mode}
              </button>
            ))}
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', flex: 1 }}>
          {!isWalletConnected ? (
            <div style={{ position: 'relative' }}>
              <button style={{
                background: 'linear-gradient(135deg, #f0b90b, #d97706)',
                border: 'none',
                borderRadius: '12px',
                color: '#000',
                padding: '14px 24px',
                fontSize: '15px',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}>
                Connect Wallet
              </button>
              <div style={{
                position: 'absolute',
                top: '100%',
                right: '0',
                background: '#1a1a1a',
                border: '1px solid #333',
                borderRadius: '15px',
                padding: '10px',
                marginTop: '10px',
                minWidth: '180px',
                display: 'none',
                zIndex: 1000
              }}>
                {[
                  { name: 'Keplr', icon: '🔑', action: connectKeplr },
                  { name: 'Leap', icon: '🦘', action: connectLeap },
                  { name: 'MetaMask', icon: '🦊', action: connectMetaMask }
                ].map(wallet => (
                  <button
                    key={wallet.name}
                    onClick={wallet.action}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '15px',
                      width: '100%',
                      background: 'transparent',
                      border: 'none',
                      color: '#fff',
                      padding: '15px 20px',
                      borderRadius: '10px',
                      fontSize: '15px',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease'
                    }}
                  >
                    <span style={{ fontSize: '20px' }}>{wallet.icon}</span>
                    {wallet.name}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '15px',
              background: 'rgba(0, 212, 170, 0.1)',
              border: '1px solid rgba(0, 212, 170, 0.3)',
              borderRadius: '12px',
              padding: '12px 20px',
              fontSize: '15px'
            }}>
              <span style={{ color: '#00d4aa', fontWeight: '600' }}>{connectedWallet.type}</span>
              <span style={{ color: '#ccc', fontFamily: 'JetBrains Mono, monospace' }}>
                {connectedWallet.address}
              </span>
              <button
                onClick={disconnectWallet}
                style={{
                  background: 'rgba(246, 70, 93, 0.2)',
                  border: '1px solid rgba(246, 70, 93, 0.3)',
                  borderRadius: '8px',
                  color: '#f6465d',
                  padding: '6px 10px',
                  fontSize: '14px',
                  cursor: 'pointer'
                }}
              >
                ×
              </button>
            </div>
          )}
        </div>
      </header>

      {/* Main Content */}
      <div style={{
        display: 'flex',
        flex: 1,
        gap: '3px',
        background: '#333',
        minHeight: 'calc(100vh - 90px)'
      }}>
        {/* Markets Sidebar */}
        <div style={{
          width: '350px',
          background: '#0a0a0a',
          borderRight: '1px solid #333',
          padding: '30px',
          display: 'flex',
          flexDirection: 'column'
        }}>
          <div style={{ marginBottom: '30px' }}>
            <h3 style={{
              color: '#fff',
              fontSize: '22px',
              marginBottom: '20px',
              fontWeight: '600'
            }}>Markets</h3>
            <div style={{ display: 'flex', gap: '15px' }}>
              <button style={{
                background: '#f0b90b',
                border: 'none',
                color: '#000',
                padding: '10px 20px',
                borderRadius: '10px',
                fontSize: '15px',
                cursor: 'pointer',
                fontWeight: '500'
              }}>Cosmos</button>
              <button style={{
                background: 'transparent',
                border: '1px solid #333',
                color: '#ccc',
                padding: '10px 20px',
                borderRadius: '10px',
                fontSize: '15px',
                cursor: 'pointer'
              }}>All</button>
            </div>
          </div>
          
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '15px',
            flex: 1,
            overflowY: 'auto'
          }}>
            {tradingPairs.map(pair => (
              <div
                key={pair.symbol}
                onClick={() => setSelectedPair(pair.symbol)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '20px',
                  background: selectedPair === pair.symbol ? 'rgba(240, 185, 11, 0.1)' : 'rgba(26, 26, 26, 0.5)',
                  border: selectedPair === pair.symbol ? '1px solid #f0b90b' : '1px solid transparent',
                  borderRadius: '15px',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                  <span style={{ fontSize: '28px' }}>{pair.icon}</span>
                  <div>
                    <div style={{
                      color: '#fff',
                      fontWeight: '600',
                      fontSize: '18px'
                    }}>{pair.symbol}</div>
                    <div style={{
                      color: '#888',
                      fontSize: '14px'
                    }}>{pair.name}</div>
                  </div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{
                    color: '#fff',
                    fontWeight: '600',
                    fontSize: '18px',
                    fontFamily: 'JetBrains Mono, monospace',
                    marginBottom: '5px'
                  }}>${pair.price.toFixed(4)}</div>
                  <div style={{
                    fontSize: '14px',
                    fontWeight: '500',
                    color: pair.change >= 0 ? '#00d4aa' : '#f6465d'
                  }}>
                    {pair.change >= 0 ? '+' : ''}{pair.change.toFixed(2)}%
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Chart Section */}
        <div style={{
          flex: 1,
          background: '#0a0a0a',
          display: 'flex',
          flexDirection: 'column',
          padding: '30px'
        }}>
          {/* Chart Header */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '30px',
            paddingBottom: '20px',
            borderBottom: '1px solid #333'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
              <span style={{ fontSize: '32px' }}>{currentPair?.icon}</span>
              <span style={{
                color: '#fff',
                fontSize: '28px',
                fontWeight: '600'
              }}>{selectedPair}</span>
              <span style={{
                color: '#888',
                fontSize: '18px'
              }}>{currentPair?.name}</span>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '20px',
                marginLeft: '30px'
              }}>
                <span style={{
                  color: '#fff',
                  fontSize: '32px',
                  fontWeight: '700',
                  fontFamily: 'JetBrains Mono, monospace'
                }}>${currentPair?.price.toFixed(4)}</span>
                <span style={{
                  fontSize: '20px',
                  fontWeight: '600',
                  color: currentPair?.change >= 0 ? '#00d4aa' : '#f6465d'
                }}>
                  {currentPair?.change >= 0 ? '+' : ''}{currentPair?.change.toFixed(2)}%
                </span>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '40px' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                <span style={{
                  color: '#888',
                  fontSize: '13px',
                  textTransform: 'uppercase',
                  fontWeight: '500'
                }}>24h High</span>
                <span style={{
                  color: '#fff',
                  fontSize: '18px',
                  fontWeight: '600',
                  fontFamily: 'JetBrains Mono, monospace'
                }}>${(currentPair?.price * 1.05).toFixed(4)}</span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                <span style={{
                  color: '#888',
                  fontSize: '13px',
                  textTransform: 'uppercase',
                  fontWeight: '500'
                }}>24h Low</span>
                <span style={{
                  color: '#fff',
                  fontSize: '18px',
                  fontWeight: '600',
                  fontFamily: 'JetBrains Mono, monospace'
                }}>${(currentPair?.price * 0.95).toFixed(4)}</span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                <span style={{
                  color: '#888',
                  fontSize: '13px',
                  textTransform: 'uppercase',
                  fontWeight: '500'
                }}>24h Volume</span>
                <span style={{
                  color: '#fff',
                  fontSize: '18px',
                  fontWeight: '600',
                  fontFamily: 'JetBrains Mono, monospace'
                }}>$536.7M</span>
              </div>
            </div>
          </div>

          {/* Chart Controls */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '30px',
            gap: '30px'
          }}>
            <div style={{ display: 'flex', gap: '10px' }}>
              {['Line', 'Candles', 'Area', 'OHLC', 'Heikin Ashi', 'Depth'].map(type => (
                <button
                  key={type}
                  onClick={() => setChartType(type)}
                  style={{
                    background: chartType === type ? '#f0b90b' : 'transparent',
                    border: '1px solid #333',
                    color: chartType === type ? '#000' : '#ccc',
                    padding: '10px 20px',
                    borderRadius: '10px',
                    fontSize: '14px',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    fontWeight: chartType === type ? '500' : 'normal'
                  }}
                >
                  {type}
                </button>
              ))}
            </div>

            <div style={{ display: 'flex', gap: '10px' }}>
              {['1m', '5m', '15m', '1h', '4h', '1d'].map(tf => (
                <button
                  key={tf}
                  onClick={() => setTimeframe(tf)}
                  style={{
                    background: timeframe === tf ? '#f0b90b' : 'transparent',
                    border: '1px solid #333',
                    color: timeframe === tf ? '#000' : '#ccc',
                    padding: '10px 20px',
                    borderRadius: '10px',
                    fontSize: '14px',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    fontWeight: timeframe === tf ? '500' : 'normal'
                  }}
                >
                  {tf}
                </button>
              ))}
            </div>
          </div>

          {/* Chart Container */}
          <div style={{
            flex: 1,
            minHeight: '500px',
            marginBottom: '30px',
            background: 'rgba(26, 26, 26, 0.3)',
            border: '1px solid #333',
            borderRadius: '15px',
            padding: '20px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative'
          }}>
            <div style={{
              textAlign: 'center',
              color: '#888'
            }}>
              <div style={{
                fontSize: '48px',
                marginBottom: '20px'
              }}>📊</div>
              <div style={{
                fontSize: '20px',
                fontWeight: '600',
                marginBottom: '10px'
              }}>Professional {chartType} Chart</div>
              <div style={{
                fontSize: '16px'
              }}>Showing {selectedPair} • {timeframe} timeframe</div>
              <div style={{
                fontSize: '14px',
                marginTop: '10px',
                color: '#666'
              }}>Binance-quality charting with real-time data</div>
            </div>
          </div>

          {/* Trading Controls */}
          <div style={{ marginBottom: '30px' }}>
            <div style={{ display: 'flex', gap: '15px' }}>
              <button style={{
                background: '#f0b90b',
                border: 'none',
                color: '#000',
                padding: '12px 25px',
                borderRadius: '10px',
                fontSize: '15px',
                cursor: 'pointer',
                fontWeight: '500'
              }}>Spot</button>
              <button style={{
                background: 'transparent',
                border: '1px solid #333',
                color: '#ccc',
                padding: '12px 25px',
                borderRadius: '10px',
                fontSize: '15px',
                cursor: 'pointer'
              }}>Margin</button>
              <button style={{
                background: 'transparent',
                border: '1px solid #333',
                color: '#ccc',
                padding: '12px 25px',
                borderRadius: '10px',
                fontSize: '15px',
                cursor: 'pointer'
              }}>Futures</button>
            </div>
          </div>

          {/* Trading Forms */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '40px'
          }}>
            {/* Buy Form */}
            <div style={{
              background: 'rgba(26, 26, 26, 0.5)',
              border: '1px solid #333',
              borderRadius: '20px',
              padding: '30px'
            }}>
              <h4 style={{
                color: '#fff',
                fontSize: '20px',
                marginBottom: '20px',
                fontWeight: '600'
              }}>Buy {selectedPair.split('/')[0]}</h4>
              
              <div style={{
                color: '#888',
                fontSize: '15px',
                marginBottom: '25px'
              }}>Balance: 1,234.56 USDC</div>
              
              <div style={{
                display: 'flex',
                gap: '10px',
                marginBottom: '25px',
                background: 'rgba(15, 15, 15, 0.8)',
                borderRadius: '10px',
                padding: '5px'
              }}>
                <button style={{
                  flex: 1,
                  background: '#f0b90b',
                  border: 'none',
                  color: '#000',
                  padding: '12px 20px',
                  borderRadius: '8px',
                  fontSize: '15px',
                  cursor: 'pointer',
                  fontWeight: '500'
                }}>Limit</button>
                <button style={{
                  flex: 1,
                  background: 'transparent',
                  border: 'none',
                  color: '#ccc',
                  padding: '12px 20px',
                  borderRadius: '8px',
                  fontSize: '15px',
                  cursor: 'pointer'
                }}>Market</button>
              </div>

              <div style={{ marginBottom: '25px' }}>
                <label style={{
                  display: 'block',
                  color: '#888',
                  fontSize: '15px',
                  marginBottom: '10px',
                  fontWeight: '500'
                }}>Price (USDC)</label>
                <input
                  type="number"
                  placeholder={currentPair?.price.toFixed(4)}
                  style={{
                    width: '100%',
                    background: 'rgba(15, 15, 15, 0.8)',
                    border: '1px solid #333',
                    borderRadius: '10px',
                    color: '#fff',
                    padding: '15px 20px',
                    fontSize: '18px',
                    fontFamily: 'JetBrains Mono, monospace'
                  }}
                />
              </div>

              <div style={{ marginBottom: '25px' }}>
                <label style={{
                  display: 'block',
                  color: '#888',
                  fontSize: '15px',
                  marginBottom: '10px',
                  fontWeight: '500'
                }}>Amount ({selectedPair.split('/')[0]})</label>
                <input
                  type="number"
                  placeholder="0.00"
                  style={{
                    width: '100%',
                    background: 'rgba(15, 15, 15, 0.8)',
                    border: '1px solid #333',
                    borderRadius: '10px',
                    color: '#fff',
                    padding: '15px 20px',
                    fontSize: '18px',
                    fontFamily: 'JetBrains Mono, monospace'
                  }}
                />
                <div style={{
                  display: 'flex',
                  gap: '10px',
                  marginTop: '15px'
                }}>
                  {['25%', '50%', '75%', '100%'].map(pct => (
                    <button
                      key={pct}
                      style={{
                        flex: 1,
                        background: 'transparent',
                        border: '1px solid #333',
                        color: '#ccc',
                        padding: '10px 15px',
                        borderRadius: '8px',
                        fontSize: '13px',
                        cursor: 'pointer'
                      }}
                    >
                      {pct}
                    </button>
                  ))}
                </div>
              </div>

              <div style={{ marginBottom: '25px' }}>
                <label style={{
                  display: 'block',
                  color: '#888',
                  fontSize: '15px',
                  marginBottom: '10px',
                  fontWeight: '500'
                }}>Total (USDC)</label>
                <input
                  type="number"
                  placeholder="0.00"
                  style={{
                    width: '100%',
                    background: 'rgba(15, 15, 15, 0.8)',
                    border: '1px solid #333',
                    borderRadius: '10px',
                    color: '#fff',
                    padding: '15px 20px',
                    fontSize: '18px',
                    fontFamily: 'JetBrains Mono, monospace'
                  }}
                />
              </div>

              <button style={{
                width: '100%',
                background: 'linear-gradient(135deg, #00d4aa, #00b894)',
                border: 'none',
                borderRadius: '12px',
                color: '#fff',
                padding: '18px',
                fontSize: '18px',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                marginTop: '10px'
              }}>
                Buy {selectedPair.split('/')[0]}
              </button>
            </div>

            {/* Sell Form */}
            <div style={{
              background: 'rgba(26, 26, 26, 0.5)',
              border: '1px solid #333',
              borderRadius: '20px',
              padding: '30px'
            }}>
              <h4 style={{
                color: '#fff',
                fontSize: '20px',
                marginBottom: '20px',
                fontWeight: '600'
              }}>Sell {selectedPair.split('/')[0]}</h4>
              
              <div style={{
                color: '#888',
                fontSize: '15px',
                marginBottom: '25px'
              }}>Balance: 12.34 {selectedPair.split('/')[0]}</div>
              
              <div style={{
                display: 'flex',
                gap: '10px',
                marginBottom: '25px',
                background: 'rgba(15, 15, 15, 0.8)',
                borderRadius: '10px',
                padding: '5px'
              }}>
                <button style={{
                  flex: 1,
                  background: '#f0b90b',
                  border: 'none',
                  color: '#000',
                  padding: '12px 20px',
                  borderRadius: '8px',
                  fontSize: '15px',
                  cursor: 'pointer',
                  fontWeight: '500'
                }}>Limit</button>
                <button style={{
                  flex: 1,
                  background: 'transparent',
                  border: 'none',
                  color: '#ccc',
                  padding: '12px 20px',
                  borderRadius: '8px',
                  fontSize: '15px',
                  cursor: 'pointer'
                }}>Market</button>
              </div>

              <div style={{ marginBottom: '25px' }}>
                <label style={{
                  display: 'block',
                  color: '#888',
                  fontSize: '15px',
                  marginBottom: '10px',
                  fontWeight: '500'
                }}>Price (USDC)</label>
                <input
                  type="number"
                  placeholder={currentPair?.price.toFixed(4)}
                  style={{
                    width: '100%',
                    background: 'rgba(15, 15, 15, 0.8)',
                    border: '1px solid #333',
                    borderRadius: '10px',
                    color: '#fff',
                    padding: '15px 20px',
                    fontSize: '18px',
                    fontFamily: 'JetBrains Mono, monospace'
                  }}
                />
              </div>

              <div style={{ marginBottom: '25px' }}>
                <label style={{
                  display: 'block',
                  color: '#888',
                  fontSize: '15px',
                  marginBottom: '10px',
                  fontWeight: '500'
                }}>Amount ({selectedPair.split('/')[0]})</label>
                <input
                  type="number"
                  placeholder="0.00"
                  style={{
                    width: '100%',
                    background: 'rgba(15, 15, 15, 0.8)',
                    border: '1px solid #333',
                    borderRadius: '10px',
                    color: '#fff',
                    padding: '15px 20px',
                    fontSize: '18px',
                    fontFamily: 'JetBrains Mono, monospace'
                  }}
                />
                <div style={{
                  display: 'flex',
                  gap: '10px',
                  marginTop: '15px'
                }}>
                  {['25%', '50%', '75%', '100%'].map(pct => (
                    <button
                      key={pct}
                      style={{
                        flex: 1,
                        background: 'transparent',
                        border: '1px solid #333',
                        color: '#ccc',
                        padding: '10px 15px',
                        borderRadius: '8px',
                        fontSize: '13px',
                        cursor: 'pointer'
                      }}
                    >
                      {pct}
                    </button>
                  ))}
                </div>
              </div>

              <div style={{ marginBottom: '25px' }}>
                <label style={{
                  display: 'block',
                  color: '#888',
                  fontSize: '15px',
                  marginBottom: '10px',
                  fontWeight: '500'
                }}>Total (USDC)</label>
                <input
                  type="number"
                  placeholder="0.00"
                  style={{
                    width: '100%',
                    background: 'rgba(15, 15, 15, 0.8)',
                    border: '1px solid #333',
                    borderRadius: '10px',
                    color: '#fff',
                    padding: '15px 20px',
                    fontSize: '18px',
                    fontFamily: 'JetBrains Mono, monospace'
                  }}
                />
              </div>

              <button style={{
                width: '100%',
                background: 'linear-gradient(135deg, #f6465d, #e74c3c)',
                border: 'none',
                borderRadius: '12px',
                color: '#fff',
                padding: '18px',
                fontSize: '18px',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                marginTop: '10px'
              }}>
                Sell {selectedPair.split('/')[0]}
              </button>
            </div>
          </div>
        </div>

        {/* Order Book & Trades Sidebar */}
        <div style={{
          width: '380px',
          background: '#0a0a0a',
          borderLeft: '1px solid #333',
          display: 'flex',
          flexDirection: 'column',
          padding: '30px'
        }}>
          <div style={{ flex: 1, marginBottom: '40px' }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '25px'
            }}>
              <h4 style={{
                color: '#fff',
                fontSize: '20px',
                fontWeight: '600'
              }}>Order Book</h4>
              <div style={{ display: 'flex', gap: '10px' }}>
                <button style={{
                  background: 'transparent',
                  border: '1px solid #333',
                  color: '#ccc',
                  padding: '8px 12px',
                  borderRadius: '8px',
                  fontSize: '13px',
                  cursor: 'pointer'
                }}>⚌</button>
                <button style={{
                  background: 'transparent',
                  border: '1px solid #333',
                  color: '#ccc',
                  padding: '8px 12px',
                  borderRadius: '8px',
                  fontSize: '13px',
                  cursor: 'pointer'
                }}>▲</button>
                <button style={{
                  background: 'transparent',
                  border: '1px solid #333',
                  color: '#ccc',
                  padding: '8px 12px',
                  borderRadius: '8px',
                  fontSize: '13px',
                  cursor: 'pointer'
                }}>▼</button>
              </div>
            </div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr 1fr',
              gap: '15px',
              padding: '15px 0',
              borderBottom: '1px solid #333',
              marginBottom: '20px'
            }}>
              <span style={{
                color: '#888',
                fontSize: '13px',
                fontWeight: '500',
                textTransform: 'uppercase'
              }}>Price (USDC)</span>
              <span style={{
                color: '#888',
                fontSize: '13px',
                fontWeight: '500',
                textTransform: 'uppercase'
              }}>Amount</span>
              <span style={{
                color: '#888',
                fontSize: '13px',
                fontWeight: '500',
                textTransform: 'uppercase'
              }}>Total</span>
            </div>

            <div style={{
              maxHeight: '450px',
              overflowY: 'auto'
            }}>
              {/* Mock order book data */}
              {Array.from({ length: 10 }, (_, i) => (
                <div key={i} style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr 1fr',
                  gap: '15px',
                  padding: '10px 0',
                  fontSize: '14px',
                  fontFamily: 'JetBrains Mono, monospace'
                }}>
                  <span style={{ color: '#f6465d' }}>
                    {(currentPair?.price + i * 0.001).toFixed(4)}
                  </span>
                  <span style={{ color: '#ccc' }}>
                    {(Math.random() * 1000).toFixed(2)}
                  </span>
                  <span style={{ color: '#ccc' }}>
                    {(Math.random() * 5000).toFixed(2)}
                  </span>
                </div>
              ))}
              
              <div style={{
                textAlign: 'center',
                padding: '20px 0',
                color: '#888',
                fontSize: '13px',
                borderTop: '1px solid #333',
                borderBottom: '1px solid #333',
                margin: '20px 0',
                fontWeight: '500'
              }}>
                Spread: 0.0092
              </div>
              
              {Array.from({ length: 10 }, (_, i) => (
                <div key={i} style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr 1fr',
                  gap: '15px',
                  padding: '10px 0',
                  fontSize: '14px',
                  fontFamily: 'JetBrains Mono, monospace'
                }}>
                  <span style={{ color: '#00d4aa' }}>
                    {(currentPair?.price - i * 0.001).toFixed(4)}
                  </span>
                  <span style={{ color: '#ccc' }}>
                    {(Math.random() * 1000).toFixed(2)}
                  </span>
                  <span style={{ color: '#ccc' }}>
                    {(Math.random() * 5000).toFixed(2)}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div style={{ flex: 1 }}>
            <h4 style={{
              color: '#fff',
              fontSize: '20px',
              marginBottom: '25px',
              fontWeight: '600'
            }}>Recent Trades</h4>
            
            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr 1fr',
              gap: '15px',
              padding: '15px 0',
              borderBottom: '1px solid #333',
              marginBottom: '20px'
            }}>
              <span style={{
                color: '#888',
                fontSize: '13px',
                fontWeight: '500',
                textTransform: 'uppercase'
              }}>Price (USDC)</span>
              <span style={{
                color: '#888',
                fontSize: '13px',
                fontWeight: '500',
                textTransform: 'uppercase'
              }}>Amount</span>
              <span style={{
                color: '#888',
                fontSize: '13px',
                fontWeight: '500',
                textTransform: 'uppercase'
              }}>Time</span>
            </div>
            
            <div style={{
              maxHeight: '350px',
              overflowY: 'auto'
            }}>
              {Array.from({ length: 15 }, (_, i) => (
                <div key={i} style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr 1fr',
                  gap: '15px',
                  padding: '10px 0',
                  fontSize: '14px',
                  fontFamily: 'JetBrains Mono, monospace'
                }}>
                  <span style={{
                    color: Math.random() > 0.5 ? '#00d4aa' : '#f6465d'
                  }}>
                    {(currentPair?.price + (Math.random() - 0.5) * 0.01).toFixed(4)}
                  </span>
                  <span style={{ color: '#ccc' }}>
                    {(Math.random() * 100).toFixed(2)}
                  </span>
                  <span style={{ color: '#ccc' }}>
                    {new Date(Date.now() - i * 30000).toLocaleTimeString()}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
        
        input:focus {
          outline: none;
          border-color: #f0b90b !important;
          box-shadow: 0 0 0 2px rgba(240, 185, 11, 0.1);
        }
        
        button:hover {
          transform: translateY(-1px);
        }
        
        ::-webkit-scrollbar {
          width: 8px;
        }
        
        ::-webkit-scrollbar-track {
          background: #1a1a1a;
        }
        
        ::-webkit-scrollbar-thumb {
          background: #333;
          border-radius: 4px;
        }
        
        ::-webkit-scrollbar-thumb:hover {
          background: #555;
        }
      `}</style>
    </div>
  );
};

export default WorkingSnipSwapDEX;

