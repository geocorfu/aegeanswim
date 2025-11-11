// AegeanSwim - Main Application Logic

// Island display names mapping
const ISLAND_DISPLAY_NAMES = {
    cyclades: [
        { id: 'mykonos', name: '🎉 Mykonos', group: '🏝️ Popular Cyclades' },
        { id: 'santorini', name: '🌋 Santorini', group: '🏝️ Popular Cyclades' },
        { id: 'paros', name: '⛵ Paros', group: '🏝️ Popular Cyclades' },
        { id: 'naxos', name: '🏖️ Naxos', group: '🏝️ Popular Cyclades' },
        { id: 'ios', name: '🌅 Ios', group: '🏝️ Popular Cyclades' },
        { id: 'milos', name: '💎 Milos', group: '🏝️ Popular Cyclades' },
        { id: 'syros', name: '🎭 Syros', group: '🌊 Central Cyclades' },
        { id: 'tinos', name: '⛪ Tinos', group: '🌊 Central Cyclades' },
        { id: 'andros', name: '🥾 Andros', group: '🌊 Central Cyclades' },
        { id: 'kea', name: '🦁 Kea (Tzia)', group: '🌊 Central Cyclades' },
        { id: 'kythnos', name: '♨️ Kythnos', group: '🌊 Central Cyclades' },
        { id: 'amorgos', name: '⛰️ Amorgos', group: '🏖️ Small Cyclades' },
        { id: 'folegandros', name: '🏔️ Folegandros', group: '🏖️ Small Cyclades' },
        { id: 'serifos', name: '⛏️ Serifos', group: '🏖️ Small Cyclades' },
        { id: 'sifnos', name: '👨‍🍳 Sifnos', group: '🏖️ Small Cyclades' },
        { id: 'sikinos', name: '🌾 Sikinos', group: '🏖️ Small Cyclades' },
        { id: 'antiparos', name: '🕳️ Antiparos', group: '🏖️ Small Cyclades' },
        { id: 'koufonisia', name: '🐠 Koufonisia', group: '🏖️ Small Cyclades' },
        { id: 'kimolos', name: '🧂 Kimolos', group: '🏖️ Small Cyclades' }
    ],
    dodecanese: [
        { id: 'rhodes', name: '⚔️ Rhodes', group: '⚓ Dodecanese' },
        { id: 'kos', name: '🌿 Kos', group: '⚓ Dodecanese' },
        { id: 'patmos', name: '✝️ Patmos', group: '⚓ Dodecanese' },
        { id: 'leros', name: '🏥 Leros', group: '⚓ Dodecanese' },
        { id: 'kalymnos', name: '🧽 Kalymnos', group: '⚓ Dodecanese' }
    ],
    northAegean: [
        { id: 'lesbos', name: '🫒 Lesbos', group: '🌲 North Aegean' },
        { id: 'chios', name: '🌰 Chios', group: '🌲 North Aegean' },
        { id: 'samos', name: '🍷 Samos', group: '🌲 North Aegean' },
        { id: 'lemnos', name: '🌋 Lemnos', group: '🌲 North Aegean' },
        { id: 'thasos', name: '🌲 Thasos', group: '🌲 North Aegean' }
    ],
    major: [
        { id: 'crete', name: '🏺 Crete', group: '🏺 Major Islands' },
        { id: 'skiathos', name: '🌲 Skiathos', group: '🏺 Major Islands' },
        { id: 'skopelos', name: '🎬 Skopelos', group: '🏺 Major Islands' }
    ]
};

// Toast notification function
function showToast(message, type = 'success') {
    const toast = document.getElementById('toast');
    toast.textContent = message;
    toast.style.background = type === 'error' ? '#ef4444' : '#10b981';
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 3000);
}

// Donation functions
function donateAmount(amount) {
    const paypalUrl = `${CONFIG.PAYPAL_LINK}/${amount}EUR`;
    window.open(paypalUrl, '_blank');
    showToast(`Opening PayPal for €${amount} donation... Thank you! 💝`);
}

