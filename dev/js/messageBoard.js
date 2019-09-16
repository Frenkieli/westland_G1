window.addEventListener('load',function (){ 
    //取得資料庫留言
    let xhr = new XMLHttpRequest();
    xhr.onload = function () {
        if (xhr.status == 200) {//狀態200則回應文字
            howManyStar(xhr.responseText);
        }
        else {
            alert(xhr.status);//顯示狀態
        }
    } 
    let url="php/getMessageBoard.php";
        xhr.open('post', url, true);
        xhr.send(null);

    function howManyStar(jsonStr) {
        let displayMessage =JSON.parse(jsonStr);
        // console.log(displayMessage);
        for (let i = displayMessage.length -1; i >= 0; i--) {
            let AddMessages =displayMessage[i].equ_message;
            console.log(AddMessages);

            var messagesList = document.getElementById('messages');
            //從messages表單往後放
            messagesList.innerHTML += '<div class="message_container"><img class="who" src="images/information/who.svg" alt="頭像"><div id="message_box"><div id="message" style="border-radius:10px;">' + AddMessages + '</div><input type="button" name="report" class="btn-report" value="檢舉" id="report"></div></div>';
        };
    }
}
,false);