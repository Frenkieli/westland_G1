let wanted_name = '';
let wanted_playerphoto = '';
let wanted_teamname = '';
let wanted_bounty = '';
let wanted_mascot = '';
let info_teamname = '';
let info_teamslogan = '';
let info_teamcount = '';
let allTeam = [];//所有隊伍(包含5人)
let allTicket = [];//該會員所有門票
var storage = sessionStorage;
let member_no = storage['member_no'];
// console.log(member_no);
function $id(id) {
    return document.getElementById(id);
}
//所有頁籤畫面生成
function showTeam(teamlist, ticketlist) {
    //清空所有
    console.log(1);
    $id("join").innerHTML = ``;
    $id("joined").innerHTML = ``;
    //動態生成隊伍
    let inputIndex = 0;//1加入 2已加入
    teamlist.forEach(teamElement => {
        console.log(teamElement);
        if (member_no == undefined &&teamElement.team_num!=5) {
            inputIndex = 1;
        }
        else{
            inputIndex = 0;
        }
        ticketlist.forEach(ticketElement => {
            console.log(ticketElement);
            //有登入 且不是自己的隊伍 且未加入的隊伍
            if (member_no && teamElement.leader_member_no != member_no && ticketElement.team_no != teamElement.team_no &&teamElement.team_num!=5) {
                inputIndex = 1;
            }
            //有登入 且是自己的隊伍 或是已加入的隊伍
            else if ((member_no && teamElement.leader_member_no == member_no) || (member_no && teamElement.team_no == ticketElement.team_no)) {
                inputIndex = 2;
            }
            else {
                inputIndex = 0;
            }
        });
        switch (inputIndex) {
            //加入
            case 1:
                let createjoinTeam =
                    `<div class="team_list_box">
                        <input type="hidden" name="${teamElement.team_no}" value="">
                        <div class="list_box_img">
                            <p class="wanted_name">${teamElement.member_name}</p>
                            <div class="wanted_playerphoto">
                                <img src="${teamElement.image_source}">
                            </div>
                            <p class="wanted_teamname">${teamElement.team_name}</p>
                            <p class="wanted_bounty">$${teamElement.team_bounty}</p>
                            <div class="wanted_mascot">
                                <img src="${teamElement.mascot_image}}">
                            </div>
                        </div>
                        <div class="list_box_info">
                            <p class="paragraph_p">隊伍名稱 : </p>
                            <p class="info_teamname">${teamElement.team_name}</p>
                            <p class="paragraph_p">精神標語 :</p>
                            <p class="info_teamslogan paragraph_p">${teamElement.team_slogan}</p>
                            <p class="paragraph_p">人數 : <span class="info_teamcount">${teamElement.team_num}</span> / 5</p>
                        </div>
                    </div>`
                $id("join").innerHTML = $id("join").innerHTML + createjoinTeam;
                break;
            //已加入
            case 2:
                let createjoinedTeam =
                    `<div class="team_list_box">
                        <input type="hidden" name="${teamElement.team_no}" value="">
                        <div class="list_box_img">
                            <p class="wanted_name">${teamElement.member_name}</p>
                            <div class="wanted_playerphoto">
                                <img src="${teamElement.image_source}">
                            </div>
                            <p class="wanted_teamname">${teamElement.team_name}</p>
                            <p class="wanted_bounty">$${teamElement.team_bounty}</p>
                            <div class="wanted_mascot">
                                <img src="${teamElement.mascot_image}}">
                            </div>
                        </div>
                        <div class="list_box_info">
                            <p class="paragraph_p">隊伍名稱 : </p>
                            <p class="info_teamname">${teamElement.team_name}</p>
                            <p class="paragraph_p">精神標語 :</p>
                            <p class="info_teamslogan paragraph_p">${teamElement.team_slogan}</p>
                            <p class="paragraph_p">人數 : <span class="info_teamcount">${teamElement.team_num}</span> / 5</p>
                        </div>
                    </div>`
                $id("joined").innerHTML = $id("joined").innerHTML + createjoinedTeam;
                break;
            default:
                break;
        }
    });
    // console.log(document.querySelectorAll('#join .team_list_box').length);
    //有無隊伍判斷(加入隊伍)
    let select_join = document.querySelectorAll('#join .team_list_box');
    if (select_join.length == 0) {
        $id("join").innerHTML = `<div class="no_can_join"><img src="images/team/做伙揪團＿0904-2-01.png" alt=""></div>`;
        document.querySelector(".no_can_join").style.opacity = "1";
    }
    //加入click事件(加入隊伍)
    select_join.forEach(element => {
        element.style.cursor = "pointer";
        element.addEventListener('click', joinInvitation, false);
    });
    //有無隊伍判斷(已加入隊伍)
    let select_joined = document.querySelectorAll('#joined .team_list_box');
    if (select_joined.length == 0) {
        $id("joined").innerHTML = `<div class="no_joined"><img src="images/team/做伙揪團＿0904-2-02.png" alt=""></div>`;
        document.querySelector(".no_joined").style.opacity = "1";
    }
    //加入click事件(已加入隊伍)
    select_joined.forEach(element => {
        element.style.cursor = "pointer";
        element.addEventListener('click', joinInvitation, false);
    });
}
//點選加入隊伍頁籤
function join() {

    document.querySelector('.select_ticket_content').innerText = "請選擇加入隊伍使用的門票 :";

    //切換頁籤
    $id("joined").style.display = 'none';
    $id("create").style.display = 'none';
    $id("join").style.display = '';
    $id("team_join").classList.add('team_option_select');
    $id("team_joined").classList.remove('team_option_select');
    $id("team_create").classList.remove('team_option_select');
}
//加入隊伍彈窗
function joinInvitation() {
    $id("ok").innerText = '加入團隊';
    $id("no").innerText = '我不要';
    this.style.cursor = 'context-menu';
    $id("team_join_window").style.opacity = 1;
    $id("team_join_window").style.clipPath = "polygon(0 0% , 100% 00% , 100% 100%,0 100%)";
    let select_team = $id('select_team');
    //如果彈窗有東西清空
    if (select_team.firstElementChild) {
        select_team.firstElementChild.remove();
    }
    let thisTeam = this;
    let clone_thisTeam = this.cloneNode(true);
    select_team.appendChild(clone_thisTeam);

    $id("no").addEventListener("click", () => {
        $id("team_join_window").style.clipPath = "polygon(0 50% , 100% 50% , 100% 50%,0 50%)";
        $id("team_join_window").style.opacity = 0;
    }, false);

    $id("ok").addEventListener("click", move, false);

    function move() {
        thisTeam.remove();
        $id("team_join_window").style.clipPath = "polygon(0 50% , 100% 50% , 100% 50%,0 50%)";
        $id("team_join_window").style.opacity = 0;
        var select = document.querySelectorAll('#join .team_list_box')
        if (select.length == 0) {
            $id("join").innerHTML = ` <div class="no_can_join"><img src="images/team/做伙揪團＿0904-2-01.png" alt=""></div>`;
            document.querySelector(".no_can_join").style.opacity = "1";
        }
    }
}
function joined() {
    document.querySelector('.select_ticket_content').innerText = "加入此隊伍所選擇的票號 :";

    //切換頁籤
    $id("join").style.display = 'none';
    $id("create").style.display = 'none';
    $id("joined").style.display = '';
    $id("team_joined").classList.add('team_option_select');
    $id("team_join").classList.remove('team_option_select');
    $id("team_create").classList.remove('team_option_select');
    let select = document.querySelectorAll('#joined .team_list_box');
    for (let i = 0; i < document.querySelectorAll('.team_list_box').length; i++) {
        document.querySelectorAll('.team_list_box')[i].removeEventListener('click', joinInvitation, false);
    }
    // if (select.length == 0)
    //     document.querySelector('.no_joined').style.display = '';
    // else
    //     document.querySelector('.no_joined').style.display = 'none';
    select.forEach((ele, index) => {
        ele.classList.add('click_joined');
        ele.style.cursor = "pointer";
        ele.removeEventListener('click', joinInvitation, false);
    });
    let click_joined = document.querySelectorAll('.click_joined');
    click_joined.forEach((ele, index) => {
        ele.addEventListener('click', dropOut, false);
    });
    $id("ok").innerText = '退出團隊';
    $id("no").innerText = '我不想';
}

