import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Button } from '@/components/ui/button.jsx'
import { Badge } from '@/components/ui/badge.jsx'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select.jsx'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs.jsx'
import { 
  LineChart, 
  Line, 
  BarChart, 
  Bar, 
  CandlestickChart,
  XAxis, 
  YAxis, 
  CartesianGrid, 
  ResponsiveContainer,
  ReferenceLine,
  Area,
  AreaChart
} from 'recharts'
import { TrendingUp, BarChart3, Activity, Eye, EyeOff, Settings } from 'lucide-react'

// Enhanced mock data with technical indicators
const generateChartData = () => {
  const basePrice = 0.4521
  const data = []
  let price = basePrice
  let volume = 1000000
  
  for (let i = 0; i < 100; i++) {
    const change = (Math.random() - 0.5) * 0.01
    price = Math.max(0.001, price + change)
    volume = Math.max(100000, volume + (Math.random() - 0.5) * 200000)
    
    // Calculate technical indicators
    const rsi = 30 + Math.random() * 40 // RSI between 30-70
    const ema12 = price * (0.95 + Math.random() * 0.1)
    const ema26 = price * (0.9 + Math.random() * 0.2)
    const vwap = price * (0.98 + Math.random() * 0.04)
    
    data.push({
      time: `${9 + Math.floor(i / 10)}:${(i % 10) * 6}0`,
      price: parseFloat(price.toFixed(4)),
      volume: Math.floor(volume),
      high: parseFloat((price * 1.002).toFixed(4)),
      low: parseFloat((price * 0.998).toFixed(4)),
      open: parseFloat((price * 0.999).toFixed(4)),
      close: parseFloat(price.toFixed(4)),
      rsi: parseFloat(rsi.toFixed(2)),
      ema12: parseFloat(ema12.toFixed(4)),
      ema26: parseFloat(ema26.toFixed(4)),
      vwap: parseFloat(vwap.toFixed(4)),
      macd: parseFloat(((ema12 - ema26) * 100).toFixed(2))
    })
  }
  return data
}

