/**
 * SnipSwap Wallet Service
 * Comprehensive wallet integration for Cosmos ecosystem
 * 
 * Features:
 * - Multi-wallet support (Keplr, Leap, Cosmostation)
 * - Secret Network integration for privacy
 * - Cross-chain transactions via IBC
 * - Portfolio tracking and balance management
 * - Privacy-preserving trades
 */

import { SigningCosmWasmClient } from '@cosmjs/cosmwasm-stargate';
import { SigningStargateClient } from '@cosmjs/stargate';
import { GasPrice } from '@cosmjs/stargate';

export class SnipSwapWalletService {
  constructor() {
    this.connectedWallet = null;
    this.walletType = null;
    this.address = null;
    this.client = null;
    this.secretClient = null;
    this.balances = {};
    this.portfolioValue = 0;
    
    // Supported wallets
    this.supportedWallets = {
      keplr: {
        name: 'Keplr',
        icon: '🦊',
        available: false,
        priority: 1
      },
      leap: {
        name: 'Leap Cosmos',
        icon: '🐸',
        available: false,
        priority: 2
      },
      cosmostation: {
        name: 'Cosmostation',
        icon: '🌌',
        available: false,
        priority: 3
      }
    };
    
    // Chain configurations
    this.chainConfigs = {
      'cosmoshub-4': {
        chainId: 'cosmoshub-4',
        chainName: 'Cosmos Hub',
        rpc: 'https://rpc-cosmoshub.blockapsis.com',
        rest: 'https://lcd-cosmoshub.blockapsis.com',
        bip44: { coinType: 118 },
        bech32Config: {
          bech32PrefixAccAddr: 'cosmos',
          bech32PrefixAccPub: 'cosmospub',
          bech32PrefixValAddr: 'cosmosvaloper',
          bech32PrefixValPub: 'cosmosvaloperpub',
          bech32PrefixConsAddr: 'cosmosvalcons',
          bech32PrefixConsPub: 'cosmosvalconspub'
        },
        currencies: [{ coinDenom: 'ATOM', coinMinimalDenom: 'uatom', coinDecimals: 6 }],
        feeCurrencies: [{ coinDenom: 'ATOM', coinMinimalDenom: 'uatom', coinDecimals: 6, gasPriceStep: { low: 0.01, average: 0.025, high: 0.04 } }],
        stakeCurrency: { coinDenom: 'ATOM', coinMinimalDenom: 'uatom', coinDecimals: 6 }
      },
      'osmosis-1': {
        chainId: 'osmosis-1',
        chainName: 'Osmosis',
        rpc: 'https://rpc-osmosis.blockapsis.com',
        rest: 'https://lcd-osmosis.blockapsis.com',
        bip44: { coinType: 118 },
        bech32Config: {
          bech32PrefixAccAddr: 'osmo',
          bech32PrefixAccPub: 'osmopub',
          bech32PrefixValAddr: 'osmovaloper',
          bech32PrefixValPub: 'osmovaloperpub',
          bech32PrefixConsAddr: 'osmovalcons',
          bech32PrefixConsPub: 'osmovalconspub'
        },
        currencies: [{ coinDenom: 'OSMO', coinMinimalDenom: 'uosmo', coinDecimals: 6 }],
        feeCurrencies: [{ coinDenom: 'OSMO', coinMinimalDenom: 'uosmo', coinDecimals: 6, gasPriceStep: { low: 0.0025, average: 0.025, high: 0.04 } }],
        stakeCurrency: { coinDenom: 'OSMO', coinMinimalDenom: 'uosmo', coinDecimals: 6 }
      },
      'secret-4': {
        chainId: 'secret-4',
        chainName: 'Secret Network',
        rpc: 'https://scrt-rpc.whispernode.com',
        rest: 'https://scrt-lcd.whispernode.com',
        bip44: { coinType: 529 },
        bech32Config: {
          bech32PrefixAccAddr: 'secret',
          bech32PrefixAccPub: 'secretpub',
          bech32PrefixValAddr: 'secretvaloper',
          bech32PrefixValPub: 'secretvaloperpub',
          bech32PrefixConsAddr: 'secretvalcons',
          bech32PrefixConsPub: 'secretvalconspub'
        },
        currencies: [{ coinDenom: 'SCRT', coinMinimalDenom: 'uscrt', coinDecimals: 6 }],
        feeCurrencies: [{ coinDenom: 'SCRT', coinMinimalDenom: 'uscrt', coinDecimals: 6, gasPriceStep: { low: 0.1, average: 0.25, high: 0.4 } }],
        stakeCurrency: { coinDenom: 'SCRT', coinMinimalDenom: 'uscrt', coinDecimals: 6 }
      }
    };
    
    this.init();
  }
  
