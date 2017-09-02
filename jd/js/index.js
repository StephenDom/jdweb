headOpa();


function headOpa() {
    var header = document.querySelector("header");
    var carousel_height = document.querySelector(".jd_carousel").offsetHeight;
    window.onscroll = function() {
        var srcollTop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop || 0;
        var tempOpa = srcollTop / carousel_height;
        if (tempOpa > 0.8) {
            tempOpa = 0.8

        }
        header.style.background = "rgba(201, 21, 35," + tempOpa + ")";
    }
}



timeOutGo();

function timeOutGo() {
    var totalTime = 3;
    var spans = document.querySelectorAll(".timer>span");

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
        spans[0].innerHTML = hour0;
        spans[1].innerHTML = hour1;
        spans[3].innerHTML = minutes0;
        spans[4].innerHTML = minutes1;
        spans[6].innerHTML = seconds0;
        spans[7].innerHTML = seconds1;

    }



}




jd_carousel();

function jd_carousel() {
    var ul = document.querySelector(".carousel_img");
    var index = 1;

    ul.style.transform = "translateX(-" + index + "0%)";

    var timeId = goInterval()

    ul.addEventListener("transitionend", function() {
        if (index >= 9) {
            index = 1;
            ul.style.transition = "none";
            ul.style.transform = "translateX(-" + index + "0%)";
        } else if (index <= 0) {
            index = 8;
            ul.style.transition = "none";
            ul.style.transform = "translateX(-" + index + "0%)";
        }
        var liIndex = index - 1;
        activeLi(liIndex);
    })
    itcast(ul).swipe(function(d) {
        clearInterval(timeId);
        switch (d) {
            case "left":
                index++;
                break;
            case "right":
                index--;
            default:
                break;
        }
        ul.style.transition = "transform .3s";
        ul.style.transform = "translateX(-" + index + "0%)";
        timeId = goInterval();
    })

    function goInterval() {
        return setInterval(function() {
            index++;
            ul.style.transition = "transform .3s";
            ul.style.transform = "translateX(-" + index + "0%)";
        }, 1000)
    }

    function activeLi(tmpIndex) {
        var lis = document.querySelectorAll(".indexer > li");
        for (var i = 0; i < lis.length; i++) {
            var element = lis[i];
            element.classList.remove("active");
        }
        lis[tmpIndex].classList.add("active");
    }




}