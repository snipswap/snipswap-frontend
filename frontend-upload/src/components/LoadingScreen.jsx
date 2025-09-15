import React, { useState, useEffect } from 'react';
import '../styles/LoadingScreen.css';

const LoadingScreen = ({ isLoading, message = "Connecting to Secret Network..." }) => {
  const [progress, setProgress] = useState(0);
  const [currentMessage, setCurrentMessage] = useState(message);

  const loadingMessages = [
    "Initializing privacy protocols...",
    "Connecting to Secret Network...",
    "Loading price oracles...",
    "Preparing MEV protection...",
    "Establishing secure connection...",
    "Ready for private trading!"
  ];

  useEffect(() => {
    if (!isLoading) return;

    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) return 100;
        return prev + Math.random() * 15;
      });
    }, 200);

    const messageInterval = setInterval(() => {
      setCurrentMessage(prev => {
        const currentIndex = loadingMessages.indexOf(prev);
        const nextIndex = (currentIndex + 1) % loadingMessages.length;
        return loadingMessages[nextIndex];
      });
    }, 1500);

    return () => {
      clearInterval(progressInterval);
      clearInterval(messageInterval);
    };
  }, [isLoading]);

  if (!isLoading) return null;

  return (
    <div className="loading-screen">
      <div className="loading-overlay"></div>
      
      <div className="loading-content">
        <div className="loading-logo-container">
          <img 
            src="/logo_snipswap.png" 
            alt="SnipSwap" 
            className="loading-logo"
          />
          <div className="logo-glow"></div>
        </div>

        <div className="loading-brand">
          <h1 className="loading-title">SnipSwap</h1>
          <p className="loading-subtitle">Privacy-First Trading Platform</p>
        </div>

        <div className="loading-progress">
          <div className="progress-bar">
            <div 
              className="progress-fill"
              style={{ width: `${Math.min(progress, 100)}%` }}
            ></div>
          </div>
          <div className="progress-text">
            {Math.min(Math.round(progress), 100)}%
          </div>
        </div>

        <div className="loading-message">
          <span className="message-text">{currentMessage}</span>
          <div className="message-dots">
            <span className="dot"></span>
            <span className="dot"></span>
            <span className="dot"></span>
          </div>
        </div>

        <div className="loading-features">
          <div className="feature-item">
            <span className="feature-icon">🔒</span>
            <span className="feature-text">Privacy-First</span>
          </div>
          <div className="feature-item">
            <span className="feature-icon">⚡</span>
            <span className="feature-text">Lightning Fast</span>
          </div>
          <div className="feature-item">
            <span className="feature-icon">🛡️</span>
            <span className="feature-text">MEV Protected</span>
          </div>
          <div className="feature-item">
            <span className="feature-icon">💎</span>
            <span className="feature-text">Trustless</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;

