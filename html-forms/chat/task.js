// class MonopolyChatBot {
//     constructor() {
//         this.botResponses = [
//             "Мы вас слушаем... когда захотим.",
//             "Что вам нужно? Мы очень заняты тем, что зарабатываем деньги.",
//             "Повторите, я не особо обращал внимание.",
//             "Это бесплатно? Нет? Тогда платите за консультацию.",
//             "Мы лучшие, потому что другие проиграли. Что вы хотели?",
//             "У нас нет времени на ваши вопросы.",
//             "Монополия не спрашивает, монополия диктует условия."
//         ];
        
//         this.init();
//     }

//     init() {
//         document.addEventListener("DOMContentLoaded", () => {
//             this.chatWidget = document.querySelector('.chat-widget');
//             this.messagesContainer = document.getElementById('chat-widget__messages');
//             this.inputField = document.getElementById('chat-widget__input');
            
//             this.setupEventListeners();
//             this.addInitialBotMessage();
//         });
//     }

//     setupEventListeners() {
//         // Открытие чата по клику на бейдж
//         this.chatWidget.addEventListener('click', () => {
//             this.chatWidget.classList.add('chat-widget_active');
//         });

//         // Обработка отправки сообщения
//         this.inputField.addEventListener('keydown', (e) => {
//             if (e.code === 'Enter' && this.inputField.value.trim()) {
//                 this.handleUserMessage();
//             }
//         });
//     }

//     getCurrentTime() {
//         const now = new Date();
//         return now.toLocaleTimeString('ru-RU', {
//             hour: '2-digit',
//             minute: '2-digit'
//         });
//     }

//     addMessage(text, isClient = false) {
//         const messageHTML = `
//             <div class="message ${isClient ? 'message_client' : ''}">
//                 <div class="message__time">${this.getCurrentTime()}</div>
//                 <div class="message__text">${text}</div>
//             </div>
//         `;
        
//         this.messagesContainer.innerHTML += messageHTML;
//         this.scrollToBottom();
//     }

//     scrollToBottom() {
//         this.messagesContainer.scrollTop = this.messagesContainer.scrollHeight;
//     }

//     handleUserMessage() {
//         const userMessage = this.inputField.value.trim();
//         this.addMessage(userMessage, true);
//         this.inputField.value = '';
        
//         setTimeout(() => this.sendBotResponse(), Math.random() * 2000 + 1000);
//     }

//     sendBotResponse() {
//         const randomResponse = this.botResponses[
//             Math.floor(Math.random() * this.botResponses.length)
//         ];
//         this.addMessage(randomResponse);
//     }

//     addInitialBotMessage() {
//         this.addMessage("Здравствуйте! Мы лучшая компания в мире.");
//     }
// }

// // Инициализация чат-бота
// new MonopolyChatBot();


const botResponses = [
    "Добрый день!",
    "Сообщение от робота",
    "22:10 Добрый день!"
];

class ChatBot {
    constructor() {
        this.messagesContainer = document.getElementById('chat-widget__messages');
        this.inputField = document.getElementById('chat-widget__input');
        this.chatWidget = document.querySelector('.chat-widget');
        
        this.setupEventListeners();
        this.lastActivityTime = Date.now();
        this.inactivityTimeout = null;
    }

    setupEventListeners() {
        this.chatWidget.addEventListener('click', () => {
            this.chatWidget.classList.add('chat-widget_active');
        });

        this.inputField.addEventListener('keydown', (e) => {
            if (e.code === 'Enter' && this.inputField.value.trim()) {
                this.sendMessage(this.inputField.value);
                this.inputField.value = '';
            }
        });
    }

    sendMessage(text) {
        const time = new Date().toLocaleTimeString('ru-RU', { 
            hour: '2-digit', 
            minute: '2-digit' 
        });

        const messageHTML = `
            <div class="message message_client">
                <div class="message__time">${time}</div>
                <div class="message__text">${this.escapeHtml(text)}</div>
            </div>
        `;
        
        this.messagesContainer.innerHTML += messageHTML;
        this.scrollToBottom();

        setTimeout(() => this.sendBotResponse(), 500);
    }

    sendBotResponse() {
        const time = new Date().toLocaleTimeString('ru-RU', { 
            hour: '2-digit', 
            minute: '2-digit' 
        });
        
        const response = botResponses[Math.floor(Math.random() * botResponses.length)];
        
        const messageHTML = `
            <div class="message">
                <div class="message__time">${time}</div>
                <div class="message__text">${this.escapeHtml(response)}</div>
            </div>
        `;
        
        this.messagesContainer.innerHTML += messageHTML;
        this.scrollToBottom();
    }

    scrollToBottom() {
        this.messagesContainer.scrollTop = this.messagesContainer.scrollHeight;
    }

    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const chatBot = new ChatBot();
    
    const observer = new MutationObserver(() => {
        chatBot.scrollToBottom();
    });
    
    observer.observe(chatBot.messagesContainer, {
        childList: true,
        subtree: true
    });

    let timeoutId = null;

    function resetTimeout() {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
            const time = new Date().toLocaleTimeString('ru-RU', { 
                hour: '2-digit', 
                minute: '2-digit' 
            });
            
            const question = "Ещё думаете? У нас нет времени!";
            
            const messageHTML = `
                <div class="message">
                    <div class="message__time">${time}</div>
                    <div class="message__text">${chatBot.escapeHtml(question)}</div>
                </div>
            `;
            
            chatBot.messagesContainer.innerHTML += messageHTML;
            chatBot.scrollToBottom();
        }, 30000);
    }

    chatBot.inputField.addEventListener('input', resetTimeout);
    chatBot.chatWidget.addEventListener('click', resetTimeout);
});