// 创建新表  获取创建按钮元素
var $btnCreate = document.querySelector(".btn-create");
var $esCover = document.querySelector(".cover");
var $esEdit = document.querySelector(".editpage");
var $esDelete = document.querySelector(".deletepage");
var $iconOff = document.querySelector('.off-icon');
var $esBtnCancer = document.querySelector(".es-btn .btn-cancer");
var $esBtnSubmit = document.querySelector(".es-btn .btn-submit");
var $dpBtnCancer = document.querySelector(".deletepage .btn-cancer");
var $dpBtnSubmit = document.querySelector(".deletepage .btn-submit");
// 实时获取数据相关的删除与修改操作元素
var $dataDelete = document.getElementsByClassName("data-delete");
var $dataChange = document.getElementsByClassName("data-change");

var $esAdd = document.querySelector('.es-add');
var $apidata = document.querySelector('#api-data tbody');
// 数据
var apiData = [];
var listData = [];
var dataId = 0;
var pageNum = 0;
var esDataName = ['name', 'pro', 'othername', 'cycle', 'frag', 'dup', 'main', 'description', 'config'];
//页面显示的数据列数
const listNum = 5;
//es表数据创建
function addEs() {
    let $newEs = document.createElement('tr');
    $newEs.innerHTML = `
    <td>
        <input type="text" placeholder="请输入字段名" class="es-one" name="form-name">
    </td>
    <td>
        <input type="text" placeholder="请选择" class="es-one" name="form-type">
    </td>
    <td><input type="text" class="es-two" name="form-turn"></td>
    <td class="es-ck"><input type="checkbox" name="form-index" class="es-three"></td>
    <td class="es-ck"><input type="checkbox" name="form-key" class="es-three"></td>
    <td class="es-ck"><input type="checkbox" name="form-psearch" class="es-three"></td>
    <td class="es-ck"><input type="checkbox" name="form-asearch" class="es-three"></td>
    <td><input type="text" class="es-four" name="form-timer"></td>
    <td><input type="text" placeholder="请输入字段描述" class="es-five" name="form-descrip"></td>
    <td class="es-six">X</td>
`;
    $newEs.setAttribute('class', 'es-form');
    return $newEs;
}

//获取数据
function getData() {
    let esData = {};
    let esform = [];
    let grounpData = {};
    let $apiconfig = document.querySelector('.api-config').getElementsByTagName('input');
    //列表数据
    let $esApiCount = document.querySelector('#api-data').getElementsByTagName('input');
    let grounpEle = [];
    let index = 0;
    while (index < $esApiCount.length)
        grounpEle.push(Array.prototype.slice.call($esApiCount, index, index += 9));
    //验证配置数据
    if (Array.prototype.some.call($apiconfig, item => {
            return item.value == "";
        })) {
        return false;
    } else {
        if (grounpEle.forEach(item => {
                if (item[0].value == '' || item[1].value == '' || item[8].value == '') {
                    return false;
                }
            }));
    };
    //配置数据保存
    esDataName.forEach((item, index) => { esData[item] = $apiconfig[index].value });
    grounpEle.forEach(item => {
        grounpData.bitename = item[0].value;
        grounpData.type = item[1].value;
        grounpData.turn = item[2].value;
        grounpData.index = item[3].checked;
        grounpData.key = item[4].checked;
        grounpData.psearch = item[5].checked;
        grounpData.asearch = item[6].checked;
        grounpData.timer = item[7].value;
        grounpData.descrip = item[8].value;
        esform.push(grounpData);
        grounpData = {};
    });
    esData.esform = esform;
    return esData;
}

//存储数据
function saveData() {
    localStorage.setItem('apidata', JSON.stringify(apiData));

}
//读取数据
function readData() {
    apiData = [];
    return apiData = (JSON.parse(localStorage.getItem('apidata')) || []);
}

