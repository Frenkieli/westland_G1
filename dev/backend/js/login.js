var uPattern = /^[a-zA-Z0-9_-]{4,16}$/;

// var pPattern = /^.*(?=.{6,})(?=.*\d)(?=.*[A-Z])(?=.*[a-z]).*$/;

let memId = document.getElementById('memId');
let memPa = document.getElementById('memPa');
let login = document.getElementById('login');


function checkmemId() {
    if (memId.value.search(uPattern)) {
        console.log('不行');
    } else {
        console.log('行');
    }
}
function checkmemPa() {
    if (memPa.value.search(uPattern)) {
        console.log('不行');
    } else {
        console.log('行');
    }
}
function loginEven() {
    let memIdValue = memId.value;
    let memPaValue = memPa.value;

    //使用Ajax回server端去做登入的工作
    var xhr = new XMLHttpRequest();
    xhr.onload = function () {
        if (xhr.status == 200) {
            //..................取回server端回傳的使用者資料
            if (xhr.responseText.indexOf("sysError") != -1) {
                alert("系統異常,請通知系統維護人員");
            } else if (xhr.responseText.indexOf("loginError") != -1) {
                alert("帳密錯誤");
            }else{
                alert(xhr.responseText + '歡迎你！');
                localStorage['admin_name'] = xhr.responseText;
                window.location.href = 'backend.html';
            }
        } else {
            alert(xhr.status);
        }
    }

    xhr.open("post", "php/login.php", true);
    xhr.setRequestHeader("content-type", "application/x-www-form-urlencoded");

    var data_info = `admin_id=${memIdValue}&admin_psw=${memPaValue}`;
    xhr.send(data_info);
}

login.addEventListener('click', loginEven, false);
memPa.addEventListener('change', checkmemPa, false);
memId.addEventListener('change', checkmemId, false);