$(function () {
        var cast = {
            transitoinEnd: function (dom, fn) {
                if (dom && typeof dom === 'object') {
                    dom.addEventListener("webkitTransitionEnd", function () {
                        fn && fn();
                    });
                    /*我可以transitionEnd**/
                    dom.addEventListener("transitionEnd", function () {
                        fn && fn();
                    })
                }
            }
        }

function banner() {
           var banner=document.querySelector(".sweiper-content");
        //
        var imageBox=banner.querySelector("ul:first-child");
        var pointsBox=banner.querySelector("ul:last-child");
        //获取到屏幕的宽度
        var  w=banner.offsetWidth;
        console.log(w)
        //获取到所有的点
        var pointlis=pointsBox.querySelectorAll("li");

        //我用来记录这个图片盒子的索引
        var index=1;

        var addTransition=function(){
            imageBox.style.transition="all 0.2s";
            imageBox.style.webkitTransition="all 0.2s";
        };

        var removeTransition=function(){
            imageBox.style.transition="none";
            imageBox.style.webkitTransition="none";
        }

        //位置移动。
        var addTranslate=function(w){
            imageBox.style.transform="translateX("+w+"px)";
            imageBox.style.webkitTransform="translateX("+w+"px)";
        }


          var timer=setInterval(function(){
               index++;
                //添加过度
               addTransition();
               //必须动态的去改谁
               addTranslate(-index*w);
          },2000);
           /* //我需要把动态的滚动做出来。我必须就要添加定时  *我可以transitionEnd*/
         cast.transitoinEnd(imageBox,function(){
            if(index<=0){
                
                index=8;
                removeTransition();
                addTranslate(-index * w);
            }
            else if(index>=9){
                index=1;
                removeTransition();
                addTranslate(-index * w);
            }
            //修改盒子点的样式。
            setPoint(index);
         });
        /* 修改  盒子的点的样式*/
        var setPoint=function(index){
                for(var i=0;i<pointlis.length;i++){
                    //把一个class 等于移除掉
                    pointlis[i].classList.remove("now");
                }
                //给每个轮播对应的点添加样式。
                console.log(index);
               pointlis[index-1].classList.add("now");
        };
        /*
        * 1:我的触屏移动，imageBox 跟着移动
        * 2：假设我触屏结束，判断的触屏滑动的距离，如果说超过了一定的距离，我就跳到下一张，
        * 否则吸附回去。
        *
        * */

        //这个是用来记录触屏开始的点的位置。
        var startX=0;

        //移动的触摸点的位置x
        var moveX=0;

        //移动的距离
        var distinceX=0;

        //判断我的触摸是否移动
        var isMove=false;

        //触屏开始
        imageBox.addEventListener("touchstart",function(event){
                console.log("start");
                //触摸开始，循环结束
                clearInterval(timer);
                //记录触摸的起点位置。
                /*
                * event 里面记录所有的触摸点，肯定也会记录触摸点的位置，
                * 怎么去获取水平的位置。
                * */
                 startX=event.touches[0].clientX;
                 console.log(event.touches[0].clientX);

        });
        //移动
        imageBox.addEventListener("touchmove",function(event){
                console.log("move");
                //记录触摸点移动的位置。
                isMove=true;
                //我的轮播图肯定要跟着我的触摸点进行移动
                moveX=event.touches[0].clientX;
                //console.log(moveX);
                //我需要startX 与moveX 位置计算出来。
                distinceX=moveX-startX;  //这里的值可能是正数，也可能是负数
                //当前imageBox 要移动的距离
                var current=(-index*w)+distinceX;
                //我要移除这个过度，否则，会有卡顿的效果。
                removeTransition();
                addTranslate(current);



        })
        //触屏离开
        imageBox.addEventListener("touchend",function(){
                 console.log("end")
                 /*
                 * 判断用户触摸移动的距离。如果没有超过一定的位置，我们就要吸附回去
                 * 如果超过了一定的位置，我还需要判断是滑动下一张，还是上一张。
                 * */
                 if(isMove && Math.abs(distinceX)>w/3){
                        //图片移动
                        //我要判断是向左还是向右滑动
                        if(distinceX>0){
                                index--;
                        }else{
                                index++;
                        }

                         //吸附回去
                         addTransition();
                         addTranslate(-index*w);
                 }else{
                        //吸附回去
                        addTransition();
                        addTranslate(-index*w);
                 }


                //触摸结束，循环继续
                timer=setInterval(function(){
                    index++;
                    //添加过度
                    addTransition();
                    //必须动态的去改谁
                    addTranslate(-index*w);
                },1000);
        })
    }
    banner()
});