//页面数据分割渲染
function dataload(data) {
    let $listPage = document.querySelector('.list-page');
    if (data.length != 0) {
        // let $listPage = document.querySelector('.list-page');
        let start = 0;
        listData = [];
        $listPage.innerHTML = `<button class="btn-left"><</button><button class="btn-right">></button>`;
        while (start < data.length)
            listData.push(data.slice(start, start += listNum));
        for (let i = 0; i < listData.length; i++) {
            let $numPage = document.createElement('button');
            $numPage.setAttribute('class', 'btn-count');
            $numPage.innerText = i + 1;
            $listPage.insertBefore($numPage, $listPage.lastElementChild);
        }
        while (pageNum > listData.length) pageNum -= 1;

    } else {
        $listPage.innerHTML = '';
        listData = [];
    }
}
//页面列表事件
function pageClick() {
    if (listData.length != 0) {
        let $btnCount = document.querySelectorAll('.btn-count');
        for (let i = 0; i < $btnCount.length; i++) {
            $btnCount[i].addEventListener('click', function() {
                $btnCount[pageNum].className = 'btn-count';
                this.className = 'btn-count btn-current';
                pageNum = i;
                pageView(listData[i]);
            })
        }
        $btnCount[pageNum].className = 'btn-count btn-current';
        let $btnLeft = document.querySelector('.btn-left');
        let $btnRight = document.querySelector('.btn-right');
        $btnLeft.addEventListener('click', function() {
            if (pageNum != 0) {
                $btnCount[pageNum].className = 'btn-count';
                pageNum -= 1;
                $btnCount[pageNum].className = 'btn-count btn-current';
                pageView(listData[pageNum]);
            }
        })
        $btnRight.addEventListener('click', function() {
            if (pageNum < listData.length - 1) {
                $btnCount[pageNum].className = 'btn-count';
                pageNum += 1;
                $btnCount[pageNum].className = 'btn-count btn-current';
                pageView(listData[pageNum]);
            }
        })
    }
}
//页面视图渲染  
function pageView(data) {
    let $allPage = document.querySelector('.table-data tbody');
    $allPage.innerHTML = '';
    if (data.length != 0) {
        data.forEach((item, index) => {
            let $formPage = document.createElement('tr');
            $formPage.className = 'data-list';
            $formPage.setAttribute('data-index', item.id);
            $formPage.innerHTML = '<td>es</td><td>' + item.pro + '</td><td>' + item.name + '</td><td>' + item.othername + '</td><td>' + item.main + '</td><td>' + item.description + '</td><td><span class="data-change">修改</span><span class="data-delete">删除</span></td>';
            $allPage.appendChild($formPage);
            //删除按钮事件
            $formPage.lastElementChild.querySelector('.data-delete').addEventListener('click', e => {
                togPage(1, 0);
                dataId = e.target.parentNode.parentNode.dataset.index;
            });
            // 修改按钮事件
            $formPage.lastElementChild.querySelector('.data-change').addEventListener('click', e => {
                togPage(1, 1);
                dataId = e.target.parentNode.parentNode.dataset.index;

                readData().forEach(item => {
                    if (item.id == dataId) {
                        $apidata.innerHTML = '';
                        for (let i = 0; i < item.esform.length; i++) {
                            $apidata.appendChild(addEs());
                        }
                        //给修改界面按钮绑定删除点击事件
                        Array.prototype.forEach.call(document.querySelectorAll('.es-six'), item => {
                            item.addEventListener('click', e => $apidata.removeChild(e.target.parentNode));
                        })

                        let $apiConfig = document.querySelector('.api-config').getElementsByTagName('input');
                        esDataName.forEach((currentValue, index) => { $apiConfig[index].value = item[currentValue] });
                        let $esApiCount = document.querySelectorAll('.es-form');
                        item.esform.forEach((formValue, formindex) => {
                            let $esinput = $esApiCount[formindex].getElementsByTagName('input');
                            $esinput[0].value = formValue.bitename;
                            $esinput[1].value = formValue.type;
                            $esinput[2].value = formValue.turn;
                            $esinput[3].checked = formValue.index;
                            $esinput[4].checked = formValue.key;
                            $esinput[5].checked = formValue.psearch;
                            $esinput[6].checked = formValue.asearch;
                            $esinput[7].value = formValue.timer;
                            $esinput[8].value = formValue.descrip;
                        })
                    };
                })
            })
        })
    }
}

//页面渲染
function pageload() {
    dataload(readData());
    pageView(listData[pageNum]);
    pageClick();
}
// 切换编辑和视图页面
function togPage(e, n) {
    if (e) {
        $esCover.style = 'display:block';
        if (n) {
            $esEdit.style = 'display:block';
            $esDelete.style = 'display:none';
        } else {
            $esEdit.style = 'display:none';
            $esDelete.style = 'display:block';
        }
    } else $esCover.style = 'display:none';
}
//重置表单默认值
function reSet() {
    let $inputGrounp = $esEdit.getElementsByTagName('input');
    Array.prototype.forEach.call($inputGrounp, item => {
        if (item.type == 'text') {
            item.value = '';
        } else if (item.type == 'checkbox') {
            item.checked = false;
        }
    })
}

