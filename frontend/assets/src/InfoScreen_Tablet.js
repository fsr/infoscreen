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
function reduceString(text, length) {
    'use strict';
    if (text.length > length) {
        var shortText = text.substring(0, length - 3) + "...";
        return shortText;
    } else {
        return text;
    }
    
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


    self.busRefreshTime = 30000; // evr halfmin

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


        self.request("stops", self.refreshBus);
        setInterval(function () {
            self.request("stops", self.refreshBus);
        }, self.busRefreshTime);
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
    refreshBus: function (response, self) {
        'use strict';
        var s, r, html, elem = $("#dvb"), direction = "";

        html = "";

        html += "<article><h3>Helmholtzstraße</h3>";


        for (s = 0; s < 2; s += 1) {
            if (response.helmholtzstrasse.hasOwnProperty(s)) {

                if (response.helmholtzstrasse[s].name !== "") {
                    switch (response.helmholtzstrasse[s].name) {
                    case "Striesen":
                        direction = "angle-right";
                        break;
                    case "Löbtau Süd":
                        direction = "angle-left";
                        break;
                    case "Löbtau":
                        direction = "angle-left";
                        break;
                    case "Plauen, Rathaus":
                        direction = "angle-left";
                        break;
                    case "Hp. Plauen":
                        direction = "angle-left";
                        break;
                    case "Plauen":
                        direction = "angle-left";
                        break;
                    case "Btf. Gruna":
                        direction = "angle-right";
                        break;
                    case "Gruna":
                        direction = "angle-right";
                        break;
                    case "E Karcherallee":
                        direction = "angle-right";
                        break;
                    }
                    if (direction === "") {
                        direction = "question-circle-o";
                    }
                    html += "<p><strong>" + response.helmholtzstrasse[s].minutes + "</strong>";
                    html += "<i class='fa fa-" + direction + "'></i>";
                    html += "<span>" + response.helmholtzstrasse[s].number + "</span>" + reduceString(response.helmholtzstrasse[s].name, 12);

                } else {
                    html += "<p><strong></strong><i></i><span></span>Keine Daten</p>";
                }
            } else {
                html += "<p><strong></strong><i></i><span></span>Keine Daten</p>";
            }
        }

        html += "<h3>Münchner Platz</h3>";
        for (s = 0; s < 2; s += 1) {
            if (response.muenchnerplatz.hasOwnProperty(s)) {
                direction = "";
                if (response.muenchnerplatz[s].name !== "") {
                    switch (response.muenchnerplatz[s].name) {
                    case "Coschütz":
                        direction = "down";
                        break;
                    case "Wilder Mann":
                        direction = "up";
                        break;
                    case "Weixdorf":
                        direction = "up";
                        break;
                    case "Btf Trachenberge":
                        direction = "up";
                        break;
                    case "Trachenberge":
                        direction = "up";
                        break;
                    case "Plauen":
                        direction = "down";
                        break;
                    case "Plauen, Nöthnitzer":
                        direction = "down";
                        break;
                    }
                    if (direction === "") {
                        direction = "question-circle-o";
                    }
                    html += "<p><strong>" + response.muenchnerplatz[s].minutes + "</strong>";
                    html += "<i class='fa fa-angle-" + direction + "'></i>";
                    html += "<span>" + response.muenchnerplatz[s].number + "</span>" + reduceString(response.muenchnerplatz[s].name, 12);
                } else {
                    html += "<p><strong></strong><i></i><span></span>Keine Daten</p>";
                }
            } else {
                html += "<p><strong></strong><i></i><span></span>Keine Daten</p>";
            }
        }
        


        html += "</article>";
        self.replace_simple(elem, html, self);
    },
    updateTime: function () {
        'use strict';
    }
};
