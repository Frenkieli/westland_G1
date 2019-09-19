<?php
    try{
        //=====建立資料庫連線=====
        require_once("connectWestland.php");
        //=====SQL語法=====
        if(isset($_GET['member_no'])){
            $sql="SELECT * FROM `ticket` WHERE member_no=:member_no";
            $userTicket =$pdo->prepare($sql);
            $userTicket->bindValue(':member_no',$_GET['member_no']);
            $userTicket->execute();
            if($userTicket->rowCount()==0){
                echo "{}";
            }else{
                //=====撈資料=====
                $userTicketRow=$userTicket->fetchAll(PDO::FETCH_ASSOC);
                //=====轉成json格式回傳=====
                echo json_encode($userTicketRow);
            }
        }
        else{
            $sql ="SELECT team.leader_member_no,team.team_no, `team_num`, `team_name`, `team_bounty`, `team_slogan`,`member_name`,`ticket_no`,`image_source`,ticket.mascot_image FROM `team`,`members`,`ticket` WHERE team.leader_member_no = members.member_no AND ticket.team_no = team.team_no AND ticket.member_no = team.leader_member_no";
            $teams =$pdo->prepare($sql);
            $teams->execute();
            if($teams->rowCount()==0){
                echo "{}";
            }else{
                //=====撈資料=====
                $teamRow=$teams->fetchAll(PDO::FETCH_ASSOC);
                //=====轉成json格式回傳=====
                echo json_encode($teamRow);
            }
        }
    }catch(PDOException $e){
        echo $e->getMessage();
    }
?>