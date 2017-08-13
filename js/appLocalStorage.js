var appLocalStorage = {
    // --------- product like -------------------------------------
    keyProductLike: 'productlikelist',
    addProductLiked: function(productid) {
        var pLikedList = window.localStorage.getItem(appLocalStorage.keyProductLike);
        if (pLikedList == null) {
            pLikedList = new Array();
            pLikedList.push(productid);
            var data = JSON.stringify(pLikedList);
            window.localStorage.setItem(appLocalStorage.keyProductLike, data);
        } else {
            var jsData = JSON.parse(pLikedList);
            if (jsData.indexOf(productid) < 0) {
                jsData.push(productid);
                var jsonData = JSON.stringify(jsData);
                window.localStorage.setItem(appLocalStorage.keyProductLike, jsonData);
            }
        }
    },
    removeProductLiked: function(productid) {
        var pLikedList = appLocalStorage.getObjProductLiked();
        if (pLikedList != null) {
            var jsData = JSON.parse(pLikedList);

            var index = jsData.indexOf(productid);
            if (index >= 0) {
                jsData.splice(index, 1);
                var jsonData = JSON.stringify(jsData);
                window.localStorage.setItem(appLocalStorage.keyProductLike, jsonData);
            }
        }
    },
    checkProductLiked: function(productid) {        
        var pLikedList = window.localStorage.getItem(appLocalStorage.keyProductLike);
        if (pLikedList == null) {
            return false;
        } else {
            var jsData = JSON.parse(pLikedList);
            if (jsData.indexOf(productid) >= 0) {
                return true;
            }
            return false;
        }
    },
    getTop20ProductLiked: function() {
        var productLiked = this.getObjProductLiked();
        if (productLiked == null) {
            return '';
        } else {
            var str = '';
            var jsData = JSON.parse(productLiked);
            for (var i = 0; i < jsData.length; i++) {
                str += jsData[i] + ',';
            }
            return str;
        }
    },
    getObjProductLiked: function() {
        var productLiked = window.localStorage.getItem(appLocalStorage.keyProductLike);
        return productLiked;
    },

    // ---------- Shopping cart add --------------------------------
    addProductToCart: function (productid) {
        var pCartList = window.localStorage.getItem(appLocalStorage.keyStorageListInCart);
        if (pCartList == null) {
            pCartList = new Array();
            pCartList.push(productid);
            var data = JSON.stringify(pCartList);
            window.localStorage.setItem(appLocalStorage.keyStorageListInCart, data);
        } else {
            var jsData = JSON.parse(pCartList);
            if (jsData.indexOf(productid) < 0) {
                jsData.push(productid);
                var jsonData = JSON.stringify(jsData);
                window.localStorage.setItem(appLocalStorage.keyStorageListInCart, jsonData);
            }
        }
    },
    removeProductToCart: function(productid) {
        var pListInCart = window.localStorage.getItem(appLocalStorage.keyStorageListInCart);
        if (pListInCart != null) {
            // check productid exist in shoppingCart -----------------------------------
            var jsData = JSON.parse(pListInCart);
            var index = jsData.indexOf(productid);
            if (index >= 0) {
                jsData.splice(index, 1);
                var jsonData = JSON.stringify(jsData);
                window.localStorage.setItem(appLocalStorage.keyStorageListInCart, jsonData);
            }
        }
    },
    addNumProductToCart: function (productid, numP) {
        var pCartList = window.localStorage.getItem(appLocalStorage.keyStorageListPNumInCart);
        if (pCartList == null) {
            pCartList = new Array();
            pCartList.push(productid + '-' + (parseInt(numP) + 1));
            var data = JSON.stringify(pCartList);
            window.localStorage.setItem(appLocalStorage.keyStorageListPNumInCart, data);
        } else {
            var jsData = JSON.parse(pCartList);
            var index = jsData.indexOf(productid + '-' + numP);
            if (index >= 0) {
                jsData.splice(index, 1);
                jsData.push(productid + '-' + (parseInt(numP) + 1));
                var jsonData = JSON.stringify(jsData);
                window.localStorage.setItem(appLocalStorage.keyStorageListPNumInCart, jsonData);
            } else {
                jsData.push(productid + '-' + (parseInt(numP) + 1));
                var jsonData2 = JSON.stringify(jsData);
                window.localStorage.setItem(appLocalStorage.keyStorageListPNumInCart, jsonData2);
            }
        }
    },
    DecNumProductToCart: function (productid, numP) {
        var pCartList = window.localStorage.getItem(appLocalStorage.keyStorageListPNumInCart);
        if (pCartList == null) {
            pCartList = new Array();
            pCartList.push(productid + '-' + (parseInt(numP) - 1));
            var data = JSON.stringify(pCartList);
            window.localStorage.setItem(appLocalStorage.keyStorageListPNumInCart, data);
        } else {
            var jsData = JSON.parse(pCartList);
            var index = jsData.indexOf(productid + '-' + numP);
            if (index >= 0) {
                jsData.splice(index, 1);
                jsData.push(productid + '-' + (parseInt(numP) - 1));
                var jsonData = JSON.stringify(jsData);
                window.localStorage.setItem(appLocalStorage.keyStorageListPNumInCart, jsonData);
            } else {
                jsData.push(productid + '-' + (parseInt(numP) - 1));
                var jsonData2 = JSON.stringify(jsData);
                window.localStorage.setItem(appLocalStorage.keyStorageListPNumInCart, jsonData2);
            }
        }
    },
    DeleteNumProductToCart: function (productid, numP) {
        var pCartList = window.localStorage.getItem(appLocalStorage.keyStorageListPNumInCart);
        if (pCartList != null) {
            var jsData = JSON.parse(pCartList);
            var index = jsData.indexOf(productid + '-' + numP);
            if (index >= 0) {
                jsData.splice(index, 1);               
                var jsonData = JSON.stringify(jsData);
                window.localStorage.setItem(appLocalStorage.keyStorageListPNumInCart, jsonData);
            }
        }
    },
    GetNumProductToCart: function (productid) {
        var nStr = 1;
        var pCartList = window.localStorage.getItem(appLocalStorage.keyStorageListPNumInCart);
        if (pCartList == null) {
            return nStr;
        } else {            
            var jsData = JSON.parse(pCartList);
            for (var i = 0; i < jsData.length; i++) {
                var numObj = jsData[i].split('-');
                if (numObj[0] == productid) {
                    nStr = numObj[1];
                }
            }
            return nStr;
        }
    },
    keyStorageListInCart: 'productListInCart',
    keyStorageListPNumInCart: 'productListPNumInCart',
    getQuantityInCart: function() {
        var pListInCart = window.localStorage.getItem(appLocalStorage.keyStorageListInCart);
        if (pListInCart != null) {
            // check productid exist in shoppingCart -----------------------------------
            var jsData = JSON.parse(pListInCart);
            return jsData.length;
        } else {
            return 0;
        }
    },
    listProductIdFromLocalStorage: function () {
        var pListInCart = window.localStorage.getItem(appLocalStorage.keyStorageListInCart);
        if (pListInCart == null) {
            return '';
        }
        else {
            var str = '';
            var objData = JSON.parse(pListInCart);
            for (var i = 0; i < objData.length; i++) {
                str += objData[i] + ',';
            }
            return str;
        }
    },
    //----------- ProductListViewed -------------------
    keySavePidInStorage: 'pidListInStorage',
    getProductIdListViewedInStorage: function (maxCount) {
        var pidList = window.localStorage.getItem(appLocalStorage.keySavePidInStorage);
        if (typeof pidList === 'undefined' || pidList == null) return '';

        var jsObj = JSON.parse(pidList);

        if (jsObj == null) return '';
        var str = '';
        var count = 0;
        for (var i = jsObj.length - 1; i >= 0; i--) {
            if (count < maxCount)
                str += jsObj[i] + ',';
            count++;
        }
        return str;
    },
    addProductIdInLocalStorage: function (productid) {
        var pidList = window.localStorage.getItem(appLocalStorage.keySavePidInStorage);
        if (pidList == null) {
            pidList = new Array();
            pidList.push(productid);
            var jsonObj = JSON.stringify(pidList);
            window.localStorage.setItem(appLocalStorage.keySavePidInStorage, jsonObj);
        } else {
            var jsObj = JSON.parse(pidList);
            var index = jsObj.indexOf(productid);
            if (index < 0) {
                jsObj.push(productid);
            }
            var jsonObjOne = JSON.stringify(jsObj);
            window.localStorage.setItem(appLocalStorage.keySavePidInStorage, jsonObjOne);
        }
    },
    //----------- Thong tin khach hang -----------------------------
    keyCustomerInfo: 'customerInfo',
    saveCustomerInfoOrder: function(customerInfo) {
        var jsonData = JSON.stringify(customerInfo);
        window.localStorage.setItem(appLocalStorage.keyCustomerInfo, jsonData);
    },
    getCustomerInfoOrder: function() {
        var customerInfo = window.localStorage.getItem(appLocalStorage.keyCustomerInfo);
        if (customerInfo != null) {
            var jsData = JSON.parse(customerInfo);
            return jsData;
        } else {
            return '';
        }
    }
}