let tg = window.Telegram.WebApp;
tg.expand(); // Расширяем веб-приложение

// Настройка внешнего вида главной кнопки
tg.MainButton.text = "Отправить"; // Изменяем текст кнопки
//tg.MainButton.setText("Создать пост"); // изменяем текст кнопки иначе
tg.MainButton.textColor = "#FFFFFF"; // Цвет текста кнопки #F55353
tg.MainButton.color = "#2cab37"; // Цвет самой кнопки (бэкграунд) #143F6B
// tg.MainButton.setParams({"color": "#143F6B"}); // так изменяются все параметры

// Функция обновления состояния главной кнопки
function updateMainButtonState() {
    let title = document.getElementById("title").value;
    let content = document.getElementById("content").value;
    let file = document.getElementById("file").files[0];

    if (!title || !content || !file) {
        tg.MainButton.hide(); // Скрываем кнопку, если поля не заполнены
    } else {
        tg.MainButton.show(); // Показываем кнопку, если поля заполнены
    }
}

// Добавляем слушатели на изменения полей формы
document.getElementById("title").addEventListener("input", updateMainButtonState);
document.getElementById("content").addEventListener("input", updateMainButtonState);
document.getElementById("file").addEventListener("change", updateMainButtonState);

// Обработчик клика по главной кнопке
Telegram.WebApp.onEvent("mainButtonClicked", function() {
    let title = document.getElementById("title").value;
    let content = document.getElementById("content").value;
    let file = document.getElementById("file").files[0];

    // Проверяем, что все поля заполнены
    if (title && content && file) {
        let result = {
            title: title,
            content: content,
            // Информация о файле
            file_info: {
                name: file.name,
                type: file.type,
                size: file.size
            }
        };

        // Отправляем данные в бота
        tg.sendData(JSON.stringify(result));
    }
});

// Первоначальная проверка состояния кнопки
updateMainButtonState();
