$(function () {
    var unSelected = "#ccc";
    var selected = "#000";
        $("select").css("color", unSelected);
        $("option").css("color", selected);
        $("select").change(function () {
            var item = $(this).find("option:selected").text();
            console.log(item)
            var first = $(this).find('option:first').text();
            console.log(first)
            if (item == first) {
                $(this).css("color", unSelected);
            } else {
                $(this).css("color", selected);
            }
        });
});