// 小圖換大圖
function showLarge(e){
    let now = e.target;
    let change = now.src;
    document.getElementById("big").src = change;
}

// 門票數量增加
// function countplus(){
//     let count = parseInt(document.getElementById("ticket_amount").value);
//     let box = document.querySelector(".opcatity_box");
//     console.log(count);
//     if( count>=1 ){
//         box.innerText = "";
//         count = count+1;
//     }
//     document.getElementById("ticket_amount").value = count;
// }

// 門票數量減少
// function countless(){
//     let count = parseInt(document.getElementById("ticket_amount").value);
//     let box = document.querySelector(".opcatity_box");
//     console.log(count);
//     if( count<=1 ){
//         count=1;
//         box.innerText = "門票數量數量不能少於1";
//     }else{
//         count = count-1;
//     }
//     document.getElementById("ticket_amount").value = count;
// }

// // 檢查input type
// function counttype(){
//     let type = typeof counttype;
//     alert(type);
//     if( type != "number" ){
//         alert("請勿輸入非數字選項");
//     }
// }

//選擇樣式
function showopa(e){
    let opabox = document.getElementById("customize_opabox");
    if(opabox.lastElementChild){
        let child = opabox.lastElementChild;
        opabox.removeChild(child);
        let now = e.target;
        let change = now.src;
        let opaimg = document.createElement("img");
        opaimg.src = change;
        opabox.appendChild(opaimg);
    }else{
        let now = e.target;
        let change = now.src;
        let opaimg = document.createElement("img");
        opaimg.src = change;
        opabox.appendChild(opaimg);
    }
};

//放大樣式
function plusitem(){
    let opabox = document.getElementById("customize_opabox");
    let width = parseInt(window.getComputedStyle(opabox).width);
    if(width >= 240){
        width = 240;
    }else{
        widthnow = width + 10 +"px";
        opabox.style.width = widthnow;
    }
    console.log(widthnow); 
};

//縮小樣式
function minusitem(){
    let opabox = document.getElementById("customize_opabox");
    let width = parseInt(window.getComputedStyle(opabox).width);
    // let width = parseInt(opabox.style.width);  //只能抓到寫在inline-style的
    console.log(width);
    if(width <= 50){
        width = 50;
    }else{
        widthnow = width - 10 +"px";
        opabox.style.width = widthnow;
    }
    console.log(widthnow); 
};

// 樣式向右轉
function rightitem(){
    let opabox = document.getElementById("customize_opabox");
    itemdeg+=10;
    opabox.style.transform = "rotate("+itemdeg+"deg)";
}

// 樣式向左轉
function leftitem(){
    let opabox = document.getElementById("customize_opabox");
    itemdeg-=10;
    opabox.style.transform = "rotate("+itemdeg+"deg)";
}

//刪除樣式
function trashitem(){
    let opabox = document.getElementById("customize_opabox");
    let child = opabox.firstElementChild;
    opabox.removeChild(child);
};

//更換賞單圖片
function changepic(){
    let pic = document.getElementById("uploadpic").files[0];
    let readpic = new FileReader();
    readpic.readAsDataURL(pic);
    readpic.addEventListener("load",function(){
        let preinstallpic = document.getElementById("preinstallpic");
        preinstallpic.src = this.result;
        preinstallpic.style.width = "300px";
        preinstallpic.style.height = "300px";
    });
}


function init(){
    //客製化樣式撈資料
    let xhr = new XMLHttpRequest();
    xhr.onload = function () {
        if (xhr.status == 200) {
            customizedimg(xhr.responseText);
        }
        else {
            alert(xhr.status);
        }
    }
    let url = "php/getTicket_customized_items_JOSN.php";
    xhr.open('get', url, false);
    // 樣式無法使用非同步，因為控制樣式的function會被吃到
    xhr.send(null);
    function customizedimg(jsonStr){
        let ticket_custom = JSON.parse(jsonStr);
        console.log(ticket_custom);
        let breakpoint = ticket_custom.indexOf("break");

        let items = document.getElementById("ticket_items");
        let mascots = document.getElementById("ticket_mascots");

        for(i=0;i<breakpoint;i++){
            let img = document.createElement("img");
            img.className="items_cus";
            img.alt= "配件"+(i+1);
            img.src = ticket_custom[i].mascot_customize_image;
            items.children[i].appendChild(img);
        }
        console.log(breakpoint);
        for(i=breakpoint+1;i<ticket_custom.length;i++){
            let img = document.createElement("img");
            img.className="mascots";
            img.alt= "吉祥物"+(i-6);
            img.src = ticket_custom[i].mascot_image;
            mascots.children[i-7].appendChild(img);
        }
    }


    // 小圖換大圖
    let img = document.getElementsByClassName("mascots");
    for( let i=0 ; i<img.length ; i++ ){
        img[i].onclick = showLarge;
    }
    
    // 檢查input type
    // let count = document.getElementById("ticket_amount");
    // count.addEventListener("keyup",counttype);
    
    // 門票數量增加
    // let ticketplus = document.querySelector(".plus");
    // ticketplus.addEventListener("click",countplus);

    // 門票數量減少
    // let ticketless = document.querySelector(".less");
    // ticketless.addEventListener("click",countless);

    // 選擇樣式
    let itemimg = document.getElementsByClassName("items_cus");
    for( let i=0 ; i<itemimg.length ; i++ ){
        itemimg[i].onclick = showopa;
    }
    // 放大樣式鈕
    let plus = document.getElementById("opabox_plus");
    plus.addEventListener("click",plusitem);
    // 縮小樣式鈕
    let minus = document.getElementById("opabox_minus");
    minus.addEventListener("click",minusitem);
    //原始角度0
    itemdeg = 0;
    // 選轉向右式鈕
    let turnright = document.getElementById("opabox_right");
    turnright.addEventListener("click",rightitem);
    // 選轉向左式鈕
    let turnleft = document.getElementById("opabox_left");
    turnleft.addEventListener("click",leftitem);
    // 垃圾桶鈕
    let trash = document.getElementById("opabox_del");
    trash.addEventListener("click",trashitem);

    //更換賞單圖片
    let uploadpic = document.getElementById("uploadpic");
    uploadpic.addEventListener("change",changepic);
}

//拖拉樣式位置
$("#customize_opabox").draggable({
    containment: ".customize_mascot",
    cursor: "move", 
});

window.onload = init;