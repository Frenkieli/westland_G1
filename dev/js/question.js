var Timecheck;
var arrQuest = [];

function question_start() {
    clearTimeout(Timecheck);
    Timecheck = setTimeout(() => {
        $('.robot_img').addClass('swiper');
        // console.log('開始搖擺');
        $('#dialogBox').html('');
        let btn = document.createElement('div');
        btn.className = 'btn';
        btn.innerText = '立刻猜謎';
        let answer = Math.floor(Math.random() * arrQuest.length);
        btn.addEventListener('click', () => {
            document.getElementById('arrow_down').className = '';
            document.getElementById('section_robot').className = 'section_robot';
            question(answer);
            setTimeout(() => {
                robot.addEventListener('click', robotPhone, false);
            }, 50);
        }, false);
        let ptext = document.createElement('p');
        ptext.innerText = '隨機問答！答對下次獎勵加倍！';
        $('#dialogBox').append(btn);
        $('#dialogBox').append(ptext);
        $('.problem_answer').off();
    // }, 2000);
    }, Math.floor(Math.random() * 28000) + 2000);
}
(function () {


    getquestions();
    // console.log(arrQuest);

    // question_start();

    question_start();


    function getquestions() {
        var xhr = new XMLHttpRequest();
        xhr.onload = function () {
            if (xhr.status == 200) {
                showquestions(xhr.responseText);
            }
            else {
                alert(xhr.status);
            }
        }
        var url = "php/getQuestion_JSON.php";
        xhr.open('get', url, true);
        xhr.send(null);
    }
    function showquestions(jsonStr) {
        let questions = JSON.parse(jsonStr);
        let forQuestions = new Array;

        for (let i in questions) {
            forQuestions = new Array;
            let index = 0;
            for (let j in questions[i]) {
                // console.log(questions[i][j]);
                forQuestions[index] = (questions[i][j]);
                index++;
            }
            arrQuest[i] = forQuestions;
        }
        // console.log(questions);
    };
})();

function question(answer) {
    $('#dialogBox').html('>> 您好，我的朋友! 有心事嗎 ?<BR />');
    $('.problem').css('display', 'block');
    $('#puzzle').animate({ top: "0px" }, 'slow');
    $('#problem_answer1').animate({ top: '0px' }, 'slow');
    $('#problem_answer2').animate({ top: '0px' });
    $('#problem_answer3').animate({ top: '0px' }, 'fast');
    $('.robot_img').removeClass('swiper');
    $('#puzzle').text(arrQuest[answer][1]);
    document.querySelector('#problem_answer1 img').src = arrQuest[answer][2];
    document.querySelector('#problem_answer2 img').src = arrQuest[answer][3];
    document.querySelector('#problem_answer3 img').src = arrQuest[answer][4];

    console.log(arrQuest[answer][6], ',成功了嗎?');
    switch (parseInt(arrQuest[answer][6])) {
        case 1:
            $('.problem_reply').css('left', '20%');
            $(`#problem_answer2`).click(() => {
                alertify.alert('答錯啦!');
                $(this).animate({ opacity: 0 }, 500);
            });
            $(`#problem_answer3`).click(() => {
                alertify.alert('答錯啦!');
                $(this).animate({ opacity: 0 }, 500);
            });
            break;
        case 2:
            $('.problem_reply').css('left', '50%');
            $(`#problem_answer1`).click(() => {
                alertify.alert('答錯啦!');
                $(this).animate({ opacity: 0 }, 500);
            });
            $(`#problem_answer3`).click(() => {
                alertify.alert('答錯啦!');
                $(this).animate({ opacity: 0 }, 500);
            });
            break;
        case 3:
            $('.problem_reply').css('left', '80%');
            $(`#problem_answer2`).click(() => {
                alertify.alert('答錯啦!');
                $(this).animate({ opacity: 0 }, 500);
            });
            $(`#problem_answer1`).click(() => {
                alertify.alert('答錯啦!');
                $(this).animate({ opacity: 0 }, 500);
            });
            break;
        default:
            break;
    }

    $(`#problem_answer${arrQuest[answer][6]}`).click(() => {
        $('.problem_reply').css('display', 'block');
        let i = 0;
        let time = setInterval(() => {
            i++;
            document.getElementsByClassName('problem_reply')[0].style.clipPath = `circle(${i}%)`;
            if (i > 100) {
                clearInterval(time);
                setTimeout(() => {
                    $('.problem').css('display', 'none');
                    $('#puzzle').css('top', '-100%');
                    $('.problem_answer').css('top', '100%');
                    document.getElementsByClassName('problem_reply')[0].style.clipPath = `circle(0%)`;
                    $('.problem_reply').css('display', 'none');
                    question_start();
                }, 200);
                alertify.alert('答對拉！下次遊玩設施賞金加' + arrQuest[answer][5] + '倍喔！');
            }
        }, 5);

        var xhr = new XMLHttpRequest();
        xhr.onload = function () {
            if (xhr.status == 200) {
                //..................取回server端回傳的使用者資料
                if (xhr.responseText.indexOf("sysError") != -1) {
                    alert("系統異常,請通知系統維護人員");
                } else if (xhr.responseText.indexOf("還沒進場喔！") != -1) {
                    alert("還沒進場喔！");
                } else {
                }
            } else {
                alert(xhr.status);
            }
        }
        xhr.open("post", "php/updateticketbounty_JSON.php", false);
        xhr.setRequestHeader("content-type", "application/x-www-form-urlencoded");
        var data_info = `right_multiple=${arrQuest[answer][0]}&ticket=${localStorage['member_useticket']}`;
        xhr.send(data_info);
    });
}