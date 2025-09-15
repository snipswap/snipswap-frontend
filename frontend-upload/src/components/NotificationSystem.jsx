import React, { useState, useEffect } from 'react';
import '../styles/NotificationSystem.css';

const NotificationSystem = () => {
  const [notifications, setNotifications] = useState([]);

  // Listen for custom notification events
  useEffect(() => {
    const handleNotification = (event) => {
      const { type, title, message, duration = 5000 } = event.detail;
      
      const notification = {
        id: Date.now() + Math.random(),
        type,
        title,
        message,
        duration,
        timestamp: new Date()
      };

      setNotifications(prev => [notification, ...prev.slice(0, 4)]); // Keep max 5 notifications

      // Auto-remove notification after duration
      setTimeout(() => {
        removeNotification(notification.id);
      }, duration);
    };

    window.addEventListener('snipswap-notification', handleNotification);
    return () => window.removeEventListener('snipswap-notification', handleNotification);
  }, []);

  const removeNotification = (id) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'success': return '✅';
      case 'error': return '❌';
      case 'warning': return '⚠️';
      case 'info': return 'ℹ️';
      case 'trade': return '💰';
      case 'privacy': return '🔒';
      case 'mev': return '🛡️';
      default: return 'ℹ️';
    }
  };

  const formatTime = (timestamp) => {
    return timestamp.toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  return (
    <div className="notification-system">
      {notifications.map(notification => (
        <div
          key={notification.id}
          className={`notification ${notification.type}`}
          onClick={() => removeNotification(notification.id)}
        >
          <div className="notification-content">
            <div className="notification-header">
              <span className="notification-icon">
                {getNotificationIcon(notification.type)}
              </span>
              <span className="notification-title">
                {notification.title}
              </span>
              <span className="notification-time">
                {formatTime(notification.timestamp)}
              </span>
              <button 
                className="notification-close"
                onClick={(e) => {
                  e.stopPropagation();
                  removeNotification(notification.id);
                }}
              >
                ×
              </button>
            </div>
            
            {notification.message && (
              <div className="notification-message">
                {notification.message}
              </div>
            )}
          </div>
          
          <div className="notification-progress">
            <div 
              className="progress-bar"
              style={{ 
                animationDuration: `${notification.duration}ms`,
                animationName: 'progressShrink'
              }}
            ></div>
          </div>
        </div>
      ))}
    </div>
  );
};

// Utility function to trigger notifications
export const showNotification = (type, title, message, duration) => {
  const event = new CustomEvent('snipswap-notification', {
    detail: { type, title, message, duration }
  });
  window.dispatchEvent(event);
};

// Predefined notification types for common actions
export const notifications = {
  tradeSuccess: (pair, amount, side, privacyMode) => {
    showNotification(
      'trade',
      'Trade Executed Successfully!',
      `${side.toUpperCase()} ${amount} ${pair} in ${privacyMode} mode`,
      6000
    );
  },
  
  tradeError: (error) => {
    showNotification(
      'error',
      'Trade Failed',
      error || 'An error occurred while executing the trade',
      8000
    );
  },
  
  walletConnected: (address) => {
    showNotification(
      'success',
      'Wallet Connected',
      `Connected to ${address.slice(0, 6)}...${address.slice(-4)}`,
      4000
    );
  },
  
  walletDisconnected: () => {
    showNotification(
      'info',
      'Wallet Disconnected',
      'Your wallet has been disconnected',
      3000
    );
  },
  
  privacyModeChanged: (mode, discount) => {
    showNotification(
      'privacy',
      `${mode} Mode Activated`,
      `Enjoy ${discount}% fee discount and enhanced privacy!`,
      5000
    );
  },
  
  mevProtection: (savings) => {
    showNotification(
      'mev',
      'MEV Attack Prevented!',
      `Saved approximately $${savings.toFixed(2)} from MEV extraction`,
      7000
    );
  },
  
  oracleConnected: (sources) => {
    showNotification(
      'success',
      'Price Oracle Connected',
      `Connected to ${sources} price sources`,
      4000
    );
  },
  
  oracleDisconnected: () => {
    showNotification(
      'warning',
      'Price Oracle Disconnected',
      'Attempting to reconnect...',
      5000
    );
  },
  
  lowBalance: (token) => {
    showNotification(
      'warning',
      'Low Balance Warning',
      `Your ${token} balance is running low`,
      6000
    );
  },
  
  highSlippage: (slippage) => {
    showNotification(
      'warning',
      'High Slippage Warning',
      `Slippage tolerance is set to ${slippage}%`,
      5000
    );
  }
};

export default NotificationSystem;