function donateCustom() {
    const customAmount = document.getElementById('customAmount').value;
    if (customAmount && customAmount > 0) {
        donateAmount(customAmount);
    } else {
        showToast('Please enter a valid amount', 'error');
    }
}

function showPaymentInfo(method) {
    const addresses = {
        bitcoin: 'BTC: 1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa',
        ethereum: 'ETH: 0x742d6c8b4e9c4e5b4e9c4e5b4e9c4e5b4e9c4e5b'
    };

    if (addresses[method]) {
        const address = addresses[method].split(': ')[1];
        navigator.clipboard.writeText(address).then(() => {
            showToast(`${method.charAt(0).toUpperCase() + method.slice(1)} address copied to clipboard!`);
        }).catch(() => {
            showToast(`${method.charAt(0).toUpperCase() + method.slice(1)} address: ${address}`);
        });
    }
}

// Load islands into select dropdown
async function loadIslands() {
    const islandSelect = document.getElementById('island-select');

    // Create optgroups and populate from our organized data
    const allIslands = [
        ...ISLAND_DISPLAY_NAMES.cyclades,
        ...ISLAND_DISPLAY_NAMES.dodecanese,
        ...ISLAND_DISPLAY_NAMES.northAegean,
        ...ISLAND_DISPLAY_NAMES.major
    ];

    // Group islands
    const grouped = {};
    allIslands.forEach(island => {
        if (!grouped[island.group]) {
            grouped[island.group] = [];
        }
        grouped[island.group].push(island);
    });

    // Create optgroups
    Object.entries(grouped).forEach(([group, islands]) => {
        const optgroup = document.createElement('optgroup');
        optgroup.label = group;

        islands.forEach(island => {
            const option = document.createElement('option');
            option.value = island.id;
            option.textContent = island.name;
            optgroup.appendChild(option);
        });

        islandSelect.appendChild(optgroup);
    });
}

