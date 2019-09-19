<?php
try{
  require_once("connectWestland.php");
  $sql = "select * from product where product_no=:product_no";
  $product = $pdo->prepare($sql);
  $product->bindValue(":product_no", $_GET["product_no"]);//$_GET["memId"]
  $product->execute(); 

  if( $product->rowCount() == 0 ){ //找不到
    //傳回空的JSON字串
    echo "無此商品，找不到此資料";
  }else{ //找得到
    //取回一筆資料
    $prdRow = $product->fetch(PDO::FETCH_ASSOC);
    //$prdRow["memId"],$prdRow["memName"],
    //送出json字串
    echo json_encode( $prdRow );
  } 
}catch(PDOException $e){
  echo $e->getMessage();
}
?>