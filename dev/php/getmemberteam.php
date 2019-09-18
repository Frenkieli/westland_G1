<?php 
//====會員中心的組隊紀錄 撈取====//
    try{
        require_once('connectWestland.php');
        // $leader_member_no = $_POST['leader_member_no'];
        $sql = "SELECT * FROM `team` WHERE `member_no` = 'leader_member_no' ";
        $teams=$pdo->prepare($sql);
        $teams->execute();
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