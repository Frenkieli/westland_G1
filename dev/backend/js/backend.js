(function () {
    // my special code
    document.getElementById('administrator').addEventListener('click', administrator, false);
    document.getElementById('product').addEventListener('click', product, false);
    document.getElementById('member').addEventListener('click', member, false);
    document.getElementById('order').addEventListener('click', order, false);
    document.getElementById('ticket_order').addEventListener('click', ticket_order, false);
    document.getElementById('activity').addEventListener('click', activity, false);
    document.getElementById('message_board').addEventListener('click', message_board, false);
    document.getElementById('robot_text').addEventListener('click', robot_text, false);
    document.getElementById('mission').addEventListener('click', mission, false);
    document.getElementById('ticket').addEventListener('click', ticket, false);
    document.getElementById('amusement_equipments').addEventListener('click', amusement_equipments, false);
    document.getElementById('question_no').addEventListener('click', question_no, false);
    document.getElementById('accomplish_fraction').addEventListener('click', accomplish_fraction, false);
    document.getElementById('ticket_customized').addEventListener('click', ticket_customized, false);
    document.getElementById('reset').addEventListener('click', reset, false);
    let tableTh = document.getElementById('table_th');
    let tableTd = document.getElementById('table_td');
    let tableTitle = document.getElementById('table_title');
    let tdBulid = {
        tdp() {
            let intd = document.createElement('p');
            return intd;
        },
        tdButton() {
            let intd = document.createElement('input');
            intd.type = 'button';
            return intd;
        },
        tdText() {
            let intd = document.createElement('input');
            intd.type = 'text';
            intd.style.width = "120px";
            intd.disabled = true;
            return intd;
        },
        tdLongText() {
            let intd = document.createElement('input');
            intd.type = 'text';
            intd.style.width = "200px";
            intd.disabled = true;
            return intd;
        },
        tdimg() {
            let intd = document.createElement('img');
            return intd;
        }
    };
    let dataType = '';
    let buttonValue = '';
    let updataBtn;
    let deleteBtn;
    let inputarray;
    //清空資料表
    function clearTable(e) {
        tableTh.innerHTML = '';
        tableTd.innerHTML = '';
    }
    //管理員管理
    function administrator(e) {
        tableTitle.innerText = this.innerText;
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
            let url = "../php/getAdministrator_JSON.php";
            xhr.open('get', url, true);
            xhr.send(null);
        }
        function showAdministrator(jsonStr) {
            let administrators = JSON.parse(jsonStr);
            fakeDate = new Array(administrators.length);
            for (let i = 0; i < administrators.length; i++) {
                fakeDate[i] = new Array(administrators[i].admin_no, administrators[i].admin_name, administrators[i].admin_psw, administrators[i].admin_status);
            }
            dataType = [1, 3, 3, 2];
            inputarray = [1, 2];
            buttonValue = ['停權', '正常'];
            updataBtn = 1;
            deleteBtn = 0;
            let tableHeader = document.createElement('tr');
            tableHeader.innerHTML = "<th>管理者編號</th><th>管理者名稱</th><th>密碼</th><th>帳號狀態</th><th>修改</th>";
            tableTh.appendChild(tableHeader);
            makeTable();
        }
    }
    //商品管理
    function product(e) {
        tableTitle.innerText = this.innerText;
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
            let url = "../php/getProduct_JSON.php";
            xhr.open('get', url, true);
            xhr.send(null);
        }
        function showProduct(jsonStr) {
            let products = JSON.parse(jsonStr); 
            console.log(products);
            fakeDate = new Array(products.length);
            for (let i = 0; i < products.indexOf('link'); i++) {
                fakeDate[i] = new Array(products[i].product_no, products[i].product_name, products[i].product_image, products[i].product_status, products[i].product_price, products[i].product_ifo, products[i].product_style, products[i].product_sort, products[i].product_category, products[i].product_count);
            }
            dataType = [1, 3, 5, 2, 3, 4, 3, 3, 3, 3];
            inputarray = [1, 4, 5, 6, 7, 8, 9];
            buttonValue = ['下架', '上架'];
            updataBtn = 1;
            deleteBtn = 1;
            let tableHeader = document.createElement('tr');
            tableHeader.innerHTML = "<th>商品編號</th><th>商品名稱</th><th>商品照片</th><th>商品上下架</th><th>價格</th><th>簡介</th><th>商品樣式</th><th>種類</th><th>類別</th><th>數量</th><th>編輯</th><th>刪除</th>";
            tableTh.appendChild(tableHeader);
            makeTable();
            // window.print();
        };
    }
    //會員查詢
    function member(e) {
        tableTitle.innerText = this.innerText;
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
            let url = "../php/getMember_JSON.php";
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
            updataBtn = 0;
            deleteBtn = 0;
            let tableHeader = document.createElement('tr');
            tableHeader.innerHTML = "<th>會員編號</th><th>會員帳號</th><th>會員姓名</th><th>E-mail</th><th>電話</th><th>生日</th><th>購物金</th><th>正在使用的票號</th><th>會員狀態</th>";
            tableTh.appendChild(tableHeader);
            makeTable();
        }
    }
    //訂單管理
    function order(e) {
        tableTitle.innerText = this.innerText;
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
            let url = "../php/getMember_JSON.php";
            xhr.open('get', url, true);
            xhr.send(null);
        }
        function showOrder(jsonStr) {
            let members = JSON.parse(jsonStr);
            fakeDate = new Array(members.length);
            for (let i = 0; i < members.length; i++) {
                fakeDate[i] = new Array(members[i].member_no, members[i].member_id, members[i].member_name, members[i].member_email, members[i].member_tel, members[i].member_birth, members[i].member_money, members[i].using_ticket_no, members[i].member_status);
            }
            dataType = [1, 1, 1, 1, 1, 1, 1, 1, 2];
            inputarray = [];
            buttonValue = ['停權', '正常'];
            updataBtn = 0;
            deleteBtn = 0;
            let tableHeader = document.createElement('tr');
            tableHeader.innerHTML = "<th>會員編號</th><th>會員帳號</th><th>會員姓名</th><th>E-mail</th><th>電話</th><th>生日</th><th>購物金</th><th>正在使用的票號</th><th>會員狀態</th>";
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
                        inDate = tdBulid.tdButton();
                        if (value[i]) {
                            inDate.value = buttonValue[1];
                        } else {
                            inDate.value = buttonValue[0];
                        }
                        break;
                    case 3:
                        inDate = tdBulid.tdText();
                        inDate.value = value[i];
                        break;
                    case 4:
                        inDate = tdBulid.tdLongText();
                        inDate.value = value[i];
                        break;
                    case 5:
                        inDate = tdBulid.tdimg();
                        inDate.style.width = "150px";
                        inDate.src = "../" + value[i];
                    default:
                        break;
                }
                inTd.appendChild(inDate);
                inTr.appendChild(inTd);
            }
            if (updataBtn) {
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
        let all_update = document.querySelectorAll('.update');
        for (let i = 0; i < all_update.length; i++) {
            all_update[i].addEventListener('click', (e) => {
                e.preventDefault();
                if (e.target.value == '編輯') {
                    e.target.value = '確認';
                    e.target.style.backgroundColor = "#DC9C55";
                    let inp = e.target.parentNode.parentNode.children;
                    for (let j = 0; j < inputarray.length; j++) {
                        inp[inputarray[j]].lastChild.disabled = false;
                    }
                }
                else if (e.target.value == '確認') {
                    e.target.value = '編輯';
                    e.target.style.backgroundColor = "#DDEDB7";
                    let inp = e.target.parentNode.parentNode.children;
                    for (let j = 0; j < inputarray.length; j++) {
                        inp[inputarray[j]].lastChild.disabled = true;
                    }
                }
            }, false);
        }
    }
    administrator();
    tableTitle.innerText = '管理員管理';
}());