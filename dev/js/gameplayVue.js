localStorage['member_useticket'] = null;
localStorage['inoutCheck'] = 0;
localStorage['usegame'] = null;
localStorage['usegame'] = 1;
let memTicket = [];
var ticketScore;
var team_num;
var clientHeight = document.body.clientHeight;
// console.log(" 網頁可見區域高：" + document.body.clientHeight);
if (clientHeight < 770) {
    let playTicket = document.getElementsByClassName('playticket_ticket')[0];
    let demo_textbox = document.getElementsByClassName('demo_textbox');
    let demo_text = document.getElementsByClassName('demo_text');
    playTicket.style.display = "none";
    playTicket.style.transform = 'rotateY(90deg)';
    // demo_img.style.bottom = '0';
    // demo_img.style.right = '0';
    // demo_img.style.height = '100%';
    
    for (let i = 0; i < demo_textbox.length; i++) {
        demo_textbox[i].style.position = 'absolute';
        demo_textbox[i].style.top = '0px';
        demo_textbox[i].style.bottom = '0px';
        demo_textbox[i].style.left = '0px';
        demo_textbox[i].style.right = '0px';
        demo_textbox[i].style.width = '100%';
        demo_textbox[i].style.padding = '10px';
        demo_textbox[i].style.boxSizing = 'border-box';
        demo_textbox[i].style.backgroundColor = 'rgba(255,255,255, 0.7)';
        demo_textbox[i].style.color = '#000';
        demo_textbox[i].style.opacity = '0';
        demo_textbox[i].style.borderRadius = '20px';
        demo_textbox[i].style.transition = '0.2s';
        demo_text[i].style.backgroundColor ='rgba(255,255,255,0)';
        demo_text[i].addEventListener('mousemove', function () {
            demo_textbox[i].style.opacity = '1';
        }, false);
        demo_text[i].addEventListener('mouseout', function () {
            demo_textbox[i].style.opacity = '0';
        }, false);
    }
}

