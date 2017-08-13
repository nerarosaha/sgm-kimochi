var bzAcc = {
    isUserLogged: function () {
        var bzToken = getCookie(bzAcc.cTokenName);
        if (bzToken != "") {
            return true;
        } else {
            return false;
        }
    },
    getUserInfo: {
        LogonId: function () {
            if (getCookie(bzAcc.cLogonId) != "")
                return getCookie(bzAcc.cLogonId);
            return '';
        },
        Token: function () {
            if (getCookie(bzAcc.cTokenName) != "")
                return getCookie(bzAcc.cTokenName);
            return '';
        }
    },
    cTokenName: 'bzToken',
    cLogonId: 'bzLogonId'
}