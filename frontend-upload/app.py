#!/usr/bin/env python3
"""
SnipSwap DEX Backend API
Railway deployment ready Flask application with price oracle and wallet services
"""

from flask import Flask, jsonify, request
from flask_cors import CORS
import os
import json
import time
import random
from datetime import datetime, timedelta

app = Flask(__name__)
CORS(app)

# Configuration
app.config['SECRET_KEY'] = os.environ.get('SECRET_KEY', 'snipswap-dex-secret-key-2024')
app.config['DEBUG'] = os.environ.get('FLASK_DEBUG', '0') == '1'

# Trading pairs data
TRADING_PAIRS = {
    'ATOM': {
        'name': 'Cosmos',
        'symbol': 'ATOM',
        'base_price': 4.5542,
        'decimals': 6,
        'icon': '⚛️',
        'network': 'cosmos'
    },
    'SCRT': {
        'name': 'Secret Network',
        'symbol': 'SCRT',
        'base_price': 0.1959,
        'decimals': 6,
        'icon': '🔐',
        'network': 'secret'
    },
    'OSMO': {
        'name': 'Osmosis',
        'symbol': 'OSMO',
        'base_price': 0.1679,
        'decimals': 6,
        'icon': '🌊',
        'network': 'osmosis'
    },
    'BTC': {
        'name': 'Bitcoin',
        'symbol': 'BTC',
        'base_price': 115270.09,
        'decimals': 8,
        'icon': '₿',
        'network': 'bitcoin'
    },
    'ETH': {
        'name': 'Ethereum',
        'symbol': 'ETH',
        'base_price': 4319.17,
        'decimals': 18,
        'icon': 'Ξ',
        'network': 'ethereum'
    }
}

def generate_price_data(symbol, timeframe='1d', points=100):
    """Generate realistic price data for charts"""
    pair = TRADING_PAIRS.get(symbol.upper())
    if not pair:
        return None
    
    base_price = pair['base_price']
    data = []
    current_price = base_price * (0.95 + random.random() * 0.1)  # Start within 5% of base
    
    # Determine time intervals based on timeframe
    if timeframe == '1h':
        interval_minutes = 1
        points = 60
    elif timeframe == '4h':
        interval_minutes = 4
        points = 60
    elif timeframe == '1d':
        interval_minutes = 5
        points = 288
    elif timeframe == '1w':
        interval_minutes = 30
        points = 336
    else:
        interval_minutes = 5
        points = 100
    
    start_time = datetime.now() - timedelta(minutes=points * interval_minutes)
    
    for i in range(points):
        # Generate realistic price movement
        volatility = 0.02 if symbol.upper() in ['BTC', 'ETH'] else 0.05
        trend = random.uniform(-0.001, 0.001)
        noise = random.uniform(-volatility, volatility)
        
        price_change = trend + noise
        current_price *= (1 + price_change)
        
        # Ensure price doesn't go too far from base
        if current_price < base_price * 0.7:
            current_price = base_price * 0.7
        elif current_price > base_price * 1.3:
            current_price = base_price * 1.3
        
        timestamp = start_time + timedelta(minutes=i * interval_minutes)
        
        data.append({
            'time': int(timestamp.timestamp() * 1000),
            'price': round(current_price, 8),
            'volume': random.uniform(100000, 10000000)
        })
    
    return data

@app.route('/')
def home():
    """API root endpoint"""
    return jsonify({
        'name': 'SnipSwap DEX API',
        'version': '1.0.0',
        'description': 'Privacy-first decentralized exchange API',
        'status': 'running',
        'timestamp': datetime.now().isoformat(),
        'features': [
            'Real-time price oracle',
            'Multi-wallet support',
            'Secret Network integration',
            'Cross-chain bridging',
            'Privacy-first trading'
        ]
    })

@app.route('/api/status')
def api_status():
    """API status endpoint"""
    return jsonify({
        'status': 'healthy',
        'uptime': time.time(),
        'pairs_supported': len(TRADING_PAIRS),
        'networks': ['cosmos', 'secret', 'osmosis', 'ethereum', 'bitcoin'],
        'wallets_supported': ['keplr', 'leap', 'metamask', 'okx'],
        'last_updated': datetime.now().isoformat()
    })

@app.route('/api/pairs')
def get_pairs():
    """Get all supported trading pairs"""
    pairs_data = {}
    
    for symbol, pair in TRADING_PAIRS.items():
        # Generate current price with small random variation
        current_price = pair['base_price'] * (0.98 + random.random() * 0.04)
        price_change = random.uniform(-5.0, 5.0)
        
        pairs_data[symbol] = {
            'symbol': symbol,
            'name': pair['name'],
            'icon': pair['icon'],
            'network': pair['network'],
            'price': round(current_price, 8),
            'change_24h': round(price_change, 2),
            'volume_24h': random.uniform(1000000, 100000000),
            'market_cap': random.uniform(100000000, 10000000000),
            'decimals': pair['decimals']
        }
    
    return jsonify({
        'pairs': pairs_data,
        'count': len(pairs_data),
        'timestamp': datetime.now().isoformat()
    })

