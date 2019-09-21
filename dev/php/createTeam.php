<?php 

    try{
        //=====建立資料庫連線=====
        require_once("connectWestland.php");
        //=====SQL語法=====
  
        $sql="INSERT INTO `team`(`team_num`, `team_name`, `team_bounty`, `leader_member_no`, `team_slogan`, `mascot_image`) VALUES (1,:team_name,:team_bounty,:leader_member_no,:team_slogan,:mascot_image)";
        $bounty=(int)$_POST['team_bounty'];
        $create=$pdo->prepare($sql);
        $create->bindValue(':team_name',$_POST['team_name']);
        $create->bindValue(':team_bounty',$bounty);
        $create->bindValue(':leader_member_no',$_POST['member_no']);
        $create->bindValue(':team_slogan',$_POST['team_slogan']);
        $create->bindValue(':mascot_image',$_POST['mascot_image']);
        $create->execute();
        $id=$create->lastInsertId();

        $sql="UPDATE `ticket` SET `team_no`=:team_no WHERE ticket_no=:ticket_no";
        $join=$pdo->prepare($sql);
        $join->bindValue(':team_no',$id);
        $join->bindValue(':ticket_no',$_GET['ticket_no']);
        $join->execute();
        echo "創建隊伍成功!";
    }catch(PDOException $e){
        echo $e->getMessage();
    }
?>