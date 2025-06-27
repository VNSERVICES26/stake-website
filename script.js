// Contract ABIs
const vnstStakingABI = [
    {
        "inputs": [],
        "name": "totalStaked",
        "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "totalUsers",
        "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "totalWithdrawn",
        "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
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
        "inputs": [
            {"internalType": "uint256", "name": "amount", "type": "uint256"},
            {"internalType": "address", "name": "referrer", "type": "address"}
        ],
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
        "name": "getTeamTotalStaked",
        "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [{"internalType": "address", "name": "user", "type": "address"}],
        "name": "getTeamActiveStaking",
        "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
        "name": "requiredDirectMembers",
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
        "inputs": [],
        "name": "vnstPrice",
        "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [{"internalType": "address", "name": "", "type": "address"}],
        "name": "rewards",
        "outputs": [
            {"internalType": "uint256", "name": "claimedVNT", "type": "uint256"},
            {"internalType": "uint256", "name": "claimedUSDT", "type": "uint256"},
            {"internalType": "uint256", "name": "pendingVNT", "type": "uint256"},
            {"internalType": "uint256", "name": "pendingUSDT", "type": "uint256"}
        ],
        "stateMutability": "view",
        "type": "function"
    }
];

const erc20ABI = [
    {
        "constant": true,
        "inputs": [],
        "name": "name",
        "outputs": [{"name": "", "type": "string"}],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "symbol",
        "outputs": [{"name": "", "type": "string"}],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "decimals",
        "outputs": [{"name": "", "type": "uint8"}],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
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

// Network Configurations - REPLACE WITH YOUR ACTUAL ADDRESSES
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
let currentNetwork = 'testnet'; // Change to 'mainnet' when ready

// Initialize Web3 and Contracts
async function initWeb3() {
    if (window.ethereum) {
        try {
            web3 = new Web3(window.ethereum);
            
            // Request account access
            const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
            currentAccount = accounts[0];
            
            // Check if connected to the correct network
            await checkNetwork();
            
            // Initialize contracts
            await initContracts();
            
            // Update UI
            updateWalletConnectionUI(currentAccount);
            
            // Load data
            await loadData();
            
            return true;
        } catch (error) {
            console.error("Error initializing Web3:", error);
            showError("Error connecting wallet: " + error.message);
            return false;
        }
    } else {
        console.log("Non-Ethereum browser detected. Consider installing MetaMask!");
        showError("Please install MetaMask to use this dApp!");
        return false;
    }
}

// Initialize Contracts
async function initContracts() {
    const config = networkConfig[currentNetwork];
    
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
}

// Check and Switch Network
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
            } catch (switchError) {
                if (switchError.code === 4902) {
                    try {
                        await window.ethereum.request({
                            method: 'wallet_addEthereumChain',
                            params: [networkConfig[currentNetwork]],
                        });
                    } catch (addError) {
                        console.error("Error adding network:", addError);
                        throw addError;
                    }
                } else {
                    console.error("Error switching network:", switchError);
                    throw switchError;
                }
            }
        }
    } catch (error) {
        console.error("Network error:", error);
        throw error;
    }
}

// Toggle Menu Function
function toggleMenu() {
    const navLinks = document.getElementById('nav-links');
    if (navLinks) {
        navLinks.classList.toggle('show');
        
        document.querySelectorAll('#nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('show');
            });
        });
    }
}

// Setup Card Animations
function setupCardAnimations() {
    const cards = document.querySelectorAll('.card');
    if (cards.length > 0) {
        const cardObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    cardObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });

        cards.forEach(card => {
            cardObserver.observe(card);
        });
    }
}

// Connect Wallet Function
async function connectWallet() {
    try {
        if (typeof window.ethereum !== 'undefined') {
            const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
            currentAccount = accounts[0];
            updateWalletConnectionUI(currentAccount);
            await loadData();
        } else {
            showError("Please install MetaMask to connect your wallet");
        }
    } catch (error) {
        console.error("Error connecting wallet:", error);
        showError("Error connecting wallet: " + (error.message || error));
    }
}