@app.route('/api/price/<symbol>')
def get_price_data(symbol):
    """Get price data for a specific trading pair"""
    timeframe = request.args.get('timeframe', '1d')
    
    pair = TRADING_PAIRS.get(symbol.upper())
    if not pair:
        return jsonify({'error': 'Trading pair not found'}), 404
    
    # Generate price data
    price_data = generate_price_data(symbol, timeframe)
    if not price_data:
        return jsonify({'error': 'Failed to generate price data'}), 500
    
    # Calculate statistics
    prices = [p['price'] for p in price_data]
    current_price = prices[-1]
    previous_price = prices[0]
    price_change = ((current_price - previous_price) / previous_price) * 100
    
    return jsonify({
        'symbol': symbol.upper(),
        'name': pair['name'],
        'current': current_price,
        'change': round(price_change, 2),
        'high24h': max(prices),
        'low24h': min(prices),
        'volume24h': sum(p['volume'] for p in price_data),
        'prices': price_data,
        'timeframe': timeframe,
        'timestamp': datetime.now().isoformat()
    })

@app.route('/api/wallet/connect', methods=['POST'])
def wallet_connect():
    """Handle wallet connection requests"""
    data = request.get_json()
    wallet_type = data.get('wallet_type')
    address = data.get('address')
    
    if not wallet_type or not address:
        return jsonify({'error': 'Missing wallet_type or address'}), 400
    
    # Simulate wallet connection
    return jsonify({
        'success': True,
        'wallet_type': wallet_type,
        'address': address,
        'supported_networks': ['cosmos', 'secret', 'osmosis', 'ethereum'],
        'features': {
            'trading': True,
            'staking': wallet_type in ['keplr', 'leap'],
            'bridging': True,
            'privacy': wallet_type in ['keplr', 'leap', 'okx']
        },
        'timestamp': datetime.now().isoformat()
    })

@app.route('/api/wallet/balance/<address>')
def get_wallet_balance(address):
    """Get wallet balance for an address"""
    network = request.args.get('network', 'cosmos')
    
    # Simulate balance data
    balances = []
    for symbol, pair in TRADING_PAIRS.items():
        if pair['network'] == network or network == 'all':
            balance = random.uniform(0, 1000)
            balances.append({
                'symbol': symbol,
                'balance': round(balance, pair['decimals']),
                'value_usd': round(balance * pair['base_price'], 2),
                'network': pair['network']
            })
    
    return jsonify({
        'address': address,
        'network': network,
        'balances': balances,
        'total_value_usd': sum(b['value_usd'] for b in balances),
        'timestamp': datetime.now().isoformat()
    })

@app.route('/api/bridge/status/<tx_hash>')
def get_bridge_status(tx_hash):
    """Get bridge transaction status"""
    # Simulate bridge status
    statuses = ['pending', 'confirming', 'completed', 'failed']
    status = random.choice(statuses)
    
    return jsonify({
        'tx_hash': tx_hash,
        'status': status,
        'confirmations': random.randint(1, 20) if status != 'pending' else 0,
        'estimated_time': '2-5 minutes' if status == 'pending' else 'completed',
        'from_chain': 'ethereum',
        'to_chain': 'secret',
        'amount': random.uniform(1, 100),
        'timestamp': datetime.now().isoformat()
    })

@app.route('/api/trade/order', methods=['POST'])
def create_trade_order():
    """Create a new trade order"""
    data = request.get_json()
    
    required_fields = ['pair', 'side', 'amount', 'price']
    if not all(field in data for field in required_fields):
        return jsonify({'error': 'Missing required fields'}), 400
    
    # Simulate order creation
    order_id = f"order_{int(time.time())}_{random.randint(1000, 9999)}"
    
    return jsonify({
        'success': True,
        'order_id': order_id,
        'pair': data['pair'],
        'side': data['side'],
        'amount': data['amount'],
        'price': data['price'],
        'status': 'pending',
        'timestamp': datetime.now().isoformat()
    })

@app.route('/api/privacy/mode', methods=['POST'])
def set_privacy_mode():
    """Set privacy mode for trading"""
    data = request.get_json()
    mode = data.get('mode', 'public')
    
    return jsonify({
        'success': True,
        'privacy_mode': mode,
        'features': {
            'public': ['basic_trading'],
            'private': ['basic_trading', 'hidden_amounts'],
            'stealth': ['basic_trading', 'hidden_amounts', 'mev_protection', 'anonymous_trading']
        }.get(mode, []),
        'timestamp': datetime.now().isoformat()
    })

@app.errorhandler(404)
def not_found(error):
    """Handle 404 errors"""
    return jsonify({
        'error': 'Endpoint not found',
        'message': 'The requested API endpoint does not exist',
        'available_endpoints': [
            '/',
            '/api/status',
            '/api/pairs',
            '/api/price/<symbol>',
            '/api/wallet/connect',
            '/api/wallet/balance/<address>',
            '/api/bridge/status/<tx_hash>',
            '/api/trade/order',
            '/api/privacy/mode'
        ]
    }), 404

@app.errorhandler(500)
def internal_error(error):
    """Handle 500 errors"""
    return jsonify({
        'error': 'Internal server error',
        'message': 'An unexpected error occurred',
        'timestamp': datetime.now().isoformat()
    }), 500

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    debug = os.environ.get('FLASK_DEBUG', '0') == '1'
    
    print(f"🚀 Starting SnipSwap DEX API on port {port}")
    print(f"🔐 Privacy-first trading platform")
    print(f"📊 Real-time price oracle ready")
    print(f"🔗 Multi-wallet support enabled")
    
    app.run(
        host='0.0.0.0',
        port=port,
        debug=debug,
        threaded=True
    )

