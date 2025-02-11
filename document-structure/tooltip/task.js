// task.js
document.addEventListener('DOMContentLoaded', () => {
    const tooltips = document.querySelectorAll('.has-tooltip');
    
    // Создаем контейнер для всех подсказок
    const tooltipContainer = document.createElement('div');
    tooltipContainer.id = 'tooltip-container';
    document.body.appendChild(tooltipContainer);
  
    let activeTooltip = null;
  
    tooltips.forEach(element => {
      element.addEventListener('click', (e) => {
        e.preventDefault();
        
        // Закрываем предыдущую подсказку, если она есть
        if (activeTooltip) {
          activeTooltip.remove();
        }
  
        // Получаем текст и позицию подсказки
        const tooltipText = element.getAttribute('title');
        const position = element.getAttribute('data-position') || 'top';
  
        // Создаем новую подсказку
        const tooltip = document.createElement('div');
        tooltip.className = 'tooltip tooltip_active';
        tooltip.textContent = tooltipText;
  
        const rect = element.getBoundingClientRect();
        
        let top, left;
  
        switch(position) {
          case 'top':
            top = `${rect.top - tooltip.offsetHeight - 10}px`;
            left = `${rect.left + (rect.width - tooltip.offsetWidth) / 2}px`;
            break;
          case 'bottom':
            top = `${rect.bottom + 10}px`;
            left = `${rect.left + (rect.width - tooltip.offsetWidth) / 2}px`;
            break;
          case 'left':
            top = `${rect.top + (rect.height - tooltip.offsetHeight) / 2}px`;
            left = `${rect.left - tooltip.offsetWidth - 10}px`;
            break;
          case 'right':
            top = `${rect.top + (rect.height - tooltip.offsetHeight) / 2}px`;
            left = `${rect.right + 10}px`;
            break;
        }
  
        tooltip.style.top = top;
        tooltip.style.left = left;
        
        tooltipContainer.appendChild(tooltip);
        activeTooltip = tooltip;
  
        // Закрываем подсказку при клике вне элемента
        document.addEventListener('click', closeTooltipHandler);
        
        function closeTooltipHandler(event) {
          if (!element.contains(event.target) && !tooltip.contains(event.target)) {
            tooltip.remove();
            activeTooltip = null;
            document.removeEventListener('click', closeTooltipHandler);
          }
        }
      });
    });
  });