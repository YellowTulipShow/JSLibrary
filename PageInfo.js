/*
    静态 页面信息
*/
(function() {
    window.PageInfo = {
        Width: function () {
            if (window.innerWidth) {
                return window.innerWidth;
            }
            if ((document.body) && (document.body.clientWidth)) {
                return document.body.clientWidth;
            }
            if (document.documentElement && document.documentElement.clientWidth) {
                return document.documentElement.clientWidth;
            }
            return 0;
        },
        Height: function () {
            if (window.innerHeight) {
                return window.innerHeight;
            }
            if ((document.body) && (document.body.clientHeight)) {
                return document.body.clientHeight;
            }
            if (document.documentElement && document.documentElement.clientHeight) {
                return document.documentElement.clientHeight;
            }
            return 0;
        },
        QueryString: function(name, location_search_string) {
            if (window.CheckData.IsStringNull(location_search_string)) {
                location_search_string = window.location.search;
            }
            var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
            var r = location_search_string.substr(1).match(reg);
            return r != null ? decodeURI(r[2]) : null;
        },
        RenderingHTML: function(jqElement, jsonobj) {
            // 功能: 渲染生成 HTML
            // 参考学习:
            // http://www.thinkphp.cn/code/1901.html
            // http://www.cnblogs.com/lori/archive/2012/08/31/2665802.html
            //i g m是指分别用于指定区分大小写的匹配、全局匹配和多行匹配。
            var reg = new RegExp("\\[([^\\[\\]]*?)\\]", 'igm');
            jqElement = $(jqElement)[0];
            var html = jqElement.innerHTML;
            var source = html.replace(reg, function (node, key) {
                return jsonobj[key];
            });
            return source;
        },
        BorwserType: function () {
            // 智能机浏览器版本信息:
            var browser = {
                versions: function () {
                    var u = window.navigator.userAgent;
                    var app = window.navigator.appVersion;
                    //移动终端浏览器版本信息
                    return {
                        trident: u.indexOf('Trident') > -1, //IE内核
                        presto: u.indexOf('Presto') > -1, //opera内核
                        webKit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核
                        gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1, //火狐内核
                        mobile: !!u.match(/AppleWebKit.*Mobile.*/) || !!u.match(/AppleWebKit/), //是否为移动终端
                        ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
                        android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, //android终端或者uc浏览器
                        iPhone: u.indexOf('iPhone') > -1 || u.indexOf('Mac') > -1, //是否为iPhone或者QQHD浏览器
                        iPad: u.indexOf('iPad') > -1, //是否iPad
                        webApp: u.indexOf('Safari') == -1, //是否web应该程序，没有头部与底部
                        wechatbrowser: u.toLowerCase().match(/MicroMessenger/i) == 'micromessenger', // 是否微信浏览器
                    };
                }(),
                language: (navigator.browserLanguage || navigator.language).toLowerCase()
            }
            if (browser.versions.mobile ||
                browser.versions.android ||
                browser.versions.iPhone ||
                browser.versions.iPad) {
                return "Mobile";
            } else {
                return "PC";
            }
        },
        BorwserVersion: function () {
            var u = window.navigator.userAgent;
            var uStr = u.toString();
            var uStr_lower = uStr.toLowerCase();

            if (uStr_lower.indexOf('micromessenger') >= 0) {
                return 'WeChatBrowser';
            }
            if (uStr_lower.indexOf('baidubrowser') >= 0) {
                return 'BaiduBrowser';
            }
            if (uStr_lower.indexOf('baiduboxapp') >= 0) {
                return 'BaiduBoxApp';
            }
            return "Unrecognized"; // 无法识别
        },
    };
})();
