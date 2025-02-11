// Проверяем наличие куки при загрузке страницы
document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('subscribe-modal');
    const modalClose = document.querySelector('.modal__close_times');
    
    // Функция проверки куки
    function checkCookie() {
        return document.cookie.includes('modalClosed=true');
    }
    
    // Функция установки куки
    function setCookie() {
        const date = new Date();
        date.setTime(date.getTime() + (365 * 24 * 60 * 60 * 1000)); // годовая дата истечения
        document.cookie = `modalClosed=true; expires=${date.toUTCString()}; path=/`;
    }
    
    // Показываем модальное окно при первой загрузке, если куки нет
    if (!checkCookie()) {
        modal.classList.add('modal_active');
    }
    
    // Обработчик закрытия окна
    modalClose.addEventListener('click', () => {
        modal.classList.remove('modal_active');
        setCookie(); // устанавливаем куку только после реального закрытия окна
    });
});