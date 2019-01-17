/* eslint-disable */
LoadingShare();

//*************浏览量统计BEGIN****************
function PlusNums(ProjectCode) {
    if ($.cookie("RVCode") == null) {
        $.cookie("RVCode", new Date().getTime())
    }

    $.ajax({
        type: "get",
        async: false,
        url: "https:/wb.jaas.ac.cn/CommonJS/CommonHelper.aspx",
        data: { "Method": "PlusNums", "ProjectCode": ProjectCode, "UVCode": $.cookie("RVCode") },
        dataType: "jsonp", //跨域问题
        jsonp: "callbackparam", //服务端用于接收callback调用的function名的参数
        jsonpCallback: "success_jsonpCallback", //callback的function名称
        success: function (json) { },
        error: function (XMLHttpRequest, textStatus, errorThrown) { }
    });
}

function PlusRV(ProjectCode, Status) {
    $.ajax({
        type: "get",
        async: false,
        url: "https:/wb.jaas.ac.cn/CommonJS/CommonHelper.aspx",
        data: { "Method": "PlusRV", "ProjectCode": ProjectCode, "Status": Status, "UVCode": $.cookie("RVCode") },
        dataType: "jsonp", //跨域问题
        jsonp: "callbackparam", //服务端用于接收callback调用的function名的参数
        jsonpCallback: "success_jsonpCallback", //callback的function名称
        success: function (json) { },
        error: function (XMLHttpRequest, textStatus, errorThrown) { }
    });
}

function ShareCount(openid) {
    $.post("CommonHelper.ashx?Method=ShareCount", { 'OpenID': openid },
    function (result) {
    });
}
//*************浏览量统计END****************


//**************自定义分享BEGIN*************
function Share(Title, Link, Icon, desc, ProjectCode,openid) {
    var ShareInfo = {
        Title: Title,
        Link: Link,
        Icon: Icon,
        desc: desc
    };

    wx.ready(function () {
        wx.onMenuShareTimeline({
            title: ShareInfo.Title, // 分享标题
            link: ShareInfo.Link, // 分享链接
            imgUrl: ShareInfo.Icon, // 分享图标
            success: function () {
                //分享朋友圈
                PlusRV(ProjectCode, "1")
                ShareCount(openid);
            },
            cancel: function () {
                // 用户取消分享后执行的回调函数
            }
        });

        wx.onMenuShareAppMessage({
            title: ShareInfo.Title, // 分享标题
            desc: ShareInfo.desc, // 分享描述
            link: ShareInfo.Link, // 分享链接
            imgUrl: ShareInfo.Icon, // 分享图标
            type: '', // 分享类型,music、video或link，不填默认为link
            dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
            success: function () {
                //分享个人
                PlusRV(ProjectCode, "0")
                ShareCount(openid);
            },
            cancel: function () {
                // 用户取消分享后执行的回调函数
            }
        });
    });
}
//**************自定义分享END***************

//*************通用方法BEGIN****************
function Go(qs, snsapi, test) {

        _url = encodeURIComponent("http://web.v-ishare.com/ShuiLi.S.190115/index.html");



        snsapi = "snsapi_userinfo";

    if (!test) {
        window.location.href = "https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx3049ee99e77e1007&redirect_uri=" + _url + "&response_type=code&scope=" + snsapi + "&state=123#wechat_redirect";
    }
}

function LoadingShare() {
    $.post("http://web.v-ishare.com/JSSDK.ashx?Method=GetJSApi_Ticket", { "Url": location.href.split('#')[0] },
        function (result) {
            var model = JSON.parse(result);
            wx.config({
                debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                appId: model.appid, // 必填，公众号的唯一标识
                timestamp: model.timestamp, // 必填，生成签名的时间戳
                nonceStr: model.noncestr, // 必填，生成签名的随机串
                signature: model.signature, // 必填，签名，见附录1
                jsApiList: ["onMenuShareTimeline", "onMenuShareAppMessage", "hideMenuItems", "hideOptionMenu", "hideAllNonBaseMenuItem", "startRecord", "stopRecord", "uploadVoice", "playVoice", "downloadVoice", "onVoicePlayEnd", "getLocation", "translateVoice", "closeWindow"] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
            });
        });

    // Share("请调用Share()方法", "http://wb.jaas.ac.cn/page/WangBo.F.160316/page.html", "", "请调用Share()方法");
}

//获取页面传值
function GetQueryString(name) {
    var regex = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(regex);
    if (r != null) return unescape(r[2]);
    return null;
}

//验证姓名电话以及扩展项
function CheckDateNew(Phone, Name, Ex1, Msg1, Ex2, Msg2, Ex3, Msg3) {
    if (Name == "") {
        alert("请输入姓名！")
        return false;
    }

    if (!(/^1[3|4|5|7|8][0-9]\d{4,8}$/.test(Phone)) || Phone.length != 11) {
        alert("电话格式不正确")
        return false;
    }

    if (Ex1 == "") {
        alert(Msg1);
        return false;
    }

    if (Ex2 == "") {
        alert(Msg2);
        return false;
    }

    if (Ex3 == "") {
        alert(Msg3);
        return false;
    }

    return true;
}
//*************通用方法END****************