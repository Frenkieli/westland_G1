<?php 
    try{
        //=====建立資料庫連線=====
        require_once("connectWestland.php");
        //=====SQL語法=====
        $sql="select * from activity";
        $activitys=$pdo->prepare($sql);
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