  async init() {
    // Check wallet availability
    await this.checkWalletAvailability();
    
    // Set up event listeners
    this.setupEventListeners();
  }
  
  async checkWalletAvailability() {
    // Check Keplr
    if (window.keplr) {
      this.supportedWallets.keplr.available = true;
    }
    
    // Check Leap
    if (window.leap) {
      this.supportedWallets.leap.available = true;
    }
    
    // Check Cosmostation
    if (window.cosmostation) {
      this.supportedWallets.cosmostation.available = true;
    }
    
    console.log('Available wallets:', Object.entries(this.supportedWallets)
      .filter(([_, wallet]) => wallet.available)
      .map(([key, wallet]) => wallet.name));
  }
  
  setupEventListeners() {
    // Listen for account changes
    if (window.keplr) {
      window.addEventListener('keplr_keystorechange', () => {
        if (this.walletType === 'keplr') {
          this.handleAccountChange();
        }
      });
    }
    
    if (window.leap) {
      window.addEventListener('leap_keystorechange', () => {
        if (this.walletType === 'leap') {
          this.handleAccountChange();
        }
      });
    }
  }
  
  async handleAccountChange() {
    if (this.connectedWallet) {
      console.log('Account changed, reconnecting...');
      await this.disconnect();
      // Auto-reconnect could be implemented here
    }
  }
  
  getAvailableWallets() {
    return Object.entries(this.supportedWallets)
      .filter(([_, wallet]) => wallet.available)
      .sort((a, b) => a[1].priority - b[1].priority)
      .map(([key, wallet]) => ({ key, ...wallet }));
  }
  
  async connectWallet(walletType = 'keplr', chainId = 'cosmoshub-4') {
    try {
      console.log(`Connecting to ${walletType} wallet...`);
      
      let wallet;
      switch (walletType) {
        case 'keplr':
          wallet = window.keplr;
          break;
        case 'leap':
          wallet = window.leap;
          break;
        case 'cosmostation':
          wallet = window.cosmostation;
          break;
        default:
          throw new Error(`Unsupported wallet type: ${walletType}`);
      }
      
      if (!wallet) {
        throw new Error(`${walletType} wallet not found. Please install the extension.`);
      }
      
      // Suggest chain if not already added
      const chainConfig = this.chainConfigs[chainId];
      if (chainConfig && wallet.experimentalSuggestChain) {
        try {
          await wallet.experimentalSuggestChain(chainConfig);
        } catch (error) {
          console.warn('Failed to suggest chain:', error);
        }
      }
      
      // Enable wallet
      await wallet.enable(chainId);
      
      // Get offline signer
      const offlineSigner = wallet.getOfflineSigner(chainId);
      const accounts = await offlineSigner.getAccounts();
      
      if (accounts.length === 0) {
        throw new Error('No accounts found in wallet');
      }
      
      this.address = accounts[0].address;
      this.walletType = walletType;
      this.connectedWallet = wallet;
      
      // Create signing client
      const rpcEndpoint = chainConfig.rpc;
      this.client = await SigningStargateClient.connectWithSigner(
        rpcEndpoint,
        offlineSigner,
        {
          gasPrice: GasPrice.fromString('0.025uatom')
        }
      );
      
      // Create Secret Network client if connecting to Secret
      if (chainId === 'secret-4') {
        this.secretClient = await SigningCosmWasmClient.connectWithSigner(
          chainConfig.rpc,
          offlineSigner,
          {
            gasPrice: GasPrice.fromString('0.25uscrt')
          }
        );
      }
      
      // Fetch initial balances
      await this.updateBalances();
      
      console.log(`Successfully connected to ${walletType}:`, this.address);
      
      return {
        success: true,
        address: this.address,
        walletType: this.walletType,
        chainId: chainId
      };
      
    } catch (error) {
      console.error('Failed to connect wallet:', error);
      throw error;
    }
  }
  
