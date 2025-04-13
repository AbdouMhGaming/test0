/**
 * War of Ages - Web3 Integration Module
 * Handles blockchain connectivity, NFT assets, and token economy
 */

// Web3 state
const web3State = {
    isConnected: false,
    walletAddress: null,
    tokenBalance: 0,
    nftCollection: {
        units: [],
        commanders: [],
        artifacts: []
    },
    marketplace: {
        listings: []
    },
    network: "ethereum",
    provider: null
};

// Initialize Web3 functionality
function initWeb3() {
    console.log("Initializing Web3 integration...");
    
    // Check if Web3 is available in the browser
    if (typeof window.ethereum !== 'undefined') {
        console.log("Web3 provider detected");
        
        // Set up connection button
        const connectButton = document.getElementById('connect-wallet-button');
        connectButton.addEventListener('click', connectWallet);
        
        // Initialize marketplace
        initializeMarketplace();
    } else {
        console.log("No Web3 provider detected");
        
        // Update UI to show Web3 not available
        document.getElementById('wallet-status').textContent = "Wallet: Web3 not available";
        document.getElementById('connect-wallet-button').disabled = true;
        
        // Create mock data for demo purposes
        createMockData();
    }
}

// Connect to wallet
async function connectWallet() {
    try {
        // Check if we're in a Web3-enabled browser
        if (typeof window.ethereum !== 'undefined') {
            console.log("Connecting to wallet...");
            
            // Request account access
            const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
            
            if (accounts.length > 0) {
                web3State.isConnected = true;
                web3State.walletAddress = accounts[0];
                
                // Update UI
                document.getElementById('wallet-status').textContent = `Wallet: ${shortenAddress(web3State.walletAddress)}`;
                document.getElementById('connect-wallet-button').textContent = "Wallet Connected";
                
                // Get token balance
                await getTokenBalance();
                
                // Get NFT collection
                await getNFTCollection();
                
                console.log("Wallet connected:", web3State.walletAddress);
            }
        } else {
            // For demo purposes, simulate connection
            simulateWalletConnection();
        }
    } catch (error) {
        console.error("Error connecting to wallet:", error);
        
        // For demo purposes, simulate connection even on error
        simulateWalletConnection();
    }
}

// Simulate wallet connection for demo purposes
function simulateWalletConnection() {
    web3State.isConnected = true;
    web3State.walletAddress = "0x742d35Cc6634C0532925a3b844Bc454e4438f44e";
    
    // Update UI
    document.getElementById('wallet-status').textContent = `Wallet: ${shortenAddress(web3State.walletAddress)}`;
    document.getElementById('connect-wallet-button').textContent = "Wallet Connected";
    
    // Set mock token balance
    web3State.tokenBalance = 1250;
    document.getElementById('token-balance').textContent = `WOA Tokens: ${web3State.tokenBalance}`;
    
    // Create mock NFT collection
    createMockNFTCollection();
    
    // Update collection UI
    updateCollectionUI();
    
    // Update marketplace UI
    updateMarketplaceUI();
    
    console.log("Simulated wallet connection for demo");
}

// Get token balance
async function getTokenBalance() {
    try {
        // In a real implementation, this would call a smart contract
        // For demo purposes, we'll use a mock balance
        web3State.tokenBalance = 1250;
        document.getElementById('token-balance').textContent = `WOA Tokens: ${web3State.tokenBalance}`;
        
        console.log("Token balance:", web3State.tokenBalance);
    } catch (error) {
        console.error("Error getting token balance:", error);
    }
}

// Get NFT collection
async function getNFTCollection() {
    try {
        // In a real implementation, this would call a smart contract
        // For demo purposes, we'll use mock data
        createMockNFTCollection();
        
        // Update collection UI
        updateCollectionUI();
        
        console.log("NFT collection loaded");
    } catch (error) {
        console.error("Error getting NFT collection:", error);
    }
}

