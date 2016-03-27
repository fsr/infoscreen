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

    self.basepath = "./"; //"127.0.0.1:5000/";
    self.postfix = ".json"; //"";

    self.newsRefreshTime = 2000; //600000;   // all 10min
    self.mealsRefreshTime = 6000000; // all 100min
    self.busRefreshTime = 60000; // evr min
    self.postillionRefreshTime = 600000; // all 10min

    self.fadeTime = 600;

    self.init();
};

InfoScreenManager.prototype = {
    constructor: InfoScreen,

    init: function () {
        'use strict';
        var self = this;

        self.request("news" + self.postfix, self.refreshNews);
        setInterval(function () {
            self.request("news" + self.postfix, self.refreshNews);
        }, self.newsRefreshTime);
        self.request("meals" + self.postfix, self.refreshMensa);
        setInterval(function () {
            self.request("meals" + self.postfix, self.refreshMensa);
        }, self.mealsRefreshTime);
        self.request("stops" + self.postfix, self.refreshBus);
        setInterval(function () {
            self.request("stops" + self.postfix, self.refreshBus);
        }, self.busRefreshTime);
        self.request("postillion" + self.postfix, self.refreshPostillion);
        setInterval(function () {
            self.request("postillion" + self.postfix, self.refreshPostillion);
        }, self.postillionRefreshTime);

    },
    request: function (ressource, callback) {
        'use strict';
        var self = this;

        $.ajax({
            type: "GET",
            url: self.basepath + ressource
        }).done(function (e) {
            callback(e, self);
        }).fail(function (e) {
            console.log("Could not load " + ressource + " [" + e.error_description + "]");

        });
    },
    refreshNews: function (response, self) {
        'use strict';

        console.log(response, self);
        if (response !== undefined) {
            if ($("#news").html() !== response) {
                $("#news").fadeOut(self.fadeTime, function () {
                    $("#news").html(response);
                    $("#news").fadeIn(self.fadeTime);
                });
            }
        }
    },
    refreshMensa: function (response, self) {
        'use strict';

    },
    refreshWeather: function (response, self) {
        'use strict';

    },
    refreshPostillion: function (response, self) {
        'use strict';

    },
    refreshBus: function (response, self) {
        'use strict';

    }
};