<?php
    try{
        require_once("connectWestland.php");
        // $targetID=0;
        $targetID=$_POST['currentID'];
        // echo $targetID;
        // exit();
            switch($targetID){
            //管理員新增 administrator_update
            case "0":
                // echo $_POST["admin_name"],$_POST["admin_no"];
                // exit();
                $sql="INSERT INTO `administrator`(`admin_name`, `admin_id`, `admin_psw`) VALUES (:admin_name, :admin_id, :admin_psw)";
                $input=$pdo->prepare($sql);
                $input->bindValue(":admin_name",$_POST["admin_name"]);
                $input->bindValue(":admin_id",$_POST["admin_id"]);
                $input->bindValue(":admin_psw",$_POST["admin_psw"]);
                $input->execute();
                echo "管理員新增成功";
                break;
            // 商品新增 product_update
            case "1":
                // echo $_POST["product_name"],$_POST["product_price"],$_POST["product_ifo"],$_POST["product_style"],$_POST["product_sort"],$_POST["product_category"],$_POST["product_count"],$_POST["product_no"];
                // exit();
                if($_FILES["product_image"]["error"] == UPLOAD_ERR_OK){
                    $sql="INSERT INTO `product`(`product_name`, `product_price`,`product_style`, `product_sort`, `product_category`, `product_count`,`product_ifo`) VALUES (:product_name,:product_price,:product_style,:product_sort,:product_category,:product_count,:product_ifo)";
                    $input=$pdo->prepare($sql);
                    $input->bindValue(":product_name",$_POST['product_name']);
                    // $input->bindValue(":product_image",$_POST['product_image']);
                    $input->bindValue(":product_price",$_POST['product_price']);
                    $input->bindValue(":product_style",$_POST['product_style']);
                    $input->bindValue(":product_sort",$_POST['product_sort']);
                    $input->bindValue(":product_category",$_POST['product_category']);
                    $input->bindValue(":product_count",$_POST['product_count']);
                    $input->bindValue(":product_ifo",$_POST['product_ifo']);
                    $input->execute();
                    echo "商品新增成功";
                    $psn = $pdo->lastInsertId();

                    $upload_mascot = "../images/products/product_list/";

                    if( file_exists($upload_mascot) === false){
                        mkdir($upload_mascot);
                    }
                    $fileInfoArr = pathinfo($_FILES["product_image"]["name"]);
                    $fileName = "pd_b-{$psn}.{$fileInfoArr["extension"]}";  //8.gif 獲得副檔名

                    $from = $_FILES["product_image"]["tmp_name"];
                    $to = "../images/products/product_list//$fileName";
                    copy( $from, $to);
            
                    //將檔案名稱寫回資料庫
                    $src = "images/products/product_list/".$fileName;
                    $sql = "update product set product_image = :image where product_no = $psn";
                    $products = $pdo->prepare($sql);
                    $products -> bindValue(":image", $src);
                    $products -> execute();
                    echo "新增成功~";

                }
                break;
            //活動新增 activity_update
            case "5":
                $sql="INSERT INTO `activity`( `activity_name`,`activity_image`, `activity_date_start`, `activity_date_end`, `activity_content`) VALUES (:activity_name,:activity_image,:activity_date_start,:activity_date_end,:activity_content)";
                $input=$pdo->prepare($sql);
                $input->bindValue(":activity_name",$_POST["activity_name"]);
                $input->bindValue(":activity_image",$_POST["activity_image"]);
                $input->bindValue(":activity_date_start",$_POST["activity_date_start"]);
                $input->bindValue(":activity_date_end",$_POST["activity_date_end"]);
                $input->bindValue(":activity_content",$_POST["activity_content"]);
                $input->execute();
                echo "活動新增成功";
                break;
            //機器人文本新增 robot_text_update
            case "7":
                $sql="INSERT INTO `robot_text`(`Q`, `A`) VALUES (:Q,:A)";
                $input=$pdo->prepare($sql);
                $input->bindValue(":Q",$_POST["Q"]);
                $input->bindValue(":A",$_POST["A"]);
                $input->execute();
                echo "機器人文本新增成功";
                break;
            //隨機問答新增  question_no_update    
            case "11":
                $sql="INSERT INTO `random_question`(`question_content`, `question_optionA`, `question_optionB`, `question_optionC`, `right_multiple`, `correct_option`) VALUES (:question_content,:question_optionA,:question_optionB,:question_optionC,:right_multiple,:correct_option)";
                $input=$pdo->prepare($sql);
                $input->bindValue(":question_content",$_POST["question_content"]);
                $input->bindValue(":question_optionA",$_POST["question_optionA"]);
                $input->bindValue(":question_optionB",$_POST["question_optionB"]);
                $input->bindValue(":question_optionC",$_POST["question_optionC"]);
                $input->bindValue(":right_multiple",$_POST["right_multiple"]);
                $input->bindValue(":correct_option",$_POST["correct_option"]);
                $input->execute();
                echo "隨機問答新增成功";
                break;
            //客製吉祥物配件新增 ticket_customized_update    
            case "13":
                $sql="INSERT INTO `mascot_customize`(`mascot_customize_image`) VALUES (:mascot_customize_image)";
                $input=$pdo->prepare($sql);
                $input->bindValue(":mascot_customize_image",$_POST["mascot_customize_image"]);
                $input->execute();
                echo "客製吉祥物配件新增成功";
                break;
            default:
                break;
            }
        
    }catch(PDOException $e){
        echo $e->getMessage();
    }
?>