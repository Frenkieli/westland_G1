localStorage['member_id'] = 'rty321';
localStorage['member_useticket'] = null;

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
    if (memTicket[0][2]) {
        localStorage['member_useticket'] = memTicket[0][2];
    }
    // pushticket();
};

window.addEventListener('load', () => {
    new Vue({
        el: '.app',
        data: {
            tickets: memTicket,
            mainticket: [],
        },
        methods: {
            onload() {
                if (memTicket[0][2]) {
                    getUseTicket();
                }
            },
            change(e) {
                let check = confirm('真的要選擇第' + e.target.value + '張票嗎？');
                if (check) {
                    // this.tickets[0][2] = '有';
                    // console.log(this.tickets[0][2]);
                    var xhr = new XMLHttpRequest();
                    xhr.onload = function () {
                        if (xhr.status == 200) {
                            //..................取回server端回傳的使用者資料
                            if (xhr.responseText.indexOf("sysError") != -1) {
                                alert("系統異常,請通知系統維護人員");
                            } else if (xhr.responseText.indexOf("沒有票喔") != -1) {
                                alert("沒有票喔！快去買票！");
                            } else {
                                localStorage['member_useticket'] = e.target.value;
                                document.getElementById('section_pick').remove();
                                setTicket(xhr.responseText);
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
        beforeMount() {
            this.onload();
        },
    });
}, false);

// 設定使用的門票
function getUseTicket() {
    // this.tickets[0][2] = '有';
    // console.log(this.tickets[0][2]);
    var xhr = new XMLHttpRequest();
    xhr.onload = function () {
        if (xhr.status == 200) {
            //..................取回server端回傳的使用者資料
            if (xhr.responseText.indexOf("sysError") != -1) {
                alert("系統異常,請通知系統維護人員");
            } else if (xhr.responseText.indexOf("loginError") != -1) {
                alert("帳密錯誤");
            } else {
                setTicket(xhr.responseText);
            }
        } else {
            alert(xhr.status);
        }
    }
    xhr.open("post", "php/getuseticket.php", true);
    xhr.setRequestHeader("content-type", "application/x-www-form-urlencoded");
    var data_info = `pickticket=${memTicket[0][2]}`;
    xhr.send(data_info);
}


// 設定門票
function setTicket(jsonStr) {
    let ticket = JSON.parse(jsonStr);
    console.log(ticket);
    document.querySelector('.ticket_name p').innerHTML = ticket.member_name;
    document.querySelector('.ticket_img img').src = ticket.image_source;
    document.querySelector('.ticket_team p').innerHTML = ticket.team_name;
    document.querySelector('.ticket_reward p').innerHTML = '$' + ticket.bounty;
    document.querySelector('.ticket_mascot').src = ticket.mascot_image;
    if (ticket.mission_no) {
        setTicketmisiion(false, ticket.mission_no);
    } else {
        setTicketmisiion(true);
    }
}

// 獲得和設定進行中任務
function setTicketmisiion(missionNum, mission_no) {

    var xhr = new XMLHttpRequest();
    xhr.onload = function () {
        if (xhr.status == 200) {
            //..................取回server端回傳的使用者資料
            if (xhr.responseText.indexOf("sysError") != -1) {
                alert("系統異常,請通知系統維護人員");
            } else if (xhr.responseText.indexOf("loginError") != -1) {
                alert("帳密錯誤");
            } else {
                let missinName = JSON.parse(xhr.responseText);
                console.log(missinName);
                let missinDiv = document.querySelectorAll('.progress_box');
                for (i = 0; i < missinName.length; i++) {
                    console.log(missinName[i].equ_name);
                    missinDiv[i].innerHTML = missinName[i].equ_name;
                }
            }
        } else {
            alert(xhr.status);
        }
    }
    xhr.open("post", "php/getusetitcketmission.php", true);
    xhr.setRequestHeader("content-type", "application/x-www-form-urlencoded");
    if (missionNum) {
        var data_info = `mission_no=0&titket=${memTicket[0][2]}`;
        // console.log('這邊嗎？');
    } else {
        var data_info = `mission_no=${mission_no}&titket=${memTicket[0][2]}`;
        // console.log(mission_no, '這是什麼');
    }
    xhr.send(data_info);

}