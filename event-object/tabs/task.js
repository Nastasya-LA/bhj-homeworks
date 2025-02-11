
 // Получаем все контейнеры с вкладками на странице
 const tabsContainers = document.querySelectorAll('.tabs');
        
   // Функция для обработки переключения вкладок
       function handleTabSwitch(event) {
     // Находим родительский контейнер текущей вкладки
       const container = event.currentTarget.closest('.tabs');
     
     // Если клик был не по активной вкладке
        if (!event.currentTarget.classList.contains('tab_active')) {
         // Удаляем класс active у всех вкладок и их содержимого
         container.querySelectorAll('.tab').forEach(tab => 
             tab.classList.remove('tab_active'));
         
         container.querySelectorAll('.tab__content').forEach(content =>
             content.classList.remove('tab__content_active'));
         
         // Добавляем класс active к кликнутой вкладке и её содержимому
         event.currentTarget.classList.add('tab_active');
         
         // Находим индекс активной вкладки
         const tabIndex = Array.from(container.querySelectorAll('.tab'))
             .indexOf(event.currentTarget);
             
         // Показываем соответствующее содержимое
         container.querySelectorAll('.tab__content')
             [tabIndex].classList.add('tab__content_active');
        }
    }

 // Добавляем обработчики событий для каждой группы вкладок
     tabsContainers.forEach(container => {
      container.querySelectorAll('.tab').forEach(tab => {
         tab.addEventListener('click', handleTabSwitch);
       });
     });