<?php
session_start();
try {
    require_once("connectWestland.php");
    $sql = "select * from administrator where admin_id = :admin_id and admin_psw = :admin_psw";
    $administrator = $pdo->prepare($sql);
    $administrator->bindValue(':admin_id', $_POST['admin_id']);
    $administrator->bindValue(':admin_psw', $_POST['admin_psw']);
    $administrator->execute();


    if ($administrator->rowCount() == 0) {
        echo "loginError";
    } else {
        $administratorRow = $administrator->fetch(PDO::FETCH_ASSOC);
        //登入成功,將登入者的資料寫入session
        echo $administratorRow["admin_name"];
    }
} catch (PDOException $e) {
    echo "sysError";
}
