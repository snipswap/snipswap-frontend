/**
 * SnipSwap Wallet Service
 * Multi-wallet integration for Cosmos ecosystem and Ethereum
 */

class WalletService {
  constructor() {
    this.connectedWallet = null;
    this.walletType = null;
    this.address = null;
    this.balance = null;
    this.chainId = null;
    this.subscribers = new Set();
    
    // Initialize wallet detection
    this.detectWallets();
  }

  /**
   * Detect available wallets
   */
  detectWallets() {
    this.availableWallets = {
      keplr: {
        name: 'Keplr',
        icon: '🌌',
        description: 'Cosmos ecosystem wallet',
        available: typeof window !== 'undefined' && !!window.keplr,
        priority: 1
      },
      metamask: {
        name: 'MetaMask',
        icon: '🦊',
        description: 'Ethereum and EVM chains',
        available: typeof window !== 'undefined' && !!window.ethereum?.isMetaMask,
        priority: 2
      },
      cosmostation: {
        name: 'Cosmostation',
        icon: '🚀',
        description: 'Cosmos wallet',
        available: typeof window !== 'undefined' && !!window.cosmostation,
        priority: 3
      },
      leap: {
        name: 'Leap',
        icon: '🐸',
        description: 'Cosmos wallet',
        available: typeof window !== 'undefined' && !!window.leap,
        priority: 4
      }
    };
  }

  /**
   * Connect to Keplr wallet
   */
  async connectKeplr() {
    try {
      if (!window.keplr) {
        throw new Error('Keplr wallet not installed');
      }

      // Enable Secret Network
      await window.keplr.enable('secret-4');
      
      // Get offline signer
      const offlineSigner = window.keplr.getOfflineSigner('secret-4');
      const accounts = await offlineSigner.getAccounts();
      
      if (accounts.length === 0) {
        throw new Error('No accounts found');
      }

      const account = accounts[0];
      
      // Get balance
      const balance = await this.getSecretBalance(account.address);
      
      this.connectedWallet = window.keplr;
      this.walletType = 'keplr';
      this.address = account.address;
      this.balance = balance;
      this.chainId = 'secret-4';
      
      // Notify subscribers
      this.notifySubscribers();
      
      return {
        address: account.address,
        balance: balance,
        chainId: 'secret-4',
        walletType: 'keplr'
      };
    } catch (error) {
      console.error('Keplr connection failed:', error);
      throw error;
    }
  }

  /**
   * Connect to MetaMask
   */
  async connectMetaMask() {
    try {
      if (!window.ethereum?.isMetaMask) {
        throw new Error('MetaMask not installed');
      }

      // Request account access
      const accounts = await window.ethereum.request({
        method: 'eth_requestAccounts'
      });

      if (accounts.length === 0) {
        throw new Error('No accounts found');
      }

      // Get chain ID
      const chainId = await window.ethereum.request({
        method: 'eth_chainId'
      });

      // Get balance
      const balance = await window.ethereum.request({
        method: 'eth_getBalance',
        params: [accounts[0], 'latest']
      });

      this.connectedWallet = window.ethereum;
      this.walletType = 'metamask';
      this.address = accounts[0];
      this.balance = parseInt(balance, 16) / 1e18; // Convert from wei to ETH
      this.chainId = chainId;

      // Listen for account changes
      window.ethereum.on('accountsChanged', (accounts) => {
        if (accounts.length === 0) {
          this.disconnect();
        } else {
          this.address = accounts[0];
          this.notifySubscribers();
        }
      });

      // Listen for chain changes
      window.ethereum.on('chainChanged', (chainId) => {
        this.chainId = chainId;
        this.notifySubscribers();
      });

      this.notifySubscribers();

      return {
        address: accounts[0],
        balance: this.balance,
        chainId: chainId,
        walletType: 'metamask'
      };
    } catch (error) {
      console.error('MetaMask connection failed:', error);
      throw error;
    }
  }

  /**
   * Connect to Cosmostation wallet
   */
  async connectCosmostation() {
    try {
      if (!window.cosmostation) {
        throw new Error('Cosmostation wallet not installed');
      }

      const account = await window.cosmostation.cosmos.request({
        method: 'cos_account',
        params: { chainName: 'secret-network' }
      });

      const balance = await this.getSecretBalance(account.address);

      this.connectedWallet = window.cosmostation;
      this.walletType = 'cosmostation';
      this.address = account.address;
      this.balance = balance;
      this.chainId = 'secret-4';

      this.notifySubscribers();

      return {
        address: account.address,
        balance: balance,
        chainId: 'secret-4',
        walletType: 'cosmostation'
      };
    } catch (error) {
      console.error('Cosmostation connection failed:', error);
      throw error;
    }
  }

