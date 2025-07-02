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
        contractAddress: '0xd06Bc0321dF9df3d95fC68B81Df00DBd22fc333c',
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
        
        // Check if current account is admin
        if (currentAccount) {
            const owner = await vnstStakingContract.methods.owner().call();
            isAdmin = currentAccount.toLowerCase() === owner.toLowerCase();
            
            // Show admin panel if user is admin
            const adminPanel = document.getElementById('adminPanel');
            if (adminPanel) {
                adminPanel.style.display = isAdmin ? 'block' : 'none';
            }
            
            const createFirstStakeBtn = document.getElementById('createFirstStakeBtn');
            if (createFirstStakeBtn) {
                createFirstStakeBtn.style.display = isAdmin ? 'block' : 'none';
            }
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
        
        // Show loading state
        document.querySelectorAll('.data-section').forEach(section => {
            if (section) section.style.display = 'none';
        });
        const loadingIndicator = document.getElementById('loadingIndicator');
        if (loadingIndicator) loadingIndicator.style.display = 'block';
        
        if (document.getElementById('totalUsers')) {
            await loadGlobalStats();
        }
        
        if (document.getElementById('walletAddress')) {
            await loadUserData();
        }
        
        if (document.getElementById('teamDashboard')) {
            await loadTeamData();
        }
        
        // Hide loading and show data
        if (loadingIndicator) loadingIndicator.style.display = 'none';
        document.querySelectorAll('.data-section').forEach(section => {
            if (section) section.style.display = 'block';
        });
        
    } catch (error) {
        console.error("Error loading data:", error);
        const loadingIndicator = document.getElementById('loadingIndicator');
        if (loadingIndicator) loadingIndicator.style.display = 'none';
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
    const stakeBtn = document.getElementById('stakeBtn');
    try {
        showLoading('stakeBtn');
        
        const amount = document.getElementById('stakeAmount').value;
        let referrer = document.getElementById('referrerAddress').value;
        
        // Check URL for referrer
        const urlParams = new URLSearchParams(window.location.search);
        const urlRef = urlParams.get('ref');
        if (!referrer && urlRef && web3.utils.isAddress(urlRef)) {
            referrer = urlRef;
            document.getElementById('referrerAddress').value = referrer;
        }
        
        // Validate amount
        if (!amount || isNaN(amount)) {
            showError("Please enter a valid amount");
            hideLoading('stakeBtn');
            return;
        }
        
        const amountNum = parseFloat(amount);
        const amountWei = web3.utils.toWei(amount, 'ether');
        
        // Use constants from contract
        const minStake = 100 * 1e18; // 100 VNST
        const maxStake = 10000 * 1e18; // 10000 VNST
        
        if (amountWei < minStake || amountWei > maxStake) {
            showError(`Amount must be between ${web3.utils.fromWei(minStake, 'ether')}-${web3.utils.fromWei(maxStake, 'ether')} VNST`);
            hideLoading('stakeBtn');
            return;
        }
        
        // Referrer validation
        if (!referrer || !web3.utils.isAddress(referrer)) {
            try {
                const contractOwner = await vnstStakingContract.methods.owner().call();
                if (contractOwner && contractOwner !== '0x0000000000000000000000000000000000000000') {
                    referrer = contractOwner;
                    document.getElementById('referrerAddress').value = referrer;
                } else {
                    showError("Please enter a valid referrer wallet address");
                    hideLoading('stakeBtn');
                    return;
                }
            } catch (error) {
                console.error("Error getting contract owner:", error);
                showError("Please enter a valid referrer wallet address");
                hideLoading('stakeBtn');
                return;
            }
        }
        
        // Check if contract is paused
        try {
            const isPaused = await vnstStakingContract.methods.paused().call();
            if (isPaused) {
                showError("Staking is currently paused by the contract owner");
                hideLoading('stakeBtn');
                return;
            }
        } catch (error) {
            console.error("Error checking paused status:", error);
            // Continue even if we can't check paused status
        }
        
        // Check allowance
        const allowance = await vnstTokenContract.methods.allowance(
            currentAccount,
            networkConfig[currentNetwork].contractAddress
        ).call();
        
        if (parseInt(allowance) < parseInt(amountWei)) {
            showSuccess("Approving tokens...");
            try {
                await vnstTokenContract.methods.approve(
                    networkConfig[currentNetwork].contractAddress,
                    amountWei
                ).send({ 
                    from: currentAccount,
                    gas: 200000
                });
                
                // Wait for 3 block confirmations (about 15-30 seconds)
                await new Promise(resolve => setTimeout(resolve, 30000));
                showSuccess("Approval confirmed. Now staking...");
            } catch (approveError) {
                console.error("Approval error:", approveError);
                let errorMsg = "Token approval failed";
                
                // Improved error message handling
                if (approveError.message.includes("User denied transaction")) {
                    errorMsg = "Approval cancelled by user";
                } else if (approveError.message.includes("execution reverted")) {
                    const revertReason = approveError.message.split("execution reverted: ")[1] || "Unknown reason";
                    errorMsg = `Approval failed: ${revertReason}`;
                }
                
                showError(errorMsg);
                hideLoading('stakeBtn');
                return;
            }
        }
        
        // Estimate gas for stake transaction
        let gasEstimate;
        try {
            gasEstimate = await vnstStakingContract.methods.stake(
                amountWei,
                referrer
            ).estimateGas({ from: currentAccount });
        } catch (estimateError) {
            console.error("Gas estimation failed:", estimateError);
            let errorMsg = "Transaction will fail";
            
            // Improved error message parsing
            if (estimateError.message.includes("Referrer cannot be zero address")) {
                errorMsg = "Please enter a valid referrer address";
            } else if (estimateError.message.includes("Invalid stake amount")) {
                errorMsg = `Amount must be between ${web3.utils.fromWei(minStake, 'ether')}-${web3.utils.fromWei(maxStake, 'ether')} VNST`;
            } else if (estimateError.message.includes("User is blacklisted")) {
                errorMsg = "Your account is restricted from staking";
            } else if (estimateError.message.includes("Cannot refer yourself")) {
                errorMsg = "You cannot refer yourself";
            } else if (estimateError.message.includes("execution reverted")) {
                const revertReason = estimateError.message.split("execution reverted: ")[1] || "Unknown reason";
                errorMsg = `Transaction will fail: ${revertReason}`;
            }
            
            showError(errorMsg);
            hideLoading('stakeBtn');
            return;
        }
        
        // Execute stake transaction with 20% gas buffer (reduced from 50%)
        try {
            const stakeTx = await vnstStakingContract.methods.stake(
                amountWei,
                referrer
            ).send({ 
                from: currentAccount,
                gas: Math.floor(gasEstimate * 1.2)  // 20% buffer (reduced from 50%)
            });
            
            // Verify transaction success
            const receipt = await web3.eth.getTransactionReceipt(stakeTx.transactionHash);
            if (!receipt.status) {
                throw new Error("Transaction failed");
            }
            
            showSuccess("Tokens staked successfully!");
            document.getElementById('stakeAmount').value = '';
            await loadData();
            
        } catch (stakeError) {
            console.error("Staking error:", stakeError);
            let errorMsg = "Staking failed";
            
            // Improved error message handling
            if (stakeError.message) {
                if (stakeError.message.includes("Referrer cannot be zero address")) {
                    errorMsg = "Please enter a valid referrer address";
                } else if (stakeError.message.includes("Invalid stake amount")) {
                    errorMsg = `Amount must be between ${web3.utils.fromWei(minStake, 'ether')}-${web3.utils.fromWei(maxStake, 'ether')} VNST`;
                } else if (stakeError.message.includes("User is blacklisted")) {
                    errorMsg = "Your account is restricted from staking";
                } else if (stakeError.message.includes("Cannot refer yourself")) {
                    errorMsg = "You cannot refer yourself";
                } else if (stakeError.message.includes("Cannot refer recently created wallets")) {
                    errorMsg = "Referrer wallet is too new";
                } else if (stakeError.message.includes("User denied transaction")) {
                    errorMsg = "Transaction cancelled by user";
                } else if (stakeError.message.includes("execution reverted")) {
                    const revertReason = stakeError.message.split("execution reverted: ")[1] || "Unknown reason";
                    errorMsg = `Transaction failed: ${revertReason}`;
                }
            }
            
            showError(errorMsg);
        }
        
    } catch (error) {
        console.error("General staking error:", error);
        showError("An unexpected error occurred during staking");
    } finally {
        hideLoading('stakeBtn');
    }
}