// Create mock NFT collection for demo
function createMockNFTCollection() {
    // Mock units
    web3State.nftCollection.units = [
        {
            id: "unit-001",
            name: "Elite Spearman",
            era: "ancient",
            rarity: "rare",
            level: 3,
            attack: 15,
            defense: 8,
            image: "assets/images/units/ancient/spearman.png",
            tokenId: "1001"
        },
        {
            id: "unit-002",
            name: "Master Archer",
            era: "ancient",
            rarity: "epic",
            level: 5,
            attack: 20,
            defense: 5,
            image: "assets/images/units/ancient/archer.png",
            tokenId: "1002"
        },
        {
            id: "unit-003",
            name: "Royal Knight",
            era: "medieval",
            rarity: "rare",
            level: 4,
            attack: 25,
            defense: 18,
            image: "assets/images/units/medieval/knight.png",
            tokenId: "1003"
        }
    ];
    
    // Mock commanders
    web3State.nftCollection.commanders = [
        {
            id: "commander-001",
            name: "General Marcus",
            era: "ancient",
            rarity: "legendary",
            level: 7,
            leadership: 10,
            specialAbility: "Inspire",
            image: "assets/images/commanders/ancient/general.png",
            tokenId: "2001"
        },
        {
            id: "commander-002",
            name: "Duke William",
            era: "medieval",
            rarity: "epic",
            level: 5,
            leadership: 8,
            specialAbility: "Rally",
            image: "assets/images/commanders/medieval/duke.png",
            tokenId: "2002"
        }
    ];
    
    // Mock artifacts
    web3State.nftCollection.artifacts = [
        {
            id: "artifact-001",
            name: "Ancient Shield of Protection",
            era: "ancient",
            rarity: "epic",
            effect: "Increases unit defense by 20%",
            image: "assets/images/artifacts/ancient/shield.png",
            tokenId: "3001"
        },
        {
            id: "artifact-002",
            name: "Sword of the Conqueror",
            era: "medieval",
            rarity: "legendary",
            effect: "Increases unit attack by 25%",
            image: "assets/images/artifacts/medieval/sword.png",
            tokenId: "3002"
        }
    ];
}

// Initialize marketplace
function initializeMarketplace() {
    // In a real implementation, this would fetch listings from a smart contract
    // For demo purposes, we'll use mock data
    createMockMarketplaceListings();
}

// Create mock marketplace listings
function createMockMarketplaceListings() {
    web3State.marketplace.listings = [
        {
            id: "listing-001",
            itemType: "unit",
            name: "Legendary Catapult",
            era: "ancient",
            rarity: "legendary",
            price: 500,
            seller: "0x123...789",
            image: "assets/images/units/ancient/catapult.png",
            tokenId: "1004"
        },
        {
            id: "listing-002",
            itemType: "commander",
            name: "Admiral Nelson",
            era: "industrial",
            rarity: "epic",
            price: 750,
            seller: "0x456...abc",
            image: "assets/images/commanders/industrial/admiral.png",
            tokenId: "2003"
        },
        {
            id: "listing-003",
            itemType: "artifact",
            name: "Future Tech Enhancer",
            era: "future",
            rarity: "legendary",
            price: 1200,
            seller: "0x789...def",
            image: "assets/images/artifacts/future/enhancer.png",
            tokenId: "3003"
        },
        {
            id: "listing-004",
            itemType: "unit",
            name: "Elite Tank",
            era: "modern",
            rarity: "rare",
            price: 350,
            seller: "0xabc...123",
            image: "assets/images/units/modern/tank.png",
            tokenId: "1005"
        },
        {
            id: "listing-005",
            itemType: "artifact",
            name: "Medieval Banner of Courage",
            era: "medieval",
            rarity: "epic",
            price: 600,
            seller: "0xdef...456",
            image: "assets/images/artifacts/medieval/banner.png",
            tokenId: "3004"
        }
    ];
}

