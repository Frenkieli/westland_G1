window.addEventListener('load', function () {
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
    let url = "php/getScore.php";
    xhr.open('post', url, true);
    xhr.send(null);

    function howManyStar(jsonStr) {
        let star_data = JSON.parse(jsonStr);
        function roundDecimal(val, precision) {
            return Math.round(Math.round(val * Math.pow(10, (precision || 0) + 1)) / 10) / Math.pow(10, (precision || 0));
        }


        let starToChange = document.getElementById("ferrisWheelClass");
        var FerrisWheel_avgPoint = roundDecimal(((star_data[0].equ_score_total) / (star_data[0].score_num)), 1);
        starToChange.style.clipPath = `inset(0px ${(5 - FerrisWheel_avgPoint) * 20}% 0px 0px)`;

        let starToChange1 = document.getElementById("carouselslClass");
        var carousels_avgPoint = roundDecimal(((star_data[1].equ_score_total) / (star_data[1].score_num)), 1);
        starToChange1.style.clipPath = `inset(0px ${(5 - carousels_avgPoint) * 20}% 0px 0px)`;

        let starToChange2 = document.getElementById("swivelChairClass");
        var swivelChair_avgPoint = roundDecimal(((star_data[4].equ_score_total) / (star_data[4].score_num)), 1);
        starToChange2.style.clipPath = `inset(0px ${(5 - swivelChair_avgPoint) * 20}% 0px 0px)`;

        let starToChange3 = document.getElementById("waterSlideClass");
        var waterSlide_avgPoint = roundDecimal(((star_data[3].equ_score_total) / (star_data[3].score_num)), 1);
        starToChange3.style.clipPath = `inset(0px ${(5 - waterSlide_avgPoint) * 20}% 0px 0px)`;

        let starToChange4 = document.getElementById("rollerCoasterClass");
        var rollerCoaster_avgPoint = roundDecimal(((star_data[5].equ_score_total) / (star_data[5].score_num)), 1);
        starToChange4.style.clipPath = `inset(0px ${(5 - rollerCoaster_avgPoint) * 20}% 0px 0px)`;

        let starToChange5 = document.getElementById("pirateShipClass");
        var pirateShip_avgPoint = roundDecimal(((star_data[2].equ_score_total) / (star_data[2].score_num)), 1);
        starToChange5.style.clipPath = `inset(0px ${(5 - pirateShip_avgPoint) * 20}% 0px 0px)`;


        star_data.sort(function (a, b) {
            return (b.equ_score_total / b.score_num) - (a.equ_score_total / a.score_num);
        });
        let strnum = ['一', '二', '三', '四', '五', '六'];
        for (let i = 0; i < star_data.length; i++) {

            switch (star_data[i].equ_name) {
                case '摩天輪':
                    document.getElementsByClassName('rank')[0].innerHTML = '第' + strnum[i] + '名';
                    break;
                case "旋轉木馬":
                    document.getElementsByClassName('rank')[1].innerHTML = '第' + strnum[i] + '名';

                    break;
                case "海盜船":
                    document.getElementsByClassName('rank')[3].innerHTML = '第' + strnum[i] + '名';

                    break;
                case "滑水道":
                    document.getElementsByClassName('rank')[4].innerHTML = '第' + strnum[i] + '名';

                    break;
                case "旋轉椅":
                    document.getElementsByClassName('rank')[2].innerHTML = '第' + strnum[i] + '名';

                    break;
                case "雲霄飛車":
                    document.getElementsByClassName('rank')[5].innerHTML = '第' + strnum[i] + '名';

                    break;
                default:
                    break;
            }
        }
    }
}
    , false);

