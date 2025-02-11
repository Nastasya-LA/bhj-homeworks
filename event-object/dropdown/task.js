document.addEventListener('DOMContentLoaded', () => {
    // Находим все выпадающие списки на странице
    const dropdowns = document.querySelectorAll('.dropdown');

    // Добавляем обработчики для каждого списка
    dropdowns.forEach(dropdown => {
        // Обработчик клика по значению (открытие/закрытие)
        const dropdownValue = dropdown.querySelector('.dropdown__value');
        dropdownValue.addEventListener('click', (event) => {
            event.stopPropagation();
            
            // Получаем список и переключаем класс активности
            const dropdownList = dropdown.querySelector('.dropdown__list');
            dropdownList.classList.toggle('dropdown__list_active');
        });

        // Обработчик клика по пунктам меню
        const dropdownItems = dropdown.querySelectorAll('.dropdown__item');
        dropdownItems.forEach(item => {
            item.addEventListener('click', (event) => {
                event.preventDefault(); // Предотвращаем переход по ссылке
                
                // Получаем текст выбранного пункта
                const selectedText = event.target.textContent;
                
                // Обновляем значение в кнопке
                dropdown.querySelector('.dropdown__value').textContent = selectedText;
                
                // Закрываем список
                dropdown.querySelector('.dropdown__list').classList.remove('dropdown__list_active');
            });
        });
    });

    // Обработчик клика вне выпадающего списка
    document.addEventListener('click', (event) => {
        // Проверяем, не находится ли клик внутри какого-либо выпадающего списка
        const dropdownElement = event.target.closest('.dropdown');
        
        // Если клик был вне всех выпадающих списков, закрываем их
        if (!dropdownElement) {
            document.querySelectorAll('.dropdown__list').forEach(list => {
                list.classList.remove('dropdown__list_active');
            });
        }
    });
});