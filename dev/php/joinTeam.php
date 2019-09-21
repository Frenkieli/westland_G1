<?php 
    //1.修改 門票隊伍欄 2.修改 該隊伍欄人數加一 且 該隊伍賞金增加該門票賞金
    try{
        //=====建立資料庫連線=====
        require_once("connectWestland.php");
        //=====SQL語法=====
        //門票隊伍欄=隊伍編號
        $sql="UPDATE `ticket` SET `team_no`=:team_no WHERE ticket_no=:ticket_no";
        $join=$pdo->prepare($sql);
        $join->bindValue(':team_no',$_GET['team_no']);
        $join->bindValue(':ticket_no',$_GET['ticket_no']);
        $join->execute();
        //該隊伍欄人數加一 該隊伍賞金增加該門票賞金
        $bounty=(int)$_GET['bounty'];
        $sql="UPDATE `team` SET `team_num`=`team_num`+1 ,`team_bounty`=`team_bounty`+:bounty WHERE `team_no`=:team_no";
        $join=$pdo->prepare($sql);
        $join->bindValue(':bounty',$bounty);
        $join->bindValue(':team_no',$_GET['team_no']);
        $join->execute();
        echo "加入隊伍成功!";
    }catch(PDOException $e){
        echo $e->getMessage();
    }
?>