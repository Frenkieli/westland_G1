<?php
	try {
		require_once("connectWestland.php");
		$message_no=$_POST['message_no'];
		$member_no=$_POST['member_no'];
		$equ_no=$_POST['equ_no'];
		$equ_message=$_POST['equ_message'];
		$report_status=$_POST['report_status'];
		$report_message=$_POST['report_message'];
		$sql = "INSERT INTO `message_board`( `message_no`, `member_no`, `equ_no`, `equ_message`, `report_status`, `report_message`) 
		VALUES ('10','1','1','$equ_message','1','1')";

		$addMessage = $pdo->prepare($sql);
		$addMessage->execute();
	
		$addMessage_array=[];
			while($addMessage_arrayRow=$addMessage->fetch(PDO::FETCH_ASSOC)){
				$addMessage_array[]=$addMessage_arrayRow;
			}
			echo print_r($addMessage_array);
			exit();
			echo json_encode($addMessage_array);
		} 
		catch (PDOException $e) {
			echo $e->getMessage();
		}
?>