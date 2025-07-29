# SnipSwap DEX Frontend

## 🚀 Privacy-First Decentralized Exchange Interface

A professional trading interface for the SnipSwap DEX, built for traders who value privacy, freedom, and professional-grade tools. Whether you're a manual trader, algorithmic trader, or prefer AI assistance - SnipSwap respects your trading style.

### 🔒 Core Privacy Features
- **Private Trading** - All transactions encrypted and confidential
- **No KYC Required** - Trade anonymously with just wallet connection
- **MEV Protection** - Front-running protection built into the protocol
- **Balance Privacy** - Optional balance hiding for complete discretion

### 📊 Professional Trading Features
- **Advanced Technical Indicators** - VWAP, RSI, EMA, MACD, Volume
- **Multiple Chart Types** - Line charts, candlesticks, bars, area charts
- **Real-time Order Books** - Live depth visualization with precision controls
- **Professional Order Types** - Limit, Market, Stop, Stop-Limit orders
- **Market Filtering** - Favorites, gainers, losers, search functionality
- **Responsive Design** - Optimized for desktop and mobile trading

### 🎨 Interface Design
- **Binance-Inspired Layout** - Familiar professional trading experience
- **Uniquely SnipSwap** - Privacy-focused branding and sovereignty messaging
- **Dark Theme Optimized** - Designed for extended trading sessions
- **Color-Coded Markets** - Green/red price movements, intuitive indicators
- **Clean Typography** - Monospace fonts for precise number display

### 🛠️ Technical Stack
- **React 18** with modern hooks
- **Tailwind CSS** for responsive styling
- **Shadcn/UI** component library
- **Recharts** for advanced trading charts
- **Lucide Icons** for consistent iconography
- **Vite** for lightning-fast development

### 📁 Project Structure
```
src/
├── App.jsx                    # Main trading interface
├── App.css                    # Custom DEX styling & grid layout
├── components/
│   ├── TradingChart.jsx       # Advanced chart with indicators
│   ├── MarketDepth.jsx        # Order book & market depth
│   └── ui/                    # Reusable UI components
├── assets/                    # Static assets
└── main.jsx                   # React entry point
```

### 🚀 Quick Start
```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

### 📈 Trading Features

#### Advanced Charting
- **Multiple Timeframes**: 1m, 5m, 15m, 1H, 4H, 1D, 1W, 1M
- **Chart Types**: Line, Candlestick, Bar, Area
- **Technical Indicators**:
  - VWAP (Volume Weighted Average Price)
  - EMA 12 & 26 (Exponential Moving Averages)
  - RSI (Relative Strength Index)
  - MACD (Moving Average Convergence Divergence)
  - Volume bars with depth visualization

#### Order Management
- **Order Types**: Limit, Market, Stop, Stop-Limit
- **Real-time Order Book**: Live bid/ask spreads
- **Depth Visualization**: Visual representation of market liquidity
- **Precision Controls**: Adjustable price precision (0.01, 0.001, 0.0001)
- **Recent Trades**: Live trade history with timestamps

#### Market Discovery
- **Search Functionality**: Find trading pairs quickly
- **Market Filters**: All, Favorites, Gainers, Losers
- **Favorites System**: Star your preferred trading pairs
- **Volume Sorting**: Identify high-activity markets
- **Price Change Indicators**: Visual up/down movements

### 🔗 Integration Points

This frontend integrates with:
- **SnipSwap DEX Backend** - Trading engine and order matching
- **Secret Network** - Privacy-preserving smart contracts
- **Keplr Wallet** - Secure wallet connection and signing
- **WebSocket Services** - Real-time market data feeds

### 🎯 Deployment Options

#### Vercel (Recommended)
```bash
# Connect GitHub repository to Vercel
# Configure as React/Vite project
# Automatic deployment on git push
```

#### Manual Deployment
```bash
npm run build
# Deploy dist/ folder to any static hosting service
```

#### Docker Deployment
```bash
# Build production image
docker build -t snipswap-frontend .

# Run container
docker run -p 3000:3000 snipswap-frontend
```

### 🌐 Browser Support
- Chrome/Chromium 90+
- Firefox 88+
- Safari 14+
- Edge 90+

### 🔐 Security Features
- **Client-side Encryption** - Sensitive data never leaves your browser
- **Wallet Integration** - Secure transaction signing
- **No Data Collection** - Privacy-first architecture
- **Open Source** - Transparent and auditable code

### 💡 For All Trading Styles

**Manual Traders**: Full control with professional tools and indicators
**Algorithmic Traders**: API-ready architecture for bot integration  
**AI-Assisted Traders**: Compatible with AI trading agents and automation
**Privacy Advocates**: Complete anonymity with no KYC requirements

### 🚀 Future Enhancements
- Advanced order types (OCO, Iceberg)
- Portfolio analytics and P&L tracking
- Advanced charting tools (Fibonacci, trend lines)
- Mobile app with native performance
- Cross-chain trading support

---

**Trade with Freedom. Trade with Privacy. Trade with SnipSwap.**

*Built for the sovereignty stack - where your wealth stays yours.*

