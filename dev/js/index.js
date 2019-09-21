// 控制首頁第一屏的動畫


(function () {

    let arr = new Array;
    getamusement_equipments();

    setTimeout(() => {
        let winnerPeoples = document.querySelectorAll('.Podium_winner img:first-child');
        for (let i = 0; i < winnerPeoples.length; i++) {
            winnerPeoples[i].className = 'winnermove';
            // console.log('開始');
        }

    }, 1200);
    window.addEventListener('load', pushSlide, false);
    function pushSlide() {
        // console.log(arr);
        let check = -1;
        for (let index = 0,i = 0; index < arr.length; index++) {
            if(check != arr[index][0]){
                // console.log(i,'++',arr[index][0]);
                document.querySelectorAll('.slider_img>img')[i].src = arr[index][1];
                document.querySelectorAll('.slider_title')[i].innerHTML = arr[index][2];
                document.querySelectorAll('.slider_star')[i].innerHTML += arr[index][3];
                document.querySelectorAll('.slider_score')[i].style.clipPath = ` polygon(0% 0% ,${arr[index][4] / arr[index][5] * 2}0% 0%,${arr[index][4] / arr[index][5] * 2}0% 100%,0% 100%)`;
                document.querySelectorAll('.slider_member p')[i].innerHTML = arr[index][6];
                document.querySelectorAll('.slider_memberimg img')[i].src = arr[index][7];
                check = arr[index][0];
                i++;
            }
                

            // console.log(arr[index][4] / arr[index][5], '測試');
        }
    }
    // 商品的套件程式碼

    var swiper = new Swiper('.swiper-container', {
        effect: 'coverflow',
        grabCursor: true,
        centeredSlides: true,
        slidesPerView: 'auto',
        loop: true,
        prevButton: '.swiper-button-prev',
        nextButton: '.swiper-button-next',
        coverflowEffect: {
            rotate: 50,
            stretch: 0,
            depth: 100,
            modifier: 1,
            slideShadows: false,
        },
        pagination: {
            el: '.swiper-pagination',
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        }
    });
    let sliderWidth = document.getElementsByClassName('slider_container')[0].offsetWidth;
    let sliderHeight = document.getElementsByClassName('slider_container')[0].offsetHeight;
    let facility_slider = document.getElementsByClassName('facility_slider')[0];

    document.getElementsByClassName('slider_container')[0].style.perspective = sliderWidth * 5 + "px";
    // console.log(sliderWidth, "====", sliderHeight);
    $('.slider_container').polygon({

        // width of the cube slider
        width: sliderWidth,

        // height of the cube slider
        height: sliderHeight,

        // autoplay interval
        timer: false,
    });


    function getamusement_equipments() {
        var xhr = new XMLHttpRequest();
        xhr.onload = function () {
            if (xhr.status == 200) {
                showamusement_equipments(xhr.responseText);
            }
            else {
                alert(xhr.status);
            }
        }
        var url = "php/getAmusement_equipments_JOSN.php";
        xhr.open('get', url, true);
        xhr.send(null);
    }
    function showamusement_equipments(jsonStr) {
        let amusement_equipments = JSON.parse(jsonStr);
        let foramusement_equipments = new Array;

        for (let i in amusement_equipments) {
            amusement_equipments[i];
            foramusement_equipments = new Array;
            let index = 0;
            for (let j in amusement_equipments[i]) {
                // console.log(amusement_equipments[i][j]);
                foramusement_equipments[index] = (amusement_equipments[i][j]);
                index++;

            }
            arr[i] = foramusement_equipments;
        }
    };
})();