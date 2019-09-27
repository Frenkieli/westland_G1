$('.owl-carousel').each(function () {
    $(this).owlCarousel({
        loop: false,
        margin: 0,
        nav: false,
        responsiveClass: true,
        responsive: {
            0: {
                items: 1,
            },
            768: {
                items: 2
            },
            1200: {
                items: 4,
            }
        },
    });
    $(this).siblings().find('.next').click(function () {
        $(this).parent().siblings('.owl-carousel').trigger('next.owl.carousel');
    });
    $(this).siblings().find('.prev').click(function () {
        $(this).parent().siblings('.owl-carousel').trigger('prev.owl.carousel');
    });
});


//<!-- -----------購物車內頁商品動態新增start-------- -->

function showProduct(jsonStr) {
    var product = JSON.parse(jsonStr);
    //   console.log(product.product_no);
    var htmlStr = "";
    if (product.product_no) {
        document.getElementById("itemIntroImg").src = product.product_image;
        document.getElementById("itemIntroTitle").innerText = product.product_name;
        document.getElementById("introBoxText").innerText = product.product_ifo;
        document.getElementById("itemPrice").innerText = product.product_price;
        document.getElementById("itemLave").innerText = product.product_count;
        document.getElementById("same_product_category").value = product.product_category;
        if (product.product_count != 0)
            document.querySelector('.intro_totalprice').innerText = product.product_price;
        else
            document.querySelector('.intro_totalprice').innerText = 0;
    } else {
        htmlStr = "<center>查無此商品資料</center>"
    }
    document.getElementById('back').style.cursor = 'pointer';
    //返回上一頁
    document.getElementById('back').addEventListener('click', function () {
        window.location = `items.html`;
    }, false);
    //+ - 小記功能
    (function () {
        let btnLess = document.querySelector(".btnLess");//-
        let btnPlus = document.querySelector(".btnPlus");//+
        let total = 0;//總價
        btnLess.style.cursor = "pointer";
        btnPlus.style.cursor = "pointer";
        btnLess.addEventListener('click', function () {
            if (this.nextElementSibling.value > 1) {
                this.nextElementSibling.value -= 1;
                total = document.getElementById('itemPrice').innerText * this.nextElementSibling.value;
                document.querySelector('.intro_totalprice').innerText = total;
            }
        }, false);
        btnPlus.addEventListener('click', function () {
            if (parseInt(document.getElementById('itemLave').innerText) > this.previousElementSibling.value)
                this.previousElementSibling.value = parseInt(this.previousElementSibling.value) + 1;
            total = document.getElementById('itemPrice').innerText * this.previousElementSibling.value;
            document.querySelector('.intro_totalprice').innerText = total;
        }, false);
    }
    )();
    
    //加入購物車
    function addcart() {
        var storage = sessionStorage;
        if (storage['addItemList'] == null) {
            storage['addItemList'] = '';    //storage.setItem('addItemList','');
        }

        // 幫itemaddButton建立事件聆聽功能
        document.querySelector('.itemaddButton').addEventListener('click', function () {
            let productInfo = `${document.getElementById("itemIntroTitle").innerText}|${document.getElementById("itemIntroImg").src.substr(document.getElementById("itemIntroImg").src.indexOf('images'))}|${document.getElementById("itemPrice").innerText}|${document.getElementById('itemNowCount').value}`;
            // console.log(productInfo);
            // console.log(window.location.href.split("product_no=")[1]);
            // document.querySelector(`#${this.id} input`).value;
            addItem(window.location.href.split("product_no=")[1], productInfo);
            First();
        });

        function addItem(itemId, itemValue) {
            // alertify.alert(`${itemId} : ${itemValue}`);
            //存入storage,判斷是否為重複商品，如果重複就不增加
            itemId = `pd-${itemId}`;
            if (storage[itemId]) {
                alertify.alert(`商品 : ${document.getElementById("itemIntroTitle").innerText} ，已經加入購物車了喔`);
            } else {
                alertify.alert(`商品 : ${document.getElementById("itemIntroTitle").innerText} ，成功加入購物車`);
                storage['addItemList'] += itemId + ', ';
                storage[itemId] = itemValue;
            }
        }
    };
    addcart();
}
//撈取內頁該筆商品
function getProduct() {
    var xhr = new XMLHttpRequest();
    xhr.onload = function () {
        if (xhr.status == 200) {
            //modify here
            showProduct(xhr.responseText);//連結PHP，使用showProduct函式JSON.parse
            //撈取相關推薦商品
            function getSameProduct() {
                var xhr = new XMLHttpRequest();
                xhr.onload = function () {
                    if (xhr.status == 200) {
                        //modify here
                        let SameProductlist = JSON.parse(xhr.responseText);
                        let SameArray = [];
                        SameProductlist.forEach(element => {
                            if (element.product_category == document.getElementById("same_product_category").value && window.location.href.split("product_no=")[1] != element.product_no) {
                                SameArray.push(element);
                            }
                        });
                        // console.log(SameArray);
                        for (let i = 0; i < 4; i++) {
                            // console.log(Math.floor(Math.random()*SameArray.length));
                            let related_items = document.querySelectorAll('.related_item');
                            let randomNum = Math.floor(Math.random() * SameArray.length);
                            console.log(SameArray[randomNum]);
                            related_items[i].children[0].children[0].children[0].href = `item.html?product_no=${SameArray[randomNum].product_no}`
                            related_items[i].children[0].children[0].children[0].children[0].src = SameArray[randomNum].product_image;
                            related_items[i].children[0].children[1].innerText = SameArray[randomNum].product_name;
                            related_items[i].children[0].children[2].innerText = "NT." + SameArray[randomNum].product_price;
                            related_items[i].children[1].value = SameArray[randomNum].product_no;
                            SameArray.splice(randomNum, 1);
                            console.log(SameArray);
                        }
                        var storage = sessionStorage;
                        let name;
                        let image;
                        let price;
                        function sameitemAddCart() {
                            if (storage['addItemList'] == null) {
                                storage['addItemList'] = '';    //storage.setItem('addItemList','');
                            }

                            let list = document.querySelectorAll('.addCartButton');     //list是陣列

                            for (let i = 0; i < list.length; i++) {
                                list[i].addEventListener('click', function () {
                                    // console.log(this.parentNode.nextElementSibling.value);

                                    name = this.previousElementSibling.previousElementSibling.innerText;
                                    image = this.previousElementSibling.previousElementSibling.previousElementSibling.children[0].children[0].src;
                                    image = image.substr(image.indexOf('images'));
                                    price = this.previousElementSibling.innerText;
                                    price = price.replace('NT.', "");
                                    productInfo = `${name}|${image}|${price}`;
                                    // console.log(productInfo);
                                    addItem(this.parentNode.nextElementSibling.value, productInfo);
                                    First();
                                });
                            }

                        }
                        function addItem(itemId, itemValue) {
                            // alertify.alert(`${itemId} : ${itemValue}`);
                            //存入storage,判斷是否為重複商品，如果重複就不增加
                            itemId = `pd-${itemId}`;
                            if (storage[itemId]) {
                                alertify.alert(`商品 : ${name} ，已經加入購物車了喔`);
                            } else {
                                alertify.alert(`商品 : ${name} ，成功加入購物車`);
                                storage['addItemList'] += itemId + ', ';
                                itemValue = itemValue + "|1";
                                storage[itemId] = itemValue;
                            }
                        }
                        sameitemAddCart();

                    } else {
                        alert(xhr.status);
                    }
                }
                var url = `php/getProduct_JSON.php`;
                xhr.open("Get", url, true);
                xhr.send(null);
            }
            getSameProduct();
        } else {
            alert(xhr.status);
        }
    }
    //   console.log(window.location.href);
    var location = window.location.href.split("product_no=")[1];
    console.log(location);
    var url = `php/item_JSON.php?product_no=${location}`;
    //   var url = "item_JSON.php?product_no=1" + document.getElementById("memId").value;
    xhr.open("Get", url, true);
    xhr.send(null);
}
getProduct();