// Переменные для отслеживания состояния игры
let deadMoles = 0;
let missedHits = 0;

// Функция для получения элемента лунки по индексу
function getHole(index) {
    return document.getElementById(`hole${index}`);
}

// Добавляем обработчики кликов ко всем лункам
for (let i = 1; i <= 9; i++) {
    const hole = getHole(i);
    
    hole.addEventListener('click', function() {
        // Проверяем, есть ли крот в лунке
        if (this.classList.contains('hole_has-mole')) {
            deadMoles++;
            document.getElementById('dead').textContent = deadMoles;
            
            // Проверяем условие победы
            if (deadMoles >= 10) {
                alert('Поздравляем! Вы победили!');
                resetGame();
            }
        } else {
            missedHits++;
            document.getElementById('lost').textContent = missedHits;
            
            // Проверяем условие проигрыша
            if (missedHits >= 5) {
                alert('Игра окончена! Вы проиграли.');
                resetGame();
            }
        }
    });
}

// Функция для сброса игры
function resetGame() {
    deadMoles = 0;
    missedHits = 0;
    document.getElementById('dead').textContent = '0';
    document.getElementById('lost').textContent = '0';
}