  /**
   * Connect to Leap wallet
   */
  async connectLeap() {
    try {
      if (!window.leap) {
        throw new Error('Leap wallet not installed');
      }

      await window.leap.enable('secret-4');
      const offlineSigner = window.leap.getOfflineSigner('secret-4');
      const accounts = await offlineSigner.getAccounts();

      if (accounts.length === 0) {
        throw new Error('No accounts found');
      }

      const account = accounts[0];
      const balance = await this.getSecretBalance(account.address);

      this.connectedWallet = window.leap;
      this.walletType = 'leap';
      this.address = account.address;
      this.balance = balance;
      this.chainId = 'secret-4';

      this.notifySubscribers();

      return {
        address: account.address,
        balance: balance,
        chainId: 'secret-4',
        walletType: 'leap'
      };
    } catch (error) {
      console.error('Leap connection failed:', error);
      throw error;
    }
  }

  /**
   * Generic connect method
   */
  async connect(walletType) {
    switch (walletType) {
      case 'keplr':
        return await this.connectKeplr();
      case 'metamask':
        return await this.connectMetaMask();
      case 'cosmostation':
        return await this.connectCosmostation();
      case 'leap':
        return await this.connectLeap();
      default:
        throw new Error(`Unsupported wallet type: ${walletType}`);
    }
  }

  /**
   * Disconnect wallet
   */
  disconnect() {
    this.connectedWallet = null;
    this.walletType = null;
    this.address = null;
    this.balance = null;
    this.chainId = null;
    
    this.notifySubscribers();
  }

  /**
   * Get Secret Network balance
   */
  async getSecretBalance(address) {
    try {
      // This would typically use a Secret Network RPC endpoint
      // For now, return a mock balance
      return Math.random() * 1000;
    } catch (error) {
      console.error('Failed to get balance:', error);
      return 0;
    }
  }

  /**
   * Get available wallets
   */
  getAvailableWallets() {
    return Object.entries(this.availableWallets)
      .filter(([_, wallet]) => wallet.available)
      .sort((a, b) => a[1].priority - b[1].priority)
      .map(([key, wallet]) => ({ key, ...wallet }));
  }

  /**
   * Check if wallet is connected
   */
  isConnected() {
    return !!this.connectedWallet && !!this.address;
  }

  /**
   * Get connection info
   */
  getConnectionInfo() {
    return {
      isConnected: this.isConnected(),
      walletType: this.walletType,
      address: this.address,
      balance: this.balance,
      chainId: this.chainId,
      shortAddress: this.address ? `${this.address.slice(0, 6)}...${this.address.slice(-4)}` : null
    };
  }

  /**
   * Subscribe to wallet changes
   */
  subscribe(callback) {
    this.subscribers.add(callback);
    
    // Return unsubscribe function
    return () => {
      this.subscribers.delete(callback);
    };
  }

  /**
   * Notify subscribers of changes
   */
  notifySubscribers() {
    const connectionInfo = this.getConnectionInfo();
    this.subscribers.forEach(callback => {
      try {
        callback(connectionInfo);
      } catch (error) {
        console.error('Error in wallet subscription callback:', error);
      }
    });
  }

  /**
   * Format address for display
   */
  formatAddress(address, length = 6) {
    if (!address) return '';
    return `${address.slice(0, length)}...${address.slice(-4)}`;
  }

  /**
   * Format balance for display
   */
  formatBalance(balance, decimals = 4) {
    if (typeof balance !== 'number' || isNaN(balance)) {
      return '0.00';
    }
    
    if (balance >= 1000000) {
      return `${(balance / 1000000).toFixed(2)}M`;
    }
    
    if (balance >= 1000) {
      return `${(balance / 1000).toFixed(2)}K`;
    }
    
    return balance.toFixed(decimals);
  }

  /**
   * Get wallet icon
   */
  getWalletIcon(walletType) {
    const icons = {
      keplr: '🌌',
      metamask: '🦊',
      cosmostation: '🚀',
      leap: '🐸'
    };
    return icons[walletType] || '👛';
  }

  /**
   * Get chain name
   */
  getChainName(chainId) {
    const chains = {
      'secret-4': 'Secret Network',
      '0x1': 'Ethereum Mainnet',
      '0x89': 'Polygon',
      '0xa86a': 'Avalanche'
    };
    return chains[chainId] || 'Unknown Chain';
  }
}

// Create singleton instance
const walletService = new WalletService();

export default walletService;

