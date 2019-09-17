<?php
    try{
        //=====建立資料庫連線=====
        require_once("connectWestland.php");
        //=====SQL語法=====
        $sql ="select * from mascot_customize ";
        $customizes =$pdo->prepare($sql);
        $customizes->execute();
        if($customizes->rowCount()==0){
            echo "{}";
        }else{
            //=====撈資料=====
            $customizeRow=$customizes->fetchAll(PDO::FETCH_ASSOC);
            //=====轉成json格式回傳=====
            echo json_encode($customizeRow);
        }   
    }catch(PDOException $e){
        echo $e->getMessage();
    }
?>