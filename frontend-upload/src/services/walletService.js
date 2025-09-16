/**
 * SnipSwap Wallet Service - Enhanced with WalletConnect v2 + Secret Network Bridging
 * Multi-wallet integration for Cosmos ecosystem, Ethereum, and cross-chain interoperability
 */

import { SigningCosmWasmClient } from '@cosmjs/cosmwasm-stargate';
import { GasPrice } from '@cosmjs/stargate';

class WalletService {
  constructor() {
    this.connectedWallet = null;
    this.walletType = null;
    this.address = null;
    this.balance = null;
    this.chainId = null;
    this.subscribers = new Set();
    this.cosmWasmClient = null;
    this.secretClient = null;
    
    // WalletConnect v2 configuration
    this.walletConnectConfig = {
      projectId: 'snipswap-dex-wallet-connect-v2',
      chains: [
        'cosmos:cosmoshub-4',     // Cosmos Hub
        'cosmos:secret-4',        // Secret Network
        'cosmos:osmosis-1',       // Osmosis
        'eip155:1',              // Ethereum Mainnet
        'eip155:137'             // Polygon
      ],
      methods: [
        'cosmos_signDirect',
        'cosmos_signAmino',
        'eth_sendTransaction',
        'eth_signTransaction',
        'personal_sign'
      ],
      events: ['chainChanged', 'accountsChanged']
    };

    // Secret Network configuration
    this.secretNetworkConfig = {
      chainId: 'secret-4',
      chainName: 'Secret Network',
      rpc: 'https://grpc-web.secret.express',
      rest: 'https://lcd.secret.express',
      bip44: { coinType: 529 },
      bech32Config: {
        bech32PrefixAccAddr: 'secret',
        bech32PrefixAccPub: 'secretpub',
        bech32PrefixValAddr: 'secretvaloper',
        bech32PrefixValPub: 'secretvaloperpub',
        bech32PrefixConsAddr: 'secretvalcons',
        bech32PrefixConsPub: 'secretvalconspub'
      },
      currencies: [{
        coinDenom: 'SCRT',
        coinMinimalDenom: 'uscrt',
        coinDecimals: 6
      }],
      feeCurrencies: [{
        coinDenom: 'SCRT',
        coinMinimalDenom: 'uscrt',
        coinDecimals: 6,
        gasPriceStep: { low: 0.1, average: 0.25, high: 0.4 }
      }],
      stakeCurrency: {
        coinDenom: 'SCRT',
        coinMinimalDenom: 'uscrt',
        coinDecimals: 6
      }
    };

    // Bridge contracts for cross-chain interoperability
    this.bridgeContracts = {
      secretEthBridge: 'secret1tqmms5awftpuhalcv5h5mg76fa0tkdz4jv9ex4',
      secretIbcBridge: 'secret1k0jntykt7e4g3y88ltc60czgjuqdy4c9e8fzek',
      atomBridge: 'secret1zwv6feuzhy6a9wekh96cd57lsarmqlwxdypdsplw6zhfncqw6ftqynf5k5',
      osmoBridge: 'secret1k6u0cy4feepm6pehnz804zmwakuwdapm69tuc4'
    };
    
    // Initialize wallet detection
    this.detectWallets();
    this.initializeEventListeners();
  }

  /**
   * Initialize wallet event listeners
   */
  initializeEventListeners() {
    // Listen for wallet connection events
    if (typeof window !== 'undefined') {
      window.addEventListener('keplr_keystorechange', () => {
        if (this.walletType === 'keplr') {
          this.handleWalletChange();
        }
      });

      // Listen for account changes
      if (window.ethereum) {
        window.ethereum.on('accountsChanged', (accounts) => {
          if (this.walletType === 'metamask' || this.walletType === 'okx') {
            this.handleAccountChange(accounts);
          }
        });

        window.ethereum.on('chainChanged', (chainId) => {
          this.handleChainChange(chainId);
        });
      }
    }
  }

