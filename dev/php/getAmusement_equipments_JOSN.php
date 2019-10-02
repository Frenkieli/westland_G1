<?php
try {
    require_once("connectWestland.php");
    $sql = "select a.equ_no , a.equ_image,a.equ_name ,a.equ_bonus ,a.equ_score_total,a.score_num , b.equ_message ,d.image_source ,c.member_name from amusement_equipments a left OUTER JOIN message_board b on a.equ_no = b.equ_no left OUTER JOIN members c on b.member_no=c.member_no left OUTER JOIN ticket d on c.member_no = d.member_no where b.report_status=0 order by a.equ_no , b.message_no desc , d.ticket_no DESC";
    $amusement_equipments = $pdo->prepare($sql);
    $amusement_equipments->execute();
    
    $amusement_equipments_array=[];
    $check = 0;
    while($amusement_equipmentsRow=$amusement_equipments->fetch(PDO::FETCH_ASSOC)){
        if($check == $amusement_equipmentsRow['equ_no']){
        }else{
            $amusement_equipments_array[]=$amusement_equipmentsRow;
        // echo $amusement_equipmentsRow['equ_no'];
        }
        $check = $amusement_equipmentsRow['equ_no'];
    }
    echo json_encode($amusement_equipments_array);
} catch (PDOException $e) {
    echo $e->getMessage();
}
?>