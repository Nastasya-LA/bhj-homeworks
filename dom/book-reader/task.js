document.addEventListener('DOMContentLoaded', function() {
    // Получаем элементы управления и книгу
    const fontSizeControls = document.querySelectorAll('.font-size');
    const bookElement = document.getElementById('book');

    // Функция для обработки клика по кнопке изменения размера шрифта
    function handleFontSizeChange(event) {
        event.preventDefault();
        
        // Удаляем активный класс со всех кнопок
        fontSizeControls.forEach(button => 
            button.classList.remove('font-size_active')
        );
        
        // Добавляем активный класс нажатой кнопке
        event.currentTarget.classList.add('font-size_active');
        
        // Удаляем все классы, связанные с размером шрифта у книги
        bookElement.classList.remove('book_fs-big', 'book_fs-small');
        
        // Добавляем соответствующий класс в зависимости от размера
        const size = event.currentTarget.dataset.size;
        if (size === 'big') {
            bookElement.classList.add('book_fs-big');
        } else if (size === 'small') {
            bookElement.classList.add('book_fs-small');
        }
    }

    // Добавляем обработчики кликов ко всем кнопкам изменения размера
    fontSizeControls.forEach(button => {
        button.addEventListener('click', handleFontSizeChange);
    });
});