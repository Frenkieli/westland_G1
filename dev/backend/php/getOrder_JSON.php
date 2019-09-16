<?php 
    try{
        //=====建立資料庫連線=====
        require_once("connectWestland.php");
        //=====SQL語法=====
        $sql="select * from ordermaster";
        $orders=$pdo->prepare($sql);
        $orders->execute();
        if($orders->rowCount()==0){
            echo "{}";
        }else{
            //=====撈資料=====
            $orderRow=$orders->fetchAll(PDO::FETCH_ASSOC);
            //=====轉成json格式回傳=====
            echo json_encode($orderRow);
        }
    }catch(PDOException $e){
        echo $e->getMessage();
    }
?>