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
                items: 4
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

var storage = sessionStorage;
if (storage['addItemList'] == null) {
    storage['addItemList'] = '';    //storage.setItem('addItemList','');
}
function shopingCartFirst() {
    sumTotalPrice = 0
    let itemString = storage['addItemList'];
    // console.log(itemString);
    if (storage['addItemList']) {
        let items = itemString.substr(0, itemString.length - 2).split(', ');
        // console.log(items);   // ["A1001", "A1005", "A1002"] //
        for (let key in items) {  //use items[key]
            let itemInfo = storage.getItem(items[key]);// itemInfo="formas|formas.png|$3000"
            // console.log(itemInfo);
            createCartContentList(itemInfo, items[key]);//items[key]="A1001"
        }
    }
    function createCartContentList(itemInfo, key) {
        // console.log(key);
        let cartUpdateFormClone = document.getElementById("cartUpdateFormWrap").children[1].cloneNode(true);
        cartUpdateFormClone.id = key;
        // console.log(cartUpdateFormClone);
        cartUpdateFormClone.style.display = '';
        // document.getElementById("cartUpdateFormWrap").appendChild(cartUpdateFormClone);

        document.getElementById("cartUpdateFormWrap").insertBefore(cartUpdateFormClone, document.getElementById("cartUpdateFormWrap").lastElementChild.previousElementSibling);
        //lastElementChild最後一個小孩
        //previousElementSibling我的上一個兄弟


        //console.log(cartUpdateFormClone.children[0].children[0].children[4].children[0].children[0]);//test

        cartUpdateFormClone.children[0].children[0].children[0].children[0].children[0].src = itemInfo.split('|')[1];
        cartUpdateFormClone.children[0].children[0].children[0].children[0].children[0].src = itemInfo.split('|')[1];

        cartUpdateFormClone.children[0].children[0].children[1].children[0].innerText = itemInfo.split('|')[0];
        cartUpdateFormClone.children[0].children[0].children[3].children[0].children[1].value = itemInfo.split('|')[3];
        // console.log(cartUpdateFormClone.children[0].children[0].children[3]);
        cartUpdateFormClone.children[0].children[0].children[2].children[0].children[0].innerText = itemInfo.split('|')[2];
        cartUpdateFormClone.children[0].children[0].children[4].children[0].children[0].innerText = parseInt(itemInfo.split('|')[2]) * parseInt(itemInfo.split('|')[3]);//小計
        // console.log(cartUpdateFormClone.children[0].children[0].children[4].children[0].children[0]);
        cartUpdateFormClone.children[0].children[0].children[1].children[2].children[0].innerText = itemInfo.split('|')[2];//手機版單價
    }
    let delButton = document.getElementsByClassName('deleteBtn');
    // console.log(delButton)

    for (let i = 0; i < delButton.length; i++) {
        delButton[i].style.cursor = "pointer";
        delButton[i].addEventListener('click', deleteItem);
    }
    function deleteItem(e) {
        e.preventDefault()
        // let itemId = this.parentNode.getAttribute('id');
        let key = this.parentNode.parentNode.parentNode.parentNode.parentNode.id;
        // alertify.alert(key);
        console.log(this.parentNode.parentNode);
        //1.先扣除總金額
        // sumTotalPrice -= parseInt(itemValue.split('|')[2]);//parseInt:字串轉數字
        // document.getElementById('sumTotalPrice').innerText = sumTotalPrice;
        let sumTotalPrice = document.getElementById('sumTotalPrice').innerText;
        // let itemValue = storage.getItem(key);
        sumTotalPrice -= parseInt(this.parentNode.parentNode.previousElementSibling.children[0].children[0].innerText);
        //this是我的btn,parentNode是的爸爸
        document.getElementById('sumTotalPrice').innerText = sumTotalPrice;

        //2.清除storage的資料
        storage.removeItem(key);
        storage['addItemList'] = storage['addItemList'].replace(key + ', ', '');

        //3.刪除該筆form
        // this.parentNode.parentNode.parentNode.removeChild(this.parentNode.parentNode);
        this.parentNode.parentNode.parentNode.parentNode.parentNode.remove();
        //console.log(this.parentNode.parentNode.parentNode.parentNode.parentNode);
        First();
    }
    let iconDeleteBtn = document.getElementsByClassName('iconDeleteBtn');
    // console.log(delButton)
    for (let i = 0; i < iconDeleteBtn.length; i++) {
        // console.log( iconDeleteBtn[i]);
        iconDeleteBtn[i].style.cursor = "pointer";
        iconDeleteBtn[i].addEventListener('click', iconDeleteItem);
    }
    function iconDeleteItem(e) {

        e.preventDefault();

        let key = this.parentNode.parentNode.parentNode.parentNode.id;

        console.log(key);

        // //1.先扣除總金額
        let sumTotalPrice = document.getElementById('sumTotalPrice').innerText;
        sumTotalPrice -= parseInt(this.parentNode.previousElementSibling.previousElementSibling.children[0].children[0].innerText);
        // //this是我的btn,parentNode是的爸爸//JS=>this=e.currentTarget(事件加在誰身上)
        document.getElementById('sumTotalPrice').innerText = sumTotalPrice;

        //2.清除storage的資料
        storage.removeItem(key);
        storage['addItemList'] = storage['addItemList'].replace(key + ', ', '');

        //3.刪除該筆form
        this.parentNode.parentNode.parentNode.parentNode.remove();
        console.log(this.parentNode.parentNode.parentNode.parentNode);
        First();
    }
}
shopingCartFirst();


