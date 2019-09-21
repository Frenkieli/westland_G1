<?php
    require_once("connectWestland.php"); //引用連線
    $sql = "select b.member_name,c.image_source,c.mascot_image,a.team_name,a.team_bounty,a.team_slogan,a.team_num,a.team_no from team a left outer join members b on a.leader_member_no = b.member_no left outer join ticket c on a.team_no = c.team_no where a.team_num < 5  and a.leader_member_no=c.member_no order by a.team_no desc LIMIT 4";
    $team = $pdo->prepare($sql);
    $team->execute();

    $teamRow = $team->fetchAll(PDO::FETCH_ASSOC);
    //登入成功,將登入者的資料寫入session
    // print_r($teamRow);
    echo json_encode($teamRow);
?>