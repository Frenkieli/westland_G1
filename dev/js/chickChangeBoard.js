function init() {
    setTimeout(choose, 50);
}
function choose() {
    let GetScreenWidth = document.querySelector('.sp-slide').offsetWidth;
    // console.log(`${GetScreenWidth}`);
    let s1 = $('.equ_no1');
    let s2 = $('.equ_no2');
    let s3 = $('.equ_no3');
    let s4 = $('.equ_no4');
    let s5 = $('.equ_no5');
    let s6 = $('.equ_no6');
    // if(document.querySelector('.sp-slide').style.left==="1940px"){slider_6
    // if(document.querySelector('.sp-slide').style.left===`${(GetScreenWidth+10)*2}px`){
    // console.log(document.getElementById('slider_1').className.indexOf('sp-selected'));
    if (document.getElementById('slider_1').className.indexOf('sp-selected') != -1) {
        // console.log('摩天輪');
        // s1.css("background-color","yellow");
        // s1.css('display','flex'); 
        document.getElementById('equ_no').selectedIndex = 1;
        s1.css({ "background-color": 'rgba(216, 219, 7, 0.836)', 'display': 'flex' });
        s2.css('display', 'none');
        s3.css('display', 'none');
        s4.css('display', 'none');
        s5.css('display', 'none');
        s6.css('display', 'none');
        // console.log('s1');
    }
    // if(document.querySelector('.sp-slide').style.left===`${(GetScreenWidth+10)*1}px`){
    if (document.getElementById('slider_2').className.indexOf('sp-selected') != -1) {
        // console.log('旋轉木馬');
        document.getElementById('equ_no').selectedIndex = 3;

        s2.css({ "background-color": 'rgba(252, 200, 31, 0.90)', 'display': 'flex' });
        s1.css('display', 'none');
        s3.css('display', 'none');
        s4.css('display', 'none');
        s5.css('display', 'none');
        s6.css('display', 'none');
        // console.log(s2);
    }
    // if(document.querySelector('.sp-slide').style.left===`${(GetScreenWidth+10)*0}px`){
    if (document.getElementById('slider_3').className.indexOf('sp-selected') != -1) {
        // console.log('旋轉椅');
        document.getElementById('equ_no').selectedIndex = 5;

        s5.css({ "background-color": 'rgba(0, 221, 173, 0.54)', 'display': 'flex' });
        s1.css('display', 'none');
        s2.css('display', 'none');
        s3.css('display', 'none');
        s4.css('display', 'none');
        s6.css('display', 'none');
        // console.log(s5);
    }
    // if(document.querySelector('.sp-slide').style.left===`${(GetScreenWidth+10)*5}px`){
    if (document.getElementById('slider_4').className.indexOf('sp-selected') != -1) {
        // console.log('海盜船');
        document.getElementById('equ_no').selectedIndex = 4;

        s3.css({ "background-color": 'rgba(161, 79, 255, 0.84)', 'display': 'flex' });
        s1.css('display', 'none');
        s2.css('display', 'none');
        s4.css('display', 'none');
        s5.css('display', 'none');
        s6.css('display', 'none');
        // console.log(s3);
    }
    // if(document.querySelector('.sp-slide').style.left==`${(GetScreenWidth+10)*3}px`){
    if (document.getElementById('slider_5').className.indexOf('sp-selected') != -1) {
        // console.log('雲霄飛車');
        document.getElementById('equ_no').selectedIndex = 2;

        s4.css({ "background-color": 'rgba(238, 64, 64, 0.80)', 'display': 'flex' });
        s1.css('display', 'none');
        s2.css('display', 'none');
        s3.css('display', 'none');
        s6.css('display', 'none');
        s5.css('display', 'none');
        // console.log(s6);
    }
    // if(document.querySelector('.sp-slide').style.left==`${(GetScreenWidth+10)*4}px`){
    if (document.getElementById('slider_6').className.indexOf('sp-selected') != -1) {
        // console.log('滑水道');
        document.getElementById('equ_no').selectedIndex = 0;

        s6.css({ "background-color": 'rgba(128, 136, 127, 0.76)', 'display': 'flex' });
        s1.css('display', 'none');
        s2.css('display', 'none');
        s3.css('display', 'none');
        s5.css('display', 'none');
        s4.css('display', 'none');
        // console.log(s4);
    }
    timer = setTimeout(init, 50);

    

}
window.addEventListener('load', init, false);