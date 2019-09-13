localStorage['member_id'] = 'rty321';

let memTicket = [];

getTicket();
function getTicket() {
    let ticketsPick = localStorage['member_id'];
    //使用Ajax回server端去做登入的工作
    var xhr = new XMLHttpRequest();
    xhr.onload = function () {
        if (xhr.status == 200) {
            //..................取回server端回傳的使用者資料
            if (xhr.responseText.indexOf("sysError") != -1) {
                alert("系統異常,請通知系統維護人員");
            } else if (xhr.responseText.indexOf("loginError") != -1) {
                alert("帳密錯誤");
            } else {
                showTicket(xhr.responseText);
            }
        } else {
            alert(xhr.status);
        }
    }
    xhr.open("post", "php/getMemberticket_JSON.php", true);
    xhr.setRequestHeader("content-type", "application/x-www-form-urlencoded");
    var data_info = `mem_id=${ticketsPick}`;
    xhr.send(data_info);
}
function showTicket(jsonStr) {
    let ticket = JSON.parse(jsonStr);
    let forticket = new Array;

    for (let i in ticket) {
        forticket = new Array;
        let index = 0;
        for (let j in ticket[i]) {
            // console.log(ticket[i][j]);
            forticket[index] = (ticket[i][j]);
            index++;

        }
        memTicket[i] = forticket;
    }
    console.log(memTicket);
    // pushticket();
};

window.addEventListener('load', () => {
    new Vue({
        el: '#section_pick',
        data: {
            tickets: memTicket,
        },
        methods: {
            change(e) {
                let check = confirm('真的要選擇第' + e.target.value + '張票嗎？');
                if (check) {
                    this.tickets[0][2] = '有';
                    console.log(this.tickets[0][2]);
                    var xhr = new XMLHttpRequest();
                    xhr.onload = function () {
                        if (xhr.status == 200) {
                            //..................取回server端回傳的使用者資料
                            if (xhr.responseText.indexOf("sysError") != -1) {
                                alert("系統異常,請通知系統維護人員");
                            } else if (xhr.responseText.indexOf("loginError") != -1) {
                                alert("帳密錯誤");
                            } else {
                                console.log(xhr.responseText);
                                document.getElementById('section_pick').remove();
                            }
                        } else {
                            alert(xhr.status);
                        }
                    }
                    xhr.open("post", "php/updatepickticket.php", true);
                    xhr.setRequestHeader("content-type", "application/x-www-form-urlencoded");
                    var data_info = `pickticket=${e.target.value}&member_no=${this.tickets[0][3]}`;
                    xhr.send(data_info);

                }
            },
        },
    });
}, false);


