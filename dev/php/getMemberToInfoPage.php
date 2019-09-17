<?php
    try {
    require_once("connectWestland.php");

    $sql = "select * from members";
    $Message_package = $pdo->prepare($sql);
    $Message_package->execute();

        if ($Message_package->rowCount()==0) {
            echo "error:沒有登入會員";
        }else {
            $Message_package_array=[];
            while($Message_package_arrayRow=$Message_package->fetch(PDO::FETCH_ASSOC)){
                $Message_package_array[]=$Message_package_arrayRow;
            }
            echo json_encode($Message_package_array);
        }
    } 
    catch (PDOException $e) {
        echo "sysError";
    }
?>