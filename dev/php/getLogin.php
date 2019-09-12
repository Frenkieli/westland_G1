<!-- ====會員登入==== -->
<?php
    session_start() ; //開始使用session傳遞資訊的動作
    try{
        require_once("connectWestland.php"); //引用連線
        //====sql指令====
        $sql='select * from members where member_id and member_psw=:member_psw'; 
        $members=$pdo->prepare($sql); //要執行事先編譯過後的指令
        $members->bindValue(':member_id',$_POST['member_id']); //帶入資料到sql命令
        $members->bindValue(':member_psw',$_POST["member_psw"]);

        $members->execute();//執行sql命令
            //取得欄位第一筆的值
        if($members->rowCount() == 0){
            echo '{}';
        }else{
            $memberRow=$members->fetchAll(PDO::FETCH_ASSOC); //返回以欄位名稱作為索引的陣列
            // echo json_encode($memberRow); //回傳json格式
            };
        }catch(PDOException $e){
            // echo $e->getMessage();
        echo "error";   
    }
?>