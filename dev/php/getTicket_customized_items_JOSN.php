<?php
try {
    // //=====建立資料庫連線=====
    require_once("connectWestland.php");
    // //=====SQL語法=====
    $array=[];

    $sql_items = "select * from mascot_customize";
    $ticket_items = $pdo->prepare($sql_items);
    $ticket_items->execute();

    while($ticket_itemsRow=$ticket_items->fetch(PDO::FETCH_ASSOC)){
        $array[]=$ticket_itemsRow;
    }
    $array[]="break";

    $sql_mas = "select * from mascot";
    $ticket_mascot = $pdo->prepare($sql_mas);
    $ticket_mascot->execute();

    while($ticket_mascotRow=$ticket_mascot->fetch(PDO::FETCH_ASSOC)){
        $array[]=$ticket_mascotRow;
    }

    echo json_encode($array);

} catch (PDOException $e) {
    echo $e->getMessage();
}
?>