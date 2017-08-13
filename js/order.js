var orderItems = new Array();
var pttvl;
var order = {
    bindEventTapToOrder: function (odType) {
        $('.ohn-buttion').on('click', function () {
            window.location.href = '/';
        });
        $('#m-order .o-buy').on('click', function(e) {
            $('.city-code').attr('disabled', 'disabled');
            //$('.city-code').hide();
            var flag = true;
            // validate input ----------------------------------
            var mobilePhone = $('#mobilephone').val();
            var address = $('#address').val();
            var fullName = $('#fullname').val();

            if (fullName == '') {
                alert('Bạn cần nhập họ và tên!');
                flag = false;
            } else if (mobilePhone.length == 0) {
                alert('Bạn cần nhập số di động liên hệ!');
                flag = false;
            } else if (address == '') {
                alert('Bạn cần nhập địa chỉ liên hệ!');
                flag = false;
            } else {
                $('.o-bg-transparent-white').show();
                $('.o-loading').show();
            }
            $('.city-code').removeAttr('disabled');
            $('.city-code').show();
            if (flag) {
                var vlogonid = bzAcc.getUserInfo.LogonId();
                var imeiCode = window.localStorage.getItem('imeiCode');
                var cpcode = window.localStorage.getItem('cpcode');
                if (imeiCode == null)
                    imeiCode = $('#ipimei').val();
                var fullname = $('#fullname').val();
                var mobiphone = $('#mobilephone').val();
                var vaddress = $('#address').val();
                var email = $('#email').val();
                var note = $('#note').val();
                var province = $('#CityCode').val();
                var shippingCost = 0;
                var discountValue = 0;
                var totalMoney = 0;
                var subTotalMoney = 0;
                var orderNumber = 0;
                var source = {
                    'LogonId': vlogonid,
                    'OrderItems': orderItems,
                    'Fullname': fullname,
                    'Mobiphone': mobiphone,
                    'Address': address,
                    'Email': email,
                    'Note': note,
                    'Province': province,
                    'ShippingCost': '0',
                    'DiscountValue': '0',
                    'TotalMoney': '0',
                    'SubTotalMoney': '0',
                    'OrderNumber': '0',
                    'Imei': imeiCode,
                    'CouponCode': cpcode,
                    'op': 'Order'
                };

                var vorderItems = JSON.stringify(orderItems);
                // Save customer info into localstorage ---------------
                var customerInfo = {
                    'Fullname': $('#fullname').val(),
                    'Mobiphone': $('#mobilephone').val(),
                    'Address': $('#address').val(),
                    'Email': $('#email').val(),
                    'Province': $('#CityCode').val(),
                };
                appLocalStorage.saveCustomerInfoOrder(customerInfo);
                jQuery.ajax({
                    url: "/Handler/OrderBz.ashx",
                    //url: "api/order/PostWap",
                    dataType: "json",
                    type: "POST",
                    //data: JSON.stringify(source),
                    data: {
                        op: 'Order',
                        logonId: vlogonid,
                        vorderItems: vorderItems,
                        fullname: fullname,
                        mobiphone: mobiphone,
                        address: vaddress,
                        email: email,
                        note: note,
                        province: province,
                        shippingCost: shippingCost,
                        discountValue: discountValue,
                        totalMoney: totalMoney,
                        subTotalMoney: subTotalMoney,
                        orderNumber: orderNumber,
                        Imei: imeiCode,
                        CouponCode: cpcode
                    },
                    beforeSend: function() {
                        $('.o-bg-transparent-white').show();
                        $('.o-loading').show();
                    },
                    success: function(data) {
                        if (data.TypeMsg == 1) {
                            var orderInfo = JSON.parse(data.Data);
                            if (odType == 1) {
                                window.localStorage.removeItem(appLocalStorage.keyStorageListInCart);
                                $('.icon-number-product-in-cart').text('0');
                            }
                            window.localStorage.setItem('imeiCode', orderInfo.Imei);
                            window.localStorage.removeItem('cpcode');
                            window.location = '/checkout/complete/' + orderInfo.OrderId;
                        } else {
                            alert(data.Msg);
                        }
                    },
                    error: function(error) {
                        $('.o-bg-transparent-white').hide();
                        $('.o-loading').hide();
                        alert('Lỗi kết nối. Vui lòng thử lại!');
                        //alert(error.responseText);
                    },
                    complete: function() {
                        $('.o-bg-transparent-white').hide();
                        $('.o-loading').hide();
                    }
                });
            }
            return false;
        });
    },
    getTotalMoneyBuyNow: function (data, soluong) {
        var totalMoney = 0;
        if (data == null) return 0;
        for (var i = 0; i < data.length; i++) {
            //var soluong = appLocalStorage.GetNumProductToCart(data[i].Id);
            var sellPrice = parseInt(common.replaceDotAndVND(data[i].SellPrice));
            if (sellPrice > 0) {
                totalMoney += sellPrice * soluong;
            }
            else {
                totalMoney += parseInt(common.replaceDotAndVND(data[i].ListedPrice)) * soluong;
            }
        }
        return totalMoney;
    },
    getTotalMoneyForCart: function (data) {
        var totalMoney = 0;
        if (data == null) return 0;
        for (var i = 0; i < data.length; i++) {
            var soluong = appLocalStorage.GetNumProductToCart(data[i].Id);
            var sellPrice = parseInt(common.replaceDotAndVND(data[i].SellPrice));
            if (sellPrice > 0) {
                totalMoney += sellPrice * soluong;
            }
            else {
                totalMoney += parseInt(common.replaceDotAndVND(data[i].ListedPrice)) * soluong;
            }
        }
        return totalMoney;
    },
    checkOnlyInputNumber: function (event1) {
        $('#mobilephone').on('keypress', function (event) {
            var charCode = (event.which) ? event.which : event.keyCode;
            //alert(charCode);
            if (parseInt(charCode) < 48 || parseInt(charCode) > 57) {
                //alert('Bạn chỉ nhập số từ 0 -> 9, không nhập kí tự A -> Z, khoảng trắng và các kí tự đặc biệt!');
                var inputValue = $('#mobilephone').val();
                inputValue = inputValue.replace(/[^0-9]/g, '');
                $('#mobilephone').val(inputValue);
                return false;
            }
            return true;
        });
        //$('#mobilephone').number(true, 0);
    },
    clearCouponCode: function () {
        $('#btnDelCouponCode').hide();
        $('#btnSubmitCouponCode').show();
        $('.cp-stt-msg').text('');
        $('#txtCouponCode').val('');
        var cdvl = $('#cp-value').text();
        var vpttoan = $('#phaithanhtoan').text();
        var pttoanNum = common.replaceDotAndVND(vpttoan);
        if (cdvl == '0đ') {
            $('#phaithanhtoan').text(format("#.##0,####", pttoanNum) + 'đ');
        } else {
            $('#phaithanhtoan').text(format("#.##0,####", pttoanNum + order.discountValue) + 'đ');
        }        
        window.localStorage.removeItem('cpcode');
        $('#cp-Code').text('');
        $('#cp-des').text('');
        $('#cp-msg-ch').text('');
        $('#cp-value').text('0đ');
        order.discountValue = 0;
        return true;
    },
    checkCouponCode: function (typecheck) {
        var cpcode = window.localStorage.getItem('cpcode');
        if (cpcode != null) {
            $('#txtCouponCode').val(cpcode);
        }
        var logonid = bzAcc.getUserInfo.LogonId();
        var imei = window.localStorage.getItem('imeiCode');
        if (imei == null)
            imei = $('#ipimei').val();
        var couponcode = $('#txtCouponCode').val();
        var vphaithanhtoan = $('#phaithanhtoan').text();
        pttvl = vphaithanhtoan;
        var phaithanhtoanNum = common.replaceDotAndVND(vphaithanhtoan);
        var orderValue = phaithanhtoanNum;
        if (couponcode == '' && typecheck == 1) {
            $('#cp-msg-ch').text('Bạn chưa nhập mã giảm giá');
            return false;
        } else if (couponcode == '' && typecheck == 0) {
            return false;
        }                 
        $.getJSON(domain + 'api/coupon/check?logonid=' + logonid + '&imei=' + imei + '&couponcode=' + couponcode + '&orderValue=' + orderValue, function (data) {
            if (data) {
                if (data.IsValid) {
                    $('.cp-stt-msg').text('[Ok]');
                    $('#btnSubmitCouponCode').hide();
                    $('#btnDelCouponCode').show();
                    $('#cp-Code').text('[Coupon ' + data.Code + ']');
                    $('#cp-des').text(data.Description);
                    $('#cp-value').text('- ' + data.Value);
                    window.localStorage.setItem('cpcode', couponcode);
                    window.localStorage.setItem('imeiCode', imei);
                    $('.cp-stt-msg').css("color", "#35a844");
                    var couponValNum = common.replaceDotAndVND(data.Value);
                    order.discountValue = couponValNum;                    
                    $('#phaithanhtoan').text(format("#.##0,####", phaithanhtoanNum - couponValNum) + 'đ');                                       
                    $('#hdCouponCode').val(couponcode);
                    $('#cp-msg-ch').text('');
                }
                else {
                    $('.cp-stt-msg').css("color", "#ff0101");
                    $('.cp-stt-msg').text('[Lỗi]');
                    $('#cp-msg-ch').text(data.Message).fadeOut(300).fadeIn(300, function () { });
                    if (typecheck == 0) {
                        $('#cp-value').text('0đ');
                        $('#btnSubmitCouponCode').hide();
                        $('#btnDelCouponCode').show();
                    }
                }
            }
        });
        return true;
    },
    loadCustomerInfoOrder: function () {
        var customerInfo = appLocalStorage.getCustomerInfoOrder();
        if (customerInfo != null && customerInfo != '') {
            $('#fullname').val(customerInfo.Fullname);
            $('#mobilephone').val(customerInfo.Mobiphone);
            $('#address').val(customerInfo.Address);
            $('#email').val(customerInfo.Email);
            $('#CityCode option[value=' + customerInfo.Province + ']').attr('selected', 'selected');
        }
    },
    discountInfo: '',
    discountValue: 0,
    freeshipInfo: ''
}