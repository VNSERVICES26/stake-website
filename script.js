// Contract ABIs
const vnstStakingABI = [/* Your VNSTStaking ABI here */];
const erc20ABI = [
    // Standard ERC20 ABI
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
        "constant": false,
        "inputs": [
            {"name": "_to", "type": "address"},
            {"name": "_value", "type": "uint256"}
        ],
        "name": "transfer",
        "outputs": [{"name": "", "type": "bool"}],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    }
];

// Network Configurations
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
        contractAddress: '0xYourTestnetContractAddress',
        vnstTokenAddress: '0xYourTestnetVNSTAddress',
        vntTokenAddress: '0xYourTestnetVNTAddress',
        usdtTokenAddress: '0xYourTestnetUSDTAddress'
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
        contractAddress: '0xYourMainnetContractAddress',
        vnstTokenAddress: '0xYourMainnetVNSTAddress',
        vntTokenAddress: '0xYourMainnetVNTAddress',
        usdtTokenAddress: '0xYourMainnetUSDTAddress'
    }
};

// Global Variables
let web3;
let currentNetwork = 'testnet'; // Change to 'mainnet' when ready
let vnstStakingContract;
let vnstTokenContract;
let vntTokenContract;
let usdtTokenContract;
let currentAccount = null;

// Initialize Web3 and Contracts
async function initWeb3() {
    if (window.ethereum) {
        web3 = new Web3(window.ethereum);
        try {
            // Request account access
            const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
            currentAccount = accounts[0];
            
            // Check if connected to the correct network
            await checkNetwork();
            
            // Initialize contracts
            await initContracts();
            
            return true;
        } catch (error) {
            console.error("User denied account access", error);
            return false;
        }
    } else if (window.web3) {
        web3 = new Web3(window.web3.currentProvider);
        await initContracts();
        return true;
    } else {
        console.log("Non-Ethereum browser detected. Consider installing MetaMask!");
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
    const chainId = await web3.eth.getChainId();
    const expectedChainId = parseInt(networkConfig[currentNetwork].chainId, 16);
    
    if (chainId !== expectedChainId) {
        try {
            await window.ethereum.request({
                method: 'wallet_switchEthereumChain',
                params: [{ chainId: networkConfig[currentNetwork].chainId }],
            });
        } catch (switchError) {
            // This error code indicates that the chain has not been added to MetaMask
            if (switchError.code === 4902) {
                try {
                    await window.ethereum.request({
                        method: 'wallet_addEthereumChain',
                        params: [networkConfig[currentNetwork]],
                    });
                } catch (addError) {
                    console.error("Error adding network:", addError);
                }
            } else {
                console.error("Error switching network:", switchError);
            }
        }
    }
}

// Toggle Menu Function
function toggleMenu() {
    const navLinks = document.getElementById('nav-links');
    navLinks.classList.toggle('show');
    
    document.querySelectorAll('#nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('show');
        });
    });
}

// Setup Card Animations
function setupCardAnimations() {
    const cards = document.querySelectorAll('.card');
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

// Setup Scroll Indicator
function setupScrollIndicator() {
    const scrollIndicator = document.createElement('div');
    scrollIndicator.className = 'scroll-indicator';
    document.body.appendChild(scrollIndicator);
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            scrollIndicator.style.display = 'none';
        } else {
            scrollIndicator.style.display = 'block';
        }
    });
}

// Connect Wallet Function
async function connectWallet() {
    try {
        if (typeof window.ethereum !== 'undefined') {
            // Request account access
            const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
            currentAccount = accounts[0];
            
            // Update UI
            updateWalletConnectionUI(currentAccount);
            
            // Load data
            await loadData();
            
            return currentAccount;
        } else {
            // Show wallet modal for non-MetaMask users
            showWalletModal();
            return null;
        }
    } catch (error) {
        console.error("Error connecting wallet:", error);
        showError("Error connecting wallet: " + error.message);
        return null;
    }
}

