//<!-- -----------購物車內頁商品動態新增start-------- -->

// console.log(window.location.href.indexOf('info'));
if (window.location.href.indexOf('info') != -1) {

} else {
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


            // console.log(cartUpdateFormClone.children[0].children[0].children[1]);//test

            cartUpdateFormClone.children[0].children[0].children[0].children[0].children[0].src = itemInfo.split('|')[1];//／圖片
            cartUpdateFormClone.children[0].children[0].children[1].children[0].innerText = itemInfo.split('|')[0];//商品名稱
            cartUpdateFormClone.children[0].children[0].children[2].children[0].children[0].innerText = itemInfo.split('|')[2];//單價
            cartUpdateFormClone.children[0].children[0].children[3].children[0].children[0].value = itemInfo.split('|')[3];//數量
            cartUpdateFormClone.children[0].children[0].children[4].children[0].children[0].innerText = itemInfo.split('|')[2] * itemInfo.split('|')[3];//小計
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
            alert(key);
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
        }
    }
    shopingCartFirst();
}




//<!-- -----------購物車動態新增end-------- -->
//<!-- -----------購物車數量及小計end-------- -->

var paymentMethod = 0;
order = 0;
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
                // console.log(this.parentNode.parentNode.parentNode.parentNode.parentNode);
                // console.log(id);
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
//<!-- -----------購物車結帳付款抓訂貨人資訊-------- -->
// function $id(id) {
//     return document.getElementById(id);
// }
document.getElementById("member_no").value = storage.getItem("member_no");
// console.log(document.getElementById("member_no").value);
function checkMemberIfo() {//撈訂購人資訊

    //產生XMLHttpRequest物件
    let xhr = new XMLHttpRequest(); //readyState : 0
    xhr.onload = function () {//readyState : 4
        if (xhr.status == 200) { //............成功
            // checkMember(xhr.responseText)//回應的資料中含有exist
            let memberInfo = JSON.parse(xhr.responseText);
            // console.log(JSON.parse(xhr.responseText));
            // console.log(xhr.responseText);
            //訂購人資訊
            document.querySelector(".order_person_name").value = memberInfo.member_name;
            document.querySelector(".order_person_phone").value = memberInfo.member_tel;
            document.querySelector(".order_person_email").value = memberInfo.member_email;
            // console.log(memberInfo);
            // console.log(memberInfo.member_money);
            //確認訂單按鈕事件
            //                 <form id="toRecipient">
            //                      <input name="member_no" type="hidden">
            //                      <input name="cancel_order_item_date" type="hidden">
            //                      <input name="order_item_total" type="hidden">
            //                      <input name="recipient_name" type="hidden">
            //                      <input name="recipient_phone" type="hidden">
            //                      <input name="recipient_addre" type="hidden">
            //                 </form>
            document.getElementById('check').addEventListener('click', function () {
                // console.log(parseInt(document.getElementById('sumTotalPrice').innerText));
                // console.log(parseInt(memberInfo.member_money));
                if (document.querySelector(".recipient_name").value.trim() == "")
                    alertify.alert("收件人姓名尚未輸入");
                else if (document.querySelector(".recipient_phone").value.trim() == "")
                    alertify.alert("收件人電話尚未輸入");
                else if (document.querySelector(".recipient_addre").value.trim() == "")
                    alertify.alert("收件人地址尚未輸入");
                else {
                    //購物金付款(購物金不夠用)
                    if (parseInt(document.getElementById('sumTotalPrice').innerText) > parseInt(memberInfo.member_money) && paymentMethod == 1) {
                        alertify.alert(`你的購物金不夠喔，您目前所擁有的購物金 : ${parseInt(memberInfo.member_money)}`);
                    }
                    //購物金付款(購物金夠用) 或是 線上付款
                    else {
                        //所有購物車商品資訊動態新增到訂單表單
                        let itemSum = 0;
                        let allItemId = '';
                        let allItemCount = '';
                        let allItemPrice = '';
                        for (let i = 0; i < document.getElementById('cartUpdateFormWrap').childElementCount - 3; i++) {
                            allItemId = allItemId + document.getElementById('cartUpdateFormWrap').children[i + 1].id;
                            allItemCount = allItemCount + 'ct-' + document.getElementById('cartUpdateFormWrap').children[i + 1].children[0].children[0].children[3].children[0].children[0].value;
                            allItemPrice = allItemPrice + 'pe-' + document.getElementById('cartUpdateFormWrap').children[i + 1].children[0].children[0].children[2].children[0].innerText.replace("$", "");
                            itemSum += 1;
                        }
                        //各商品的ID
                        let allItemIdInput = document.createElement('input');
                        allItemIdInput.name = `allItemId`;
                        allItemIdInput.type = "hidden";
                        allItemIdInput.value = allItemId;
                        document.getElementById('toRecipient').appendChild(allItemIdInput);
                        //各商品的數量
                        let allItemCountInput = document.createElement('input');
                        allItemCountInput.name = `allItemCount`;
                        allItemCountInput.type = "hidden";
                        allItemCountInput.value = allItemCount;
                        document.getElementById('toRecipient').appendChild(allItemCountInput);
                        //各商品的單價
                        let allItemPriceInput = document.createElement('input');
                        allItemPriceInput.name = `allItemPrice`;
                        allItemPriceInput.type = "hidden";
                        allItemPriceInput.value = allItemPrice;
                        document.getElementById('toRecipient').appendChild(allItemPriceInput);
                        //商品總筆數
                        let itemSumInput = document.createElement('input');
                        itemSumInput.name = `itemSum`;
                        itemSumInput.type = "hidden";
                        itemSumInput.value = itemSum;
                        document.getElementById('toRecipient').appendChild(itemSumInput);
                        // console.log(itemSum);
                        //要送出的訂單表單
                        let sendOrderForm = document.getElementById('toRecipient');
                        //會員
                        sendOrderForm.children[0].value = document.getElementById("member_no").value;
                        //日期
                        let date = new Date();
                        let Formdate_getFullYear = date.getFullYear();
                        let Formdate_getMonth = date.getMonth() + 1;
                        if (Formdate_getMonth < 10)
                            Formdate_getMonth = `0${Formdate_getMonth}`;
                        let Formdate_getDate = date.getDate();
                        let Formdate = `${Formdate_getFullYear}-${Formdate_getMonth}-${Formdate_getDate}`;
                        sendOrderForm.children[1].value = Formdate;
                        // console.log(date);
                        // console.log(Formdate);
                        //訂單總金額
                        sendOrderForm.children[2].value = document.getElementById('sumTotalPrice').innerText;
                        //收件人姓名
                        sendOrderForm.children[3].value = document.querySelector('.recipient_name').value;
                        //收件人電話
                        sendOrderForm.children[4].value = document.querySelector('.recipient_phone').value;
                        //收件人地址
                        sendOrderForm.children[5].value = document.querySelector('.recipient_addre').value;
                        console.log(sendOrderForm);

                        //送出表單(沒防呆)
                        let xhrForm = new XMLHttpRequest();
                        xhrForm.onload = function () {
                            if (xhrForm.status == 200) {
                                // alert('成功');
                                if (paymentMethod == 1) {
                                    alertify.alert(`購物金付款成功!，您目前所擁有的購物金 : ${parseInt(memberInfo.member_money) - parseInt(document.getElementById('sumTotalPrice').innerText)}，點擊確認返回周邊商品`, function () {
                                        setTimeout(function () {
                                            window.location = 'items.html';
                                        }, 100);
                                    });
                                } else {
                                    // alertify.alert(xhrForm.responseText);
                                    alertify.alert('線上付款成功!，點擊確認返回周邊商品', function () {
                                        setTimeout(function () {
                                            window.location = 'items.html';
                                        }, 100);
                                    });
                                }
                                // console.log(xhrForm.responseText);
                                //清除購物車
                                var storage = sessionStorage;
                                let itemString = storage['addItemList'];
                                let items = itemString.substr(0, itemString.length - 2).split(', ');
                                for (let i = 0; i < items.length; i++) {
                                    storage.removeItem(items[i]);
                                    storage['addItemList'] = storage['addItemList'].replace(items[i] + ', ', '');
                                }
                                First();
                            } else {
                                alertify.alert(xhrForm.responseText);
                            }
                        }
                        let myForm = new FormData(sendOrderForm);
                        let url = `php/toRecipient_JSON.php?paymentMethod=${paymentMethod}`;
                        xhrForm.open('post', url, true);
                        xhrForm.send(myForm);
                    }
                }
            }, false);

        } else {//............失敗
            alertify.alert(xhr.status);
        }
    }
    // console.log(document.getElementById("getMember"));
    // let getMember = new FormData(document.getElementById("getMember"));
    // console.log(document.getElementById("member_no").value);
    // console.log("aaaaa",getMember);

    //設定好所要連結的程式
    var url = `php/getCheck_order_JSON.php?member_no=${document.getElementById("member_no").value}`;
    xhr.open("get", url, true);  //readyState : 1
    //送出資料
    xhr.send(null);//readyState : 2

}
//..........................................
window.addEventListener("load", checkMemberIfo, false);



