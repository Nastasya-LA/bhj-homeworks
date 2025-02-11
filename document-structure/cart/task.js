
        // Объект для хранения состояния корзины
        const cartState = {};

        // Инициализация обработчиков событий
        document.addEventListener('DOMContentLoaded', () => {
            initializeQuantityControls();
            initializeAddToCartButtons();
        });

        // Инициализация контролов количества
        function initializeQuantityControls() {
            const decButtons = document.querySelectorAll('.product__quantity-control_dec');
            const incButtons = document.querySelectorAll('.product__quantity-control_inc');

            decButtons.forEach(button => {
                button.addEventListener('click', (e) => {
                    const valueElement = e.currentTarget.nextElementSibling;
                    let currentValue = parseInt(valueElement.textContent);
                    currentValue = Math.max(1, currentValue - 1);
                    valueElement.textContent = currentValue;
                });
            });

            incButtons.forEach(button => {
                button.addEventListener('click', (e) => {
                    const valueElement = e.currentTarget.previousElementSibling;
                    let currentValue = parseInt(valueElement.textContent);
                    currentValue++;
                    valueElement.textContent = currentValue;
                });
            });
        }

        // Инициализация кнопок добавления в корзину
        function initializeAddToCartButtons() {
            const addToCartButtons = document.querySelectorAll('.product__add');
            
            addToCartButtons.forEach(button => {
                button.addEventListener('click', (e) => {
                    const product = e.currentTarget.closest('.product');
                    const productId = product.dataset.id;
                    const quantityValue = product.querySelector('.product__quantity-value').textContent;
                    
                    addToCart(product, parseInt(quantityValue));
                });
            });
        }

        // Функция добавления товара в корзину
        function addToCart(product, quantity) {
            const productId = product.dataset.id;
            const productImage = product.querySelector('.product__image').src;
            
            // Создаем копию изображения для анимации
            const clone = document.createElement('img');
            clone.src = productImage;
            clone.className = 'product-shadow';
            Object.assign(clone.style, {
                position: 'absolute',
                left: `${product.getBoundingClientRect().left}px`,
                top: `${product.getBoundingClientRect().top}px`,
                width: '100px',
                height: '100px'
            });
            document.body.appendChild(clone);

            // Получаем координаты места назначения
            const cartProduct = document.querySelector(`[data-id="${productId}"]`);
            const targetRect = cartProduct ? cartProduct.getBoundingClientRect() : null;

            // Анимируем перемещение
            animateClone(clone, targetRect, () => {
                if (!cartState[productId]) {
                    cartState[productId] = {
                        element: createCartItem(productId, productImage),
                        quantity: 0
                    };
                    document.querySelector('.cart__products').appendChild(cartState[productId].element);
                }

                cartState[productId].quantity += quantity;
                updateCartItemCount(productId);
                
                clone.remove();
            });
        }

        // Функция создания элемента корзины
        function createCartItem(productId, imageUrl) {
            const element = document.createElement('div');
            element.className = 'cart__product';
            element.dataset.id = productId;
            element.innerHTML = `
                <img class="cart__product-image" src="${imageUrl}">
                <div class="cart__product-count">0</div>
            `;
            return element;
        }

        // Функция обновления количества товара в корзине
        function updateCartItemCount(productId) {
            const countElement = cartState[productId].element.querySelector('.cart__product-count');
            countElement.textContent = cartState[productId].quantity;
        }

        // Функция анимации перемещения
        function animateClone(clone, targetRect, callback) {
            if (!targetRect) {
                callback();
                return;
            }

            const startX = parseFloat(clone.style.left);
            const startY = parseFloat(clone.style.top);
            const endX = targetRect.left;
            const endY = targetRect.top;
            const deltaX = endX - startX;
            const deltaY = endY - startY;
            const steps = 20;
            let currentStep = 0;

            const animate = () => {
                currentStep++;
                const progress = currentStep / steps;
                
                clone.style.left = `${startX + (deltaX * progress)}px`;
                clone.style.top = `${startY + (deltaY * progress)}px`;

                if (currentStep >= steps) {
                    callback();
                    return;
                }

                requestAnimationFrame(animate);
            };

            requestAnimationFrame(animate);
        }
    
