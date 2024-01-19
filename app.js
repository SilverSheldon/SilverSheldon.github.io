let tg = window.Telegram.WebApp;
Telegram.WebApp.ready();
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

let title_v = title.value;
let content_v = content.value;
let file_v = file.files[0];

// Функция обновления состояния главной кнопки
function updateMainButtonState(e, type) {
    if (type === "title") title_v = e.target.value;
    if (type === "content") content_v = e.target.value;
    if (type === "file") file_v = URL.createObjectURL(e.target.files[0]);

    if (!title_v || !content_v || !file.files[0]) {
        tg.MainButton.hide(); // Скрываем кнопку, если поля не заполнены
    } else {
        tg.MainButton.show(); // Показываем кнопку, если поля заполнены
    }
}

title.addEventListener("input", (e) => updateMainButtonState(e, "title"));
content.addEventListener("input", (e) => updateMainButtonState(e, "content"));
file.addEventListener("change", (e) => updateMainButtonState(e, "file"));

Telegram.WebApp.onEvent("mainButtonClicked", function() {
    if (title.value && content.value && file.files[0]) {
        let result = {
            title: title.value,
            content: content.value,
            file_url: file_v
        };
        tg.sendData(JSON.stringify(result));
        tg.close();
    }
  });

// Первоначальная проверка состояния кнопки
updateMainButtonState();
