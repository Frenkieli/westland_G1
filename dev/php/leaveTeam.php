<?php 
    //case0 : 隊員 自己退出 : 1.修改 該會員門票隊伍欄=NULL 2.修改 該隊伍人數-1 且 該隊伍扣除該門票賞金
    //case1 : 隊長 該隊伍解散 : 1.修改 該隊伍所有門票隊伍欄=NULL 2.刪除 該隊伍88
    
    try{
        //=====建立資料庫連線=====
        require_once("connectWestland.php");
        //=====SQL語法=====
        switch($_GET['leader_status']){
            //隊員
            case 0 :
                //該會員門票隊伍欄=NULL
                $sql="UPDATE `ticket` SET `team_no`=null WHERE ticket_no=:ticket_no";
                $leave=$pdo->prepare($sql);
                $leave->bindValue(':ticket_no',$_GET['ticket_no']);
                $leave->execute();
                //該隊伍人數-1 該隊伍扣除該門票賞金
                $bounty=(int)$_GET['bounty'];
                $sql="UPDATE `team` SET `team_num`=`team_num`-1,`team_bounty`=`team_bounty`-:bounty WHERE `team_no`=:team_no";
                $leave=$pdo->prepare($sql);
                $leave->bindValue(':bounty',$bounty);
                $leave->bindValue(':team_no',$_GET['team_no']);
                $leave->execute();
                echo "退出隊伍成功!";
                break;
            //隊長
            case 1 :
                //該隊伍所有門票隊伍欄=NULL
                $sql="UPDATE `ticket` SET `team_no`=null WHERE team_no=:team_no";
                $leave=$pdo->prepare($sql);
                $leave->bindValue(':team_no',$_GET['team_no']);
                $leave->execute();
                //該隊伍88
                $sql="DELETE FROM `team` WHERE team_no=:team_no";
                $leave=$pdo->prepare($sql);
                $leave->bindValue(':team_no',$_GET['team_no']);
                $leave->execute();
                echo "解散隊伍成功!";
                break;
            default:
                break;
        }
        
    }catch(PDOException $e){
        echo $e->getMessage();
    }
?>