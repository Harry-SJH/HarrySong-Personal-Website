function checkMsg(){//Form Validation
    var form=document.msg;

    if(form.firstname.value==""){//Make sure the input is not empty
        alert('Input First Name');//Pop-up alert box
        return false;
    }

    if(form.lastname.value==""){//Make sure the input is not empty
        alert('Input Last Name');//Pop-up alert box
        return false;
    }

    if(form.phone.value==""){//Make sure the input is not empty
        alert('Input Phone Number');//Pop-up alert box
        return false;
    }

    if(form.email.value==""){//Make sure the input is not empty
        alert('Input E-mail');//Pop-up alert box
        return false;
    }

    if(form.message.value==""){//Make sure the input is not empty
        alert('Input Your Message');//Pop-up alert box
        return false;
    }

    alert('Submitted successfully');//submit successfully

    window.location.href="index.html";//jump to index page

    return false;
}

//select美化
var divSelectListIndex = 0;

$(function () {
    initDivSelect();
});

//初始化select美化插件
function initDivSelect() {
    $(".div-select-target").each(function () {
        divSelectListIndex++;
        var select = $(this);

        if (select.css("display") == "none") {
            return;
        }
        else {
            select.css("display", "none")
        }

        if (select.next("div").find(".div-select-list").length == 0) {
            select.after('<div><div class="div-select"><div class="div-select-text"><div></div></div><div class="div-select-arrow"><div>∨</div></div></div></div>');
            $("body").append('<div class="div-select-list div-select-list-' + divSelectListIndex + '"></div>');
        }

        var div = select.next("div");
        var divText = div.find(".div-select-text");
        var divSelect = div.find(".div-select");
        var divArrow = div.find(".div-select-arrow");
        var list = $(".div-select-list-" + divSelectListIndex);

        function updateText(item) {
            divText.find("div").html(item.html());
        }

        select.find("option").each(function () {
            var option = $(this);
            var text = option.html();
            var value = option.attr("value");
            list.append('<div class="div-select-item" value="' + value + '">' + text + '</div>');
            list.find(".div-select-item:last").click(function () {
                var item = $(this);
                var value = item.attr("value");
                select.val(value);
                select.change();
                list.find(".div-select-selected").removeClass("div-select-selected");
                item.addClass("div-select-selected");
                updateText(item);
                list.hide();
            });

            list.find(".div-select-item:last").mouseenter(function () {
                var item = $(this);
                var selectedMark = list.find(".div-select-selected");
                selectedMark.removeClass("div-select-selected");
                selectedMark.addClass("div-select-selected-mark");
                list.find(".div-select-item-hover").removeClass("div-select-item-hover");
                item.addClass("div-select-item-hover");
                updateText(item);
            });
        });

        list.mouseleave(function () {
            var selectedMark = list.find(".div-select-selected-mark");
            if (list.find(".div-select-selected").length == 0) {
                selectedMark.addClass("div-select-selected");
                updateText(selectedMark);
            }
            selectedMark.removeClass("div-select-selected-mark");
            list.find(".div-select-item-hover").removeClass("div-select-item-hover");
        });

        if (select.attr("width")) {
            divSelect.width(select.attr("width") - 2);
            divText.width(divSelect.width() - divArrow.width());
            if (select.attr("width") > list.width()) {
                list.width(divSelect.width());
            }
        }

        div.keydown(function (e) {
            list.find(".div-select-selected-mark").removeClass("div-select-selected-mark");
            list.find(".div-select-item-hover").addClass("div-select-selected");
            list.find(".div-select-item-hover").removeClass("div-select-item-hover");
            if (e.keyCode == 40) {
                var currentSelected = list.find(".div-select-selected");
                var nextSelected = currentSelected.next(".div-select-item");
                if (nextSelected.length == 0) {
                    nextSelected = list.find(".div-select-item:first");
                    nextSelected.addClass("div-select-selected");
                    currentSelected.removeClass("div-select-selected");
                    list.scrollTop(0);
                } else {
                    nextSelected.addClass("div-select-selected");
                    currentSelected.removeClass("div-select-selected");
                    var i = 0;
                    while (nextSelected.position().top < 0
                        || nextSelected.position().top > list.height() - nextSelected.height()) {
                        list.scrollTop(list.scrollTop() + nextSelected.height());
                        if (i++ > 100) break;
                    }
                }
                updateText(nextSelected);
                return false;
            }
            if (e.keyCode == 38) {
                var currentSelected = list.find(".div-select-selected");
                var nextSelected = currentSelected.prev(".div-select-item");
                if (nextSelected.length == 0) {
                    nextSelected = list.find(".div-select-item:last");
                    nextSelected.addClass("div-select-selected");
                    currentSelected.removeClass("div-select-selected");
                    list.scrollTop(list.find(".div-select-item").length * nextSelected.height());
                }
                else {
                    nextSelected.addClass("div-select-selected");
                    currentSelected.removeClass("div-select-selected");
                    var i = 0;
                    while (nextSelected.position().top < 0
                        || nextSelected.position().top > list.height() - nextSelected.height()) {
                        list.scrollTop(list.scrollTop() - nextSelected.height());
                        if (i++ > 100) break;
                    }
                }
                updateText(nextSelected);
                return false;
            }
            if (e.keyCode == 13) {
                var selectedItem = list.find(".div-select-selected");
                var value = selectedItem.attr("value");
                select.val(value);
                list.hide();
                select.change();
            }
        });

        divSelect.click(function () {
            $("a").bind("click", function () {
                $("a").unbind("click");
                list.hide();
            });

            if (list.css("display") == "none") {
                list.show();
            }
            else {
                list.hide();
            }

            list.css("top", divSelect.offset().top + divSelect.height() + 1);
            list.css("left", divSelect.offset().left);
            if ($(window).scrollTop() + $(window).height() < list.offset().top + list.height() + 2) {
                list.css("top", $(window).scrollTop() + $(window).height() - list.height() - 2);
            }
            if (list.width() < divSelect.width()) {
                list.width(divSelect.width());
            }

            var currentSelected = list.find(".div-select-selected");
            if (currentSelected.position().top > list.height() - currentSelected.height()) {
                list.scrollTop(currentSelected.position().top - currentSelected.height() * 2);
            }
            return false;
        });

        $("html,body").bind("click", function () {
            list.hide();
        });
        list.click(function () {
            return false;
        });

        function initSelect() {
            list.find(".div-select-selected").removeClass("div-select-selected");
            var matchItem = list.find(".div-select-item[value='" + select.val() + "']");
            if (matchItem.length > 0) {
                matchItem.addClass("div-select-selected");
                updateText(matchItem);
            }
        }
        initSelect();
        select.change(function () {
            initSelect();
        });
    }); // $(".div-select-target").each
}