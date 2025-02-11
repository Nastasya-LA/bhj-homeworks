 // // Объект для хранения состояния корзины
 // const cartState = {};
 //
 //
 // document.addEventListener('DOMContentLoaded', () => {
 //     initializeQuantityControls();
 //     initializeAddToCartButtons();
 // });
 //
 //
 // function initializeQuantityControls() {
 //     const decButtons = document.querySelectorAll('.product__quantity-control_dec');
 //     const incButtons = document.querySelectorAll('.product__quantity-control_inc');
 //
 //     decButtons.forEach(button => {
 //         button.addEventListener('click', (e) => {
 //             const valueElement = e.currentTarget.nextElementSibling;
 //             let currentValue = parseInt(valueElement.textContent);
 //             currentValue = Math.max(1, currentValue - 1);
 //             valueElement.textContent = currentValue;
 //         });
 //     });
 //
 //     incButtons.forEach(button => {
 //         button.addEventListener('click', (e) => {
 //             const valueElement = e.currentTarget.previousElementSibling;
 //             let currentValue = parseInt(valueElement.textContent);
 //             currentValue++;
 //             valueElement.textContent = currentValue;
 //         });
 //     });
 // }
 //
 //
 // function initializeAddToCartButtons() {
 //     const addToCartButtons = document.querySelectorAll('.product__add');
 //
 //     addToCartButtons.forEach(button => {
 //         button.addEventListener('click', (e) => {
 //             const product = e.currentTarget.closest('.product');
 //             const productId = product.dataset.id;
 //             const quantityValue = product.querySelector('.product__quantity-value').textContent;
 //
 //             addToCart(product, parseInt(quantityValue));
 //         });
 //     });
 // }
 //
 //
 // function addToCart(product, quantity) {
 //     const productId = product.dataset.id;
 //     const productImage = product.querySelector('.product__image').src;
 //
 //
 //     const clone = document.createElement('img');
 //     clone.src = productImage;
 //     clone.className = 'product-shadow';
 //     Object.assign(clone.style, {
 //         position: 'absolute',
 //         left: `${product.getBoundingClientRect().left}px`,
 //         top: `${product.getBoundingClientRect().top}px`,
 //         width: '100px',
 //         height: '100px'
 //     });
 //     document.body.appendChild(clone);
 //
 //     // Получаем координаты места назначения
 //     const cartProduct = document.querySelector(`[data-id="${productId}"]`);
 //     const targetRect = cartProduct ? cartProduct.getBoundingClientRect() : null;
 //
 //
 //     animateClone(clone, targetRect, () => {
 //         if (!cartState[productId]) {
 //             cartState[productId] = {
 //                 element: createCartItem(productId, productImage),
 //                 quantity: 0
 //             };
 //             document.querySelector('.cart__products').appendChild(cartState[productId].element);
 //         }
 //
 //         cartState[productId].quantity += quantity;
 //         updateCartItemCount(productId);
 //
 //         clone.remove();
 //     });
 // }
 //
 //
 // function createCartItem(productId, imageUrl) {
 //     const element = document.createElement('div');
 //     element.className = 'cart__product';
 //     element.dataset.id = productId;
 //     element.innerHTML = `
 //         <img class="cart__product-image" src="${imageUrl}">
 //         <div class="cart__product-count">0</div>
 //     `;
 //     return element;
 // }
 //
 //
 // function updateCartItemCount(productId) {
 //     const countElement = cartState[productId].element.querySelector('.cart__product-count');
 //     countElement.textContent = cartState[productId].quantity;
 // }
 //
 //
 // function animateClone(clone, targetRect, callback) {
 //     if (!targetRect) {
 //         callback();
 //         return;
 //     }
 //
 //     const startX = parseFloat(clone.style.left);
 //     const startY = parseFloat(clone.style.top);
 //     const endX = targetRect.left;
 //     const endY = targetRect.top;
 //     const deltaX = endX - startX;
 //     const deltaY = endY - startY;
 //     const steps = 20;
 //     let currentStep = 0;
 //
 //     const animate = () => {
 //         currentStep++;
 //         const progress = currentStep / steps;
 //
 //         clone.style.left = `${startX + (deltaX * progress)}px`;
 //         clone.style.top = `${startY + (deltaY * progress)}px`;
 //
 //         if (currentStep >= steps) {
 //             callback();
 //             return;
 //         }
 //
 //         requestAnimationFrame(animate);
 //     };
 //
 //     requestAnimationFrame(animate);
 // }

 document.addEventListener('DOMContentLoaded', function() {
   // Получаем необходимые элементы
   const form = document.getElementById('tasks__form');
   const input = document.getElementById('task__input');
   const tasksList = document.getElementById('tasks__list');


   form.addEventListener('submit', function(event) {
     event.preventDefault();

     const taskText = input.value.trim();

     if (taskText) {
       createTask(taskText);

       input.value = '';
     }
   });

   function createTask(text) {
     const taskElement = document.createElement('div');
     taskElement.className = 'task';

     const titleElement = document.createElement('div');
     titleElement.className = 'task__title';
     titleElement.textContent = text;

     const removeLink = document.createElement('a');
     removeLink.className = 'task__remove';
     removeLink.href = '#';

     removeLink.addEventListener('click', function(event) {
       event.preventDefault();
       taskElement.remove();
     });

     taskElement.appendChild(titleElement);
     taskElement.appendChild(removeLink);

     tasksList.appendChild(taskElement);
   }

   input.addEventListener('keypress', function(event) {
     if (event.key === 'Enter') {
       form.submit();
     }
   });
 });