// Update Wallet Connection UI
function updateWalletConnectionUI(address) {
    if (!address) return;
    
    const walletButtons = document.querySelectorAll('.wallet-connect-btn');
    const shortAddress = `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;
    
    walletButtons.forEach(btn => {
        if (btn) {
            btn.textContent = shortAddress;
            btn.classList.add('connected');
        }
    });
    
    // Show wallet connected sections
    const walletSections = document.querySelectorAll('#walletConnectSection, #teamWalletConnect');
    walletSections.forEach(section => {
        if (section) section.style.display = 'none';
    });
    
    const dashboards = document.querySelectorAll('#stakingDashboard, #teamDashboard');
    dashboards.forEach(dashboard => {
        if (dashboard) dashboard.style.display = 'block';
    });
    
    // Update referral link
    if (document.getElementById('referralLink')) {
        document.getElementById('referralLink').value = `${window.location.origin}${window.location.pathname}?ref=${currentAccount}`;
    }
}

// Load Data
async function loadData() {
    try {
        if (!currentAccount) return;
        
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

// Load Global Stats
async function loadGlobalStats() {
    try {
        // Get total users
        const totalUsers = await vnstStakingContract.methods.totalUsers().call();
        safeSetTextContent('totalUsers', formatNumber(totalUsers));
        
        // Get total staked
        const totalStaked = await vnstStakingContract.methods.totalStaked().call();
        safeSetTextContent('totalStaked', `${formatNumber(web3.utils.fromWei(totalStaked, 'ether'))} VNST`);
        
        // Get total withdrawn
        const totalWithdrawn = await vnstStakingContract.methods.totalWithdrawn().call();
        safeSetTextContent('totalWithdrawn', `${formatNumber(web3.utils.fromWei(totalWithdrawn, 'ether'))} VNST`);
        
        // Get active staking
        safeSetTextContent('activeStaking', `${formatNumber(web3.utils.fromWei(totalStaked, 'ether'))} VNST`);
    } catch (error) {
        console.error("Error loading global stats:", error);
        // Fallback to zeros if contract methods don't exist
        safeSetTextContent('totalUsers', '0');
        safeSetTextContent('totalStaked', '0 VNST');
        safeSetTextContent('totalWithdrawn', '0 VNST');
        safeSetTextContent('activeStaking', '0 VNST');
    }
}

// Load User Data
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
        safeSetTextContent('userTotalWithdrawn', `${formatNumber(web3.utils.fromWei(userRewards.claimedVNT, 'ether'))} VNST`);
        
        // Get active staking
        safeSetTextContent('userActiveStaking', `${formatNumber(web3.utils.fromWei(userStake.amount, 'ether'))} VNST`);
        
        // Get pending rewards
        const pendingRewards = await vnstStakingContract.methods.getPendingRewards(currentAccount).call();
        safeSetTextContent('level1Income', `${formatNumber(web3.utils.fromWei(pendingRewards.vntReward, 'ether'))} VNT`);
        safeSetTextContent('level2to5Income', `${formatNumber(web3.utils.fromWei(pendingRewards.usdtReward, 'ether'))} USDT`);
        
        // Calculate daily ROI
        const dailyROI = await calculateDailyROI(currentAccount);
        safeSetTextContent('dailyROI', `${formatNumber(dailyROI)} USDT`);
    } catch (error) {
        console.error("Error loading user data:", error);
        throw error;
    }
}

// Calculate Daily ROI
async function calculateDailyROI(userAddress) {
    try {
        const userStake = await vnstStakingContract.methods.stakes(userAddress).call();
        const dailyROIPercent = await vnstStakingContract.methods.dailyROIPercent().call();
        const vnstPrice = await vnstStakingContract.methods.vnstPrice().call();
        
        const stakedAmount = web3.utils.fromWei(userStake.amount, 'ether');
        const roiAmount = (stakedAmount * dailyROIPercent) / 100;
        const roiInUsdt = roiAmount * (web3.utils.fromWei(vnstPrice, 'ether'));
        
        return roiInUsdt;
    } catch (error) {
        console.error("Error calculating daily ROI:", error);
        return 0;
    }
}

// Load Team Data
async function loadTeamData() {
    try {
        if (!currentAccount) return;
        
        // Get direct members count
        const directMembers = await vnstStakingContract.methods.getReferralCount(currentAccount).call();
        safeSetTextContent('directMembers', directMembers);
        
        // Get total team members (sum of all levels)
        let totalTeamMembers = 0;
        for (let level = 1; level <= 5; level++) {
            const levelMembers = await vnstStakingContract.methods.getLevelReferralCount(currentAccount, level).call();
            totalTeamMembers += parseInt(levelMembers);
            safeSetTextContent(`level${level}Members`, levelMembers);
        }
        safeSetTextContent('totalTeamMembers', totalTeamMembers);
        
        // Get team staking info
        const teamTotalStaked = await vnstStakingContract.methods.getTeamTotalStaked(currentAccount).call();
        safeSetTextContent('teamTotalStaked', `${formatNumber(web3.utils.fromWei(teamTotalStaked, 'ether'))} VNST`);
        
        const teamActiveStaking = await vnstStakingContract.methods.getTeamActiveStaking(currentAccount).call();
        safeSetTextContent('teamActiveStaking', `${formatNumber(web3.utils.fromWei(teamActiveStaking, 'ether'))} VNST`);
        
        // Populate team members table
        const tableBody = document.querySelector('#teamMembersTable tbody');
        if (tableBody) {
            tableBody.innerHTML = '';
            
            // Get level 1 referrals
            const level1Referrals = await vnstStakingContract.methods.getLevelReferrals(currentAccount, 1).call();
            
            // Add sample data (first 3 referrals)
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
        for (let level = 1; level <= 5; level++) {
            const statusElement = document.getElementById(`level${level}Status`);
            if (statusElement) {
                const requiredMembers = await vnstStakingContract.methods.requiredDirectMembers(level - 1).call();
                const hasEnoughMembers = parseInt(directMembers) >= parseInt(requiredMembers);
                
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
        throw error;
    }
}

// Stake Tokens
async function stakeTokens() {
    try {
        const amount = document.getElementById('stakeAmount').value;
        const referrer = document.getElementById('referrerAddress').value;
        
        if (!amount || isNaN(amount) || parseFloat(amount) <= 0) {
            showError("Please enter a valid amount");
            return;
        }
        
        if (!referrer || !web3.utils.isAddress(referrer)) {
            showError("Please enter a valid referrer address");
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

// Claim Rewards
async function claimRewards() {
    try {
        await vnstStakingContract.methods.claimRewards().send({ from: currentAccount });
        showSuccess("Rewards claimed successfully!");
        await loadData();
    } catch (error) {
        console.error("Error claiming rewards:", error);
        showError("Error claiming rewards: " + (error.message || error));
    }
}

// Copy Referral Link
function copyReferralLink() {
    const referralLink = document.getElementById('referralLink');
    if (referralLink) {
        referralLink.select();
        document.execCommand('copy');
        showSuccess("Referral link copied to clipboard!");
    }
}

// Share Referral Link
function shareReferralLink() {
    const referralLink = document.getElementById('referralLink');
    if (referralLink) {
        const link = referralLink.value;
        
        if (navigator.share) {
            navigator.share({
                title: 'Join VNST Staking Platform',
                text: 'Stake VNST tokens and earn rewards!',
                url: link
            }).catch(err => {
                console.error('Error sharing:', err);
            });
        } else {
            // Fallback for browsers that don't support Web Share API
            window.open(`https://twitter.com/intent/tweet?text=Join%20VNST%20Staking%20Platform%20and%20earn%20rewards!%20${encodeURIComponent(link)}`, '_blank');
        }
    }
}

