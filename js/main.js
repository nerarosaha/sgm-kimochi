$(document).ready(function () {
    $.support.cors = true;
    if (!Array.prototype.indexOf) {
        Array.prototype.indexOf = function (val) {
            return $.inArray(val, this);
        };
    }
    //if (getCookie("showpu") != "") {
    //    $('#popupPage').hide();
    //    $('#m-content').show();
    //    $('#m-header').show();
    //    $('#m-tabstrip').show();
    //} else {
    //    $('#popupPage').show();
    //    $('#m-content').hide();
    //    $('#m-header').hide();
    //    $('#m-tabstrip').hide();       
    //}    $('#btnAppCl').on('click', function () {
        setCookie("showpu", 1, 1);
        $('#popupPage').hide();
        $('#m-content').show();
        $('#m-header').show();
        $('#m-tabstrip').show();
    });    $('a[href=#top]').click(function () {
        $('html, body').animate({ scrollTop: 0 }, 'slow');
        return false;
    });    $("img.lazy").show().lazyload({ effect: "fadeIn" });    $("img.pou_img").show().lazyload({ threshold: 200, effect: "fadeIn" });

    $('#tabstrip-home').on('click', function () {
        window.location.href = '/';
    });
    $('#tabstrip-product-liked').on('click', function () {
        window.location.href = '/san-pham-yeu-thich';
    });
    $('#tabstrip-order').on('click', function () {
        window.location.href = '/checkout/cart';
    });
    $('#tabstrip-search').on('click', function () {
        window.location.href = '/tim-kiem';
    });
    $('#tabstrip-acc').on('click', function () {
        window.location.href = '/account';
    });
    $('.ohn-buttion').live('click', function () {
        window.location.href = '/';
    });
    $('.h-search-back').on('click', function () {
        window.history.back();       
    });
    BzGlobal.ShowNumberProductInCart();
    
    $('.show-menu').click(function () {        
        var isLeftZero = $('#m-quick-menu  div.quick-menu-content').hasClass('left-zero');
        if (isLeftZero) {
            //$('#m-quick-menu').swipe("disable");
            $('#m-quick-menu > div.quick-menu-content').animate({ 'left': '-=70%' }, 100, function () {
                $('#m-quick-menu  div.quick-menu-content').removeClass('left-zero');
                $('#m-quick-menu').css({ 'display': 'none' });
                //$('#m-quick-menu').swipe("enable");
            });
        }
        else {
            //$('#swipe-menu-area').swipe("disable");
            $('#m-quick-menu').css({ 'display': 'block' });
            $('#m-quick-menu div.quick-menu-bg').fadeIn(150);
            $('#m-quick-menu > div.quick-menu-content').animate({ 'left': '+=70%' }, 150, function () {
                $('#m-quick-menu  div.quick-menu-content').addClass('left-zero');
                //$('#swipe-menu-area').swipe("enable");
            });
        }
    });
    $('.sub1_li').on('click', function () {
        if (!($(this).children('.mn_sub2').is(':visible'))) {
            $('.mn_sub2').slideUp("fast");
            $(this).children('.mn_sub2').slideDown("fast");
        } else {
            $('.mn_sub2').slideUp("fast");
        }
        if (!($(this).children('.ic_submn').hasClass('ic_s_cl'))) {
            $('.ic_submn').removeClass('ic_s_cl');
            $(this).children('.ic_submn').addClass('ic_s_cl');
        } else {
            $(this).children('.ic_submn').removeClass('ic_s_cl');
        }
    });
    //----Banner Slider------
    $("#home_banner").owlCarousel({
        autoPlay: 3000,
        singleItem: true,
        navigation: false
    });
});