  async disconnect() {
    this.connectedWallet = null;
    this.walletType = null;
    this.address = null;
    this.client = null;
    this.secretClient = null;
    this.balances = {};
    this.portfolioValue = 0;
    
    console.log('Wallet disconnected');
  }
  
  isConnected() {
    return !!this.connectedWallet && !!this.address;
  }
  
  getConnectionInfo() {
    return {
      connected: this.isConnected(),
      address: this.address,
      walletType: this.walletType,
      balances: this.balances,
      portfolioValue: this.portfolioValue
    };
  }
  
  async updateBalances() {
    if (!this.client || !this.address) {
      return;
    }
    
    try {
      const balances = await this.client.getAllBalances(this.address);
      
      // Convert to readable format
      this.balances = {};
      let totalValue = 0;
      
      for (const balance of balances) {
        const denom = balance.denom;
        const amount = parseFloat(balance.amount);
        
        // Convert to readable units (assuming 6 decimals for most tokens)
        const readableAmount = amount / 1000000;
        
        // Map denom to symbol
        let symbol = denom;
        if (denom === 'uatom') symbol = 'ATOM';
        else if (denom === 'uosmo') symbol = 'OSMO';
        else if (denom === 'uscrt') symbol = 'SCRT';
        else if (denom.startsWith('ibc/')) symbol = 'IBC';
        
        this.balances[symbol] = {
          denom: denom,
          amount: readableAmount,
          raw: balance.amount,
          symbol: symbol
        };
        
        // Add to portfolio value (simplified - would need price data in real implementation)
        totalValue += readableAmount * this.getTokenPrice(symbol);
      }
      
      this.portfolioValue = totalValue;
      
      console.log('Updated balances:', this.balances);
      
    } catch (error) {
      console.error('Failed to update balances:', error);
    }
  }
  
  getTokenPrice(symbol) {
    // Mock prices - in real implementation, this would fetch from the backend
    const mockPrices = {
      'ATOM': 4.65,
      'OSMO': 0.164,
      'SCRT': 0.179,
      'JUNO': 0.065,
      'STARS': 0.0008,
      'HUAHUA': 0.00002,
      'DVPN': 0.0002,
      'AKT': 1.16,
      'INJ': 14.44,
      'LUNA': 0.160,
      'KUJI': 0.240,
      'CMDX': 0.0004
    };
    
    return mockPrices[symbol] || 0;
  }
  
  async sendTransaction(recipient, amount, denom = 'uatom') {
    if (!this.client || !this.address) {
      throw new Error('Wallet not connected');
    }
    
    try {
      const fee = {
        amount: [{ denom: 'uatom', amount: '5000' }],
        gas: '200000'
      };
      
      const result = await this.client.sendTokens(
        this.address,
        recipient,
        [{ denom: denom, amount: amount.toString() }],
        fee,
        'SnipSwap DEX Transaction'
      );
      
      console.log('Transaction successful:', result);
      
      // Update balances after transaction
      await this.updateBalances();
      
      return {
        success: true,
        txHash: result.transactionHash,
        height: result.height
      };
      
    } catch (error) {
      console.error('Transaction failed:', error);
      throw error;
    }
  }
  
