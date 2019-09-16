<?php
//抓總評分
    try {
    require_once("connectWestland.php");
    $sql = "select equ_name, equ_score_total, score_num from amusement_equipments";
    //抓設施資料庫的總評名稱、評分分數、設施評分人數
    $howManyStar_equipments = $pdo->prepare($sql);
    $howManyStar_equipments->execute();

    $howManyStar_equipments_array=[];
        while($howManyStar_equipments_arrayRow=$howManyStar_equipments->fetch(PDO::FETCH_ASSOC)){
            $howManyStar_equipments_array[]=$howManyStar_equipments_arrayRow;
        }
        // echo print_r($howManyStar_equipments_array);
        // exit();
        echo json_encode($howManyStar_equipments_array);
    } 
    catch (PDOException $e) {
        echo $e->getMessage();
    }
?>