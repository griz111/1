async function loadData() {
    const response = await fetch('data.json?t=' + Date.now());
    return await response.json();
}

async function initTabs() {
    const data = await loadData();
    const container = document.getElementById('tabsContainer');
    
    data.images.forEach((img, index) => {
        const button = document.createElement('button');
        button.className = `tab-button ${index === 0 ? 'active' : ''}`;
        button.innerHTML = `<img src="${img.url}?t=${Date.now()}" alt="${img.id}">`;
        
        const content = document.createElement('div');
        content.className = `tab-content ${index === 0 ? 'active' : ''}`;
        content.id = img.id;
        content.textContent = img.content;

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

function encodeBase64() {
    const input = document.getElementById('base64Input').value;
    try {
        // Исправленное кодирование с поддержкой UTF-8
        const utf8Bytes = new TextEncoder().encode(input);
        let binaryString = '';
        for(let i = 0; i < utf8Bytes.length; i++) {
            binaryString += String.fromCharCode(utf8Bytes[i]);
        }
        document.getElementById('base64Result').textContent = btoa(binaryString);
    } catch(e) {
        document.getElementById('base64Result').textContent = "Ошибка кодирования";
    }
}

function decodeBase64() {
    const input = document.getElementById('base64Input').value;
    try {
        // Исправленное декодирование
        const binaryString = atob(input);
        const bytes = new Uint8Array(binaryString.length);
        for(let i = 0; i < binaryString.length; i++) {
            bytes[i] = binaryString.charCodeAt(i);
        }
        document.getElementById('base64Result').textContent = new TextDecoder('utf-8').decode(bytes);
    } catch(e) {
        document.getElementById('base64Result').textContent = "Неверный Base64";
    }
}

document.addEventListener('DOMContentLoaded', initTabs);
