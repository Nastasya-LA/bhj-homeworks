// Функция для открытия модального окна
function openModal(modalId) {
    const modal = document.getElementById(modalId);
    modal.classList.add('modal_active');
}

// Функция для закрытия активного модального окна
function closeModal() {
    const activeModals = document.querySelectorAll('.modal.modal_active');
    activeModals.forEach(modal => {
        modal.classList.remove('modal_active');
    });
}

// Добавляем обработчики событий
document.addEventListener('DOMContentLoaded', () => {
    // Открываем основное окно при загрузке страницы
    openModal('modal_main');

    // Закрываем активное окно по клику на элементе с классом modal__close
    document.querySelectorAll('.modal__close').forEach(closeButton => {
        closeButton.addEventListener('click', closeModal);
    });

    // Открываем второе окно при клике на элемент с классом show-success
    document.querySelector('.show-success').addEventListener('click', () => {
        openModal('modal_success');
    });
});
