// Массив для хранения выбранных интересов
let selectedInterests = [];

document.addEventListener('DOMContentLoaded', function() {
    const checkboxes = document.querySelectorAll('.interest__check');
    
    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', function(event) {
            const isChecked = event.target.checked;
            
            // Находим родительский элемент с классом interest
            const parentInterest = event.target.closest('.interest');
            
            // Если есть вложенный список, обновляем его состояние
            const nestedList = parentInterest.querySelector('.interests');
            if (nestedList) {
                const nestedCheckboxes = nestedList.querySelectorAll('.interest__check');
                
                nestedCheckboxes.forEach(nestedCheckbox => {
                    nestedCheckbox.checked = isChecked;
                });
            }
            
            updateSelectedList();
        });
    });

    // Инициализация списка выбранных интересов
    updateSelectedList();
});

// Добавление новой категории
function addCategory() {
    const categoryName = prompt('Введите название категории:');
    if (!categoryName) return;

    const mainList = document.querySelector('.interests_main ul');
    const newCategory = `
        <li class="interest">
            <label>
                <input type="checkbox" class="interest__check">${categoryName}
            </label>
            <ul class="interests interests_active">
                <li class="interest">
                    <label>
                        <input type="checkbox" class="interest__check">Подкатегория
                    </label>
                </ul>
            </li>
        </li>
    `;

    mainList.insertAdjacentHTML('beforeend', newCategory);
    
    // Перерегистрация обработчиков событий для новых чекбоксов
    const newCheckbox = document.querySelector('.interest__check:last-of-type');
    newCheckbox.addEventListener('change', function(event) {
        const isChecked = event.target.checked;
        
        const parentInterest = event.target.closest('.interest');
        const nestedList = parentInterest.querySelector('.interests');
        
        if (nestedList) {
            const nestedCheckboxes = nestedList.querySelectorAll('.interest__check');
            
            nestedCheckboxes.forEach(nestedCheckbox => {
                nestedCheckbox.checked = isChecked;
            });
        }
        
        updateSelectedList();
    });
}

// Удаление выбранной категории
function removeSelected() {
    const checkboxes = document.querySelectorAll('.interest__check:checked');
    checkboxes.forEach(checkbox => {
        const parentLi = checkbox.closest('li.interest');
        parentLi.remove();
    });
    
    updateSelectedList();
}

// Сохранение интересов
function saveInterests() {
    const checkedBoxes = document.querySelectorAll('.interest__check:checked');
    selectedInterests = Array.from(checkedBoxes).map(box => ({
        text: box.labels[0].textContent.trim(),
        timestamp: new Date().toISOString()
    }));

    localStorage.setItem('selectedInterests', JSON.stringify(selectedInterests));
    alert('Интересы сохранены!');
}

// Обновление списка выбранных интересов
function updateSelectedList() {
    const selectedList = document.getElementById('selectedList');
    const checkedBoxes = document.querySelectorAll('.interest__check:checked');

    selectedList.innerHTML = '';
    checkedBoxes.forEach(box => {
        const interestText = box.labels[0].textContent.trim();
        const li = document.createElement('li');
        li.textContent = interestText;
        selectedList.appendChild(li);
    });
}