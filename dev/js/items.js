//<!-- ===================宣告要用的的變數=================== -->
let products;//所有商品存放的變數(物件陣列)
let filterProducts = [];//篩選出來的商品存放的變數(物件陣列)
let filterArray_style = [];//存放顏色篩選條件的陣列
let filterArray_sort = [];//存放吉祥物篩選條件的陣列
let filterArray_category = [];//存放產品篩選條件的陣列

//<!-- ===================Ajax撈取商品=================== -->
//利用Ajax撈取所有商品(上架)
let xhr = new XMLHttpRequest();//建立一個XMLHttpRequest();
xhr.onload = function () {
    if (xhr.status == 200) {
        //products變數存放 所有JSON.parse(xhr.responseText); 所撈取出來的資料
        products = JSON.parse(xhr.responseText);
        //showProduct(products);呼叫showProduct函式把商品在畫面上秀出來，而引數是剛剛存放所有撈出來資料的products變數
        showProduct(products);
        //這時候才能對篩選器所有的按鈕加監聽事件(因為畫面上有商品才能篩選)
        document.getElementById('filterCactus').addEventListener('click', filter, false);
        document.getElementById('filterEagle').addEventListener('click', filter, false);
        document.getElementById('filterDinosaur').addEventListener('click', filter, false);
        document.getElementById('filterRed').addEventListener('click', filter, false);
        document.getElementById('filterBlack').addEventListener('click', filter, false);
        document.getElementById('filterBlue').addEventListener('click', filter, false);
        document.getElementById('fliterWhite').addEventListener('click', filter, false);
        document.getElementById('filterBag').addEventListener('click', filter, false);
        document.getElementById('filterClothes').addEventListener('click', filter, false);
        document.getElementById('filterMugs').addEventListener('click', filter, false);
        document.getElementById('filterPillows').addEventListener('click', filter, false);
    } else {
        //Ajax有連線錯誤的情況
        alert(xhr.status);
    }
};
//Ajax要連到的PHP
let url = "php/getProduct_JSON.php";
//開啟連線(設定模式)，xhr.open('get', url, true);，引數分別是 1.使用get的方式 2.url要連到的PHP 3.true使用非同步
xhr.open('get', url, true);
//送出連線
xhr.send(null);

