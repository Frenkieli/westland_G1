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