// 设置视图页面切换开关
//新建列表
$btnCreate.addEventListener("click", function() {
    reSet();
    dataId = -1;
    togPage(1, 1);
});

//分片数和副本数
var $fragLessBtn = document.getElementById('api-fraglless');
var $fragAddBtn = document.getElementById('api-fragadd');
var $fragNum = document.getElementById('frag-num');

var $dupLessBtn = document.getElementById('api-dupless');
var $dupAddBtn = document.getElementById('api-dupadd');
var $dupNum = document.getElementById('dup-num');


$fragLessBtn.addEventListener('click', () => {
    if ($fragNum.value <= 1) $fragNum.value = 1;
    else if ($fragNum.value > 99) $fragNum.value = 99;
    else $fragNum.value -= 1;
});
$fragNum.addEventListener('change', () => {
    if ($fragNum.value <= 1) $fragNum.value = 1;
    else if ($fragNum.value >= 99) $fragNum.value = 99;
});
$fragAddBtn.addEventListener('click', () => {
    if ($fragNum.value >= 99) $fragNum.value = 99;
    else if ($fragNum.value < 1) $fragNum.value = 1;
    else $fragNum.value = parseInt($fragNum.value) + 1;
});
$dupLessBtn.addEventListener('click', () => {

    if ($dupNum.value <= 1) $dupNum.value = 1;
    else if ($dupNum.value > 99) $dupNum.value = 99;
    else $dupNum.value -= 1;
});
$dupNum.addEventListener('change', () => {
    if ($dupNum.value <= 1) $dupNum.value = 1;
    else if ($dupNum.value >= 99) $dupNum.value = 99;
});
$dupAddBtn.addEventListener('click', () => {
    if ($dupNum.value >= 99) $dup.value = 99;
    else if ($dupNum.value < 1) $dupNum.value = 1;
    else $dupNum.value = parseInt($dupNum.value) + 1;
});

//添加字段数据
$esAdd.addEventListener('click', function() {
        $apidata.appendChild(addEs());
        let $esitem = document.querySelectorAll('.es-six');
        $esitem[$esitem.length - 1].addEventListener('click', e => $apidata.removeChild(e.target.parentNode));
    })
    //删除选项
document.querySelector('.es-six').addEventListener('click', e => $apidata.removeChild(e.target.parentNode));

//列表页面关闭
$iconOff.addEventListener("click", function() {
    togPage(0);
});
//列表取消提交
$esBtnCancer.addEventListener("click", function(e) {
    e.preventDefault();
    togPage(0)
});
//提交事件
$esBtnSubmit.addEventListener("click", function(e) {
    e.preventDefault();
    let updata = getData();
    if (updata) {
        readData();
        if (dataId == -1) {
            updata.id = apiData.length;
            apiData.push(updata);
            saveData();
            togPage(0);
            apiData = [];
            pageload();

        } else {
            updata.id = dataId;
            apiData.splice(dataId, 1, updata);
            saveData();
            togPage(0);
            apiData = [];
            pageload();
        }
    } else {
        alert('数据填写错误，配置选项和必填项不能为空');
    }
});
//删除取消
$dpBtnCancer.addEventListener("click", function(e) {
    e.preventDefault();
    togPage(0)
});

//删除确认事件
$dpBtnSubmit.addEventListener("click", function(e) {
        e.preventDefault();
        readData();
        apiData.splice(dataId, 1);
        apiData.forEach((item, index) => item.id = index);
        saveData();
        togPage(0);
        pageload();
    })
    //删除选项事件 页面删除选项
Array.prototype.forEach.call($dataDelete, function(item) {
    item.addEventListener("click", function() {
        togPage(1, 0)
    })
});

//搜索选项
var $search = document.querySelector('.search-bar');
var $searchBtn = document.querySelector('.btn-search');
$searchBtn.addEventListener('click', function() {
    let searchData = [];
    if ($search.value) {
        let reg = new RegExp($search.value);
        readData();
        apiData.forEach(item => {
            if (item.name.match(reg) || item.othername.match(reg) || item.description.match(reg)) searchData.push(item);
        })
        dataload(searchData);
        pageView(listData[pageNum]);
        pageClick();
    } else {
        pageload();
    }
})
pageload();