function dropOut() {
    // console.log(2);
    this.style.cursor = 'context-menu';
    $id("team_join_window").style.opacity = 1;
    $id("team_join_window").style.clipPath = "polygon(0 0% , 100% 00% , 100% 100%,0 100%)";
    let select_team = $id('select_team');
    let reference_this = this;
    let c = this.cloneNode(true);
    select_team.appendChild(c);
    $id("no").addEventListener("click", () => {
        $id("team_join_window").style.clipPath = "polygon(0 50% , 100% 50% , 100% 50%,0 50%)";
        $id("team_join_window").style.opacity = 0;
        $id("ok").removeEventListener("click", move, false);
        this.style.cursor = "pointer";;
    }, false);
    $id("ok").addEventListener("click", move, false);
    function move() {
        reference_this.remove();
        $id("join").append(reference_this);
        $id("team_join_window").style.clipPath = "polygon(0 50% , 100% 50% , 100% 50%,0 50%)";
        $id("team_join_window").style.opacity = 0;
        reference_this.classList.remove('click_joined');
        var select = document.querySelectorAll('#joined .team_list_box')
        if (select.length == 0)
            document.querySelector('.no_joined').style.display = '';
    }
}

function create() {
    $id("join").style.display = 'none';
    $id("joined").style.display = 'none';
    $id("create").style.display = '';
    $id("team_join").classList.remove('team_option_select');
    $id("team_joined").classList.remove('team_option_select');
    $id("team_create").classList.add('team_option_select');
}
//ajax 撈取所有的隊伍
function allData() {
    let xhr = new XMLHttpRequest();
    xhr.onload = function () {
        if (xhr.status == 200) {
            allTeam = JSON.parse(xhr.responseText);
            console.log(allTeam);
            //showTeam(allTeam);
            //ajax 撈取所有的門票(有登入)
            if (member_no) {
                let xhr = new XMLHttpRequest();
                xhr.onload = function () {
                    if (xhr.status == 200) {
                        allTicket = JSON.parse(xhr.responseText);
                        console.log(allTicket);
                        showTeam(allTeam, allTicket);
                    } else {
                        alert(xhr.status);
                    }
                }
                let url = `php/getTeam.php?member_no=${member_no}`;
                xhr.open('get', url, true);
                xhr.send(null);
            }
            else {
                showTeam(allTeam, allTicket);
            }
        } else {
            alert(xhr.status);
        }
    }
    let url = "php/getTeam.php";
    xhr.open('get', url, true);
    xhr.send(null);
}
window.addEventListener("load", () => {
    //撈取所有資訊
    allData();
    $('.owl-carousel').owlCarousel({
        loop: true,
        margin: 100,
        nav: true,
        // dots: true,
        dotsEach: true,
        responsive: {
            0: {
                items: 1
            },
            600: {
                items: 1
            },
            1000: {
                items: 1
            }
        }
    })
    $id("team_join").addEventListener("click", join, false);
    $id("team_joined").addEventListener("click", joined, false);
    $id("team_create").addEventListener("click", create, false);
    document.querySelector('.create_team_name').addEventListener("input", () => {
        let select = document.querySelector('.create_team_name').value;
        document.querySelector('.team_name_remainder').innerText = 6 - select.length;
    }, false);
    document.querySelector('.create_team_slogan').addEventListener("input", () => {
        let select = document.querySelector('.create_team_slogan').value;
        document.querySelector('.team_slogan_remainder').innerText = 40 - select.length;
    }, false);
    join();
}, false);