// Show Error Message
function showError(message) {
    const errorElement = document.createElement('div');
    errorElement.className = 'error-message';
    errorElement.textContent = message;
    
    document.body.appendChild(errorElement);
    
    setTimeout(() => {
        errorElement.remove();
    }, 5000);
}

// Show Success Message
function showSuccess(message) {
    const successElement = document.createElement('div');
    successElement.className = 'success-message';
    successElement.textContent = message;
    
    document.body.appendChild(successElement);
    
    setTimeout(() => {
        successElement.remove();
    }, 5000);
}

// Format Number
function formatNumber(num) {
    if (isNaN(num)) return "0";
    return parseFloat(num).toLocaleString('en-US', {
        maximumFractionDigits: 2,
        minimumFractionDigits: 2
    });
}

// Safely set text content
function safeSetTextContent(elementId, text) {
    const element = document.getElementById(elementId);
    if (element) element.textContent = text;
}

// Initialize Event Listeners
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
    
    const claimUsdtBtn = document.getElementById('claimUsdtBtn');
    if (claimUsdtBtn) claimUsdtBtn.addEventListener('click', claimRewards);
    
    // Level claim buttons
    for (let i = 1; i <= 3; i++) {
        const btn = document.getElementById(`claimLevel${i}Btn`);
        if (btn) btn.addEventListener('click', claimRewards);
    }
    
    // Referral buttons
    const copyReferralBtn = document.getElementById('copyReferralBtn');
    if (copyReferralBtn) copyReferralBtn.addEventListener('click', copyReferralLink);
    
    const shareReferralBtn = document.getElementById('shareReferralBtn');
    if (shareReferralBtn) shareReferralBtn.addEventListener('click', shareReferralLink);
    
    // Menu toggle
    const menuToggle = document.querySelector('.menu-toggle');
    if (menuToggle) menuToggle.addEventListener('click', toggleMenu);
}

// Initialize App
async function initApp() {
    // Setup card animations
    setupCardAnimations();
    
    // Initialize event listeners
    initEventListeners();
    
    // Check if wallet is already connected
    if (window.ethereum && window.ethereum.selectedAddress) {
        try {
            currentAccount = window.ethereum.selectedAddress;
            web3 = new Web3(window.ethereum);
            await checkNetwork();
            await initContracts();
            updateWalletConnectionUI(currentAccount);
            await loadData();
        } catch (error) {
            console.error("Initialization error:", error);
        }
    }
    
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
        
        // Handle disconnect event
        window.ethereum.on('disconnect', () => {
            window.location.reload();
        });
    }
}

// Start the app when DOM is loaded
document.addEventListener('DOMContentLoaded', initApp);
