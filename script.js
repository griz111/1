// Загрузка данных с timestamp для избежания кэширования
async function loadData() {
    const response = await fetch('data.json?t=' + Date.now());
    return await response.json();
}

// Инициализация вкладок
async function initTabs() {
    const data = await loadData();
    const container = document.getElementById('tabsContainer');
    
    data.images.forEach((img, index) => {
        // Создание кнопки с картинкой
        const button = document.createElement('button');
        button.className = `tab-button ${index === 0 ? 'active' : ''}`;
        button.innerHTML = `<img src="${img.url}?t=${Date.now()}" alt="${img.id}">`;
        
        // Создание контента
        const content = document.createElement('div');
        content.className = `tab-content ${index === 0 ? 'active' : ''}`;
        content.id = img.id;
        content.textContent = img.content;

        // Обработчик клика
        button.addEventListener('click', () => {
            document.querySelectorAll('.tab-button, .tab-content').forEach(el => {
                el.classList.remove('active');
            });
            button.classList.add('active');
            content.classList.add('active');
        });

        container.appendChild(button);
        container.appendChild(content);
    });
}

// Base64 кодировщик/декодировщик
function encodeBase64() {
    const input = document.getElementById('base64Input').value;
    document.getElementById('base64Result').textContent = btoa(input);
}

function decodeBase64() {
    const input = document.getElementById('base64Input').value;
    try {
        document.getElementById('base64Result').textContent = atob(input);
    } catch(e) {
        document.getElementById('base64Result').textContent = "Invalid Base64";
    }
}

// Инициализация при загрузке
document.addEventListener('DOMContentLoaded', initTabs);