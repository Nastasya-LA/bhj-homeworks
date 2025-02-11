// <!DOCTYPE html>
// <html lang="ru">
// <head>
//     <meta charset="UTF-8">
//     <style>
//         textarea {
//             max-width: 100%;
//             width: 100%;
//             display: block;
//             padding: 10px 20px;
//             margin: 0 0 20px 0;
//             font-family: Arial, sans-serif;
//             border: 1px solid #e2e2e2;
//             box-sizing: border-box;
//             height: 200px;
//         }
        
//         button {
//             padding: 8px 16px;
//             margin-right: 10px;
//             cursor: pointer;
//         }
//     </style>
// </head>
// <body>
//     <textarea id="editor"></textarea>
//     <button onclick="saveText()">Сохранить</button>
//     <button onclick="clearText()">Очистить</button>

//     <script>
//         // Загрузка сохраненного текста при загрузке страницы
//         document.addEventListener('DOMContentLoaded', () => {
//             const savedText = localStorage.getItem('editorContent');
//             if (savedText) {
//                 document.getElementById('editor').value = savedText;
//             }
//         });

//         // Сохранение текста в localStorage
//         function saveText() {
//             const editor = document.getElementById('editor');
//             localStorage.setItem('editorContent', editor.value);
//             alert('Текст сохранен!');
//         }

//         // Очистка текста и localStorage
//         function clearText() {
//             const editor = document.getElementById('editor');
//             editor.value = '';
//             localStorage.removeItem('editorContent');
//             alert('Текст очищен!');
//         }

//         // Автоматическое сохранение при вводе текста
//         document.getElementById('editor').addEventListener('input', () => {
//             localStorage.setItem('editorContent', event.target.value);
//         });
//     </script>
// </body>
// </html>

// Загрузка сохраненного текста при загрузке страницы
document.addEventListener('DOMContentLoaded', () => {
    const savedText = localStorage.getItem('editorContent');
    if (savedText) {
        document.getElementById('editor').value = savedText;
    }
});

// Сохранение текста в localStorage
function saveText() {
    const editor = document.getElementById('editor');
    localStorage.setItem('editorContent', editor.value);
    alert('Текст сохранен!');
}

// Очистка текста и localStorage
function clearText() {
    const editor = document.getElementById('editor');
    editor.value = '';
    localStorage.removeItem('editorContent');
    alert('Текст очищен!');
}

// Автоматическое сохранение при вводе текста
document.getElementById('editor').addEventListener('input', () => {
    localStorage.setItem('editorContent', event.target.value);
});