<?php
    try{
        //=====建立資料庫連線=====
        require_once("connectWestland.php");
        //=====SQL語法=====
        $sql ="select * from amusement_equipments ";
        $amusement_equipmentss =$pdo->prepare($sql);
        $amusement_equipmentss->execute();
        if($amusement_equipmentss->rowCount()==0){
            echo "{}";
        }else{
            //=====撈資料=====
            $amusement_equipmentsRow=$amusement_equipmentss->fetchAll(PDO::FETCH_ASSOC);
            //=====轉成json格式回傳=====
            echo json_encode($amusement_equipmentsRow);
        }   
    }catch(PDOException $e){
        echo $e->getMessage();
    }
?>