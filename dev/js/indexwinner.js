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
    let teamNow = 0;
    for (let i = 0; i < 5; i++) {
        team[i] = winner[i];
    }
    teamAll[0] = team;
    // console.log(team);
    for (let i = 1; i < 5; i++) {
        team = new Array;
        for (let j = teamNow; j < teamNow + 5; j++) {
            team[j - teamNow] = winner[j];
        }
        teamNow += 5;
        teamAll[i] = team;
    }
    let teammascot = document.querySelectorAll('.winner_people img:first-child');
    for (let i = 0; i < teammascot.length; i++) {
        // console.log(teammascot[i], '<-物件', teamAll[i + 1][0].team_mascot_image);
        teammascot[i].src = teamAll[i + 1][0].team_mascot_image;
    }
    let teamPostName = document.querySelectorAll('.teammate_post .ticket_name p');
    let teamPostImg = document.querySelectorAll('.teammate_post .ticket_img img');
    let teamPostTeam = document.querySelectorAll('.teammate_post .ticket_team p');
    let teamPostReward = document.querySelectorAll('.teammate_post .ticket_reward p');
    let teamPostMascot = document.querySelectorAll('.teammate_post .ticket_mascot');
    for (let i = 0; i < teamPostName.length; i++) {
        teamPostName[i].innerHTML = teamAll[0][i].member_name;
        teamPostImg[i].src = teamAll[0][i].image_source;
        teamPostTeam[i].innerHTML = teamAll[0][i].team_name;
        teamPostReward[i].innerHTML = '$' + teamAll[0][i].bounty;
        teamPostMascot[i].src = teamAll[0][i].mascot_image;
    }
    let Podium_winner = document.querySelectorAll('.Podium_winner .winner_people');
    for (let j = 0; j < Podium_winner.length; j++) {
        Podium_winner[j].addEventListener('mouseover', () => {
            $('.winner_teammate').stop(true,false).fadeOut(function () {
                for (let i = 0; i < teamPostName.length; i++) {
                    teamPostName[i].innerHTML = teamAll[5 - (j + 1)][i].member_name;
                    teamPostImg[i].src = teamAll[5 - (j + 1)][i].image_source;
                    teamPostTeam[i].innerHTML = teamAll[5 - (j + 1)][i].team_name;
                    teamPostReward[i].innerHTML = '$' + teamAll[5 - (j + 1)][i].bounty;
                    teamPostMascot[i].src = teamAll[5 - (j + 1)][i].mascot_image;
                }
            }).fadeIn();
        }, false);

    }

    console.log(teamAll, '分組完成');
}