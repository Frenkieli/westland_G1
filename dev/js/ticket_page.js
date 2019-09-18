// 小圖換大圖
function showLarge(e){
    let now = e.target;
    let change = now.src;
    document.getElementById("big").src = change;
}

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
    itemscale+=0.15;
    if(itemscale>=2.5){
        itemscale=2.5;
    }else{
        opabox.style.transform = "scale(" + itemscale + ")rotate("+itemdeg+"deg)";
    }
};

//縮小樣式
function minusitem(){
    let opabox = document.getElementById("customize_opabox");
    itemscale-=0.15;
    if(itemscale<=0.5){
        itemscale=0.5;
    }else{
        opabox.style.transform = "scale(" + itemscale + ")rotate("+itemdeg+"deg)";
    }
};

// 樣式向右轉
function rightitem(){
    let opabox = document.getElementById("customize_opabox");
    itemdeg= parseInt(itemdeg)+10;
    opabox.style.transform = "scale(" + itemscale + ")rotate("+itemdeg+"deg)";
}

// 樣式向左轉
function leftitem(){
    let opabox = document.getElementById("customize_opabox");
    itemdeg= parseInt(itemdeg)-10;
    opabox.style.transform = "scale(" + itemscale + ")rotate("+itemdeg+"deg)";
}

