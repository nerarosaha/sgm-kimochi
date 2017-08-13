$(document).ready(function () {    hover_menu_left();   
});
function hover_menu_left() {
    var bgmntop = $('ul.level1 li:eq(2)').attr("data-color");
    $(".home-main").css("background-color", bgmntop);
    $('ul.level1 li:eq(2)').find('a.navimn1').addClass('seled');
    zoomBanner('.home-banner-slider');
    var firstTime = true;
    $('.level1').menubaza({
        rowSelector: "li.araSubmenu",
        submenuDirection: "right",
        activate: function (a) {
            var attId = $(a).attr("data-id");
            var wSubmn = '200px';
            if (attId == "h1x9eDAQ") {
                wSubmn = '300px';
                $(a).children('ul.level2').addClass("big_wth");
            }
            var showc2 = $(a).attr("data-showc2");
            if (showc2 == "1") {
                if (firstTime) {
                    $(a).children('ul.level2').css({ width: '0', display: 'block' }).animate({ width: wSubmn }, 100);
                } else {
                    $(a).children('ul.level2').show();
                }
            }
            firstTime = false;
            $("li.araSubmenu").find('a').removeClass('seled');
            var bgColor = $(a).attr("data-color");
            $(".home-main").css("background-color", bgColor);
            $('.h-slider').hide();
            $("#h-slider-" + attId).show();
            $('.pdh-right').hide();
            $("#pdh-right-" + attId).show();
            zoomBanner('#h-slider-' + attId);
        },
        deactivate: function (a) {
            $(a).children('ul.level2').hide();


            //$(a).css("background-color", '#0f6caa');
            $(a).find('a').addClass("seled");
            //$(a).find('span').addClass('actvi');

            $("img.img-slide").removeClass("img-slide-hover");
        },
        exitMenu: function () {
            firstTime = true;
            $('ul.level2').hide();
            return true;
        }
    });
}
$.fn.menubaza = function (opts) {
    // Initialize menu-aim for all elements in jQuery collection
    this.each(function () {
        init.call(this, opts);
    });
    return this;
};
function init(opts) {
    var $menu = $(this),
            activeRow = null,
            mouseLocs = [],
            lastDelayLoc = null,
            timeoutId = null,
            options = $.extend({
                rowSelector: "> li",
                submenuSelector: "*",
                submenuDirection: "right",
                tolerance: 75, // bigger = more forgivey when entering submenu
                enter: $.noop,
                exit: $.noop,
                activate: $.noop,
                deactivate: $.noop,
                exitMenu: $.noop
            }, opts);
    var mouseLocsTracked = 3, // number of past mouse locations to track
            delay = 300;  // ms delay when user appears to be entering submenu
    var mousemoveDocument = function (e) {
        mouseLocs.push({ x: e.pageX, y: e.pageY });
        if (mouseLocs.length > mouseLocsTracked) {
            mouseLocs.shift();
        }
    };
    var mouseleaveMenu = function () {
        if (timeoutId) {
            clearTimeout(timeoutId);
        }
        if (options.exitMenu(this)) {
            if (activeRow) {
                options.deactivate(activeRow);
            }
            activeRow = null;
        }
    };
    var mouseenterRow = function () {
        if (timeoutId) {
            // Cancel any previous activation delays
            clearTimeout(timeoutId);
        }
        options.enter(this);
        possiblyActivate(this);
    },
        mouseleaveRow = function () {
            options.exit(this);
        };
    var clickRow = function () {
        activate(this);
    };
    var activate = function (row) {
        if (row == activeRow) {
            return;
        }
        if (activeRow) {
            options.deactivate(activeRow);
        }
        options.activate(row);
        activeRow = row;
    };
    var possiblyActivate = function (row) {
        var vDelay = activationDelay();
        if (vDelay) {
            timeoutId = setTimeout(function () {
                possiblyActivate(row);
            }, vDelay);
        } else {
            activate(row);
        }
    };
    var activationDelay = function () {
        if (!activeRow || !$(activeRow).is(options.submenuSelector)) {
            // If there is no other submenu row already active, then
            // go ahead and activate immediately.
            return 0;
        }
        var offset = $menu.offset(),
            upperLeft = {
                x: offset.left,
                y: offset.top - options.tolerance
            },
            upperRight = {
                x: offset.left + $menu.outerWidth(),
                y: upperLeft.y
            },
            lowerLeft = {
                x: offset.left,
                y: offset.top + $menu.outerHeight() + options.tolerance
            },
            lowerRight = {
                x: offset.left + $menu.outerWidth(),
                y: lowerLeft.y
            },
            loc = mouseLocs[mouseLocs.length - 1],
            prevLoc = mouseLocs[0];
        if (!loc) {
            return 0;
        }
        if (!prevLoc) {
            prevLoc = loc;
        }
        if (prevLoc.x < offset.left || prevLoc.x > lowerRight.x ||
            prevLoc.y < offset.top || prevLoc.y > lowerRight.y) {
            // If the previous mouse location was outside of the entire
            // menu's bounds, immediately activate.
            return 0;
        }
        if (lastDelayLoc &&
            loc.x == lastDelayLoc.x && loc.y == lastDelayLoc.y) {
            // If the mouse hasn't moved since the last time we checked
            // for activation status, immediately activate.
            return 0;
        }
        function slope(a, b) {
            return (b.y - a.y) / (b.x - a.x);
        };
        var decreasingCorner = upperRight,
            increasingCorner = lowerRight;
        if (options.submenuDirection == "left") {
            decreasingCorner = lowerLeft;
            increasingCorner = upperLeft;
        } else if (options.submenuDirection == "below") {
            decreasingCorner = lowerRight;
            increasingCorner = lowerLeft;
        } else if (options.submenuDirection == "above") {
            decreasingCorner = upperLeft;
            increasingCorner = upperRight;
        }
        var decreasingSlope = slope(loc, decreasingCorner),
            increasingSlope = slope(loc, increasingCorner),
            prevDecreasingSlope = slope(prevLoc, decreasingCorner),
            prevIncreasingSlope = slope(prevLoc, increasingCorner);
        if (decreasingSlope < prevDecreasingSlope &&
            increasingSlope > prevIncreasingSlope) {
            lastDelayLoc = loc;
            return delay;
        }
        lastDelayLoc = null;
        return 0;
    };
    $menu
        .mouseleave(mouseleaveMenu)
        .find(options.rowSelector)
        .mouseenter(mouseenterRow)
        .mouseleave(mouseleaveRow)
        .click(clickRow);
    //mouseleave(mouseleaveMenu).find(options.rowSelector).mouseenter(mouseenterRow).mouseleave(mouseleaveRow).click(clickRow);
    $(document).mousemove(mousemoveDocument);
};
function zoomBanner(n) {
    var nj = $(n);
    $("img.img-slide").removeClass("img-slide-hover");
    nj.find("img.img-slide").first().addClass("img-slide-hover");
}