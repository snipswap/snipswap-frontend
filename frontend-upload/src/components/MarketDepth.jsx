import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Button } from '@/components/ui/button.jsx'
import { Badge } from '@/components/ui/badge.jsx'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs.jsx'
import { Progress } from '@/components/ui/progress.jsx'
import { TrendingUp, TrendingDown, Activity, Layers } from 'lucide-react'

// Enhanced order book data with depth visualization
const generateOrderBookData = () => {
  const currentPrice = 0.4521
  const asks = []
  const bids = []
  
  // Generate asks (sell orders) - prices above current
  for (let i = 1; i <= 15; i++) {
    const price = currentPrice + (i * 0.0001)
    const amount = Math.floor(Math.random() * 2000) + 500
    const total = asks.length > 0 ? asks[asks.length - 1].total + amount : amount
    asks.push({
      price: parseFloat(price.toFixed(4)),
      amount,
      total,
      value: parseFloat((price * amount).toFixed(2))
    })
  }
  
  // Generate bids (buy orders) - prices below current
  for (let i = 1; i <= 15; i++) {
    const price = currentPrice - (i * 0.0001)
    const amount = Math.floor(Math.random() * 2000) + 500
    const total = bids.length > 0 ? bids[bids.length - 1].total + amount : amount
    bids.push({
      price: parseFloat(price.toFixed(4)),
      amount,
      total,
      value: parseFloat((price * amount).toFixed(2))
    })
  }
  
  return { asks: asks.reverse(), bids, currentPrice }
}

