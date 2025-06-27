// Contract ABIs - Updated to match your VNSTStaking contract
const vnstStakingABI = [
    // Constructor and Events removed as they're not needed in frontend
    {
        "inputs": [],
        "name": "annualRewardRate",
        "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "dailyROIPercent",
        "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [{"internalType": "address", "name": "user", "type": "address"}],
        "name": "getPendingRewards",
        "outputs": [
            {"internalType": "uint256", "name": "vntReward", "type": "uint256"},
            {"internalType": "uint256", "name": "usdtReward", "type": "uint256"}
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [{"internalType": "address", "name": "user", "type": "address"}],
        "name": "getReferralCount",
        "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {"internalType": "address", "name": "user", "type": "address"},
            {"internalType": "uint256", "name": "level", "type": "uint256"}
        ],
        "name": "getLevelReferralCount",
        "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {"internalType": "address", "name": "user", "type": "address"},
            {"internalType": "uint256", "name": "level", "type": "uint256"}
        ],
        "name": "getLevelReferrals",
        "outputs": [{"internalType": "address[]", "name": "", "type": "address[]"}],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [{"internalType": "address", "name": "user", "type": "address"}],
        "name": "getUserStats",
        "outputs": [
            {"internalType": "uint256", "name": "totalStaked", "type": "uint256"},
            {"internalType": "uint256", "name": "totalEarned", "type": "uint256"},
            {"internalType": "uint256", "name": "directMembers", "type": "uint256"}
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [{"internalType": "address", "name": "", "type": "address"}],
        "name": "rewards",
        "outputs": [
            {"internalType": "uint256", "name": "pendingVNT", "type": "uint256"},
            {"internalType": "uint256", "name": "pendingUSDT", "type": "uint256"},
            {"internalType": "uint256", "name": "claimedVNT", "type": "uint256"},
            {"internalType": "uint256", "name": "claimedUSDT", "type": "uint256"},
            {"internalType": "uint256", "name": "lastClaimTime", "type": "uint256"}
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [{"internalType": "address", "name": "", "type": "address"}],
        "name": "stakes",
        "outputs": [
            {"internalType": "uint256", "name": "amount", "type": "uint256"},
            {"internalType": "uint256", "name": "startTime", "type": "uint256"},
            {"internalType": "uint256", "name": "lastClaimTime", "type": "uint256"},
            {"internalType": "address", "name": "referrer", "type": "address"},
            {"internalType": "bool", "name": "active", "type": "bool"}
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [{"internalType": "uint256", "name": "amount", "type": "uint256"}, {"internalType": "address", "name": "referrer", "type": "address"}],
        "name": "stake",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "claimRewards",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "vnstPrice",
        "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "vntPrice",
        "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
        "stateMutability": "view",
        "type": "function"
    }
];

// ERC20 ABI remains the same
const erc20ABI = [
    {
        "constant": true,
        "inputs": [{"name": "_owner", "type": "address"}],
        "name": "balanceOf",
        "outputs": [{"name": "balance", "type": "uint256"}],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {"name": "_spender", "type": "address"},
            {"name": "_value", "type": "uint256"}
        ],
        "name": "approve",
        "outputs": [{"name": "", "type": "bool"}],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [
            {"name": "_owner", "type": "address"},
            {"name": "_spender", "type": "address"}
        ],
        "name": "allowance",
        "outputs": [{"name": "", "type": "uint256"}],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    }
];

// Network Configurations with your testnet addresses
const networkConfig = {
    testnet: {
        chainId: '0x61', // 97 in decimal
        chainName: 'Binance Smart Chain Testnet',
        nativeCurrency: {
            name: 'BNB',
            symbol: 'BNB',
            decimals: 18
        },
        rpcUrls: ['https://data-seed-prebsc-1-s1.binance.org:8545/'],
        blockExplorerUrls: ['https://testnet.bscscan.com'],
        contractAddress: '0xC0a8496a9ef2aE23D56F886a3205bb4822a497d1',
        vnstTokenAddress: '0x5C6cB004b50278c6726c3cBEDd25165c2072C46D',
        vntTokenAddress: '0xa7e41CB0A41dbFC801408d3B577fCed150c4eeEc',
        usdtTokenAddress: '0x337610d27c682E347C9cD60BD4b3b107C9d34dDd'
    },
    mainnet: {
        chainId: '0x38', // 56 in decimal
        chainName: 'Binance Smart Chain Mainnet',
        nativeCurrency: {
            name: 'BNB',
            symbol: 'BNB',
            decimals: 18
        },
        rpcUrls: ['https://bsc-dataseed.binance.org/'],
        blockExplorerUrls: ['https://bscscan.com'],
        contractAddress: 'YOUR_MAINNET_CONTRACT_ADDRESS',
        vnstTokenAddress: 'YOUR_MAINNET_VNST_ADDRESS',
        vntTokenAddress: 'YOUR_MAINNET_VNT_ADDRESS',
        usdtTokenAddress: 'YOUR_MAINNET_USDT_ADDRESS'
    }
};

// Global Variables
let web3;
let vnstStakingContract;
let vnstTokenContract;
let vntTokenContract;
let usdtTokenContract;
let currentAccount = null;
let currentNetwork = 'testnet';

// Initialize Web3 and Contracts with better error handling
async function initWeb3() {
    if (window.ethereum) {
        try {
            web3 = new Web3(window.ethereum);
            
            // Check if already connected
            const accounts = await web3.eth.getAccounts();
            if (accounts.length > 0) {
                currentAccount = accounts[0];
            }
            
            // Initialize contracts
            await initContracts();
            
            // Update UI if account is connected
            if (currentAccount) {
                updateWalletConnectionUI(currentAccount);
                await loadData();
            }
            
            return true;
        } catch (error) {
            console.error("Error initializing Web3:", error);
            showError("Error connecting to blockchain: " + (error.message || error));
            return false;
        }
    } else {
        console.log("Non-Ethereum browser detected. Consider installing MetaMask!");
        showError("Please install MetaMask to use this dApp!");
        return false;
    }
}

// Initialize Contracts with more robust checks
async function initContracts() {
    try {
        const config = networkConfig[currentNetwork];
        
        // Initialize contracts with checks
        if (!config.contractAddress || !config.vnstTokenAddress || 
            !config.vntTokenAddress || !config.usdtTokenAddress) {
            throw new Error("Contract addresses not configured for this network");
        }
        
        vnstStakingContract = new web3.eth.Contract(
            vnstStakingABI,
            config.contractAddress
        );
        
        vnstTokenContract = new web3.eth.Contract(
            erc20ABI,
            config.vnstTokenAddress
        );
        
        vntTokenContract = new web3.eth.Contract(
            erc20ABI,
            config.vntTokenAddress
        );
        
        usdtTokenContract = new web3.eth.Contract(
            erc20ABI,
            config.usdtTokenAddress
        );
        
        // Verify contracts are initialized
        if (!vnstStakingContract || !vnstTokenContract || !vntTokenContract || !usdtTokenContract) {
            throw new Error("Failed to initialize contracts");
        }
        
    } catch (error) {
        console.error("Error initializing contracts:", error);
        throw error;
    }
}

// Check and Switch Network with better user feedback
async function checkNetwork() {
    try {
        const chainId = await web3.eth.getChainId();
        const expectedChainId = parseInt(networkConfig[currentNetwork].chainId, 16);
        
        if (chainId !== expectedChainId) {
            try {
                await window.ethereum.request({
                    method: 'wallet_switchEthereumChain',
                    params: [{ chainId: networkConfig[currentNetwork].chainId }],
                });
                // After switching, reload data
                await initContracts();
                if (currentAccount) {
                    await loadData();
                }
            } catch (switchError) {
                if (switchError.code === 4902) {
                    try {
                        await window.ethereum.request({
                            method: 'wallet_addEthereumChain',
                            params: [networkConfig[currentNetwork]],
                        });
                    } catch (addError) {
                        console.error("Error adding network:", addError);
                        showError("Please add Binance Smart Chain network to your wallet");
                        throw addError;
                    }
                } else {
                    console.error("Error switching network:", switchError);
                    showError("Please switch to Binance Smart Chain network");
                    throw switchError;
                }
            }
        }
    } catch (error) {
        console.error("Network error:", error);
        showError("Network error: " + (error.message || error));
        throw error;
    }
}

// Rest of your existing functions (toggleMenu, setupCardAnimations) remain the same...

// Connect Wallet Function with improved flow
async function connectWallet() {
    try {
        if (typeof window.ethereum !== 'undefined') {
            // Request account access
            const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
            currentAccount = accounts[0];
            
            // Check network
            await checkNetwork();
            
            // Initialize contracts if not already done
            if (!vnstStakingContract) {
                await initContracts();
            }
            
            // Update UI
            updateWalletConnectionUI(currentAccount);
            
            // Load data
            await loadData();
        } else {
            showError("Please install MetaMask to connect your wallet");
        }
    } catch (error) {
        console.error("Error connecting wallet:", error);
        showError("Error connecting wallet: " + (error.message || error));
    }
}

// Update Wallet Connection UI remains the same...

// Load Data with proper contract method checks
async function loadData() {
    try {
        if (!currentAccount) return;
        
        // Verify contracts are initialized
        if (!vnstStakingContract || !vnstTokenContract) {
            await initContracts();
        }
        
        // Load global stats if on home page
        if (document.getElementById('totalUsers')) {
            await loadGlobalStats();
        }
        
        // Load user data if on staking page
        if (document.getElementById('walletAddress')) {
            await loadUserData();
        }
        
        // Load team data if on team page
        if (document.getElementById('teamDashboard')) {
            await loadTeamData();
        }
    } catch (error) {
        console.error("Error loading data:", error);
        showError("Error loading data: " + (error.message || error));
    }
}

// Updated Load Global Stats to match contract methods
async function loadGlobalStats() {
    try {
        // Get total staked from userStats mapping
        const userStats = await vnstStakingContract.methods.getUserStats(currentAccount).call();
        safeSetTextContent('totalStaked', `${formatNumber(web3.utils.fromWei(userStats.totalStaked, 'ether'))} VNST`);
        
        // Get total earned from userStats
        safeSetTextContent('totalWithdrawn', `${formatNumber(web3.utils.fromWei(userStats.totalEarned, 'ether'))} VNST`);
        
        // For total users, we might need to track separately in contract or use an estimate
        safeSetTextContent('totalUsers', formatNumber(userStats.directMembers));
        
        // Active staking is same as total staked if stake is active
        const stakeInfo = await vnstStakingContract.methods.stakes(currentAccount).call();
        if (stakeInfo.active) {
            safeSetTextContent('activeStaking', `${formatNumber(web3.utils.fromWei(stakeInfo.amount, 'ether'))} VNST`);
        } else {
            safeSetTextContent('activeStaking', '0 VNST');
        }
    } catch (error) {
        console.error("Error loading global stats:", error);
        safeSetTextContent('totalUsers', '0');
        safeSetTextContent('totalStaked', '0 VNST');
        safeSetTextContent('totalWithdrawn', '0 VNST');
        safeSetTextContent('activeStaking', '0 VNST');
    }
}

// Updated Load User Data to match contract methods
async function loadUserData() {
    try {
        if (!currentAccount) return;
        
        // Display wallet address
        safeSetTextContent('walletAddress', `${currentAccount.substring(0, 6)}...${currentAccount.substring(currentAccount.length - 4)}`);
        
        // Get VNST balance
        const vnstBalance = await vnstTokenContract.methods.balanceOf(currentAccount).call();
        safeSetTextContent('walletBalance', `${formatNumber(web3.utils.fromWei(vnstBalance, 'ether'))} VNST`);
        
        // Get user stake info
        const userStake = await vnstStakingContract.methods.stakes(currentAccount).call();
        safeSetTextContent('userTotalStaked', `${formatNumber(web3.utils.fromWei(userStake.amount, 'ether'))} VNST`);
        
        // Get user rewards
        const userRewards = await vnstStakingContract.methods.rewards(currentAccount).call();
        safeSetTextContent('userTotalWithdrawn', `${formatNumber(web3.utils.fromWei(userRewards.claimedVNT, 'ether'))} VNT + ${formatNumber(web3.utils.fromWei(userRewards.claimedUSDT, 'ether'))} USDT`);
        
        // Get active staking
        safeSetTextContent('userActiveStaking', userStake.active ? `${formatNumber(web3.utils.fromWei(userStake.amount, 'ether'))} VNST` : '0 VNST');
        
        // Get pending rewards
        const pendingRewards = await vnstStakingContract.methods.getPendingRewards(currentAccount).call();
        safeSetTextContent('level1Income', `${formatNumber(web3.utils.fromWei(pendingRewards.vntReward, 'ether'))} VNT`);
        safeSetTextContent('level2to5Income', `${formatNumber(web3.utils.fromWei(pendingRewards.usdtReward, 'ether'))} USDT`);
        
        // Calculate daily ROI using contract values
        const dailyROIPercent = await vnstStakingContract.methods.dailyROIPercent().call();
        const vnstPrice = await vnstStakingContract.methods.vnstPrice().call();
        
        if (userStake.active) {
            const stakedAmount = web3.utils.fromWei(userStake.amount, 'ether');
            const roiAmount = (stakedAmount * dailyROIPercent) / 100;
            const roiInUsdt = roiAmount * (web3.utils.fromWei(vnstPrice, 'ether'));
            safeSetTextContent('dailyROI', `${formatNumber(roiInUsdt)} USDT`);
        } else {
            safeSetTextContent('dailyROI', '0 USDT');
        }
    } catch (error) {
        console.error("Error loading user data:", error);
        showError("Error loading user data. Please try refreshing the page.");
    }
}

// Updated Load Team Data to match contract methods
async function loadTeamData() {
    try {
        if (!currentAccount) return;
        
        // Get user stats which includes direct members
        const userStats = await vnstStakingContract.methods.getUserStats(currentAccount).call();
        safeSetTextContent('directMembers', userStats.directMembers);
        
        // Get total team members (sum of all levels)
        let totalTeamMembers = 0;
        for (let level = 1; level <= 5; level++) {
            const levelMembers = await vnstStakingContract.methods.getLevelReferralCount(currentAccount, level).call();
            totalTeamMembers += parseInt(levelMembers);
            safeSetTextContent(`level${level}Members`, levelMembers);
        }
        safeSetTextContent('totalTeamMembers', totalTeamMembers);
        
        // Get team staking info from user stats
        safeSetTextContent('teamTotalStaked', `${formatNumber(web3.utils.fromWei(userStats.totalStaked, 'ether'))} VNST`);
        
        // For active staking, check if the stake is active
        const userStake = await vnstStakingContract.methods.stakes(currentAccount).call();
        safeSetTextContent('teamActiveStaking', userStake.active ? `${formatNumber(web3.utils.fromWei(userStake.amount, 'ether'))} VNST` : '0 VNST');
        
        // Populate team members table with level 1 referrals
        const tableBody = document.querySelector('#teamMembersTable tbody');
        if (tableBody) {
            tableBody.innerHTML = '';
            
            const level1Referrals = await vnstStakingContract.methods.getLevelReferrals(currentAccount, 1).call();
            
            for (let i = 0; i < Math.min(3, level1Referrals.length); i++) {
                const memberAddress = level1Referrals[i];
                const memberStake = await vnstStakingContract.methods.stakes(memberAddress).call();
                
                const row = document.createElement('tr');
                row.style.borderBottom = '1px solid var(--glass-border)';
                row.innerHTML = `
                    <td style="padding: 0.75rem;">1</td>
                    <td style="padding: 0.75rem;">${memberAddress.substring(0, 6)}...${memberAddress.substring(memberAddress.length - 4)}</td>
                    <td style="padding: 0.75rem;">${formatNumber(web3.utils.fromWei(memberStake.amount, 'ether'))} VNST</td>
                    <td style="padding: 0.75rem;">${new Date(memberStake.startTime * 1000).toLocaleDateString()}</td>
                `;
                tableBody.appendChild(row);
            }
        }
        
        // Update level statuses based on requirements
        const requiredMembers = [2, 2, 2, 2, 2]; // From your contract
        for (let level = 1; level <= 5; level++) {
            const statusElement = document.getElementById(`level${level}Status`);
            if (statusElement) {
                const hasEnoughMembers = parseInt(userStats.directMembers) >= requiredMembers[level-1];
                
                if (hasEnoughMembers) {
                    statusElement.textContent = 'Active';
                    statusElement.className = 'status-active';
                } else {
                    statusElement.textContent = 'Locked';
                    statusElement.className = 'status-locked';
                }
            }
        }
    } catch (error) {
        console.error("Error loading team data:", error);
        showError("Error loading team data. Please try again.");
    }
}

// Stake Tokens with improved validation
async function stakeTokens() {
    try {
        const amount = document.getElementById('stakeAmount').value;
        const referrer = document.getElementById('referrerAddress').value;
        
        if (!amount || isNaN(amount) || parseFloat(amount) <= 0) {
            showError("Please enter a valid amount (100-10000 VNST)");
            return;
        }
        
        if (!referrer || !web3.utils.isAddress(referrer)) {
            showError("Please enter a valid referrer wallet address");
            return;
        }
        
        const amountWei = web3.utils.toWei(amount, 'ether');
        
        // Check allowance
        const allowance = await vnstTokenContract.methods.allowance(
            currentAccount,
            networkConfig[currentNetwork].contractAddress
        ).call();
        
        if (parseInt(allowance) < parseInt(amountWei)) {
            // Approve first
            await vnstTokenContract.methods.approve(
                networkConfig[currentNetwork].contractAddress,
                amountWei
            ).send({ from: currentAccount });
        }
        
        // Stake tokens
        await vnstStakingContract.methods.stake(
            amountWei,
            referrer
        ).send({ from: currentAccount });
        
        showSuccess("Tokens staked successfully!");
        await loadData();
    } catch (error) {
        console.error("Error staking tokens:", error);
        showError("Error staking tokens: " + (error.message || error));
    }
}

// Claim Rewards remains the same...

// Rest of your utility functions (copyReferralLink, shareReferralLink, showError, showSuccess, formatNumber, safeSetTextContent) remain the same...

// Initialize Event Listeners with checks
function initEventListeners() {
    // Wallet connection buttons
    document.querySelectorAll('.wallet-connect-btn, #connectWalletBtn, #teamConnectWalletBtn').forEach(btn => {
        if (btn) btn.addEventListener('click', connectWallet);
    });
    
    // Stake button
    const stakeBtn = document.getElementById('stakeBtn');
    if (stakeBtn) stakeBtn.addEventListener('click', stakeTokens);
    
    // Claim buttons
    const claimTokenBtn = document.getElementById('claimTokenBtn');
    if (claimTokenBtn) claimTokenBtn.addEventListener('click', claimRewards);
    
    // Menu toggle
    const menuToggle = document.querySelector('.menu-toggle');
    if (menuToggle) menuToggle.addEventListener('click', toggleMenu);
}

// Initialize App with better error handling
async function initApp() {
    try {
        // Setup card animations
        setupCardAnimations();
        
        // Initialize event listeners
        initEventListeners();
        
        // Initialize Web3
        await initWeb3();
        
        // Listen for account changes
        if (window.ethereum) {
            window.ethereum.on('accountsChanged', (accounts) => {
                if (accounts.length === 0) {
                    // Wallet disconnected
                    window.location.reload();
                } else {
                    currentAccount = accounts[0];
                    updateWalletConnectionUI(currentAccount);
                    loadData();
                }
            });
            
            // Listen for chain changes
            window.ethereum.on('chainChanged', () => {
                window.location.reload();
            });
        }
    } catch (error) {
        console.error("Initialization error:", error);
        showError("App initialization failed. Please refresh the page.");
    }
}

// Start the app when DOM is loaded
document.addEventListener('DOMContentLoaded', initApp);
