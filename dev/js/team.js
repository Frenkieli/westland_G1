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
let canUseTicket = [];//該會員所有未組隊的門票
let chose;//現在在哪個視窗
var storage = sessionStorage;
let member_no = storage['member_no'];
let leader_status;//是否為隊長
// console.log(member_no);
function $id(id) {
    return document.getElementById(id);
}
//所有頁籤畫面生成
function showTeam(teamlist, ticketlist) {
    //檢查有沒有可以使用的票(沒加入隊伍的)
    canUseTicket = [];//該會員所有未組隊的門票
    ticketlist.forEach(ticketElement => {
        if (ticketElement.team_no) {

        }
        else {
            canUseTicket.push(ticketElement);
        }
    });
    // console.log(teamlist);
    // console.log(ticketlist);
    // console.log(canUseTicket);
    //清空所有
    $id("join").innerHTML = ``;
    $id("joined").innerHTML = ``;
    $id("create").innerHTML = ``;
    //動態生成 加入/已加入 畫面
    let inputIndex = 0;//1加入 2已加入
    teamlist.forEach(teamElement => {
        let have_add = 0;
        let use_ticket = 0;
        let use_ticket_bounty = 0;
        //沒登入 人數少於5的隊伍
        if (member_no == undefined && teamElement.team_num != 5) {
            inputIndex = 1;
            //  console.log("NO");
        }
        //沒登入 人數等於5的隊伍
        else if (member_no == undefined && teamElement.team_num == 5) {
            // console.log("?");
            inputIndex = 0;
        }

        ticketlist.forEach(ticketElement => {
            // console.log(ticketElement.ticket_no);
            //有登入 且不是自己的隊伍 且未加入的隊伍 且隊伍人數小於5人
            if (member_no && teamElement.leader_member_no != member_no && ticketElement.team_no != teamElement.team_no && teamElement.team_num != 5) {
                inputIndex = 1;
                // console.log('加入', ticketElement.ticket_no);
            }
            //有登入 且是自己的隊伍 或是已加入的隊伍
            else if ((member_no && teamElement.leader_member_no == member_no) || (member_no && teamElement.team_no == ticketElement.team_no)) {
                // console.log('已加入', ticketElement.ticket_no);
                have_add = 1;
                //加入隊伍或是創建隊伍所使用的門票
                if (teamElement.team_no == ticketElement.team_no) {
                    use_ticket = ticketElement.ticket_no;
                    use_ticket_bounty = ticketElement.bounty;
                }

                //是否為隊長
                if (teamElement.leader_member_no == member_no) {
                    // console.log("隊長");
                    leader_status = 1;
                }
                else
                    leader_status = 0;
                // inputIndex = 2;
                // break;
            }
            //有登入 不是已加入的隊伍 滿人不能加入(不顯示)
            else if (member_no && teamElement.team_num == 5) {
                // console.log("滿人了", ticketElement.ticket_no);
                inputIndex = 0;
            }
        });
        if (have_add == 1) {
            inputIndex = 2;
        }
        // console.log('over---------------------------------------');
        // console.log(inputIndex);
        switch (inputIndex) {
            //加入
            case 1:
                let createjoinTeam =
                    `<div class="team_list_box">
                        <input type="hidden" name="team_no" value="${teamElement.team_no}">
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
                // console.log(teamElement);
                let createjoinedTeam =
                    `<div class="team_list_box">
                        <input type="hidden" name="leader_status" value="${leader_status}">
                        <input type="hidden" name="ticket_no" value="${use_ticket}">
                        <input type="hidden" name="team_no" value="${teamElement.team_no}">
                        <input type="hidden" name="bounty" value="${use_ticket_bounty}">
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
    //動態生成 創建 畫面
    if (chose == 3) {
        //有可以使用的票
        if (canUseTicket.length != 0) {
            $id("create").innerHTML = `<h4>" step1 選擇您創建隊伍的門票 "</h4>`;
            let newSilder = document.createElement('div');
            newSilder.classList.add('owl-carousel', 'owl-theme', 'slider');
            canUseTicket.forEach(element => {
                let create_ticket =
                    `<div class="team_list_box">
                        <input type="hidden" name="ticket_no" value="${element.ticket_no}">
                        <div class="list_box_img">
                            <p class="wanted_name">${element.member_name}</p>
                            <div class="wanted_playerphoto">
                                <img src="${element.image_source}">
                            </div>
                            <p class="wanted_teamname">隊伍</p>
                            <p class="wanted_bounty">${element.bounty}</p>
                            <div class="create_wanted_mascot">
                                <img src="${element.mascot_image}">
                            </div>
                        </div>
                    </div>`
                newSilder.innerHTML = newSilder.innerHTML + create_ticket;
            });
            $id("create").appendChild(newSilder);
            $id("create").innerHTML = $id("create").innerHTML + ` 
                <h4>" step2 輸入隊伍資訊 "</h4>
                <form>
                    <p>隊伍名稱</p>
                    <input maxlength="6" type="text" class="create_team_name">
                    <p class="text_count">剩餘字數 : <span class="team_name_remainder">6</span></p>
                    <p>精神隊呼</p>
                    <textarea maxlength="40" name="" id="" cols="30" rows="5"
                    class="create_team_slogan"></textarea>
                    <p class="text_count">剩餘字數 : <span class="team_slogan_remainder">40</span></p>
                    <input id="go" type="button" value="出發冒險" class="btn">
                </form>`
            document.querySelector('.create_team_name').addEventListener("input", () => {
                let select = document.querySelector('.create_team_name').value;
                document.querySelector('.team_name_remainder').innerText = 6 - select.length;
            }, false);
            document.querySelector('.create_team_slogan').addEventListener("input", () => {
                let select = document.querySelector('.create_team_slogan').value;
                document.querySelector('.team_slogan_remainder').innerText = 40 - select.length;
            }, false);
            $('.owl-carousel').owlCarousel({
                loop: false,
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
            $id('go').addEventListener('click', function () {
                if (document.querySelector('.create_team_name').value.trim() == '') {
                    alert('隊伍名稱還沒輸入喔');
                } else if (document.querySelector('.create_team_slogan').value.trim() == '') {
                    // alert(document.querySelector('.create_team_name').value.trim());
                    alert('隊伍隊呼還沒輸入喔');
                } else {
                    let selectTeamTicket=document.querySelector('.active').children[0];
                    console.log(selectTeamTicket);
                    selectTeamTicket.children[0].value
                    let creatTeamForm=$id('creatTeamForm');
                    console.log(creatTeamForm);
                    creatTeamForm.children[0].value=member_no;
                    creatTeamForm.children[1].value=selectTeamTicket.children[0].value;
                    creatTeamForm.children[2].value=document.querySelector('.create_team_name').value.trim();
                    creatTeamForm.children[3].value=selectTeamTicket.children[1].children[3].innerText;
                    creatTeamForm.children[4].value=document.querySelector('.create_team_slogan').value.trim();
                    creatTeamForm.children[5].value=selectTeamTicket.children[1].children[4].children[0].src.substr(selectTeamTicket.children[1].children[4].children[0].src.indexOf('images'));
                    let xhr = new XMLHttpRequest();
                    xhr.onload = function () {
                        if (xhr.status == 200) {
                            alert(xhr.responseText);
                            create();
                        }else{
                            alert('創建隊伍失敗QQ');
                        }
                    }
                    let sendForm=new FormData(creatTeamForm);
                    let url='php/createTeam.php';
                    xhr.open('post',url,true);
                    xhr.send(sendForm);
                }
            }, false);
        }
        //沒有可以使用的票
        else {
            alert("沒有可以使用的票喔");
        }

    }

    //抓取所有加入隊伍
    let select_join = document.querySelectorAll('#join .team_list_box');
    //抓取所有已加入隊伍
    let select_joined = document.querySelectorAll('#joined .team_list_box');

    if (chose == 1) {
        // console.log(document.querySelectorAll('#join .team_list_box').length);
        //有無隊伍判斷(加入隊伍)
        if (select_join.length == 0) {
            $id("join").innerHTML = `<div class="no_can_join"><img src="images/team/做伙揪團＿0904-2-01.png" alt=""></div>`;
            document.querySelector(".no_can_join").style.opacity = "1";
        }
    }
    else if (chose == 2) {
        // console.log(document.querySelectorAll('#joined .team_list_box').length);
        //有無隊伍判斷(已加入隊伍)
        if (select_joined.length == 0) {
            $id("joined").innerHTML = `<div class="no_joined"><img src="images/team/做伙揪團＿0904-2-02.png" alt=""></div>`;
            document.querySelector(".no_joined").style.opacity = "1";
        }
    }

    //加入click彈窗事件(加入隊伍)
    select_join.forEach(element => {
        element.style.cursor = "pointer";
        element.addEventListener('click', joinInvitation, false);
    });

    //加入click彈窗事件(已加入隊伍)
    select_joined.forEach(element => {
        element.style.cursor = "pointer";
        element.addEventListener('click', dropOut, false);
    });


}
//點選加入隊伍頁籤
function join() {
    chose = 1;
    allData();
    console.log("join");
    document.querySelector('#chose_ticket').style.display = "";
    document.querySelector('#use_ticket').style.display = "none";
    document.querySelector('#leader_status').style.display = "none";
    document.querySelector('.select_ticket_content').innerText = "請選擇加入隊伍使用的門票編號 :";

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
    let thisTeam = this;
    //有登入
    if (member_no) {
        console.log(canUseTicket);
        if (canUseTicket.length != 0) {
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
            let clone_thisTeam = this.cloneNode(true);
            select_team.appendChild(clone_thisTeam);
            $id('chose_ticket').innerHTML = '';
            let newOption = document.createElement('option');
            newOption.innerHTML = '請選擇';
            $id('chose_ticket').appendChild(newOption);
            canUseTicket.forEach(element => {
                let newOption = document.createElement('option');
                newOption.value = element.ticket_no;
                newOption.innerHTML = element.ticket_no;
                $id('chose_ticket').appendChild(newOption);
            });
        } else {
            console.log(`????`);
            alert('沒有可以使用的票喔');
        }
    }
    //沒登入
    else {
        alert('你沒登入喔');
    }


    //點選NO
    $id("no").addEventListener("click", () => {
        thisTeam.style.cursor = "pointer";
        $id("team_join_window").style.clipPath = "polygon(0 50% , 100% 50% , 100% 50%,0 50%)";
        $id("team_join_window").style.opacity = 0;
        $id("ok").removeEventListener("click", move, false);
    }, false);
    //點選OK
    $id("ok").addEventListener("click", move, false);

    //ajax加入隊伍 點選OK就在畫面上移除 且 判斷還有沒有隊伍
    function move() {
        console.log($id('chose_ticket').value);
        //有選擇門票
        if ($id('chose_ticket').value != '請選擇') {
            let bounty;
            canUseTicket.forEach((element, index) => {
                if ($id('chose_ticket').value == element.ticket_no) {
                    bounty = element.bounty;
                }
            });
            let xhr = new XMLHttpRequest();
            xhr.onload = function () {
                if (xhr.status == 200) {
                    //回傳成功訊息
                    alert(xhr.responseText);

                    //移除該門票選項
                    canUseTicket.forEach((element, index) => {
                        if ($id('chose_ticket').value == element.ticket_no) {
                            canUseTicket.splice(index, 1);
                        }
                    });

                    //移除畫面的隊伍+關掉彈窗+判斷還有沒有隊伍可以加入
                    thisTeam.remove();
                    $id("team_join_window").style.clipPath = "polygon(0 50% , 100% 50% , 100% 50%,0 50%)";
                    $id("team_join_window").style.opacity = 0;
                    let select_join = document.querySelectorAll('#join .team_list_box')
                    if (select_join.length == 0) {
                        $id("join").innerHTML = ` <div class="no_can_join"><img src="images/team/做伙揪團＿0904-2-01.png" alt=""></div>`;
                        document.querySelector(".no_can_join").style.opacity = "1";
                    }

                    //移除OK按鈕監聽
                    $id("ok").removeEventListener("click", move, false);
                }
                else {
                    alert('加入隊伍失敗');
                    // alert(xhr.status);
                }
            }
            let url = `php/joinTeam.php?team_no=${thisTeam.children[0].value}&ticket_no=${$id('chose_ticket').value}&bounty=${bounty}`;
            console.log(typeof (bounty), bounty);
            xhr.open('get', url, true);
            xhr.send(null);
        }
        //還沒選擇門票
        else {
            alert('還沒選擇門票喔');
        }
    }
}
//點選已加入隊伍頁籤
function joined() {
    console.log("joined");

    //切換頁籤
    $id("join").style.display = 'none';
    $id("create").style.display = 'none';
    $id("joined").style.display = '';
    $id("team_joined").classList.add('team_option_select');
    $id("team_join").classList.remove('team_option_select');
    $id("team_create").classList.remove('team_option_select');

    if (member_no) {
        chose = 2;
        allData();
        document.querySelector('#chose_ticket').style.display = "none";
        document.querySelector('#use_ticket').style.display = "";
        document.querySelector('#leader_status').style.display = "";
        document.querySelector('.select_ticket_content').innerText = "加入此隊伍使用的門票編號 : ";
    } else {
        alert('你沒登入喔');
    }

}
//已加入隊伍彈窗
function dropOut() {

    // console.log(2);
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

    $id("no").innerText = '我不想';
    //你是隊長
    if (clone_thisTeam.children[0].value == 1)
        $id("ok").innerText = '解散團隊';
    //你是隊員
    else if (clone_thisTeam.children[0].value == 0)
        $id("ok").innerText = '退出團隊';

    //加入隊伍使用的門票編號
    document.querySelector('#use_ticket').innerHTML = clone_thisTeam.children[1].value;

    //你是隊長
    if (clone_thisTeam.children[0].value == 1)
        document.querySelector('#leader_status').innerHTML = `(你是隊長喔!)`;
    //你是隊員
    else if (clone_thisTeam.children[0].value == 0)
        document.querySelector('#leader_status').innerHTML = `(你是隊員喔!)`;

    $id("no").addEventListener("click", () => {
        thisTeam.style.cursor = "pointer";
        $id("team_join_window").style.clipPath = "polygon(0 50% , 100% 50% , 100% 50%,0 50%)";
        $id("team_join_window").style.opacity = 0;
        $id("ok").removeEventListener("click", move, false);
    }, false);

    $id("ok").addEventListener("click", move, false);

    //ajax退出隊伍 點選OK就在畫面上移除 且 判斷還有沒有隊伍
    function move() {
        let xhr = new XMLHttpRequest();
        xhr.onload = function () {
            if (xhr.status == 200) {
                //回傳成功訊息
                alert(xhr.responseText);

                //移除畫面的隊伍+關掉彈窗+判斷還有沒有隊伍可以加入
                thisTeam.remove();
                $id("team_join_window").style.clipPath = "polygon(0 50% , 100% 50% , 100% 50%,0 50%)";
                $id("team_join_window").style.opacity = 0;
                let select_joined = document.querySelectorAll('#joined .team_list_box')
                if (select_joined.length == 0) {
                    $id("joined").innerHTML = `<div class="no_joined"><img src="images/team/做伙揪團＿0904-2-02.png" alt=""></div>`;
                    document.querySelector(".no_joined").style.opacity = "1";
                }

                //移除OK按鈕監聽
                $id("ok").removeEventListener("click", move, false);

            }
            else {
                alert('退出/解散 隊伍失敗');
                alert(xhr.status);
            }
        }
        let url = `php/leaveTeam.php?leader_status=${thisTeam.children[0].value}&ticket_no=${thisTeam.children[1].value}&team_no=${thisTeam.children[2].value}&bounty=${thisTeam.children[3].value}`;
        // console.log(thisTeam.children[3].value,typeof(thisTeam.children[3].value));
        xhr.open('get', url, true);
        xhr.send(null);
    }
}
//點選創建]隊伍頁籤
function create() {
    console.log("create");
    console.log(member_no);
    //切換頁籤
    $id("join").style.display = 'none';
    $id("joined").style.display = 'none';
    $id("create").style.display = '';
    $id("team_join").classList.remove('team_option_select');
    $id("team_joined").classList.remove('team_option_select');
    $id("team_create").classList.add('team_option_select');
    if (member_no) {
        chose = 3;
        allData();
    } else {
        alert('你沒登入喔');
    }
}
//ajax 撈取所有的隊伍
function allData() {
    let xhr = new XMLHttpRequest();
    xhr.onload = function () {
        if (xhr.status == 200) {
            allTeam = JSON.parse(xhr.responseText);
            // console.log(allTeam);
            //showTeam(allTeam);
            //ajax 撈取該會員所有的門票(有登入)
            if (member_no) {
                let xhr = new XMLHttpRequest();
                xhr.onload = function () {
                    if (xhr.status == 200) {
                        allTicket = JSON.parse(xhr.responseText);
                        // console.log(allTicket);
                        showTeam(allTeam, allTicket);
                    } else {
                        alert(xhr.status);
                    }
                }
                let url = `php/getTeam_and_Ticket.php?member_no=${member_no}`;
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
    let url = "php/getTeam_and_Ticket.php";
    xhr.open('get', url, true);
    xhr.send(null);
}
window.addEventListener("load", () => {
    $id("team_join").addEventListener("click", join, false);
    $id("team_joined").addEventListener("click", joined, false);
    $id("team_create").addEventListener("click", create, false);
    join();
}, false);