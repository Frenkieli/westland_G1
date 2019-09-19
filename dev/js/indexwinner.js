getwinner();
function getwinner() {
    var xhr = new XMLHttpRequest();
    xhr.onload = function () {
        if (xhr.status == 200) {
            showwinner(xhr.responseText);
        }
        else {
            alert(xhr.status);
        }
    }
    var url = "php/getindexwinner_JSON.php";
    xhr.open('get', url, false);
    xhr.send(null);
}

function showwinner(jsonStr) {
    let winner = JSON.parse(jsonStr);
    let teamAll = [];
    let team = [];
    let teamCheck = 1;
    let numCount = 0;
    let teamCount = 0;
    for (let i = 0; i < 5; i++) {
        if (i != 0 && team[i - 1].team_no != winner[i].team_no) {
            break;
        }
        team[i] = winner[i];
    }
    teamAll[0] = team;

    for (let i = 1; i < 5; i++) {
        team = new Array;
        do {
            if (teamCount != 0 && team[teamCount - 1].team_no != winner[numCount].team_no) {
                break;
            }
            team[teamCount] = winner[numCount];
            numCount++;
            teamCount++;
            // console.log(winner.length ,'+++',numCount)
            if (winner.length == numCount) {
                break;
            }
        } while (teamCheck = 1);
        teamAll[i] = team;
        // console.log(teamAll, '隊伍');
        teamCheck = 1;
        teamCount = 0;
    }

    let teammascot = document.querySelectorAll('.winner_people img:first-child');
    for (let i = 0; i < teammascot.length; i++) {
        console.log(teammascot[i], '<-物件', teamAll[i + 1][0].team_mascot_image);
        teammascot[i].src = teamAll[5 - (i + 1)][0].team_mascot_image;
    }
    let teamPostName = document.querySelectorAll('.teammate_post .ticket_name p');
    let teamPostImg = document.querySelectorAll('.teammate_post .ticket_img img');
    let teamPostTeam = document.querySelectorAll('.teammate_post .ticket_team p');
    let teamPostReward = document.querySelectorAll('.teammate_post .ticket_reward p');
    let teamPostMascot = document.querySelectorAll('.teammate_post .ticket_mascot');
    for (let i = 0; i < teamPostName.length; i++) {
        if (teamAll[0][i]) {
            teamPostName[i].innerHTML = teamAll[0][i].member_name;
            teamPostImg[i].src = teamAll[0][i].image_source;
            teamPostTeam[i].innerHTML = teamAll[0][i].team_name;
            teamPostReward[i].innerHTML = '$' + teamAll[0][i].bounty;
            teamPostMascot[i].src = teamAll[0][i].mascot_image;
        } else {
            teamPostName[i].innerHTML = '等你';
            teamPostImg[i].src = 'images/ticket/wewantyou.gif';
            teamPostTeam[i].innerHTML = '等你';
            teamPostReward[i].innerHTML = '$?????';
            teamPostMascot[i].src = '';
        }
    }
    let Podium_winner = document.querySelectorAll('.Podium_winner .winner_people');
    let postCount = 3;
    // let team_slogan = document.createElement('p');
    // team_slogan.style.cssText = 'display: block;background-color: rgba(0, 0, 0, 0.7);width: 100px;color: #eee;position: static;padding: 10px;border: 3px double rgba(255, 255, 255, 0.7);word-break:break-all;z-index: 1;transform:';
    // team_slogan.id = 'winner_team_slogan';
    // team_slogan.innerText = '隊伍呼喊！';
    // document.getElementsByClassName('index')[0].appendChild(team_slogan);
    // document.getElementsByClassName('Podium_winner')[0].addEventListener('mousemove', function (e) {
    //     $('#winner_team_slogan').stop().fadeIn().css('position', 'fixed').css('top', e.clientY + 10).css('left', e.clientX + 10);
    // }, false)
    // document.getElementsByClassName('Podium_winner')[0].addEventListener('mouseout', function (e) {
    //     $('#winner_team_slogan').stop().fadeOut();
    // }, false)
    console.log(teamAll);
    for (let j = 0; j < Podium_winner.length; j++) {
        Podium_winner[postCount].addEventListener('mouseover', (e) => {
            // $('#winner_team_slogan').text(teamAll[j + 1][0].team_slogan);
            $('.winner_teammate').stop(true, false).fadeOut(function () {
                for (let i = 0; i < teamPostName.length; i++) {
                    if (teamAll[j + 1][i]) {
                        teamPostName[i].innerHTML = teamAll[j + 1][i].member_name;
                        teamPostImg[i].src = teamAll[j + 1][i].image_source;
                        teamPostTeam[i].innerHTML = teamAll[j + 1][i].team_name;
                        teamPostReward[i].innerHTML = '$' + teamAll[j + 1][i].bounty;
                        teamPostMascot[i].src = teamAll[j + 1][i].mascot_image;
                    } else {
                        teamPostName[i].innerHTML = '等你';
                        teamPostImg[i].src = 'images/ticket/wewantyou.gif';
                        teamPostTeam[i].innerHTML = '等你';
                        teamPostReward[i].innerHTML = '$?????';
                        teamPostMascot[i].src = '';
                    }
                }
            }).fadeIn();
        }, false);
        postCount--;
    }

    // console.log(teamAll, '分組完成');
}