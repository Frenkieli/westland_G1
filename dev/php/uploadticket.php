<?php
$errMsg="";
    // 存圖路徑，沒有則新增
    $upload_mascot = "../images/ticket/member/mascot";
    $upload_picture = "../images/ticket/member/picture";
    if(!file_exists($upload_mascot)){
        mkdir($upload_mascot);
    }
    if(!file_exists($upload_picture)){
        mkdir($upload_picture);
    }
    // 吉祥物canvas.toDataURL的值
    $mem_mascot = $_POST["uploadmascot"];
    $mem_mascot = str_replace('data:image/png;base64,', '', $mem_mascot); //將檔案格式的資訊拿掉
    $mem_mascotdata = base64_decode($mem_mascot); //編碼

    // 門票圖canvas.toDataURL的值
    $mem_ticket = $_POST["uploadticketpic"];
    if(stristr($mem_ticket,"png")){
        $mem_ticket = str_replace('data:image/png;base64,', '', $mem_ticket); //將檔案格式的資訊拿掉
    }else if(stristr($mem_ticket,"jpeg")){
        $mem_ticket = str_replace('data:image/jepg;base64,', '', $mem_ticket); //將檔案格式的資訊拿掉
    }else if(stristr($mem_ticket,"jpg")){
        $mem_ticket = str_replace('data:image/jpg;base64,', '', $mem_ticket); //將檔案格式的資訊拿掉
    }else{
        $mem_ticket = str_replace('data:image/gif;base64,', '', $mem_ticket); //將檔案格式的資訊拿掉
    }
    $mem_ticketdata = base64_decode($mem_ticket); //編碼

    //money扣款後
    // $uploadmoney = $_POST["uploadmoney"]-600;
    // echo $uploadmoney;
    //會員id
    $uploadmember = $_POST["uploadmemberno"];
    //門票流水編號(+1)
    $ticket_no = $_POST["uploadticketno"];

    // 吉祥物檔名與路徑
    $mascotfile = $upload_mascot . "/" . $ticket_no . ".png";
    $mascotfileok = file_put_contents($mascotfile, $mem_mascotdata);
    // echo $mascotfileok ? $mascotfile : 'error';
    // 門票圖片檔名及路徑
    $ticketfile = $upload_picture . "/" . $ticket_no . ".png";
    $ticketfileok = file_put_contents($ticketfile, $mem_ticketdata);

    // 門票圖片儲存背景 使用input file傳圖 無法控制大小
    // switch($_FILES['uploadpic']['error']){
    //     case UPLOAD_ERR_OK:
        //         $upload_picture = "../images/ticket/member/picture";
        //         $from = $_FILES['uploadpic']['tmp_name'];
        //         $to = $upload_picture . "/" . $ticket_no . ".png";
        //         copy($from, $to);
        //         echo "購買成功";
        //         break;	
        // case UPLOAD_ERR_INI_SIZE:
        //         echo "上傳檔案太大,不得超過", ini_get("upload_max_filesize"),"<br>";
        //         break;
        // case UPLOAD_ERR_FORM_SIZE:
        //         echo "上傳檔案太大, 不得超過{$_POST["MAX_FILE_SIZE"]}位元組<br>";
        //         break;
        // case UPLOAD_ERR_PARTIAL:
        //         echo "上傳檔案不完整<br>";
        //         break;
    //     case UPLOAD_ERR_NO_FILE:
    //             echo "請上傳自己的門票圖片";
    //             break;
    // }
    
    //吉祥物資料庫路徑
    $mascotfile_src = "images/ticket/member/mascot". "/" . $ticket_no . ".png";
    
    //門票圖片資料庫路徑
    $picturefile_src = "images/ticket/member/picture". "/" . $ticket_no . ".png";

try{
    //上傳
    require_once("connectWestland.php");
    $sqlticket="insert into ticket(`member_no`,`image_source`,`mascot_image`)values(:member_no,:picture_src,:mascot_src)";
    $uploadtotal = $pdo->prepare($sqlticket);
    $uploadtotal->bindValue(":member_no",$uploadmember);
    $uploadtotal->bindValue(":picture_src",$picturefile_src);
    $uploadtotal->bindValue(":mascot_src",$mascotfile_src);
    $uploadtotal->execute();

    $sqlmember="update `members` SET `member_money`=`member_money`-600 WHERE `member_no`=:member_no";
    $uploadmoney = $pdo->prepare($sqlmember);
    $uploadmoney->bindValue(":member_no",$uploadmember);
    $uploadmoney->execute();

    echo "已成功購票";

}catch(PDOException $e){
    $errMsg .= "錯誤原因 : ".$e -> getMessage(). "<br>";
	$errMsg .= "錯誤行號 : ".$e -> getLine(). "<br>";
}
echo $errMsg;

?>