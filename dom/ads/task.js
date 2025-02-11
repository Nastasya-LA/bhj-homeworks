document.addEventListener('DOMContentLoaded', function() {
    // Функция для инициализации ротатора
    function initRotator(rotatorElement) {
        const cases = rotatorElement.querySelectorAll('.rotator__case');
        let currentIndex = 0;

        // Функция для смены активного элемента
        function rotateText() {
            const currentCase = cases[currentIndex];
            const nextIndex = (currentIndex + 1) % cases.length;
            const nextCase = cases[nextIndex];

            // Добавляем класс fade-out к текущему элементу
            currentCase.classList.add('fade-out');

            // Меняем цвет текста
            setTimeout(() => {
                currentCase.classList.remove('rotator__case_active', 'fade-out');
                nextCase.style.color = nextCase.dataset.color || '#000';
                nextCase.classList.add('rotator__case_active', 'fade-in');

                // Удаляем fade-in после завершения анимации
                setTimeout(() => {
                    nextCase.classList.remove('fade-in');
                }, 300);

                currentIndex = nextIndex;
            }, 300); // Время перехода
        }

        // Запускаем ротатор с интервалом, указанным в data-speed
        const intervalTime = parseInt(cases[0].dataset.speed || '1000');
        setInterval(rotateText, intervalTime);
    }

    // Инициализируем все ротаторы на странице
    document.querySelectorAll('.rotator').forEach(initRotator);
});