import React, { useState, useEffect } from 'react';
import PrivacyModeSelector from './PrivacyModeSelector.jsx';
import '../styles/PrivacyTradingForm.css';

const PrivacyEnhancedTradingForm = ({ selectedPair, priceData, onTrade }) => {
  const [orderType, setOrderType] = useState('limit');
  const [side, setSide] = useState('buy');
  const [amount, setAmount] = useState('');
  const [price, setPrice] = useState('');
  const [privacyMode, setPrivacyMode] = useState('private');
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [slippage, setSlippage] = useState(0.5);
  const [timeInForce, setTimeInForce] = useState('GTC');
  const [mevProtectionEnabled, setMevProtectionEnabled] = useState(true);

  const currentPrice = priceData[selectedPair]?.price || 0;

  useEffect(() => {
    if (orderType === 'market') {
      setPrice(currentPrice.toFixed(4));
    }
  }, [orderType, currentPrice]);

  const calculateFees = () => {
    const tradeValue = parseFloat(amount) * parseFloat(price || currentPrice);
    if (!tradeValue) return { baseFee: 0, actualFee: 0, discount: 0, mevSavings: 0 };

    const baseFeeRate = 0.003; // 0.3%
    const baseFee = tradeValue * baseFeeRate;

    const feeRates = {
      public: 0.003,    // 0.30%
      private: 0.0025,  // 0.25%
      stealth: 0.002    // 0.20%
    };

    const actualFeeRate = feeRates[privacyMode];
    const actualFee = tradeValue * actualFeeRate;
    const discount = baseFee - actualFee;

    // Calculate MEV savings based on privacy mode
    const mevProtectionLevels = {
      public: 0.45,
      private: 0.75,
      stealth: 0.95
    };

    const baseMevRisk = tradeValue * 0.003; // 0.3% potential MEV extraction
    const protectionLevel = mevProtectionLevels[privacyMode];
    const mevSavings = baseMevRisk * protectionLevel;

    return { baseFee, actualFee, discount, mevSavings };
  };

  const calculateTotal = () => {
    const tradeAmount = parseFloat(amount) || 0;
    const tradePrice = parseFloat(price || currentPrice) || 0;
    const { actualFee } = calculateFees();

    if (side === 'buy') {
      return (tradeAmount * tradePrice) + actualFee;
    } else {
      return (tradeAmount * tradePrice) - actualFee;
    }
  };

  const getPrivacyModeInfo = () => {
    const modes = {
      public: { name: 'Public', icon: '🌐', color: '#6b7280' },
      private: { name: 'Private', icon: '🔒', color: '#3b82f6' },
      stealth: { name: 'Stealth', icon: '👤', color: '#8b5cf6' }
    };
    return modes[privacyMode];
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const tradeData = {
      pair: selectedPair,
      side,
      orderType,
      amount: parseFloat(amount),
      price: parseFloat(price || currentPrice),
      privacyMode,
      slippage,
      timeInForce,
      mevProtectionEnabled,
      fees: calculateFees(),
      total: calculateTotal()
    };

    onTrade(tradeData);
  };

  const isFormValid = () => {
    return amount && (orderType === 'market' || price) && parseFloat(amount) > 0;
  };

  const { baseFee, actualFee, discount, mevSavings } = calculateFees();
  const modeInfo = getPrivacyModeInfo();

  return (
    <div className="privacy-enhanced-trading-form">
      {/* Privacy Mode Selector */}
      <PrivacyModeSelector
        selectedMode={privacyMode}
        onModeChange={setPrivacyMode}
        tradingAmount={parseFloat(amount) * parseFloat(price || currentPrice) || 0}
      />

      {/* Trading Form */}
      <div className="trading-form-container">
        <div className="form-header">
          <div className="order-type-selector">
            <button
              type="button"
              className={`order-type-btn ${orderType === 'limit' ? 'active' : ''}`}
              onClick={() => setOrderType('limit')}
            >
              Limit
            </button>
            <button
              type="button"
              className={`order-type-btn ${orderType === 'market' ? 'active' : ''}`}
              onClick={() => setOrderType('market')}
            >
              Market
            </button>
          </div>

          <div className="privacy-indicator">
            <span className="privacy-icon" style={{ color: modeInfo.color }}>
              {modeInfo.icon}
            </span>
            <span className="privacy-name">{modeInfo.name} Mode</span>
            {mevProtectionEnabled && (
              <span className="mev-shield">🛡️</span>
            )}
          </div>
        </div>

        <form onSubmit={handleSubmit} className="trading-form">
          {/* Side Selector */}
          <div className="side-selector">
            <button
              type="button"
              className={`side-btn buy ${side === 'buy' ? 'active' : ''}`}
              onClick={() => setSide('buy')}
            >
              Buy {selectedPair.split('/')[0]}
            </button>
            <button
              type="button"
              className={`side-btn sell ${side === 'sell' ? 'active' : ''}`}
              onClick={() => setSide('sell')}
            >
              Sell {selectedPair.split('/')[0]}
            </button>
          </div>

          {/* Price Input */}
          {orderType === 'limit' && (
            <div className="input-group">
              <label>Price</label>
              <div className="input-wrapper">
                <input
                  type="number"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  placeholder="0.0000"
                  step="0.0001"
                />
                <span className="input-suffix">USDC</span>
              </div>
            </div>
          )}

          {/* Amount Input */}
          <div className="input-group">
            <label>Amount</label>
            <div className="input-wrapper">
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="0.00"
                step="0.01"
              />
              <span className="input-suffix">{selectedPair.split('/')[0]}</span>
            </div>
          </div>

          {/* Advanced Options */}
          <div className="advanced-options">
            <button
              type="button"
              className="advanced-toggle"
              onClick={() => setShowAdvanced(!showAdvanced)}
            >
              Advanced Options {showAdvanced ? '▼' : '▶'}
            </button>

            {showAdvanced && (
              <div className="advanced-content">
                <div className="input-group">
                  <label>Slippage Tolerance</label>
                  <div className="slippage-selector">
                    {[0.1, 0.5, 1.0].map(value => (
                      <button
                        key={value}
                        type="button"
                        className={`slippage-btn ${slippage === value ? 'active' : ''}`}
                        onClick={() => setSlippage(value)}
                      >
                        {value}%
                      </button>
                    ))}
                    <input
                      type="number"
                      value={slippage}
                      onChange={(e) => setSlippage(parseFloat(e.target.value))}
                      step="0.1"
                      min="0.1"
                      max="50"
                      className="slippage-input"
                    />
                  </div>
                </div>

                <div className="input-group">
                  <label>Time in Force</label>
                  <select
                    value={timeInForce}
                    onChange={(e) => setTimeInForce(e.target.value)}
                    className="time-in-force-select"
                  >
                    <option value="GTC">Good Till Cancelled</option>
                    <option value="IOC">Immediate or Cancel</option>
                    <option value="FOK">Fill or Kill</option>
                  </select>
                </div>

                <div className="checkbox-group">
                  <label className="checkbox-label">
                    <input
                      type="checkbox"
                      checked={mevProtectionEnabled}
                      onChange={(e) => setMevProtectionEnabled(e.target.checked)}
                    />
                    <span className="checkbox-text">
                      Enable MEV Protection
                      <span className="checkbox-description">
                        Protect against front-running and sandwich attacks
                      </span>
                    </span>
                  </label>
                </div>
              </div>
            )}
          </div>

          {/* Fee Breakdown */}
          {amount && (price || orderType === 'market') && (
            <div className="fee-breakdown">
              <div className="fee-header">
                <span>Fee Breakdown</span>
                <span className="privacy-savings">
                  {discount > 0 && `💰 Saving $${discount.toFixed(2)}`}
                </span>
              </div>
              
              <div className="fee-details">
                <div className="fee-row">
                  <span>Base Fee (0.30%)</span>
                  <span className="fee-amount strikethrough">${baseFee.toFixed(2)}</span>
                </div>
                <div className="fee-row">
                  <span>Your Fee ({(actualFee / (parseFloat(amount) * parseFloat(price || currentPrice)) * 100).toFixed(2)}%)</span>
                  <span className="fee-amount">${actualFee.toFixed(2)}</span>
                </div>
                {discount > 0 && (
                  <div className="fee-row savings">
                    <span>Privacy Discount</span>
                    <span className="fee-amount">-${discount.toFixed(2)}</span>
                  </div>
                )}
                {mevSavings > 0 && (
                  <div className="fee-row savings">
                    <span>MEV Protection Savings</span>
                    <span className="fee-amount">+${mevSavings.toFixed(2)}</span>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Total */}
          {amount && (price || orderType === 'market') && (
            <div className="total-section">
              <div className="total-row">
                <span>Total</span>
                <span className="total-amount">
                  ${calculateTotal().toFixed(2)} USDC
                </span>
              </div>
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            className={`submit-btn ${side} ${!isFormValid() ? 'disabled' : ''}`}
            disabled={!isFormValid()}
          >
            {side === 'buy' ? 'Buy' : 'Sell'} {selectedPair.split('/')[0]}
            {privacyMode !== 'public' && (
              <span className="privacy-badge">
                {modeInfo.icon} {modeInfo.name}
              </span>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default PrivacyEnhancedTradingForm;

