<?php
    try{
        //=====建立資料庫連線=====
        require_once("connectWestland.php");
        //=====SQL語法=====
        $sql ="select * from product ";
        $products =$pdo->prepare($sql);
        $products->execute();
        if($products->rowCount()==0){
            echo "{}";
        }else{
            //=====撈資料=====
            $productRow=$products->fetchAll(PDO::FETCH_ASSOC);
            //=====轉成json格式回傳=====
            echo json_encode($productRow);
        }   
    }catch(PDOException $e){
        echo $e->getMessage();
    }
?>