
<?php
//  ====會員註冊==== 
    session_start() ; //開始使用session傳遞資訊的動作
    try{
        require_once("connectWestland.php"); //引用連線
        //====sql指令====
        $member_id = $_POST['member_id'];
        $member_name = $_POST['member_name'];
        $member_psw = $_POST['member_psw'];
        $member_email = $_POST['member_email'];
        $forget_hint = $_POST['forget_hint'];
        $forget_answer = $_POST['forget_answer'];
        //====比對member_id====
        $sql = "SELECT * FROM `members` WHERE `member_id` = '$member_id' ";
        $members=$pdo->prepare($sql); //要執行事先編譯過後的指令
        $members->execute();//執行sql命令
            //取得欄位第一筆的值
        if($members->rowCount() != 0){
            echo '1'; //該用戶已存在
        }else{
            //註冊成功..執行sql指令
            $sql = "INSERT INTO `members` (`member_id`,`member_name`,`member_psw`,`member_email`,`forget_hint`,`forget_answer`)	
            VALUES ('$member_id','$member_name','$member_psw','$member_email','$forget_hint','$forget_answer')";
            $Addmembers = $pdo->prepare($sql);
            $Addmembers->execute();

            $sql2 = "select member_no from members order by member_no DESC LIMIT 1";
            $memberno = $pdo->prepare($sql2);
            $memberno->execute();
            $membernorow =$memberno->fetch(PDO::FETCH_ASSOC);

            echo $membernorow['member_no'];
        };
    }catch(PDOException $e){
            echo $e->getMessage();
        // echo "error";   
    }
?>