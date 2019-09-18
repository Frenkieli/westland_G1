<?php
try {
    $str = $_POST['str'];
    $eStr = $_POST['eStr'];
    $ticket = $_POST['ticket'];
    // $str = '滑水道';
    // $eStr = 'waterslide';
    // $ticket = 1;
    require_once("connectWestland.php");

    // 獲得倍數

    $sql2 = "select bonus_multiple , team_no ,entrance_status from  ticket WHERE ticket_no = :ticket_no";
    $ticBonus = $pdo->prepare($sql2);
    $ticBonus->bindValue(":ticket_no", $ticket);
    // $ticBonus->bindValue(":memid", 'me');
    $ticBonus->execute();
    $ticBonusRow = $ticBonus->fetch(PDO::FETCH_ASSOC);

    if (!$ticBonusRow['entrance_status']) {
        echo '還沒進場喔！';
        die();
    }

    // 獲得加幾分

    $sql = "select equ_bonus from amusement_equipments WHERE equ_name = :equ_name";
    $equBonus = $pdo->prepare($sql);
    $equBonus->bindValue(":equ_name", $str);
    // $equBonus->bindValue(":memid", 'me');
    $equBonus->execute();
    $equBonusRow = $equBonus->fetch(PDO::FETCH_ASSOC);

    $total = $ticBonusRow['bonus_multiple'] * $equBonusRow['equ_bonus'];

    // 給門票加分

    $sql3 = "update ticket set bounty = bounty + :bounty where ticket_no = :ticket_no";
    $tickitAddPoint = $pdo->prepare($sql3);
    $tickitAddPoint->bindValue(":bounty", $total);
    $tickitAddPoint->bindValue(":ticket_no", $ticket);
    // $tickitAddPoint->bindValue(":memid", 'me');
    $tickitAddPoint->execute();

    // 幫會員加錢

    $sql10 = "update members set member_money = member_money + :bounty where using_ticket_no = :ticket_no";
    $memmoneyPoint = $pdo->prepare($sql10);
    $memmoneyPoint->bindValue(":bounty", $total);
    $memmoneyPoint->bindValue(":ticket_no", $ticket);
    // $memmoneyPoint->bindValue(":memid", 'me');
    $memmoneyPoint->execute();
    

    // 給團隊加分


    $team_no = $ticBonusRow['team_no'];

    if ($team_no) {
        $sql4 = "update team set team_bounty = team_bounty + :bounty where team_no = :team_no";
        $teamAddPoint = $pdo->prepare($sql4);
        $teamAddPoint->bindValue(":bounty", $total);
        $teamAddPoint->bindValue(":team_no", $team_no);
        // $teamAddPoint->bindValue(":memid", 'me');
        $teamAddPoint->execute();
    }

    // 更改設施狀態

    $sql5 = "update ticket set ".$eStr." = 1 where ticket_no = :ticket_no";
    $facility = $pdo->prepare($sql5);
    $facility->bindValue(":ticket_no", $ticket);
    // $facility->bindValue(":eStr", $eStr);
    $facility->execute();

    // 把倍數重置

    if ($ticBonusRow['bonus_multiple'] != 1) {
        $sql4 = "update ticket set bonus_multiple = 1 where ticket_no = :ticket_no";
        $resetTicBonus = $pdo->prepare($sql4);
        $resetTicBonus->bindValue(":ticket_no", $ticket);
        // $resetTicBonus->bindValue(":memid", 'me');
        $resetTicBonus->execute();
        echo $total, '|', $equBonusRow['equ_bonus'], '|', $ticBonusRow['bonus_multiple'];
    } else {
        echo $total;
    }

} catch (PDOException $e) {
    echo "sysError";
}
