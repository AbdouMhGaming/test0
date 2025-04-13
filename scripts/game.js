/**
 * War of Ages - UI Module
 * Handles UI interactions, screen transitions, and user interface elements
 */

// Track active screen and tabs
let activeScreen = 'main-menu';
let activeCollectionTab = 'units';

// Initialize UI event listeners
function initUIListeners() {
    console.log("Initializing UI event listeners...");
    
    // Main menu buttons
    document.getElementById('play-button').addEventListener('click', () => showScreen('era-selection'));
    document.getElementById('collection-button').addEventListener('click', () => showScreen('collection-screen'));
    document.getElementById('marketplace-button').addEventListener('click', () => showScreen('marketplace-screen'));
    document.getElementById('settings-button').addEventListener('click', () => showScreen('settings-screen'));
    
    // Back buttons
    document.getElementById('back-to-menu').addEventListener('click', () => showScreen('main-menu'));
    document.getElementById('back-from-collection').addEventListener('click', () => showScreen('main-menu'));
    document.getElementById('back-from-marketplace').addEventListener('click', () => showScreen('main-menu'));
    document.getElementById('back-from-settings').addEventListener('click', () => showScreen('main-menu'));
    document.getElementById('back-from-history').addEventListener('click', () => showScreen('main-menu'));
    
    // Era selection
    const eraElements = document.querySelectorAll('.era');
    eraElements.forEach(era => {
        era.addEventListener('click', () => {
            const selectedEra = era.dataset.era;
            showScreen('game-screen');
            startGame(selectedEra);
        });
    });
    
    // End game button
    document.getElementById('end-game').addEventListener('click', () => {
        if (confirm("Are you sure you want to surrender?")) {
            endGame(false);
        }
    });
    
    // Collection tabs
    const tabButtons = document.querySelectorAll('.tab-button');
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const tabName = button.dataset.tab;
            switchCollectionTab(tabName);
        });
    });
    
    // Settings controls
    document.getElementById('music-volume').addEventListener('input', updateSettings);
    document.getElementById('sfx-volume').addEventListener('input', updateSettings);
    document.getElementById('graphics-quality').addEventListener('change', updateSettings);
    document.getElementById('particle-effects').addEventListener('change', updateSettings);
    document.getElementById('game-speed').addEventListener('change', updateSettings);
    document.getElementById('auto-save').addEventListener('change', updateSettings);
    
    // Match found modal
    document.getElementById('accept-match').addEventListener('click', acceptMatch);
    document.getElementById('decline-match').addEventListener('click', declineMatch);
    
    // Canvas event listeners (will be set up when game starts)
    setupCanvasListeners();
    
    console.log("UI event listeners initialized");
}

// Show a specific screen
function showScreen(screenId) {
    // Hide all screens
    const screens = document.querySelectorAll('.screen');
    screens.forEach(screen => {
        screen.classList.remove('active');
    });
    
    // Show the requested screen
    document.getElementById(screenId).classList.add('active');
    
    // Update active screen tracker
    activeScreen = screenId;
    
    console.log(`Showing screen: ${screenId}`);
    
    // Perform any screen-specific initialization
    if (screenId === 'match-history-screen') {
        updateMatchHistoryTable();
    }
}

// Switch collection tab
function switchCollectionTab(tabName) {
    // Update tab buttons
    const tabButtons = document.querySelectorAll('.tab-button');
    tabButtons.forEach(button => {
        if (button.dataset.tab === tabName) {
            button.classList.add('active');
        } else {
            button.classList.remove('active');
        }
    });
    
    // Update tab content
    const tabContents = document.querySelectorAll('.collection-tab');
    tabContents.forEach(content => {
        if (content.id === `${tabName}-collection`) {
            content.classList.add('active');
        } else {
            content.classList.remove('active');
        }
    });
    
    // Update active tab tracker
    activeCollectionTab = tabName;
}

// Update settings
function updateSettings() {
    // Get settings values
    const musicVolume = document.getElementById('music-volume').value;
    const sfxVolume = document.getElementById('sfx-volume').value;
    const graphicsQuality = document.getElementById('graphics-quality').value;
    const particleEffects = document.getElementById('particle-effects').checked;
    const gameSpeed = document.getElementById('game-speed').value;
    const autoSave = document.getElementById('auto-save').checked;
    
    // Update game state settings
    gameState.settings = {
        musicVolume: parseInt(musicVolume),
        sfxVolume: parseInt(sfxVolume),
        graphicsQuality: graphicsQuality,
        particleEffects: particleEffects,
        gameSpeed: gameSpeed,
        autoSave: autoSave
    };
    
    // Apply settings
    applySettings();
    
    // Save settings
    saveGameData();
    
    console.log("Settings updated:", gameState.settings);
}

