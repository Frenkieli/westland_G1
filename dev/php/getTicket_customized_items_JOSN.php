<?php
//撈吉祥物，樣式及活動資訊
try {
    // //=====建立資料庫連線=====
    require_once("connectWestland.php");
    // //=====SQL語法=====
    $array=[];
//撈樣式
    $sql_items = "select * from mascot_customize order by rand() limit 6";
    $ticket_items = $pdo->prepare($sql_items);
    $ticket_items->execute();

    while($ticket_itemsRow=$ticket_items->fetch(PDO::FETCH_ASSOC)){
        $array[]=$ticket_itemsRow;
    }

    $array[]="break"; //新增斷點
    
//撈吉祥物
    $sql_mas = "select * from mascot";
    $ticket_mascot = $pdo->prepare($sql_mas);
    $ticket_mascot->execute();

    while($ticket_mascotRow=$ticket_mascot->fetch(PDO::FETCH_ASSOC)){
        $array[]=$ticket_mascotRow;
    }

    $array[]="point"; //新增斷點2

//撈活動
    $sql_act = "select * from activity order by activity_date_start desc limit 4";
    $ticket_activity = $pdo->prepare($sql_act);
    $ticket_activity->execute();

    while($ticket_activityRow=$ticket_activity->fetch(PDO::FETCH_ASSOC)){
        $array[]=$ticket_activityRow;
    }

    echo json_encode($array);

} catch (PDOException $e) {
    echo $e->getMessage();
}
?>