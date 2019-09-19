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
                alertify.alert(xhr.status);
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

    //生成購物車

    function pushProduct() {
        let productIn;
        for (let i = 0; i < 12; i++) {
            productIn = arr.splice(`${Math.floor(Math.random() * arr.length)}`, 1).join(',').split(',');
            // console.log(arr,'陣列');
            // console.log(productIn , '印商品');
            document.querySelectorAll('.sort_same_item_img img')[i].src = productIn[2];
            document.querySelectorAll('.sort_same_item_title')[i].innerHTML = productIn[1];
            document.querySelectorAll('.sort_same_item_price')[i].innerHTML = 'NT.' + productIn[4];
            // console.log(productIn[7]);
            if (productIn[7] == '仙人掌') {
                document.querySelectorAll('.swiper-slide.gray_linear_gradient.center')[i].classList.add('card_bg1');
                // console.log('有聘來');
            } else if (productIn[7] == '老鷹') {
                document.querySelectorAll('.swiper-slide.gray_linear_gradient.center')[i].classList.add('card_bg3');
                // console.log('有聘來');
            } else if (productIn[7] == '恐龍') {
                document.querySelectorAll('.swiper-slide.gray_linear_gradient.center')[i].classList.add('card_bg2');
                // console.log('有聘來');
            }
            document.querySelectorAll('.btn.m-b.m-a')[i].id = productIn[1] + '|' + productIn[2] + '|' + productIn[4] + '|' + 'pd-' + productIn[0];
            document.querySelectorAll('.btn.m-b.m-a')[i].addEventListener('click', function () {
                // console.log(this.id,'確認id');
                let theId = this.id;
                // console.log(theId.split('|')[3],'確認id');
                if (storage[theId.split('|')[3]]) {
                    alertify.alert('已經在購物車了',function (){});
                } else {
                    alertify.alert("購買" + theId.split('|')[0],
                        function () {
                            alertify.success('成功加入購物車');
                            if (!storage['addItemList']) {
                                storage['addItemList'] = '';
                            }
                            storage['addItemList'] += theId.split('|')[3] + ', ';
                            storage[theId.split('|')[3]] = theId.replace('|' + theId.split('|')[3], '');
                            First(); //先這樣...之後再改
                        });
                }
            });
        }
    }
})();