import React, { useState, useEffect } from 'react';
import { ResponsiveContainer, ComposedChart, LineChart, AreaChart, BarChart, XAxis, YAxis, CartesianGrid, Tooltip, Line, Area, Bar, ReferenceLine } from 'recharts';
import CandlestickChart from './CandlestickChart.jsx';
import '../styles/AdvancedChart.css';
import { 
  calculateSMA, 
  calculateEMA, 
  calculateRSI, 
  calculateMACD, 
  calculateBollingerBands,
  calculateStochastic,
  calculateVWAP,
  calculateHeikinAshi,
  calculateSupportResistance
} from '../utils/technicalIndicators.js';

const AdvancedTradingChart = ({ data, chartType, selectedPair }) => {
  const [indicators, setIndicators] = useState({
    sma: { enabled: false, period: 20, color: '#ff6b6b' },
    ema: { enabled: false, period: 12, color: '#4ecdc4' },
    bb: { enabled: false, period: 20, stdDev: 2 },
    vwap: { enabled: false, color: '#ffd93d' },
    rsi: { enabled: false, period: 14 },
    macd: { enabled: false, fast: 12, slow: 26, signal: 9 },
    stoch: { enabled: false, k: 14, d: 3 }
  });
  
  const [processedData, setProcessedData] = useState([]);
  const [indicatorData, setIndicatorData] = useState({});
  const [supportResistance, setSupportResistance] = useState([]);

  useEffect(() => {
    if (!data || data.length === 0) return;

    let processed = [...data];
    const indicatorResults = {};

    // Calculate indicators based on enabled state
    if (indicators.sma.enabled) {
      const smaData = calculateSMA(data, indicators.sma.period);
      processed = processed.map((item, index) => ({
        ...item,
        sma: smaData[index - (indicators.sma.period - 1)]?.sma
      }));
    }

    if (indicators.ema.enabled) {
      const emaData = calculateEMA(data, indicators.ema.period);
      processed = processed.map((item, index) => ({
        ...item,
        ema: emaData[index - (indicators.ema.period - 1)]?.ema
      }));
    }

    if (indicators.bb.enabled) {
      const bbData = calculateBollingerBands(data, indicators.bb.period, indicators.bb.stdDev);
      processed = processed.map((item, index) => ({
        ...item,
        bb_upper: bbData[index - (indicators.bb.period - 1)]?.bb_upper,
        bb_middle: bbData[index - (indicators.bb.period - 1)]?.bb_middle,
        bb_lower: bbData[index - (indicators.bb.period - 1)]?.bb_lower
      }));
    }

    if (indicators.vwap.enabled) {
      const vwapData = calculateVWAP(data);
      processed = processed.map((item, index) => ({
        ...item,
        vwap: vwapData[index]?.vwap
      }));
    }

    if (indicators.rsi.enabled) {
      indicatorResults.rsi = calculateRSI(data, indicators.rsi.period);
    }

    if (indicators.macd.enabled) {
      indicatorResults.macd = calculateMACD(data, indicators.macd.fast, indicators.macd.slow, indicators.macd.signal);
    }

    if (indicators.stoch.enabled) {
      indicatorResults.stoch = calculateStochastic(data, indicators.stoch.k, indicators.stoch.d);
    }

    // Calculate support/resistance levels
    const srLevels = calculateSupportResistance(data);
    setSupportResistance(srLevels);

    setProcessedData(processed);
    setIndicatorData(indicatorResults);
  }, [data, indicators]);

  const toggleIndicator = (indicator, settings = {}) => {
    setIndicators(prev => ({
      ...prev,
      [indicator]: {
        ...prev[indicator],
        enabled: !prev[indicator].enabled,
        ...settings
      }
    }));
  };

  const renderMainChart = () => {
    switch (chartType) {
      case 'candlestick':
        return <CandlestickChart data={processedData} />;
      
      case 'heikin-ashi':
        const haData = calculateHeikinAshi(data);
        return <CandlestickChart data={haData} isHeikinAshi={true} />;
      
      case 'line':
        return (
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={processedData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#2a2a2a" />
              <XAxis 
                dataKey="time" 
                tickFormatter={(time) => new Date(time).toLocaleTimeString()}
                stroke="#888"
              />
              <YAxis 
                domain={['dataMin - 0.01', 'dataMax + 0.01']}
                tickFormatter={(value) => `$${value.toFixed(4)}`}
                stroke="#888"
              />
              <Tooltip 
                labelFormatter={(time) => new Date(time).toLocaleString()}
                contentStyle={{
                  backgroundColor: '#1a1a1a',
                  border: '1px solid #333',
                  borderRadius: '8px'
                }}
              />
              <Line 
                type="monotone" 
                dataKey="close" 
                stroke="#00d4aa" 
                strokeWidth={2}
                dot={false}
              />
              
              {/* Moving Averages */}
              {indicators.sma.enabled && (
                <Line 
                  type="monotone" 
                  dataKey="sma" 
                  stroke={indicators.sma.color} 
                  strokeWidth={1}
                  dot={false}
                  strokeDasharray="5 5"
                />
              )}
              
              {indicators.ema.enabled && (
                <Line 
                  type="monotone" 
                  dataKey="ema" 
                  stroke={indicators.ema.color} 
                  strokeWidth={1}
                  dot={false}
                />
              )}
              
              {indicators.vwap.enabled && (
                <Line 
                  type="monotone" 
                  dataKey="vwap" 
                  stroke={indicators.vwap.color} 
                  strokeWidth={1}
                  dot={false}
                  strokeDasharray="3 3"
                />
              )}
              
              {/* Bollinger Bands */}
              {indicators.bb.enabled && (
                <>
                  <Line 
                    type="monotone" 
                    dataKey="bb_upper" 
                    stroke="#9c88ff" 
                    strokeWidth={1}
                    dot={false}
                    strokeOpacity={0.6}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="bb_middle" 
                    stroke="#9c88ff" 
                    strokeWidth={1}
                    dot={false}
                    strokeDasharray="2 2"
                  />
                  <Line 
                    type="monotone" 
                    dataKey="bb_lower" 
                    stroke="#9c88ff" 
                    strokeWidth={1}
                    dot={false}
                    strokeOpacity={0.6}
                  />
                </>
              )}
              
              {/* Support/Resistance Lines */}
              {supportResistance.slice(-5).map((level, index) => (
                <ReferenceLine 
                  key={index}
                  y={level.price} 
                  stroke={level.type === 'support' ? '#4ade80' : '#f87171'} 
                  strokeDasharray="4 4"
                  strokeOpacity={0.7}
                />
              ))}
            </LineChart>
          </ResponsiveContainer>
        );
      
      case 'area':
        return (
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={processedData}>
              <defs>
                <linearGradient id="priceGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#00d4aa" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#00d4aa" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#2a2a2a" />
              <XAxis 
                dataKey="time" 
                tickFormatter={(time) => new Date(time).toLocaleTimeString()}
                stroke="#888"
              />
              <YAxis 
                domain={['dataMin - 0.01', 'dataMax + 0.01']}
                tickFormatter={(value) => `$${value.toFixed(4)}`}
                stroke="#888"
              />
              <Tooltip 
                labelFormatter={(time) => new Date(time).toLocaleString()}
                contentStyle={{
                  backgroundColor: '#1a1a1a',
                  border: '1px solid #333',
                  borderRadius: '8px'
                }}
              />
              <Area 
                type="monotone" 
                dataKey="close" 
                stroke="#00d4aa" 
                strokeWidth={2}
                fill="url(#priceGradient)" 
              />
            </AreaChart>
          </ResponsiveContainer>
        );
      
      case 'ohlc':
        return (
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart data={processedData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#2a2a2a" />
              <XAxis 
                dataKey="time" 
                tickFormatter={(time) => new Date(time).toLocaleTimeString()}
                stroke="#888"
              />
              <YAxis 
                domain={['dataMin - 0.01', 'dataMax + 0.01']}
                tickFormatter={(value) => `$${value.toFixed(4)}`}
                stroke="#888"
              />
              <Tooltip 
                labelFormatter={(time) => new Date(time).toLocaleString()}
                contentStyle={{
                  backgroundColor: '#1a1a1a',
                  border: '1px solid #333',
                  borderRadius: '8px'
                }}
              />
              <Bar dataKey="high" fill="#00d4aa" opacity={0.6} />
              <Line type="monotone" dataKey="open" stroke="#ffd93d" strokeWidth={1} dot={false} />
              <Line type="monotone" dataKey="close" stroke="#00d4aa" strokeWidth={2} dot={false} />
            </ComposedChart>
          </ResponsiveContainer>
        );
      
      default:
        return <CandlestickChart data={processedData} />;
    }
  };

  const renderIndicatorPanel = (indicatorType) => {
    const data = indicatorData[indicatorType];
    if (!data || data.length === 0) return null;

    switch (indicatorType) {
      case 'rsi':
        return (
          <ResponsiveContainer width="100%" height={120}>
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="#2a2a2a" />
              <XAxis 
                dataKey="time" 
                tickFormatter={(time) => new Date(time).toLocaleTimeString()}
                stroke="#888"
                fontSize={10}
              />
              <YAxis 
                domain={[0, 100]}
                stroke="#888"
                fontSize={10}
              />
              <Tooltip 
                labelFormatter={(time) => new Date(time).toLocaleString()}
                formatter={(value) => [`${value.toFixed(2)}`, 'RSI']}
                contentStyle={{
                  backgroundColor: '#1a1a1a',
                  border: '1px solid #333',
                  borderRadius: '8px'
                }}
              />
              <Line 
                type="monotone" 
                dataKey="rsi" 
                stroke="#ff6b6b" 
                strokeWidth={2}
                dot={false}
              />
              <ReferenceLine y={70} stroke="#f87171" strokeDasharray="2 2" strokeOpacity={0.5} />
              <ReferenceLine y={30} stroke="#4ade80" strokeDasharray="2 2" strokeOpacity={0.5} />
            </LineChart>
          </ResponsiveContainer>
        );
      
      case 'macd':
        return (
          <ResponsiveContainer width="100%" height={120}>
            <ComposedChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="#2a2a2a" />
              <XAxis 
                dataKey="time" 
                tickFormatter={(time) => new Date(time).toLocaleTimeString()}
                stroke="#888"
                fontSize={10}
              />
              <YAxis stroke="#888" fontSize={10} />
              <Tooltip 
                labelFormatter={(time) => new Date(time).toLocaleString()}
                contentStyle={{
                  backgroundColor: '#1a1a1a',
                  border: '1px solid #333',
                  borderRadius: '8px'
                }}
              />
              <Bar dataKey="histogram" fill="#4ecdc4" opacity={0.6} />
              <Line 
                type="monotone" 
                dataKey="macd" 
                stroke="#ff6b6b" 
                strokeWidth={2}
                dot={false}
              />
              <Line 
                type="monotone" 
                dataKey="signal" 
                stroke="#ffd93d" 
                strokeWidth={1}
                dot={false}
              />
              <ReferenceLine y={0} stroke="#888" strokeDasharray="1 1" strokeOpacity={0.5} />
            </ComposedChart>
          </ResponsiveContainer>
        );
      
      case 'stoch':
        return (
          <ResponsiveContainer width="100%" height={120}>
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="#2a2a2a" />
              <XAxis 
                dataKey="time" 
                tickFormatter={(time) => new Date(time).toLocaleTimeString()}
                stroke="#888"
                fontSize={10}
              />
              <YAxis 
                domain={[0, 100]}
                stroke="#888"
                fontSize={10}
              />
              <Tooltip 
                labelFormatter={(time) => new Date(time).toLocaleString()}
                contentStyle={{
                  backgroundColor: '#1a1a1a',
                  border: '1px solid #333',
                  borderRadius: '8px'
                }}
              />
              <Line 
                type="monotone" 
                dataKey="stoch_k" 
                stroke="#4ecdc4" 
                strokeWidth={2}
                dot={false}
              />
              <Line 
                type="monotone" 
                dataKey="stoch_d" 
                stroke="#ff6b6b" 
                strokeWidth={1}
                dot={false}
              />
              <ReferenceLine y={80} stroke="#f87171" strokeDasharray="2 2" strokeOpacity={0.5} />
              <ReferenceLine y={20} stroke="#4ade80" strokeDasharray="2 2" strokeOpacity={0.5} />
            </LineChart>
          </ResponsiveContainer>
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="advanced-trading-chart">
      {/* Indicators Toolbar */}
      <div className="indicators-toolbar">
        <div className="indicator-group">
          <span className="group-label">Overlays:</span>
          <button 
            className={`indicator-btn ${indicators.sma.enabled ? 'active' : ''}`}
            onClick={() => toggleIndicator('sma')}
          >
            SMA(20)
          </button>
          <button 
            className={`indicator-btn ${indicators.ema.enabled ? 'active' : ''}`}
            onClick={() => toggleIndicator('ema')}
          >
            EMA(12)
          </button>
          <button 
            className={`indicator-btn ${indicators.bb.enabled ? 'active' : ''}`}
            onClick={() => toggleIndicator('bb')}
          >
            BB(20,2)
          </button>
          <button 
            className={`indicator-btn ${indicators.vwap.enabled ? 'active' : ''}`}
            onClick={() => toggleIndicator('vwap')}
          >
            VWAP
          </button>
        </div>
        
        <div className="indicator-group">
          <span className="group-label">Oscillators:</span>
          <button 
            className={`indicator-btn ${indicators.rsi.enabled ? 'active' : ''}`}
            onClick={() => toggleIndicator('rsi')}
          >
            RSI(14)
          </button>
          <button 
            className={`indicator-btn ${indicators.macd.enabled ? 'active' : ''}`}
            onClick={() => toggleIndicator('macd')}
          >
            MACD
          </button>
          <button 
            className={`indicator-btn ${indicators.stoch.enabled ? 'active' : ''}`}
            onClick={() => toggleIndicator('stoch')}
          >
            Stoch
          </button>
        </div>
      </div>

      {/* Main Chart */}
      <div className="main-chart-container">
        {renderMainChart()}
      </div>

      {/* Indicator Panels */}
      <div className="indicator-panels">
        {indicators.rsi.enabled && (
          <div className="indicator-panel">
            <div className="panel-header">RSI (14)</div>
            {renderIndicatorPanel('rsi')}
          </div>
        )}
        
        {indicators.macd.enabled && (
          <div className="indicator-panel">
            <div className="panel-header">MACD (12,26,9)</div>
            {renderIndicatorPanel('macd')}
          </div>
        )}
        
        {indicators.stoch.enabled && (
          <div className="indicator-panel">
            <div className="panel-header">Stochastic (14,3)</div>
            {renderIndicatorPanel('stoch')}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdvancedTradingChart;

