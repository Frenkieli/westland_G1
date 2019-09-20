<?php
$errMsg="";
try{
    require_once("connectWestland.php");
    $array=[];
    $sql="select member_no,member_money from members where member_no=:no";
    $sql_ticket = "select max(ticket_no) ticket_no from ticket";

    $member = $pdo->prepare($sql);
    $member->bindValue(":no",$_POST["membernocheck"]);
    $member->execute();

    $memberRow= $member->fetch(PDO::FETCH_ASSOC);
    $array[]=$memberRow;

    $ticket = $pdo->prepare($sql_ticket);
    $ticket->execute();

    $ticketRow= $ticket->fetch(PDO::FETCH_ASSOC);
    $array[]=$ticketRow;

    echo json_encode($array);

}catch(PDOException $e){
    $errMsg .= "錯誤原因 : ".$e -> getMessage(). "<br>";
	$errMsg .= "錯誤行號 : ".$e -> getLine(). "<br>";
}
echo $errMsg;
?>