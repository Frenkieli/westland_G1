// 小圖換大圖
function showLarge(e){
    let now = e.target;
    let change = now.src.replace("_small","").replace(".png",".svg");
    document.getElementById("big").src = change;
}

// 門票數量增加
function countplus(){
    let count = parseInt(document.getElementById("ticket_amount").value);
    let box = document.querySelector(".opcatity_box");
    console.log(count);
    if( count>=1 ){
        box.innerText = "";
        count = count+1;
    }
    document.getElementById("ticket_amount").value = count;
}

// 門票數量減少
function countless(){
    let count = parseInt(document.getElementById("ticket_amount").value);
    let box = document.querySelector(".opcatity_box");
    console.log(count);
    if( count<=1 ){
        count=1;
        box.innerText = "門票數量數量不能少於1";
    }else{
        count = count-1;
    }
    document.getElementById("ticket_amount").value = count;
}

// // 檢查input type
// function counttype(){
//     let type = typeof counttype;
//     alert(type);
//     if( type != "number" ){
//         alert("請勿輸入非數字選項");
//     }
// }


function init(){
    // 小圖換大圖
    let img = document.getElementsByClassName("mascots");
    for( let i=0 ; i<img.length ; i++ ){
        img[i].onclick = showLarge;
    }
    
    // 檢查input type
    // let count = document.getElementById("ticket_amount");
    // count.addEventListener("keyup",counttype);
    
    // 門票數量增加
    let plus = document.querySelector(".plus");
    plus.addEventListener("click",countplus);

    // 門票數量減少
    let less = document.querySelector(".less");
    less.addEventListener("click",countless);
}

window.onload = init;