// Create First Stake (Admin Only)
async function createFirstStake() {
    try {
        showLoading('createFirstStakeBtn');
        
        if (!isAdmin) {
            showError("Only contract owner can create first stake");
            hideLoading('createFirstStakeBtn');
            return;
        }
        
        const stakeAmount = web3.utils.toWei("100", "ether");
        
        // Use owner's own address as referrer
        const ownerAddress = await vnstStakingContract.methods.owner().call();
        const referrer = ownerAddress;

        // Check allowance first
        const allowance = await vnstTokenContract.methods.allowance(
            currentAccount,
            networkConfig[currentNetwork].contractAddress
        ).call();
        
        if (parseInt(allowance) < parseInt(stakeAmount)) {
            await vnstTokenContract.methods.approve(
                networkConfig[currentNetwork].contractAddress,
                stakeAmount
            ).send({ from: currentAccount });
            
            // Wait for 3 block confirmations (about 15-30 seconds)
            await new Promise(resolve => setTimeout(resolve, 30000));
        }
        
        // Now stake with owner as referrer
        await vnstStakingContract.methods.stake(
            stakeAmount,
            referrer
        ).send({ 
            from: currentAccount,
            gas: 300000
        });
        
        showSuccess("First stake created successfully!");
        await loadData();
    } catch (error) {
        console.error("Error creating first stake:", error);
        let errorMsg = "Error creating first stake";
        
        // Improved error message handling
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
        hideLoading('createFirstStakeBtn');
    }
}

