<?php
//抓總評分
    try {
        $mem_id = $_POST['mem_id'];
        $mem_name = $_POST['mem_name'];
        require_once("connectWestland.php");
        $sql = "INSERT INTO members (member_id, member_psw, member_name , forget_answer) VALUES (:member_id , :member_psw , :member_name , :forget_answer)";
        //抓設施資料庫的總評名稱、評分分數、設施評分人數
        $regis = $pdo->prepare($sql);
        $regis->bindValue(':member_id',$mem_id);
        $regis->bindValue(':member_psw',$mem_id);
        $regis->bindValue(':member_name',$mem_name);
        $regis->bindValue(':forget_answer',$mem_id);
        $regis->execute();

        $sql2 = "SELECT member_no FROM members WHERE member_id = :member_id";
        //抓設施資料庫的總評名稱、評分分數、設施評分人數
        $members = $pdo->prepare($sql2);
        $members->bindValue(':member_id',$mem_id);
        $members->execute();

        $membersrow = $members->fetch(PDO::FETCH_ASSOC);

        echo json_encode($membersrow);
    } 
    catch (PDOException $e) {
        echo $e->getMessage();
    }
