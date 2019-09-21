<?php
//----------重設會員密碼----------//
try{
    require_once('connectWestland.php');
    // $member_no = $_POST['member_no'];
    $forget_answer=$_POST["forget_answer"];
    $forget_hint=$_POST["forget_hint"];
    $member_psw=$_POST["member_psw"];
    $member_id = $_POST['member_id'];  
    
    
    $sql = "SELECT * FROM `members` WHERE `member_id` = '$member_id' and  `forget_hint` = '$forget_hint' and `forget_answer` = '$forget_answer' ";
    $members=$pdo->prepare($sql); //要執行事先編譯過後的指令
    $members->execute();//執行sql命令
        //取得欄位第一筆的值
    if($members->rowCount() == 0){
        echo 1; //該用戶不存在 密碼提示錯誤
    }else{
        //成功..執行sql指令
        $sql = "UPDATE `members` set member_psw = '$member_psw' where `member_id` = '$member_id' ";
        $RemembersPsd = $pdo->prepare($sql);
        $RemembersPsd->execute();
        echo '2';
    };
    





    // $sql = "UPDATE `members` set member_psw = :member_psw WHERE member_id = :member_id";
     
    
    // $members=$pdo->prepare($sql);
    // $members->execute();
    
    //成功的話
    // echo "OK";
    //執行
    // if ($_POST["forget_answer"]=="forget_answer"){
    

    // if ($forget_answer != "forget_answer" || $forget_hint != "forget_hint"){ 
    //     echo "回答錯誤";  
    //     // exit;
    // }else{
    //     //撈取資料
    //     $memberRow=$members->fetchAll(PDO::FETCH_ASSOC);
    //     echo json_encode($memberRow);
    // }
    
}catch(Exception $e){
    //異常處理狀況
    echo $e->getMassage();

}





?>