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
    self.postillonRefreshTime = 600000; // all 10min

    self.postillonTicker = [];
    self.postillonAmount = 3;
    self.postillonDisplayedIDs = [];
    self.postillonTickerTime = 1000;

    self.fadeTime = 600;

    self.init();
};

InfoScreenManager.prototype = {
    constructor: InfoScreen,

    init: function () {
        'use strict';
        var self = this;

        self.request("news", self.refreshNews);
        setInterval(function () {
            self.request("news", self.refreshNews);
        }, self.newsRefreshTime);
        self.request("meals", self.refreshMensa);
        setInterval(function () {
            self.request("meals", self.refreshMensa);
        }, self.mealsRefreshTime);
        self.request("stops", self.refreshBus);
        setInterval(function () {
            self.request("stops", self.refreshBus);
        }, self.busRefreshTime);
        self.request("postillon", self.refreshPostillon);
        setInterval(function () {
            self.request("postillon", self.refreshPostillon);
        }, self.postillonRefreshTime);

        setInterval(function () {
            self.updatePostillon();
        }, self.postillonTickerTime);
    },
    request: function (ressource, callback) {
        'use strict';
        var self = this;

        $.ajax({
            type: "GET",
            url: self.basepath + ressource + self.postfix
        }).done(function (e) {
            if (e !== undefined) {
                callback(e, self);
            }
        }).fail(function (e) {
            console.log("Could not load " + ressource + " [" + e.error_description + "]");
        });
    },
    replace: function (elem, html, self) {
        'use strict';

        if (html !== undefined && elem !== undefined) {
            if (elem.html() !== html) {
                elem.fadeOut(self.fadeTime, function () {
                    elem.html(html);
                    elem.fadeIn(self.fadeTime);
                });
            }
        }
    },
    refreshNews: function (response, self) {
        'use strict';
        var elem = $("#news > article");

        self.replace(elem, response, self);

    },
    refreshMensa: function (response, self) {
        'use strict';
        var r, n, html, elem = $("#mensa > article");

        html = "";

        for (r in response) {
            if (response.hasOwnProperty(r)) {
                html += "<p>" + r.name + "</p>";
                html += "<p>" + r.price + "</p>";
                html += "<p>";
                for (n in r.notes) {
                    if (r.notes.hasOwnProperty(n)) {
                        switch (n) {
                        case "knoblauch":
                            html += "k ";
                            break;
                        case "vegetarisch":
                            html += "v ";
                            break;
                        case "vegan":
                            html += "v ";
                            break;
                        case "schwein":
                            html += "s ";
                            break;
                        case "rind":
                            html += "r ";
                            break;
                        case "alkohol":
                            html += "a ";
                            break;
                        }
                    }
                }
                html += "</p>";
            }
        }
    },
    refreshWeather: function (response, self) {
        'use strict';

    },
    refreshPostillon: function (response, self) {
        'use strict';

        self.postillonTicker = response;

    },
    refreshBus: function (response, self) {
        'use strict';

    },
    updatePostillon: function () {
        'use strict';
        var amount, nextID, html, self = this;

        if (self.postillonTicker.length > 0) {
            amount = Math.min(self.postillonAmount, self.postillonTicker.length);
            if (amount === 0) {
                return;
            }
            nextID = 0;
            if (self.postillonDisplayedIDs.length !== 0) {
                nextID = (self.postillonDisplayedIDs[self.postillonDisplayedIDs.length - 1] + 1) % self.postillonTicker.length;
            }
            if (self.postillonDisplayedIDs.length === amount) {
                $("#postillon" + self.postillonDisplayedIDs[0]).slideUp(self.fadeTime, function () {
                    $(this).remove();
                });
                self.postillonDisplayedIDs.shift();
            }
            self.postillonDisplayedIDs.push(nextID);

            html = '<p id="postillon';
            html += nextID;
            html += '">';
            html += self.postillonTicker[nextID];
            html += "</p>";
            html = $(html);
            html.hide();
            $("#misc > article").append(html);
            html.slideDown(self.fadeTime);
        }
    },
    updateTime: function () {
        'use strict';
    }
};