<?php
    try{
        require_once("connectWestland.php");
        $sql="select * from administrator";
        $administrators=$pdo->prepare($sql);
        $administrators->execute();
        if($administrators->rowcount()==0){
            echo "{}";
        }else{
            $administratorRow=$administrators->fetchAll(PDO::FETCH_ASSOC);
            echo json_encode($administratorRow);
        }
    }catch(PDOException $e){
        echo $e->getMessage();
    }
?>