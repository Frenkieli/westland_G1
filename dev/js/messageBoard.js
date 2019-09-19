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
            var messagesList = document.getElementById('messages');
            //從messages表單往後放
            messagesList.innerHTML += `<div class="message_container equ_no${displayMessage[i].equ_no}" id="messageNo_${displayMessage[i].message_no}"><div class="who"><div id="who_name" class="name name_memberNo_${displayMessage[i].member_no}"></div><img id="who_pic" class="pic pic_memberNo_${displayMessage[i].member_no}" src=""><div class="frame"><div id="who_teamName" class="teamName team_memberNo_${displayMessage[i].member_no}"></div></div><div id="who_bounty" class="bounty bounty_memberNo_${displayMessage[i].member_no}"></div></div><div class="message_box" id="message_box"><div id="message" style="border-radius:10px;">${displayMessage[i].equ_message}</div><input type="button" class="btn-report" value="檢舉" id="report" name="${displayMessage[i].message_no}"></div><div class="mascot mascot_memberNo_${displayMessage[i].member_no}"></div>`;
        };
    }
}
,false);