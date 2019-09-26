<?php 
    try{
        //=====建立資料庫連線=====
        require_once("connectWestland.php");
        //=====SQL語法=====
        //扣除購物金
        // echo $_POST["order_item_total"],$_POST["member_no"];
        // exit();
        $total=$_POST["order_item_total"];
        $sql=" UPDATE members SET member_money=member_money-:member_money WHERE member_no=:member_no;";
        $updataMoney=$pdo->prepare($sql);
        $updataMoney->bindValue(":member_no",$_POST["member_no"]);
        $updataMoney->bindValue(":member_money",(int)$total);
        $updataMoney->execute();
        //新增訂單        
        $sql="INSERT INTO `ordermaster`(`member_no`, `order_item_date`, `order_item_total`, `recipient_addre`, `recipient_phone`, `recipient_name`) VALUES (:member_no,:order_item_date,:order_item_total,:recipient_addre,:recipient_phone,:recipient_name)";
        $insertOrder=$pdo->prepare($sql);
        $insertOrder->bindValue(":member_no",$_POST["member_no"]);
        $insertOrder->bindValue(":order_item_date",$_POST["order_item_date"]);
        $insertOrder->bindValue(":order_item_total",$_POST["order_item_total"]);
        $insertOrder->bindValue(":recipient_addre",$_POST["recipient_addre"]);
        $insertOrder->bindValue(":recipient_phone",$_POST["recipient_phone"]);
        $insertOrder->bindValue(":recipient_name",$_POST["recipient_name"]);
        $insertOrder->execute();
        // echo '訂單送出成功';

        //新增訂單清單
        $newIsertOrderID=$pdo->lastInsertId();

        //商品總筆數
        $itemCount=$_POST["itemSum"];
        // echo $_POST["itemSum"];

        //各商品的ID
        $itemNoArr=preg_split('/pd-/',$_POST["allItemId"]);
        $itemCountArr=preg_split('/ct-/',$_POST["allItemCount"]);
        $itemPriceArr=preg_split('/pe-/',$_POST["allItemPrice"]);
        // echo $itemNoStr;
        // echo $itemNoArr[3],$itemCountArr[3],$itemPriceArr[3];
        for($i=1;$i<=$itemCount;$i++){
            $sql="INSERT INTO `order_item`(`order_no`, `product_no`, `item_count`, `item_price`) VALUES (:order_no,:product_no,:item_count,:item_price)";
            $insertOrderlist=$pdo->prepare($sql);
            $insertOrderlist->bindValue(":order_no",$newIsertOrderID);
            $insertOrderlist->bindValue(":product_no",$itemNoArr[$i]);
            $insertOrderlist->bindValue(":item_count",$itemCountArr[$i]);
            $insertOrderlist->bindValue(":item_price",$itemPriceArr[$i]);
            $insertOrderlist->execute();
        }
        // echo "訂單清單產生成功";
    }catch(PDOException $e){
        echo $e->getMessage();
    }
?>