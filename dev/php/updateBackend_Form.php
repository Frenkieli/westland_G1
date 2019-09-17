<?php
    try{
        require_once("connectWestland.php");
        // $targetID=0;
        if(isset($_GET['status']))
            $targetID=$_GET['currentID'];
        else
            $targetID=$_POST['currentID'];
        // echo $targetID;
        // exit();
        if(isset($_GET['status'])){
            switch($targetID){
                case "0":
                    // echo $_GET["status"],$_GET["targetID"];
                    $sql="update administrator set admin_status=:admin_status where admin_no=:admin_no";
                    $input=$pdo->prepare($sql);
                    $input->bindValue(":admin_status",$_GET["status"]);
                    $input->bindValue(":admin_no",$_GET["targetID"]);
                    $input->execute();
                    echo "管理員狀態異動成功";
                    break;
                case "1":
                    $sql="update product set product_status=:product_status where product_no=:product_no";
                    $input=$pdo->prepare($sql);
                    $input->bindValue(":product_status",$_GET["status"]);
                    $input->bindValue(":product_no",$_GET["targetID"]);
                    $input->execute();
                    echo "商品狀態異動成功";
                    break;
                case "2":
                    $sql="update members set member_status=:member_status where member_no=:member_no";
                    $input=$pdo->prepare($sql);
                    $input->bindValue(":member_status",$_GET["status"]);
                    $input->bindValue(":member_no",$_GET["targetID"]);
                    $input->execute();
                    echo "會員狀態異動成功";
                    break;
                case "3":
                    $sql="update ordermaster set order_item_status=:order_item_status where order_no=:order_no";
                    $input=$pdo->prepare($sql);
                    $input->bindValue(":order_item_status",$_GET["status"]);
                    $input->bindValue(":order_no",$_GET["targetID"]);
                    $input->execute();
                    echo "訂單狀態異動成功";
                    break;
                case "6":
                    $sql="update message_board set report_status=:report_status where message_no=:message_no";
                    $input=$pdo->prepare($sql);
                    $input->bindValue(":report_status",$_GET["status"]);
                    $input->bindValue(":message_no",$_GET["targetID"]);
                    $input->execute();
                    echo "留言狀態異動成功";
                    break;
                case "10":
                    $sql="update amusement_equipments set equ_status=:equ_status where equ_no=:equ_no";
                    $input=$pdo->prepare($sql);
                    $input->bindValue(":equ_status",$_GET["status"]);
                    $input->bindValue(":equ_no",$_GET["targetID"]);
                    $input->execute();
                    echo "設施狀態異動成功";
                    break; 
                default:
                    break;      
            }
        }   
        else{
            switch($targetID){
            //管理員修改 administrator_update
            case "0":
                // echo $_POST["admin_name"],$_POST["admin_no"];
                // exit();
                $sql="update administrator set admin_name=:admin_name where admin_no=:admin_no";
                $input=$pdo->prepare($sql);
                $input->bindValue(":admin_name",$_POST["admin_name"]);
                $input->bindValue(":admin_no",$_POST["admin_no"]);
                $input->execute();
                echo "管理員資訊異動成功";
                break;
            // 商品修改 product_update
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
            // 會員 member_update
            case "2":
                echo "會員資訊異動成功";
                break;
            //訂單 order_update
            case "3":
                echo "訂單資訊異動成功";
                break;
            //ticket_order_update
            // case "4":
            //     echo "商品資訊異動成功";
            //     break;
            //活動 activity_update
            case "5":
                $sql="update activity set activity_name=:activity_name,activity_date_start=:activity_date_start,activity_date_end=:activity_date_end,activity_content=:activity_content where activity_no=:activity_no";
                $input=$pdo->prepare($sql);
                $input->bindValue(":activity_name",$_POST["activity_name"]);
                $input->bindValue(":activity_date_start",$_POST["activity_date_start"]);
                $input->bindValue(":activity_date_end",$_POST["activity_date_end"]);
                $input->bindValue(":activity_content",$_POST["activity_content"]);
                $input->bindValue(":activity_no",$_POST["activity_no"]);
                $input->execute();
                echo "活動資訊異動成功";
                break;
            //檢舉留言 message_board_update
            case "6":
                echo "檢舉留言資訊異動成功";
                break;
            //機器人文本 robot_text_update
            case "7":
                $sql="update robot_text set Q=:Q,A=:A where text_no=:text_no";
                $input=$pdo->prepare($sql);
                $input->bindValue(":Q",$_POST["Q"]);
                $input->bindValue(":A",$_POST["A"]);
                $input->bindValue(":text_no",$_POST["text_no"]);
                $input->execute();
                echo "機器人文本資訊異動成功";
                break;
            //經典任務管理 mission_update    
            case "8":
                $sql="update mission set mission_name=:mission_name,mission_bonus=:mission_bonus where mission_no=:mission_no";
                $input=$pdo->prepare($sql);
                $input->bindValue(":mission_name",$_POST["mission_name"]);
                $input->bindValue(":mission_bonus",$_POST["mission_bonus"]);
                $input->bindValue(":mission_no",$_POST["mission_no"]);
                $input->execute();
                echo "經典任務資訊異動成功";
                break;
            //ticket_update   
            // case "9":
            //     echo "商品資訊異動成功";
            //     break;
            //設施管理  amusement_equipments_update   
            case "10":
                $sql="update amusement_equipments set equ_name=:equ_name,equ_desc=:equ_desc,equ_bonus=:equ_bonus where equ_no=:equ_no";
                $input=$pdo->prepare($sql);
                $input->bindValue(":equ_name",$_POST["equ_name"]);
                $input->bindValue(":equ_desc",$_POST["equ_desc"]);
                $input->bindValue(":equ_bonus",$_POST["equ_bonus"]);
                $input->bindValue(":equ_no",$_POST["equ_no"]);
                $input->execute();
                echo "設施管理資訊異動成功";
                break;
            //隨機問答管理  question_no_update    
            case "11":
                $sql="update random_question set question_content=:question_content,right_multiple=:right_multiple,correct_option=:correct_option where question_no=:question_no";
                $input=$pdo->prepare($sql);
                $input->bindValue(":question_content",$_POST["question_content"]);
                $input->bindValue(":right_multiple",$_POST["right_multiple"]);
                $input->bindValue(":correct_option",$_POST["correct_option"]);
                $input->bindValue(":question_no",$_POST["question_no"]);
                $input->execute();
                echo "隨機問答資訊異動成功";
                break;
            //兌換獎品管理 accomplish_fraction_update    
            case "12":
                echo "兌換獎品資訊異動成功";
                break;
            //客製吉祥物配件管理 ticket_customized_update    
            case "13":
                echo "客製吉祥物配件資訊異動成功";
                break;
            //結算和計分重製 reset_update    
            case "14":
                echo "結算和計分重製資訊異動成功";
                break;
            default:
                break;
            }
        }
        
    }catch(PDOException $e){
        echo $e->getMessage();
    }
?>