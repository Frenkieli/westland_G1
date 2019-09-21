<?php
try {
    $pickticket = $_POST['pickticket'];
    require_once("connectWestland.php");
    $sql = "update members set using_ticket_no = :using_ticket_no where members.member_no = :member_no";
    $memberTickit = $pdo->prepare($sql);
    $memberTickit->bindValue(":using_ticket_no",$pickticket);
    $memberTickit->bindValue(":member_no", $_POST['member_no']);
    // $memberTickit->bindValue(":memid", 'me');
    $memberTickit->execute();
    
    $sql2 ="select b.member_name,a.image_source,a.mascot_image,d.team_name,a.bounty , a.team_no from ticket a left OUTER JOIN members b on a.member_no=b.member_no left OUTER JOIN mission c on a.mission_no=c.mission_no left OUTER JOIN team d on a.team_no =d.team_no where ticket_no = :ticket_no";
    $memberTickit2 = $pdo->prepare($sql2);
    $memberTickit2->bindValue(":ticket_no",$pickticket);
    $memberTickit2->execute();

    $memberTickit2row = $memberTickit2->fetch(PDO::FETCH_ASSOC);

    echo json_encode($memberTickit2row);

} catch (PDOException $e) {
    echo "sysError";
}
