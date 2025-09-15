import React, { useState, useEffect } from 'react';
import '../styles/PrivacyMode.css';

const PrivacyModeSelector = ({ selectedMode, onModeChange, tradingAmount = 0 }) => {
  const [showTooltip, setShowTooltip] = useState(null);
  const [mevSavings, setMevSavings] = useState(0);
  const [privacyStreak, setPrivacyStreak] = useState(0);

  const privacyModes = [
    {
      id: 'public',
      name: 'Public',
      icon: '🌐',
      fee: 0.30,
      discount: 0,
      mevProtection: 45,
      color: '#6b7280',
      description: 'Standard trading with full transparency',
      features: [
        'Visible order book entries',
        'Public transaction history',
        'Standard MEV protection',
        'Fastest execution'
      ],
      benefits: [
        'Lowest gas costs',
        'Maximum liquidity access',
        'Real-time order visibility'
      ]
    },
    {
      id: 'private',
      name: 'Private',
      icon: '🔒',
      fee: 0.25,
      discount: 17,
      mevProtection: 75,
      color: '#3b82f6',
      description: 'Enhanced privacy with fee rewards',
      features: [
        'Hidden order amounts',
        'Private balance tracking',
        'Enhanced MEV protection',
        'Encrypted order matching'
      ],
      benefits: [
        '17% fee discount',
        'MEV attack prevention',
        'Private portfolio tracking',
        'Anonymous order history'
      ]
    },
    {
      id: 'stealth',
      name: 'Stealth',
      icon: '👤',
      fee: 0.20,
      discount: 33,
      mevProtection: 95,
      color: '#8b5cf6',
      description: 'Maximum privacy with highest rewards',
      features: [
        'Completely anonymous trading',
        'Zero-knowledge proofs',
        'Maximum MEV protection',
        'Delayed execution for privacy'
      ],
      benefits: [
        '33% fee discount',
        'Complete transaction privacy',
        'Advanced MEV shields',
        'Privacy streak bonuses'
      ]
    }
  ];

  useEffect(() => {
    // Calculate MEV savings based on trading amount and privacy mode
    const selectedModeData = privacyModes.find(mode => mode.id === selectedMode);
    if (selectedModeData && tradingAmount > 0) {
      // Estimate MEV savings (typically 0.1-0.5% of trade value)
      const baseMevRisk = tradingAmount * 0.003; // 0.3% base MEV risk
      const protectionFactor = selectedModeData.mevProtection / 100;
      const savings = baseMevRisk * protectionFactor;
      setMevSavings(savings);
    }
  }, [selectedMode, tradingAmount]);

  useEffect(() => {
    // Load privacy streak from localStorage
    const streak = localStorage.getItem('privacyStreak') || 0;
    setPrivacyStreak(parseInt(streak));
  }, []);

  const calculateFeeDiscount = (mode) => {
    const baseFee = 0.30;
    const modeFee = mode.fee;
    return ((baseFee - modeFee) / baseFee * 100).toFixed(0);
  };

  const calculateTotalSavings = (mode) => {
    if (tradingAmount === 0) return 0;
    
    const baseFee = tradingAmount * 0.003; // 0.3% base fee
    const modeFee = tradingAmount * (mode.fee / 100);
    const feeSavings = baseFee - modeFee;
    
    return feeSavings + mevSavings;
  };

  const handleModeSelect = (mode) => {
    onModeChange(mode.id);
    
    // Update privacy streak for private/stealth modes
    if (mode.id !== 'public') {
      const newStreak = privacyStreak + 1;
      setPrivacyStreak(newStreak);
      localStorage.setItem('privacyStreak', newStreak.toString());
    }
  };

  return (
    <div className="privacy-mode-selector">
      <div className="privacy-header">
        <h3>Privacy Mode</h3>
        <div className="privacy-benefits">
          <span className="benefit-tag">
            💰 Get PAID to be private
          </span>
          {privacyStreak > 0 && (
            <span className="streak-indicator">
              🔥 {privacyStreak} streak
            </span>
          )}
        </div>
      </div>

      <div className="privacy-modes">
        {privacyModes.map(mode => {
          const isSelected = selectedMode === mode.id;
          const totalSavings = calculateTotalSavings(mode);
          
          return (
            <div
              key={mode.id}
              className={`privacy-mode ${isSelected ? 'selected' : ''}`}
              onClick={() => handleModeSelect(mode)}
              onMouseEnter={() => setShowTooltip(mode.id)}
              onMouseLeave={() => setShowTooltip(null)}
              style={{ '--mode-color': mode.color }}
            >
              <div className="mode-header">
                <div className="mode-icon">{mode.icon}</div>
                <div className="mode-info">
                  <div className="mode-name">{mode.name}</div>
                  <div className="mode-fee">
                    {mode.fee}% fee
                    {mode.discount > 0 && (
                      <span className="discount">
                        (-{mode.discount}%)
                      </span>
                    )}
                  </div>
                </div>
                {isSelected && (
                  <div className="selected-indicator">✓</div>
                )}
              </div>

              <div className="mode-stats">
                <div className="stat">
                  <div className="stat-label">MEV Protection</div>
                  <div className="stat-value">
                    <div className="protection-bar">
                      <div 
                        className="protection-fill"
                        style={{ 
                          width: `${mode.mevProtection}%`,
                          backgroundColor: mode.color
                        }}
                      ></div>
                    </div>
                    <span>{mode.mevProtection}%</span>
                  </div>
                </div>

                {tradingAmount > 0 && totalSavings > 0 && (
                  <div className="stat">
                    <div className="stat-label">Your Savings</div>
                    <div className="stat-value savings">
                      +${totalSavings.toFixed(2)}
                    </div>
                  </div>
                )}
              </div>

              <div className="mode-description">
                {mode.description}
              </div>

              {/* Tooltip */}
              {showTooltip === mode.id && (
                <div className="privacy-tooltip">
                  <div className="tooltip-section">
                    <h4>Features</h4>
                    <ul>
                      {mode.features.map((feature, index) => (
                        <li key={index}>{feature}</li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="tooltip-section">
                    <h4>Benefits</h4>
                    <ul>
                      {mode.benefits.map((benefit, index) => (
                        <li key={index}>{benefit}</li>
                      ))}
                    </ul>
                  </div>

                  {mode.id !== 'public' && (
                    <div className="tooltip-section">
                      <h4>Privacy Technology</h4>
                      <p>
                        Powered by Secret Network's privacy-preserving smart contracts
                        with zero-knowledge proofs and encrypted state.
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Privacy Education */}
      <div className="privacy-education">
        <div className="education-header">
          <span className="education-icon">🎓</span>
          <span>Why Choose Privacy?</span>
        </div>
        <div className="education-content">
          <div className="education-point">
            <span className="point-icon">🛡️</span>
            <span>Protect against MEV attacks and front-running</span>
          </div>
          <div className="education-point">
            <span className="point-icon">💰</span>
            <span>Earn fee discounts for using privacy features</span>
          </div>
          <div className="education-point">
            <span className="point-icon">🔒</span>
            <span>Keep your trading strategy and portfolio private</span>
          </div>
        </div>
      </div>

      {/* MEV Protection Dashboard */}
      {selectedMode !== 'public' && (
        <div className="mev-dashboard">
          <div className="dashboard-header">
            <span className="shield-icon">🛡️</span>
            <span>MEV Protection Active</span>
          </div>
          <div className="protection-stats">
            <div className="protection-stat">
              <div className="stat-label">Protection Level</div>
              <div className="stat-value">
                {privacyModes.find(m => m.id === selectedMode)?.mevProtection}%
              </div>
            </div>
            {mevSavings > 0 && (
              <div className="protection-stat">
                <div className="stat-label">Estimated Savings</div>
                <div className="stat-value savings">
                  ${mevSavings.toFixed(2)}
                </div>
              </div>
            )}
            <div className="protection-stat">
              <div className="stat-label">Privacy Streak</div>
              <div className="stat-value">
                {privacyStreak} trades
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PrivacyModeSelector;

