<?php
try {
    $right_multiple = $_POST['right_multiple'];
    $ticket = $_POST['ticket'];
    require_once("connectWestland.php");

    $sql2 ="select * from random_question where question_no = :right_multiple";
    $multiple = $pdo->prepare($sql2);
    $multiple->bindValue(":right_multiple",$right_multiple);
    $multiple->execute();

    $multipleRow = $multiple->fetch(PDO::FETCH_ASSOC);

    $bonus_multiple = $multipleRow['right_multiple'];

    $sql = "update ticket set bonus_multiple = :bonus_multiple where ticket_no = :ticket";
    $memberTickit = $pdo->prepare($sql);
    $memberTickit->bindValue(":bonus_multiple",$bonus_multiple);
    $memberTickit->bindValue(":ticket", $ticket);
    // $memberTickit->bindValue(":memid", 'me');
    $memberTickit->execute();

} catch (PDOException $e) {
    echo "sysError";
}
