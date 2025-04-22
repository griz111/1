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
        button.innerHTML = `<img src="${img.url}?t=${Date.now()}" alt="Tab ${index + 1}">`;
        
        const content = document.createElement('div');
        content.className = `tab-content ${index === 0 ? 'active' : ''}`;

        if(img.isEncoder) {
            content.innerHTML = `
                <div class="base64-converter">
                
                <div class="tab-content-title">Base64 - это специальный метод кодирования информации в 64-разрядный код (6 бит), широко используемый в приложениях электронной почты для кодирования бинарных данных. Весь диапазон закодированных символов укладывается в английский алфавит, цифры и ряд специальных символов. На сайте представлен онлайн генератор и декодер функции base64.</div>
                
                    <textarea id="base64Input" 
                              rows="4" 
                              placeholder="Введите текст или Base64 строку"></textarea>
                    <div>
                        <button onclick="encodeBase64()">Кодировать</button>
                        <button onclick="decodeBase64()">Декодировать</button>
                    </div>
                    <div id="base64Result"></div>
                </div>
            `;
        } else {
            content.textContent = img.content;
        }

        button.addEventListener('click', (e) => {
            e.preventDefault();
            document.querySelectorAll('.tab-button, .tab-content').forEach(el => {
                el.classList.remove('active');
            });
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