//<!-- ===================商品篩選器=================== -->
function filter() {
    if (this.checked) {
        filterProducts = [];
        if (this.value == '紅色' || this.value == '黑色' || this.value == '藍色' || this.value == '白色')
            filterArray_style.push(this.value);//新增選取顏色篩選條件
        else if (this.value == '仙人掌' || this.value == '老鷹' || this.value == '恐龍')
            filterArray_sort.push(this.value);//新增選取吉祥物篩選條件
        else if (this.value == '包包' || this.value == '衣服' || this.value == '馬克杯' || this.value == '枕頭')
            filterArray_category.push(this.value);//新增選取類別篩選條件

        //只有顏色被篩選
        if (filterArray_style.length != 0 && filterArray_sort.length == 0 && filterArray_category.length == 0) {
            filterArray_style.forEach(function (element) {
                for (let i = 0; i < products.length; i++) {
                    if (products[i].product_style == element)
                        filterProducts.push(products[i]);
                }
            });
        }
        //只有吉祥物被篩選
        else if (filterArray_style.length == 0 && filterArray_sort.length != 0 && filterArray_category.length == 0) {
            filterArray_sort.forEach(function (element) {
                for (let i = 0; i < products.length; i++) {
                    if (products[i].product_sort == element)
                        filterProducts.push(products[i]);
                }
            });
        }
        //只有類別被篩選
        else if (filterArray_style.length == 0 && filterArray_sort.length == 0 && filterArray_category.length != 0) {
            filterArray_category.forEach(function (element) {
                for (let i = 0; i < products.length; i++) {
                    if (products[i].product_category == element)
                        filterProducts.push(products[i]);
                }
            });
        }
        //只有顏色和吉祥物被篩選
        else if (filterArray_style.length != 0 && filterArray_sort.length != 0 && filterArray_category.length == 0) {
            let select_arr = [];
            let filter_arr = [];
            for (let x = 0; x < filterArray_style.length; x++) {
                for (let y = 0; y < filterArray_sort.length; y++) {
                    filter_arr = [];
                    filter_arr.push(filterArray_style[x]);
                    filter_arr.push(filterArray_sort[y]);
                    select_arr.push(filter_arr);
                }
            }
            // console.log(filter_arr);
            // console.log(select_arr);
            select_arr.forEach(function (element, index) {
                for (let i = 0; i < products.length; i++) {
                    if (products[i].product_style == element[0] && products[i].product_sort == element[1])
                        filterProducts.push(products[i]);
                }
            });
            // console.log(filterProducts);
        }
        //只有顏色和類別被篩選
        else if (filterArray_style.length != 0 && filterArray_sort.length == 0 && filterArray_category.length != 0) {
            let select_arr = [];
            let filter_arr = [];
            for (let x = 0; x < filterArray_style.length; x++) {
                for (let y = 0; y < filterArray_category.length; y++) {
                    filter_arr = [];
                    filter_arr.push(filterArray_style[x]);
                    filter_arr.push(filterArray_category[y]);
                    select_arr.push(filter_arr);
                }
            }
            // console.log(filter_arr);
            // console.log(select_arr);
            select_arr.forEach(function (element, index) {
                for (let i = 0; i < products.length; i++) {
                    if (products[i].product_style == element[0] && products[i].product_category == element[1])
                        filterProducts.push(products[i]);
                }
            });
            // console.log(filterProducts);
        }
        //只有吉祥物和類別被篩選
        else if (filterArray_style.length == 0 && filterArray_sort.length != 0 && filterArray_category.length != 0) {
            let select_arr = [];
            let filter_arr = [];
            for (let x = 0; x < filterArray_sort.length; x++) {
                for (let y = 0; y < filterArray_category.length; y++) {
                    filter_arr = [];
                    filter_arr.push(filterArray_sort[x]);
                    filter_arr.push(filterArray_category[y]);
                    select_arr.push(filter_arr);
                }
            }
            // console.log(filter_arr);
            // console.log(select_arr);
            select_arr.forEach(function (element, index) {
                for (let i = 0; i < products.length; i++) {
                    if (products[i].product_sort == element[0] && products[i].product_category == element[1])
                        filterProducts.push(products[i]);
                }
            });
            // console.log(filterProducts);
        }
        // 3個篩選都有被選
        else if (filterArray_style.length != 0 && filterArray_sort.length != 0 && filterArray_category.length != 0) {
            let select_arr = [];
            let filter_arr = [];
            for (let x = 0; x < filterArray_style.length; x++) {
                for (let y = 0; y < filterArray_sort.length; y++) {
                    for (let z = 0; z < filterArray_category.length; z++) {
                        filter_arr = [];
                        filter_arr.push(filterArray_style[x]);
                        filter_arr.push(filterArray_sort[y]);
                        filter_arr.push(filterArray_category[z]);
                        select_arr.push(filter_arr);
                    }
                }
            }
            // console.log(filter_arr);
            // console.log(select_arr);
            select_arr.forEach(function (element, index) {
                for (let i = 0; i < products.length; i++) {
                    if (products[i].product_style == element[0] && products[i].product_sort == element[1] && products[i].product_category == element[2])
                        filterProducts.push(products[i]);
                }
            });
            // console.log(filterProducts);
        }
        showProduct(filterProducts);
        // console.log(filterArray);
    }
    else {
        filterProducts = [];
        // console.log(filterArray.indexOf(this.value));
        if (this.value == '紅色' || this.value == '黑色' || this.value == '藍色' || this.value == '白色')
            filterArray_style.splice(filterArray_style.indexOf(this.value), 1);//移除選取顏色篩選條件
        else if (this.value == '仙人掌' || this.value == '老鷹' || this.value == '恐龍')
            filterArray_sort.splice(filterArray_sort.indexOf(this.value), 1);//移除選取吉祥物篩選條件
        else if (this.value == '包包' || this.value == '衣服' || this.value == '馬克杯' || this.value == '枕頭')
            filterArray_category.splice(filterArray_category.indexOf(this.value), 1);//移除選取類別篩選條件

        // console.log(filterArray_style);
        // console.log(filterArray_sort);
        // console.log(filterArray_category);
        //都沒被選
        // console.log(products);
        if (filterArray_style.length == 0 && filterArray_sort.length == 0 && filterArray_category.length == 0) {
            for (let i = 0; i < products.length; i++) {
                if (products[i])
                    filterProducts.push(products[i]);
            }
        }
        //只有顏色被篩選
        else if (filterArray_style.length != 0 && filterArray_sort.length == 0 && filterArray_category.length == 0) {
            filterArray_style.forEach(function (element) {
                for (let i = 0; i < products.length; i++) {
                    if (products[i].product_style == element)
                        filterProducts.push(products[i]);
                }
            });
        }
        //只有吉祥物被篩選
        else if (filterArray_style.length == 0 && filterArray_sort.length != 0 && filterArray_category.length == 0) {
            filterArray_sort.forEach(function (element) {
                for (let i = 0; i < products.length; i++) {
                    if (products[i].product_sort == element)
                        filterProducts.push(products[i]);
                }
            });
        }
        //只有類別被篩選
        else if (filterArray_style.length == 0 && filterArray_sort.length == 0 && filterArray_category.length != 0) {
            filterArray_category.forEach(function (element) {
                for (let i = 0; i < products.length; i++) {
                    if (products[i].product_category == element)
                        filterProducts.push(products[i]);
                }
            });
        }
        //只有顏色和吉祥物被篩選
        else if (filterArray_style.length != 0 && filterArray_sort.length != 0 && filterArray_category.length == 0) {
            let select_arr = [];
            let filter_arr = [];
            for (let x = 0; x < filterArray_style.length; x++) {
                for (let y = 0; y < filterArray_sort.length; y++) {
                    filter_arr = [];
                    filter_arr.push(filterArray_style[x]);
                    filter_arr.push(filterArray_sort[y]);
                    select_arr.push(filter_arr);
                }
            }
            // console.log(filter_arr);
            // console.log(select_arr);
            select_arr.forEach(function (element, index) {
                for (let i = 0; i < products.length; i++) {
                    if (products[i].product_style == element[0] && products[i].product_sort == element[1])
                        filterProducts.push(products[i]);
                }
            });
            // console.log(filterProducts);
        }
        //只有顏色和類別被篩選
        else if (filterArray_style.length != 0 && filterArray_sort.length == 0 && filterArray_category.length != 0) {
            let select_arr = [];
            let filter_arr = [];
            for (let x = 0; x < filterArray_style.length; x++) {
                for (let y = 0; y < filterArray_category.length; y++) {
                    filter_arr = [];
                    filter_arr.push(filterArray_style[x]);
                    filter_arr.push(filterArray_category[y]);
                    select_arr.push(filter_arr);
                }
            }
            // console.log(filter_arr);
            // console.log(select_arr);
            select_arr.forEach(function (element, index) {
                for (let i = 0; i < products.length; i++) {
                    if (products[i].product_style == element[0] && products[i].product_category == element[1])
                        filterProducts.push(products[i]);
                }
            });
            // console.log(filterProducts);
        }
        //只有吉祥物和類別被篩選
        else if (filterArray_style.length == 0 && filterArray_sort.length != 0 && filterArray_category.length != 0) {
            let select_arr = [];
            let filter_arr = [];
            for (let x = 0; x < filterArray_sort.length; x++) {
                for (let y = 0; y < filterArray_category.length; y++) {
                    filter_arr = [];
                    filter_arr.push(filterArray_sort[x]);
                    filter_arr.push(filterArray_category[y]);
                    select_arr.push(filter_arr);
                }
            }
            // console.log(filter_arr);
            // console.log(select_arr);
            select_arr.forEach(function (element, index) {
                for (let i = 0; i < products.length; i++) {
                    if (products[i].product_sort == element[0] && products[i].product_category == element[1])
                        filterProducts.push(products[i]);
                }
            });
            // console.log(filterProducts);
        }
        // 3個篩選都有被選
        else if (filterArray_style.length != 0 && filterArray_sort.length != 0 && filterArray_category.length != 0) {
            let select_arr = [];
            let filter_arr = [];
            for (let x = 0; x < filterArray_style.length; x++) {
                for (let y = 0; y < filterArray_sort.length; y++) {
                    for (let z = 0; z < filterArray_category.length; z++) {
                        filter_arr = [];
                        filter_arr.push(filterArray_style[x]);
                        filter_arr.push(filterArray_sort[y]);
                        filter_arr.push(filterArray_category[z]);
                        select_arr.push(filter_arr);
                    }
                }
            }
            // console.log(filter_arr);
            // console.log(select_arr);
            select_arr.forEach(function (element, index) {
                for (let i = 0; i < products.length; i++) {
                    if (products[i].product_style == element[0] && products[i].product_sort == element[1] && products[i].product_category == element[2])
                        filterProducts.push(products[i]);
                }
            });
            // console.log(filterProducts);
        }
        showProduct(filterProducts);
        // console.log(filterArray);
    }

}

