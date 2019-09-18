<?php
    require_once("connectWestland.php"); //引用連線
    $sql = "select a.leader_member_no , a.team_slogan ,a.team_bounty ,a.mascot_image as 'team_mascot_image' , c.member_name,b.image_source , b.mascot_image,a.team_name , b.bounty ,b.team_no from team a left outer join ticket b on a.team_no=b.team_no left outer join members c on b.member_no = c.member_no order by a.team_bounty desc , b.bounty ,a.team_no DESC LIMIT 20";
    $winner = $pdo->prepare($sql);
    $winner->execute();

    $winnerRow = $winner->fetchAll(PDO::FETCH_ASSOC);
    //登入成功,將登入者的資料寫入session
    // print_r($winnerRow);
    echo json_encode($winnerRow);
?>