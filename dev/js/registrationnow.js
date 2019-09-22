//============點擊立即註冊=================
$("#register_fast").click(function () {
    let mem_id = Math.floor(Math.random() * 10000000);
    let mem_name = Math.floor(Math.random() * 1000);
    // console.log(mem_id ,'dahjaksdhkjasdhhjk');
    var xhr = new XMLHttpRequest();
    xhr.onload = function () {
        if (xhr.status == 200) {
            //..................取回server端回傳的使用者資料
            if (xhr.responseText.indexOf("sysError") != -1) {
                alertify.alert("系統異常,請通知系統維護人員");
            } else if (xhr.responseText.indexOf("沒有票喔") != -1) {
            } else {
                console.log(xhr.responseText);
                let mem_no = JSON.parse(xhr.responseText);
                sessionStorage['member_no'] =null;
                sessionStorage['member_no'] = mem_no.member_no;
                $('#lightBox').css('display', 'none');
                alertify.alert("快速註冊成功！");
            }
        } else {
            alertify.alert(xhr.status);
        }
    }
    xhr.open("post", "php/registrationnow.php", true);
    xhr.setRequestHeader("content-type", "application/x-www-form-urlencoded");
    var data_info = `mem_id=${mem_id}&mem_name=${mem_name}`;
    xhr.send(data_info);
});