const TradingChart = ({ selectedPair }) => {
  const [chartType, setChartType] = useState('line')
  const [timeframe, setTimeframe] = useState('1D')
  const [indicators, setIndicators] = useState({
    vwap: true,
    ema12: true,
    ema26: false,
    rsi: false,
    volume: true
  })
  const [showIndicatorPanel, setShowIndicatorPanel] = useState(false)
  
  const chartData = generateChartData()
  
  const timeframes = ['1m', '5m', '15m', '1H', '4H', '1D', '1W', '1M']
  
  const toggleIndicator = (indicator) => {
    setIndicators(prev => ({
      ...prev,
      [indicator]: !prev[indicator]
    }))
  }
  
  const getChartComponent = () => {
    switch (chartType) {
      case 'line':
        return (
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.20 0.02 264)" />
            <XAxis dataKey="time" stroke="oklch(0.65 0.02 264)" fontSize={12} />
            <YAxis stroke="oklch(0.65 0.02 264)" fontSize={12} domain={['dataMin - 0.001', 'dataMax + 0.001']} />
            
            {/* Main price line */}
            <Line 
              type="monotone" 
              dataKey="price" 
              stroke="oklch(0.65 0.25 264)" 
              strokeWidth={2}
              dot={false}
            />
            
            {/* VWAP */}
            {indicators.vwap && (
              <Line 
                type="monotone" 
                dataKey="vwap" 
                stroke="oklch(0.70 0.20 60)" 
                strokeWidth={1}
                strokeDasharray="5 5"
                dot={false}
              />
            )}
            
            {/* EMA 12 */}
            {indicators.ema12 && (
              <Line 
                type="monotone" 
                dataKey="ema12" 
                stroke="oklch(0.70 0.25 120)" 
                strokeWidth={1}
                dot={false}
              />
            )}
            
            {/* EMA 26 */}
            {indicators.ema26 && (
              <Line 
                type="monotone" 
                dataKey="ema26" 
                stroke="oklch(0.70 0.25 300)" 
                strokeWidth={1}
                dot={false}
              />
            )}
          </LineChart>
        )
      
      case 'candles':
        return (
          <AreaChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.20 0.02 264)" />
            <XAxis dataKey="time" stroke="oklch(0.65 0.02 264)" fontSize={12} />
            <YAxis stroke="oklch(0.65 0.02 264)" fontSize={12} />
            <Area 
              type="monotone" 
              dataKey="price" 
              stroke="oklch(0.65 0.25 264)" 
              fill="oklch(0.65 0.25 264 / 0.1)"
              strokeWidth={2}
            />
          </AreaChart>
        )
      
      case 'bars':
        return (
          <BarChart data={chartData.slice(-20)}>
            <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.20 0.02 264)" />
            <XAxis dataKey="time" stroke="oklch(0.65 0.02 264)" fontSize={12} />
            <YAxis stroke="oklch(0.65 0.02 264)" fontSize={12} />
            <Bar dataKey="price" fill="oklch(0.65 0.25 264)" />
          </BarChart>
        )
      
      default:
        return null
    }
  }
  
  return (
    <div className="flex flex-col h-full">
      {/* Chart Header */}
      <div className="flex items-center justify-between p-4 border-b border-border">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <h3 className="text-lg font-semibold">{selectedPair.symbol}</h3>
            <Badge variant="outline" className="text-xs">
              {timeframe}
            </Badge>
          </div>
          
          {/* Chart Type Selector */}
          <div className="flex items-center space-x-1">
            <Button
              variant={chartType === 'line' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setChartType('line')}
              className="px-3"
            >
              <TrendingUp className="h-4 w-4" />
            </Button>
            <Button
              variant={chartType === 'candles' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setChartType('candles')}
              className="px-3"
            >
              <BarChart3 className="h-4 w-4" />
            </Button>
            <Button
              variant={chartType === 'bars' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setChartType('bars')}
              className="px-3"
            >
              <Activity className="h-4 w-4" />
            </Button>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          {/* Timeframe Selector */}
          <div className="flex space-x-1">
            {timeframes.map((tf) => (
              <Button
                key={tf}
                variant={timeframe === tf ? 'default' : 'outline'}
                size="sm"
                onClick={() => setTimeframe(tf)}
                className="px-2 text-xs"
              >
                {tf}
              </Button>
            ))}
          </div>
          
          {/* Indicators Toggle */}
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowIndicatorPanel(!showIndicatorPanel)}
            className="flex items-center space-x-1"
          >
            <Settings className="h-4 w-4" />
            <span>Indicators</span>
          </Button>
        </div>
      </div>
      
      {/* Indicators Panel */}
      {showIndicatorPanel && (
        <div className="p-4 border-b border-border bg-accent/20">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={indicators.vwap}
                onChange={() => toggleIndicator('vwap')}
                className="rounded"
              />
              <span className="text-sm">VWAP</span>
              <div className="w-3 h-3 rounded bg-yellow-500"></div>
            </div>
            
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={indicators.ema12}
                onChange={() => toggleIndicator('ema12')}
                className="rounded"
              />
              <span className="text-sm">EMA(12)</span>
              <div className="w-3 h-3 rounded bg-green-500"></div>
            </div>
            
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={indicators.ema26}
                onChange={() => toggleIndicator('ema26')}
                className="rounded"
              />
              <span className="text-sm">EMA(26)</span>
              <div className="w-3 h-3 rounded bg-purple-500"></div>
            </div>
            
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={indicators.rsi}
                onChange={() => toggleIndicator('rsi')}
                className="rounded"
              />
              <span className="text-sm">RSI(14)</span>
              <div className="w-3 h-3 rounded bg-orange-500"></div>
            </div>
            
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={indicators.volume}
                onChange={() => toggleIndicator('volume')}
                className="rounded"
              />
              <span className="text-sm">Volume</span>
              <div className="w-3 h-3 rounded bg-blue-500"></div>
            </div>
          </div>
        </div>
      )}
      
      {/* Main Chart */}
      <div className="flex-1 p-4">
        <ResponsiveContainer width="100%" height="100%">
          {getChartComponent()}
        </ResponsiveContainer>
      </div>
      
      {/* Volume Chart */}
      {indicators.volume && (
        <div className="h-32 p-4 border-t border-border">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData.slice(-20)}>
              <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.20 0.02 264)" />
              <XAxis dataKey="time" stroke="oklch(0.65 0.02 264)" fontSize={10} />
              <YAxis stroke="oklch(0.65 0.02 264)" fontSize={10} />
              <Bar dataKey="volume" fill="oklch(0.60 0.20 200 / 0.6)" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}
      
      {/* RSI Indicator */}
      {indicators.rsi && (
        <div className="h-24 p-4 border-t border-border">
          <div className="text-xs text-muted-foreground mb-2">RSI (14)</div>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData.slice(-20)}>
              <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.20 0.02 264)" />
              <XAxis dataKey="time" stroke="oklch(0.65 0.02 264)" fontSize={10} />
              <YAxis domain={[0, 100]} stroke="oklch(0.65 0.02 264)" fontSize={10} />
              <ReferenceLine y={70} stroke="oklch(0.70 0.25 15)" strokeDasharray="2 2" />
              <ReferenceLine y={30} stroke="oklch(0.70 0.25 120)" strokeDasharray="2 2" />
              <Line 
                type="monotone" 
                dataKey="rsi" 
                stroke="oklch(0.70 0.25 30)" 
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  )
}

export default TradingChart