const MarketDepth = ({ selectedPair }) => {
  const [view, setView] = useState('orderbook')
  const [precision, setPrecision] = useState(4)
  const { asks, bids, currentPrice } = generateOrderBookData()
  
  const maxTotal = Math.max(
    Math.max(...asks.map(a => a.total)),
    Math.max(...bids.map(b => b.total))
  )
  
  const formatNumber = (num) => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`
    return num.toString()
  }
  
  const OrderBookRow = ({ order, type, maxTotal }) => {
    const percentage = (order.total / maxTotal) * 100
    const isAsk = type === 'ask'
    
    return (
      <div className={`relative grid grid-cols-3 gap-2 py-1 px-2 text-sm font-mono hover:bg-accent/50 cursor-pointer group`}>
        {/* Background depth indicator */}
        <div 
          className={`absolute inset-0 ${isAsk ? 'bg-red-500/10' : 'bg-green-500/10'}`}
          style={{ width: `${percentage}%`, right: isAsk ? 0 : 'auto', left: isAsk ? 'auto' : 0 }}
        />
        
        <div className={`relative z-10 ${isAsk ? 'text-red-400' : 'text-green-400'}`}>
          {order.price.toFixed(precision)}
        </div>
        <div className="relative z-10 text-right">
          {formatNumber(order.amount)}
        </div>
        <div className="relative z-10 text-right text-muted-foreground">
          {formatNumber(order.total)}
        </div>
      </div>
    )
  }
  
  return (
    <Card className="h-full flex flex-col">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg flex items-center space-x-2">
            <Layers className="h-5 w-5" />
            <span>Market Depth</span>
          </CardTitle>
          
          <div className="flex items-center space-x-2">
            <Button
              variant={precision === 2 ? 'default' : 'outline'}
              size="sm"
              onClick={() => setPrecision(2)}
              className="px-2 text-xs"
            >
              0.01
            </Button>
            <Button
              variant={precision === 3 ? 'default' : 'outline'}
              size="sm"
              onClick={() => setPrecision(3)}
              className="px-2 text-xs"
            >
              0.001
            </Button>
            <Button
              variant={precision === 4 ? 'default' : 'outline'}
              size="sm"
              onClick={() => setPrecision(4)}
              className="px-2 text-xs"
            >
              0.0001
            </Button>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="flex-1 p-0">
        <Tabs value={view} onValueChange={setView} className="h-full flex flex-col">
          <TabsList className="mx-4 mb-2">
            <TabsTrigger value="orderbook" className="text-xs">Order Book</TabsTrigger>
            <TabsTrigger value="trades" className="text-xs">Recent Trades</TabsTrigger>
          </TabsList>
          
          <TabsContent value="orderbook" className="flex-1 m-0">
            <div className="h-full flex flex-col">
              {/* Headers */}
              <div className="grid grid-cols-3 gap-2 px-2 py-2 text-xs text-muted-foreground border-b border-border">
                <div>Price (USDT)</div>
                <div className="text-right">Amount (SCRT)</div>
                <div className="text-right">Total</div>
              </div>
              
              {/* Asks (Sell Orders) */}
              <div className="flex-1 overflow-y-auto">
                <div className="space-y-0">
                  {asks.slice(0, 8).map((ask, index) => (
                    <OrderBookRow 
                      key={`ask-${index}`} 
                      order={ask} 
                      type="ask" 
                      maxTotal={maxTotal}
                    />
                  ))}
                </div>
                
                {/* Current Price */}
                <div className="py-3 px-2 border-y border-border bg-accent/20">
                  <div className="flex items-center justify-between">
                    <div className="text-lg font-mono font-bold text-primary">
                      {currentPrice.toFixed(4)}
                    </div>
                    <div className="flex items-center space-x-1 text-sm">
                      <TrendingUp className="h-4 w-4 text-green-400" />
                      <span className="text-green-400">+2.34%</span>
                    </div>
                  </div>
                  <div className="text-xs text-muted-foreground mt-1">
                    ≈ ${(currentPrice * 1.0).toFixed(4)} USD
                  </div>
                </div>
                
                {/* Bids (Buy Orders) */}
                <div className="space-y-0">
                  {bids.slice(0, 8).map((bid, index) => (
                    <OrderBookRow 
                      key={`bid-${index}`} 
                      order={bid} 
                      type="bid" 
                      maxTotal={maxTotal}
                    />
                  ))}
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="trades" className="flex-1 m-0">
            <div className="h-full flex flex-col">
              {/* Headers */}
              <div className="grid grid-cols-3 gap-2 px-2 py-2 text-xs text-muted-foreground border-b border-border">
                <div>Price (USDT)</div>
                <div className="text-right">Amount (SCRT)</div>
                <div className="text-right">Time</div>
              </div>
              
              {/* Recent Trades */}
              <div className="flex-1 overflow-y-auto">
                <div className="space-y-0">
                  {Array.from({ length: 20 }, (_, i) => {
                    const isBuy = Math.random() > 0.5
                    const price = currentPrice + (Math.random() - 0.5) * 0.001
                    const amount = Math.floor(Math.random() * 1000) + 100
                    const time = new Date(Date.now() - i * 30000).toLocaleTimeString('en-US', { 
                      hour12: false, 
                      hour: '2-digit', 
                      minute: '2-digit', 
                      second: '2-digit' 
                    })
                    
                    return (
                      <div key={i} className="grid grid-cols-3 gap-2 py-1 px-2 text-sm font-mono hover:bg-accent/50">
                        <div className={isBuy ? 'text-green-400' : 'text-red-400'}>
                          {price.toFixed(4)}
                        </div>
                        <div className="text-right">
                          {formatNumber(amount)}
                        </div>
                        <div className="text-right text-muted-foreground text-xs">
                          {time}
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
      
      {/* Market Summary */}
      <div className="p-4 border-t border-border">
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <div className="text-muted-foreground">24h Volume</div>
            <div className="font-mono font-semibold">{selectedPair.volume}</div>
          </div>
          <div>
            <div className="text-muted-foreground">24h Change</div>
            <div className={`font-mono font-semibold ${selectedPair.change > 0 ? 'text-green-400' : 'text-red-400'}`}>
              {selectedPair.change > 0 ? '+' : ''}{selectedPair.change.toFixed(2)}%
            </div>
          </div>
        </div>
      </div>
    </Card>
  )
}

export default MarketDepth

