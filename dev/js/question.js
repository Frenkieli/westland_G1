(function () {


    let arr = [];
    getquestions();
    // console.log(arr);
    function question_start() {
        setTimeout(() => {
            $('.robot_img').addClass('swiper');
            // console.log('開始搖擺');
            $('#dialogBox').html('');
            let btn = document.createElement('div');
            btn.className = 'btn';
            btn.innerText = '立刻猜謎';
            let answer = Math.floor(Math.random() * arr.length);
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
        }, 2000);
    }
    // question_start();
    function question(answer) {
        $('#dialogBox').html('>> 您好，我的朋友! 有心事嗎 ?<BR />');
        $('.problem').css('display', 'block');
        $('#puzzle').animate({ top: "0px" }, 'slow');
        $('#problem_answer1').animate({ top: '0px' }, 'slow');
        $('#problem_answer2').animate({ top: '0px' });
        $('#problem_answer3').animate({ top: '0px' }, 'fast');
        $('.robot_img').removeClass('swiper');
        $('#puzzle').text(arr[answer][1]);
        document.querySelector('#problem_answer1 img').src = arr[answer][2];
        document.querySelector('#problem_answer2 img').src = arr[answer][3];
        document.querySelector('#problem_answer3 img').src = arr[answer][4];

        console.log(arr[answer], ',成功了嗎?');

        $(`#problem_answer${arr[answer][6]}`).click(() => {
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
                }
            }, 5);
            xhr.onload = function () {
                if (xhr.status == 200) {
                    //..................取回server端回傳的使用者資料
                    if (xhr.responseText.indexOf("sysError") != -1) {
                        alert("系統異常,請通知系統維護人員");
                    } else if (xhr.responseText.indexOf("還沒進場喔！") != -1) {
                        alert("還沒進場喔！");
                    } else {
                        alert('正在為您重新整理！');
                        window.location.reload();
                    }
                } else {
                    alert(xhr.status);
                }
            }
            xhr.open("post", "php/updateticketbounty_JSON.php", false);
            xhr.setRequestHeader("content-type", "application/x-www-form-urlencoded");
            var data_info = `right_multiple=${arr[answer]}`;
            xhr.send(data_info);
        });
    }
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
            arr[i] = forQuestions;
        }
        // console.log(questions);
    };
})();