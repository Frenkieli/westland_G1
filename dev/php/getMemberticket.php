<?php 
//====會員中心的門票紀錄 撈取====//
    try{
        require_once('connectWestland.php');
        $member_no = $_POST['member_no'];
        $sql = "SELECT * FROM `ticket` WHERE `member_no` = '$member_no' ";
        $tickets=$pdo->prepare($sql);
        $tickets->execute();
        if($tickets->rowCount()==0){
            echo "{}";
        }else{
            $ticketRow=$tickets->fetchAll(PDO::FETCH_ASSOC);
            echo json_encode($ticketRow);
        }
    }catch(PDOException $e){
        echo $e->getMassage();
    }
?>