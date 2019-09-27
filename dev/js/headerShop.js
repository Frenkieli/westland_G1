var storage = sessionStorage;
if (storage['addItemList']) {
    First();
}
//把storage的商品以畫面呈現
function changCartIcon() {
    if (document.getElementById("navbar_shoppingCart_popup_wrap").childElementCount == 4)
        document.getElementById("navbar_shoppingCart_popup_wrap").children[3].remove();
    // console.log(document.getElementById('itemlist').childElementCount - 1);
    let shoppingCartPopClone = document.getElementById("navbar_shoppingCart_popup_wrap").children[2].cloneNode(true);
    // console.log(shoppingCartPopClone);
    shoppingCartPopClone.style.display = '';
    shoppingCartPopClone.children[0].innerText = document.getElementById('itemlist').childElementCount - 1;
    // if(document.getElementById("navbar_shoppingCart_popup_wrap").childElementCount>3)
    // document.getElementById("navbar_shoppingCart_popup_wrap").lastElementChild.removeChild();
    document.getElementById("navbar_shoppingCart_popup_wrap").appendChild(shoppingCartPopClone);

    let cartIcon = document.getElementById("navbar_shoppingCart_popup");
    // console.log(cartIcon.src.indexOf('images'));
    // console.log(cartIcon.src.substr(cartIcon.src.indexOf('images')));
    if (cartIcon.src.substr(cartIcon.src.indexOf('images')) == "images/navBar/shopcar_0.png") {
        cartIcon.src = "images/navBar/shopcar_1.png";

        // document.getElementById('shoppingCart_popup_count_number').innerText = items.length;
        // console.log(document.getElementById('itemlist').childElementCount-1);

    }
    // console.log(document.getElementsByClassName('shoppingCart_popup_count').length);
    // document.getElementsByClassName('shoppingCart_popup_count')[1].children[0].innerText = document.getElementById('itemlist').childElementCount-1;
}
function First() {
    if (storage['addItemList']) {
        document.getElementById("itemlist").innerHTML =
            `<div class="popup_item_title">
                        <div class="col-4 pt-10 pb-10">圖片</div>
                        <div class="col-8 pt-10 pb-10">名稱</div>
                    </div>`;
        let itemString = storage['addItemList'];
        // console.log(itemString);
        let items = itemString.substr(0, itemString.length - 2).split(', ');
        // console.log(items);   // ["A1001", "A1005", "A1002"] //
        for (let key in items) {  //use items[key]
            let itemInfo = storage.getItem(items[key]);
            // console.log(itemInfo);
            createCartList(itemInfo);
        }
        function createCartList(itemInfo) {
            // console.log(itemInfo);
            // console.log(itemInfo.split('|')[0]);
            // console.log(itemInfo.split('|')[1]);
            newDivfa = document.createElement('div');
            newDivfa.classList.add('cart_popup_item');
            newDivCh1 = document.createElement('div');
            newDivCh1.classList.add('col-4', 'pt-10', 'pb-10');
            newPCh1 = document.createElement('p');
            newImg1 = document.createElement('img');
            newImg1.src = itemInfo.split('|')[1];
            newDivCh2 = document.createElement('div');
            newDivCh2.classList.add('col-8', 'pt-10', 'pb-10');
            newPCh2 = document.createElement('p');
            newPCh2.innerText = itemInfo.split('|')[0];

            // 將table放進section，再將section放進cartList裡
            newPCh1.appendChild(newImg1);
            newDivCh1.appendChild(newPCh1);
            newDivfa.appendChild(newDivCh1);
            newDivCh2.appendChild(newPCh2);
            newDivfa.appendChild(newDivCh2);
            document.getElementById("itemlist").appendChild(newDivfa);
        }
        changCartIcon();
        (function () {
            // console.log(123);
            var tds = document.getElementById("navbar_shoppingCart_popup");
            //tds.length  記錄元素的個素
            tds.addEventListener('mouseover', showCartPop, false);
            tds.addEventListener('mouseout', normal, false);
        })();
    } else {
        var tds = document.getElementById("navbar_shoppingCart_popup");
        //tds.length  記錄元素的個素
        tds.removeEventListener('mouseover', showCartPop, false);
        tds.removeEventListener('mouseout', normal, false);
        document.getElementById("itemlist").innerHTML = "";
        if (document.getElementById("navbar_shoppingCart_popup_wrap").childElementCount == 4)
            document.getElementById("navbar_shoppingCart_popup_wrap").children[3].remove();
        let cartIcon = document.getElementById("navbar_shoppingCart_popup");
        cartIcon.src = "images/navBar/shopcar_0.png";
    }

}
function showCartPop() {
    obj = document.getElementById('itemlist');
    obj.style.display = "";
}
function normal() {
    obj = document.getElementById('itemlist');
    obj.style.display = "none";
}