// Update collection UI
function updateCollectionUI() {
    if (!web3State.isConnected) {
        return;
    }
    
    // Update units collection
    const unitsCollection = document.getElementById('units-collection');
    unitsCollection.innerHTML = '';
    
    if (web3State.nftCollection.units.length === 0) {
        unitsCollection.innerHTML = '<p class="empty-collection">You don\'t have any unit NFTs yet.</p>';
    } else {
        web3State.nftCollection.units.forEach(unit => {
            const unitCard = document.createElement('div');
            unitCard.className = 'nft-card';
            unitCard.dataset.rarity = unit.rarity;
            
            unitCard.innerHTML = `
                <div class="nft-image">
                    <img src="${unit.image}" alt="${unit.name}" onerror="this.src='assets/images/units/placeholder.png'">
                </div>
                <div class="nft-info">
                    <h3>${unit.name}</h3>
                    <p class="nft-era">${capitalizeFirstLetter(unit.era)} Era</p>
                    <p class="nft-rarity ${unit.rarity}">${capitalizeFirstLetter(unit.rarity)}</p>
                    <div class="nft-stats">
                        <span>Level: ${unit.level}</span>
                        <span>ATK: ${unit.attack}</span>
                        <span>DEF: ${unit.defense}</span>
                    </div>
                    <button class="use-nft-button" data-id="${unit.id}" data-type="unit">Use in Battle</button>
                </div>
            `;
            
            unitsCollection.appendChild(unitCard);
        });
    }
    
    // Update commanders collection
    const commandersCollection = document.getElementById('commanders-collection');
    commandersCollection.innerHTML = '';
    
    if (web3State.nftCollection.commanders.length === 0) {
        commandersCollection.innerHTML = '<p class="empty-collection">You don\'t have any commander NFTs yet.</p>';
    } else {
        web3State.nftCollection.commanders.forEach(commander => {
            const commanderCard = document.createElement('div');
            commanderCard.className = 'nft-card';
            commanderCard.dataset.rarity = commander.rarity;
            
            commanderCard.innerHTML = `
                <div class="nft-image">
                    <img src="${commander.image}" alt="${commander.name}" onerror="this.src='assets/images/commanders/placeholder.png'">
                </div>
                <div class="nft-info">
                    <h3>${commander.name}</h3>
                    <p class="nft-era">${capitalizeFirstLetter(commander.era)} Era</p>
                    <p class="nft-rarity ${commander.rarity}">${capitalizeFirstLetter(commander.rarity)}</p>
                    <div class="nft-stats">
                        <span>Level: ${commander.level}</span>
                        <span>Leadership: ${commander.leadership}</span>
                        <span>Ability: ${commander.specialAbility}</span>
                    </div>
                    <button class="use-nft-button" data-id="${commander.id}" data-type="commander">Assign as Commander</button>
                </div>
            `;
            
            commandersCollection.appendChild(commanderCard);
        });
    }
    
    // Update artifacts collection
    const artifactsCollection = document.getElementById('artifacts-collection');
    artifactsCollection.innerHTML = '';
    
    if (web3State.nftCollection.artifacts.length === 0) {
        artifactsCollection.innerHTML = '<p class="empty-collection">You don\'t have any artifact NFTs yet.</p>';
    } else {
        web3State.nftCollection.artifacts.forEach(artifact => {
            const artifactCard = document.createElement('div');
            artifactCard.className = 'nft-card';
            artifactCard.dataset.rarity = artifact.rarity;
            
            artifactCard.innerHTML = `
                <div class="nft-image">
                    <img src="${artifact.image}" alt="${artifact.name}" onerror="this.src='assets/images/artifacts/placeholder.png'">
                </div>
                <div class="nft-info">
                    <h3>${artifact.name}</h3>
                    <p class="nft-era">${capitalizeFirstLetter(artifact.era)} Era</p>
                    <p class="nft-rarity ${artifact.rarity}">${capitalizeFirstLetter(artifact.rarity)}</p>
                    <div class="nft-stats">
                        <span>Effect: ${artifact.effect}</span>
                    </div>
                    <button class="use-nft-button" data-id="${artifact.id}" data-type="artifact">Equip Artifact</button>
                </div>
            `;
            
            artifactsCollection.appendChild(artifactCard);
        });
    }
    
    // Add event listeners to buttons
    const useButtons = document.querySelectorAll('.use-nft-button');
    useButtons.forEach(button => {
        button.addEventListener('click', handleUseNFT);
    });
}

