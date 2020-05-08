window.onload = function() {
    function animate(obj, target, callback) {
        clearInterval(obj.timer);
        obj.timer = setInterval(function() {
            if (obj.offsetLeft == target) {
                clearInterval(obj.timer)
                callback && callback();
            }
            let step = (target - obj.offsetLeft) / 5;
            step = step > 0 ? Math.ceil(step) : Math.floor(step);
            obj.style.left = obj.offsetLeft + step + 'px';
        }, 20)

    }

    function render() {
        for (let i = 0; i < boxs.length; i++) {
            pic_nav.children[i].className = 'point';
        }
        pic_nav.children[count].classList.add('current');
    }

    var slider = document.querySelector('.slider');
    var pics = document.querySelector('.pics');
    var boxs = document.querySelectorAll('.box');
    var btn_left = document.querySelector('.btn-left');
    var btn_right = document.querySelector('.btn-right');
    var pic_nav = document.querySelector('.pic-nav');
    var num = 0;
    var count = 0;
    var flag = true;
    // 容纳图片的父元素宽度
    pics.style.width = (boxs.length + 1) * slider.offsetWidth + 'px';

    // 显示隐藏按钮
    slider.addEventListener('mouseover', function() {
        btn_left.style.display = 'block';
        btn_right.style.display = 'block';
        clearInterval(timer);
    })
    slider.addEventListener('mouseout', function() {
        btn_left.style.display = 'none';
        btn_right.style.display = 'none';
        timer = setInterval(function() {
            btn_right.click();
        }, 3000);
    })

    //同步下方圆点
    for (let i = 0; i < boxs.length; i++) {
        var li = document.createElement('li');
        li.className = 'point';
        pic_nav.appendChild(li);
        li.setAttribute('date-index', i);
        pic_nav.children[i].addEventListener('click', function() {
            for (let i = 0; i < boxs.length; i++) {
                pic_nav.children[i].className = 'point';

            }
            this.classList.add('current');
            let index = this.getAttribute('date-index');
            num = count = index;
            animate(pics, -slider.offsetWidth * index);
        })
    }
    pic_nav.children[0].classList.add('current');
    // 左右按钮点击事件
    var box_after = pics.children[0].cloneNode(true);
    pics.appendChild(box_after);
    btn_right.addEventListener('click', function() {
        if (flag) {
            flag = false;
            if (num == boxs.length) {
                pics.style.left = 0;
                num = 0
            }
            num++;
            count++;
            count = count == boxs.length ? 0 : count;
            animate(pics, -slider.offsetWidth * num, function() {
                flag = true;
            });
            render();
        }
    })
    btn_left.addEventListener('click', function() {
        if (flag) {
            flag = false;
            if (num == 0) {
                num = boxs.length;
                pics.style.left = -slider.offsetWidth * num + 'px';
            }
            num--;
            count--;
            count = count < 0 ? boxs.length - 1 : count;
            animate(pics, -slider.offsetWidth * num, function() {
                flag = true;
            });
            render();
        }
    })

    // 自动轮播
    var timer = setInterval(function() {
        btn_right.click();
    }, 3000)









}