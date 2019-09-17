<?php
	try {
		require_once("connectWestland.php");
		$message_no=$_POST['message_no'];
		// $member_no=$_POST['member_no'];
		// $equ_no=$_POST['equ_no'];
		// $equ_message=$_POST['equ_message'];
		// $report_status=$_POST['report_status'];
        $report_message=$_POST['report_message'];
        
        $sql= "UPDATE `message_board` SET `report_status`='1', `report_message`='$report_message' WHERE `message_no`='$message_no'";
        
		$addMessage = $pdo->prepare($sql);
		$addMessage->execute();
	
			echo "insert OK";
		} 
		catch (PDOException $e) {
			echo $e->getMessage(). "line no: ".$e->getLine();
		}
?>