<?php
    try {
    require_once("connectWestland.php");
    $sql="SELECT `members`.`member_no`
                ,`members`.`member_name`
                ,`ticket`.`image_source` 
                ,`team`.`team_name`
                ,`ticket`.`bounty`

          FROM `members`
                        LEFT OUTER JOIN `ticket` 
                        ON `members`.`member_no`=`ticket`.`member_no`
                        LEFT OUTER JOIN `team` 
                        ON `ticket`.`team_no`=`team`.`team_no`
          GROUP BY `members`.`member_no`
          ORDER BY `members`.`member_no`
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