//刪除樣式
function trashitem(){
    let opabox = document.getElementById("customize_opabox");
    let child = opabox.firstElementChild;
    opabox.removeChild(child);
    itemdeg=0;
    itemscale=1;
    opabox.style.transform = "scale(" + itemscale + ")rotate("+itemdeg+"deg)";
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

//確認存圖
function confirm(){
    //宣告canvas
    let canvasarea = document.getElementById("canvastopng").getContext("2d");

    let img = new Image();
    let img2 = new Image();

    //抓box位置customize_mascot
    let customizeHeight = document.getElementById("savetocanvas").offsetHeight;
    let customizeWidth = document.getElementById("savetocanvas").offsetWidth;
    // console.log(customizeWidth,customizeHeight);

    //抓opabox位置
    let opaboxHeight = document.getElementById("customize_opabox").offsetHeight;
    let opaboxWidth = document.getElementById("customize_opabox").offsetWidth;
    let opaboxTop = document.getElementById("customize_opabox").offsetTop;
    let opaboxLeft = document.getElementById("customize_opabox").offsetLeft;
    // console.log(opaboxWidth,opaboxHeight,opaboxTop,opaboxLeft);

    //計算縮放比
    let boxscale = itemscale;
    let boxdeg = itemdeg;
    let opaboxDeg = boxdeg * Math.PI / 180;
    // console.log("what is going on",opaboxDeg);

    let Heightrule = opaboxHeight/customizeHeight*233*boxscale;
    let Widthrule = opaboxWidth/customizeWidth*280*boxscale;
    // console.log(Heightrule,Widthrule);
    
    let Toprule = (opaboxTop+(opaboxHeight/2))*(233/customizeHeight)-(Heightrule/2);
    let Leftrule = (opaboxLeft+(opaboxWidth/2))*(233/customizeWidth)-(Widthrule/2)+25;
    // console.log(Toprule,Leftrule);

    canvasarea.clearRect(0,0,280,233);  //清除舊圖

    img.src = document.getElementById("big").src;
    img2.src = document.getElementById("customize_opabox").firstElementChild.src;
    
    let imgsrcStr = "";
    imgsrcStr+=img.src;

    if(img.src.indexOf("role4")!=-1 || img.src.indexOf("role5")!=-1){
        canvasarea.drawImage(img,80,13,130,197);
        canvasarea.translate((Leftrule+Widthrule/2),(Toprule+Heightrule/2));
        canvasarea.rotate(opaboxDeg);
        canvasarea.drawImage(img2,-Widthrule/2+5,-Heightrule/2-18,Widthrule,Heightrule);
        canvasarea.rotate(-opaboxDeg);
        canvasarea.translate(-(Leftrule+Widthrule/2),-(Toprule+Heightrule/2));
    }else if(img.src.indexOf("role2")!=-1){
        canvasarea.drawImage(img,20,33,220,147);
        canvasarea.translate((Leftrule+Widthrule/2),(Toprule+Heightrule/2));
        canvasarea.rotate(opaboxDeg);
        canvasarea.drawImage(img2,-Widthrule/2-15,-Heightrule/2-15,Widthrule,Heightrule);
        canvasarea.rotate(-opaboxDeg);
        canvasarea.translate(-(Leftrule+Widthrule/2),-(Toprule+Heightrule/2));
    }else{
        canvasarea.drawImage(img,40,33,200,167);
        canvasarea.translate((Leftrule+Widthrule/2),(Toprule+Heightrule/2));
        canvasarea.rotate(opaboxDeg);
        canvasarea.drawImage(img2,-Widthrule/2,-Heightrule/2,Widthrule,Heightrule);
        canvasarea.rotate(-opaboxDeg);
        canvasarea.translate(-(Leftrule+Widthrule/2),-(Toprule+Heightrule/2));
    }
}



function init(){
    //樣式角度

    itemdeg=0;
    itemscale=1;

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
        let breakpoint = ticket_custom.indexOf("break");
        let point = ticket_custom.indexOf("point");

        let items = document.getElementById("ticket_items");
        let mascots = document.getElementById("ticket_mascots");
        let activity = document.getElementById("ticket_activity");

        for(i=0;i<breakpoint;i++){
            let img = document.createElement("img");
            img.className="items_cus";
            img.alt= "配件"+(i+1);
            img.src = ticket_custom[i].mascot_customize_image;
            items.children[i].appendChild(img);
        }
        for(i=breakpoint+1;i<point;i++){
            let img = document.createElement("img");
            img.className="mascots";
            img.alt= "吉祥物"+(i-breakpoint);
            img.src = ticket_custom[i].mascot_image;
            mascots.children[i-(breakpoint+1)].appendChild(img);
        }
        for(i=point+1;i<ticket_custom.length;i++){
            let startspan = document.createElement("span");
            let endspan = document.createElement("span");
            let titlespan = document.createElement("span");

            startspan.className="ticket_startdate";
            startspan.innerText=ticket_custom[i].activity_date_start;

            endspan.className="ticket_enddate";
            endspan.innerText=ticket_custom[i].activity_date_end;

            titlespan.className="ticket_activity_title";
            titlespan.innerText=ticket_custom[i].activity_name;

            activity.children[i-(point+1)].appendChild(startspan);
            activity.children[i-(point+1)].appendChild(endspan);
            activity.children[i-(point+1)].appendChild(titlespan);
        }
    }

    //抓首頁暫存
    //如果都沒有暫存的話，客製吉祥物預設為第一隻，樣式為空值
    if(storage.getItem("bigsrc")==null){
        bigsrc = "images/cusitems/role1.svg";
        opasrc = " ";
    } //如果只選擇吉祥物沒選樣式的話，吉祥物為暫存區路徑，樣式為空值
    else if(storage.getItem("opasrc")==null){
        bigsrc = storage.getItem("bigsrc");
        opasrc = " ";
    } //選擇了吉祥物及樣式的話，吉祥物和樣式為暫存區路徑
    else{
        bigsrc = storage.getItem("bigsrc");
        opasrc = storage.getItem("opasrc");

        let axisstr = storage.getItem("itemaxis");
        axis = axisstr.split(",");
        
        // 需判斷暫存是否有值在執行
        //樣式座標
        itemdeg = axis[5];
        let axisbox = document.getElementById("customize_opabox");
        axisbox.style.width = axis[1]+"px";
        axisbox.style.height = axis[0]+"px";
        axisbox.style.left = axis[3]+"px";
        axisbox.style.top = (axis[2]-350)+"px";
        axisbox.style.transform = "rotate("+ axis[5] +"deg)";
    }

    // 小圖換大圖
    let img = document.getElementsByClassName("mascots");
    for( let i=0 ; i<img.length ; i++ ){
        img[i].onclick = showLarge;
    }

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

    // 確認客製化
    let customize_confirm = document.getElementById("customize_confirm");
    customize_confirm.addEventListener("click",confirm);

    //抓暫存
    document.getElementById("big").src = bigsrc;
    let opaitem = document.createElement("img");
    opaitem.src = opasrc;
    document.getElementById("customize_opabox").appendChild(opaitem);
}



//拖拉樣式位置
$("#customize_opabox").draggable({
    containment: ".customize_mascot",
    cursor: "move", 
});

window.onload = init;