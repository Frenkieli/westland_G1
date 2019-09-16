<?php
    try{
        //=====建立資料庫連線=====
        require_once("connectWestland.php");
        //=====SQL語法=====
        $sql ="select * from message_board";
        $message_boards =$pdo->prepare($sql);
        $message_boards->execute();
        if($message_boards->rowCount()==0){
            echo "{}";
        }else{
            //=====撈資料=====
            $message_boardRow=$message_boards->fetchAll(PDO::FETCH_ASSOC);
            //=====轉成json格式回傳=====
            echo json_encode($message_boardRow);
        }   
    }catch(PDOException $e){
        echo $e->getMessage();
    }
?>