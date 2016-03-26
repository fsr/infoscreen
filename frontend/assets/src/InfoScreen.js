/*\
|*| InfoScreen Front-End
|*|
|*| ask: lars@ifsr.de
\*/

var console = window.console;
/*jslint browser: true*/
/*globals $, InfoScreenManager*/

function InfoScreen() {
    'use strict';
    var screen = new InfoScreenManager();
}

// loads new Apps
var InfoScreenManager = function () {
    'use strict';
    var self = this;

    $(document).bind('contextmenu', function (e) {
        e.preventDefault();
    });
    
    self.basepath = "127.0.0.1:5000/";
    
    self.newsRefreshTime        = 600000;   // all 10min
    self.mealsRefreshTime       = 6000000;  // all 100min
    self.busRefreshTime         = 60000;    // evr min
    self.postillionRefreshTime  = 600000;  // all 10min

    self.init();
};

InfoScreenManager.prototype = {
    constructor: InfoScreen,

    init: function () {
        'use strict';
        var self = this;
        
        setInterval(self.request("news", self.refreshNews), self.newsRefreshTime);        
        setInterval(self.request("meals", self.refreshMensa), self.mealsRefreshTime);
        setInterval(self.request("bus", self.refreshBus), self.busRefreshTime);
        setInterval(self.request("postillion", self.refreshPostillion), self.postillionRefreshTime);

    },
    request: function (ressource, callback) {
        'use strict';
        var self = this;

        $.ajax({
            type: "GET",
            url: self.basepath + ressource
        })
            .done(function(e) {
                callback.call($(e));
            }).fail(function(e) {
                console.log("Could not load" + ressource + "[" + e.error_description + "]");
                
            });
    },
    refreshNews: function (response) {
        'use strict';
        var self = this;
        
        if(response.find("news")) {
            $("#news").html(response.find("news").text());
        }
    },
    refreshMensa: function (response) {
        'use strict';
        var self = this;

    },
    refreshWeather: function (response) {
        'use strict';
        var self = this;

    },
    refreshPostillion: function (response) {
        'use strict';
        var self = this;

    },
    refreshBus: function (response) {
        'use strict';
        var self = this;

    }
};
