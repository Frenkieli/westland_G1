<?php
    try{
        //=====建立資料庫連線=====
        require_once("connectWestland.php");
        //=====SQL語法=====
        $sql ="select * from mission ";
        $missions =$pdo->prepare($sql);
        $missions->execute();
        if($missions->rowCount()==0){
            echo "{}";
        }else{
            //=====撈資料=====
            $missionRow=$missions->fetchAll(PDO::FETCH_ASSOC);
            //=====轉成json格式回傳=====
            echo json_encode($missionRow);
        }
    }catch(PDOException $e){
        echo $e->getMessage();
    }
?>