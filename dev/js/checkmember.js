//點選購買鈕
document.getElementById("buy_ticket").addEventListener("click",function(){
    if(storage.getItem("member_no")==null){
        alertify.alert("尚未登入，馬上幫你轉跳",function(){
            $('#lightBox').css('display', 'block');
        });
    }else if(checkclick == 0){
        alertify.alert("請先客製化自己的吉祥物");
    }else{
        document.getElementById("membernocheck").value = storage.getItem("member_no");

        //建立ajax物件
        let xhr = new XMLHttpRequest();
        xhr.onload = function(){
            if(xhr.status == 200){
                moneycost(JSON.parse(xhr.responseText));
                console.log(JSON.parse(xhr.responseText));
                // alert(JSON.parse(xhr.responseText));
            }
            else{
                alertify.alert("系統異常,請通知系統維護人員",xhr.status);
            }
        }
        let check_member_money = new FormData(document.getElementById("member_moneycheck"));
        xhr.open("POST","php/membercheck.php",true);
        xhr.send(check_member_money);
    }
});

function moneycost(money){
    if(money[0].member_money<600){
        alertify.alert(`金額不足，目前賞金餘額為${money[0].member_money}`);
    }else{
        document.getElementById("uploadmoney").value = money[0].member_money;
        // document.getElementById("uploadticketno").value = parseInt(money[1].ticket_no)+1;
        // console.log("下一張門票流水",document.getElementById("uploadticketno").value);
        uploadticket();
    }
}

function uploadticket(){
    document.getElementById("uploadmemberno").value = storage.getItem("member_no");
    //吉祥物canvas檔案存為png
    let canvaspng = document.getElementById("canvastopng");
    let dataURL = canvaspng.toDataURL("image/png");
    document.getElementById("uploadmascot").value = dataURL;
    //門票canvas檔案存為jpeg
    let canvaspic = document.getElementById("canvastopic");
    let dataURLpic = canvaspic.toDataURL("image/jpeg");
    document.getElementById("uploadticketpic").value = dataURLpic;

    let xhr = new XMLHttpRequest();
    xhr.onload = function(){
        if(xhr.status ==200){
            alertify.alert(xhr.responseText);
            // console.log(xhr.responseText);
        }else{
            alertify.alert("系統異常,請通知系統維護人員");
        }
    }
    let upload = new FormData(document.getElementById("ticket_mascot_upload"));
    xhr.open("POST","php/uploadticket.php",true);
    xhr.send(upload);
}