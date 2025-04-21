document.addEventListener('DOMContentLoaded', function() {
    const tabsDataUrl = 'data/tabs.json';
    const tabsContainer = document.getElementById('tabsContainer');
    const contentContainer = document.getElementById('contentContainer');

    const loadTabs = async () => {
        try {
            const response = await fetch(`${tabsDataUrl}?t=${Date.now()}`);
            const tabs = await response.json();
            renderTabs(tabs);
            setupEventListeners();
        } catch (error) {
            console.error('Error loading tabs:', error);
        }
    };

    const renderTabs = (tabs) => {
        tabsContainer.innerHTML = tabs.map((tab, index) => `
            <button class="tab-button ${index === 0 ? 'active' : ''}" data-tab-id="${tab.id}">
                <img src="${tab.image}?t=${Date.now()}" alt="${tab.title}">
            </button>
        `).join('');

        contentContainer.innerHTML = tabs.map((tab, index) => `
            <div id="${tab.id}" class="tab-content ${index === 0 ? 'active' : ''}">
                <h2>${tab.title}</h2>
                <p>${tab.content}</p>
            </div>
        `).join('');
    };

    const setupEventListeners = () => {
        tabsContainer.addEventListener('click', (e) => {
            const button = e.target.closest('.tab-button');
            if (!button) return;

            const tabId = button.dataset.tabId;
            const allButtons = document.querySelectorAll('.tab-button');
            const allContents = document.querySelectorAll('.tab-content');

            allButtons.forEach(btn => btn.classList.remove('active'));
            allContents.forEach(content => content.classList.remove('active'));

            button.classList.add('active');
            document.getElementById(tabId).classList.add('active');
        });
    };

    loadTabs();
});