<?php

    $str = $_POST['str'];
    $eStr = $_POST['eStr'];
    $ticket = $_POST['ticket'];
    $ticketScore = $_POST['ticketScore'];   
    require_once("connectWestland.php");

    $sql2 = "select bonus_multiple , team_no ,entrance_status from  ticket WHERE ticket_no = :ticket_no";
    $ticBonus = $pdo->prepare($sql2);
    $ticBonus->bindValue(":ticket_no", $ticket);
    // $ticBonus->bindValue(":memid", 'me');
    $ticBonus->execute();
    $ticBonusRow = $ticBonus->fetch(PDO::FETCH_ASSOC);

    if (!$ticBonusRow['entrance_status']) {
        echo '還沒進場喔！';
        die();
    }

    $sql = "update ticket set ". $eStr ." = 1 where ticket_no = :ticket_no";
    $status = $pdo->prepare($sql);
    $status->bindValue(":ticket_no", $ticket);
    // $status->bindValue(":eStr", $eStr);
    $status->execute();

    $sql3 = "update members set using_ticket_no = null where using_ticket_no = :ticket_no";
    $status = $pdo->prepare($sql3);
    $status->bindValue(":ticket_no", $ticket);
    // $status->bindValue(":eStr", $eStr);
    $status->execute();

    echo '完成';

?>