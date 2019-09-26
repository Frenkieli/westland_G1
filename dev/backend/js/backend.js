// 登出登入功能
(function () {
    let loginName = document.getElementById('loginName');
    let loginButton = document.querySelector('#loginBox button');

    if (localStorage['admin_name']) {
        loginName.innerText = localStorage['admin_name'];
        loginButton.addEventListener('click', function () {
            window.location.href = '../index.html';
            delete localStorage['admin_name'];
        }, false)
    } else {
        window.location.href = '../index.html';
    }
}());

(function () {
    // my special code
    document.getElementById('administrator').addEventListener('click', administrator, false);
    document.getElementById('product').addEventListener('click', product, false);
    document.getElementById('member').addEventListener('click', member, false);
    document.getElementById('order').addEventListener('click', order, false);
    // document.getElementById('ticket_order').addEventListener('click', ticket_order, false);
    document.getElementById('activity').addEventListener('click', activity, false);
    document.getElementById('message_board').addEventListener('click', message_board, false);
    document.getElementById('robot_text').addEventListener('click', robot_text, false);
    document.getElementById('mission').addEventListener('click', mission, false);
    // document.getElementById('ticket').addEventListener('click', ticket, false);
    document.getElementById('amusement_equipments').addEventListener('click', amusement_equipments, false);
    document.getElementById('question_no').addEventListener('click', question_no, false);
    // document.getElementById('accomplish_fraction').addEventListener('click', accomplish_fraction, false);        //還沒
    document.getElementById('ticket_customized').addEventListener('click', ticket_customized, false);
    // document.getElementById('reset').addEventListener('click', reset, false);                                    //還沒
    let tableTh = document.getElementById('table_th');
    let tableTd = document.getElementById('table_td');
    let tableTitle = document.getElementById('table_title');
    let tdBulid = {
        tdp() {
            let intd = document.createElement('p');
            return intd;
        },
        tdSelect() {
            let intd = document.createElement('select');
            intd.type = 'button';
            return intd;
        },
        tdText() {
            let intd = document.createElement('input');
            intd.type = 'text';
            intd.style.width = "100px";
            intd.disabled = true;
            return intd;
        },
        tdTextarea() {
            let intd = document.createElement('textarea');
            intd.type = 'text';
            intd.style.width = "250px";
            intd.disabled = true;
            return intd;
        },
        tdimg() {
            let intd = document.createElement('img');
            return intd;
        },
        tdDate() {
            let intd = document.createElement('input');
            intd.type = 'date';
            intd.disabled = true;
            return intd;
        }
    };
    let dataType = '';
    let buttonValue = '';
    let updateBtn;
    let deleteBtn;
    let inputarray;
    let updateArrayId = ['administrator_update', 'product_update', 'member_update', 'order_update', 'ticket_order_update', 'activity_update', 'message_board_update', 'robot_text_update', 'mission_update', 'ticket_update', 'amusement_equipments_update', 'question_no_update', 'accomplish_fraction_update', 'ticket_customized_update', 'reset_update'];

    let currentID;//目前選到的表單ID
    let status;
    //清空資料表
    function clearTable(e) {
        tableTh.innerHTML = '';
        tableTd.innerHTML = '';
    }
    //管理員管理
    function administrator(e) {
        document.getElementById("news_button").style.display = "";
        currentID = 0;
        clearTable();
        getAdministrator();
        function getAdministrator() {
            let xhr = new XMLHttpRequest();
            xhr.onload = function () {
                if (xhr.status == 200) {
                    showAdministrator(xhr.responseText);
                }
                else {
                    alert(xhr.status);
                }
            }
            let url = "php/getAdministrator_JSON.php";
            xhr.open('get', url, true);
            xhr.send(null);
        }
        function showAdministrator(jsonStr) {
            let administrators = JSON.parse(jsonStr);
            fakeDate = new Array(administrators.length);
            for (let i = 0; i < administrators.length; i++) {
                fakeDate[i] = new Array(administrators[i].admin_no, administrators[i].admin_name, administrators[i].admin_id, administrators[i].admin_status);
            }
            dataType = [1, 3, 1, 2];
            inputarray = [1];
            buttonValue = ['停權', '正常'];
            updateBtn = 1;
            deleteBtn = 0;
            let tableHeader = document.createElement('tr');
            tableHeader.innerHTML = "<th>管理者編號</th><th>管理者名稱</th><th>帳號</th><th>帳號狀態</th><th>修改</th>";
            tableTh.appendChild(tableHeader);
            makeTable();
        }
    }
    //商品管理
    function product(e) {
        document.getElementById("news_button").style.display = "";
        tableTitle.innerText = this.innerText;
        currentID = 1;
        clearTable();
        getProduct();
        function getProduct() {
            let xhr = new XMLHttpRequest();
            xhr.onload = function () {
                if (xhr.status == 200) {
                    showProduct(xhr.responseText);
                }
                else {
                    alert(xhr.status);
                }
            }
            let url = "php/getProduct_JSON.php";
            xhr.open('get', url, true);
            xhr.send(null);
        }
        function showProduct(jsonStr) {
            let products = JSON.parse(jsonStr);
            // console.log(products);
            fakeDate = new Array(products.length);
            for (let i = 0; i < products.length; i++) {
                fakeDate[i] = new Array(products[i].product_no, products[i].product_name, products[i].product_image, products[i].product_status, products[i].product_price, products[i].product_ifo, products[i].product_style, products[i].product_sort, products[i].product_category, products[i].product_count);
            }
            dataType = [1, 3, 5, 2, 3, 4, 3, 3, 3, 3];
            inputarray = [1, 4, 5, 6, 7, 8, 9];
            buttonValue = ['下架', '上架'];
            updateBtn = 1;
            deleteBtn = 0;
            let tableHeader = document.createElement('tr');
            tableHeader.innerHTML = "<th>商品編號</th><th>商品名稱</th><th>商品照片</th><th>商品上下架</th><th>價格</th><th>簡介</th><th>商品樣式</th><th>種類</th><th>類別</th><th>數量</th><th>編輯</th>";
            tableTh.appendChild(tableHeader);
            makeTable();
            // window.print();
        };
    }
    //會員查詢
    function member(e) {
        document.getElementById("news_button").style.display = "none";
        tableTitle.innerText = this.innerText;
        currentID = 2;
        clearTable();
        getmember();
        function getmember() {
            let xhr = new XMLHttpRequest();
            xhr.onload = function () {
                if (xhr.status == 200) {
                    showMember(xhr.responseText);
                } else {
                    alert(xhr.status);
                }
            }
            let url = "php/getMember_JSON.php";
            xhr.open('get', url, true);
            xhr.send(null);
        }
        function showMember(jsonStr) {
            let members = JSON.parse(jsonStr);
            fakeDate = new Array(members.length);
            for (let i = 0; i < members.length; i++) {
                // console.log(members);
                fakeDate[i] = new Array(members[i].member_no, members[i].member_id, members[i].member_name, members[i].member_email, members[i].member_tel, members[i].member_birth, members[i].member_money, members[i].using_ticket_no, members[i].member_status);
            }
            dataType = [1, 1, 1, 1, 1, 1, 1, 1, 2];
            inputarray = [];
            buttonValue = ['停權', '正常'];
            updateBtn = 0;
            deleteBtn = 0;
            let tableHeader = document.createElement('tr');
            tableHeader.innerHTML = "<th>會員編號</th><th>會員帳號</th><th>會員姓名</th><th>E-mail</th><th>電話</th><th>生日</th><th>購物金</th><th>正在使用的票號</th><th>會員狀態</th>";
            tableTh.appendChild(tableHeader);
            makeTable();
        }
    }
    //訂單管理
    function order(e) {
        document.getElementById("news_button").style.display = "none";
        tableTitle.innerText = this.innerText;
        currentID = 3;
        clearTable();
        getOrder();
        function getOrder() {
            let xhr = new XMLHttpRequest();
            xhr.onload = function () {
                if (xhr.status == 200) {
                    showOrder(xhr.responseText);
                } else {
                    alert(xhr.status);
                }
            }
            let url = "php/getOrder_JSON.php";
            xhr.open('get', url, true);
            xhr.send(null);
        }
        function showOrder(jsonStr) {
            let orders = JSON.parse(jsonStr);
            fakeDate = new Array(orders.length);
            for (let i = 0; i < orders.length; i++) {
                fakeDate[i] = new Array(orders[i].order_no, orders[i].member_no, orders[i].order_item_date, orders[i].cancel_order_item_date, orders[i].order_item_status, orders[i].order_item_total, orders[i].recipient_addre, orders[i].recipient_phone, orders[i].recipient_name, orders[i].recipient_date);
            }
            dataType = [1, 1, 1, 1, 2, 1, 1, 1, 1, 1];
            inputarray = [];
            buttonValue = ['下單', '處理中', '取消', '出貨', '結案'];
            updateBtn = 0;
            deleteBtn = 0;
            let tableHeader = document.createElement('tr');
            tableHeader.innerHTML = "<th>商品訂單編號</th><th>會員ID</th><th>訂單日期</th><th>訂單取消日期</th><th>訂單狀態</th><th>訂單商品總金額</th><th>收件人地址</th><th>收件人電話</th><th>收件人姓名</th><th>收件日期</th>";
            tableTh.appendChild(tableHeader);
            makeTable();
        }
    }
    //門票訂單管理
    // function ticket_order(e) {
    //     tableTitle.innerText = this.innerText;
    //     currentID = 4;
    //     clearTable();
    //     getTicket_order();
    //     function getTicket_order() {
    //         let xhr = new XMLHttpRequest();
    //         xhr.onload = function () {
    //             if (xhr.status == 200) {
    //                 showTicket_order(xhr.responseText);
    //             } else {
    //                 alert(xhr.status);
    //             }
    //         }
    //         let url = "php/getTicket_order_JSON.php";
    //         xhr.open('get', url, true);
    //         xhr.send(null);
    //     }
    //     function showTicket_order(jsonStr) {
    //         let ticket_orders = JSON.parse(jsonStr);
    //         fakeDate = new Array(ticket_orders.length);
    //         for (let i = 0; i < ticket_orders.length; i++) {
    //             // fakeDate[i] = new Array(members[i].member_no, members[i].member_id, members[i].member_name, members[i].member_email, members[i].member_tel, members[i].member_birth, members[i].member_money, members[i].using_ticket_no, members[i].member_status);
    //         }
    //         dataType = [1, 1, 1, 1, 1, 1, 1, 1, 2];
    //         inputarray = [];
    //         buttonValue = ['停權', '正常'];
    //         updateBtn = 0;
    //         deleteBtn = 0;
    //         let tableHeader = document.createElement('tr');
    //         tableHeader.innerHTML = "<th>會員編號</th><th>會員帳號</th><th>會員姓名</th><th>E-mail</th><th>電話</th><th>生日</th><th>購物金</th><th>正在使用的票號</th><th>會員狀態</th>";
    //         tableTh.appendChild(tableHeader);
    //         makeTable();
    //     }
    // }
    //活動管理
    function activity(e) {
        document.getElementById("news_button").style.display = "";
        tableTitle.innerText = this.innerText;
        currentID = 5;
        clearTable();
        getActivity();
        function getActivity() {
            let xhr = new XMLHttpRequest();
            xhr.onload = function () {
                if (xhr.status == 200) {
                    showActivity(xhr.responseText);
                } else {
                    alert(xhr.status);
                }
            }
            let url = "php/getActivity_JSON.php";
            xhr.open('get', url, true);
            xhr.send(null);
        }
        function showActivity(jsonStr) {
            let activitys = JSON.parse(jsonStr);
            fakeDate = new Array(activitys.length);
            for (let i = 0; i < activitys.length; i++) {
                fakeDate[i] = new Array(activitys[i].activity_no, activitys[i].activity_name, activitys[i].activity_date_start, activitys[i].activity_date_end, activitys[i].activity_content);
            }
            dataType = [1, 3, 6, 6, 4];
            inputarray = [1, 2, 3, 4];
            buttonValue = ['停權', '正常'];
            updateBtn = 1;
            deleteBtn = 0;
            let tableHeader = document.createElement('tr');
            tableHeader.innerHTML = "<th>活動編號</th><th>活動名稱</th><th>活動開始日期</th><th>活動結束日期</th><th>活動內容</th><th>修改</th>";
            tableTh.appendChild(tableHeader);
            makeTable();
        }
    }
    //檢舉留言管理
    function message_board(e) {
        document.getElementById("news_button").style.display = "none";
        tableTitle.innerText = this.innerText;
        currentID = 6;
        clearTable();
        getMessage_board();
        function getMessage_board() {
            let xhr = new XMLHttpRequest();
            xhr.onload = function () {
                if (xhr.status == 200) {
                    showMessage_board(xhr.responseText);
                } else {
                    alert(xhr.status);
                }
            }
            let url = "php/getMessage_board_JOSN.php";
            xhr.open('get', url, true);
            xhr.send(null);
        }
        function showMessage_board(jsonStr) {
            let message_boards = JSON.parse(jsonStr);
            fakeDate = new Array(message_boards.length);
            for (let i = 0; i < message_boards.length; i++) {
                fakeDate[i] = new Array(message_boards[i].message_no, message_boards[i].member_no, message_boards[i].equ_message, message_boards[i].report_status);
            }
            dataType = [1, 1, 1, 2];
            inputarray = [];
            buttonValue = ['正常', '被檢舉'];
            updateBtn = 0;
            deleteBtn = 0;
            let tableHeader = document.createElement('tr');
            tableHeader.innerHTML = "<th>留言編號</th><th>會員ID</th><th>留言內容</th><th>檢舉狀態</th>";
            tableTh.appendChild(tableHeader);
            makeTable();
        }
    }
    //機器人文本管理
    function robot_text(e) {
        document.getElementById("news_button").style.display = "";
        tableTitle.innerText = this.innerText;
        currentID = 7;
        clearTable();
        getRobot_text();
        function getRobot_text() {
            let xhr = new XMLHttpRequest();
            xhr.onload = function () {
                if (xhr.status == 200) {
                    showRobot_text(xhr.responseText);
                } else {
                    alert(xhr.status);
                }
            }
            let url = "php/getRobot_text_JOSN.php";
            xhr.open('get', url, true);
            xhr.send(null);
        }
        function showRobot_text(jsonStr) {
            let robot_texts = JSON.parse(jsonStr);
            fakeDate = new Array(robot_texts.length);
            for (let i = 0; i < robot_texts.length; i++) {
                fakeDate[i] = new Array(robot_texts[i].text_no, robot_texts[i].Q, robot_texts[i].A);
            }
            dataType = [1, 3, 4];
            inputarray = [1, 2];
            buttonValue = ['停權', '正常'];
            updateBtn = 1;
            deleteBtn = 0;
            let tableHeader = document.createElement('tr');
            tableHeader.innerHTML = "<th>文本編號</th><th>關鍵字</th><th>回覆文本</th><th>編輯</th>";
            tableTh.appendChild(tableHeader);
            makeTable();
        }
    }
    //經典任務管理
    function mission(e) {
        document.getElementById("news_button").style.display = "none";
        tableTitle.innerText = this.innerText;
        currentID = 8;
        clearTable();
        getMission();
        function getMission() {
            let xhr = new XMLHttpRequest();
            xhr.onload = function () {
                if (xhr.status == 200) {
                    showMission(xhr.responseText);
                } else {
                    alert(xhr.status);
                }
            }
            let url = "php/getMission_JSON.php";
            xhr.open('get', url, true);
            xhr.send(null);
        }
        function showMission(jsonStr) {
            let missions = JSON.parse(jsonStr);
            fakeDate = new Array(missions.length);
            for (let i = 0; i < missions.length; i++) {
                fakeDate[i] = new Array(missions[i].mission_no, missions[i].mission_name, missions[i].mission_bonus);
            }
            dataType = [1, 3, 3];
            inputarray = [1, 2];
            buttonValue = ['停權', '正常'];
            updateBtn = 1;
            deleteBtn = 0;
            let tableHeader = document.createElement('tr');
            tableHeader.innerHTML = "<th>經典任務編號</th><th>任務名稱</th><th>任務完成加分</th><th>修改</th>";
            tableTh.appendChild(tableHeader);
            makeTable();
        }
    }
    //票價管理
    // function ticket(e) {
    //     tableTitle.innerText = this.innerText;
    //     currentID = 9;
    //     clearTable();
    //     getTicket();
    //     function getTicket() {
    //         let xhr = new XMLHttpRequest();
    //         xhr.onload = function () {
    //             if (xhr.status == 200) {
    //                 showTicket(xhr.responseText);
    //             } else {
    //                 alert(xhr.status);
    //             }
    //         }
    //         let url = "php/getTicket_customized_JSON.php";
    //         xhr.open('get', url, true);
    //         xhr.send(null);
    //     }
    //     function showTicket(jsonStr) {
    //         let tickets = JSON.parse(jsonStr);
    //         fakeDate = new Array(tickets.length);
    //         for (let i = 0; i < tickets.length; i++) {
    //             // fakeDate[i] = new Array(members[i].member_no, members[i].member_id, members[i].member_name, members[i].member_email, members[i].member_tel, members[i].member_birth, members[i].member_money, members[i].using_ticket_no, members[i].member_status);
    //         }
    //         dataType = [1, 1, 1, 1, 1, 1, 1, 1, 2];
    //         inputarray = [];
    //         buttonValue = ['停權', '正常'];
    //         updateBtn = 0;
    //         deleteBtn = 0;
    //         let tableHeader = document.createElement('tr');
    //         tableHeader.innerHTML = "<th>會員編號</th><th>會員帳號</th><th>會員姓名</th><th>E-mail</th><th>電話</th><th>生日</th><th>購物金</th><th>正在使用的票號</th><th>會員狀態</th>";
    //         tableTh.appendChild(tableHeader);
    //         makeTable();
    //     }
    // }

    //設施管理
    function amusement_equipments(e) {
        document.getElementById("news_button").style.display = "none";
        tableTitle.innerText = this.innerText;
        currentID = 10;
        clearTable();
        getAmusement_equipments();
        function getAmusement_equipments() {
            let xhr = new XMLHttpRequest();
            xhr.onload = function () {
                if (xhr.status == 200) {
                    showAmusement_equipments(xhr.responseText);
                } else {
                    alert(xhr.status);
                }
            }
            let url = "php/getAmusement_equipments_JOSN.php";
            xhr.open('get', url, true);
            xhr.send(null);
        }
        function showAmusement_equipments(jsonStr) {
            let amusement_equipmentss = JSON.parse(jsonStr);
            fakeDate = new Array(amusement_equipmentss.length);
            for (let i = 0; i < amusement_equipmentss.length; i++) {
                fakeDate[i] = new Array(amusement_equipmentss[i].equ_no, amusement_equipmentss[i].equ_image, amusement_equipmentss[i].equ_name, amusement_equipmentss[i].equ_desc, amusement_equipmentss[i].equ_score_total, amusement_equipmentss[i].score_num, amusement_equipmentss[i].equ_status, amusement_equipmentss[i].equ_bonus);
            }
            dataType = [1, 5, 3, 4, 1, 1, 2, 3];
            inputarray = [2, 3, 7];
            buttonValue = ['維護', '正常'];
            updateBtn = 1;
            deleteBtn = 0;
            let tableHeader = document.createElement('tr');
            tableHeader.innerHTML = "<th>設施編號</th><th>設施圖片</th><th>設施名稱</th><th>設施描述</th><th>設施總評分</th><th>評分人數</th><th>設施狀態</th><th>完成設施加分</th><th>修改</th>";
            tableTh.appendChild(tableHeader);
            makeTable();
        }
    }
    //隨機問答管理
    function question_no(e) {
        document.getElementById("news_button").style.display = "";
        tableTitle.innerText = this.innerText;
        currentID = 11;
        clearTable();
        getQuestion_no();
        function getQuestion_no() {
            let xhr = new XMLHttpRequest();
            xhr.onload = function () {
                if (xhr.status == 200) {
                    showQuestion_no(xhr.responseText);
                } else {
                    alert(xhr.status);
                }
            }
            let url = "php/getQuestion_JOSN.php";
            xhr.open('get', url, true);
            xhr.send(null);
        }
        function showQuestion_no(jsonStr) {
            let question_nos = JSON.parse(jsonStr);
            fakeDate = new Array(question_nos.length);
            for (let i = 0; i < question_nos.length; i++) {
                fakeDate[i] = new Array(question_nos[i].question_no, question_nos[i].question_content, question_nos[i].question_optionA, question_nos[i].question_optionB, question_nos[i].question_optionC, question_nos[i].right_multiple, question_nos[i].correct_option);
            }
            dataType = [1, 4, 5, 5, 5, 3, 3];
            inputarray = [1, 5, 6];
            buttonValue = ['停權', '正常'];
            updateBtn = 1;
            deleteBtn = 0;
            let tableHeader = document.createElement('tr');
            tableHeader.innerHTML = "<th>隨機問答編號</th><th>問題內容</th><th>問題回答選項1</th><th>問題回答選項2</th><th>問題回答選項3</th><th>回答正確懸賞金加倍倍數</th><th>正確答案選項(1 or 2 or 3)</th><th>修改</th>";
            tableTh.appendChild(tableHeader);
            makeTable();
        }
    }
    //兌換獎品管理
    function accomplish_fraction(e) {
        document.getElementById("news_button").style.display = "none";
        tableTitle.innerText = this.innerText;
        currentID = 12;
        clearTable();
        getAccomplish_fraction();
        function getAccomplish_fraction() {
            let xhr = new XMLHttpRequest();
            xhr.onload = function () {
                if (xhr.status == 200) {
                    showAccomplish_fraction(xhr.responseText);
                } else {
                    alert(xhr.status);
                }
            }
            let url = "php/getAccomplish_fraction_JSON.php";
            xhr.open('get', url, true);
            xhr.send(null);
        }
        function showAccomplish_fraction(jsonStr) {
            let accomplish_fractions = JSON.parse(jsonStr);
            fakeDate = new Array(accomplish_fractions.length);
            for (let i = 0; i < accomplish_fractions.length; i++) {
                // fakeDate[i] = new Array(members[i].member_no, members[i].member_id, members[i].member_name, members[i].member_email, members[i].member_tel, members[i].member_birth, members[i].member_money, members[i].using_ticket_no, members[i].member_status);
            }
            dataType = [1, 1, 1, 1, 1, 1, 1, 1, 2];
            inputarray = [];
            buttonValue = ['停權', '正常'];
            updateBtn = 0;
            deleteBtn = 0;
            let tableHeader = document.createElement('tr');
            tableHeader.innerHTML = "<th>會員編號</th><th>會員帳號</th><th>會員姓名</th><th>E-mail</th><th>電話</th><th>生日</th><th>購物金</th><th>正在使用的票號</th><th>會員狀態</th>";
            tableTh.appendChild(tableHeader);
            makeTable();
        }
    }
    //客製吉祥物配件管理
    function ticket_customized(e) {
        document.getElementById("news_button").style.display = "";
        tableTitle.innerText = this.innerText;
        currentID = 13;
        clearTable();
        getTicket_customized();
        function getTicket_customized() {
            let xhr = new XMLHttpRequest();
            xhr.onload = function () {
                if (xhr.status == 200) {
                    showTicket_customized(xhr.responseText);
                } else {
                    alert(xhr.status);
                }
            }
            let url = "php/getMascot_customize_JSON.php";
            xhr.open('get', url, true);
            xhr.send(null);
        }
        function showTicket_customized(jsonStr) {
            let ticket_customizeds = JSON.parse(jsonStr);
            fakeDate = new Array(ticket_customizeds.length);
            for (let i = 0; i < ticket_customizeds.length; i++) {
                fakeDate[i] = new Array(ticket_customizeds[i].mascot_customize_no, ticket_customizeds[i].mascot_customize_image);
            }
            dataType = [1, 5];
            inputarray = [];
            buttonValue = ['停權', '正常'];
            updateBtn = 0;
            deleteBtn = 0;
            let tableHeader = document.createElement('tr');
            tableHeader.innerHTML = "<th>樣式編號</th><th>圖片樣式</th>";
            tableTh.appendChild(tableHeader);
            makeTable();
        }
    }
    //結算和計分重製
    function reset(e) {
        tableTitle.innerText = this.innerText;
        currentID = 14;
        clearTable();
        getReset();
        function getReset() {
            let xhr = new XMLHttpRequest();
            xhr.onload = function () {
                if (xhr.status == 200) {
                    showReset(xhr.responseText);
                } else {
                    alert(xhr.status);
                }
            }
            let url = "php/getReset_JSON.php";
            xhr.open('get', url, true);
            xhr.send(null);
        }
        function showReset(jsonStr) {
            let resets = JSON.parse(jsonStr);
            fakeDate = new Array(resets.length);
            for (let i = 0; i < resets.length; i++) {
                fakeDate[i] = new Array(members[i].member_no, members[i].member_id, members[i].member_name, members[i].member_email, members[i].member_tel, members[i].member_birth, members[i].member_money, members[i].using_ticket_no, members[i].member_status);
            }
            dataType = [1, 1, 1, 1, 1, 1, 1, 1, 2];
            inputarray = [];
            buttonValue = ['停權', '正常'];
            updataBtn = 1;
            deleteBtn = 0;
            let tableHeader = document.createElement('tr');
            tableHeader.innerHTML = "<th>文本編號</th><th>關鍵字</th><th>回覆文本</th><th>編輯</th><th>刪除</th>";
            tableTh.appendChild(tableHeader);
            makeTable();
        }
    }
    //產生資料表
    function makeTable(e) {
        let inTr;
        fakeDate.forEach((value) => {
            // console.log(111);
            inTr = document.createElement('tr');
            for (i = 0; i < value.length; i++) {
                let num = dataType[i];
                let inTd = document.createElement('td');
                if (i == 0) {
                    inTr.id = value[0];
                }
                switch (num) {
                    case 1:
                        inDate = tdBulid.tdp();
                        inDate.innerText = value[i];
                        break;
                    case 2:
                        inDate = tdBulid.tdSelect();
                        inDate.classList.add('status_update');
                        let status = value[i];
                        buttonValue.forEach((value, index) => {
                            let opt = document.createElement('option');
                            opt.innerText = value;
                            opt.value = index;
                            if (index == status)
                                opt.selected = true;
                            inDate.appendChild(opt);
                        })
                        break;
                    case 3:
                        inDate = tdBulid.tdText();
                        inDate.value = value[i];
                        break;
                    case 4:
                        inDate = tdBulid.tdTextarea();
                        inDate.value = value[i];
                        break;
                    case 5:
                        inDate = tdBulid.tdimg();
                        inDate.style.width = "150px";
                        inDate.src = "../" + value[i];
                        break;
                    case 6:
                        inDate = tdBulid.tdDate();
                        inDate.value = value[i];
                        break;
                    default:
                        break;
                }
                inTd.appendChild(inDate);
                inTr.appendChild(inTd);
            }
            if (updateBtn) {
                let lastTd = document.createElement('td');
                let lastDate = document.createElement('input');
                lastDate.type = 'button';
                lastDate.classList.add('update');
                lastDate.value = "編輯";
                lastDate.style.backgroundColor = "#DDEDB7";
                lastTd.appendChild(lastDate);
                inTr.appendChild(lastTd);
            }
            if (deleteBtn) {
                lastTd = document.createElement('td');
                lastDate = document.createElement('input');
                lastDate.type = 'button';
                lastDate.value = "刪除";
                lastTd.appendChild(lastDate);
                inTr.appendChild(lastTd);
            }
            tableTd.appendChild(inTr);
        });
        //下拉式選單事件+Ajax
        let all_status_update = document.querySelectorAll('.status_update');
        for (let i = 0; i < all_status_update.length; i++) {
            all_status_update[i].addEventListener('change', (e) => {
                // console.log(e.target.value);
                // console.log(e.target.parentNode.parentNode.children[0].children[0].innerText);
                let targetID = e.target.parentNode.parentNode.children[0].children[0].innerText;
                let xhr = new XMLHttpRequest();
                xhr.onload = function () {
                    if (xhr.status == 200) {
                        alert(xhr.responseText);
                    }
                    else {
                        alert(xhr.status);
                    }
                }
                let url = `../php/updateBackend_Form.php?status=${e.target.value}&currentID=${currentID}&targetID=${targetID}`;
                xhr.open('get', url, true);
                xhr.send(null);
            })
        }
        //內容修改事件+Ajax
        let all_update = document.querySelectorAll('.update');
        for (let i = 0; i < all_update.length; i++) {
            all_update[i].addEventListener('click', (e) => {
                let inp = e.target.parentNode.parentNode.children;
                e.preventDefault();
                if (e.target.value == '編輯') {
                    e.target.value = '確認';
                    e.target.style.backgroundColor = "#DC9C55";
                    for (let j = 0; j < inputarray.length; j++) {
                        inp[inputarray[j]].lastChild.disabled = false;
                    }
                }
                else if (e.target.value == '確認') {
                    e.target.value = '編輯';
                    e.target.style.backgroundColor = "#DDEDB7";
                    let updateForm = document.getElementById(updateArrayId[currentID]);
                    updateForm.children[1].value = inp[0].lastChild.innerText;
                    console.log(updateForm.children[1].value);
                    for (let u = 0; u < inputarray.length; u++) {
                        updateForm.children[u + 2].value = inp[inputarray[u]].lastChild.value;
                        console.log(updateForm.children[u + 2].value);
                    }

                    let xhr = new XMLHttpRequest();
                    xhr.onload = function () {
                        if (xhr.status == 200) {
                            // console.log(xhr.responseText);
                            alert(xhr.responseText);
                        } else {
                            alert(xhr.status);
                        }
                    }
                    let thisForm = new FormData(updateForm);
                    console.log(thisForm);
                    let url = '../php/updateBackend_Form.php';
                    xhr.open('post', url, true);
                    xhr.send(thisForm);
                    for (let j = 0; j < inputarray.length; j++) {
                        inp[inputarray[j]].lastChild.disabled = true;
                    }
                }
            }, false);
        }
    }
    administrator();
    tableTitle.innerText = '管理員管理';
    //新增按鈕事件
    document.getElementById("news_button").addEventListener("click", function () {
        document.getElementById("all_Insert_Form").style.display = "";
        switch (currentID) {
            case 0:
                document.getElementById("administrator_insert").style.display = "";
                break;
            case 1:
                document.getElementById("product_insert").style.display = "";
                break;
            case 5:
                document.getElementById("activity_insert").style.display = "";
                break;
            case 7:
                document.getElementById("robot_text_insert").style.display = "";
                break;
            case 11:
                document.getElementById("question_no_insert").style.display = "";
                break;
            case 13:
                document.getElementById("ticket_customized_insert").style.display = "";
                break;
            default:
                break;
        }
    }, false);
    //新增取消事件
    let insert_cancel = document.querySelectorAll(".insert_cancel");
    for (let i = 0; i < insert_cancel.length; i++) {
        insert_cancel[i].addEventListener('click', (e) => {
            let select_id = e.target.parentNode.id;
            let select_input = document.querySelectorAll(`#${select_id} .ins`);
            for (let i = 0; i < select_input.length; i++) {
                select_input[i].value = "";
            }
            document.getElementById("all_Insert_Form").style.display = "none";
            e.target.parentNode.style.display = "none";
        }, false);
    }
    //新增確認事件
    let insert_confirm = document.querySelectorAll(".insert_confirm");
    for (let i = 0; i < insert_confirm.length; i++) {
        insert_confirm[i].addEventListener('click', (e) => {
            let select_id = e.target.parentNode.id;
            let select_input = document.querySelectorAll(`#${select_id} .ins`);
            // console.log(select_id);
            // console.log(select_input);
            let canInsert = 1;
            for (let i = 0; i < select_input.length; i++) {
                // console.log(select_input[i].value);
                if (select_input[i].value == "") {
                    canInsert = 0;
                }
            }
            if (canInsert == 0) {
                alert("有東西沒輸入喔~");
            }
            else if (canInsert == 1) {
                let insertForm = e.target.parentNode;
                // console.log(insertForm);
                let xhr = new XMLHttpRequest();
                xhr.onload = function () {
                    if (xhr.status == 200) {
                        let select_id = e.target.parentNode.id;
                        let select_input = document.querySelectorAll(`#${select_id} .ins`);
                        for (let i = 0; i < select_input.length; i++) {
                            select_input[i].value = "";
                        }
                        switch (currentID) {
                            case 0:
                                administrator();
                                break;
                            case 1:
                                product();
                                break;
                            case 5:
                                activity();
                                break;
                            case 7:
                                robot_text();
                                break;
                            case 11:
                                question_no();
                                break;
                            case 13:
                                ticket_customized();
                                break;
                            default:
                                break;
                        }
                        alert(xhr.responseText);
                    } else {
                        alert(xhr.status);
                    }
                }
                let thisForm = new FormData(insertForm);
                let url = "../php/insertBackend_Form.php";
                xhr.open("post", url, true);
                xhr.send(thisForm);
                document.getElementById("all_Insert_Form").style.display = "none";
                e.target.parentNode.style.display = "none";
            }
        }, false);
    }
}());