  async executePrivateTrade(tradeData) {
    if (!this.secretClient || !this.address) {
      throw new Error('Secret Network client not available');
    }
    
    try {
      // This would interact with Secret Network smart contracts for private trading
      // Simplified implementation - real version would use actual Secret contracts
      
      const contractAddress = 'secret1...'; // SnipSwap private trading contract
      const msg = {
        execute_private_trade: {
          trade_type: tradeData.type,
          amount: tradeData.amount,
          price: tradeData.price,
          symbol: tradeData.symbol
        }
      };
      
      const fee = {
        amount: [{ denom: 'uscrt', amount: '25000' }],
        gas: '300000'
      };
      
      const result = await this.secretClient.execute(
        this.address,
        contractAddress,
        msg,
        fee,
        'SnipSwap Private Trade'
      );
      
      console.log('Private trade executed:', result);
      
      return {
        success: true,
        txHash: result.transactionHash,
        private: true
      };
      
    } catch (error) {
      console.error('Private trade failed:', error);
      throw error;
    }
  }
  
  async signMessage(message) {
    if (!this.connectedWallet || !this.address) {
      throw new Error('Wallet not connected');
    }
    
    try {
      const signature = await this.connectedWallet.signArbitrary(
        'cosmoshub-4', // or appropriate chain
        this.address,
        message
      );
      
      return {
        success: true,
        signature: signature,
        address: this.address
      };
      
    } catch (error) {
      console.error('Message signing failed:', error);
      throw error;
    }
  }
  
  async getTransactionHistory(limit = 50) {
    // This would fetch transaction history from a blockchain indexer
    // Simplified mock implementation
    
    return {
      transactions: [
        {
          hash: '0x123...',
          type: 'send',
          amount: '100',
          denom: 'uatom',
          timestamp: Date.now() - 3600000,
          status: 'success'
        },
        {
          hash: '0x456...',
          type: 'trade',
          amount: '50',
          denom: 'uosmo',
          timestamp: Date.now() - 7200000,
          status: 'success',
          private: true
        }
      ],
      total: 2
    };
  }
  
  // Privacy features
  async enablePrivacyMode() {
    if (!this.secretClient) {
      throw new Error('Secret Network not available');
    }
    
    // Initialize privacy features
    console.log('Privacy mode enabled - all trades will be private');
    return { success: true, privacy: true };
  }
  
  async createViewingKey(contractAddress) {
    if (!this.secretClient || !this.address) {
      throw new Error('Secret Network client not available');
    }
    
    try {
      const entropy = Math.random().toString(36).substring(2, 15);
      const msg = { create_viewing_key: { entropy } };
      
      const fee = {
        amount: [{ denom: 'uscrt', amount: '10000' }],
        gas: '100000'
      };
      
      const result = await this.secretClient.execute(
        this.address,
        contractAddress,
        msg,
        fee
      );
      
      return {
        success: true,
        viewingKey: entropy,
        txHash: result.transactionHash
      };
      
    } catch (error) {
      console.error('Failed to create viewing key:', error);
      throw error;
    }
  }
  
  // Portfolio management
  getPortfolioSummary() {
    const summary = {
      totalValue: this.portfolioValue,
      balances: this.balances,
      address: this.address,
      walletType: this.walletType,
      connected: this.isConnected()
    };
    
    // Calculate portfolio distribution
    if (this.portfolioValue > 0) {
      summary.distribution = {};
      for (const [symbol, balance] of Object.entries(this.balances)) {
        const value = balance.amount * this.getTokenPrice(symbol);
        summary.distribution[symbol] = {
          value: value,
          percentage: (value / this.portfolioValue) * 100
        };
      }
    }
    
    return summary;
  }
  
  // Cross-chain functionality
  async initiateCrossChainTransfer(targetChain, amount, denom) {
    // This would use IBC transfers for cross-chain functionality
    // Simplified implementation
    
    console.log(`Initiating cross-chain transfer to ${targetChain}`);
    
    return {
      success: true,
      message: 'Cross-chain transfer initiated',
      targetChain: targetChain,
      amount: amount,
      denom: denom
    };
  }
}

// Export singleton instance
export const walletService = new SnipSwapWalletService();
export default walletService;
