<?php
try {
    require_once("connectWestland.php");
    $sql = "select * from amusement_equipments a left OUTER JOIN message_board b on a.equ_no = b.equ_no order by a.equ_no , b.message_no desc";
    $amusement_equipments = $pdo->prepare($sql);
    $amusement_equipments->execute();
    
    $amusement_equipments_array=[];
    while($amusement_equipmentsRow=$amusement_equipments->fetch(PDO::FETCH_ASSOC)){
        $amusement_equipments_array[]=$amusement_equipmentsRow;
    }
    echo json_encode($amusement_equipments_array);
} catch (PDOException $e) {
    echo $e->getMessage();
}
?>