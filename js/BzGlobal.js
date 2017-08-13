var BzGlobal = {    
    checkContainProductInCart: function (productid) {
        var pCartList = window.localStorage.getItem(appLocalStorage.keyStorageListInCart);
        if (pCartList == null) {
            return false;
        }
        var objData = JSON.parse(pCartList);
        if (objData.indexOf(productid) >= 0) {
            return true;
        } else {
            return false;
        }
    },
    ShowNumberProductInCart: function () {        
        var pListInCart = window.localStorage.getItem(appLocalStorage.keyStorageListInCart);
        if (pListInCart == null) {
            $('#m-tabstrip .icon-number-product-in-cart').text('0');
            $('.icon-number-product-in-cart').hide();
            $('.num_prd_cart').hide();
            $('.num_prd_cart2').hide();
        } else {
            var objData = JSON.parse(pListInCart);
            if (objData.length > 0) {
                $('#m-tabstrip .icon-number-product-in-cart').text(objData.length);
                $('.icon-number-product-in-cart').show();

                $('.num_prd_cart').text('(' + objData.length + ')');
                $('.num_prd_cart').show();

                $('.num_prd_cart2').text(objData.length);
                $('.num_prd_cart2').show();

            } else {
                $('.icon-number-product-in-cart').hide();
                $('.num_prd_cart').hide();
                $('.num_prd_cart2').hide();
            }
        }
    }
}