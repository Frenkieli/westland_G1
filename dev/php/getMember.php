

<?php 
//====會員中心的我的資料 撈取====//
    try{
        require_once('connectWestland.php');
        $member_no = $_POST['member_no'];
        $sql = "SELECT * FROM `members` WHERE `member_no` = '$member_no' ";
        $members=$pdo->prepare($sql);
        $members->execute();
        if($members->rowCount()==0){
            echo "{}";
        }else{
            $memberRow=$members->fetchAll(PDO::FETCH_ASSOC);
            echo json_encode($memberRow);
        }
    }catch(PDOException $e){
        echo $e->getMassage();
    }
?>