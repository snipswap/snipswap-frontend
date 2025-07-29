import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button.jsx'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Input } from '@/components/ui/input.jsx'
import { Badge } from '@/components/ui/badge.jsx'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs.jsx'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select.jsx'
import { Shield, Eye, EyeOff, Wallet, TrendingUp, TrendingDown, Activity, Lock, Zap, Users, Search, Star } from 'lucide-react'
import TradingChart from './components/TradingChart.jsx'
import MarketDepth from './components/MarketDepth.jsx'
import './App.css'

// Mock data for demonstration
const tradingPairs = [
  { symbol: 'SCRT/USDT', price: 0.4521, change: 5.23, volume: '2.1M', favorite: true },
  { symbol: 'ATOM/USDT', price: 12.34, change: -2.15, volume: '5.8M', favorite: false },
  { symbol: 'OSMO/USDT', price: 0.8765, change: 8.91, volume: '1.9M', favorite: true },
  { symbol: 'JUNO/USDT', price: 3.2109, change: -0.87, volume: '890K', favorite: false },
  { symbol: 'EVMOS/USDT', price: 0.1234, change: 12.45, volume: '3.2M', favorite: false },
  { symbol: 'STARS/USDT', price: 0.0234, change: -5.67, volume: '1.5M', favorite: false },
  { symbol: 'HUAHUA/USDT', price: 0.000012, change: 23.45, volume: '890K', favorite: false },
  { symbol: 'CMDX/USDT', price: 0.1567, change: 7.89, volume: '2.3M', favorite: false },
]

