<?php
try {
    $checkteam = $_POST['checkteam'];
    $mem_no = $_POST['mem_no'];
    // $checkteam = 1;
    // $mem_no = 7;
    require_once("connectWestland.php"); //引用連線
    $sql = "select * from team a left outer join ticket b ON a.team_no=b.team_no left outer join members c on b.member_no=c.member_no WHERE a.team_no  =  :team_no AND b.member_no = :member_no";
    $team = $pdo->prepare($sql);
    $team->bindValue(":member_no", $mem_no);
    $team->bindValue(":team_no", $checkteam);
    $team->execute();
    if($team->rowCount()==0){
        echo 1;
    }else{
        echo 0;
    }
    //登入成功,將登入者的資料寫入session
    // print_r($teamRow);
    
} catch (PDOException $e) {
    echo "sysError";
}

?>