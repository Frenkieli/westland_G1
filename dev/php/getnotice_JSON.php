<?php
// <!-- ====園區公告資訊==== -->

try{
    require_once("connectWestland.php"); //引用連線
    $sql = "select * from notice" ;
    $notices =$pdo->prepare($sql);
    $notices->execute();
    if($notices->rowCount()==0){
        echo "{}";
    }else{
        //=====撈資料=====
        $noticeRow=$notices->fetchAll(PDO::FETCH_ASSOC);
        //=====轉成json格式回傳=====
        echo json_encode($noticeRow);
    }
}catch(PDOException $e){
    echo $e->getMessage();
}

?>