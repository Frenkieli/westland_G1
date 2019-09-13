<?php
try {
    require_once("connectWestland.php");
    $sql = "update members set using_ticket_no = :using_ticket_no where members.member_no = :member_no";
    $memberTickit = $pdo->prepare($sql);
    $memberTickit->bindValue(":using_ticket_no", $_POST['pickticket']);
    $memberTickit->bindValue(":member_no", $_POST['member_no']);
    // $memberTickit->bindValue(":memid", 'me');
    $memberTickit->execute();

} catch (PDOException $e) {
    echo "sysError";
}