// Update marketplace UI
function updateMarketplaceUI() {
    const marketplaceItems = document.querySelector('.marketplace-items');
    
    if (!web3State.isConnected) {
        marketplaceItems.innerHTML = '<p class="connect-prompt">Connect your wallet to browse the marketplace.</p>';
        return;
    }
    
    marketplaceItems.innerHTML = '';
    
    if (web3State.marketplace.listings.length === 0) {
        marketplaceItems.innerHTML = '<p class="empty-collection">No items are currently listed in the marketplace.</p>';
    } else {
        web3State.marketplace.listings.forEach(listing => {
            const listingCard = document.createElement('div');
            listingCard.className = 'nft-card marketplace-card';
            listingCard.dataset.rarity = listing.rarity;
            listingCard.dataset.era = listing.era;
            listingCard.dataset.type = listing.itemType;
            
            listingCard.innerHTML = `
                <div class="nft-image">
                    <img src="${listing.image}" alt="${listing.name}" onerror="this.src='assets/images/${listing.itemType}s/placeholder.png'">
                </div>
                <div class="nft-info">
                    <h3>${listing.name}</h3>
                    <p class="nft-era">${capitalizeFirstLetter(listing.era)} Era</p>
                    <p class="nft-rarity ${listing.rarity}">${capitalizeFirstLetter(listing.rarity)}</p>
                    <p class="nft-price">${listing.price} WOA Tokens</p>
                    <p class="nft-seller">Seller: ${shortenAddress(listing.seller)}</p>
                    <button class="buy-nft-button" data-id="${listing.id}">Buy Now</button>
                </div>
            `;
            
            marketplaceItems.appendChild(listingCard);
        });
    }
    
    // Add event listeners to buy buttons
    const buyButtons = document.querySelectorAll('.buy-nft-button');
    buyButtons.forEach(button => {
        button.addEventListener('click', handleBuyNFT);
    });
    
    // Add event listeners to marketplace filters
    document.getElementById('marketplace-category').addEventListener('change', filterMarketplace);
    document.getElementById('marketplace-era').addEventListener('change', filterMarketplace);
    document.getElementById('marketplace-sort').addEventListener('change', sortMarketplace);
}

// Handle using an NFT
function handleUseNFT(event) {
    const nftId = event.target.dataset.id;
    const nftType = event.target.dataset.type;
    
    console.log(`Using ${nftType} with ID: ${nftId}`);
    
    // In a real implementation, this would apply the NFT to the game
    // For demo purposes, just show an alert
    alert(`${nftType.charAt(0).toUpperCase() + nftType.slice(1)} NFT selected for use in battle!`);
}

