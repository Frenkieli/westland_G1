function init() {
    setTimeout(choose, 50);
}
function choose() {
    let s1 =$('.equ_no1');
    let s2 =$('.equ_no2');
    let s3 =$('.equ_no3');
    let s4 =$('.equ_no4');
    let s5 =$('.equ_no5');
    let s6 =$('.equ_no6');
        if(document.querySelector('.sp-slide').style.left==="1940px"){
            // console.log('摩天輪');
                // s1.css("background-color","yellow");
                // s1.css('display','flex'); 
                s1.css({"background-color":'rgba(216, 219, 7, 0.836)','display':'flex'});
                s2.css('display','none');
                s3.css('display','none');
                s4.css('display','none');
                s5.css('display','none');
                s6.css('display','none');
                // console.log(s1);
        }
        if(document.querySelector('.sp-slide').style.left==="970px"){
            // console.log('旋轉木馬');
                s2.css({"background-color":'rgba(252, 200, 31, 0.90)','display':'flex'});
                s1.css('display','none');
                s3.css('display','none');
                s4.css('display','none');
                s5.css('display','none');
                s6.css('display','none');
                // console.log(s2);
        }
        if(document.querySelector('.sp-slide').style.left==="0px"){
            // console.log('旋轉椅');
                s5.css({"background-color":'rgba(0, 221, 173, 0.54)','display':'flex'});
                s1.css('display','none');
                s2.css('display','none');
                s3.css('display','none');
                s4.css('display','none');
                s6.css('display','none');
                // console.log(s5);
        }
        if(document.querySelector('.sp-slide').style.left==="4850px"){
            // console.log('海盜船');
            s3.css({"background-color":'rgba(161, 79, 255, 0.84)','display':'flex'});
            s1.css('display','none'); 
            s2.css('display','none');
            s4.css('display','none');
            s5.css('display','none');
            s6.css('display','none');
            // console.log(s3);
        }
        if(document.querySelector('.sp-slide').style.left=="2910px"){
            // console.log('雲霄飛車');
            s6.css({"background-color":'rgba(238, 64, 64, 0.80)','display':'flex'});
            s1.css('display','none'); 
            s2.css('display','none');
            s3.css('display','none');
            s4.css('display','none');
            s5.css('display','none');
            // console.log(s6);
        }
        if(document.querySelector('.sp-slide').style.left=="3880px"){
            // console.log('滑水道');
            s4.css({"background-color":'rgba(128, 136, 127, 0.76)','display':'flex'});
            s1.css('display','none'); 
            s2.css('display','none');
            s3.css('display','none');
            s5.css('display','none');
            s6.css('display','none');
            // console.log(s4);
        }
    timer = setTimeout(init, 50);
}
window.addEventListener('load',init,false);