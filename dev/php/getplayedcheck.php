<?php
try {
    $ticket = $_POST['ticket'];
    require_once("connectWestland.php");
    $sql = "select redeem_product_status `0`,waterslide `1`,swivel_chair `2`,pirate_ship `3`,entrance_status `4`,roller_coaster `5`,carousel `6`,ferris_wheel `7` from ticket where ticket_no = :ticket_no";
    $checkPoint = $pdo->prepare($sql);
    $checkPoint->bindValue(":ticket_no", $ticket);
    $checkPoint->execute();

    $checkPointrow = $checkPoint->fetch(PDO::FETCH_ASSOC);

    echo json_encode($checkPointrow);
} catch (PDOException $e) {
    echo "sysError";
}