//<!-- ===================把商品秀在畫面上=================== -->
function showProduct(products) {
    // console.log(products);
    //清空4個slider區塊
    for (let i = 0; i < 4; i++) {
        document.querySelectorAll('.shop-tab-inner')[i].innerHTML = '';
    }
    //產生包包、衣服、馬克杯、枕頭的slider<DIV>
    let newDivBag = document.createElement('div');
    let newDivClothes = document.createElement('div');
    let newDivMug = document.createElement('div');
    let newDivPillow = document.createElement('div');
    //slider<DIV>加入貓頭鷹的class
    newDivBag.classList.add('sort_same', 'owl-carousel', 'owl-theme');
    newDivClothes.classList.add('sort_same', 'owl-carousel', 'owl-theme');
    newDivMug.classList.add('sort_same', 'owl-carousel', 'owl-theme');
    newDivPillow.classList.add('sort_same', 'owl-carousel', 'owl-theme');
    //抓到所有樣板的參考
    let arrowLeft = document.getElementById('arrowLeft').children[0];
    let arrowRight = document.getElementById('arrowRight').children[0];
    let objCactus = document.getElementById('objCactus').children[0];
    let objDinosaur = document.getElementById('objDinosaur').children[0];
    let objEagle = document.getElementById('objEagle').children[0];
    let objHorse = document.getElementById('objHorse').children[0];
    //宣告clone箭頭的存放的陣列
    let cloneArrowLeft = [];
    let cloneArrowRight = [];
    //把clone的箭頭存放到陣列中
    for (let i = 0; i < 4; i++) {
        cloneArrowLeft[i] = arrowLeft.cloneNode(true);
        cloneArrowRight[i] = arrowRight.cloneNode(true);
    }

    products.forEach(function (element, i) {
        //判斷商品種類
        let category = element.product_category;
        // let category = products[i].product_category;
        switch (category) {
            case "包包":
                let cloneobjCactus = objCactus.cloneNode(true);
                cloneobjCactus.children[0].href = `item.html?product_no=${element.product_no}`;
                cloneobjCactus.firstElementChild.children[1].children[0].firstElementChild.src = products[i].product_image;
                cloneobjCactus.firstElementChild.children[1].children[1].innerText = products[i].product_name;
                cloneobjCactus.firstElementChild.children[1].children[2].innerText = "NT." + products[i].product_price;
                cloneobjCactus.lastElementChild.children[0].value = products[i].product_name + "|" + products[i].product_image + "|" + products[i].product_price;
                cloneobjCactus.lastElementChild.id = "pd-" + products[i].product_no;
                newDivBag.appendChild(cloneobjCactus);
                break;
            case "衣服":
                let cloneobjDinosaur = objDinosaur.cloneNode(true);
                cloneobjDinosaur.children[0].href = `item.html?product_no=${element.product_no}`;
                cloneobjDinosaur.firstElementChild.children[1].children[0].firstElementChild.src = products[i].product_image;
                cloneobjDinosaur.firstElementChild.children[1].children[1].innerText = products[i].product_name;
                cloneobjDinosaur.firstElementChild.children[1].children[2].innerText = "NT." + products[i].product_price;
                cloneobjDinosaur.lastElementChild.children[0].value = products[i].product_name + "|" + products[i].product_image + "|" + products[i].product_price;
                cloneobjDinosaur.lastElementChild.id = "pd-" + products[i].product_no;
                newDivClothes.appendChild(cloneobjDinosaur);
                break;
            case "馬克杯":
                let cloneobjEagle = objEagle.cloneNode(true);
                cloneobjEagle.children[0].href = `item.html?product_no=${element.product_no}`;
                cloneobjEagle.firstElementChild.children[1].children[0].firstElementChild.src = products[i].product_image;
                cloneobjEagle.firstElementChild.children[1].children[1].innerText = products[i].product_name;
                cloneobjEagle.firstElementChild.children[1].children[2].innerText = "NT." + products[i].product_price;
                cloneobjEagle.lastElementChild.children[0].value = products[i].product_name + "|" + products[i].product_image + "|" + products[i].product_price;
                cloneobjEagle.lastElementChild.id = "pd-" + products[i].product_no;
                newDivMug.appendChild(cloneobjEagle);
                break;
            case "枕頭":
                let cloneobjHorse = objHorse.cloneNode(true);
                cloneobjHorse.children[0].href = `item.html?product_no=${element.product_no}`;
                cloneobjHorse.firstElementChild.children[1].children[0].firstElementChild.src = products[i].product_image;
                cloneobjHorse.firstElementChild.children[1].children[1].innerText = products[i].product_name;
                cloneobjHorse.firstElementChild.children[1].children[2].innerText = "NT." + products[i].product_price;
                cloneobjHorse.lastElementChild.children[0].value = products[i].product_name + "|" + products[i].product_image + "|" + products[i].product_price;
                cloneobjHorse.lastElementChild.id = "pd-" + products[i].product_no;
                newDivPillow.appendChild(cloneobjHorse);
                break;
            default:
                break;
        }

    });
    document.querySelectorAll('.shop-tab-inner')[0].appendChild(cloneArrowLeft[0]);
    document.querySelectorAll('.shop-tab-inner')[0].appendChild(newDivBag);
    document.querySelectorAll('.shop-tab-inner')[0].appendChild(cloneArrowRight[0]);
    document.querySelectorAll('.shop-tab-inner')[1].appendChild(cloneArrowLeft[1]);
    document.querySelectorAll('.shop-tab-inner')[1].appendChild(newDivClothes);
    document.querySelectorAll('.shop-tab-inner')[1].appendChild(cloneArrowRight[1]);
    document.querySelectorAll('.shop-tab-inner')[2].appendChild(cloneArrowLeft[2]);
    document.querySelectorAll('.shop-tab-inner')[2].appendChild(newDivMug);
    document.querySelectorAll('.shop-tab-inner')[2].appendChild(cloneArrowRight[2]);
    document.querySelectorAll('.shop-tab-inner')[3].appendChild(cloneArrowLeft[3]);
    document.querySelectorAll('.shop-tab-inner')[3].appendChild(newDivPillow);
    document.querySelectorAll('.shop-tab-inner')[3].appendChild(cloneArrowRight[3]);
    for (let i = 0; i < 4; i++) {
        // console.log(document.querySelectorAll('.shop-tab-inner')[i].children[1].childElementCount);
        if (document.querySelectorAll('.shop-tab-inner')[i].children[1].childElementCount == 0)
            document.querySelectorAll('.shop-tab-inner')[i].innerHTML = '';
    }

    let resizeTimer = true;
    //箭頭 出現/消失 控制 resize
    window.addEventListener('resize', function () {
        if (resizeTimer) {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(function () {
                // console.log("視窗發生改變了喲！",document.body.clientWidth);
                //手機大小
                if (document.body.clientWidth <= 767) {
                    // console.log(document.body.clientWidth);
                    for (let i = 0; i < 4; i++) {
                        if (document.querySelectorAll('.shop-tab-inner')[i].childElementCount != 0 && document.querySelectorAll('.shop-tab-inner')[i].children[1].childElementCount == 1) {
                            document.querySelectorAll('.shop-tab-inner')[i].children[0].style.display = "none";
                            document.querySelectorAll('.shop-tab-inner')[i].children[2].style.display = "none";
                        }
                        else if (document.querySelectorAll('.shop-tab-inner')[i].childElementCount != 0 && document.querySelectorAll('.shop-tab-inner')[i].children[1].childElementCount > 1) {
                            document.querySelectorAll('.shop-tab-inner')[i].children[0].style.display = "";
                            document.querySelectorAll('.shop-tab-inner')[i].children[2].style.display = "";
                        }
                    }
                }
                //桌機大小
                else {
                    // console.log(document.body.clientWidth);
                    for (let i = 0; i < 4; i++) {
                        if (document.querySelectorAll('.shop-tab-inner')[i].childElementCount != 0 && document.querySelectorAll('.shop-tab-inner')[i].children[1].childElementCount <= 3) {
                            document.querySelectorAll('.shop-tab-inner')[i].children[0].style.display = "none";
                            document.querySelectorAll('.shop-tab-inner')[i].children[2].style.display = "none";
                        }
                        else if (document.querySelectorAll('.shop-tab-inner')[i].childElementCount != 0 && document.querySelectorAll('.shop-tab-inner')[i].children[1].childElementCount > 3) {
                            document.querySelectorAll('.shop-tab-inner')[i].children[0].style.display = "";
                            document.querySelectorAll('.shop-tab-inner')[i].children[2].style.display = "";
                        }
                    }
                }
            }, 500);
        }
    }
        , false);
    //手機大小
    if (document.body.clientWidth <= 767) {
        for (let i = 0; i < 4; i++) {
            if (document.querySelectorAll('.shop-tab-inner')[i].childElementCount != 0 && document.querySelectorAll('.shop-tab-inner')[i].children[1].childElementCount == 1) {
                document.querySelectorAll('.shop-tab-inner')[i].children[0].style.display = "none";
                document.querySelectorAll('.shop-tab-inner')[i].children[2].style.display = "none";
            }
            else if (document.querySelectorAll('.shop-tab-inner')[i].childElementCount != 0 && document.querySelectorAll('.shop-tab-inner')[i].children[1].childElementCount > 1) {
                document.querySelectorAll('.shop-tab-inner')[i].children[0].style.display = "";
                document.querySelectorAll('.shop-tab-inner')[i].children[2].style.display = "";
            }
        }
    }
    //桌機大小
    else {
        for (let i = 0; i < 4; i++) {
            if (document.querySelectorAll('.shop-tab-inner')[i].childElementCount != 0 && document.querySelectorAll('.shop-tab-inner')[i].children[1].childElementCount <= 3) {
                document.querySelectorAll('.shop-tab-inner')[i].children[0].style.display = "none";
                document.querySelectorAll('.shop-tab-inner')[i].children[2].style.display = "none";
            }
            else if (document.querySelectorAll('.shop-tab-inner')[i].childElementCount != 0 && document.querySelectorAll('.shop-tab-inner')[i].children[1].childElementCount > 3) {
                document.querySelectorAll('.shop-tab-inner')[i].children[0].style.display = "";
                document.querySelectorAll('.shop-tab-inner')[i].children[2].style.display = "";
            }
        }
    }
    //箭頭消失/出現
    (() => {
        for (let i = 0; i < 4; i++) {
            //桌機
            if (document.querySelectorAll('.shop-tab-inner')[i].childElementCount != 0 && document.querySelectorAll('.shop-tab-inner')[i].children[1].childElementCount > 3) {
                document.querySelectorAll('.shop-tab-inner')[i].children[0].style.display = "none";

                document.querySelectorAll('.shop-tab-inner')[i].children[0].addEventListener('click', function () {
                    if (document.querySelectorAll('.shop-tab-inner')[i].children[1].children[0].children[0].firstElementChild.classList.contains('active')) {
                        document.querySelectorAll('.shop-tab-inner')[i].children[0].style.display = "none";
                    }
                    document.querySelectorAll('.shop-tab-inner')[i].children[2].style.display = "";
                }, false);

                document.querySelectorAll('.shop-tab-inner')[i].children[2].addEventListener('click', function () {
                    if (document.querySelectorAll('.shop-tab-inner')[i].children[1].children[0].children[0].lastElementChild.classList.contains('active')) {
                        document.querySelectorAll('.shop-tab-inner')[i].children[2].style.display = "none";
                    }
                    document.querySelectorAll('.shop-tab-inner')[i].children[0].style.display = "";
                }, false);
                // console.log(document.querySelectorAll('.sort_same')[i]);
                document.querySelectorAll('.shop-tab-inner')[i].addEventListener('touchend', function () {
                    setTimeout(() => {
                        if (document.querySelectorAll('.shop-tab-inner')[i].children[1].children[0].children[0].firstElementChild.classList.contains('active')) {
                            document.querySelectorAll('.shop-tab-inner')[i].children[0].style.display = "none";
                        } else {
                            document.querySelectorAll('.shop-tab-inner')[i].children[0].style.display = "";
                        }
                        if (document.querySelectorAll('.shop-tab-inner')[i].children[1].children[0].children[0].lastElementChild.classList.contains('active')) {
                            console.log("last");
                            document.querySelectorAll('.shop-tab-inner')[i].children[2].style.display = "none";
                        }
                        else {
                            console.log("no_last");
                            document.querySelectorAll('.shop-tab-inner')[i].children[2].style.display = "";
                        }
                    }, 100);
                }, false);
            }
            //手機
            else if (document.querySelectorAll('.shop-tab-inner')[i].childElementCount != 0 && document.querySelectorAll('.shop-tab-inner')[i].children[1].childElementCount > 1) {
                document.querySelectorAll('.shop-tab-inner')[i].children[0].style.display = "none";
                document.querySelectorAll('.shop-tab-inner')[i].children[0].addEventListener('click', function () {
                    if (document.querySelectorAll('.shop-tab-inner')[i].children[1].children[0].children[0].firstElementChild.classList.contains('active')) {
                        document.querySelectorAll('.shop-tab-inner')[i].children[0].style.display = "none";
                    }
                    document.querySelectorAll('.shop-tab-inner')[i].children[2].style.display = "";
                }, false);
                document.querySelectorAll('.shop-tab-inner')[i].children[2].addEventListener('click', function () {
                    if (document.querySelectorAll('.shop-tab-inner')[i].children[1].children[0].children[0].lastElementChild.classList.contains('active')) {
                        document.querySelectorAll('.shop-tab-inner')[i].children[2].style.display = "none";
                    }
                    document.querySelectorAll('.shop-tab-inner')[i].children[0].style.display = "";
                }, false);
                document.querySelectorAll('.shop-tab-inner')[i].addEventListener('touchend', function () {
                    setTimeout(() => {
                        if (document.querySelectorAll('.shop-tab-inner')[i].children[1].children[0].children[0].firstElementChild.classList.contains('active')) {
                            document.querySelectorAll('.shop-tab-inner')[i].children[0].style.display = "none";
                        } else {
                            document.querySelectorAll('.shop-tab-inner')[i].children[0].style.display = "";
                        }
                        if (document.querySelectorAll('.shop-tab-inner')[i].children[1].children[0].children[0].lastElementChild.classList.contains('active')) {
                            console.log("last");
                            document.querySelectorAll('.shop-tab-inner')[i].children[2].style.display = "none";
                        }
                        else {
                            console.log("no_last");
                            document.querySelectorAll('.shop-tab-inner')[i].children[2].style.display = "";
                        }
                    }, 100);
                }, false);
            }
        }
    })();

    // document.querySelectorAll('.shop-tab-inner')[0].insertBefore(newDiv, document.querySelectorAll('.shop-tab-inner')[0].children[1]);
    // document.querySelectorAll('.shop-tab-inner')[0].insertBefore(newDiv, document.querySelectorAll('.shop-tab-inner')[0].children[1]);
    $('.owl-carousel').each(function () {
        $(this).owlCarousel({
            loop: false,
            margin: 0,
            nav: false,
            responsiveClass: true,
            responsive: {
                0: {
                    items: 1,
                },
                768: {
                    items: 2
                },
                1200: {
                    items: 3,
                }
            },
        });
        $(this).siblings().find('.next').click(function () {
            $(this).parent().siblings('.owl-carousel').trigger('next.owl.carousel');
        });
        $(this).siblings().find('.prev').click(function () {
            $(this).parent().siblings('.owl-carousel').trigger('prev.owl.carousel');
        });
    });
    // //點點控制箭頭
    // (() => {
    //     console.log("??");
    //     for (let i = 0; i < 4; i++) {
    //         //桌機
    //         console.log(document.querySelectorAll('.shop-tab-inner')[i].children[1].childElementCount);
    //         if (document.querySelectorAll('.shop-tab-inner')[i].childElementCount != 0 && document.querySelectorAll('.shop-tab-inner')[i].children[1].childElementCount > 2) {
    //             // document.querySelectorAll('.shop-tab-inner')[i].children[0].style.display = "none";
    //             console.log(document.querySelectorAll('.shop-tab-inner')[i].children[1].children[2]);
    //             document.querySelectorAll('.shop-tab-inner')[i].children[1].children[2].addEventListener('click', function (e) {
    //                 console.log(e.target);
    //                 setTimeout(() => {
    //                     if (document.querySelectorAll('.shop-tab-inner')[i].children[1].children[2].children[0].firstElementChild.classList.contains('active')) {
    //                         document.querySelectorAll('.shop-tab-inner')[i].children[0].style.display = "none";
    //                     }
    //                     document.querySelectorAll('.shop-tab-inner')[i].children[2].style.display = "";
    //                 }, 1000)
    //             }, false);

    //             document.querySelectorAll('.shop-tab-inner')[i].children[2].addEventListener('click', function () {
    //                 if (document.querySelectorAll('.shop-tab-inner')[i].children[1].children[0].children[0].lastElementChild.classList.contains('active')) {
    //                     document.querySelectorAll('.shop-tab-inner')[i].children[2].style.display = "none";
    //                 }
    //                 document.querySelectorAll('.shop-tab-inner')[i].children[0].style.display = "";
    //             }, false);

    //             // console.log(document.querySelectorAll('.sort_same')[i]);
    //             document.querySelectorAll('.shop-tab-inner')[i].addEventListener('touchend', function () {
    //                 setTimeout(() => {
    //                     if (document.querySelectorAll('.shop-tab-inner')[i].children[1].children[0].children[0].firstElementChild.classList.contains('active')) {
    //                         document.querySelectorAll('.shop-tab-inner')[i].children[0].style.display = "none";
    //                     } else {
    //                         document.querySelectorAll('.shop-tab-inner')[i].children[0].style.display = "";
    //                     }
    //                     if (document.querySelectorAll('.shop-tab-inner')[i].children[1].children[0].children[0].lastElementChild.classList.contains('active')) {
    //                         console.log("last");
    //                         document.querySelectorAll('.shop-tab-inner')[i].children[2].style.display = "none";
    //                     }
    //                     else {
    //                         console.log("no_last");
    //                         document.querySelectorAll('.shop-tab-inner')[i].children[2].style.display = "";
    //                     }
    //                 }, 100);
    //             }, false);
    //         }
    //     }
    // })();
    doFirst();
}