getTicket();
function getTicket() {
    let ticketsPick = sessionStorage['member_no'];
    // console.log(ticketsPick);

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
                        alertify.alert('選擇第' + e.target.value + '張票，入場前都可以跟機器人說換票喔！',
                            function () {
                                // this.tickets[0][2] = '有';
                                // console.log(this.tickets[0][2]);
                                var xhr = new XMLHttpRequest();
                                xhr.onload = function () {
                                    if (xhr.status == 200) {
                                        //..................取回server端回傳的使用者資料
                                        if (xhr.responseText.indexOf("sysError") != -1) {
                                            alertify.alert("系統異常,請通知系統維護人員");
                                        } else if (xhr.responseText.indexOf("沒有票喔") != -1) {
                                            alertify.alert("沒有票喔！快去買票！立刻幫您跳轉！", function () { window.location.href = 'ticket.html'; });
                                        } else {
                                            localStorage['member_useticket'] = e.target.value;
                                            document.getElementById('section_pick').remove();
                                            setTicket(xhr.responseText);
                                        }
                                    } else {
                                        alertify.alert(xhr.status);
                                    }
                                }
                                xhr.open("post", "php/updatepickticket.php", true);
                                xhr.setRequestHeader("content-type", "application/x-www-form-urlencoded");
                                var data_info = `pickticket=${e.target.value}&member_no=${memTicket[0][3]}`;
                                xhr.send(data_info);
                                alertify.success('選擇第' + e.target.value + '張票');
                            });
                    },
                },
                beforeMount() {
                    this.onload();
                },
            });
        }, false);

    } else {
        alertify.alert('沒有登入喔！立刻幫您跳轉！', function () {
            $('#lightBox').css('display', 'block');
        });
        return;
    }

    //使用Ajax回server端去做登入的工作
    var xhr = new XMLHttpRequest();
    xhr.onload = function () {
        if (xhr.status == 200) {
            //..................取回server端回傳的使用者資料
            if (xhr.responseText.indexOf("sysError") != -1) {
                alertify.alert("系統異常,請通知系統維護人員");
            } else if (xhr.responseText.indexOf("沒有票喔") != -1) {
                alertify.alert("沒有可用的票囉！立刻幫您跳轉至買票頁面！", function () { window.location.href = 'ticket.html'; });
            } else {
                showTicket(xhr.responseText);
            }
        } else {
            alertify.alert(xhr.status);
        }
    }
    xhr.open("post", "php/getMemberticket_JSON.php", false);
    xhr.setRequestHeader("content-type", "application/x-www-form-urlencoded");
    var data_info = `mem_no=${ticketsPick}`;
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
            if (j == 'team_name' & !ticket[i][j]) {
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
                alertify.alert("系統異常,請通知系統維護人員");
            } else if (xhr.responseText.indexOf("loginError") != -1) {
                alertify.alert("帳密錯誤");
            } else {
                setTicket(xhr.responseText);
                // console.log(xhr.responseText);
            }
        } else {
            alertify.alert(xhr.status);
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
    // console.log(ticket, localStorage['member_useticket'], '0000');
    setTimeout(() => {
        team_num = ticket.team_no;
        // console.log(team_num);
    }, 100);
    document.querySelector('.ticket_name p').innerHTML = ticket.member_name;
    document.querySelector('.ticket_img img').src = ticket.image_source;
    if (ticket.team_name) {
        document.querySelector('.ticket_team p').innerHTML = ticket.team_name;
    } else {
        document.querySelector('.ticket_team').remove();
    }
    ticketScore = ticket.bounty;
    document.querySelector('.ticket_reward p').innerHTML = '$' + ticket.bounty;
    document.querySelector('.ticket_mascot').src = ticket.mascot_image;
    localStorage['missionDone'] = ticket.missionDone;
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
                alertify.alert("獲取任務異常,請通知系統維護人員");
            } else if (xhr.responseText.indexOf("loginError") != -1) {
                alertify.alert("帳密錯誤");
            } else {
                let missinName = JSON.parse(xhr.responseText);
                let section_titleText = document.getElementsByClassName('section_title');

                let missinDiv = document.querySelectorAll('.progress_box');
                for (i = 0; i < missinName.length; i++) {
                    // console.log(section_titleText, '+++++');
                    for (let j = 0; j < section_titleText.length; j++) {
                        if (section_titleText[j].innerHTML == missinName[i].equ_name) {
                            section_titleText[j].innerHTML += '(任務)';
                        }
                    }
                    // console.log(missinName[i].equ_name);
                    missinDiv[i].innerHTML = missinName[i].equ_name;
                }
                // console.log('設定賞金金額');
                localStorage['mission_bonus'] = missinName[0].mission_bonus;

                playedCheck();
            }
        } else {
            alertify.alert(xhr.status);
        }
    }
    xhr.open("post", "php/getusetitcketmission.php", true);
    xhr.setRequestHeader("content-type", "application/x-www-form-urlencoded");
    if (missionNum) {
        var data_info = `mission_no=0&titket=${localStorage['member_useticket']}`;
        // console.log('這邊嗎？');
    } else {
        var data_info = `mission_no=${mission_no}&titket=${localStorage['member_useticket']}`;
        // console.log(mission_no, '這是什麼');
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
        function changePhoneMission(mission) {
            let missinDiv = document.querySelectorAll('.progress_box');
            for (let i = 0; i < missinDiv.length; i++) {
                if (missinDiv[i].innerHTML == mission) {
                    missinDiv[i].classList.add('missindown');
                    missinDiv[i].innerHTML = '(完成)';
                }
            }
        }
        switch (value) {
            case 'redeem_product_status':
                // console.log('redeem_product_status');
                facilityPoint('商店', 'redeem_product_status');
                if (facilityPointsCheck * 1) {
                    facilityPointsCheck = 0;
                } else {
                    alertify.alert('要超過６００分才能換商品喔！');
                }
                break;
            case 'waterslide':
                // console.log('waterslide');
                addPoint('滑水道', 'waterslide');
                changePhoneMission('滑水道');
                break;
            case 'swivel_chair':
                // console.log('swivel_chair');
                addPoint('旋轉椅', 'swivel_chair');
                changePhoneMission('旋轉椅');
                break;
            case 'pirate_ship':
                // console.log('pirate_ship');
                addPoint('海盜船', 'pirate_ship');
                changePhoneMission('海盜船');
                break;
            case 'entrance_status':
                // console.log('entrance_status');
                facilityPoint('入口', 'entrance_status');
                break;
            case 'roller_coaster':
                // console.log('roller_coaster');
                addPoint('雲霄飛車', 'roller_coaster');
                changePhoneMission('雲霄飛車');
                break;
            case 'carousel':
                // console.log('carousel');
                addPoint('旋轉木馬', 'carousel');
                changePhoneMission('旋轉木馬');
                break;
            case 'ferris_wheel':
                // console.log('ferris_wheel');
                addPoint('摩天輪', 'ferris_wheel');
                changePhoneMission('摩天輪');
                break;
            case 'exit_status':
                // console.log('exit_status');
                outLand('出口', 'exit_status');
                break;
            default:
                break;
        }
        let missinDiv = document.querySelectorAll('.progress_box');
        let missionCheck = 0;
        if (!parseInt(localStorage['missionDone'])) {
            // console.log('任務完成?');

            for (let i = 0; i < missinDiv.length; i++) {
                if (missinDiv[i].innerHTML.indexOf('完成') != -1) {
                    missionCheck++;
                }
                // console.log('任務完成???');
            }
            if (missionCheck == 4) {

                localStorage['missionDone'] = 1;
                var xhr = new XMLHttpRequest();
                xhr.onload = function () {
                    if (xhr.status == 200) {
                        //..................取回server端回傳的使用者資料
                        if (xhr.responseText.indexOf("sysError") != -1) {
                            alertify.alert("系統異常,請通知系統維護人員");
                        } else if (xhr.responseText.indexOf("還沒進場喔！") != -1) {
                        } else {
                            // console.log('任務完成!');
                        }
                    } else {
                        alertify.alert(xhr.status);
                    }
                }
                xhr.open("post", "php/updaticketmission.php", true);
                xhr.setRequestHeader("content-type", "application/x-www-form-urlencoded");
                if (!team_num) {
                    team_num = 0;
                }
                var data_info = `ticket=${localStorage['member_useticket']}&mission_bonus=${localStorage['mission_bonus']}&team_no=${team_num}&memberno=${sessionStorage['member_no']}`;

                xhr.send(data_info);
                ticketScore = ticketScore;
                ticketScore += parseInt(localStorage['mission_bonus']);
                document.querySelector('.ticket_reward p').innerHTML = '$' + ticketScore;
                alertify.alert('任務完成！');
            }
        }
    } else {

        // console.log($(this).prev().prev().text());
        switch ($(this).prev().prev().text().replace('(任務)', '').replace('(達成)', '')) {
            case '商店':
                // console.log('redeem_product_status');
                facilityPoint($(this).prev().prev().text(), 'redeem_product_status');
                if (facilityPointsCheck * 1) {
                    $(this).prev().prev().text($(this).prev().prev().text() + '(已兌換)');
                    facilityPointsCheck = 0;
                } else {
                    alertify.alert('要超過６００分才能換商品喔！');
                }
                break;
            case '商店(已兌換)':
                $(this).animate({ opacity: 0 }, 500);
                alertify.alert('換過囉！');
                $(this).css('cursor', 'default');
                $(this).prev().prev().text($(this).prev().prev().text() + ' ');
                break;
            case '滑水道':
                // console.log('waterslide');
                addPoint($(this).prev().prev().text().replace('(任務)', '').replace('(達成)', ''), 'waterslide');
                break;
            case '旋轉椅':
                // console.log('swivel_chair');
                addPoint($(this).prev().prev().text().replace('(任務)', '').replace('(達成)', ''), 'swivel_chair');
                break;
            case '海盜船':
                // console.log('pirate_ship');
                addPoint($(this).prev().prev().text().replace('(任務)', '').replace('(達成)', ''), 'pirate_ship');
                break;
            case '入口':
                // console.log('entrance_status');
                facilityPoint($(this).prev().prev().text(), 'entrance_status');
                $(this).prev().prev().text($(this).prev().prev().text() + '(進場)');
                break;
            case '入口(進場)':
                alertify.alert('已經在場內囉！');
                $(this).animate({ opacity: 0 }, 500);
                $(this).css('cursor', 'default');
                $(this).prev().prev().text($(this).prev().prev().text() + ' ');
                break;
            case '雲霄飛車':
                // console.log('roller_coaster');
                addPoint($(this).prev().prev().text().replace('(任務)', '').replace('(達成)', ''), 'roller_coaster');
                break;
            case '旋轉木馬':
                // console.log('carousel');
                addPoint($(this).prev().prev().text().replace('(任務)', '').replace('(達成)', ''), 'carousel');
                break;
            case '摩天輪':
                // console.log('ferris_wheel');
                addPoint($(this).prev().prev().text().replace('(任務)', '').replace('(達成)', ''), 'ferris_wheel');
                break;
            case '出口':
                // console.log('exit_status');
                outLand($(this).prev().prev().text(), 'exit_status');
                break;
            default:
                break;
        }
        if ($(this).prev().prev().text().indexOf('(任務)') != -1) {
            if (parseInt(localStorage['inoutCheck'])) {
                $(this).prev().prev().text($(this).prev().prev().text().replace('(任務)', '(達成)'));
            }
        } else if ($(this).prev().prev().text().indexOf('(達成)') != -1) {
        } else if ($(this).prev().prev().text().indexOf('入口') != -1) {
        } else if ($(this).prev().prev().text().indexOf('商店') != -1) {
        } else if ($(this).prev().prev().text().indexOf('出口') != -1) {
        }
        if (clientHeight < 770) {
            ticketanimate();
        }


        let section_titleText = document.getElementsByClassName('section_title');
        // let missinDiv = document.querySelectorAll('.progress_box');
        let missionCheck = 0;
        if (!parseInt(localStorage['missionDone'])) {
            // console.log('任務完成?');

            for (let i = 0; i < section_titleText.length; i++) {
                if (section_titleText[i].innerHTML.indexOf('達成') != -1) {
                    missionCheck++;
                }
                // console.log('任務完成???');
            }
            if (missionCheck == 4) {

                localStorage['missionDone'] = 1;
                var xhr = new XMLHttpRequest();
                xhr.onload = function () {
                    if (xhr.status == 200) {
                        //..................取回server端回傳的使用者資料
                        if (xhr.responseText.indexOf("sysError") != -1) {
                            alertify.alert("系統異常,請通知系統維護人員");
                        } else if (xhr.responseText.indexOf("還沒進場喔！") != -1) {
                        } else {
                            // console.log('任務完成!');
                        }
                    } else {
                        alertify.alert(xhr.status);
                    }
                }
                xhr.open("post", "php/updaticketmission.php", true);
                xhr.setRequestHeader("content-type", "application/x-www-form-urlencoded");
                if (!team_num) {
                    team_num = 0;
                }
                var data_info = `ticket=${localStorage['member_useticket']}&mission_bonus=${localStorage['mission_bonus']}&team_no=${team_num}&memberno=${sessionStorage['member_no']}`;

                xhr.send(data_info);
                ticketScore = ticketScore;
                ticketScore += parseInt(localStorage['mission_bonus']);
                document.querySelector('.ticket_reward p').innerHTML = '$' + ticketScore;
                alertify.alert('任務完成！');
                console.log(team_num);
            }
        }



    }
}

