<?php
try {
    require_once("connectWestland.php");
    
    $sql = "select b.ticket_no , c.team_name ,a.using_ticket_no , a.member_no from members a left OUTER JOIN ticket b ON a.member_no=b.member_no left OUTER JOIN team c ON b.team_no=c.team_no where a.member_no = :mem_no and b.entrance_status = 0";
    $memberTickit = $pdo->prepare($sql);
    $memberTickit->bindValue(":mem_no", $_POST['mem_no']);
    // $memberTickit->bindValue(":memid", 'me');
    $memberTickit->execute();

    if ($memberTickit->rowCount() == 0) {
        echo "沒有票喔";
    } else {
        $memberTickitRow = $memberTickit->fetchAll(PDO::FETCH_ASSOC);
        //登入成功,將登入者的資料寫入session
        // print_r($memberTickitRow);
        echo json_encode($memberTickitRow ,256);
        //=====轉成json格式回傳=====
        
    }

} catch (PDOException $e) {
    echo "sysError";
}
