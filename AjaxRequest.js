/*
    静态 Ajax 请求
*/
function jsonpsuccessbackfunction(a,b,c,d,e,f) {}
(function() {
    window.AjaxRequest = {
        Queue: [null,],
        QueueIndex: 0,
        QueueEnable: false,
        QueueAppend: function(ajax_data) {
            var self = this;
            var index = self.QueueGetFirstMeetCriteriaIndex(0, function(item_data) {
                return item_data === null;
            });
            if (index < 0) {
                self.Queue.push(ajax_data);
            } else {
                self.Queue[index] = ajax_data;
            }
        },
        QueueGetFirstMeetCriteriaIndex: function(init_index, fun_judgmentItemData) {
            var self = this;
            for (var i = init_index; i < self.Queue.length + init_index; i++) {
                var index = i;
                if (index >= self.Queue.length) {
                    index = index - self.Queue.length;
                }
                if (fun_judgmentItemData(self.Queue[index])) {
                    return index;
                }
            }
            return -1;
        },
        QueueExecute: function() {
            var self = this;
            if (self.QueueEnable) {
                return;
            }
            var ajax_data = self.Queue[self.QueueIndex];
            if (ajax_data === null) {
                self.QueueNext();
            } else {
                self.QueueEnable = true;
                $.ajax(ajax_data);
            }
        },
        QueueNext: function() {
            var self = this;
            self.Queue[self.QueueIndex] = null;
            self.QueueEnable = false;
            var index = self.QueueGetFirstMeetCriteriaIndex(self.QueueIndex + 1, function(item_data) {
                return item_data != null;
            });
            if (index < 0) {
                return;
            }
            self.QueueIndex = index;
            self.QueueExecute();
        },
        CrossDomainGet: function(argument_config) {
            var self = this;
            var config = self.MergeConfig(argument_config);
            if (window.CheckData.IsStringNull(config.url)) {
                return;
            }
            var data = {
                url: config.url,
                type: "GET",
                data: config.data,
                dataType: "jsonp",
                async: true,
                jsonp: "callback",
                jsonpCallback: "jsonpsuccessbackfunction",
                success: function(json) {
                    config.EventSuccess(json);
                },
                error: function(XMLHttpRequest_obj, textStatus_obj, errorThrown_obj) {
                    self.ErrorResponseProcessing(XMLHttpRequest_obj, textStatus_obj, errorThrown_obj, config.EventSuccess);
                },
                complete: function(XMLHttpRequest_obj, TypeStatus) {
                    config.EventComplete(XMLHttpRequest_obj, TypeStatus, this);
                    self.QueueNext();
                },
            };
            self.QueueAppend(data);
            self.QueueExecute();
        },
        LocalRequest: function(argument_config) {
            var self = this;
            var config = self.MergeConfig(argument_config);
            if (window.CheckData.IsStringNull(config.url)) {
                return;
            }
            var data = {
                url: config.url,
                type: config.type,
                data: config.data,
                dataType: "json",
                async: config.async,
                success: function(json) {
                    config.EventSuccess(json);
                },
                error: function(XMLHttpRequest_obj, textStatus_obj, errorThrown_obj) {
                    self.ErrorResponseProcessing(XMLHttpRequest_obj, textStatus_obj, errorThrown_obj, config.EventSuccess);
                },
                complete: function(XMLHttpRequest_obj, TypeStatus) {
                    config.EventComplete(XMLHttpRequest_obj, TypeStatus, this);
                    if (this.async) {
                        self.QueueNext();
                    }
                },
            };
            if (config.async) {
                self.QueueAppend(data);
                self.QueueExecute();
            } else {
                $.ajax(data);
            }
        },
        LocalGet: function(argument_config) {
            var self = this;
            self.LocalRequest($.extend({
                type: "GET",
            }, argument_config));
        },
        LocalPost: function(argument_config) {
            self.LocalRequest($.extend({
                type: "POST",
            }, argument_config));
        },
        MergeConfig: function(argument_config) {
            var self = this;
            var def_conf = {
                url: '',
                data: {},
                async: true,
                EventSuccess: function(json) {},
                EventComplete: function(XMLHttpRequest_obj, TypeStatus, complete_this) {
                    console.log('Ajax Request Complete: ', complete_this.url);
                },
            };
            var config = $.extend(def_conf, argument_config);
            return config;
        },
        ErrorResponseProcessing: function(XMLHttpRequest_obj, textStatus_obj, errorThrown_obj, SuccessEXEMethod) {
            var self = this;
            if (window.CheckData.IsObjectNull(SuccessEXEMethod) || !self.IsSuccessRequest(XMLHttpRequest_obj)) {
                self.PrintErrorInfoObject(XMLHttpRequest_obj, textStatus_obj, errorThrown_obj);
                return;
            }
            var sjson = XMLHttpRequest_obj.responseText;
            if (window.CheckData.IsStringNull(sjson)) {
                self.PrintErrorInfoObject(XMLHttpRequest_obj, textStatus_obj, errorThrown_obj);
            } else {
                self.ParseSJSONExeSuccessMethod(sjson, SuccessEXEMethod);
            }
        },
        ParseSJSONExeSuccessMethod: function(sjson, successMethod) {
            var self = this;
            var json = {};
            try {
                json = window.JSON.parse(sjson);
            } catch(ex) {
                console.log('parse json Error:', json, '\tex:', ex);
                json = {
                    'Status': 0,
                    'Msg': '错误内容!',
                    'Url': '',
                    'Result': {},
                };
            }
            successMethod(json);
        },
        IsSuccessRequest: function(XMLHttpRequest_obj) {
            /* XMLHttpRequest 对象属性值参照地址: http://www.w3school.com.cn/xmldom/dom_http.asp */
            return XMLHttpRequest_obj.status == 200 || XMLHttpRequest_obj.readyState == 4;
        },
        PrintErrorInfoObject: function(XMLHttpRequest_obj, textStatus_obj, errorThrown_obj) {
            console.log('class.AjaxRequest (Error Request Response Result):');
            console.log('XMLHttpRequest:', XMLHttpRequest_obj, 'textStatus:', textStatus_obj, 'errorThrown:', errorThrown_obj);
        }
    };
})();
