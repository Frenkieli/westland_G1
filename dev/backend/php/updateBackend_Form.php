<?php
    try{
        require_once("connectWestland.php");
        $targetID=0;
        // $targetID=$_POST['currentID'];
        // echo $targetID;
        // exit();
        switch($targetID){
            case "0":
                // $sql="update administrator set admin_name=:admin_name where admin_no=:admin_no";
                // echo $_POST['admin_name'],$_POST['admin_no'];
                // exit();
            $sql="update administrator set admin_name=1 where admin_no=1";
            // $input->bindValue(":admin_name",1);
            // $input->bindValue(":admin_no",1);
            $input=$pdo->prepare($sql);
            $input->execute();
                echo "管理員資訊異動成功";
                break;
            case "1":
                // echo $_POST["product_name"],$_POST["product_price"],$_POST["product_ifo"],$_POST["product_style"],$_POST["product_sort"],$_POST["product_category"],$_POST["product_count"],$_POST["product_no"];
                // exit();
                $sql="update product set product_name=:product_name, product_price=:product_price, product_ifo=:product_ifo, product_style=:product_style, product_sort=:product_sort, product_category=:product_category, product_count=:product_count where product_no=:product_no";
                $input=$pdo->prepare($sql);
                $input->bindValue(":product_name",$_POST['product_name']);
                $input->bindValue(":product_price",$_POST['product_price']);
                $input->bindValue(":product_ifo",$_POST['product_ifo']);
                $input->bindValue(":product_style",$_POST['product_style']);
                $input->bindValue(":product_sort",$_POST['product_sort']);
                $input->bindValue(":product_category",$_POST['product_category']);
                $input->bindValue(":product_count",$_POST['product_count']);
                $input->bindValue(":product_no",$_POST['product_no']);
                $input->execute();
                echo "商品資訊異動成功";
                break;
            case "2":
                echo "商品資訊異動成功";
                break;
            case "3":
                echo "商品資訊異動成功";
                break;
            case "4":
                echo "商品資訊異動成功";
                break;
            case "5":
                echo "商品資訊異動成功";
                break;
            case "6":
                echo "商品資訊異動成功";
                break;
            case "7":
                echo "商品資訊異動成功";
                break;
            case "8":
                echo "商品資訊異動成功";
                break;
            case "9":
                echo "商品資訊異動成功";
                break;
            case "10":
                echo "商品資訊異動成功";
                break;
            case "11":
                echo "商品資訊異動成功";
                break;
            case "12":
                echo "商品資訊異動成功";
                break;
            case "13":
                echo "商品資訊異動成功";
                break;
            case "14":
                echo "商品資訊異動成功";
                break;
            default:
                break;
        }
    }catch(PDOException $e){
        echo $e->getMessage();
    }
?>