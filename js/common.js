var domain = 'http://api.kimochi.com.vn/';
var urlProductDetail = domain + 'api/product/p/';
var urlProductList = domain + 'api/product/list';
var urlProductSearch = domain + 'api/product/search';
var IShowPage;
var common = {
    showLoading: function () {
        //$loading.show();
    },
    hideLoading: function () {
        //$loading.hide();
    },
    removeSpecial: function (strObj) {
        return strObj.replace(/[^a-zA-Z0-9_-]/g, '');
    },
    trimToShortName: function (str) {
        return str.replace(/^(.{25}[^\s]*).*/, "$1");
    },
    trimToShortNameTwenty: function (str) {
        return str.replace(/^(.{25}[^\s]*).*/, "$1");
    },
    parseInt: function (price) {
        return parseInt(common.removeSpecial(price));
    },
    replaceDotAndVND: function (obj) {
        obj = obj.replace('.', '').replace('.', '').replace('.', '').replace('đ', '');
        obj = parseInt(obj);
        return obj;
    },
    stopIntervalShowPage: function () {
        window.clearInterval(IShowPage);
    },
    getParameterByName: function (prn) {
        var result='';
        var hu = window.location.search.substring(1);
        var gy = hu.split("&");
        for (var i = 0; i < gy.length; i++) {
            var ft = gy[i].split("=");
            if (ft[0] == prn) {
                result = ft[1];
            }
        }
        return result;
    },
    changeAlias: function (alias) {
        var str = alias;
        str = str.toLowerCase();
        str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
        str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
        str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
        str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ  |ợ|ở|ỡ/g, "o");
        str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
        str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
        str = str.replace(/đ/g, "d");
        str = str.replace(/!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\;|\'| |\"|\&|\#|\[|\]|~|$|_/g, "-");
        /* tìm và thay thế các kí tự đặc biệt trong chuỗi sang kí tự - */
        str = str.replace(/-+-/g, "-"); //thay thế 2- thành 1-
        str = str.replace(/^\-+|\-+$/g, "");
        //cắt bỏ ký tự - ở đầu và cuối chuỗi 
        return str;
    },
    RefreshDiv: function () {
        var hi = 1;
        $('#divRf').text(hi++);
    },
    validationEmail: function (value) {
        return /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i.test(value);
    },    
    continueBuy: function () {
        $('.ohn-buttion').on('tap', function () {
            common.hideCurrentPageAndRemove();
            home.loadDataAndShow();
        });
    }
}
function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + "; " + expires + "; path=/";
}
function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') c = c.substring(1);
        if (c.indexOf(name) == 0) return c.substring(name.length, c.length);
    }
    return "";
}
function checkCookie() {
    var user = getCookie("username");
    if (user != "") {
        alert("Welcome again " + user);
    } else {
        user = prompt("Please enter your name:", "");
        if (user != "" && user != null) {
            setCookie("username", user, 365);
        }
    }
}
function eraseCookie(name) {
    setCookie(name, "", -1);
}
function redirectUrl(rurl) {
    window.location = rurl;
}
function moveScrollTop() {
    var opts = {
        top: 0,
        margin: 0,
        object: null,
        duration: 400,
        callback: false
    };
    if (typeof (arguments[0]) != "undefined") {
        if (arguments[0] instanceof $) opts.object = arguments[0];
        else if (typeof (arguments[0]) == "function") opts.callback = arguments[0];
        else if (typeof (arguments[0]) == "object") $.extend(opts, arguments[0]);
        if (opts.object != null) opts.top = opts.object.offset().top;
    }
    $("body, html").animate({ scrollTop: (opts.top - opts.margin < 0 ? 0 : opts.top - opts.margin) }, opts.duration).promise().then(opts.callback);
}