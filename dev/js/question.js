function question_start() {
    setTimeout(() => {
        $('.robot_img').addClass('swiper');
        console.log('開始搖擺');
        $('#dialogBox').html('');
        let btn = document.createElement('div');
        btn.className = 'btn';
        btn.innerText = '立刻猜謎';
        btn.addEventListener('click', question, false);
        let ptext = document.createElement('p');
        ptext.innerText = '隨機問答！答對下次獎勵加倍！';
        $('#dialogBox').append(btn);
        $('#dialogBox').append(ptext);
    }, 2000);
}
// question_start();
function question() {
    $('#dialogBox').html('>> 您好，我的朋友! 有心事嗎 ?<BR />');
    $('.problem').css('display', 'block');
    $('#puzzle').animate({ top: "0px" }, 'slow');
    $('#problem_answer1').animate({ top: '0px' }, 'slow');
    $('#problem_answer2').animate({ top: '0px' });
    $('#problem_answer3').animate({ top: '0px' }, 'fast');
    $('.robot_img').removeClass('swiper');
    $(`#problem_answer${2}`).click(() => {
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
            console.log(i);
        }, 5);
        console.log(2);
    });
}
question_start();