// Show match found modal
function showMatchFoundModal() {
    const modal = document.getElementById('match-found-modal');
    modal.style.display = 'flex';
    
    // Start countdown
    let countdown = 15;
    const countdownElement = modal.querySelector('.countdown');
    countdownElement.textContent = countdown;
    
    const countdownInterval = setInterval(() => {
        countdown--;
        countdownElement.textContent = countdown;
        
        if (countdown <= 0) {
            clearInterval(countdownInterval);
            declineMatch();
        }
    }, 1000);
    
    // Store interval ID to clear it if user responds
    modal.dataset.countdownInterval = countdownInterval;
}

// Accept match
function acceptMatch() {
    const modal = document.getElementById('match-found-modal');
    
    // Clear countdown interval
    clearInterval(parseInt(modal.dataset.countdownInterval));
    
    // Hide modal
    modal.style.display = 'none';
    
    // Start the game with the opponent's era
    const opponentEra = document.querySelector('.player-era:not(.you)').textContent.toLowerCase().split(' ')[0];
    showScreen('game-screen');
    startGame(opponentEra);
    
    console.log("Match accepted");
}

// Decline match
function declineMatch() {
    const modal = document.getElementById('match-found-modal');
    
    // Clear countdown interval
    clearInterval(parseInt(modal.dataset.countdownInterval));
    
    // Hide modal
    modal.style.display = 'none';
    
    console.log("Match declined");
}

// Find match
function findMatch() {
    // Show loading indicator
    const playButton = document.getElementById('play-button');
    playButton.textContent = "Finding Match...";
    playButton.disabled = true;
    
    // Simulate matchmaking delay
    setTimeout(() => {
        // Reset button
        playButton.textContent = "Play Game";
        playButton.disabled = false;
        
        // Show match found modal
        showMatchFoundModal();
    }, 3000);
    
    console.log("Finding match...");
}

// Show notification
function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    // Add to document
    document.body.appendChild(notification);
    
    // Remove after delay
    setTimeout(() => {
        notification.classList.add('fade-out');
        setTimeout(() => {
            notification.remove();
        }, 500);
    }, 3000);
}

// Show tooltip
function showTooltip(element, content) {
    // Create tooltip element
    const tooltip = document.createElement('div');
    tooltip.className = 'tooltip';
    tooltip.textContent = content;
    
    // Position tooltip
    const rect = element.getBoundingClientRect();
    tooltip.style.left = `${rect.left + rect.width / 2}px`;
    tooltip.style.top = `${rect.top - 10}px`;
    
    // Add to document
    document.body.appendChild(tooltip);
    
    // Remove on mouse leave
    element.addEventListener('mouseleave', () => {
        tooltip.remove();
    });
}

// Show confirmation dialog
function showConfirmation(message, onConfirm, onCancel) {
    // Create confirmation dialog
    const dialog = document.createElement('div');
    dialog.className = 'confirmation-dialog';
    
    dialog.innerHTML = `
        <div class="confirmation-content">
            <p>${message}</p>
            <div class="confirmation-buttons">
                <button class="confirm-button">Confirm</button>
                <button class="cancel-button">Cancel</button>
            </div>
        </div>
    `;
    
    // Add to document
    document.body.appendChild(dialog);
    
    // Add event listeners
    dialog.querySelector('.confirm-button').addEventListener('click', () => {
        if (onConfirm) onConfirm();
        dialog.remove();
    });
    
    dialog.querySelector('.cancel-button').addEventListener('click', () => {
        if (onCancel) onCancel();
        dialog.remove();
    });
}

// Show loading indicator
function showLoading(message = 'Loading...') {
    // Create loading indicator
    const loading = document.createElement('div');
    loading.className = 'loading-indicator';
    loading.innerHTML = `
        <div class="loading-spinner"></div>
        <p>${message}</p>
    `;
    
    // Add to document
    document.body.appendChild(loading);
    
    // Return function to hide loading indicator
    return () => {
        loading.remove();
    };
}

// Format number with commas
function formatNumber(number) {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

// Format time (seconds to MM:SS)
function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
}

// Get rarity color
function getRarityColor(rarity) {
    switch (rarity.toLowerCase()) {
        case 'common':
            return '#aaaaaa';
        case 'uncommon':
            return '#1eb53a';
        case 'rare':
            return '#0070dd';
        case 'epic':
            return '#a335ee';
        case 'legendary':
            return '#ff8000';
        default:
            return '#ffffff';
    }
}

