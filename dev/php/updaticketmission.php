<?php
try {
    $ticket = $_POST['ticket'];
    $mission_bonus = $_POST['mission_bonus'];
    $team_no = $_POST['team_no'];
    // $ticket = 1;
    // $mission_bonus = 200;
    // $team_no = '17';
    require_once("connectWestland.php");
    $sql = "update ticket set missionDone = 1 , bounty = bounty + :mission_bonus where ticket_no = :ticket";
    $ticketmission = $pdo->prepare($sql);
    $ticketmission->bindValue(":ticket",$ticket);
    $ticketmission->bindValue(":mission_bonus",$mission_bonus);
    $ticketmission->execute();

    $sql2 = "update team set team_bounty = team_bounty + :mission_bonus where team_no = :team_no";
    $ticketmission2 = $pdo->prepare($sql2);
    $ticketmission2->bindValue(":team_no",$team_no);
    $ticketmission2->bindValue(":mission_bonus",$mission_bonus);
    $ticketmission2->execute();
} catch (PDOException $e) {
    echo "sysError";
}
?>