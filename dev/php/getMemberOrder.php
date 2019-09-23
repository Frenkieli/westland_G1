<?php 
    try{
        //=====建立資料庫連線=====
        require_once("connectWestland.php");
        //=====SQL語法=====
        $sql="SELECT ordermaster.order_no,ordermaster.order_item_date,ordermaster.order_item_status, ordermaster.order_item_total FROM `ordermaster` WHERE ordermaster.member_no=:member_no";
        $MemberOrders=$pdo->prepare($sql);
        $MemberOrders->bindValue(':member_no',$_GET['member_no']);
        $MemberOrders->execute();
        if($MemberOrders->rowCount()==0){
            echo "{}";
        }else{
            //=====撈資料=====
            $MemberOrdersRow=$MemberOrders->fetchAll(PDO::FETCH_ASSOC);
            //=====轉成json格式回傳=====
            echo json_encode($MemberOrdersRow);
        }
        // echo $_GET['member_no'];
    }catch(PDOException $e){
        echo $e->getMessage();
    }
?>