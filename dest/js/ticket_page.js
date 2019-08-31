function showLarge(e){
    var now = e.target;
    var change = now.src.replace("_small","").replace(".png",".svg");
    document.getElementById("big").src = change;
}

function init(){
    var img = document.getElementsByClassName("mascots");
    for( let i=0 ; i<img.length ; i++ ){
        img[i].onclick = showLarge;
    }
}

window.onload = init;