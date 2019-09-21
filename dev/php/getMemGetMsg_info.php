<?php
    try {
    require_once("connectWestland.php");
    $sql="SELECT`message_board`.`message_no`
                ,`message_board`.`member_no`
                ,`message_board`.`equ_message`
                ,`message_board`.`equ_no`
                ,`members`.`member_name`
                ,`ticket`.`image_source` 
                ,`team`.`team_no`
                ,`team`.`team_name`
                ,`ticket`.`bounty`
                ,`team`.`mascot_image` 

          FROM `message_board`
                        LEFT OUTER JOIN `members`
                        ON `message_board`.`member_no` =`members`.`member_no`
                        LEFT OUTER JOIN `ticket` 
                        ON `members`.`member_no`=`ticket`.`member_no`
                        LEFT OUTER JOIN `team` 
                        ON `ticket`.`team_no`=`team`.`team_no`
          WHERE `message_board`.`report_status`=0
          GROUP BY `message_board`.`message_no`
        --   ORDER BY `message_board`.`message_no`
                        ";
    $Message_package = $pdo->prepare($sql);
    $Message_package->execute();

    $Message_package_array=[];
        while($Message_package_arrayRow=$Message_package->fetch(PDO::FETCH_ASSOC)){
            $Message_package_array[]=$Message_package_arrayRow;
        }
        echo json_encode($Message_package_array);
    } 
    catch (PDOException $e) {
        echo $e->getMessage();
    }
?>