// Функция проверки статуса авторизации при загрузке страницы
function checkAuthStatus() {
    const storedUserId = localStorage.getItem('userId');
    const welcomeBlock = document.getElementById('welcome');
    const userIdSpan = document.getElementById('user_id');

    if (storedUserId) {
        welcomeBlock.classList.add('welcome_active');
        userIdSpan.textContent = storedUserId;
    } else {
        document.getElementById('signin').classList.add('signin_active');
    }
}

// Обработчик отправки формы
function handleFormSubmit(event) {
    event.preventDefault();
    
    const formData = new FormData(event.target);
    const loginInput = document.querySelector('[name="login"]');
    const passwordInput = document.querySelector('[name="password"]');

    fetch('https://students.netoservices.ru/nestjs-backend/auth', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            // Успешная авторизация
            localStorage.setItem('userId', data.user_id);
            
            // Очистка полей формы
            loginInput.value = '';
            passwordInput.value = '';
            
            // Обновление интерфейса
            document.getElementById('signin').classList.remove('signin_active');
            document.getElementById('welcome').classList.add('welcome_active');
            document.getElementById('user_id').textContent = data.user_id;
        } else {
            alert('Неверный логин или пароль');
        }
    })
    .catch(error => console.error('Ошибка:', error));
}

// Добавляем обработчики событий
document.addEventListener('DOMContentLoaded', () => {
    checkAuthStatus();
    
    const form = document.getElementById('signin__form');
    if (form) {
        form.addEventListener('submit', handleFormSubmit);
    }
});