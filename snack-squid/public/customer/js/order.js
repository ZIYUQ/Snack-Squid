// function showDetails(foods) {
//     // var template = Handlebars.compile(
//     //     "<ul> \
//     //         <li><b>Item</b>:{{this.name}}</li> \
//     //     </ul> ");
//     alert(foods)


//     var detail = '';
//     for (i = 0; i < foods.length; i++) {
//         detail += JSON.stringify(foods[i])
//     };

//     document.getElementById("details").innerHTML = detail;
// }

function remainingTime(time) {
    console.log(time)
    // Set the date we're counting down to
    var countDownDate = new Date(time).getTime();

    // Update the count down every 1 second
    var x = setInterval(function () {

        // Get today's date and time
        var now = new Date().getTime();

        // Find the distance between now and the count down date
        var distance = now - countDownDate;

        // Time calculations for days, hours, minutes and seconds
        var days = Math.floor(distance / (1000 * 60 * 60 * 24));
        var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        var seconds = Math.floor((distance % (1000 * 60)) / 1000);

    // Display the result in the element with id="demo"
        document.getElementById("time").innerHTML = days + "d " + hours + "h "
        + minutes + "m " + seconds + "s ";

    // If the count down is finished, write some text
        if (distance < 0) {
            clearInterval(x);
            document.getElementById("time").innerHTML = "EXPIRED";
        }
    }, 1000);
    
    
}


const formatNumber = n => {
    n = n.toString();
    return n[1] ? n : '0' + n;
};
//团购倒计时
const teamCountTime = (obj) => {
    var timer = null;
    function fn() {
        //获取设置的时间 如：2019-3-28 14:00:00  ios系统得加正则.replace(/\-/g, '/');
        var setTime = obj.getAttribute("time");
        //获取当前时间
        var date = new Date(),
            now = date.getTime(),
            endDate = new Date(setTime),
            end = endDate.getTime();
        //时间差
        var leftTime = end - now;
        //d,h,m,s 天时分秒
        var d, h, m, s;
        var otime = '';
        if (leftTime >= 0) {
            d = Math.floor(leftTime / 1000 / 60 / 60 / 24);
            h = Math.floor(leftTime / 1000 / 60 / 60 % 24);
            m = Math.floor(leftTime / 1000 / 60 % 60);
            s = Math.floor(leftTime / 1000 % 60);
            if (d <= 0) {
                otime = [h, m, s].map(formatNumber).join(':');
            } else {
                otime = d + '天' + [h, m, s].map(formatNumber).join(':');
            }
            obj.innerHTML = '剩余' + otime;
            //
            timer = setTimeout(fn, 1e3);
        } else {
            clearTimeout(timer);
            obj.innerHTML = '拼团已结束';
        }
    }
    fn();
};
let jsTimes = document.querySelectorAll("remainTime");
jsTimes.forEach((obj) => {
    alert(obj)
    obj.innerHTML = `jj`

    // teamCountTime(obj);
});

let details = document.getElementsByClassName("details");
details[0].innerHTML=`pp`;