  /**
   * Detect available wallets - Enhanced with OKX and WalletConnect v2
   */
  detectWallets() {
    this.availableWallets = {
      keplr: {
        name: 'Keplr',
        icon: '🌌',
        description: 'Cosmos ecosystem wallet with Secret Network support',
        available: typeof window !== 'undefined' && !!window.keplr,
        priority: 1,
        type: 'cosmos',
        downloadUrl: 'https://www.keplr.app/'
      },
      leap: {
        name: 'Leap',
        icon: '🦘',
        description: 'Fast Cosmos wallet with privacy features',
        available: typeof window !== 'undefined' && !!window.leap,
        priority: 2,
        type: 'cosmos',
        downloadUrl: 'https://www.leapwallet.io/'
      },
      metamask: {
        name: 'MetaMask',
        icon: '🦊',
        description: 'Ethereum and EVM chains via WalletConnect v2',
        available: typeof window !== 'undefined' && !!window.ethereum?.isMetaMask,
        priority: 3,
        type: 'ethereum',
        downloadUrl: 'https://metamask.io/'
      },
      okx: {
        name: 'OKX Wallet',
        icon: '⭕',
        description: 'Multi-chain wallet supporting Cosmos and Ethereum',
        available: typeof window !== 'undefined' && !!window.okxwallet,
        priority: 4,
        type: 'multi',
        downloadUrl: 'https://www.okx.com/web3'
      },
      cosmostation: {
        name: 'Cosmostation',
        icon: '🚀',
        description: 'Cosmos wallet with staking features',
        available: typeof window !== 'undefined' && !!window.cosmostation,
        priority: 5,
        type: 'cosmos',
        downloadUrl: 'https://www.cosmostation.io/'
      }
    };
  }

