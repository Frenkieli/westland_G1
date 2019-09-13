window.addEventListener('load',function (){ 
    //撈星星來評分
    let xhr = new XMLHttpRequest();
    xhr.onload = function () {
        if (xhr.status == 200) {//狀態200則回應文字
            howManyStar(xhr.responseText);
        }
        else {
            alert(xhr.status);//顯示狀態
        }
    } 
    let url="php/getScore.php";
        xhr.open('get', url, true);
        xhr.send(null);

    function howManyStar(jsonStr) {
        let star_data =JSON.parse(jsonStr);
        console.log(star_data);

//----------------以下是偵測分數用----------------------//
        // console.log(`摩天輪總評分:共${star_data[0].equ_score_total}分`);
        // console.log(`摩天輪幾個人評分:${star_data[0].score_num}人`);
        // var FerrisWheel_avgPoint= roundDecimal(((star_data[0].equ_score_total)/(star_data[0].score_num)),1);
        // console.log(`摩天輪平均分數:${FerrisWheel_avgPoint}分`);

        // console.log(`旋轉木馬總評分:共${star_data[1].equ_score_total}分`);
        // console.log(`旋轉木馬幾個人評分:${star_data[1].score_num}人`);
        // var carousels_avgPoint= roundDecimal(((star_data[1].equ_score_total)/(star_data[1].score_num)),1);
        // console.log(`旋轉木馬平均分數:${carousels_avgPoint}分`);

        // console.log(`海盜船總評分:共${star_data[2].equ_score_total}分`);
        // console.log(`海盜船幾個人評分:${star_data[2].score_num}人`);
        // var pirateShip_avgPoint= roundDecimal(((star_data[0].equ_score_total)/(star_data[2].score_num)),1);
        // console.log(`海盜船平均分數:${pirateShip_avgPoint}分`);

        // console.log(`滑水道總評分:共${star_data[3].equ_score_total}分`);
        // console.log(`滑水道幾個人評分:${star_data[0].score_num}人`);
        // var waterSlide_avgPoint= roundDecimal(((star_data[3].equ_score_total)/(star_data[3].score_num)),1);
        // console.log(`滑水道平均分數:${waterSlide_avgPoint}分`);

        // console.log(`旋轉椅總評分:共${star_data[4].equ_score_total}分`);
        // console.log(`旋轉椅幾個人評分:${star_data[4].score_num}人`);
        // var swivelChair_avgPoint= roundDecimal(((star_data[4].equ_score_total)/(star_data[4].score_num)),1);
        // console.log(`旋轉椅平均分數:${swivelChair_avgPoint}分`);

        // console.log(`雲霄飛車總評分:共${star_data[5].equ_score_total}分`);
        // console.log(`雲霄飛車幾個人評分:${star_data[5].score_num}人`);
        // var rollerCoaster_avgPoint= roundDecimal(((star_data[5].equ_score_total)/(star_data[5].score_num)),1);
        // console.log(`雲霄飛車平均分數:${rollerCoaster_avgPoint}分`);

//----------------以上是偵測分數用----------------------//
let starToChange =document.getElementById("ferrisWheelClass");
console.log(starToChange);
starToChange.style.clipPath = `inset(0px ${(5-FerrisWheel_avgPoint)*20}% 0px 0px)`;

let starToChange1 =document.getElementById("carouselslClass");
console.log(starToChange1);
starToChange1.style.clipPath = `inset(0px ${(5-carousels_avgPoint)*20}% 0px 0px)`;

let starToChange2 =document.getElementById("swivelChairClass");
console.log(starToChange2);
starToChange2.style.clipPath = `inset(0px ${(5-swivelChair_avgPoint)*20}% 0px 0px)`;

let starToChange3 =document.getElementById("waterSlideClass");
console.log(starToChange3);
starToChange3.style.clipPath = `inset(0px ${(5-waterSlide_avgPoint)*20}% 0px 0px)`;

let starToChange4 =document.getElementById("rollerCoasterClass");
console.log(starToChange4);
starToChange4.style.clipPath = `inset(0px ${(5-rollerCoaster_avgPoint)*20}% 0px 0px)`;

let starToChange5 =document.getElementById("pirateShipClass");
console.log(starToChange4);
starToChange5.style.clipPath = `inset(0px ${(5-pirateShip_avgPoint)*20}% 0px 0px)`;
    }
}
,false);

