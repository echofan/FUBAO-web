$(function(){
    $(".footer a").click(function(){
         $(this).addClass("active").siblings().removeClass('active');  
    });
    $(".imgs").click(function(){
        $(this).parent().parent().parent().hide();
    });
    $(".new-bar-publish").click(function(){
        $(".hides").show(); 
    });
    //histoyr -1
    $(".history").click(function(){
        history.go(-1);
    });
});