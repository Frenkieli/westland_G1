
<?php
// <!-- ====活動資訊==== -->

try{
    require_once("connectWestland.php"); //引用連線
    $sql = "SELECT * FROM activity UNION SELECT * FROM notice ORDER by activity_date_start DESC limit 3" ;
    $activitys =$pdo->prepare($sql);
    $activitys->execute();
    if($activitys->rowCount()==0){
        echo "{}";
    }else{
        //=====撈資料=====
        $activityRow=$activitys->fetchAll(PDO::FETCH_ASSOC);
        //=====轉成json格式回傳=====
        echo json_encode($activityRow);
    }
}catch(PDOException $e){
    echo $e->getMessage();
}

?>