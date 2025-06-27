// Contract ABIs - Replace with your actual contract ABIs
const vnstStakingABI = [{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"}],"name":"Blacklisted","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"EmergencyWithdraw","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"account","type":"address"}],"name":"Paused","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"newPercent","type":"uint256"}],"name":"ROIPercentChanged","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":true,"internalType":"address","name":"referrer","type":"address"},{"indexed":false,"internalType":"uint256","name":"level","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"},{"indexed":false,"internalType":"bool","name":"inVNST","type":"bool"}],"name":"ReferralEarned","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"vntAmount","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"usdtAmount","type":"uint256"}],"name":"RewardClaimed","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"newRate","type":"uint256"}],"name":"RewardRateChanged","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"},{"indexed":false,"internalType":"address","name":"referrer","type":"address"}],"name":"Staked","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"newVnstPrice","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"newVntPrice","type":"uint256"}],"name":"TokenPricesUpdated","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"}],"name":"Unblacklisted","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"account","type":"address"}],"name":"Unpaused","type":"event"},{"inputs":[],"name":"ANTI_SYBLOCK_DURATION","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"CLAIM_INTERVAL","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"MAX_STAKE","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"MIN_STAKE","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"MIN_VNT_WITHDRAWAL","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"REWARD_INTERVAL","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"WITHDRAWAL_FEE","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"annualRewardRate","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"autoStakeWallet","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"user","type":"address"}],"name":"blacklistUser","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"blacklisted","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"claimRewards","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"dailyROIPercent","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"directIncomePercents","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"user","type":"address"}],"name":"emergencyWithdraw","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"feeWallet","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"user","type":"address"}],"name":"forceClaim","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"user","type":"address"},{"internalType":"uint256","name":"level","type":"uint256"}],"name":"getLevelReferralCount","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"user","type":"address"},{"internalType":"uint256","name":"level","type":"uint256"}],"name":"getLevelReferrals","outputs":[{"internalType":"address[]","name":"","type":"address[]"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"user","type":"address"}],"name":"getPendingRewards","outputs":[{"internalType":"uint256","name":"vntReward","type":"uint256"},{"internalType":"uint256","name":"usdtReward","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"user","type":"address"}],"name":"getReferralCount","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"user","type":"address"}],"name":"getUserStats","outputs":[{"internalType":"uint256","name":"totalStaked","type":"uint256"},{"internalType":"uint256","name":"totalEarned","type":"uint256"},{"internalType":"uint256","name":"directMembers","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getWalletBalances","outputs":[{"internalType":"uint256","name":"vnstStakingBalance","type":"uint256"},{"internalType":"uint256","name":"vntRewardBalance","type":"uint256"},{"internalType":"uint256","name":"usdtRewardBalance","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_vnstToken","type":"address"},{"internalType":"address","name":"_vntToken","type":"address"},{"internalType":"address","name":"_usdtToken","type":"address"},{"internalType":"address","name":"_vnstStakingWallet","type":"address"},{"internalType":"address","name":"_vntRewardWallet","type":"address"},{"internalType":"address","name":"_usdtRewardWallet","type":"address"},{"internalType":"address","name":"_autoStakeWallet","type":"address"},{"internalType":"address","name":"_feeWallet","type":"address"}],"name":"initialize","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"},{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"uint256","name":"","type":"uint256"}],"name":"levelReferrals","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"pause","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"paused","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"recoverETH","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"tokenAddress","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"recoverTokens","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"},{"internalType":"uint256","name":"","type":"uint256"}],"name":"referrals","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"requiredDirectMembers","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"rewards","outputs":[{"internalType":"uint256","name":"pendingVNT","type":"uint256"},{"internalType":"uint256","name":"pendingUSDT","type":"uint256"},{"internalType":"uint256","name":"claimedVNT","type":"uint256"},{"internalType":"uint256","name":"claimedUSDT","type":"uint256"},{"internalType":"uint256","name":"lastClaimTime","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_dailyROIPercent","type":"uint256"}],"name":"setDailyROIPercent","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_annualRewardRate","type":"uint256"}],"name":"setRewardRate","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_vnstPrice","type":"uint256"},{"internalType":"uint256","name":"_vntPrice","type":"uint256"}],"name":"setTokenPrices","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_vnstStakingWallet","type":"address"},{"internalType":"address","name":"_vntRewardWallet","type":"address"},{"internalType":"address","name":"_usdtRewardWallet","type":"address"},{"internalType":"address","name":"_autoStakeWallet","type":"address"},{"internalType":"address","name":"_feeWallet","type":"address"}],"name":"setWallets","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"},{"internalType":"address","name":"referrer","type":"address"}],"name":"stake","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"stakes","outputs":[{"internalType":"uint256","name":"amount","type":"uint256"},{"internalType":"uint256","name":"startTime","type":"uint256"},{"internalType":"uint256","name":"lastClaimTime","type":"uint256"},{"internalType":"address","name":"referrer","type":"address"},{"internalType":"bool","name":"active","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"user","type":"address"}],"name":"unblacklistUser","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"unpause","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"usdtRewardWallet","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"usdtToken","outputs":[{"internalType":"contract IERC20","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"userStats","outputs":[{"internalType":"uint256","name":"totalDirectMembers","type":"uint256"},{"internalType":"uint256","name":"totalStaked","type":"uint256"},{"internalType":"uint256","name":"totalEarned","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"vnstPrice","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"vnstStakingWallet","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"vnstToken","outputs":[{"internalType":"contract IERC20","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"vntPrice","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"vntRewardWallet","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"vntToken","outputs":[{"internalType":"contract IERC20","name":"","type":"address"}],"stateMutability":"view","type":"function"}];
const erc20ABI = [{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"spender","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Transfer","type":"event"},{"constant":true,"inputs":[],"name":"_decimals","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"_name","outputs":[{"internalType":"string","name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"_symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"spender","type":"address"}],"name":"allowance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"approve","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"decimals","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"subtractedValue","type":"uint256"}],"name":"decreaseAllowance","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"getOwner","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"addedValue","type":"uint256"}],"name":"increaseAllowance","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"mint","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"renounceOwnership","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"recipient","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transfer","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"sender","type":"address"},{"internalType":"address","name":"recipient","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transferFrom","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"}];

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

// Utility Functions
function formatNumber(num) {
    if (isNaN(num)) return "0";
    return parseFloat(num).toLocaleString('en-US', {
        maximumFractionDigits: 2,
        minimumFractionDigits: 2
    });
}

function safeSetTextContent(elementId, text) {
    const element = document.getElementById(elementId);
    if (element) element.textContent = text;
}

function showError(message) {
    const errorElement = document.createElement('div');
    errorElement.className = 'error-message';
    errorElement.textContent = message;
    
    document.body.appendChild(errorElement);
    
    setTimeout(() => {
        errorElement.remove();
    }, 5000);
}

function showSuccess(message) {
    const successElement = document.createElement('div');
    successElement.className = 'success-message';
    successElement.textContent = message;
    
    document.body.appendChild(successElement);
    
    setTimeout(() => {
        successElement.remove();
    }, 5000);
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

// Initialize Contracts
async function initContracts() {
    try {
        const config = networkConfig[currentNetwork];
        
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
        
        if (!vnstStakingContract || !vnstTokenContract || !vntTokenContract || !usdtTokenContract) {
            throw new Error("Failed to initialize contracts");
        }
        
    } catch (error) {
        console.error("Error initializing contracts:", error);
        throw error;
    }
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

// Connect Wallet Function
async function connectWallet() {
    try {
        if (typeof window.ethereum !== 'undefined') {
            const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
            currentAccount = accounts[0];
            
            await checkNetwork();
            
            if (!vnstStakingContract) {
                await initContracts();
            }
            
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
    
    const walletSections = document.querySelectorAll('#walletConnectSection, #teamWalletConnect');
    walletSections.forEach(section => {
        if (section) section.style.display = 'none';
    });
    
    const dashboards = document.querySelectorAll('#stakingDashboard, #teamDashboard');
    dashboards.forEach(dashboard => {
        if (dashboard) dashboard.style.display = 'block';
    });
    
    if (document.getElementById('referralLink')) {
        document.getElementById('referralLink').value = `${window.location.origin}${window.location.pathname}?ref=${currentAccount}`;
    }
}

// Load Data
async function loadData() {
    try {
        if (!currentAccount) return;
        
        if (!vnstStakingContract || !vnstTokenContract) {
            await initContracts();
        }
        
        if (document.getElementById('totalUsers')) {
            await loadGlobalStats();
        }
        
        if (document.getElementById('walletAddress')) {
            await loadUserData();
        }
        
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
        const userStats = await vnstStakingContract.methods.getUserStats(currentAccount).call();
        safeSetTextContent('totalStaked', `${formatNumber(web3.utils.fromWei(userStats.totalStaked, 'ether'))} VNST`);
        safeSetTextContent('totalWithdrawn', `${formatNumber(web3.utils.fromWei(userStats.totalEarned, 'ether'))} VNST`);
        safeSetTextContent('totalUsers', formatNumber(userStats.directMembers));
        
        const stakeInfo = await vnstStakingContract.methods.stakes(currentAccount).call();
        safeSetTextContent('activeStaking', stakeInfo.active ? 
            `${formatNumber(web3.utils.fromWei(stakeInfo.amount, 'ether'))} VNST` : '0 VNST');
    } catch (error) {
        console.error("Error loading global stats:", error);
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
        
        safeSetTextContent('walletAddress', `${currentAccount.substring(0, 6)}...${currentAccount.substring(currentAccount.length - 4)}`);
        
        const vnstBalance = await vnstTokenContract.methods.balanceOf(currentAccount).call();
        safeSetTextContent('walletBalance', `${formatNumber(web3.utils.fromWei(vnstBalance, 'ether'))} VNST`);
        
        const userStake = await vnstStakingContract.methods.stakes(currentAccount).call();
        safeSetTextContent('userTotalStaked', `${formatNumber(web3.utils.fromWei(userStake.amount, 'ether'))} VNST`);
        
        const userRewards = await vnstStakingContract.methods.rewards(currentAccount).call();
        safeSetTextContent('userTotalWithdrawn', `${formatNumber(web3.utils.fromWei(userRewards.claimedVNT, 'ether'))} VNT + ${formatNumber(web3.utils.fromWei(userRewards.claimedUSDT, 'ether'))} USDT`);
        
        safeSetTextContent('userActiveStaking', userStake.active ? 
            `${formatNumber(web3.utils.fromWei(userStake.amount, 'ether'))} VNST` : '0 VNST');
        
        const pendingRewards = await vnstStakingContract.methods.getPendingRewards(currentAccount).call();
        safeSetTextContent('level1Income', `${formatNumber(web3.utils.fromWei(pendingRewards.vntReward, 'ether'))} VNT`);
        safeSetTextContent('level2to5Income', `${formatNumber(web3.utils.fromWei(pendingRewards.usdtReward, 'ether'))} USDT`);
        
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

// Load Team Data
async function loadTeamData() {
    try {
        if (!currentAccount) return;
        
        const userStats = await vnstStakingContract.methods.getUserStats(currentAccount).call();
        safeSetTextContent('directMembers', userStats.directMembers);
        
        let totalTeamMembers = 0;
        for (let level = 1; level <= 5; level++) {
            const levelMembers = await vnstStakingContract.methods.getLevelReferralCount(currentAccount, level).call();
            totalTeamMembers += parseInt(levelMembers);
            safeSetTextContent(`level${level}Members`, levelMembers);
        }
        safeSetTextContent('totalTeamMembers', totalTeamMembers);
        
        safeSetTextContent('teamTotalStaked', `${formatNumber(web3.utils.fromWei(userStats.totalStaked, 'ether'))} VNST`);
        
        const userStake = await vnstStakingContract.methods.stakes(currentAccount).call();
        safeSetTextContent('teamActiveStaking', userStake.active ? 
            `${formatNumber(web3.utils.fromWei(userStake.amount, 'ether'))} VNST` : '0 VNST');
        
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
        
        const requiredMembers = [2, 2, 2, 2, 2];
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

// Stake Tokens
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
        
        const allowance = await vnstTokenContract.methods.allowance(
            currentAccount,
            networkConfig[currentNetwork].contractAddress
        ).call();
        
        if (parseInt(allowance) < parseInt(amountWei)) {
            await vnstTokenContract.methods.approve(
                networkConfig[currentNetwork].contractAddress,
                amountWei
            ).send({ from: currentAccount });
        }
        
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
            window.open(`https://twitter.com/intent/tweet?text=Join%20VNST%20Staking%20Platform%20and%20earn%20rewards!%20${encodeURIComponent(link)}`, '_blank');
        }
    }
}

// Initialize Event Listeners
function initEventListeners() {
    document.querySelectorAll('.wallet-connect-btn, #connectWalletBtn, #teamConnectWalletBtn').forEach(btn => {
        if (btn) btn.addEventListener('click', connectWallet);
    });
    
    const stakeBtn = document.getElementById('stakeBtn');
    if (stakeBtn) stakeBtn.addEventListener('click', stakeTokens);
    
    const claimTokenBtn = document.getElementById('claimTokenBtn');
    if (claimTokenBtn) claimTokenBtn.addEventListener('click', claimRewards);
    
    const claimUsdtBtn = document.getElementById('claimUsdtBtn');
    if (claimUsdtBtn) claimUsdtBtn.addEventListener('click', claimRewards);
    
    const copyReferralBtn = document.getElementById('copyReferralBtn');
    if (copyReferralBtn) copyReferralBtn.addEventListener('click', copyReferralLink);
    
    const shareReferralBtn = document.getElementById('shareReferralBtn');
    if (shareReferralBtn) shareReferralBtn.addEventListener('click', shareReferralLink);
    
    const menuToggle = document.querySelector('.menu-toggle');
    if (menuToggle) menuToggle.addEventListener('click', toggleMenu);
}

// Initialize App
async function initApp() {
    try {
        setupCardAnimations();
        initEventListeners();
        
        if (window.ethereum && window.ethereum.selectedAddress) {
            currentAccount = window.ethereum.selectedAddress;
            web3 = new Web3(window.ethereum);
            await checkNetwork();
            await initContracts();
            updateWalletConnectionUI(currentAccount);
            await loadData();
        }
        
        if (window.ethereum) {
            window.ethereum.on('accountsChanged', (accounts) => {
                if (accounts.length === 0) {
                    window.location.reload();
                } else {
                    currentAccount = accounts[0];
                    updateWalletConnectionUI(currentAccount);
                    loadData();
                }
            });
            
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
