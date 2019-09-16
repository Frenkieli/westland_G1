<?php
//抓留言板
    try {
    require_once("connectWestland.php");
    $sql = "select * from message_board";
    //抓留言板留言資訊
    $Message_package = $pdo->prepare($sql);
    $Message_package->execute();

    $Message_package_array=[];
        while($Message_package_arrayRow=$Message_package->fetch(PDO::FETCH_ASSOC)){
            $Message_package_array[]=$Message_package_arrayRow;
        }
        // echo print_r($Message_package_array);
        // exit();
        echo json_encode($Message_package_array);
    } 
    catch (PDOException $e) {
        echo $e->getMessage();
    }
?>