// Claim Rewards
async function claimRewards() {
    const claimBtn = document.getElementById('claimTokenBtn') || document.getElementById('claimUsdtBtn');
    try {
        showLoading(claimBtn.id);
        
        const pendingRewards = await vnstStakingContract.methods.getPendingRewards(currentAccount).call();
        const minVNTWithdrawal = 10 * 1e18; // 10 VNT
        
        if (parseInt(pendingRewards.vntReward) < parseInt(minVNTWithdrawal)) {
            showError(`Minimum withdrawal is ${web3.utils.fromWei(minVNTWithdrawal, 'ether')} VNT`);
            hideLoading(claimBtn.id);
            return;
        }
        
        await vnstStakingContract.methods.claimRewards().send({ 
            from: currentAccount,
            gas: 250000
        });
        
        showSuccess("Rewards claimed successfully!");
        await loadData();
        
    } catch (error) {
        console.error("Error claiming rewards:", error);
        let errorMsg = "Claiming rewards failed";
        
        // Improved error message handling
        if (error.message.includes("revert")) {
            if (error.message.includes("Below minimum VNT withdrawal")) {
                errorMsg = `Minimum withdrawal is ${web3.utils.fromWei(10 * 1e18, 'ether')} VNT`;
            } else if (error.message.includes("Can only claim once per day")) {
                errorMsg = "You can only claim rewards once per day";
            } else {
                const revertReason = error.message.match(/reason string: '(.+)'/);
                errorMsg = revertReason ? revertReason[1] : "Transaction reverted";
            }
        } else if (error.message.includes("User denied transaction")) {
            errorMsg = "Transaction cancelled by user";
        } else if (error.message.includes("execution reverted")) {
            const revertReason = error.message.split("execution reverted: ")[1] || "Unknown reason";
            errorMsg = `Transaction failed: ${revertReason}`;
        }
        
        showError(errorMsg);
    } finally {
        hideLoading(claimBtn.id);
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
    // Wallet Connect Buttons
    document.querySelectorAll('.wallet-connect-btn, #connectWalletBtn, #teamConnectWalletBtn').forEach(btn => {
        if (btn) btn.addEventListener('click', connectWallet);
    });
    
    // Stake Button
    const stakeBtn = document.getElementById('stakeBtn');
    if (stakeBtn) stakeBtn.addEventListener('click', stakeTokens);
    
    // Claim Buttons
    const claimTokenBtn = document.getElementById('claimTokenBtn');
    if (claimTokenBtn) claimTokenBtn.addEventListener('click', claimRewards);
    
    const claimUsdtBtn = document.getElementById('claimUsdtBtn');
    if (claimUsdtBtn) claimUsdtBtn.addEventListener('click', claimRewards);
    
    // Referral Buttons
    const copyReferralBtn = document.getElementById('copyReferralBtn');
    if (copyReferralBtn) copyReferralBtn.addEventListener('click', copyReferralLink);
    
    const shareReferralBtn = document.getElementById('shareReferralBtn');
    if (shareReferralBtn) shareReferralBtn.addEventListener('click', shareReferralLink);
    
    // Menu Toggle
    const menuToggle = document.querySelector('.menu-toggle');
    if (menuToggle) menuToggle.addEventListener('click', toggleMenu);
    
    // Create First Stake Button
    const createFirstStakeBtn = document.getElementById('createFirstStakeBtn');
    if (createFirstStakeBtn) createFirstStakeBtn.addEventListener('click', createFirstStake);
    
    // Auto-fill referrer address from URL
    const urlParams = new URLSearchParams(window.location.search);
    const refAddress = urlParams.get('ref');
    const referrerInput = document.getElementById('referralLink');
    if (refAddress && web3.utils.isAddress(refAddress) && referrerInput && !referrerInput.value) {
        referrerInput.value = refAddress;
    }
}

// Initialize App
async function initApp() {
    try {
        // Initialize event listeners first
        initEventListeners();
        
        // Setup animations
        setupCardAnimations();
        
        // Add loading indicator to HTML if not present
        if (!document.getElementById('loadingIndicator')) {
            const loadingDiv = document.createElement('div');
            loadingDiv.id = 'loadingIndicator';
            loadingDiv.style.display = 'none';
            loadingDiv.style.textAlign = 'center';
            loadingDiv.style.padding = '20px';
            loadingDiv.innerHTML = '<div class="loading-spinner"></div> Loading data...';
            document.body.insertBefore(loadingDiv, document.body.firstChild);
        }
        
        if (window.ethereum) {
            web3 = new Web3(window.ethereum);
            
            // Handle disconnect event
            window.ethereum.on('disconnect', () => {
                window.location.reload();
            });
            
            window.ethereum.on('accountsChanged', async (accounts) => {
                if (accounts.length === 0) {
                    window.location.reload();
                } else {
                    currentAccount = accounts[0];
                    updateWalletConnectionUI(currentAccount);
                    await loadData();
                }
            });
            
            window.ethereum.on('chainChanged', () => {
                window.location.reload();
            });
            
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