function App() {
  const [selectedPair, setSelectedPair] = useState(tradingPairs[0])
  const [walletConnected, setWalletConnected] = useState(false)
  const [hideBalances, setHideBalances] = useState(false)
  const [orderType, setOrderType] = useState('limit')
  const [orderSide, setOrderSide] = useState('buy')
  const [price, setPrice] = useState('')
  const [amount, setAmount] = useState('')
  const [searchTerm, setSearchTerm] = useState('')
  const [marketFilter, setMarketFilter] = useState('all')

  const connectWallet = () => {
    setWalletConnected(true)
  }

  const formatPrice = (price) => {
    if (price < 0.001) return price.toFixed(6)
    if (price < 1) return price.toFixed(4)
    return price.toFixed(2)
  }

  const formatChange = (change) => {
    return `${change > 0 ? '+' : ''}${change.toFixed(2)}%`
  }

  const filteredPairs = tradingPairs.filter(pair => {
    const matchesSearch = pair.symbol.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter = marketFilter === 'all' || 
      (marketFilter === 'favorites' && pair.favorite) ||
      (marketFilter === 'gainers' && pair.change > 0) ||
      (marketFilter === 'losers' && pair.change < 0)
    return matchesSearch && matchesFilter
  })

  return (
    <div className="trading-grid">
      {/* Header */}
      <div className="trading-header flex items-center justify-between px-6">
        <div className="flex items-center space-x-6">
          <div className="flex items-center space-x-2">
            <Shield className="h-8 w-8 text-primary" />
            <span className="text-2xl font-bold">SnipSwap</span>
            <Badge variant="secondary" className="ml-2">DEX</Badge>
          </div>
          
          <div className="flex items-center space-x-4 text-sm">
            <div className="flex items-center space-x-1">
              <Lock className="h-4 w-4 text-green-400" />
              <span>Private Trading</span>
            </div>
            <div className="flex items-center space-x-1">
              <Zap className="h-4 w-4 text-blue-400" />
              <span>MEV Protected</span>
            </div>
            <div className="flex items-center space-x-1">
              <Users className="h-4 w-4 text-purple-400" />
              <span>No KYC</span>
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setHideBalances(!hideBalances)}
            className="flex items-center space-x-2"
          >
            {hideBalances ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            <span>{hideBalances ? 'Show' : 'Hide'} Balances</span>
          </Button>
          
          {walletConnected ? (
            <Badge variant="default" className="px-3 py-1">
              <Wallet className="h-4 w-4 mr-2" />
              secret1...7x9k
            </Badge>
          ) : (
            <Button onClick={connectWallet} className="glow-effect">
              <Wallet className="h-4 w-4 mr-2" />
              Connect Keplr
            </Button>
          )}
        </div>
      </div>

      {/* Sidebar - Trading Pairs */}
      <div className="trading-sidebar">
        <div className="p-4 border-b border-border">
          <h3 className="text-lg font-semibold mb-3">Markets</h3>
          
          {/* Search */}
          <div className="relative mb-3">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Search pairs..." 
              className="pl-10" 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          {/* Market Filters */}
          <Tabs value={marketFilter} onValueChange={setMarketFilter} className="mb-3">
            <TabsList className="grid w-full grid-cols-4 text-xs">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="favorites">★</TabsTrigger>
              <TabsTrigger value="gainers">↗</TabsTrigger>
              <TabsTrigger value="losers">↘</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
        
        <div className="flex-1 overflow-y-auto">
          <div className="space-y-1 p-2">
            {filteredPairs.map((pair, index) => (
              <div
                key={index}
                onClick={() => setSelectedPair(pair)}
                className={`p-3 rounded-lg cursor-pointer transition-colors ${
                  selectedPair.symbol === pair.symbol 
                    ? 'bg-primary/20 border border-primary/30' 
                    : 'hover:bg-accent'
                }`}
              >
                <div className="flex justify-between items-center">
                  <div className="flex items-center space-x-2">
                    <div>
                      <div className="font-medium flex items-center space-x-1">
                        <span>{pair.symbol}</span>
                        {pair.favorite && <Star className="h-3 w-3 text-yellow-400 fill-current" />}
                      </div>
                      <div className="text-sm text-muted-foreground">Vol: {pair.volume}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-mono text-sm">{formatPrice(pair.price)}</div>
                    <div className={`text-xs ${pair.change > 0 ? 'price-up' : 'price-down'}`}>
                      {formatChange(pair.change)}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Trading Area */}
      <div className="trading-main">
        {/* Price Header */}
        <div className="p-4 border-b border-border">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <h2 className="text-2xl font-bold">{selectedPair.symbol}</h2>
              <div className="flex items-center space-x-2">
                <span className="text-2xl font-mono">{formatPrice(selectedPair.price)}</span>
                <div className={`flex items-center space-x-1 ${selectedPair.change > 0 ? 'price-up' : 'price-down'}`}>
                  {selectedPair.change > 0 ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />}
                  <span>{formatChange(selectedPair.change)}</span>
                </div>
              </div>
            </div>
            
            <div className="text-sm text-muted-foreground text-right">
              <div>24h Volume: {selectedPair.volume}</div>
              <div>High: {formatPrice(selectedPair.price * 1.05)} • Low: {formatPrice(selectedPair.price * 0.95)}</div>
            </div>
          </div>
        </div>

        {/* Chart */}
        <div className="flex-1">
          <TradingChart selectedPair={selectedPair} />
        </div>

        {/* Trading Form */}
        <div className="p-4 border-t border-border">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center space-x-2 text-lg">
                <Activity className="h-5 w-5" />
                <span>Place Order</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs value={orderSide} onValueChange={setOrderSide} className="mb-4">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="buy" className="text-green-400">Buy</TabsTrigger>
                  <TabsTrigger value="sell" className="text-red-400">Sell</TabsTrigger>
                </TabsList>
              </Tabs>

              <div className="space-y-4">
                <Select value={orderType} onValueChange={setOrderType}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="limit">Limit Order</SelectItem>
                    <SelectItem value="market">Market Order</SelectItem>
                    <SelectItem value="stop">Stop Order</SelectItem>
                    <SelectItem value="stop-limit">Stop-Limit Order</SelectItem>
                  </SelectContent>
                </Select>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm text-muted-foreground">Price (USDT)</label>
                    <Input
                      type="number"
                      placeholder="0.0000"
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                      className="font-mono"
                    />
                  </div>
                  <div>
                    <label className="text-sm text-muted-foreground">Amount ({selectedPair.symbol.split('/')[0]})</label>
                    <Input
                      type="number"
                      placeholder="0.0000"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      className="font-mono"
                    />
                  </div>
                </div>

                <div className="text-sm text-muted-foreground">
                  Total: {price && amount ? `${(parseFloat(price) * parseFloat(amount)).toFixed(4)} USDT` : '0.0000 USDT'}
                </div>

                <Button 
                  className={`w-full ${orderSide === 'buy' ? 'bg-green-600 hover:bg-green-700' : 'bg-red-600 hover:bg-red-700'}`}
                  disabled={!walletConnected}
                >
                  {!walletConnected ? 'Connect Wallet to Trade' : `${orderSide === 'buy' ? 'Buy' : 'Sell'} ${selectedPair.symbol.split('/')[0]}`}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Order Book */}
      <div className="trading-orderbook">
        <MarketDepth selectedPair={selectedPair} />
      </div>
    </div>
  )
}

export default App

