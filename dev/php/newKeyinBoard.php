<?php
    try {
        require_once("connectWestland.php");
        $mem_no = $_POST['mem_no'];
        // $mem_no = 57;
        $sql="select * from members a left outer join ticket b on a.member_no = b.member_no where b.member_no = :member_no order by b.ticket_no desc limit 1";
        $Message_package = $pdo->prepare($sql);
        $Message_package->bindValue(':member_no' , $mem_no);
        $Message_package->execute();

        if($Message_package->rowCount()==0){
            echo '沒票';
        } else{
            $Message_packageRow=$Message_package->fetch(PDO::FETCH_ASSOC);
            echo json_encode($Message_packageRow);
        }
    }
    catch (PDOException $e) {
        echo $e->getMessage();
    }
?>