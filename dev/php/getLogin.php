
<?php
//  ====會員登入==== 
    session_start() ; //開始使用session傳遞資訊的動作
    try{
        require_once("connectWestland.php"); //引用連線
        $member_id = $_POST['member_id'];
        $member_psw = $_POST['member_psw'];
        $sql = "SELECT `member_no` FROM `members` WHERE `member_id` = '$member_id' and member_psw =  '$member_psw' "; 
    
       
        $members=$pdo->prepare($sql); //要執行事先編譯過後的指令
       
        $members->execute();//執行sql命令
            //取得欄位第一筆的值
        if($members->rowCount() == 0){
            echo '沒有這個人';
        }else{
            $memberRow=$members->fetchAll(PDO::FETCH_ASSOC); //返回以欄位名稱作為索引的陣列
            echo json_encode($memberRow); //回傳json格式
        };
    }catch(PDOException $e){
            echo $e->getMessage();
        // echo "error";   
    }
?>