let tg = window.Telegram.WebApp;
tg.expand(); // Расширяем веб-приложение

// Настройка внешнего вида главной кнопки
tg.MainButton.text = "Отправить"; // Изменяем текст кнопки
//tg.MainButton.setText("Создать пост"); // изменяем текст кнопки иначе
tg.MainButton.textColor = "#FFFFFF"; // Цвет текста кнопки #F55353
tg.MainButton.color = "#2cab37"; // Цвет самой кнопки (бэкграунд) #143F6B
// tg.MainButton.setParams({"color": "#143F6B"}); // так изменяются все параметры

let title = document.getElementById("title");
let content = document.getElementById("content");
let file = document.getElementById("file");

// Функция обновления состояния главной кнопки
function updateMainButtonState() {
    console.log(title.value, content.value, file.files[0]);
    if (!title.value || !content.value || !file.files[0]) {
        tg.MainButton.hide(); // Скрываем кнопку, если поля не заполнены
    } else {
        console.log("here");
        tg.MainButton.show(); // Показываем кнопку, если поля заполнены
    }
}

window.addEventListener('load', () => {
    title.addEventListener("change", updateMainButtonState);
    content.addEventListener("change", updateMainButtonState);
    file.addEventListener("change", updateMainButtonState);
})

// Обработчик клика по главной кнопке
Telegram.WebApp.onEvent("mainButtonClicked", function() {
    // Проверяем, что все поля заполнены
    if (title && content && file) {
        let result = {
            title: title,
            content: content,
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