//兩個click事件要分開function
// console.log(document.getElementById('payonline'));
document.getElementById('payonline').addEventListener('click', function () {
    paymentMethod = 0;
    let payonline = document.getElementById('payonline');
    let online = document.getElementById('online');
    let hoverf09100 = document.createAttribute("class");
    let payon = document.getElementById('payon');
    hoverf09100.value = "hoverf09100";
    // payonline.classList.add(hoverf09100);
    this.style.background = `#f09100`;
    payon.style.background = `#809957`;
    online.style.display = "block";
    on.style.borderTop = "1px solid #ccc";
}, false);

document.getElementById('payon').addEventListener('click', function () {
    paymentMethod = 1;
    let payon = document.getElementById('payon');
    let on = document.getElementById('on');
    let payonline = document.getElementById('payonline');
    this.style.backgroundColor = `#f09100`;
    // payon.classList.add(hoverf09100);//用class去控要獨立出來，scss不能有東西包
    let hoverf09100 = document.createAttribute("class");
    online.style.display = "none";
    on.style.borderTop = "none";
    payonline.style.background = `#809957`;

}, false);



function eYear() {
    var nowTime = new Date();
    var theYear = nowTime.getFullYear();

    var chooseYear = document.getElementById("chooseYear");
    if (chooseYear) {
        for (var i = 0; i < 20; i++) {
            var t = theYear + i + "年";
            var v = theYear + i;
            var new_option = new Option(t, v);
            chooseYear.options.add(new_option);
        }
    }
}
eYear();

function eMonth() {
    var chooseMonth = document.getElementById("chooseMonth");
    if (chooseMonth) {
        for (var i = 1; i <= 12; i++) {
            var t = i + "月";
            var v = i;
            var new_option = new Option(t, v);
            chooseMonth.options.add(new_option);
        }
    }
}
eMonth();
