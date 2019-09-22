<?php
try {
    $ticket = $_POST['ticket'];
    $mem_no = $_POST['mem_no'];
    require_once("connectWestland.php");

    $sql2 ="select entrance_status from ticket where ticket_no = :ticket and entrance_status =0";
    $usecheck = $pdo->prepare($sql2);
    $usecheck->bindValue(":ticket",$ticket);
    $usecheck->execute();

    if($usecheck->rowCount()==0){
        echo '使用過';
    }else{
        $sql = "update members set using_ticket_no = null where member_no = :mem_no";
        $memberTickit = $pdo->prepare($sql);
        $memberTickit->bindValue(":mem_no",$mem_no);
        $memberTickit->execute();
    }
} catch (PDOException $e) {
    echo "sysError";
}
?>