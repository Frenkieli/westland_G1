<?php
	try {
		require_once("connectWestland.php");
		$member_no=$_POST['member_no'];
		$equ_no=$_POST['equ_no'];
		$equ_message=$_POST['equ_message'];
		// $report_status=$_POST['report_status'];
		// $report_message=$_POST['report_message'];
		$sql = "INSERT INTO `message_board`(`member_no`, `equ_no`, `equ_message`) 
		VALUES ('$member_no','$equ_no','$equ_message')";


		$starLevel=$_POST['starLevel'];
		$sql_star="UPDATE `amusement_equipments` 
			       SET `equ_score_total` = `equ_score_total`+$starLevel
				   WHERE `amusement_equipments`.`equ_no` = $equ_no
		";

		$addMessage = $pdo->prepare($sql);
		$addMessage->execute();
		$addStarlevel = $pdo->prepare($sql_star);
		$addStarlevel->execute();
	
			echo "insert OK";
		} 
		catch (PDOException $e) {
			echo $e->getMessage(). "line no: ".$e->getLine();
		}
?>