async function loadData() {
    const response = await fetch('data.json?t=' + Date.now());
    return await response.json();
}

async function initTabs() {
    const data = await loadData();
    const tabsContainer = document.getElementById('tabsContainer');

    <br><div>sfsdfsfs</div>
    
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
                
                <div>Base64 — стандарт кодирования двоичных данных при помощи только 64 символов ASCII. Алфавит кодирования содержит латинские символы A-Z, a-z, цифры 0-9 (всего 62 знака) и 2 дополнительных символа, зависящих от системы реализации. Каждые 3 исходных байта кодируются четырьмя символами (увеличение на ¹⁄₃). Эта система широко используется в электронной почте для представления бинарных файлов в тексте письма (транспортное кодирование). MIME В формате электронной почты MIME Base64 — это схема, по которой произвольная последовательность байтов преобразуется в последовательность печатных ASCII-символов. Стандартные 62 символа дополняют +, / и = — в качестве специального кода суффикса. Полная спецификация этой формы Base64 содержится в RFC 1421 и RFC 2045. Эта схема используется для кодирования последовательности октетов (байтов). Для того чтобы преобразовать данные в Base64, первый байт помещается в самые старшие восемь битов 24-битного буфера, следующий — в средние восемь и третий — в младшие восемь битов. Если кодируется менее чем три байта, то соответствующие биты буфера устанавливаются в ноль. Далее каждые шесть битов буфера, начиная с самых старших, используются как индексы строки «ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/», и её символы, на которые указывают индексы, помещаются в выходную строку. Если кодируется только один или два байта, в результате получаются только первые два или три символа строки, а выходная строка дополняется двумя или одним знаком =. Это предотвращает добавление дополнительных битов к восстановленным данным. Процесс повторяется над оставшимися входными данными. При кодировании Base64 размер сообщения увеличивается приблизительно на 33 %. Это надо учитывать, если есть ограничения на размер конечного сообщения. Так, при максимально допустимом размере 64 МБ реальный размер передаваемого сообщения должен быть не более 48 МБ[1].</div>
                
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
