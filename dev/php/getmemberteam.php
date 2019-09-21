<?php 
//====會員中心的組隊紀錄 撈取====//
    try{
        require_once('connectWestland.php');
        $member_no = $_POST['member_no'];
        // echo $member_no;
        $sql = "SELECT * FROM `team` WHERE `leader_member_no` = '$member_no' ";
        $teams=$pdo->prepare($sql);
        $teams->execute();
        // echo $sql;
        if($teams->rowCount()==0){
            echo "{}";
        }else{
            $teamRow=$teams->fetchAll(PDO::FETCH_ASSOC);
            echo json_encode($teamRow);
        }
    }catch(PDOException $e){
        echo $e->getMassage();
    }
?>