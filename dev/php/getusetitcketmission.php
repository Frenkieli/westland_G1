<?php
try {
    // $mission_no = false;
    $mission_no = $_POST['mission_no'];
    $titket = $_POST['titket'];
    require_once("connectWestland.php");
    if($mission_no){
    }else{
        $mission_no=rand(1,2);
        $sql2 ="update ticket set mission_no =:mission_no where ticket_no =:titket";
        $mission2 = $pdo->prepare($sql2);
        $mission2->bindValue(":mission_no",$mission_no);
        $mission2->bindValue(":titket",$titket);
        $mission2->execute();
    }
    $sql ="select c.equ_name , a.mission_bonus from mission a left outer join mission_list b on a.mission_no=b.mission_no left outer join amusement_equipments c on b.equ_no=c.equ_no where a.mission_no = :mission_no";
    $mission = $pdo->prepare($sql);
    $mission->bindValue(":mission_no",$mission_no);
    $mission->execute();
    $missionrow = $mission->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode($missionrow);
} catch (PDOException $e) {
    echo "sysError";
}
?>