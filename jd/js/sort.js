my_scroll();
/**
 * 1  手动拖动
 *      a touchstart
 *      b touchmove
 *      c 在移动的时候 要加上以前已经移动了的距离 
 * 2  弹簧效果
 * 3  点击菜单置顶
 *      先获取被点击的dom targetli
 *      拿targetli和所有的菜单li标签lis做for循环  lis[i]==targetli  i
 */
function my_scroll() {
    // 目标元素
    var ul = document.querySelector(".left_menu");
    // 手指按下的y坐标
    var starY;
    // 已经移动的距离
    var preDistance = 0;
    // 弹簧
    var springs = 50;
    // 往上拖动最大的距离（没有包括弹簧）往上滑动的距离是负数；
    var maxUp = -(ul.offsetHeight - ul.parentNode.offsetHeight);
    ul.addEventListener("touchstart", function(e) {
        // 判断手指的个数
        if (e.targetTouches.length > 1) {
            return;
        }
        // 记录坐标
        starY = e.targetTouches[0].clientY;
        // 清除过度
        ul.style.transform = "none";
    });



    // 手指移动事件
    ul.addEventListener("touchmove", function(e) {
        // 判断手指个数
        if (e.targetTouches.length > 1) {
            return;
        }
        // 纪录坐标
        var moveY = e.targetTouches[0].clientY;
        // 移动的距离 加上之前已经移动了的距离
        var distance = moveY - starY + preDistance;
        // 判断下拉的最大距离
        if (distance > springs) {
            distance = springs;
        } else if (distance < maxUp - springs) {
            // 谁的值越小，谁就在上面
            distance = maxUp - springs;
        }
        // 设置位移
        ul.style.transform = "translateY(" + distance + "px)"
    });
    // 手指松开
    ul.addEventListener("touchend", function(e) {
            // 判断手指的个数
            if (e.changedTouches.length > 1) {
                return;
            }
            // 记录手指松开的坐标
            var endY = e.changedTouches[0].clientY;
            // 记录这一次移动了的距离 需要加上之前已经移动了的距离 所以是+=
            preDistance += endY - starY;

            // 判断下拉是否超过界限
            if (preDistance > 0) {
                preDistance = 0;
                // 设置ul的位移，添加过度
                ul.style.transition = "transform .5s";
                ul.style.transform = "translateY(" + preDistance + "px)";
            } else if (preDistance < maxUp) {
                preDistance = maxUp;
                ul.style.transition = "transform .5s";
                ul.style.transform = "translateY(" + preDistance + "px)";
            }
        })
        // ul绑定tap点击事件
    itcast(ul).tap(function(e) {
        var targetli = e.target;
        if (targetli.nodeName == "A") {
            targetli = targetli.parentNode;
        }
        // li标签的索引
        var index = -1;
        var lis = document.querySelectorAll(".left_menu li");
        console.log(lis)
        for (var i = 0; i < lis.length; i++) {
            var element = lis[i];
            console.log(element)
            element.classList.remove(".active");
            if (element === targetli) {
                console.log(11)
                index = i;
                element.classList.add(".active");
            }
        }
        // 获取往上移动的距离
        var totalUP = -(index * targetli.offsetHeight);
        if (totalUP < maxUp) {
            totalUP = maxUp;
        }
        // console.log(index)
        // 为了点击置顶之后 再手动拖动
        preDistance = totalUP;
        // 设置ul的位移，要添加过度
        ul.style.transition = "transform .5s";
        // console.log(totalUP)
        ul.style.transform = "translateY(" + totalUP + "px)";
    });
}