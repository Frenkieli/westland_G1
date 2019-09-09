<?php 
    try{
        require_once('connectWestland.php');
        $sql="select * from members";
        $members=$pdo->prepare($sql);
        $members->execute();
        if($members->rowCount()==0){
            echo "{}";
        }else{
            $memberRow=$members->fetchAll(PDO::FETCH_ASSOC);
            echo json_encode($memberRow);
        }
    }catch(PDOException $e){
        echo $e->getMassage();
    }
?>