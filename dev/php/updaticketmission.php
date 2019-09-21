<?php
try {
    $ticket = $_POST['ticket'];
    $mission_bonus = $_POST['mission_bonus'];
    require_once("connectWestland.php");
    $sql = "update ticket set missionDone = 1 , bounty = bounty + :mission_bonus where ticket_no = :ticket";
    $ticketmission = $pdo->prepare($sql);
    $ticketmission->bindValue(":ticket",$ticket);
    $ticketmission->bindValue(":mission_bonus",$mission_bonus);
    $ticketmission->execute();
} catch (PDOException $e) {
    echo "sysError";
}
