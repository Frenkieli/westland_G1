function quantityLess(){
    var btnLess = document.getElementsByClassName("btnLess");
    if(btnLess){
        for (var i = 0; i < btnLess.length; i++) {
            btnLess[i].onclick = function () { changePrice(event, -1); }
        }
    }
}
function quantityPlus(){
    var btnPlus = document.getElementsByClassName("btnPlus");
    if(btnPlus){
        for (var i = 0; i < btnPlus.length; i++) {
            btnPlus[i].onclick = function () { changePrice(event, 1); }
        }
    }
}
function inputReadOnly(){
    var quantity = document.getElementsByClassName("quantity");
    if(quantity){
        for (var i = 0; i < quantity.length; i++) {
            quantity[i].min = 1;
            quantity[i].max = 99;
            quantity[i].readOnly = true;
        }
    }
}