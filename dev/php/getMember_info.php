<?php
    try {
    require_once("connectWestland.php");
    $sql="SELECT`members`.`member_name`
                ,`ticket`.`image_source`
                ,`team`.`team_name`
                ,`ticket`.`bounty`
                ,`team`.`mascot_image` 
                -- ,`message_board`.`equ_no`
                -- ,`message_board`.`message_no`
                -- ,`message_board`.`equ_message`
          FROM `ticket` LEFT OUTER JOIN `members` ON `ticket`.`member_no` = `members`.`member_no`
                        LEFT OUTER JOIN `team` ON `ticket`.`team_no`=`team`.`team_no`
                        -- LEFT OUTER JOIN `message_board` ON `ticket`.`member_no`=`message_board`.`member_no`
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