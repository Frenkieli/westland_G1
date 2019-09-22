<?php
//  ====會員中心修改資料功能==== 
    session_start() ; //開始使用session傳遞資訊的動作
    try{
        require_once("connectWestland.php"); //引用連線
        //====sql指令====
        // $member_id = $_POST['member_id'];
        $member_name = $_POST['member_name'];
        // $mem_psw = $_POST['member_psw'];
        $member_card_no = $_POST['member_card_no'];
        $member_email = $_POST['member_email'];
        $member_tel= $_POST['member_tel']; 
        $member_birth= $_POST['member_birth'];
        // $member_tel= $_POST['member_tel'];
        $member_no= $_POST['member_no'];
        //====比對member_id====
        $sql = "UPDATE `members` set member_name = '$member_name', 
        member_card_no = '$member_card_no',
        member_email = '$member_email',
        member_tel = '$member_tel',
        member_birth = '$member_birth' where `member_no` = '$member_no' ";
        $Upmembers = $pdo->prepare($sql);
        $Upmembers->execute();
        echo $sql;
        // $sql ="UPDATE  test SET name=’$_POST[name]’,age=’$_POST[age]’  WHERE id=’$_POST[id]'";  //更新資料            
        // $sql = "UPDATE members set member_name = :member_name, member_tel = :member_tel, member_birth = :member_birth, member_email = :member_email, member_card_no=:member_card_no WHERE member_no = :member_no" ;
        // $sql = "SELECT * FROM `members` WHERE `member_id` = '$member_id' ";
        // $Upmembers = $pdo->prepare($sql);
        // $Upmembers->execute();  
       
    }catch(PDOException $e){
        echo $e->getMessage();  
    }
?>