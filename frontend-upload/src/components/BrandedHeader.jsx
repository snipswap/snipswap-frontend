import React from 'react';
import '../styles/BrandedHeader.css';

const BrandedHeader = ({ isConnected, onConnectWallet }) => {
  return (
    <header className="branded-header">
      <div className="header-left">
        <div className="logo-container">
          <img 
            src="/logo_snipswap.png" 
            alt="SnipSwap" 
            className="snipswap-logo"
          />
          <div className="brand-info">
            <h1 className="brand-name">SnipSwap</h1>
            <p className="brand-tagline">Privacy-First Trading Platform</p>
          </div>
        </div>
      </div>

      <div className="header-center">
        <nav className="main-nav">
          <button className="nav-item active">Trade</button>
          <button className="nav-item">Pools</button>
          <button className="nav-item">Portfolio</button>
          <button className="nav-item">Analytics</button>
        </nav>
      </div>

      <div className="header-right">
        <div className="header-actions">
          <div className="network-selector">
            <div className="network-icon">🔐</div>
            <span className="network-name">Secret Network</span>
            <div className="network-status connected"></div>
          </div>

          <button 
            className={`wallet-connect-btn ${isConnected ? 'connected' : ''}`}
            onClick={onConnectWallet}
          >
            {isConnected ? (
              <>
                <div className="wallet-icon">👤</div>
                <span>0x1234...5678</span>
                <div className="connection-indicator"></div>
              </>
            ) : (
              <>
                <div className="wallet-icon">🔗</div>
                <span>Connect Wallet</span>
              </>
            )}
          </button>

          <div className="settings-menu">
            <button className="settings-btn">⚙️</button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default BrandedHeader;

