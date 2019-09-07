<?php
    $dsn="mysql:host=10.120.37.7;port=3306;dbname=westland;charset=utf8";
    $user="tibame123456";
    $password="tibame123456";
    $options=array(PDO::ATTR_ERRMODE=>PDO::ERRMODE_EXCEPTION);
    $pdo=new PDO($dsn,$user,$password,$options);
?>