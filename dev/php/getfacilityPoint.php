<?php
try {
    $str = $_POST['str'];
    $eStr = $_POST['eStr'];
    $ticket = $_POST['ticket'];
    $ticketScore = $_POST['ticketScore'];
    // $str = '滑水道';
    // $eStr = 'waterslide';
    // $ticket = 1;
    require_once("connectWestland.php");

    // 獲得倍數

    if($eStr !='entrance_status'){
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
    }



    if ($eStr == 'redeem_product_status' and $ticketScore < 600) {
        echo 0; //false
        die();
    }
    $sql = "update ticket set ". $eStr ." = 1 where ticket_no = :ticket_no";
    $status = $pdo->prepare($sql);
    $status->bindValue(":ticket_no", $ticket);
    // $status->bindValue(":eStr", $eStr);
    $status->execute();

    echo 1; //false

} catch (PDOException $e) {
    echo "sysError";
}
?>