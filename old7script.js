// Network Configurations
const networkConfig = {
    testnet: {
        chainId: '0x61',
        chainName: 'Binance Smart Chain Testnet',
        nativeCurrency: {
            name: 'BNB',
            symbol: 'BNB',
            decimals: 18
        },
        rpcUrls: ['https://data-seed-prebsc-1-s1.binance.org:8545/'],
        blockExplorerUrls: ['https://testnet.bscscan.com'],
        contractAddress: '0x7429438c74d705FA89951415b7a2b46dc713920f',
        vnstTokenAddress: '0x5C6cB004b50278c6726c3cBEDd25165c2072C46D',
        vntTokenAddress: '0xa7e41CB0A41dbFC801408d3B577fCed150c4eeEc',
        usdtTokenAddress: '0x337610d27c682E347C9cD60BD4b3b107C9d34dDd'
    },
    mainnet: {
        chainId: '0x38',
        chainName: 'Binance Smart Chain Mainnet',
        nativeCurrency: {
            name: 'BNB',
            symbol: 'BNB',
            decimals: 18
        },
        rpcUrls: ['https://bsc-dataseed.binance.org/'],
        blockExplorerUrls: ['https://bscscan.com'],
        contractAddress: '',
        vnstTokenAddress: '',
        vntTokenAddress: '',
        usdtTokenAddress: ''
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
let isAdmin = false;

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
    
    const messageContainer = document.getElementById('messageContainer') || document.body;
    messageContainer.appendChild(errorElement);
    
    setTimeout(() => {
        errorElement.remove();
    }, 5000);
}

function showSuccess(message) {
    const successElement = document.createElement('div');
    successElement.className = 'success-message';
    successElement.textContent = message;
    
    const messageContainer = document.getElementById('messageContainer') || document.body;
    messageContainer.appendChild(successElement);
    
    setTimeout(() => {
        successElement.remove();
    }, 5000);
}

function showLoading(elementId) {
    const element = document.getElementById(elementId);
    if (element) {
        const originalText = element.textContent;
        element.dataset.originalText = originalText;
        element.innerHTML = '<div class="loading-spinner"></div> Processing...';
        element.disabled = true;
    }
}

function hideLoading(elementId) {
    const element = document.getElementById(elementId);
    if (element && element.dataset.originalText) {
        element.textContent = element.dataset.originalText;
        element.disabled = false;
    }
}

// Helper function to wait for transaction receipt
async function waitForTransactionReceipt(txHash) {
    let receipt = null;
    let attempts = 0;
    const maxAttempts = 30; // ~1 minute timeout
    
    while (!receipt && attempts < maxAttempts) {
        receipt = await web3.eth.getTransactionReceipt(txHash);
        if (!receipt) {
            await new Promise(resolve => setTimeout(resolve, 2000));
            attempts++;
        }
    }
    
    if (!receipt) {
        throw new Error("Transaction receipt not found after waiting");
    }
    
    return receipt;
}

// Initialize Contracts with better error handling
async function initContracts() {
    try {
        const config = networkConfig[currentNetwork];
        
        if (!vnstStakingABI || !erc20ABI) {
            throw new Error("Contract ABIs not loaded");
        }
        
        vnstStakingContract = new web3.eth.Contract(vnstStakingABI, config.contractAddress);
        vnstTokenContract = new web3.eth.Contract(erc20ABI, config.vnstTokenAddress);
        vntTokenContract = new web3.eth.Contract(erc20ABI, config.vntTokenAddress);
        usdtTokenContract = new web3.eth.Contract(erc20ABI, config.usdtTokenAddress);
        
        // Verify contracts are properly initialized
        if (!vnstStakingContract?.methods || !vnstTokenContract?.methods) {
            throw new Error("Failed to initialize contract instances");
        }
        
        if (currentAccount) {
            const owner = await vnstStakingContract.methods.owner().call();
            isAdmin = currentAccount.toLowerCase() === owner.toLowerCase();
            
            const adminPanel = document.getElementById('adminPanel');
            if (adminPanel) adminPanel.style.display = isAdmin ? 'block' : 'none';
            
            const createFirstStakeBtn = document.getElementById('createFirstStakeBtn');
            if (createFirstStakeBtn) createFirstStakeBtn.style.display = isAdmin ? 'block' : 'none';
        }
        
        return true;
    } catch (error) {
        console.error("Error initializing contracts:", error);
        showError("Failed to initialize contracts. Please refresh the page.");
        throw error;
    }
}

// Updated stakeTokens function with proper allowance handling
async function stakeTokens() {
    const stakeBtn = document.getElementById('stakeBtn');
    try {
        showLoading('stakeBtn');
        
        const amount = document.getElementById('stakeAmount').value;
        let referrer = document.getElementById('referrerAddress').value;
        
        // Validate amount
        if (!amount || isNaN(amount)) {
            showError("Please enter a valid amount");
            hideLoading('stakeBtn');
            return;
        }
        
        const amountWei = web3.utils.toWei(amount, 'ether');
        const minStake = 100 * 1e18;
        const maxStake = 10000 * 1e18;
        
        if (amountWei < minStake || amountWei > maxStake) {
            showError(`Amount must be between ${web3.utils.fromWei(minStake, 'ether')}-${web3.utils.fromWei(maxStake, 'ether')} VNST`);
            hideLoading('stakeBtn');
            return;
        }
        
        // Handle referrer
        const urlParams = new URLSearchParams(window.location.search);
        const urlRef = urlParams.get('ref');
        
        if (!referrer && urlRef && web3.utils.isAddress(urlRef)) {
            referrer = urlRef;
        } else if (!referrer) {
            referrer = await vnstStakingContract.methods.owner().call();
        }
        
        // Special case for owner - allow self-referral
        const ownerAddress = await vnstStakingContract.methods.owner().call();
        const isOwner = currentAccount.toLowerCase() === ownerAddress.toLowerCase();
        
        if (!web3.utils.isAddress(referrer)) {
            showError("Invalid referrer address");
            hideLoading('stakeBtn');
            return;
        }
        
        if (!isOwner && referrer.toLowerCase() === currentAccount.toLowerCase()) {
            showError("You cannot refer yourself");
            hideLoading('stakeBtn');
            return;
        }
        
        // Get the actual token address from the staking contract
        const stakingTokenAddress = await vnstStakingContract.methods.vnstToken().call();
        const correctTokenContract = new web3.eth.Contract(erc20ABI, stakingTokenAddress);
        
        // Check current allowance
        const currentAllowance = await correctTokenContract.methods.allowance(
            currentAccount,
            networkConfig[currentNetwork].contractAddress
        ).call();
        
        console.log("Current allowance:", currentAllowance);
        
        const amountWeiBN = new web3.utils.BN(amountWei);
        const currentAllowanceBN = new web3.utils.BN(currentAllowance);
        
        // Only reset if current allowance is less than required
        if (currentAllowanceBN.lt(amountWeiBN)) {
            // Reset to zero first
            showSuccess("Resetting previous approval...");
            const resetTx = await correctTokenContract.methods.approve(
                networkConfig[currentNetwork].contractAddress,
                '0'
            ).send({ from: currentAccount });
            
            console.log("Reset tx hash:", resetTx.transactionHash);
            await waitForTransactionReceipt(resetTx.transactionHash);
            
            // Now set new allowance
            showSuccess("Setting new allowance...");
            const approveTx = await correctTokenContract.methods.approve(
                networkConfig[currentNetwork].contractAddress,
                amountWei
            ).send({ from: currentAccount });
            
            console.log("Approve tx hash:", approveTx.transactionHash);
            await waitForTransactionReceipt(approveTx.transactionHash);
            
            // Verify new allowance
            const newAllowance = await correctTokenContract.methods.allowance(
                currentAccount,
                networkConfig[currentNetwork].contractAddress
            ).call();
            
            console.log("New allowance:", newAllowance);
            const newAllowanceBN = new web3.utils.BN(newAllowance);
            
            if (newAllowanceBN.lt(amountWeiBN)) {
                throw new Error(`Approval failed. Current allowance: ${newAllowance}, Required: ${amountWei}`);
            }
        }
        
        // Execute stake with proper gas handling
        showSuccess("Approval confirmed. Now staking...");
        
        // Estimate gas first
        const gasEstimate = await vnstStakingContract.methods.stake(
            amountWei,
            referrer
        ).estimateGas({ from: currentAccount });
        
        console.log("Gas estimate:", gasEstimate);
        
        // Add 30% buffer
        const gasWithBuffer = Math.floor(gasEstimate * 1.3);
        
        const stakeTx = await vnstStakingContract.methods.stake(
            amountWei,
            referrer
        ).send({ 
            from: currentAccount,
            gas: gasWithBuffer
        });
        
        console.log("Stake tx hash:", stakeTx.transactionHash);
        await waitForTransactionReceipt(stakeTx.transactionHash);
        
        showSuccess("Tokens staked successfully!");
        document.getElementById('stakeAmount').value = '';
        
        // Update referral link after successful stake
        updateWalletConnectionUI(currentAccount);
        await loadData();
        
    } catch (error) {
        console.error("Staking failed:", error);
        let errorMsg = "Staking failed";
        
        if (error.message.includes("revert")) {
            const revertReason = error.message.match(/reason string: '(.+)'/);
            errorMsg = revertReason ? revertReason[1] : "Transaction reverted";
        } else if (error.message.includes("User denied transaction")) {
            errorMsg = "Transaction cancelled by user";
        } else if (error.message.includes("execution reverted")) {
            const revertReason = error.message.split("execution reverted: ")[1] || "Unknown reason";
            errorMsg = `Transaction failed: ${revertReason}`;
        }
        
        showError(errorMsg);
    } finally {
        hideLoading('stakeBtn');
    }
}

// Initialize App with better error handling
async function initApp() {
    try {
        // Initialize event listeners
        initEventListeners();
        
        // Add loading indicator
        if (!document.getElementById('loadingIndicator')) {
            const loadingDiv = document.createElement('div');
            loadingDiv.id = 'loadingIndicator';
            loadingDiv.style.display = 'none';
            loadingDiv.style.textAlign = 'center';
            loadingDiv.style.padding = '20px';
            loadingDiv.innerHTML = '<div class="loading-spinner"></div> Loading data...';
            document.body.insertBefore(loadingDiv, document.body.firstChild);
        }
        
        // Add message container if not exists
        if (!document.getElementById('messageContainer')) {
            const messageDiv = document.createElement('div');
            messageDiv.id = 'messageContainer';
            messageDiv.style.position = 'fixed';
            messageDiv.style.top = '20px';
            messageDiv.style.right = '20px';
            messageDiv.style.zIndex = '1000';
            document.body.appendChild(messageDiv);
        }
        
        if (window.ethereum) {
            web3 = new Web3(window.ethereum);
            
            // Handle events
            window.ethereum.on('disconnect', () => window.location.reload());
            window.ethereum.on('accountsChanged', async (accounts) => {
                if (accounts.length === 0) window.location.reload();
                else {
                    currentAccount = accounts[0];
                    updateWalletConnectionUI(currentAccount);
                    await loadData();
                }
            });
            window.ethereum.on('chainChanged', () => window.location.reload());
            
            if (window.ethereum.selectedAddress) {
                currentAccount = window.ethereum.selectedAddress;
                await checkNetwork();
                await initContracts();
                updateWalletConnectionUI(currentAccount);
                await loadData();
            } else {
                const walletConnectSection = document.getElementById('walletConnectSection');
                if (walletConnectSection) walletConnectSection.style.display = 'block';
            }
        } else {
            showError("Please install MetaMask or another Web3 wallet");
            const walletConnectSection = document.getElementById('walletConnectSection');
            if (walletConnectSection) walletConnectSection.style.display = 'block';
        }
    } catch (error) {
        console.error("Initialization error:", error);
        const loadingIndicator = document.getElementById('loadingIndicator');
        if (loadingIndicator) loadingIndicator.style.display = 'none';
        showError("App initialization failed. Please refresh the page.");
    }
}

// Start the app when DOM is loaded
document.addEventListener('DOMContentLoaded', initApp);

// ABIs will be added by user
let vnstStakingABI = [{"inputs":[{"internalType":"address","name":"_vnstToken","type":"address"},{"internalType":"address","name":"_vntToken","type":"address"},{"internalType":"address","name":"_usdtToken","type":"address"},{"internalType":"address","name":"_vnstStakingWallet","type":"address"},{"internalType":"address","name":"_vntRewardWallet","type":"address"},{"internalType":"address","name":"_usdtRewardWallet","type":"address"},{"internalType":"address","name":"_autoStakeWallet","type":"address"},{"internalType":"address","name":"_feeWallet","type":"address"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"}],"name":"Blacklisted","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"EmergencyWithdraw","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"account","type":"address"}],"name":"Paused","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"newPercent","type":"uint256"}],"name":"ROIPercentChanged","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":true,"internalType":"address","name":"referrer","type":"address"},{"indexed":false,"internalType":"uint256","name":"level","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"},{"indexed":false,"internalType":"bool","name":"inVNST","type":"bool"}],"name":"ReferralEarned","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"vntAmount","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"usdtAmount","type":"uint256"}],"name":"RewardClaimed","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"newRate","type":"uint256"}],"name":"RewardRateChanged","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"},{"indexed":false,"internalType":"address","name":"referrer","type":"address"}],"name":"Staked","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"newVnstPrice","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"newVntPrice","type":"uint256"}],"name":"TokenPricesUpdated","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"}],"name":"Unblacklisted","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"account","type":"address"}],"name":"Unpaused","type":"event"},{"inputs":[],"name":"ANTI_SYBLOCK_DURATION","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"CLAIM_INTERVAL","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"MAX_STAKE","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"MIN_STAKE","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"MIN_VNT_WITHDRAWAL","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"REWARD_INTERVAL","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"WITHDRAWAL_FEE","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"annualRewardRate","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"autoStakeWallet","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"user","type":"address"}],"name":"blacklistUser","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"blacklisted","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"claimRewards","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"createFirstStake","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"dailyROIPercent","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"directIncomePercents","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"user","type":"address"}],"name":"emergencyWithdraw","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"feeWallet","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"user","type":"address"}],"name":"forceClaim","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"user","type":"address"},{"internalType":"uint256","name":"level","type":"uint256"}],"name":"getLevelReferralCount","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"user","type":"address"},{"internalType":"uint256","name":"level","type":"uint256"}],"name":"getLevelReferrals","outputs":[{"internalType":"address[]","name":"","type":"address[]"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"user","type":"address"}],"name":"getPendingRewards","outputs":[{"internalType":"uint256","name":"vntReward","type":"uint256"},{"internalType":"uint256","name":"usdtReward","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"user","type":"address"}],"name":"getReferralCount","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"user","type":"address"}],"name":"getUserStats","outputs":[{"internalType":"uint256","name":"totalStaked","type":"uint256"},{"internalType":"uint256","name":"totalEarned","type":"uint256"},{"internalType":"uint256","name":"directMembers","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getWalletBalances","outputs":[{"internalType":"uint256","name":"vnstStakingBalance","type":"uint256"},{"internalType":"uint256","name":"vntRewardBalance","type":"uint256"},{"internalType":"uint256","name":"usdtRewardBalance","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"},{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"uint256","name":"","type":"uint256"}],"name":"levelReferrals","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"pause","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"paused","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"recoverETH","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"tokenAddress","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"recoverTokens","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"},{"internalType":"uint256","name":"","type":"uint256"}],"name":"referrals","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"requiredDirectMembers","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"rewards","outputs":[{"internalType":"uint256","name":"pendingVNT","type":"uint256"},{"internalType":"uint256","name":"pendingUSDT","type":"uint256"},{"internalType":"uint256","name":"claimedVNT","type":"uint256"},{"internalType":"uint256","name":"claimedUSDT","type":"uint256"},{"internalType":"uint256","name":"lastClaimTime","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_dailyROIPercent","type":"uint256"}],"name":"setDailyROIPercent","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_annualRewardRate","type":"uint256"}],"name":"setRewardRate","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_vnstPrice","type":"uint256"},{"internalType":"uint256","name":"_vntPrice","type":"uint256"}],"name":"setTokenPrices","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_vnstStakingWallet","type":"address"},{"internalType":"address","name":"_vntRewardWallet","type":"address"},{"internalType":"address","name":"_usdtRewardWallet","type":"address"},{"internalType":"address","name":"_autoStakeWallet","type":"address"},{"internalType":"address","name":"_feeWallet","type":"address"}],"name":"setWallets","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"},{"internalType":"address","name":"referrer","type":"address"}],"name":"stake","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"stakes","outputs":[{"internalType":"uint256","name":"amount","type":"uint256"},{"internalType":"uint256","name":"startTime","type":"uint256"},{"internalType":"uint256","name":"lastClaimTime","type":"uint256"},{"internalType":"address","name":"referrer","type":"address"},{"internalType":"bool","name":"active","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"user","type":"address"}],"name":"unblacklistUser","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"unpause","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"usdtRewardWallet","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"usdtToken","outputs":[{"internalType":"contract IERC20","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"userStats","outputs":[{"internalType":"uint256","name":"totalDirectMembers","type":"uint256"},{"internalType":"uint256","name":"totalStaked","type":"uint256"},{"internalType":"uint256","name":"totalEarned","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"vnstPrice","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"vnstStakingWallet","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"vnstToken","outputs":[{"internalType":"contract IERC20","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"vntPrice","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"vntRewardWallet","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"vntToken","outputs":[{"internalType":"contract IERC20","name":"","type":"address"}],"stateMutability":"view","type":"function"}]; // User will paste VNST Staking ABI here
let erc20ABI = [{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"spender","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Transfer","type":"event"},{"constant":true,"inputs":[],"name":"_decimals","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"_name","outputs":[{"internalType":"string","name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"_symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"spender","type":"address"}],"name":"allowance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"approve","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"decimals","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"subtractedValue","type":"uint256"}],"name":"decreaseAllowance","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"getOwner","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"addedValue","type":"uint256"}],"name":"increaseAllowance","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"mint","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"renounceOwnership","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"recipient","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transfer","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"sender","type":"address"},{"internalType":"address","name":"recipient","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transferFrom","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"}]; // User will paste ERC20 ABI here