//<!-- -----------購物車動態新增end-------- -->

//<!-- -----------購物車數量及小計end-------- -->

(function () {
    let btnLess = document.querySelectorAll(".btnLess");
    let btnPlus = document.querySelectorAll(".btnPlus");
    let total = 0;
    let eachSubTotal = document.querySelectorAll('.subtotal');
    for (let i = 0; i < eachSubTotal.length; i++) {
        total += parseInt(eachSubTotal[i].innerText);
    }
    let sumTotalPrice = document.getElementById('sumTotalPrice');
    sumTotalPrice.innerText = total;
    for (let i = 0; i < btnLess.length; i++) {
        btnLess[i].style.cursor = "pointer";
        btnPlus[i].style.cursor = "pointer";
        btnLess[i].addEventListener('click', function () {
            if (this.nextElementSibling.value > 1) {
                this.nextElementSibling.value -= 1;
                this.parentNode.parentNode.nextElementSibling.children[0].children[0].innerText = this.nextElementSibling.value * this.parentNode.parentNode.previousElementSibling.children[0].children[0].innerText;
                sumTotalPrice.innerText = parseInt(sumTotalPrice.innerText) - parseInt(this.parentNode.parentNode.previousElementSibling.children[0].children[0].innerText);
                let itemInfo = storage[this.parentNode.parentNode.parentNode.parentNode.parentNode.id];
                itemInfo = itemInfo.split('|')[0] + '|' + itemInfo.split('|')[1] + '|' + itemInfo.split('|')[2] + '|' + this.nextElementSibling.value;
                storage[this.parentNode.parentNode.parentNode.parentNode.parentNode.id] = itemInfo;
            }
        }, false);
        btnPlus[i].addEventListener('click', function () {
            this.previousElementSibling.value = parseInt(this.previousElementSibling.value) + 1;
            this.parentNode.parentNode.nextElementSibling.children[0].children[0].innerText = this.previousElementSibling.value * this.parentNode.parentNode.previousElementSibling.children[0].children[0].innerText;
            sumTotalPrice.innerText = parseInt(sumTotalPrice.innerText) + parseInt(this.parentNode.parentNode.previousElementSibling.children[0].children[0].innerText);
            let itemInfo = storage[this.parentNode.parentNode.parentNode.parentNode.parentNode.id];
            itemInfo = itemInfo.split('|')[0] + '|' + itemInfo.split('|')[1] + '|' + itemInfo.split('|')[2] + '|' + this.previousElementSibling.value;
            storage[this.parentNode.parentNode.parentNode.parentNode.parentNode.id] = itemInfo;
        }, false);
    }
})();

