var $field = document.querySelector('.field');


var $tdlist = document.querySelector('.todobox');
var $tdnum = document.querySelector('.tdnum');

var $dllist = document.querySelector('.dlbox');
var $dlnum = document.querySelector('.dlnum');
var $clear = document.querySelector('.clear');
var listData = [];

//存储数据

function saveData() {
    localStorage.setItem('listData', JSON.stringify(listData));
}
//读取数据

function getData() {
    listData = [];
    return listData = (JSON.parse(localStorage.getItem('listData')) || []);
}
//获取数据
$field.addEventListener('keydown', e => {
    if (e.keyCode == 13 && $field.value) {
        let fieldtext = {};
        fieldtext.thing = $field.value;
        fieldtext.isDone = false;
        getData();
        listData.unshift(fieldtext);
        saveData();
        $field.value = '';
        dataLoad();
    }

})

//渲染页面
function dataLoad() {
    getData();
    $tdlist.innerHTML = '';
    $dllist.innerHTML = '';
    listData.forEach((item, index) => {
        let $template = document.createElement('div');
        $template.className = 'tdlist';
        $template.setAttribute('data-index', index);
        if (item.isDone) {
            $template.innerHTML = '<input type="checkbox" class="btncheck" checked><p class="tdtext">' + item.thing + '</p><div class="delete">X</div>';
            $dllist.appendChild($template);


        } else {
            $template.innerHTML = '<input type="checkbox" class="btncheck"><p class="tdtext">' + item.thing + '</p><div class="delete">X</div>';
            $tdlist.appendChild($template);
        }

    });
    listCount();
    let $check = document.querySelectorAll('.btncheck');
    let $delete = document.querySelectorAll('.delete');
    Array.prototype.forEach.call($check, item => {
        item.addEventListener('click', e => {
            e.preventDefault();
            getData();
            listData[e.target.parentNode.dataset.index].isDone = !listData[e.target.parentNode.dataset.index].isDone;
            saveData();
            dataLoad();
            listCount();
        })
    })
    Array.prototype.forEach.call($delete, item => {
        item.addEventListener('click', e => {
            getData();
            listData.splice(e.target.parentNode.dataset.index, 1);
            saveData();
            dataLoad();
            listCount();
        })
    })

}
//统计数量
function listCount() {
    let $tdCount = $tdlist.getElementsByTagName('input');
    let $dlCount = $dllist.getElementsByTagName('input');
    $tdnum.innerText = $tdCount.length;
    $dlnum.innerText = $dlCount.length;
}

//清空数据
$clear.addEventListener('click', () => {
    listData = [];
    saveData();
    dataLoad();
})

dataLoad();