function addPoint(str, eStr) {
    var xhr = new XMLHttpRequest();
    xhr.onload = function () {
        if (xhr.status == 200) {
            //..................取回server端回傳的使用者資料
            if (xhr.responseText.indexOf("sysError") != -1) {
                alertify.alert("系統異常,請通知系統維護人員");
            } else if (xhr.responseText.indexOf("還沒進場喔！") != -1) {
                alertify.alert("還沒進場喔！");
                localStorage['inoutCheck'] = 0;
            } else {
                // console.log(xhr.responseText);
                localStorage['inoutCheck'] = 1;
                let ticketPointBack = (xhr.responseText).split('|');
                // console.log(ticketPointBack,'切成什麼樣子?')
                ticketScore = parseInt(ticketScore);
                ticketScore += parseInt(xhr.responseText);

                document.querySelector('.ticket_reward p').innerHTML = '$' + ticketScore;
                if (ticketPointBack[1]) {
                    alertify.alert('成功遊玩設施：' + str + '，隨機問答獎勵' + ticketPointBack[2] + '倍！總共加了' + ticketPointBack[0] + '分！');
                } else {
                    alertify.alert('成功遊玩設施：' + str + '，加了' + ticketPointBack[0] + '分！');
                }

            }
        } else {
            alertify.alert(xhr.status);
        }
    }
    xhr.open("post", "php/gameplayaddPoints.php", false);
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
                alertify.alert("系統異常,請通知系統維護人員");
            } else if (xhr.responseText.indexOf("還沒進場喔！") != -1) {
                alertify.alert("還沒進場喔！");
            } else {
                console.log(xhr.responseText);
                facilityPointsCheck = xhr.responseText * 1;
                alertify.alert("掃描" + str + "成功！");
            }
        } else {
            alertify.alert(xhr.status);
        }
    }
    xhr.open("post", "php/getfacilityPoint.php", false);
    xhr.setRequestHeader("content-type", "application/x-www-form-urlencoded");
    var data_info = `str=${str}&eStr=${eStr}&ticket=${localStorage['member_useticket']}&ticketScore=${ticketScore}`;
    xhr.send(data_info);
}

