async function loadData() {
    const response = await fetch('data.json?t=' + Date.now());
    return await response.json();
}

async function initTabs() {
    const data = await loadData();
    const tabsContainer = document.getElementById('tabsContainer');
    const contentContainer = document.getElementById('contentContainer');
    
    data.images.forEach((img, index) => {
        const button = document.createElement('button');
        button.className = `tab-button ${index === 0 ? 'active' : ''}`;
        button.innerHTML = `<img src="${img.url}?t=${Date.now()}" alt="${img.id}">`;
        
        const content = document.createElement('div');
        content.className = `tab-content ${index === 0 ? 'active' : ''}`;
        content.textContent = img.content;

        button.addEventListener('click', (e) => {
            e.preventDefault();
            document.querySelectorAll('.tab-button').forEach(b => b.classList.remove('active'));
            document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
            button.classList.add('active');
            content.classList.add('active');
        });

        tabsContainer.appendChild(button);
        contentContainer.appendChild(content);
    });
}

function encodeBase64() {
    const input = document.getElementById('base64Input').value;
    try {
        const encoder = new TextEncoder();
        const data = encoder.encode(input);
        const binaryString = String.fromCharCode(...new Uint8Array(data));
        document.getElementById('base64Result').textContent = btoa(binaryString);
    } catch(e) {
        document.getElementById('base64Result').textContent = "Ошибка кодирования!";
    }
}

function decodeBase64() {
    const input = document.getElementById('base64Input').value;
    try {
        const binaryString = atob(input);
        const bytes = new Uint8Array(binaryString.length);
        for(let i = 0; i < binaryString.length; i++) {
            bytes[i] = binaryString.charCodeAt(i);
        }
        const decoder = new TextDecoder('utf-8');
        document.getElementById('base64Result').textContent = decoder.decode(bytes);
    } catch(e) {
        document.getElementById('base64Result').textContent = "Неверный Base64!";
    }
}

document.addEventListener('DOMContentLoaded', initTabs);