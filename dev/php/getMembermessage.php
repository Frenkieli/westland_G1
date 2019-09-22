<?php
    //============會員中心 留言紀錄 撈取================
	try {
		require_once("connectWestland.php");
		$member_no=$_POST['member_no'];
		//$equ_no=$_POST['equ_no'];
        //$equ_message=$_POST['equ_message'];
        //`member_no`, `equ_no`, `equ_message`
        $sql = "SELECT * FROM `message_board` WHERE `member_no` = '$member_no' ";
        // $sql = "SELECT * FROM `team` WHERE `leader_member_no` = '$member_no' ";
        $messages=$pdo->prepare($sql);
        $messages->execute();
        if($messages->rowCount()==0){
            echo "{}";
        }else{
            $messageRow=$messages->fetchAll(PDO::FETCH_ASSOC);
            echo json_encode($messageRow);
        }
    }catch(PDOException $e){
        echo $e->getMassage();
    }
?>