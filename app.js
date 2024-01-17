let tg = window.Telegram.WebApp;
tg.expand();
tg.MainButton.text = "Отправить"; // изменяем текст кнопки
//tg.MainButton.setText("Создать пост"); // изменяем текст кнопки иначе
tg.MainButton.textColor = "#FFFFFF"; // Цвет текста кнопки #F55353
tg.MainButton.color = "#2cab37"; // Цвет самой кнопки (бэкграунд) #143F6B
// tg.MainButton.setParams({"color": "#143F6B"}); // так изменяются все параметры

//tg.MainButton.hide();
// Если форма незаполнена - скрывать главную кнопку+

let title = document.getElementById("title").value;
let content = document.getElementById("content").value;

if(!title || !content){
    tg.MainButton.hide();
} else {
    tg.MainButton.show();
}

let result = {
    title: title,
    content: content
}

Telegram.WebApp.onEvent("mainButtonClicked", function() {
    tg.sendData(JSON.stringify(result));
});