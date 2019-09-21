<?php
	try {
		require_once("connectWestland.php");
		$member_no=$_POST['member_no'];
		$equ_no=$_POST['equ_no'];
		$equ_message=$_POST['equ_message'];
		$sql = "SELECT * FROM `message_board` WHERE `member_no` = '$member_no' ";
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