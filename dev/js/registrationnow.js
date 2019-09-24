//============點擊立即註冊=================
$("#register_fast").click(function () {
    let mem_id = Math.floor(Math.random() * 10000000);

    // 隨機姓名
    let familyNames = new Array(
        "趙", "錢", "孫", "李", "周", "吳", "鄭", "王", "馮", "陳",
        "褚", "衛", "蔣", "沈", "韓", "楊", "朱", "秦", "尤", "許",
        "何", "呂", "施", "張", "孔", "曹", "嚴", "華", "金", "魏",
        "陶", "姜", "戚", "謝", "鄒", "喻", "柏", "水", "竇", "章",
        "雲", "蘇", "潘", "葛", "奚", "範", "彭", "郎", "魯", "韋",
        "昌", "馬", "苗", "鳳", "花", "方", "俞", "任", "袁", "柳",
        "酆", "鮑", "史", "唐", "費", "廉", "岑", "薛", "雷", "賀",
        "倪", "湯", "滕", "殷", "羅", "畢", "郝", "鄔", "安", "常",
        "樂", "於", "時", "傅", "皮", "卞", "齊", "康", "伍", "餘",
        "元", "卜", "顧", "孟", "平", "黃", "和", "穆", "蕭", "尹"
    );
    let givenNames = new Array(
        "子璇", "淼", "國棟", "夫子", "瑞堂", "甜", "敏", "尚", "國賢", "賀祥", "晨濤",
        "昊軒", "易軒", "益辰", "益帆", "益冉", "瑾春", "瑾昆", "春齊", "楊", "文昊",
        "東東", "雄霖", "浩晨", "熙涵", "溶溶", "冰楓", "欣欣", "宜豪", "欣慧", "建政",
        "美欣", "淑慧", "文軒", "文傑", "欣源", "忠林", "榕潤", "欣汝", "慧嘉", "新建",
        "建林", "亦菲", "林", "冰潔", "佳欣", "涵涵", "禹辰", "淳美", "澤惠", "偉洋",
        "涵越", "潤麗", "翔", "淑華", "晶瑩", "凌晶", "苒溪", "雨涵", "嘉怡", "佳毅",
        "子辰", "佳琪", "紫軒", "瑞辰", "昕蕊", "萌", "明遠", "欣宜", "澤遠", "欣怡",
        "佳怡", "佳惠", "晨茜", "晨璐", "運昊", "汝鑫", "淑君", "晶瀅", "潤莎", "榕汕",
        "佳鈺", "佳玉", "曉慶", "一鳴", "語晨", "添池", "添昊", "雨澤", "雅晗", "雅涵",
        "清妍", "詩悅", "嘉樂", "晨涵", "天赫", "玥傲", "佳昊", "天昊", "萌萌", "若萌"
    );
    let num = Math.floor(Math.random() * familyNames.length);
    let num2 = Math.floor(Math.random() * givenNames.length);
    // 隨機姓名
    
    let mem_name = familyNames[num] + givenNames[num2];

    // console.log(mem_id ,'dahjaksdhkjasdhhjk');
    var xhr = new XMLHttpRequest();
    xhr.onload = function () {
        if (xhr.status == 200) {
            //..................取回server端回傳的使用者資料
            if (xhr.responseText.indexOf("sysError") != -1) {
                alertify.alert("系統異常,請通知系統維護人員");
            } else if (xhr.responseText.indexOf("沒有票喔") != -1) {
            } else {
                console.log(xhr.responseText);
                let mem_no = JSON.parse(xhr.responseText);
                sessionStorage['member_no'] = null;
                sessionStorage['member_no'] = mem_no.member_no;
                $('#lightBox').css('display', 'none');
                document.getElementById('navbar_loginicon').src = 'images/navBar/member_0.png';
                alertify.alert("快速註冊成功！");
            }
        } else {
            alertify.alert(xhr.status);
        }
    }
    xhr.open("post", "php/registrationnow.php", true);
    xhr.setRequestHeader("content-type", "application/x-www-form-urlencoded");
    var data_info = `mem_id=${mem_id}&mem_name=${mem_name}`;
    xhr.send(data_info);
});