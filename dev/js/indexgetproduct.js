(() => {

    let arr = [];
    getproduct();



    function getproduct() {
        var xhr = new XMLHttpRequest();
        xhr.onload = function () {
            if (xhr.status == 200) {
                showproduct(xhr.responseText);
            }
            else {
                alert(xhr.status);
            }
        }
        var url = "php/getProduct_JSON.php";
        xhr.open('get', url, false);
        xhr.send(null);
    }
    function showproduct(jsonStr) {
        let product = JSON.parse(jsonStr);
        let forproduct = new Array;

        for (let i in product) {
            forproduct = new Array;
            let index = 0;
            for (let j in product[i]) {
                // console.log(product[i][j]);
                forproduct[index] = (product[i][j]);
                index++;

            }
            arr[i] = forproduct;
        }

        pushProduct();
    };
    function pushProduct() {
        let productIn;
        for (let i = 0; i < 12; i++) {
            productIn = arr.splice(`${Math.floor(Math.random() * arr.length)}`, 1).join(',').split(',');
            // console.log(arr,'陣列');
            // console.log(productIn , '印商品');
            document.querySelectorAll('.sort_same_item_img img')[i].src = productIn[2];
            document.querySelectorAll('.sort_same_item_title')[i].innerHTML = productIn[1];
            document.querySelectorAll('.sort_same_item_price')[i].innerHTML = 'NT.'+productIn[4];
            console.log(productIn[7]);
            if(productIn[7] == '仙人掌'){
                document.querySelectorAll('.swiper-slide.gray_linear_gradient.center')[i].classList.add('card_bg1');
                console.log('有聘來');
            }else if(productIn[7] == '老鷹'){
                document.querySelectorAll('.swiper-slide.gray_linear_gradient.center')[i].classList.add('card_bg3');
                console.log('有聘來');
            }else if(productIn[7] == '恐龍'){
                document.querySelectorAll('.swiper-slide.gray_linear_gradient.center')[i].classList.add('card_bg2');
                console.log('有聘來');
            }
        }
    }
})();