function outLand(str, eStr) {
    var xhr = new XMLHttpRequest();

    alertify.confirm('確定要出園了嗎？出園後這張票就不能入園了喔！',
        function () {
            xhr.onload = function () {
                if (xhr.status == 200) {
                    //..................取回server端回傳的使用者資料
                    if (xhr.responseText.indexOf("sysError") != -1) {
                        alertify.alert("系統異常,請通知系統維護人員");
                    } else if (xhr.responseText.indexOf("還沒進場喔！") != -1) {
                        alertify.alert("還沒進場喔！");
                    } else {
                        alertify.alert('正在為您重新整理！', function () { window.location.reload(); });
                    }
                } else {
                    alertify.alert(xhr.status);
                }
            }
            xhr.open("post", "php/outLand.php", false);
            xhr.setRequestHeader("content-type", "application/x-www-form-urlencoded");
            var data_info = `str=${str}&eStr=${eStr}&ticket=${localStorage['member_useticket']}&ticketScore=${ticketScore}`;
            xhr.send(data_info);
        },
        function () {
        });
}

function playedCheck() {
    var xhr = new XMLHttpRequest();
    xhr.onload = function () {
        if (xhr.status == 200) {
            //..................取回server端回傳的使用者資料
            if (xhr.responseText.indexOf("sysError") != -1) {
                alertify.alert("系統異常,請通知系統維護人員");
            } else if (xhr.responseText.indexOf("還沒進場喔！") != -1) {
                alertify.alert("還沒進場喔！");
            } else {
                let checkPoint = JSON.parse(xhr.responseText);
                let section_titleText = document.getElementsByClassName('section_title');

                let missinDiv = document.querySelectorAll('.progress_box');

                for (let i = 0; i < missinDiv.length; i++) {
                    switch (missinDiv[i].innerHTML) {
                        case '滑水道':
                            if (parseInt(checkPoint[1])) {
                                missinDiv[i].classList.add('missindown');
                                missinDiv[i].innerHTML = '(完成)';
                            }
                            break;
                        case '旋轉椅':
                            if (parseInt(checkPoint[2])) {
                                missinDiv[i].classList.add('missindown');
                                missinDiv[i].innerHTML = '(完成)';
                            }
                            break;
                        case '海盜船':
                            if (parseInt(checkPoint[3])) {
                                missinDiv[i].classList.add('missindown');
                                missinDiv[i].innerHTML = '(完成)';
                            }
                            break;
                        case '雲霄飛車':
                            if (parseInt(checkPoint[5])) {
                                missinDiv[i].classList.add('missindown');
                                missinDiv[i].innerHTML = '(完成)';
                            }
                            break;
                        case '旋轉木馬':
                            if (parseInt(checkPoint[6])) {
                                missinDiv[i].classList.add('missindown');
                                missinDiv[i].innerHTML = '(完成)';
                            }
                            break;
                        case '摩天輪':
                            if (parseInt(checkPoint[7])) {
                                missinDiv[i].classList.add('missindown');
                                missinDiv[i].innerHTML = '(完成)';
                            }
                            break;
                        default:
                            break;
                    }
                }


                for (i in checkPoint) {
                    if (parseInt(checkPoint[i])) {
                        // console.log(checkPoint[i], '+++' ,i);
                        if (section_titleText[i].innerHTML.indexOf('任務') != -1) {
                            section_titleText[i].innerHTML = section_titleText[i].innerHTML.replace('(任務)', '(達成)');
                        } else if (section_titleText[i].innerHTML.indexOf('入口') != -1) {
                            section_titleText[i].innerHTML += '(進場)';
                        } else if (section_titleText[i].innerHTML.indexOf('商店') != -1) {
                            section_titleText[i].innerHTML += '(已兌換)';
                        }
                    }
                    // for (let j = 0; j < section_titleText.length; j++) {
                    //     if (section_titleText[j].innerHTML == missinName[i].equ_name) {
                    //         section_titleText[j].innerHTML += '(任務)';
                    //     }
                    // };
                }
            }
        } else {
            alertify.alert(xhr.status);
        }
    }
    xhr.open("post", "php/getplayedcheck.php", true);
    xhr.setRequestHeader("content-type", "application/x-www-form-urlencoded");
    var data_info = `ticket=${localStorage['member_useticket']}`;
    xhr.send(data_info);
}


// 門票隱藏動畫
let timeclear;

function ticketanimate() {
    let playTicket = document.getElementsByClassName('playticket_ticket')[0];
    clearTimeout(timeclear)
    playTicket.style.display = "flex";
    setTimeout(() => {
        playTicket.style.transform = 'rotateY(0deg)';
    }, 1);
    timeclear = setTimeout(() => {
        playTicket.style.transform = 'rotateY(90deg)';
        setTimeout(() => {
            playTicket.style.display = "none";
        }, 200);
    }, 2000);
}