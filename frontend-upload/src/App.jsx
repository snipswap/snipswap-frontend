import React, { useState, useEffect, useRef } from 'react';
import { createChart } from 'lightweight-charts';
import priceService from './services/priceService';

const SnipSwapDEX = () => {
  // Market data state
  const [prices, setPrices] = useState({});
  const [selectedSymbol, setSelectedSymbol] = useState('ATOM');
  const [loading, setLoading] = useState(true);
  
  // Chart and indicators
  const [chartData, setChartData] = useState([]);
  const [activeIndicators, setActiveIndicators] = useState({
    MA7: false, MA25: false, MA99: false, EMA12: false, EMA26: false,
    BB: false, RSI: false, MACD: false
  });
  const [timeframe, setTimeframe] = useState('1D');
  
  // Trading interface
  const [orderType, setOrderType] = useState('limit');
  const [orderSide, setOrderSide] = useState('buy');
  const [orderQuantity, setOrderQuantity] = useState('');
  const [orderPrice, setOrderPrice] = useState('');
  
  // Privacy features
  const [privateMode, setPrivateMode] = useState(false);
  
  // Chart refs
  const chartContainerRef = useRef(null);
  const chartRef = useRef(null);
  const candlestickSeriesRef = useRef(null);
  const maSeriesRefs = useRef({});
  
  // Available trading pairs
  const tradingPairs = [
    'ATOM', 'OSMO', 'SCRT', 'JUNO', 'STARS', 'HUAHUA', 'DVPN', 'AKT',
    'INJ', 'LUNA', 'KUJI', 'CMDX', 'BTC', 'ETH'
  ];

  // Fetch prices on mount and periodically
  useEffect(() => {
    const fetchPrices = async () => {
      try {
        const priceData = await priceService.fetchPrices(tradingPairs);
        setPrices(priceData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching prices:', error);
      }
    };

    fetchPrices();
    const interval = setInterval(fetchPrices, 30000);
    return () => clearInterval(interval);
  }, []);

  // Fetch historical data when symbol changes
  useEffect(() => {
    const fetchHistoricalData = async () => {
      try {
        const days = timeframe === '1D' ? 1 : timeframe === '1W' ? 7 : 1;
        const data = await priceService.fetchHistoricalData(selectedSymbol, days);
        setChartData(data);
      } catch (error) {
        console.error('Error fetching historical data:', error);
      }
    };

    if (selectedSymbol) {
      fetchHistoricalData();
    }
  }, [selectedSymbol, timeframe]);

  // Initialize chart
  useEffect(() => {
    if (!chartContainerRef.current || chartData.length === 0) return;

    // Clear existing chart
    if (chartRef.current) {
      chartRef.current.remove();
      chartRef.current = null;
    }

    // Create new chart
    const chart = createChart(chartContainerRef.current, {
      width: chartContainerRef.current.clientWidth,
      height: 400,
      layout: {
        background: { color: '#1E2329' },
        textColor: '#848E9C',
      },
      grid: {
        vertLines: { color: '#2B3139' },
        horzLines: { color: '#2B3139' },
      },
      crosshair: {
        mode: 1,
      },
      rightPriceScale: {
        borderColor: '#2B3139',
      },
      timeScale: {
        borderColor: '#2B3139',
        timeVisible: true,
        secondsVisible: false,
      },
    });

    chartRef.current = chart;

    // Add candlestick series
    const candlestickSeries = chart.addCandlestickSeries({
      upColor: '#0ECB81',
      downColor: '#F6465D',
      borderUpColor: '#0ECB81',
      borderDownColor: '#F6465D',
      wickUpColor: '#0ECB81',
      wickDownColor: '#F6465D',
    });

    candlestickSeriesRef.current = candlestickSeries;

    // Convert data to lightweight-charts format
    const formattedData = chartData.map(candle => ({
      time: Math.floor(candle.timestamp / 1000),
      open: candle.open,
      high: candle.high,
      low: candle.low,
      close: candle.close,
    }));

    candlestickSeries.setData(formattedData);

    // Add current price line
    const currentPrice = prices[selectedSymbol];
    if (currentPrice) {
      candlestickSeries.createPriceLine({
        price: currentPrice.price,
        color: '#F0B90B',
        lineWidth: 2,
        lineStyle: 2, // Dashed
        axisLabelVisible: true,
        title: 'Current',
      });
    }

    // Fit content
    chart.timeScale().fitContent();

    // Handle resize
    const handleResize = () => {
      if (chartContainerRef.current && chartRef.current) {
        chartRef.current.applyOptions({
          width: chartContainerRef.current.clientWidth,
        });
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (chartRef.current) {
        chartRef.current.remove();
      }
    };
  }, [chartData, prices, selectedSymbol]);

  // Update indicators
  useEffect(() => {
    if (!chartRef.current || !candlestickSeriesRef.current || chartData.length === 0) return;

    // Clear existing indicator series
    Object.values(maSeriesRefs.current).forEach(series => {
      if (series) {
        chartRef.current.removeSeries(series);
      }
    });
    maSeriesRefs.current = {};

    // Add MA7
    if (activeIndicators.MA7 && chartData.length >= 7) {
      const ma7Series = chartRef.current.addLineSeries({
        color: '#F7931A',
        lineWidth: 2,
        title: 'MA7',
      });
      const ma7Data = calculateMA(chartData, 7);
      ma7Series.setData(ma7Data);
      maSeriesRefs.current.MA7 = ma7Series;
    }

    // Add MA25
    if (activeIndicators.MA25 && chartData.length >= 25) {
      const ma25Series = chartRef.current.addLineSeries({
        color: '#E91E63',
        lineWidth: 2,
        title: 'MA25',
      });
      const ma25Data = calculateMA(chartData, 25);
      ma25Series.setData(ma25Data);
      maSeriesRefs.current.MA25 = ma25Series;
    }

    // Add MA99
    if (activeIndicators.MA99 && chartData.length >= 99) {
      const ma99Series = chartRef.current.addLineSeries({
        color: '#9C27B0',
        lineWidth: 2,
        title: 'MA99',
      });
      const ma99Data = calculateMA(chartData, 99);
      ma99Series.setData(ma99Data);
      maSeriesRefs.current.MA99 = ma99Series;
    }
  }, [activeIndicators, chartData]);

  // Calculate moving average
  const calculateMA = (data, period) => {
    const ma = [];
    for (let i = period - 1; i < data.length; i++) {
      const sum = data.slice(i - period + 1, i + 1).reduce((acc, candle) => acc + candle.close, 0);
      ma.push({
        time: Math.floor(data[i].timestamp / 1000),
        value: sum / period,
      });
    }
    return ma;
  };

  // Handle symbol change
  const handleSymbolChange = (symbol) => {
    setSelectedSymbol(symbol);
  };

  // Toggle indicator
  const toggleIndicator = (indicator) => {
    setActiveIndicators(prev => ({
      ...prev,
      [indicator]: !prev[indicator]
    }));
  };

  // Format number
  const formatNumber = (num, decimals = 4) => {
    if (!num) return '0';
    return parseFloat(num).toFixed(decimals);
  };

  // Format percentage
  const formatPercentage = (num) => {
    if (!num) return '0.00%';
    const value = parseFloat(num);
    return `${value >= 0 ? '+' : ''}${value.toFixed(2)}%`;
  };

  const currentPrice = prices[selectedSymbol];

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#0B0E11', color: 'white', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}>
      {/* Header */}
      <header style={{ backgroundColor: '#1E2329', borderBottom: '1px solid #2B3139', padding: '12px 16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontSize: '20px', fontWeight: 'bold', color: '#F0B90B' }}>SnipSwap</span>
              <span style={{ fontSize: '14px', color: '#848E9C' }}>Professional Trading</span>
            </div>
            
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#0ECB81' }}></div>
              <span style={{ fontSize: '12px', color: '#848E9C' }}>Live</span>
              <span style={{ fontSize: '11px', backgroundColor: '#0ECB81', color: 'black', padding: '2px 8px', borderRadius: '4px' }}>Real-Time</span>
            </div>
          </div>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontSize: '14px', color: '#848E9C' }}>Private Mode</span>
              <button
                onClick={() => setPrivateMode(!privateMode)}
                style={{
                  width: '48px',
                  height: '24px',
                  borderRadius: '12px',
                  backgroundColor: privateMode ? '#F0B90B' : '#2B3139',
                  border: 'none',
                  cursor: 'pointer',
                  position: 'relative',
                  transition: 'all 0.3s'
                }}
              >
                <div style={{
                  width: '20px',
                  height: '20px',
                  backgroundColor: 'white',
                  borderRadius: '50%',
                  position: 'absolute',
                  top: '2px',
                  left: privateMode ? '26px' : '2px',
                  transition: 'all 0.3s'
                }}></div>
              </button>
              {privateMode && (
                <span style={{ fontSize: '11px', backgroundColor: '#F0B90B', color: 'black', padding: '2px 8px', borderRadius: '4px' }}>🔒 Secret Network</span>
              )}
            </div>
            
            <button style={{
              backgroundColor: '#F0B90B',
              color: 'black',
              padding: '8px 24px',
              borderRadius: '4px',
              fontWeight: '600',
              border: 'none',
              cursor: 'pointer'
            }}>
              Connect Wallet
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div style={{ display: 'flex' }}>
        {/* Left Sidebar - Trading Pairs */}
        <div style={{ width: '256px', backgroundColor: '#1E2329', borderRight: '1px solid #2B3139', padding: '16px', height: 'calc(100vh - 100px)', overflowY: 'auto' }}>
          <h3 style={{ fontSize: '14px', fontWeight: '600', color: '#848E9C', marginBottom: '16px' }}>Available Trading Pairs</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            {tradingPairs.map(symbol => {
              const price = prices[symbol];
              const isSelected = symbol === selectedSymbol;
              
              return (
                <button
                  key={symbol}
                  onClick={() => handleSymbolChange(symbol)}
                  style={{
                    width: '100%',
                    textAlign: 'left',
                    padding: '12px',
                    borderRadius: '4px',
                    backgroundColor: isSelected ? '#2B3139' : 'transparent',
                    border: 'none',
                    color: 'white',
                    cursor: 'pointer',
                    transition: 'background-color 0.2s'
                  }}
                  onMouseEnter={(e) => !isSelected && (e.target.style.backgroundColor = '#2B3139')}
                  onMouseLeave={(e) => !isSelected && (e.target.style.backgroundColor = 'transparent')}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                      <div style={{ fontWeight: '600' }}>{symbol}/USDC</div>
                      {price && (
                        <div style={{ fontSize: '12px', color: '#848E9C' }}>
                          ${formatNumber(price.price)}
                        </div>
                      )}
                    </div>
                    {price && (
                      <div style={{
                        fontSize: '12px',
                        fontWeight: '600',
                        color: price.change_24h >= 0 ? '#0ECB81' : '#F6465D'
                      }}>
                        {formatPercentage(price.change_24h)}
                      </div>
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Main Trading Area */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
          {/* Price Header */}
          <div style={{ backgroundColor: '#1E2329', borderBottom: '1px solid #2B3139', padding: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{
                    width: '32px',
                    height: '32px',
                    backgroundColor: '#F0B90B',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <span style={{ color: 'black', fontWeight: 'bold', fontSize: '14px' }}>{selectedSymbol.slice(0, 2)}</span>
                  </div>
                  <div>
                    <h1 style={{ fontSize: '20px', fontWeight: 'bold', margin: 0 }}>{selectedSymbol}/USDC</h1>
                    {currentPrice && (
                      <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginTop: '4px' }}>
                        <span style={{ fontSize: '24px', fontWeight: 'bold', color: '#0ECB81' }}>
                          ${formatNumber(currentPrice.price)}
                        </span>
                        <span style={{
                          fontSize: '14px',
                          fontWeight: '600',
                          color: currentPrice.change_24h >= 0 ? '#0ECB81' : '#F6465D'
                        }}>
                          {formatPercentage(currentPrice.change_24h)}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
                
                {currentPrice && (
                  <div style={{ display: 'flex', gap: '24px', fontSize: '14px' }}>
                    <div>
                      <div style={{ color: '#848E9C' }}>24h High</div>
                      <div style={{ fontWeight: '600' }}>${formatNumber(currentPrice.high_24h)}</div>
                    </div>
                    <div>
                      <div style={{ color: '#848E9C' }}>24h Low</div>
                      <div style={{ fontWeight: '600' }}>${formatNumber(currentPrice.low_24h)}</div>
                    </div>
                    <div>
                      <div style={{ color: '#848E9C' }}>24h Vol({selectedSymbol})</div>
                      <div style={{ fontWeight: '600' }}>{formatNumber(currentPrice.volume_24h, 0)}</div>
                    </div>
                    <div>
                      <div style={{ color: '#848E9C' }}>Source</div>
                      <div style={{ fontWeight: '600', textTransform: 'capitalize' }}>{currentPrice.source}</div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Chart Area */}
          <div style={{ flex: 1, backgroundColor: '#0B0E11', padding: '16px' }}>
            {/* Chart Controls */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
              <div style={{ display: 'flex', gap: '8px' }}>
                {['1s', '15m', '1H', '4H', '1D', '1W'].map(tf => (
                  <button
                    key={tf}
                    onClick={() => setTimeframe(tf)}
                    style={{
                      padding: '4px 12px',
                      borderRadius: '4px',
                      fontSize: '14px',
                      backgroundColor: timeframe === tf ? '#F0B90B' : '#2B3139',
                      color: timeframe === tf ? 'black' : '#848E9C',
                      border: 'none',
                      cursor: 'pointer',
                      transition: 'all 0.2s'
                    }}
                  >
                    {tf}
                  </button>
                ))}
              </div>
              
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontSize: '14px', color: '#848E9C' }}>Indicators:</span>
                {Object.entries(activeIndicators).map(([indicator, active]) => {
                  const colors = {
                    MA7: '#F7931A',
                    MA25: '#E91E63',
                    MA99: '#9C27B0',
                    EMA12: '#00BCD4',
                    EMA26: '#4CAF50',
                    BB: '#FF9800',
                    RSI: '#2196F3',
                    MACD: '#795548'
                  };
                  
                  return (
                    <button
                      key={indicator}
                      onClick={() => toggleIndicator(indicator)}
                      style={{
                        padding: '4px 8px',
                        borderRadius: '4px',
                        fontSize: '12px',
                        backgroundColor: active ? colors[indicator] : '#2B3139',
                        color: active ? 'white' : '#848E9C',
                        border: 'none',
                        cursor: 'pointer',
                        transition: 'all 0.2s'
                      }}
                    >
                      {indicator}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Chart Container */}
            <div style={{ backgroundColor: '#1E2329', borderRadius: '8px', padding: '16px' }}>
              {loading ? (
                <div style={{ height: '400px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <span style={{ color: '#848E9C' }}>Loading chart data...</span>
                </div>
              ) : (
                <div ref={chartContainerRef} style={{ width: '100%', height: '400px' }} />
              )}
            </div>
          </div>
        </div>

        {/* Right Sidebar - Trading Interface */}
        <div style={{ width: '320px', backgroundColor: '#1E2329', borderLeft: '1px solid #2B3139' }}>
          {/* Trading Interface */}
          <div style={{ padding: '16px', borderBottom: '1px solid #2B3139' }}>
            <div style={{ display: 'flex', gap: '8px', marginBottom: '16px' }}>
              <button
                onClick={() => setOrderSide('buy')}
                style={{
                  flex: 1,
                  padding: '8px',
                  borderRadius: '4px',
                  fontWeight: '600',
                  backgroundColor: orderSide === 'buy' ? '#0ECB81' : '#2B3139',
                  color: orderSide === 'buy' ? 'white' : '#848E9C',
                  border: 'none',
                  cursor: 'pointer',
                  transition: 'all 0.2s'
                }}
              >
                Buy
              </button>
              <button
                onClick={() => setOrderSide('sell')}
                style={{
                  flex: 1,
                  padding: '8px',
                  borderRadius: '4px',
                  fontWeight: '600',
                  backgroundColor: orderSide === 'sell' ? '#F6465D' : '#2B3139',
                  color: orderSide === 'sell' ? 'white' : '#848E9C',
                  border: 'none',
                  cursor: 'pointer',
                  transition: 'all 0.2s'
                }}
              >
                Sell
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '14px', color: '#848E9C', marginBottom: '4px' }}>Order Type</label>
                <select
                  value={orderType}
                  onChange={(e) => setOrderType(e.target.value)}
                  style={{
                    width: '100%',
                    backgroundColor: '#2B3139',
                    border: '1px solid #3C4043',
                    borderRadius: '4px',
                    padding: '8px 12px',
                    color: 'white',
                    fontSize: '14px'
                  }}
                >
                  <option value="limit">Limit</option>
                  <option value="market">Market</option>
                </select>
              </div>

              {orderType === 'limit' && (
                <div>
                  <label style={{ display: 'block', fontSize: '14px', color: '#848E9C', marginBottom: '4px' }}>Price (USDC)</label>
                  <input
                    type="number"
                    value={orderPrice}
                    onChange={(e) => setOrderPrice(e.target.value)}
                    placeholder="0.00"
                    style={{
                      width: '100%',
                      backgroundColor: '#2B3139',
                      border: '1px solid #3C4043',
                      borderRadius: '4px',
                      padding: '8px 12px',
                      color: 'white',
                      fontSize: '14px'
                    }}
                  />
                </div>
              )}

              <div>
                <label style={{ display: 'block', fontSize: '14px', color: '#848E9C', marginBottom: '4px' }}>Quantity ({selectedSymbol})</label>
                <input
                  type="number"
                  value={orderQuantity}
                  onChange={(e) => setOrderQuantity(e.target.value)}
                  placeholder="0.00"
                  style={{
                    width: '100%',
                    backgroundColor: '#2B3139',
                    border: '1px solid #3C4043',
                    borderRadius: '4px',
                    padding: '8px 12px',
                    color: 'white',
                    fontSize: '14px'
                  }}
                />
              </div>

              <button
                style={{
                  width: '100%',
                  padding: '12px',
                  borderRadius: '4px',
                  fontWeight: '600',
                  backgroundColor: orderSide === 'buy' ? '#0ECB81' : '#F6465D',
                  color: 'white',
                  border: 'none',
                  cursor: 'pointer',
                  fontSize: '14px',
                  transition: 'all 0.2s'
                }}
              >
                {orderSide === 'buy' ? 'Buy' : 'Sell'} {selectedSymbol}
              </button>
            </div>
          </div>

          {/* Market Info */}
          <div style={{ padding: '16px' }}>
            <h3 style={{ fontSize: '14px', fontWeight: '600', color: '#848E9C', marginBottom: '12px' }}>Market Information</h3>
            {currentPrice && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '13px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: '#848E9C' }}>Current Price:</span>
                  <span style={{ fontWeight: '600' }}>${formatNumber(currentPrice.price)}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: '#848E9C' }}>24h Change:</span>
                  <span style={{
                    fontWeight: '600',
                    color: currentPrice.change_24h >= 0 ? '#0ECB81' : '#F6465D'
                  }}>
                    {formatPercentage(currentPrice.change_24h)}
                  </span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: '#848E9C' }}>Data Source:</span>
                  <span style={{ fontWeight: '600', textTransform: 'capitalize' }}>{currentPrice.source}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: '#848E9C' }}>Confidence:</span>
                  <span style={{ fontWeight: '600' }}>{(currentPrice.confidence * 100).toFixed(0)}%</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Bottom Status Bar */}
      <div style={{ backgroundColor: '#1E2329', borderTop: '1px solid #2B3139', padding: '8px 16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '12px', color: '#848E9C' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <span>System Status: Operational</span>
            <span>Trading Pairs: {tradingPairs.length}</span>
            <span>Loaded Prices: {Object.keys(prices).length}</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <span>Powered by TradingView • CoinGecko • DeFiLlama</span>
            <span>© 2025 SnipSwap</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SnipSwapDEX;
