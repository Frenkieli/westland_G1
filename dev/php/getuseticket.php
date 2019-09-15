<?php
try {
    $pickticket = $_POST['pickticket'];
    require_once("connectWestland.php");
    $sql2 ="select b.member_name,a.image_source,a.mascot_image,d.team_name,a.bounty,a.mission_no from ticket a left OUTER JOIN members b on a.member_no=b.member_no left OUTER JOIN mission c on a.mission_no=c.mission_no left OUTER JOIN team d on a.team_no =d.team_no where ticket_no = :ticket_no";
    $memberTickit2 = $pdo->prepare($sql2);
    $memberTickit2->bindValue(":ticket_no",$pickticket);
    $memberTickit2->execute();

    $memberTickit2row = $memberTickit2->fetch(PDO::FETCH_ASSOC);

    echo json_encode($memberTickit2row);

} catch (PDOException $e) {
    echo "sysError";
}
