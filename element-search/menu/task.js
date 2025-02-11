
document.querySelectorAll('.menu__link').forEach(link => {
    link.addEventListener('click', (event) => {
      event.preventDefault();
      
      const submenu = link.closest('.menu__item').querySelector('.menu_sub');
      
      if (submenu) {
        submenu.classList.toggle('menu_active');
      }
    });
  });
  