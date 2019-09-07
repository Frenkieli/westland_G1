
/* 以下為本程式回答問題時使用的 Q&A 規則，例如對於以下 Q&A 規則物件
 
 { Q:"想 | 希望", A:"為何想*呢?|真的想*?|那就去做阿?為何不呢?"},
 
代表的是，當您輸入的字串中有「想」或「希望」這樣的詞彙時，
程式就會從 A: 欄位中的回答裏隨機選出一個來回答。
 
回答語句中的 * 代表比對詞彙之後的字串，舉例而言、假如您說：
 
    我想去巴黎
 
那麼我們的程式從這四個可能的規則中隨機挑出一個來產生答案，產生的答案可能是：
 
為何想去巴黎呢?
真的想去巴黎?
那就去做阿?
為何不呢?
 
Eliza 就是一個這麼簡單的程式而已。*/
// Q&A 陣列宣告
var qaList = [
    { Q: "遊樂園", A: "在哪裡?" },
    // 下方是內建回答函示,上方的會優先判斷
    { Q: "謝謝", A: "不客氣!" },
    { Q: "對不起 | 抱歉 | 不好意思", A: "別說抱歉 !|別客氣，儘管說 !" },
    { Q: "可否 | 可不可以", A: "你確定想*?" },
    { Q: "我想", A: "你為何想*?" },
    { Q: "我要", A: "你為何要*?" },
    { Q: "你是", A: "你認為我是*?" },
    { Q: "認為 | 以為", A: "為何說*?" },
    { Q: "感覺", A: "常有這種感覺嗎?" },
    { Q: "為何不", A: "你希望我*!" },
    { Q: "是否", A: "為何想知道是否*?" },
    { Q: "不能", A: "為何不能*?|你試過了嗎?|或許你現在能*了呢?" },
    { Q: "我是", A: "你好，久仰久仰!" },
    { Q: "甚麼 | 什麼 | 何時 | 誰 | 哪裡 | 如何 | 為何 | 因何", A: "為何這樣問?|為何你對這問題有興趣?|你認為答案是甚麼呢?|你認為如何呢?|你常問這類問題嗎?|這真的是你想知道的嗎?|為何不問問別人?|你曾有過類似的問題嗎?|你問這問題的原因是甚麼呢?" },
    { Q: "原因", A: "這是真正的原因嗎?|還有其他原因嗎?" },
    { Q: "理由", A: "這說明了甚麼呢?|還有其他理由嗎?" },
    { Q: "你好 | 嗨 | 您好", A: "你好，有甚麼問題嗎?" },
    { Q: "或許", A: "你好像不太確定?" },
    { Q: "不曉得 | 不知道", A: "為何不知道?|在想想看，有沒有甚麼可能性?" },
    { Q: "不想 | 不希望", A: "有沒有甚麼辦法呢?|為何不想*呢?|那你希望怎樣呢?" },
    { Q: "想 | 希望", A: "為何想*呢?|真的想*?|那就去做阿?為何不呢?" },
    { Q: "不", A: "為何不*?|所以你不*?" },
    { Q: "請", A: "我該如何*呢?|你想要我*嗎?" },
    { Q: "你", A: "你真的是在說我嗎?|別說我了，談談你吧!|為何這麼關心我*?|不要再說我了，談談你吧!|你自己*" },
    { Q: "總是 | 常常", A: "能不能具體說明呢?|何時?" },
    { Q: "像", A: "有多像?|哪裡像?" },
    { Q: "對", A: "你確定嗎?|我了解!" },
    { Q: "朋友", A: "多告訴我一些有關他的事吧!|你認識他多久了呢?" },
    { Q: "電腦", A: "你說的電腦是指我嗎?" },
    { Q: "難過", A: "別想它了|別難過|別想那麼多了|事情總是會解決的" },
    { Q: "高興", A: "不錯ㄚ|太棒了|這樣很好ㄚ" },
    { Q: "是阿|是的", A: "甚麼事呢?|我可以幫助你嗎?|我希望我能幫得上忙!" },
    { Q: "", A: "我了解|我能理解|還有問題嗎 ?|請繼續說下去|可以說的更詳細一點嗎?|這樣喔! 我知道!|然後呢? 發生甚麼事?|再來呢? 可以多說一些嗎|接下來呢? |可以多告訴我一些嗎?|多談談有關你的事，好嗎?|想多聊一聊嗎|可否多告訴我一些呢?" }
];

function getRobot_text() {
    var xhr = new XMLHttpRequest();
    xhr.onload = function () {
        if (xhr.status == 200) {
            showRobot_text(xhr.responseText);
        }
        else {
            alert(xhr.status);
        }
    }
    var url = "php/getRobot_text_JOSN.php";
    xhr.open('get', url, true);
    xhr.send(null);
}
function showRobot_text(jsonStr) {
    qaList = JSON.parse(jsonStr);
    // console.log(Robot_text);
};


getRobot_text();

function random(n) { // 從 0 到 n-1 中選一個亂數
    return Math.floor(Math.random() * n);
}

function say() { // 當送出鍵按下時，會呼叫這個函數進行回答動作
    console.log(qaList,'最後三');
    dialogBox.innerHTML = '';
    append(document.getElementById("say").value); // 先將使用者輸入的問句放到「對話區」顯示。
    answer(document.getElementById("say").value); // 然後回答使用者的問題。
    document.getElementById("say").value = '';
}

function keyin(event) { // 當按下 enter 鍵時，會呼叫此函數進行回答
    var keyCode = event.which; // 取出按下的鍵
    if (keyCode == 13) say(); // 如果是換行字元 \n ，就進行回答動作。
}

function append(line) { // 將 line 放到「對話區」顯示。
    var dialogBox = document.getElementById("dialogBox"); // 取出對話框 
    dialogBox.innerHTML += line + "<BR/>\n"; // 加入 line 這行文字，並加入換行 <BR/>\n
}

function answer(value) { // 回答問題
    setTimeout(function () { // 停頓 1 到 3 秒再回答問題 (因為若回答太快就不像人了，人打字需要時間)
        append(">> " + getAnswer(value));
    }, 500 + random(1000));
}

function getAnswer(value) {
    var say = value; // 取得使用者輸入的問句。
    for (var i in qaList) { // 對於每一個 QA 
        try {
            var qa = qaList[i];
            var qList = qa.Q.split("|"); // 取出 Q 部分，分割成一個一個的問題字串 q
            var aList = qa.A.split("|"); // 取出回答 A 部分，分割成一個一個的回答字串 q
            for (var qi in qList) { // 對於每個問題字串 q
                var q = qList[qi];
                if (q == "") // 如果是最後一個「空字串」的話，那就不用比對，直接任選一個回答。
                    return aList[random(aList.length)]; // 那就從答案中任選一個回答
                var r = new RegExp("(.*)" + q + "([^?.;]*)", "gi"); // 建立正規表達式 (.*) q ([^?.;]*)
                if (say.match(r)) { // 比對成功的話
                    tail = RegExp.$2; // 就取出句尾
                    // 將問句句尾的「我」改成「你」，「你」改成「我」。
                    tail = tail.replace("我", "#").replace("你", "我").replace("#", "你");
                    return aList[random(aList.length)].replace(/\*/, tail); // 然後將 * 改為句尾進行回答
                }
            }
        } catch (err) { }
    }
    return "然後呢？"; // 如果發生任何錯誤，就回答「然後呢？」來混過去。
}   