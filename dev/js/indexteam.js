geteam();
function geteam() {
    var xhr = new XMLHttpRequest();
    xhr.onload = function () {
        if (xhr.status == 200) {
            showteam(xhr.responseText);
        }
        else {
            alert(xhr.status);
        }
    }
    var url = "php/getindexteam.php";
    xhr.open('get', url, false);
    xhr.send(null);
}
function showteam(jsonStr) {
    let team = JSON.parse(jsonStr);
    let wanted_name = document.getElementsByClassName('wanted_name');
    let wanted_playerphoto = document.querySelectorAll('.wanted_playerphoto img');
    let wanted_mascot = document.querySelectorAll('.wanted_mascot img');
    let wanted_teamname = document.getElementsByClassName('wanted_teamname');
    let info_teamname = document.getElementsByClassName('info_teamname');
    let wanted_bounty = document.getElementsByClassName('wanted_bounty');
    let info_teamslogan = document.getElementsByClassName('info_teamslogan');
    let info_teamcount = document.getElementsByClassName('info_teamcount');
    let team_list_box = document.getElementsByClassName('team_list_box');
    for (i = 0; i < 4; i++) {
        if (team[i]) {
            // console.log(team[i], '呼叫隊伍');
            wanted_name[i].innerHTML = team[i].member_name;
            wanted_playerphoto[i].src = team[i].image_source;
            wanted_mascot[i].src = team[i].mascot_image;
            wanted_teamname[i].innerHTML = team[i].team_name;
            info_teamname[i].innerHTML = team[i].team_name;
            wanted_bounty[i].innerHTML = '$' + team[i].team_bounty;
            info_teamslogan[i].innerHTML = team[i].team_slogan;
            info_teamcount[i].innerHTML = team[i].team_num;
            team_list_box[i].id = team[i].team_no;
            let checkteam = team[i].team_no;
            let checkname = team[i].team_name;
            team_list_box[i].addEventListener('click', function () {
                if (sessionStorage['member_no']) {
                    var xhr = new XMLHttpRequest();
                    xhr.onload = function () {
                        if (xhr.status == 200) {
                            console.log('sssss');
                            //..................取回server端回傳的使用者資料
                            if (xhr.responseText.indexOf("sysError") != -1) {
                                alertify.alert("系統異常,請通知系統維護人員");
                            } else if (xhr.responseText.indexOf("沒有票喔") != -1) {
                                alertify.alert("沒有票喔！！");
                            } else {
                                if (parseInt(xhr.responseText)) {
                                    // 
                                    alertify.confirm('準備加入' + checkname + '隊伍！要跳轉至內頁嗎？',
                                        function () {
                                            window.location.href = 'team.html?team_num=' + checkteam;
                                        },
                                        function () {
                                        });
                                    // 
                                } else {
                                    alertify.alert("已經在這個隊伍了喔！");
                                }
                            }
                        } else {
                            alertify.alert(xhr.status);
                        }
                    }
                    xhr.open("post", "php/checkindexteam.php", true);
                    xhr.setRequestHeader("content-type", "application/x-www-form-urlencoded");
                    var data_info = `checkteam=${checkteam}&mem_no=${sessionStorage['member_no']}`;
                    xhr.send(data_info);
                } else {
                    alertify.alert('請先登入喔！');
                }
            }, false);
        } else {
            // console.log('不存在喔！');
            wanted_name[i].innerHTML = '等你創造';
            wanted_playerphoto[i].src = 'images/ticket/wewantyou.gif';
            wanted_mascot[i].src = '';
            wanted_teamname[i].innerHTML = '來取名';
            info_teamname[i].innerHTML = '來取名';
            wanted_bounty[i].innerHTML = '$77777';
            info_teamslogan[i].innerHTML = '創造你的傳說！';
            info_teamcount[i].innerHTML = '成為第一個';
            team_list_box[i].id = '創建隊伍';
            team_list_box[i].addEventListener('click', function () {
                if (sessionStorage['member_no']) {
                    alertify.confirm('準備進入創造隊伍！',
                        function () {
                            window.location.href = 'ticket.html?team_num=0';
                        },
                        function () {
                        });
                } else {
                    alertify.alert('請先登入喔！');
                }

            }, false);
        }
    }
}