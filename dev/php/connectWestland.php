<?php
    $dsn="mysql:host=localhost;port=3306;dbname=westland;charset=utf8";
    // $dsn="mysql:host=10.120.37.7;port=3306;dbname=westland;charset=utf8";
    // $dsn="mysql:host=localhost;port=3306;dbname=products;charset=utf8";
    $user="root";
    $password="root";
    // $password="icecream0510";
    // $user="tibame123456";
    // $password="tibame123456";
    $options=array(PDO::ATTR_ERRMODE=>PDO::ERRMODE_EXCEPTION);
    $pdo=new PDO($dsn,$user,$password,$options);
?>