// Update Wallet Connection UI
function updateWalletConnectionUI(address) {
    const walletButtons = document.querySelectorAll('.wallet-connect-btn');
    const shortAddress = `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;
    
    walletButtons.forEach(btn => {
        btn.textContent = shortAddress;
        btn.classList.add('connected');
    });
    
    // Show wallet connected sections
    const walletSections = document.querySelectorAll('#walletConnectSection, #teamWalletConnect');
    walletSections.forEach(section => {
        section.style.display = 'none';
    });
    
    const dashboards = document.querySelectorAll('#stakingDashboard, #teamDashboard');
    dashboards.forEach(dashboard => {
        dashboard.style.display = 'block';
    });
}

// Show Wallet Modal
function showWalletModal() {
    const walletModal = document.createElement('div');
    walletModal.className = 'wallet-modal';
    walletModal.innerHTML = `
        <div class="modal-content">
            <h3>Connect Wallet</h3>
            <p>Choose your wallet provider</p>
            <div class="wallet-buttons">
                <button id="metamaskBtn">
                    <img src="assets/metamask.svg" alt="MetaMask">
                    MetaMask
                </button>
                <button id="walletConnectBtn">
                    <img src="assets/walletconnect.svg" alt="WalletConnect">
                    WalletConnect
                </button>
            </div>
            <div class="or-text">OR</div>
            <button id="copyLinkBtn" class="copy-link">Copy Referral Link</button>
        </div>
    `;
    
    document.body.appendChild(walletModal);
    
    // Close modal when clicking outside
    walletModal.addEventListener('click', function(e) {
        if (e.target === walletModal) {
            document.body.removeChild(walletModal);
        }
    });
    
    // Handle wallet selection
    document.getElementById('metamaskBtn')?.addEventListener('click', function() {
        window.open('https://metamask.io/download.html', '_blank');
        document.body.removeChild(walletModal);
    });
    
    document.getElementById('walletConnectBtn')?.addEventListener('click', function() {
        window.open('https://walletconnect.com/', '_blank');
        document.body.removeChild(walletModal);
    });
    
    document.getElementById('copyLinkBtn')?.addEventListener('click', function() {
        navigator.clipboard.writeText(window.location.href);
        showSuccess('Referral link copied to clipboard!');
    });
}

// Load Data
async function loadData() {
    try {
        if (!currentAccount) return;
        
        // Load global stats
        await loadGlobalStats();
        
        // Load user data
        await loadUserData();
        
        // Load team data if on team page
        if (document.getElementById('teamDashboard')) {
            await loadTeamData();
        }
    } catch (error) {
        console.error("Error loading data:", error);
        showError("Error loading data: " + error.message);
    }
}

// Load Global Stats
async function loadGlobalStats() {
    try {
        // Get total users (example - replace with actual contract call)
        const totalUsers = await vnstStakingContract.methods.getTotalUsers().call();
        document.getElementById('totalUsers').textContent = formatNumber(totalUsers);
        
        // Get total staked
        const totalStaked = await vnstStakingContract.methods.getTotalStaked().call();
        document.getElementById('totalStaked').textContent = `${formatNumber(web3.utils.fromWei(totalStaked, 'ether'))} VNST`;
        
        // Get total withdrawn
        const totalWithdrawn = await vnstStakingContract.methods.getTotalWithdrawn().call();
        document.getElementById('totalWithdrawn').textContent = `${formatNumber(web3.utils.fromWei(totalWithdrawn, 'ether'))} VNST`;
        
        // Get active staking
        const activeStaking = await vnstStakingContract.methods.getActiveStaking().call();
        document.getElementById('activeStaking').textContent = `${formatNumber(web3.utils.fromWei(activeStaking, 'ether'))} VNST`;
    } catch (error) {
        console.error("Error loading global stats:", error);
        throw error;
    }
}

// Load User Data
async function loadUserData() {
    try {
        if (!currentAccount) return;
        
        // Display wallet address
        document.getElementById('walletAddress').textContent = `${currentAccount.substring(0, 6)}...${currentAccount.substring(currentAccount.length - 4)}`;
        
        // Get VNST balance
        const vnstBalance = await vnstTokenContract.methods.balanceOf(currentAccount).call();
        document.getElementById('walletBalance').textContent = `${formatNumber(web3.utils.fromWei(vnstBalance, 'ether'))} VNST`;
        
        // Get user stake info
        const userStake = await vnstStakingContract.methods.stakes(currentAccount).call();
        document.getElementById('userTotalStaked').textContent = `${formatNumber(web3.utils.fromWei(userStake.amount, 'ether'))} VNST`;
        
        // Get user rewards
        const userRewards = await vnstStakingContract.methods.rewards(currentAccount).call();
        document.getElementById('userTotalWithdrawn').textContent = `${formatNumber(web3.utils.fromWei(userRewards.claimedVNT, 'ether'))} VNST`;
        
        // Get active staking (same as user's current stake in this simple example)
        document.getElementById('userActiveStaking').textContent = `${formatNumber(web3.utils.fromWei(userStake.amount, 'ether'))} VNST`;
        
        // Get pending rewards
        const pendingRewards = await vnstStakingContract.methods.getPendingRewards(currentAccount).call();
        document.getElementById('level1Income').textContent = `${formatNumber(web3.utils.fromWei(pendingRewards.vntReward, 'ether'))} VNT`;
        document.getElementById('level2to5Income').textContent = `${formatNumber(web3.utils.fromWei(pendingRewards.usdtReward, 'ether'))} USDT`;
        
        // Calculate daily ROI (example calculation)
        const dailyROI = await calculateDailyROI(currentAccount);
        document.getElementById('dailyROI').textContent = `${formatNumber(dailyROI)} USDT`;
    } catch (error) {
        console.error("Error loading user data:", error);
        throw error;
    }
}

// Load Team Data
async function loadTeamData() {
    try {
        if (!currentAccount) return;
        
        // Get direct members count
        const directMembers = await vnstStakingContract.methods.getReferralCount(currentAccount).call();
        document.getElementById('directMembers').textContent = directMembers;
        
        // Get total team members (sum of all levels)
        let totalTeamMembers = 0;
        for (let level = 1; level <= 5; level++) {
            const levelMembers = await vnstStakingContract.methods.getLevelReferralCount(currentAccount, level).call();
            totalTeamMembers += parseInt(levelMembers);
            document.getElementById(`level${level}Members`).textContent = levelMembers;
        }
        document.getElementById('totalTeamMembers').textContent = totalTeamMembers;
        
        // Get team staking info (example - replace with actual contract calls)
        const teamTotalStaked = await vnstStakingContract.methods.getTeamTotalStaked(currentAccount).call();
        document.getElementById('teamTotalStaked').textContent = `${formatNumber(web3.utils.fromWei(teamTotalStaked, 'ether'))} VNST`;
        
        const teamActiveStaking = await vnstStakingContract.methods.getTeamActiveStaking(currentAccount).call();
        document.getElementById('teamActiveStaking').textContent = `${formatNumber(web3.utils.fromWei(teamActiveStaking, 'ether'))} VNST`;
        
        // Populate team members table
        const tableBody = document.querySelector('#teamMembersTable tbody');
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
        
        // Update level statuses based on requirements
        for (let level = 1; level <= 5; level++) {
            const statusElement = document.getElementById(`level${level}Status`);
            const requiredMembers = await vnstStakingContract.methods.requiredDirectMembers(level - 1).call();
            const hasEnoughMembers = directMembers >= requiredMembers;
            
            if (hasEnoughMembers) {
                statusElement.textContent = 'Active';
                statusElement.className = 'status-active';
            } else {
                statusElement.textContent = 'Locked';
                statusElement.className = 'status-locked';
            }
        }
    } catch (error) {
        console.error("Error loading team data:", error);
        throw error;
    }
}

// Stake Tokens
async function stakeTokens(amount, referrer) {
    try {
        if (!currentAccount) {
            showError("Please connect your wallet first");
            return;
        }
        
        // Convert amount to wei
        const amountWei = web3.utils.toWei(amount.toString(), 'ether');
        
        // Approve VNST token transfer
        await vnstTokenContract.methods
            .approve(networkConfig[currentNetwork].contractAddress, amountWei)
            .send({ from: currentAccount });
        
        // Stake tokens
        await vnstStakingContract.methods
            .stake(amountWei, referrer)
            .send({ from: currentAccount });
        
        showSuccess(`Successfully staked ${amount} VNST!`);
        await loadUserData();
    } catch (error) {
        console.error("Error staking tokens:", error);
        showError("Staking failed: " + error.message);
    }
}

// Claim Rewards
async function claimRewards() {
    try {
        if (!currentAccount) {
            showError("Please connect your wallet first");
            return;
        }
        
        await vnstStakingContract.methods
            .claimRewards()
            .send({ from: currentAccount });
        
        showSuccess("Rewards claimed successfully!");
        await loadUserData();
    } catch (error) {
        console.error("Error claiming rewards:", error);
        showError("Claim failed: " + error.message);
    }
}

// Claim Level Rewards
async function claimLevelRewards(level) {
    try {
        if (!currentAccount) {
            showError("Please connect your wallet first");
            return;
        }
        
        // This would call a specific function in your contract for level rewards
        await vnstStakingContract.methods
            .claimLevelRewards(level)
            .send({ from: currentAccount });
        
        showSuccess(`Level ${level} rewards claimed successfully!`);
        await loadTeamData();
    } catch (error) {
        console.error("Error claiming level rewards:", error);
        showError("Claim failed: " + error.message);
    }
}

// Calculate Daily ROI (example implementation)
async function calculateDailyROI(userAddress) {
    try {
        const userStake = await vnstStakingContract.methods.stakes(userAddress).call();
        if (userStake.amount === '0') return '0';
        
        const roiPercent = await vnstStakingContract.methods.dailyROIPercent().call();
        const vnstPrice = await vnstStakingContract.methods.vnstPrice().call();
        
        const dailyROI = (web3.utils.fromWei(userStake.amount, 'ether') * 
                         web3.utils.fromWei(vnstPrice, 'ether') * 
                         roiPercent) / 100;
        
        return dailyROI.toFixed(4);
    } catch (error) {
        console.error("Error calculating daily ROI:", error);
        return '0';
    }
}

// Helper Functions
function formatNumber(num) {
    return parseFloat(num).toLocaleString('en-US', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    });
}

function showSuccess(message) {
    alert(message); // Replace with a nicer notification system
}

function showError(message) {
    alert(message); // Replace with a nicer notification system
}

// Initialize Everything
document.addEventListener('DOMContentLoaded', async function() {
    // Setup UI components
    toggleMenu();
    setupCardAnimations();
    setupScrollIndicator();
    
    // Add bouncing animation to all cards on hover
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.animation = 'bounce 0.5s ease';
        });
        card.addEventListener('mouseleave', () => {
            card.style.animation = '';
        });
    });
    
    // Initialize Web3 and contracts
    await initWeb3();
    
    // Setup wallet connection handlers
    if (window.ethereum) {
        window.ethereum.on('accountsChanged', (accounts) => {
            if (accounts.length === 0) {
                // Wallet disconnected
                location.reload();
            } else {
                // Account changed
                currentAccount = accounts[0];
                updateWalletConnectionUI(currentAccount);
                loadData();
            }
        });
        
        window.ethereum.on('chainChanged', (chainId) => {
            location.reload();
        });
    }
    
    // Add event listeners for wallet connection
    document.querySelectorAll('#connectWalletBtn, #teamConnectWalletBtn, #connectWalletNavBtn').forEach(btn => {
        btn?.addEventListener('click', connectWallet);
    });
    
    // Check if wallet is already connected
    if (currentAccount) {
        updateWalletConnectionUI(currentAccount);
        await loadData();
    }
    
    // Add stake form submission handler
    document.getElementById('confirmStakeBtn')?.addEventListener('click', async function() {
        const amount = document.getElementById('stakeAmount').value;
        const referrer = document.getElementById('referrerAddress').value;
        
        if (amount && amount > 0 && referrer && web3.utils.isAddress(referrer)) {
            await stakeTokens(amount, referrer);
            document.getElementById('stakeModal').style.display = 'none';
        } else {
            showError('Please enter valid amount and referrer address');
        }
    });
    
    // Add cancel stake handler
    document.getElementById('cancelStakeBtn')?.addEventListener('click', function() {
        document.getElementById('stakeModal').style.display = 'none';
    });
    
    // Add claim buttons handlers
    document.getElementById('claimTokenBtn')?.addEventListener('click', claimRewards);
    document.getElementById('claimUsdtBtn')?.addEventListener('click', claimRewards);
    
    // Add team claim buttons handlers
    for (let level = 1; level <= 5; level++) {
        document.getElementById(`claimLevel${level}Btn`)?.addEventListener('click', () => claimLevelRewards(level));
    }
});

// Add CSS for animations and status indicators
const style = document.createElement('style');
style.textContent = `
    @keyframes bounce {
        0%, 100% { transform: translateY(0); }
        50% { transform: translateY(-10px); }
    }
    
    .status-active {
        color: #00ff00;
        font-weight: bold;
    }
    
    .status-locked {
        color: #ff0000;
        font-weight: bold;
    }
    
    .wallet-connect-btn {
        background: linear-gradient(135deg, var(--secondary-color), var(--hover-color));
        color: var(--primary-color);
        border: none;
        padding: 0.5rem 1rem;
        font-weight: bold;
        border-radius: 50px;
        cursor: pointer;
        transition: all 0.3s ease;
        font-size: 0.9rem;
        white-space: nowrap;
    }
    
    .wallet-connect-btn.connected {
        background: var(--card-bg);
        color: var(--secondary-color);
        border: 1px solid var(--secondary-color);
    }
    
    .wallet-modal {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0, 0, 0, 0.7);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 10000;
    }
    
    .wallet-modal .modal-content {
        background: var(--card-bg);
        padding: 2rem;
        border-radius: 15px;
        width: 90%;
        max-width: 400px;
        text-align: center;
    }
    
    .wallet-buttons {
        display: grid;
        grid-template-columns: 1fr;
        gap: 1rem;
        margin: 1.5rem 0;
    }
    
    .wallet-buttons button {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 0.5rem;
        padding: 1rem;
        border-radius: 10px;
        background: rgba(255, 255, 255, 0.05);
        border: 1px solid var(--glass-border);
        color: white;
        cursor: pointer;
        transition: all 0.3s ease;
    }
    
    .wallet-buttons button:hover {
        background: rgba(255, 179, 0, 0.1);
        border-color: var(--secondary-color);
    }
    
    .wallet-buttons button img {
        width: 24px;
        height: 24px;
    }
    
    .or-text {
        margin: 1.5rem 0;
        position: relative;
        text-align: center;
    }
    
    .or-text::before,
    .or-text::after {
        content: '';
        position: absolute;
        top: 50%;
        width: 45%;
        height: 1px;
        background: var(--glass-border);
    }
    
    .or-text::before {
        left: 0;
    }
    
    .or-text::after {
        right: 0;
    }
    
    .copy-link {
        width: 100%;
        padding: 12px;
        background: var(--secondary-color);
        color: var(--primary-color);
        border: none;
        border-radius: 10px;
        font-weight: bold;
        cursor: pointer;
        transition: all 0.3s ease;
    }
    
    .copy-link:hover {
        background: var(--hover-color);
    }
    
    @media (max-width: 768px) {
        #nav-links li button.wallet-connect-btn {
            margin-top: 1rem;
            width: 100%;
        }
    }
`;
document.head.appendChild(style);