// Fetch beach recommendations from API
async function fetchBeachRecommendations(island, date, time) {
    const url = `${CONFIG.API_BASE_URL}/weather/recommendations?island=${island}&date=${date}&time=${time}`;

    try {
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`API error: ${response.status}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching recommendations:', error);
        throw error;
    }
}

// Display beach results
function displayResults(data) {
    const resultsSection = document.getElementById('resultsSection');
    const beachResults = document.getElementById('beachResults');
    const weatherInfo = document.getElementById('weatherInfo');

    // Show results section
    resultsSection.style.display = 'block';

    // Update weather info
    const avgTemp = data.averageTemperature;
    const isMeltemiDay = data.meltemiConditions;
    const topBeach = data.topRecommendation;

    weatherInfo.innerHTML = `
        🌡️ ${Math.round(avgTemp)}°C • ${topBeach.weather.conditions} •
        💨 ${topBeach.weather.windSpeed} km/h ${topBeach.weather.windDirectionText}
        ${isMeltemiDay ? ' • <span style="color: #f59e0b; font-weight: 600;">⚠️ Meltemi Conditions</span>' : ''}
        <br><small style="opacity: 0.8;">Data: ${topBeach.weather.source}</small>
    `;

    // Display beach recommendations
    beachResults.innerHTML = data.allRecommendations.map((beach, index) => {
        const isTopRecommendation = index === 0;
        const protectionClass = beach.protection.swimmingConditions.toLowerCase();

        return `
            <div class="beach-result ${isTopRecommendation ? 'top-recommendation' : ''}">
                <div class="beach-header">
                    <div class="beach-name">
                        ${isTopRecommendation ? '🏖️ ' : ''}${beach.name}
                        <span class="protection-badge ${protectionClass}">
                            ${beach.protection.swimmingConditions}
                        </span>
                    </div>
                </div>
                <div class="beach-details">
                    <div class="beach-metric">
                        <div class="metric-value">${beach.protection.effectiveWindSpeed} km/h</div>
                        <div class="metric-label">Effective Wind</div>
                    </div>
                    <div class="beach-metric">
                        <div class="metric-value">${Math.round(beach.weather.temperature)}°C</div>
                        <div class="metric-label">Temperature</div>
                    </div>
                    <div class="beach-metric">
                        <div class="metric-value">${beach.protection.windReduction}%</div>
                        <div class="metric-label">Wind Block</div>
                    </div>
                    <div class="beach-metric">
                        <div class="metric-value">${beach.protection.meltemiProtection.toUpperCase()}</div>
                        <div class="metric-label">Meltemi Shield</div>
                    </div>
                    <div class="beach-metric">
                        <div class="metric-value">${beach.score}/100</div>
                        <div class="metric-label">Swim Score</div>
                    </div>
                </div>
                <div class="beach-description">
                    ${beach.description}
                    ${beach.protection.originalWindSpeed > beach.protection.effectiveWindSpeed ?
                        `<br><strong style="color: #10b981;">🛡️ Protection:</strong> Wind reduced from ${beach.protection.originalWindSpeed} to ${beach.protection.effectiveWindSpeed} km/h` : ''}
                </div>
            </div>
        `;
    }).join('');

    // Scroll to results
    resultsSection.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

// Handle find beaches button click
async function handleFindBeaches() {
    const island = document.getElementById('island-select').value;
    const date = document.getElementById('date-select').value;
    const time = document.getElementById('time-select').value;

    if (!island || !date || !time) {
        showToast('⚠️ Please fill in all fields', 'error');
        return;
    }

    const btn = document.getElementById('findBeachesBtn');
    const resultsSection = document.getElementById('resultsSection');
    const beachResults = document.getElementById('beachResults');
    const weatherInfo = document.getElementById('weatherInfo');

    // Show loading state
    btn.disabled = true;
    btn.innerHTML = '<span class="loading-spinner"></span> Analyzing...';
    resultsSection.style.display = 'block';
    weatherInfo.textContent = 'Fetching real-time weather data...';
    beachResults.innerHTML = '<p style="text-align: center; color: #64748b;">Loading beach recommendations...</p>';

    try {
        const data = await fetchBeachRecommendations(island, date, time);
        displayResults(data);
        showToast('🏖️ Beach recommendations loaded!');
    } catch (error) {
        console.error('Error:', error);
        beachResults.innerHTML = `
            <p style="text-align: center; color: #ef4444;">
                ❌ Error loading beach data. Please try again.<br>
                <small>${error.message}</small>
            </p>
        `;
        weatherInfo.textContent = 'Unable to fetch weather data';
        showToast('Error loading recommendations. Please try again.', 'error');
    } finally {
        btn.disabled = false;
        btn.innerHTML = '🔍 Find Perfect Beaches';
    }
}

// Set up date input defaults
function setupDateInput() {
    const dateInput = document.getElementById('date-select');
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    dateInput.value = tomorrow.toISOString().split('T')[0];
    dateInput.min = today.toISOString().split('T')[0];

    const maxDate = new Date(today);
    maxDate.setDate(maxDate.getDate() + 7);
    dateInput.max = maxDate.toISOString().split('T')[0];
}

// Smooth scrolling for navigation
function setupSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#' || targetId === '') return;

            const target = document.querySelector(targetId);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Initialize app when DOM is ready
document.addEventListener('DOMContentLoaded', async function() {
    console.log('🌊 AegeanSwim initializing...');
    console.log('API Base URL:', CONFIG.API_BASE_URL);

    // Load islands
    try {
        await loadIslands();
        console.log('✅ Islands loaded');
    } catch (error) {
        console.error('❌ Error loading islands:', error);
        showToast('Error loading islands. Please refresh the page.', 'error');
    }

    // Setup date input
    setupDateInput();

    // Setup event listeners
    document.getElementById('findBeachesBtn').addEventListener('click', handleFindBeaches);

    // Setup smooth scrolling
    setupSmoothScrolling();

    console.log('✅ AegeanSwim ready!');
});

// Export functions for global access (for inline onclick handlers)
window.donateAmount = donateAmount;
window.donateCustom = donateCustom;
window.showPaymentInfo = showPaymentInfo;
