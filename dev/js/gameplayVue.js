localStorage['member_useticket'] = null;
let memTicket = [];
var ticketScore;

getTicket();
function getTicket() {
    let ticketsPick = sessionStorage['member_no'];
    console.log(ticketsPick);

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
    var data_info = `mem_no=${ticketsPick}`;
    xhr.send(data_info);

    if (ticketsPick) {
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
                                        alert("沒有票喔！快去買票！立刻幫您跳轉！");
                                        window.location.href = 'ticket.html';
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

    } else {
        alert('沒有登入喔！立刻幫您跳轉！');
        window.location.href = 'ticket.html';
        return;

    }
}
function showTicket(jsonStr) {
    let ticket = JSON.parse(jsonStr);
    let forticket = new Array;

    for (let i in ticket) {
        forticket = new Array;
        let index = 0;
        for (let j in ticket[i]) {
            // console.log(ticket[i][j]);
            if(j =='team_name' & !ticket[i][j]){
                ticket[i][j] = '無隊伍';
                // console.log(ticket[i][j],'這是什麼');
            }
            forticket[index] = (ticket[i][j]);
            index++;

        }
        memTicket[i] = forticket;
        // console.log('確認',memTicket);
    }
    // console.log(memTicket);
    if (memTicket[0][2]) {
        localStorage['member_useticket'] = memTicket[0][2];
    }
    // pushticket();
};

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
                console.log(xhr.responseText);
            }
        } else {
            alert(xhr.status);
        }
    }
    xhr.open("post", "php/getuseticket.php", true);
    xhr.setRequestHeader("content-type", "application/x-www-form-urlencoded");
    var data_info = `pickticket=${localStorage['member_useticket']}`;
    xhr.send(data_info);
}


// 設定門票
function setTicket(jsonStr) {
    let ticket = JSON.parse(jsonStr);
    console.log(ticket.mission_no, localStorage['member_useticket'], '0000');
    document.querySelector('.ticket_name p').innerHTML = ticket.member_name;
    document.querySelector('.ticket_img img').src = ticket.image_source;
    document.querySelector('.ticket_team p').innerHTML = ticket.team_name;
    ticketScore = ticket.bounty;
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
                alert("獲取任務異常,請通知系統維護人員");
            } else if (xhr.responseText.indexOf("loginError") != -1) {
                alert("帳密錯誤");
            } else {
                let missinName = JSON.parse(xhr.responseText);
                let section_titleText = document.getElementsByClassName('section_title');

                let missinDiv = document.querySelectorAll('.progress_box');
                for (i = 0; i < missinName.length; i++) {
                    console.log(section_titleText, '+++++');
                    for (let j = 0; j < section_titleText.length; j++) {
                        if (section_titleText[j].innerHTML == missinName[i].equ_name) {
                            section_titleText[j].innerHTML += '(任務)';
                        }
                    }
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
        var data_info = `mission_no=0&titket=${localStorage['member_useticket']}`;
        console.log('這邊嗎？');
    } else {
        var data_info = `mission_no=${mission_no}&titket=${localStorage['member_useticket']}`;
        console.log(mission_no, '這是什麼');
    }
    xhr.send(data_info);
}


//下方為處理登入後資料部分

