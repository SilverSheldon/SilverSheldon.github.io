let tg = window.Telegram.WebApp;
tg.expand(); // Расширяем веб-приложение

// Настройка внешнего вида главной кнопки
tg.MainButton.text = "Отправить"; // Изменяем текст кнопки
tg.MainButton.textColor = "#FFFFFF"; // Цвет текста кнопки
tg.MainButton.color = "#2cab37"; // Цвет фона кнопки

// Обновляем состояние главной кнопки на основе ввода пользователя
function updateMainButtonState() {
    let title = document.getElementById("postTitle").value;
    let content = document.getElementById("postContent").value;
    if (!title || !content) {
        tg.MainButton.hide(); // Если поля не заполнены, скрываем кнопку
    } else {
        tg.MainButton.show(); // Если поля заполнены, показываем кнопку
    }
}

// Слушаем изменения в полях ввода
document.getElementById("postTitle").addEventListener("input", updateMainButtonState);
document.getElementById("postContent").addEventListener("input", updateMainButtonState);

// Функция для отправки данных
function sendDataToBot() {
    let title = document.getElementById("postTitle").value;
    let content = document.getElementById("postContent").value;

    // Формируем объект с данными
    let result = {
        title: title,
        content: content
    };
    
    // Отправляем данные в бота
    tg.sendData(JSON.stringify(result));
}

// Обработчик нажатия на главную кнопку
Telegram.WebApp.onEvent('mainButtonClicked', sendDataToBot);
