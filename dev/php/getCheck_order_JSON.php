<?php 
    try{
        //=====建立資料庫連線=====
        require_once("connectWestland.php");
        //=====SQL語法=====
        $sql="select member_name,member_tel,member_email from members where member_no=:member_no";
        $getMember=$pdo->prepare($sql);
        //訂單姓名（會員）
        $getMember->bindValue(":member_no",$_GET["member_no"]);
        $getMember->execute();
        
       

        // =====撈資料=====
        $memberRow=$getMember->fetch(PDO::FETCH_ASSOC);
        // =====轉成json格式回傳=====
        echo json_encode($memberRow);
        
    }catch(PDOException $e){
        echo $e->getMessage();
    }
?>