var hand_hour = document.querySelector('.hour');
var hand_minute = document.querySelector('.minute');
var hand_second = document.querySelector('.second');

var move = setInterval(function() {
    var timer = new Date();
    var cms = timer.getTime() - Date.parse(timer.toDateString());
    hand_hour.style.transform = 'rotate(' + cms / 1000 / 60 / 60 / 12 * 360 + 'deg)';
    hand_minute.style.transform = 'rotate(' + cms / 1000 / 60 / 60 * 360 + 'deg)';
    hand_second.style.transform = 'rotate(' + cms / 1000 / 60 * 360 + 'deg)';
}, 20);