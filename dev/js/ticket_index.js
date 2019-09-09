// 小圖換大圖
function showLarge(e){
    let now = e.target;
    let change = now.src.replace("_small","").replace(".png",".svg");
    document.getElementById("big").src = change;
}

function init(){
    // 小圖換大圖
    let img = document.getElementsByClassName("mascots");
    for( let i=0 ; i<img.length ; i++ ){
        img[i].onclick = showLarge;
    }
}

window.onload = init;