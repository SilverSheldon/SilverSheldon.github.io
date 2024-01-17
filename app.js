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
    if (type === "file") file_v = e.target.files[0];
    if (!title_v || !content_v || !file_v) {
        tg.MainButton.hide(); // Скрываем кнопку, если поля не заполнены
    } else {
        console.log("here");
        let result = {
            title: title.value,
            content: content.value,
            file_info: {
                name: file.files[0].name,
                type: file.files[0].type,
                size: file.files[0].size
            }
        };
        console.log(result, JSON.stringify(result));
        tg.MainButton.show(); // Показываем кнопку, если поля заполнены
    }
}

title.addEventListener("change", (e) => updateMainButtonState(e, "title"));
content.addEventListener("change", (e) => updateMainButtonState(e, "content"));
file.addEventListener("change", (e) => updateMainButtonState(e, "file"));

// Обработчик клика по главной кнопке
Telegram.WebApp.onEvent("mainButtonClicked", function() {
    const formData = new FormData();
    formData.append("title", title_v);
    formData.append("content", content_v);
    formData.append("file", file_v);

    console.log("HERE!!");
    if (title.value && content.value && file.files[0]) {
        // let result = {
        //     title: title.value,
        //     content: content.value,
        //     file_info: {
        //         name: file.files[0].name,
        //         type: file.files[0].type,
        //         size: file.files[0].size
        //     }
        // };
        // Отправляем данные в бота
        tg.sendData(JSON.stringify(formData));
        tg.close();
    }
  });

// Первоначальная проверка состояния кнопки
updateMainButtonState();
