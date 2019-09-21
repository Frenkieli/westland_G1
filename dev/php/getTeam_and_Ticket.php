<?php
    try{
        //=====建立資料庫連線=====
        require_once("connectWestland.php");
        //=====SQL語法=====
        //有會員他的撈票
        if(isset($_GET['member_no'])){
            $sql="SELECT `ticket_no`, `team_no`, ticket.member_no, `mission_no`, `bonus_multiple`, `bounty`, `redeem_product_status`, `image_source`, `mascot_image`, `entrance_status`, `exit_status`, `swivel_chair`, `waterslide`, `carousel`, `roller_coaster`, `ferris_wheel`, `pirate_ship`, `missionDone`,members.member_name FROM `ticket`,`members` WHERE members.member_no=:member_no AND members.member_no=ticket.member_no";
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
        //所有隊伍
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