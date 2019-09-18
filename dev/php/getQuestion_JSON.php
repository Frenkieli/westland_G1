<?php
try {
    //=====建立資料庫連線=====
    require_once("connectWestland.php");
    //=====SQL語法=====
    $sql = "select * from random_question";
    $questions = $pdo->prepare($sql);
    $questions->execute();
    //=====撈資料=====
    $questions_array=[];
    while($questionsRow=$questions->fetch(PDO::FETCH_ASSOC)){
        $questions_array[]=$questionsRow;
    }
    //=====轉成json格式回傳=====
    echo json_encode($questions_array);
} catch (PDOException $e) {
    echo $e->getMessage();
}
?>