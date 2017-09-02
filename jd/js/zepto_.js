headOpa();

function headOpa() {
    window.onscroll = function() {
        var srcollTop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop || 0;
        var tempOpa = srcollTop / $(".jd_carousel").height();
        // console.log(tempOpa)
        if (tempOpa > 0.8) {
            tempOpa = 0.8
        }
        $("header").css("background", "rgba(201,21,35," + tempOpa + ")")
    }
}


timeOutGo();

function timeOutGo() {
    var totalTime = 3;
    setTime();
    var timeId = setInterval(function() {
        totalTime--;
        setTime();
        if (totalTime == 0) {
            clearInterval(timeId);
        }
    }, 1000)

    function setTime() {
        var hour = parseInt(totalTime / 60 / 60);
        var minutes = parseInt(totalTime / 60 - hour * 60);
        var seconds = totalTime - hour * 60 * 60 - minutes * 60;
        var hour0 = parseInt(hour / 10);
        var hour1 = hour % 10;
        var minutes0 = parseInt(minutes / 10);
        var minutes1 = parseInt(minutes % 10);
        var seconds0 = parseInt(seconds / 10);
        var seconds1 = parseInt(seconds % 10);
        $("span").eq(0).Html(hour0);
        $("span").eq(1).Html(hour1);
        $("span").eq(3).Html(minutes0);
        $("span").eq(4).Html(minutes1);
        $("span").eq(6).Html(seconds0);
        $("span").eq(7).Html(seconds1);


        // spans[0].innerHTML = hour0;
        // spans[1].innerHTML = hour1;
        // spans[3].innerHTML = minutes0;
        // spans[4].innerHTML = minutes1;
        // spans[6].innerHTML = seconds0;
        // spans[7].innerHTML = seconds1;

    }
}





jd_carousel()

function jd_carousel() {

    var index = 1;
    //  ul.style.transform = "translateX(-" + index + "0%)";
    $(".carousel_img").css("transform", "translateX(-" + index + "0%)");
    var timeId = goInterval();

    $(".carousel_img").on("transitionend", function() {
        if (index >= 9) {
            index = 1;
            // 瞬间切换-- 不需要用到过渡效果
            $(".carousel_img").css({
                "transition": "none",
                "transform": "translateX(-" + index + "0%)"
            });
        } else if (index <= 0) {
            index = 8;
            // 瞬间切换-- 不需要用到过渡效果
            $(".carousel_img").css({
                "transition": "none",
                "transform": "translateX(-" + index + "0%)"
            });
        }
        var liIndex = index - 1;
        $(".indexer>li").eq(liIndex).addClass("active").siblings().removeClass("active");
    });

    $(".carousel_img").swipeLeft(function() {
        clearInterval(timeId);
        index++;
        $(".carousel_img").css({
            "transition": "transform .3s",
            "transform": "translateX(-" + index + "0%)"
        });

        timeId = goInterval();
    });
    $(".carousel_img").swipeRight(function() {
        clearInterval(timeId);
        index--;
        $(".carousel_img").css({
            "transition": "transform .3s",
            "transform": "translateX(-" + index + "0%)"
        });

        timeId = goInterval();
    });

    function goInterval() {
        return setInterval(function() {
            // 索引++
            index++;
            // 添加过渡
            // ul.style.transition = "transform .3s";
            // ul.style.transform = "translateX(-" + index + "0%)";
            $(".carousel_img").css({
                "transition": "transform .3s",
                "transform": "translateX(-" + index + "0%)"
            });
        }, 1000);
    }
}