//<!-- -----------購物車數量及小計end-------- -->

document.getElementById('check').addEventListener('click', function () {

    if (storage['member_no']) {//有登入
        if (storage['addItemList'])
            window.location = 'check_order.html';
        else
            alertify.alert('請先選購商品喔');
    } else {//沒登入
        document.getElementById('pleaseLogin').style.display = "";
        document.querySelector('.showloginBox').addEventListener('click', function () {
            $('#lightBox').css('display', 'block');
            document.getElementById('pleaseLogin').style.display = "none";
            order = 1;
        });
    }
}, false);



//撈取相關推薦商品
function getSameProduct() {
    var xhr = new XMLHttpRequest();
    xhr.onload = function () {
        if (xhr.status == 200) {
            let SameProductlist = JSON.parse(xhr.responseText);
            for (let i = 0; i < 4; i++) {
                let related_items = document.querySelectorAll('.related_item');
                let randomNum = Math.floor(Math.random() * SameProductlist.length);
                related_items[i].children[0].children[0].children[0].href = `item.html?product_no=${SameProductlist[randomNum].product_no}`
                related_items[i].children[0].children[0].children[0].children[0].src = SameProductlist[randomNum].product_image;
                related_items[i].children[0].children[1].innerText = SameProductlist[randomNum].product_name;
                related_items[i].children[0].children[2].innerText = "NT." + SameProductlist[randomNum].product_price;
                related_items[i].children[1].value = SameProductlist[randomNum].product_no;
                SameProductlist.splice(randomNum, 1);
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
                        name = this.previousElementSibling.previousElementSibling.innerText;
                        image = this.previousElementSibling.previousElementSibling.previousElementSibling.children[0].children[0].src;
                        image = image.substr(image.indexOf('images'));
                        price = this.previousElementSibling.innerText;
                        price = price.replace('NT.', "");
                        productInfo = `${name}|${image}|${price}`;
                        addItem(this.parentNode.nextElementSibling.value, productInfo);
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
                    First();
                    createCartContentList(itemValue, itemId);
                    function createCartContentList(itemInfo, key) {
                        let cartUpdateFormClone = document.getElementById("cartUpdateFormWrap").children[1].cloneNode(true);
                        cartUpdateFormClone.id = key;
                        cartUpdateFormClone.style.display = '';
                        document.getElementById("cartUpdateFormWrap").insertBefore(cartUpdateFormClone, document.getElementById("cartUpdateFormWrap").lastElementChild.previousElementSibling);
                        cartUpdateFormClone.children[0].children[0].children[0].children[0].children[0].src = itemInfo.split('|')[1];
                        cartUpdateFormClone.children[0].children[0].children[1].children[0].innerText = itemInfo.split('|')[0];
                        cartUpdateFormClone.children[0].children[0].children[3].children[0].children[1].value = itemInfo.split('|')[3];
                        cartUpdateFormClone.children[0].children[0].children[2].children[0].children[0].innerText = itemInfo.split('|')[2];
                        cartUpdateFormClone.children[0].children[0].children[4].children[0].children[0].innerText = parseInt(itemInfo.split('|')[2]) * parseInt(itemInfo.split('|')[3]);//小計
                        cartUpdateFormClone.children[0].children[0].children[1].children[2].children[0].innerText = itemInfo.split('|')[2];
                    }
                    // console.log(document.querySelectorAll(".btnLess")[document.getElementById("cartUpdateFormWrap").childElementCount-4]);
                    let btnLess = document.querySelectorAll(".btnLess")[document.getElementById("cartUpdateFormWrap").childElementCount - 4];
                    let btnPlus = document.querySelectorAll(".btnPlus")[document.getElementById("cartUpdateFormWrap").childElementCount - 4];
                    let sumTotalPrice = document.getElementById('sumTotalPrice');
                    sumTotalPrice.innerText = parseInt(sumTotalPrice.innerText) + parseInt(itemValue.split('|')[2]);
                    btnLess.style.cursor = "pointer";
                    btnPlus.style.cursor = "pointer";
                    btnLess.addEventListener('click', function () {
                        if (this.nextElementSibling.value > 1) {
                            this.nextElementSibling.value -= 1;
                            this.parentNode.parentNode.nextElementSibling.children[0].children[0].innerText = this.nextElementSibling.value * this.parentNode.parentNode.previousElementSibling.children[0].children[0].innerText;
                            sumTotalPrice.innerText = parseInt(sumTotalPrice.innerText) - parseInt(this.parentNode.parentNode.previousElementSibling.children[0].children[0].innerText);
                            let itemInfo = storage[this.parentNode.parentNode.parentNode.parentNode.parentNode.id];
                            itemInfo = itemInfo.split('|')[0] + '|' + itemInfo.split('|')[1] + '|' + itemInfo.split('|')[2] + '|' + this.nextElementSibling.value;
                            storage[this.parentNode.parentNode.parentNode.parentNode.parentNode.id] = itemInfo;
                        }
                    }, false);
                    btnPlus.addEventListener('click', function () {
                        this.previousElementSibling.value = parseInt(this.previousElementSibling.value) + 1;
                        this.parentNode.parentNode.nextElementSibling.children[0].children[0].innerText = this.previousElementSibling.value * this.parentNode.parentNode.previousElementSibling.children[0].children[0].innerText;
                        sumTotalPrice.innerText = parseInt(sumTotalPrice.innerText) + parseInt(this.parentNode.parentNode.previousElementSibling.children[0].children[0].innerText);
                        let itemInfo = storage[this.parentNode.parentNode.parentNode.parentNode.parentNode.id];
                        itemInfo = itemInfo.split('|')[0] + '|' + itemInfo.split('|')[1] + '|' + itemInfo.split('|')[2] + '|' + this.previousElementSibling.value;
                        storage[this.parentNode.parentNode.parentNode.parentNode.parentNode.id] = itemInfo;
                    }, false);
                    let delButton = document.getElementsByClassName('deleteBtn')[document.getElementById("cartUpdateFormWrap").childElementCount - 4];
                    let iconDeleteBtn = document.getElementsByClassName('iconDeleteBtn')[document.getElementById("cartUpdateFormWrap").childElementCount - 4];
                    delButton.addEventListener('click', function (e) {
                        e.preventDefault()
                        let key = this.parentNode.parentNode.parentNode.parentNode.parentNode.id;
                        let sumTotalPrice = document.getElementById('sumTotalPrice').innerText;
                        sumTotalPrice -= parseInt(this.parentNode.parentNode.previousElementSibling.children[0].children[0].innerText);
                        document.getElementById('sumTotalPrice').innerText = sumTotalPrice;
                        storage.removeItem(key);
                        storage['addItemList'] = storage['addItemList'].replace(key + ', ', '');
                        this.parentNode.parentNode.parentNode.parentNode.parentNode.remove();
                        First();
                    }, false);
                    iconDeleteBtn.addEventListener('click', function (e) {
                        e.preventDefault();
                        let key = this.parentNode.parentNode.parentNode.parentNode.id;
                        // //1.先扣除總金額
                        let sumTotalPrice = document.getElementById('sumTotalPrice').innerText;
                        sumTotalPrice -= parseInt(this.parentNode.previousElementSibling.previousElementSibling.children[0].children[0].innerText);
                        // //this是我的btn,parentNode是的爸爸//JS=>this=e.currentTarget(事件加在誰身上)
                        document.getElementById('sumTotalPrice').innerText = sumTotalPrice;
                        //2.清除storage的資料
                        storage.removeItem(key);
                        storage['addItemList'] = storage['addItemList'].replace(key + ', ', '');
                        //3.刪除該筆form
                        this.parentNode.parentNode.parentNode.parentNode.remove();
                        console.log(this.parentNode.parentNode.parentNode.parentNode);
                        First();
                    })
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