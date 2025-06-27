function toggleMenu() {
  const navLinks = document.getElementById('nav-links');
  navLinks.classList.toggle('show');
  
  document.querySelectorAll('#nav-links a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('show');
    });
  });
}

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

// Wallet connection functionality
function setupWalletConnection() {
  const connectWalletBtns = document.querySelectorAll('#connectWalletBtn, #teamConnectWalletBtn');
  
  connectWalletBtns.forEach(btn => {
    if (btn) {
      btn.addEventListener('click', function() {
        // In a real app, this would connect to MetaMask or other wallet
        console.log('Wallet connection requested');
        
        // Show wallet modal
        const walletModal = document.createElement('div');
        walletModal.className = 'wallet-modal';
        walletModal.innerHTML = `
          <h3>Connect Wallet</h3>
          <p>Choose your wallet provider</p>
          <div class="wallet-buttons">
            <button id="metamaskBtn">
              <img src="https://upload.wikimedia.org/wikipedia/commons/3/36/MetaMask_Fox.svg" alt="MetaMask">
              MetaMask
            </button>
            <button id="walletConnectBtn">
              <img src="https://registry.walletconnect.com/api/v1/logo/md/065e5d43-4fe9-4e17-9a8e-e5a0b2b2a2a0" alt="WalletConnect">
              WalletConnect
            </button>
          </div>
          <div class="or-text">OR</div>
          <button id="copyLinkBtn" class="copy-link">Copy Referral Link</button>
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
          alert('MetaMask connection would happen here in a real app');
          document.body.removeChild(walletModal);
        });
        
        document.getElementById('walletConnectBtn')?.addEventListener('click', function() {
          alert('WalletConnect connection would happen here in a real app');
          document.body.removeChild(walletModal);
        });
        
        document.getElementById('copyLinkBtn')?.addEventListener('click', function() {
          navigator.clipboard.writeText(window.location.href);
          alert('Referral link copied to clipboard!');
        });
      });
    }
  });
}

document.addEventListener('DOMContentLoaded', function() {
  toggleMenu();
  setupCardAnimations();
  setupScrollIndicator();
  setupWalletConnection();
  
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
});

// Add bounce animation to CSS
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
`;
document.head.appendChild(style);
