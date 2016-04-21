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

    self.basepath = "/"; //"127.0.0.1:5000/";
    self.postfix = ""; //"";

    self.newsRefreshTime = 600000; // all 10min
    self.mealsRefreshTime = 6000000; // all 100min
    self.busRefreshTime = 60000; // evr min
    self.postillonRefreshTime = 600000; // all 10min

    self.postillonTicker = [];
    self.postillonAmount = 3;
    self.postillonDisplayedIDs = [];
    self.postillonTickerTime = 6000;

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
            dataType: "json",
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
    replace_simple: function (elem, html, self) {
        'use strict';

        if (html !== undefined && elem !== undefined) {
            if (elem.html() !== html) {

                elem.html(html);

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
                //html += "<div>";
                html += "<p>" + response[r].name + "</p>";
                html += "<p>" + response[r].price + ", ";
                //html += "<p>" + response[r].price + "</p>";
                //html += "<p>";
                for (n in response[r].notes) {
                    if (response[r].notes.hasOwnProperty(n)) {
                        switch (response[r].notes[n]) {
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
                // html += "</p></div>";
                html += "</p>";

            }
        }
        self.replace(elem, html, self);
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
        var s, r, html, elem = $("#dvb");

        html = "";

        html += "<article><header>Helmholtzstraße</header>";
        for (s in response.helmholtzstrasse) { //alle Daten für Helmholzstraße

            var direction;
            switch (response.helmholtzstrasse[s].name) {
                case "Striesen":
                    direction = "left";
                    break;
                case "Löbtau Süd":
                    direction = "right";
                    break;
                case "Löbtau":
                    direction = "right";
                    break;
                case "Plauen, Rathaus":
                    direction = "right";
                    break;
                case "Btf. Gruna":
                    direction = "left";
                    break;
                case "Btf. Gruna":
                    direction = "left";
                    break;
            }
            html += "<p><strong>" + response.helmholtzstrasse[s].minutes + "</strong> min";
            html += "<i class='fa fa-angle-" + direction + "'></i>";
            html += "<span>" + response.helmholtzstrasse[s].number + "</span>" + response.helmholtzstrasse[s].name;


        }
        html += "</article><article><header>Münchner Platz</header>";
        for (s in response.muenchnerplatz) {

            var direction;
            switch (response.muenchnerplatz[s].name) {
                case "Coschütz":
                    direction = "up";
                    break;
                case "Wilder Mann":
                    direction = "down";
                    break;
                case "Weixdorf":
                    direction = "down";
                    break;
                case "Trachenberge":
                    direction = "down";
                    break;
                case "Btf Trachenberge":
                    direction = "down";
                    break;
                case "Plauen":
                    direction = "up";
                    break;
                case "Plauen, Nöthnitzer":
                    direction = "up";
                    break;
            }
            html += "<p><strong>" + response.muenchnerplatz[s].minutes + "</strong> min";
            html += "<i class='fa fa-angle-" + direction + "'></i>";
            html += "<span>" + response.muenchnerplatz[s].number + "</span>" + response.muenchnerplatz[s].name;


        }
        html += "</article><article><header>Technische Universität</header>";
        for (s in response.technischeuniversitaet) {

            var direction;
            html += "<p><strong>" + response.technischeuniversitaet[s].minutes + "</strong> min";
            html += "<span>" + response.technischeuniversitaet[s].number + "</span>" + response.technischeuniversitaet[s].name;


        }
        html += "</article>";
        self.replace_simple(elem, html, self);
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