// Add CSS styles for UI components that are created dynamically
function addDynamicStyles() {
    const styleElement = document.createElement('style');
    styleElement.textContent = `
        /* Notification */
        .notification {
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 15px 20px;
            border-radius: 5px;
            color: white;
            z-index: 1000;
            animation: slide-in 0.3s ease-out;
        }
        
        .notification.info {
            background-color: #4cc9f0;
        }
        
        .notification.success {
            background-color: #38b000;
        }
        
        .notification.warning {
            background-color: #ffaa00;
        }
        
        .notification.error {
            background-color: #d00000;
        }
        
        .notification.fade-out {
            animation: fade-out 0.5s ease-out;
        }
        
        @keyframes slide-in {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
        
        @keyframes fade-out {
            from { opacity: 1; }
            to { opacity: 0; }
        }
        
        /* Tooltip */
        .tooltip {
            position: absolute;
            background-color: rgba(0, 0, 0, 0.8);
            color: white;
            padding: 8px 12px;
            border-radius: 4px;
            font-size: 0.9rem;
            z-index: 1000;
            transform: translate(-50%, -100%);
            pointer-events: none;
        }
        
        .tooltip::after {
            content: '';
            position: absolute;
            top: 100%;
            left: 50%;
            margin-left: -5px;
            border-width: 5px;
            border-style: solid;
            border-color: rgba(0, 0, 0, 0.8) transparent transparent transparent;
        }
        
        /* Confirmation Dialog */
        .confirmation-dialog {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.7);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 1000;
        }
        
        .confirmation-content {
            background-color: #1a1a2e;
            border: 2px solid #4cc9f0;
            border-radius: 5px;
            padding: 20px;
            max-width: 400px;
            text-align: center;
        }
        
        .confirmation-buttons {
            display: flex;
            justify-content: center;
            gap: 15px;
            margin-top: 20px;
        }
        
        .confirm-button, .cancel-button {
            padding: 8px 20px;
            border: none;
            border-radius: 4px;
            cursor: pointer;
        }
        
        .confirm-button {
            background-color: #38b000;
            color: white;
        }
        
        .cancel-button {
            background-color: #d00000;
            color: white;
        }
        
        /* Loading Indicator */
        .loading-indicator {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.7);
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            z-index: 1000;
        }
        
        .loading-spinner {
            width: 50px;
            height: 50px;
            border: 5px solid rgba(255, 255, 255, 0.3);
            border-radius: 50%;
            border-top-color: #4cc9f0;
            animation: spin 1s ease-in-out infinite;
            margin-bottom: 15px;
        }
        
        @keyframes spin {
            to { transform: rotate(360deg); }
        }
        
        /* NFT Cards */
        .nft-card {
            background-color: rgba(0, 0, 0, 0.7);
            border: 2px solid #4cc9f0;
            border-radius: 8px;
            overflow: hidden;
            width: 200px;
            margin-bottom: 20px;
        }
        
        .nft-card[data-rarity="common"] {
            border-color: #aaaaaa;
        }
        
        .nft-card[data-rarity="uncommon"] {
            border-color: #1eb53a;
        }
        
        .nft-card[data-rarity="rare"] {
            border-color: #0070dd;
        }
        
        .nft-card[data-rarity="epic"] {
            border-color: #a335ee;
        }
        
        .nft-card[data-rarity="legendary"] {
            border-color: #ff8000;
            box-shadow: 0 0 10px #ff8000;
        }
        
        .nft-image {
            height: 150px;
            background-color: #0f0f1e;
            display: flex;
            justify-content: center;
            align-items: center;
        }
        
        .nft-image img {
            max-width: 100%;
            max-height: 100%;
        }
        
        .nft-info {
            padding: 15px;
        }
        
        .nft-info h3 {
            margin: 0 0 5px 0;
            font-size: 1.1rem;
        }
        
        .nft-era {
            color: #aaa;
            font-size: 0.8rem;
            margin: 0 0 5px 0;
        }
        
        .nft-rarity {
            display: inline-block;
            padding: 3px 8px;
            border-radius: 10px;
            font-size: 0.8rem;
            margin-bottom: 10px;
        }
        
        .nft-rarity.common {
            background-color: rgba(170, 170, 170, 0.3);
            color: #aaaaaa;
        }
        
        .nft-rarity.uncommon {
            background-color: rgba(30, 181, 58, 0.3);
            color: #1eb53a;
        }
        
        .nft-rarity.rare {
            background-color: rgba(0, 112, 221, 0.3);
            color: #0070dd;
        }
        
        .nft-rarity.epic {
            background-color: rgba(163, 53, 238, 0.3);
            color: #a335ee;
        }
        
        .nft-rarity.legendary {
            background-color: rgba(255, 128, 0, 0.3);
            color: #ff8000;
        }
        
        .nft-stats {
            display: flex;
            flex-direction: column;
            gap: 5px;
            margin-bottom: 10px;
            font-size: 0.9rem;
        }
        
        .nft-price {
            font-weight: bold;
            color: #4cc9f0;
            margin: 5px 0;
        }
        
        .nft-seller {
            font-size: 0.8rem;
            color: #aaa;
            margin-bottom: 10px;
        }
        
        .use-nft-button, .buy-nft-button {
            width: 100%;
            padding: 8px 0;
            background-color: #3a0ca3;
            color: white;
            border: none;
            border-radius: 4px;
            cursor: pointer;
            transition: background-color 0.2s;
        }
        
        .use-nft-button:hover, .buy-nft-button:hover {
            background-color: #4cc9f0;
        }
    `;
    
    document.head.appendChild(styleElement);
}

// Add dynamic styles when the window loads
window.addEventListener('load', addDynamicStyles);