let demo_scaninner = document.querySelectorAll('.demo_scaninner .btn');
for (let i = 0; i < demo_scaninner.length; i++) {
    demo_scaninner[i].addEventListener('click', addPointsCheck, false);
}
var facilityPointsCheck = 0;
function addPointsCheck(value) {
    // console.log(value.length);
    if (value.length > 2) {
        switch (value) {
            case 'redeem_product_status':
                console.log('redeem_product_status');
                facilityPoint('商店', 'redeem_product_status');
                if (facilityPointsCheck * 1) {
                    facilityPointsCheck = 0;
                }else{
                    alert('要超過６００分才能換商品喔！');
                }
                break;
            case 'waterslide':
                console.log('waterslide');
                addPoint('滑水道', 'waterslide');
                break;
            case 'swivel_chair':
                console.log('swivel_chair');
                addPoint('旋轉椅', 'swivel_chair');
                break;
            case 'pirate_ship':
                console.log('pirate_ship');
                addPoint('海盜船', 'pirate_ship');
                break;
            case 'entrance_status':
                console.log('entrance_status');
                facilityPoint('入口', 'entrance_status');
                break;
            case 'roller_coaster':
                console.log('roller_coaster');
                addPoint('雲霄飛車', 'roller_coaster');
                break;
            case 'carousel':
                console.log('carousel');
                addPoint('旋轉木馬', 'carousel');
                break;
            case 'ferris_wheel':
                console.log('ferris_wheel');
                addPoint('摩天輪', 'ferris_wheel');
                break;
            case 'exit_status':
                console.log('exit_status');
                facilityPoint('出口', 'exit_status');
                break;
            default:
                break;
        }
    } else {

        console.log($(this).prev().prev().text());
        switch ($(this).prev().prev().text().replace('(任務)', '').replace('(達成)', '').replace('(玩過囉))', '')) {
            case '商店':
                console.log('redeem_product_status');
                facilityPoint($(this).prev().prev().text(), 'redeem_product_status');
                if (facilityPointsCheck * 1) {
                    $(this).prev().prev().text($(this).prev().prev().text() + '(完成)');
                    facilityPointsCheck = 0;
                }else{
                    alert('要超過６００分才能換商品喔！');
                }
                break;
            case '滑水道':
                console.log('waterslide');
                addPoint($(this).prev().prev().text().replace('(任務)', '').replace('(達成)', ''), 'waterslide');
                break;
            case '旋轉椅':
                console.log('swivel_chair');
                addPoint($(this).prev().prev().text().replace('(任務)', '').replace('(達成)', ''), 'swivel_chair');
                break;
            case '海盜船':
                console.log('pirate_ship');
                addPoint($(this).prev().prev().text().replace('(任務)', '').replace('(達成)', ''), 'pirate_ship');
                break;
            case '入口':
                console.log('entrance_status');
                facilityPoint($(this).prev().prev().text(), 'entrance_status');
                $(this).prev().prev().text($(this).prev().prev().text() + '(進場)');
                break;
            case '雲霄飛車':
                console.log('roller_coaster');
                addPoint($(this).prev().prev().text().replace('(任務)', '').replace('(達成)', ''), 'roller_coaster');
                break;
            case '旋轉木馬':
                console.log('carousel');
                addPoint($(this).prev().prev().text().replace('(任務)', '').replace('(達成)', ''), 'carousel');
                break;
            case '摩天輪':
                console.log('ferris_wheel');
                addPoint($(this).prev().prev().text().replace('(任務)', '').replace('(達成)', ''), 'ferris_wheel');
                break;
            case '出口':
                console.log('exit_status');
                facilityPoint($(this).prev().prev().text(), 'exit_status');
                outLand();
                break;
            default:
                break;
        }
        if($(this).prev().prev().text().indexOf('(任務)') != -1){
            $(this).prev().prev().text($(this).prev().prev().text().replace('(任務)', '(達成)'));
        }else if($(this).prev().prev().text().indexOf('(達成)') != -1){
        }else if($(this).prev().prev().text().indexOf('入口') != -1){
        }else if($(this).prev().prev().text().indexOf('商店') != -1){
        }else if($(this).prev().prev().text().indexOf('出口') != -1){
        }else{
            $(this).prev().prev().text($(this).prev().prev().text() + '(玩過囉)');
        }
    }
}

function addPoint(str, eStr) {
    var xhr = new XMLHttpRequest();
    xhr.onload = function () {
        if (xhr.status == 200) {
            //..................取回server端回傳的使用者資料
            if (xhr.responseText.indexOf("sysError") != -1) {
                alert("系統異常,請通知系統維護人員");
            } else if (xhr.responseText.indexOf("還沒進場喔！") != -1) {
                alert("還沒進場喔！");
            } else {
                console.log(xhr.responseText);
                ticketScore = parseInt(ticketScore);
                ticketScore += parseInt(xhr.responseText);
                document.querySelector('.ticket_reward p').innerHTML = '$' + ticketScore;
            }
        } else {
            alert(xhr.status);
        }
    }
    xhr.open("post", "php/gameplayaddPoints.php", true);
    xhr.setRequestHeader("content-type", "application/x-www-form-urlencoded");
    var data_info = `str=${str}&eStr=${eStr}&ticket=${localStorage['member_useticket']}`;
    xhr.send(data_info);
}

function facilityPoint(str, eStr) {
    var xhr = new XMLHttpRequest();
    xhr.onload = function () {
        if (xhr.status == 200) {
            //..................取回server端回傳的使用者資料
            if (xhr.responseText.indexOf("sysError") != -1) {
                alert("系統異常,請通知系統維護人員");
            } else if (xhr.responseText.indexOf("還沒進場喔！") != -1) {
                alert("還沒進場喔！");
            } else {
                console.log(xhr.responseText);
                facilityPointsCheck = xhr.responseText * 1;
            }
        } else {
            alert(xhr.status);
        }
    }
    xhr.open("post", "php/getfacilityPoint.php", false);
    xhr.setRequestHeader("content-type", "application/x-www-form-urlencoded");
    var data_info = `str=${str}&eStr=${eStr}&ticket=${localStorage['member_useticket']}&ticketScore=${ticketScore}`;
    xhr.send(data_info);
}

function outLand(){
    var xhr = new XMLHttpRequest();
    xhr.onload = function () {
        if (xhr.status == 200) {
            //..................取回server端回傳的使用者資料
            if (xhr.responseText.indexOf("sysError") != -1) {
                alert("系統異常,請通知系統維護人員");
            } else if (xhr.responseText.indexOf("還沒進場喔！") != -1) {
                alert("還沒進場喔！");
            } else {
                console.log(xhr.responseText);
                facilityPointsCheck = xhr.responseText * 1;
            }
        } else {
            alert(xhr.status);
        }
    }
    xhr.open("post", "php/getfacilityPoint.php", false);
    xhr.setRequestHeader("content-type", "application/x-www-form-urlencoded");
    var data_info = `str=${str}&eStr=${eStr}&ticket=${localStorage['member_useticket']}&ticketScore=${ticketScore}`;
    xhr.send(data_info);
}