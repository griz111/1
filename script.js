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
        const utf8Bytes = new TextEncoder().encode(input);
        const binaryString = String.fromCharCode(...utf8Bytes);
        document.getElementById('base64Result').textContent = btoa(binaryString);
    } catch(e) {
        document.getElementById('base64Result').textContent = "Ошибка кодирования";
    }
}

function decodeBase64() {
    const input = document.getElementById('base64Input').value;
    try {
        const binaryString = atob(input);
        const bytes = new Uint8Array(binaryString.length);
        for(let i = 0; i < binaryString.length; i++){
            bytes[i] = binaryString.charCodeAt(i);
        }
        document.getElementById('base64Result').textContent = new TextDecoder().decode(bytes);
    } catch(e) {
        document.getElementById('base64Result').textContent = "Неверный Base64";
    }
}

document.addEventListener('DOMContentLoaded', initTabs);