// selector start
//<!-- ===================篩選器RWD=================== -->
function getStyle(obj, attr) {
    return obj.currentStyle ? obj.currentStyle[attr] : getComputedStyle(obj, null)[attr];
}

window.addEventListener("load", function () {

    var phone_select_button = document.getElementById("phone_select_button");
    var filter = document.getElementById("filter");
    var product_list = document.getElementById("product_list");
    for(let i=0;i<document.querySelectorAll('.select_checkbox').length;i++){
        document.querySelectorAll('.select_checkbox')[i].checked=false;
    }
    phone_select_button.onclick = function () {

        if (document.body.clientWidth < 768) {

            if (getStyle(filter, "display") == "block") {
                filter.style.display = "none";
                product_list.style.paddingTop = "50px";

            } else {
                filter.style.display = "block";
                product_list.style.paddingTop = "850px";
            }
        }

        if (document.body.clientWidth >= 768 && document.body.clientWidth < 992) {
            if (getStyle(filter, "display") == "block") {
                filter.style.display = "none";
                product_list.style.paddingTop = "50px";
            } else {
                filter.style.display = "block";
                product_list.style.paddingTop = "600px";
            }
        }

    }
});

//<!-- ===================臨時購物車=================== -->

var storage = sessionStorage;
function doFirst() {

    if (storage['addItemList'] == null) {
        storage['addItemList'] = '';    //storage.setItem('addItemList','');
    }

    // 幫每個Add Cart建立事件聆聽功能
    let list = document.querySelectorAll('.addButton');     //list是陣列
    // console.log(list.length);
    for (let i = 0; i < list.length; i++) {
        // console.log( list[i]);
    }
    for (let i = 0; i < list.length; i++) {
        list[i].addEventListener('click', function () {
            let productInfo = document.querySelector(`#${this.id} input`).value;
            list[i].disabled
            addItem(this.id, productInfo);
            First();
        });
    }
}
function addItem(itemId, itemValue) {
    //存入storage,判斷是否為重複商品，如果重複就不增加
    if (storage[itemId]) {
        alertify.alert(`商品 : ${itemValue.split('|')[0]} ，已經加入購物車了喔`);
    } else {
        storage['addItemList'] += itemId + ', ';
        itemValue = itemValue + "|1";
        storage[itemId] = itemValue;
        alertify.alert(`商品 : ${itemValue.split('|')[0]} ，成功加入購物車`);
    }
}