// Handle buying an NFT
function handleBuyNFT(event) {
    const listingId = event.target.dataset.id;
    const listing = web3State.marketplace.listings.find(item => item.id === listingId);
    
    if (!listing) {
        console.error("Listing not found");
        return;
    }
    
    console.log(`Buying item: ${listing.name} for ${listing.price} WOA Tokens`);
    
    // Check if user has enough tokens
    if (web3State.tokenBalance < listing.price) {
        alert("Insufficient WOA Tokens to complete this purchase.");
        return;
    }
    
    // In a real implementation, this would call a smart contract
    // For demo purposes, simulate the purchase
    web3State.tokenBalance -= listing.price;
    document.getElementById('token-balance').textContent = `WOA Tokens: ${web3State.tokenBalance}`;
    
    // Add the item to the user's collection
    if (listing.itemType === 'unit') {
        web3State.nftCollection.units.push({
            id: listing.id.replace('listing', 'unit'),
            name: listing.name,
            era: listing.era,
            rarity: listing.rarity,
            level: 1,
            attack: 10,
            defense: 5,
            image: listing.image,
            tokenId: listing.tokenId
        });
    } else if (listing.itemType === 'commander') {
        web3State.nftCollection.commanders.push({
            id: listing.id.replace('listing', 'commander'),
            name: listing.name,
            era: listing.era,
            rarity: listing.rarity,
            level: 1,
            leadership: 5,
            specialAbility: "Command",
            image: listing.image,
            tokenId: listing.tokenId
        });
    } else if (listing.itemType === 'artifact') {
        web3State.nftCollection.artifacts.push({
            id: listing.id.replace('listing', 'artifact'),
            name: listing.name,
            era: listing.era,
            rarity: listing.rarity,
            effect: "Increases stats by 10%",
            image: listing.image,
            tokenId: listing.tokenId
        });
    }
    
    // Remove the listing from the marketplace
    web3State.marketplace.listings = web3State.marketplace.listings.filter(item => item.id !== listingId);
    
    // Update UIs
    updateCollectionUI();
    updateMarketplaceUI();
    
    alert(`Successfully purchased ${listing.name}!`);
}

// Filter marketplace items
function filterMarketplace() {
    const categoryFilter = document.getElementById('marketplace-category').value;
    const eraFilter = document.getElementById('marketplace-era').value;
    
    const marketplaceCards = document.querySelectorAll('.marketplace-card');
    
    marketplaceCards.forEach(card => {
        let showCard = true;
        
        // Apply category filter
        if (categoryFilter !== 'all' && card.dataset.type !== categoryFilter) {
            showCard = false;
        }
        
        // Apply era filter
        if (eraFilter !== 'all' && card.dataset.era !== eraFilter) {
            showCard = false;
        }
        
        // Show or hide the card
        card.style.display = showCard ? 'block' : 'none';
    });
}

// Sort marketplace items
function sortMarketplace() {
    const sortOption = document.getElementById('marketplace-sort').value;
    const marketplaceItems = document.querySelector('.marketplace-items');
    const cards = Array.from(marketplaceItems.querySelectorAll('.marketplace-card'));
    
    // Sort the cards based on the selected option
    cards.sort((a, b) => {
        if (sortOption === 'price-asc') {
            const priceA = parseInt(a.querySelector('.nft-price').textContent);
            const priceB = parseInt(b.querySelector('.nft-price').textContent);
            return priceA - priceB;
        } else if (sortOption === 'price-desc') {
            const priceA = parseInt(a.querySelector('.nft-price').textContent);
            const priceB = parseInt(b.querySelector('.nft-price').textContent);
            return priceB - priceA;
        } else if (sortOption === 'rarity') {
            const rarityOrder = { common: 0, uncommon: 1, rare: 2, epic: 3, legendary: 4 };
            const rarityA = rarityOrder[a.dataset.rarity] || 0;
            const rarityB = rarityOrder[b.dataset.rarity] || 0;
            return rarityB - rarityA;
        } else if (sortOption === 'newest') {
            // In a real implementation, this would use actual timestamps
            // For demo purposes, we'll use the listing ID as a proxy for time
            const idA = a.querySelector('.buy-nft-button').dataset.id;
            const idB = b.querySelector('.buy-nft-button').dataset.id;
            return idB.localeCompare(idA);
        }
        return 0;
    });
    
    // Re-append the cards in the sorted order
    cards.forEach(card => marketplaceItems.appendChild(card));
}

// Helper function to shorten wallet addresses
function shortenAddress(address) {
    if (!address) return '';
    return address.substring(0, 6) + '...' + address.substring(address.length - 4);
}

// Helper function to capitalize first letter
function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

// Create mock data for demo purposes
function createMockData() {
    // This function creates mock data when no Web3 provider is available
    // It's already covered by the other mock data functions
}

// Initialize Web3 when the window loads
window.addEventListener('load', initWeb3);