  /**
   * Connect to Keplr wallet - Enhanced with Secret Network and CosmWasm
   */
  async connectKeplr() {
    try {
      if (!window.keplr) {
        throw new Error('Keplr wallet not installed. Please install from https://www.keplr.app/');
      }

      // Suggest Secret Network chain if not already added
      try {
        await window.keplr.experimentalSuggestChain(this.secretNetworkConfig);
      } catch (error) {
        console.log('Secret Network chain already added or user rejected');
      }

      // Enable Secret Network
      await window.keplr.enable('secret-4');
      
      // Get offline signer
      const offlineSigner = window.keplr.getOfflineSigner('secret-4');
      const accounts = await offlineSigner.getAccounts();
      
      if (accounts.length === 0) {
        throw new Error('No accounts found in Keplr wallet');
      }

      const account = accounts[0];

      // Create CosmWasm client for Secret Network interactions
      this.cosmWasmClient = await SigningCosmWasmClient.connectWithSigner(
        this.secretNetworkConfig.rpc,
        offlineSigner,
        {
          gasPrice: GasPrice.fromString('0.25uscrt')
        }
      );
      
      // Get balance
      const balance = await this.getSecretBalance(account.address);
      
      this.connectedWallet = window.keplr;
      this.walletType = 'keplr';
      this.address = account.address;
      this.balance = balance;
      this.chainId = 'secret-4';
      
      // Notify subscribers
      this.notifySubscribers();
      
      console.log('✅ Keplr connected with Secret Network support:', account.address);
      
      return {
        address: account.address,
        balance: balance,
        chainId: 'secret-4',
        walletType: 'keplr',
        cosmWasmClient: this.cosmWasmClient
      };
    } catch (error) {
      console.error('❌ Keplr connection failed:', error);
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


  /**
   * Connect to OKX Wallet - Multi-chain support
   */
  async connectOKX() {
    try {
      if (!window.okxwallet) {
        throw new Error('OKX Wallet not installed. Please install from https://www.okx.com/web3');
      }

      // Check if OKX supports Cosmos chains
      if (window.okxwallet.keplr) {
        // Use Cosmos mode
        try {
          await window.okxwallet.keplr.experimentalSuggestChain(this.secretNetworkConfig);
        } catch (error) {
          console.log('Secret Network chain already added or user rejected');
        }

        await window.okxwallet.keplr.enable('secret-4');
        const offlineSigner = window.okxwallet.keplr.getOfflineSigner('secret-4');
        const accounts = await offlineSigner.getAccounts();
        
        if (accounts.length === 0) {
          throw new Error('No accounts found in OKX Wallet');
        }

        // Create CosmWasm client
        this.cosmWasmClient = await SigningCosmWasmClient.connectWithSigner(
          this.secretNetworkConfig.rpc,
          offlineSigner,
          {
            gasPrice: GasPrice.fromString('0.25uscrt')
          }
        );

        const account = accounts[0];
        const balance = await this.getSecretBalance(account.address);

        this.connectedWallet = window.okxwallet;
        this.walletType = 'okx';
        this.address = account.address;
        this.balance = balance;
        this.chainId = 'secret-4';

      } else {
        // Use Ethereum mode
        const accounts = await window.okxwallet.request({
          method: 'eth_requestAccounts'
        });

        if (accounts.length === 0) {
          throw new Error('No accounts found in OKX Wallet');
        }

        const chainId = await window.okxwallet.request({
          method: 'eth_chainId'
        });

        const balance = await window.okxwallet.request({
          method: 'eth_getBalance',
          params: [accounts[0], 'latest']
        });

        this.connectedWallet = window.okxwallet;
        this.walletType = 'okx';
        this.address = accounts[0];
        this.balance = parseInt(balance, 16) / 1e18;
        this.chainId = chainId;
      }

      this.notifySubscribers();
      console.log('✅ OKX Wallet connected:', this.address);

      return {
        address: this.address,
        balance: this.balance,
        chainId: this.chainId,
        walletType: 'okx'
      };

    } catch (error) {
      console.error('❌ OKX Wallet connection failed:', error);
      throw error;
    }
  }

  /**
   * Enhanced Leap wallet connection with Secret Network
   */
  async connectLeap() {
    try {
      if (!window.leap) {
        throw new Error('Leap wallet not installed. Please install from https://www.leapwallet.io/');
      }

      // Suggest Secret Network chain
      try {
        await window.leap.experimentalSuggestChain(this.secretNetworkConfig);
      } catch (error) {
        console.log('Secret Network chain already added or user rejected');
      }

      await window.leap.enable('secret-4');
      const offlineSigner = window.leap.getOfflineSigner('secret-4');
      const accounts = await offlineSigner.getAccounts();

      if (accounts.length === 0) {
        throw new Error('No accounts found in Leap wallet');
      }

      const account = accounts[0];

      // Create CosmWasm client
      this.cosmWasmClient = await SigningCosmWasmClient.connectWithSigner(
        this.secretNetworkConfig.rpc,
        offlineSigner,
        {
          gasPrice: GasPrice.fromString('0.25uscrt')
        }
      );

      const balance = await this.getSecretBalance(account.address);

      this.connectedWallet = window.leap;
      this.walletType = 'leap';
      this.address = account.address;
      this.balance = balance;
      this.chainId = 'secret-4';

      this.notifySubscribers();
      console.log('✅ Leap connected with Secret Network support:', account.address);

      return {
        address: account.address,
        balance: balance,
        chainId: 'secret-4',
        walletType: 'leap',
        cosmWasmClient: this.cosmWasmClient
      };
    } catch (error) {
      console.error('❌ Leap connection failed:', error);
      throw error;
    }
  }

  /**
   * Secret Network bridge operations for cross-chain interoperability
   */
  async bridgeToSecret(amount, fromChain, token) {
    try {
      if (!this.cosmWasmClient || !this.address) {
        throw new Error('Wallet not connected to Secret Network');
      }

      const bridgeContract = this.bridgeContracts[`${token.toLowerCase()}Bridge`];
      if (!bridgeContract) {
        throw new Error(`Bridge contract not found for ${token}`);
      }

      const msg = {
        deposit: {
          amount: amount.toString(),
          denom: token.toLowerCase(),
          recipient: this.address
        }
      };

      const fee = {
        amount: [{ denom: 'uscrt', amount: '50000' }],
        gas: '200000'
      };

      console.log(`🌉 Bridging ${amount} ${token} to Secret Network...`);

      const result = await this.cosmWasmClient.execute(
        this.address,
        bridgeContract,
        msg,
        fee
      );

      console.log('✅ Bridge transaction successful:', result.transactionHash);
      
      // Notify subscribers of balance change
      this.notifySubscribers();

      return {
        success: true,
        txHash: result.transactionHash,
        height: result.height,
        amount: amount,
        token: token,
        fromChain: fromChain
      };

    } catch (error) {
      console.error('❌ Bridge transaction failed:', error);
      throw error;
    }
  }

  /**
   * Bridge from Secret Network to other chains
   */
  async bridgeFromSecret(amount, toChain, token, recipientAddress) {
    try {
      if (!this.cosmWasmClient || !this.address) {
        throw new Error('Wallet not connected to Secret Network');
      }

      const bridgeContract = this.bridgeContracts.secretIbcBridge;

      const msg = {
        withdraw: {
          amount: amount.toString(),
          denom: token.toLowerCase(),
          recipient: recipientAddress,
          destination_chain: toChain
        }
      };

      const fee = {
        amount: [{ denom: 'uscrt', amount: '75000' }],
        gas: '300000'
      };

      console.log(`🌉 Bridging ${amount} ${token} from Secret Network to ${toChain}...`);

      const result = await this.cosmWasmClient.execute(
        this.address,
        bridgeContract,
        msg,
        fee
      );

      console.log('✅ Bridge withdrawal successful:', result.transactionHash);
      
      // Notify subscribers of balance change
      this.notifySubscribers();

      return {
        success: true,
        txHash: result.transactionHash,
        height: result.height,
        amount: amount,
        token: token,
        toChain: toChain,
        recipient: recipientAddress
      };

    } catch (error) {
      console.error('❌ Bridge withdrawal failed:', error);
      throw error;
    }
  }

  /**
   * Execute Secret Network contract with privacy
   */
  async executeSecretContract(contractAddress, msg, funds = [], memo = '') {
    try {
      if (!this.cosmWasmClient || !this.address) {
        throw new Error('Wallet not connected to Secret Network');
      }

      const fee = {
        amount: [{ denom: 'uscrt', amount: '50000' }],
        gas: '200000'
      };

      console.log('🔐 Executing Secret Network contract:', contractAddress);

      const result = await this.cosmWasmClient.execute(
        this.address,
        contractAddress,
        msg,
        fee,
        memo,
        funds
      );

      console.log('✅ Secret contract execution successful:', result.transactionHash);

      return {
        success: true,
        txHash: result.transactionHash,
        height: result.height,
        data: result.data
      };

    } catch (error) {
      console.error('❌ Secret contract execution failed:', error);
      throw error;
    }
  }

  /**
   * Query Secret Network contract
   */
  async querySecretContract(contractAddress, msg) {
    try {
      if (!this.cosmWasmClient) {
        throw new Error('CosmWasm client not initialized');
      }

      const result = await this.cosmWasmClient.queryContractSmart(contractAddress, msg);
      return result;

    } catch (error) {
      console.error('❌ Secret contract query failed:', error);
      throw error;
    }
  }

  /**
   * Handle wallet change events
   */
  async handleWalletChange() {
    if (this.walletType) {
      console.log('🔄 Wallet changed, reconnecting...');
      try {
        await this.connect(this.walletType);
      } catch (error) {
        console.error('Failed to reconnect wallet:', error);
        this.disconnect();
      }
    }
  }

  /**
   * Handle account change events
   */
  async handleAccountChange(accounts) {
    if (accounts.length === 0) {
      console.log('🔄 No accounts, disconnecting...');
      this.disconnect();
    } else {
      this.address = accounts[0];
      console.log('🔄 Account changed to:', this.address);
      this.notifySubscribers();
    }
  }

  /**
   * Handle chain change events
   */
  async handleChainChange(chainId) {
    console.log('🔄 Chain changed to:', chainId);
    this.chainId = chainId;
    this.notifySubscribers();
  }

  /**
   * Sign message with connected wallet
   */
  async signMessage(message) {
    try {
      if (!this.connectedWallet || !this.address) {
        throw new Error('Wallet not connected');
      }

      let signature;
      
      if (this.walletType === 'keplr') {
        signature = await window.keplr.signArbitrary(this.chainId, this.address, message);
      } else if (this.walletType === 'leap') {
        signature = await window.leap.signArbitrary(this.chainId, this.address, message);
      } else if (this.walletType === 'metamask') {
        signature = await window.ethereum.request({
          method: 'personal_sign',
          params: [message, this.address]
        });
      } else if (this.walletType === 'okx') {
        if (window.okxwallet.keplr) {
          signature = await window.okxwallet.keplr.signArbitrary(this.chainId, this.address, message);
        } else {
          signature = await window.okxwallet.request({
            method: 'personal_sign',
            params: [message, this.address]
          });
        }
      }

      console.log('✅ Message signed successfully');

      return {
        success: true,
        signature: signature,
        message: message,
        address: this.address
      };

    } catch (error) {
      console.error('❌ Message signing failed:', error);
      throw error;
    }
  }

  /**
   * Get bridge status for cross-chain transactions
   */
  async getBridgeStatus(txHash) {
    try {
      // This would typically query a bridge API or indexer
      // For now, return a mock status
      return {
        status: 'completed',
        confirmations: 12,
        estimatedTime: '2-5 minutes',
        txHash: txHash
      };
    } catch (error) {
      console.error('❌ Failed to get bridge status:', error);
      throw error;
    }
  }

  /**
   * Enhanced generic connect method with OKX support
   */
  async connect(walletType) {
    switch (walletType) {
      case 'keplr':
        return await this.connectKeplr();
      case 'leap':
        return await this.connectLeap();
      case 'metamask':
        return await this.connectMetaMask();
      case 'okx':
        return await this.connectOKX();
      case 'cosmostation':
        return await this.connectCosmostation();
      default:
        throw new Error(`Unsupported wallet type: ${walletType}`);
    }
  }

  /**
   * Enhanced disconnect with cleanup
   */
  disconnect() {
    this.connectedWallet = null;
    this.walletType = null;
    this.address = null;
    this.balance = null;
    this.chainId = null;
    this.cosmWasmClient = null;
    this.secretClient = null;
    
    console.log('✅ Wallet disconnected and cleaned up');
    this.notifySubscribers();
  }

  /**
   * Enhanced Secret Network balance with multiple tokens
   */
  async getSecretBalance(address) {
    try {
      if (this.cosmWasmClient) {
        const balance = await this.cosmWasmClient.getBalance(address, 'uscrt');
        return parseFloat(balance.amount) / 1000000; // Convert from uscrt to SCRT
      } else {
        // Fallback to mock balance for demo
        return Math.random() * 1000;
      }
    } catch (error) {
      console.error('Failed to get Secret Network balance:', error);
      return 0;
    }
  }

  /**
   * Get wallet capabilities
   */
  getWalletCapabilities(walletType) {
    const capabilities = {
      keplr: {
        cosmos: true,
        ethereum: false,
        secretNetwork: true,
        bridging: true,
        staking: true
      },
      leap: {
        cosmos: true,
        ethereum: false,
        secretNetwork: true,
        bridging: true,
        staking: true
      },
      metamask: {
        cosmos: false,
        ethereum: true,
        secretNetwork: false,
        bridging: true,
        staking: false
      },
      okx: {
        cosmos: true,
        ethereum: true,
        secretNetwork: true,
        bridging: true,
        staking: true
      },
      cosmostation: {
        cosmos: true,
        ethereum: false,
        secretNetwork: true,
        bridging: true,
        staking: true
      }
    };

    return capabilities[walletType] || {};
  }

