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

let title_v = title.value;
let content_v = content.value;
let file_v = file.files[0];

// Функция обновления состояния главной кнопки
function updateMainButtonState(e, type) {
    if (type === "title") title_v = e.target.value;
    if (type === "content") content_v = e.target.value;
    if (type === "file") {
        const reader = new FileReader();
        reader.readAsDataURL(e.target.files[0]);
        reader.onload = (e) => {
          console.log(e.target.result);
          file_v = e.target.result;
        };
    }
    
    if (!title_v || !content_v || !file.files[0]) {
        tg.MainButton.hide(); // Скрываем кнопку, если поля не заполнены
    } else {
        tg.MainButton.show(); // Показываем кнопку, если поля заполнены
    }
}

title.addEventListener("change", (e) => updateMainButtonState(e, "title"));
content.addEventListener("change", (e) => updateMainButtonState(e, "content"));
file.addEventListener("change", (e) => updateMainButtonState(e, "file"));

Telegram.WebApp.onEvent("mainButtonClicked", function() {
    if (title.value && content.value && file.files[0]) {
        const reader = new FileReader();
        reader.readAsDataURL(file.files[0]);
        reader.onload = (e) => {
            let result = {
                title: title.value,
                content: content.value,
                file_info: e.target.result
            };
            tg.sendData(JSON.stringify(result));
            tg.close();
        };
    }
  });

// Первоначальная проверка состояния кнопки
updateMainButtonState();
