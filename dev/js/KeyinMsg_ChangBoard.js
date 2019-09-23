function init() {
    let loginIsTure = sessionStorage['member_no']; //設置暫存變數
    if (loginIsTure) {
        // console.log(loginIsTure, '有撈到嗎?');
        let xhr = new XMLHttpRequest();
        xhr.onload = function () {
            if (xhr.status == 200) {
                // console.log(xhr.responseText);
                if (xhr.responseText.indexOf('沒票') != -1) {
                    // console.log('沒票喔');
                    $(`.name_login`).html(`尚未購票`);
                } else {
                    let display_MEM_MSG = JSON.parse(xhr.responseText);
                    // console.log(display_MEM_MSG, '裡面有什麼?');
                    $(`.name_login`).html(`${display_MEM_MSG.member_name}`);
                    $(`.pic_login`).attr('src', `${display_MEM_MSG.image_source}`);
                    // $(`.teamName_login`).html(`${display_MEM_MSG[loginIsTure -1].team_name}`);
                    $(`.bounty_login`).html(`$${display_MEM_MSG.bounty}`);
                }
            }
            else {
                window.alert(xhr.status);
            }
        }
        xhr.open("post", "php/newKeyinBoard.php", true);
        xhr.setRequestHeader("content-type", "application/x-www-form-urlencoded");
        var data_info = `mem_no=${loginIsTure}`;
        xhr.send(data_info);
    } else {
        return;
    }
}
window.addEventListener('load', init, false);