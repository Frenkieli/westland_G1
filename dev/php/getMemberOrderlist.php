<?php 
    try{
        //=====建立資料庫連線=====
        require_once("connectWestland.php");
        //=====SQL語法=====
        $sql="SELECT order_item.order_no, order_item.product_no, product.product_image,product.product_name,product.product_price,order_item.item_count FROM `order_item`,`ordermaster`,`product` WHERE order_item.order_no=ordermaster.order_no AND product.product_no=order_item.product_no AND ordermaster.order_no=:order_no";
        $MemberOrders=$pdo->prepare($sql);
        $MemberOrders->bindValue(':order_no',$_GET['order_no']);
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