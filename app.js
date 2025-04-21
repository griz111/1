document.addEventListener('DOMContentLoaded', function() {
    const tabsDataUrl = 'data/tabs.json';
    const tabsContainer = document.getElementById('tabsContainer');
    const contentContainer = document.getElementById('contentContainer');
    let isProcessing = false;

    const loadTabs = async () => {
        if (isProcessing) return;
        isProcessing = true;
        
        try {
            const response = await fetch(`${tabsDataUrl}?t=${Date.now()}`);
            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
            const tabs = await response.json();
            renderTabs(tabs);
            setupEventListeners();
        } catch (error) {
            console.error('Error loading tabs:', error);
        } finally {
            isProcessing = false;
        }
    };

    const renderTabs = (tabs) => {
        tabsContainer.innerHTML = tabs.map((tab, index) => `
            <button class="tab-button ${index === 0 ? 'active' : ''}" 
                    data-tab-id="${tab.id}"
                    aria-label="${tab.title}">
                <img src="${tab.image}?t=${Date.now()}" 
                     alt="${tab.title}"
                     loading="lazy">
            </button>
        `).join('');

        contentContainer.innerHTML = tabs.map((tab, index) => `
            <div id="${tab.id}" 
                 class="tab-content ${index === 0 ? 'active' : ''}" 
                 role="tabpanel"
                 aria-labelledby="${tab.id}-tab">
                <h2>${tab.title}</h2>
                <p>${tab.content}</p>
            </div>
        `).join('');
    };

    const setupEventListeners = () => {
        const handleTabClick = (e) => {
            const button = e.target.closest('.tab-button');
            if (!button || button.classList.contains('active')) return;

            const tabId = button.dataset.tabId;
            const allButtons = tabsContainer.querySelectorAll('.tab-button');
            const allContents = contentContainer.querySelectorAll('.tab-content');

            allButtons.forEach(btn => btn.classList.remove('active'));
            allContents.forEach(content => content.classList.remove('active'));

            button.classList.add('active');
            document.getElementById(tabId).classList.add('active');
        };

        tabsContainer.removeEventListener('click', handleTabClick);
        tabsContainer.addEventListener('click', handleTabClick);
    };

    loadTabs();
});