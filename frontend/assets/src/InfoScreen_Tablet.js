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
        var s, r, html, elem = $("#dvb");

        html = "";

        html += "<article><h3>Helmholtzstraße</h3>";



        if (0 in response.helmholtzstrasse) {
            var direction;
            if (response.helmholtzstrasse[0].name != "") {
                switch (response.helmholtzstrasse[0].name) {
                    case "Striesen":
                        direction = "right";
                        break;
                    case "Löbtau Süd":
                        direction = "left";
                        break;
                    case "Löbtau":
                        direction = "left";
                        break;
                    case "Plauen, Rathaus":
                        direction = "left";
                        break;
                    case "Btf. Gruna":
                        direction = "right";
                        break;
                    case "Gruna":
                        direction = "right";
                        break;
                }
                html += "<p><strong>" + response.helmholtzstrasse[0].minutes + "</strong> min";
                html += "<i class='fa fa-angle-" + direction + "'></i>";
                html += "<span>" + response.helmholtzstrasse[0].number + "</span>" + response.helmholtzstrasse[0].name;

            } else {
                html += "<p>Keine Daten vorhanden.</p>";
            }
        } else {
            html += "<p>Keine Daten vorhanden.</p>";
        }
        if (1 in response.helmholtzstrasse) {
            var direction;
            if (response.helmholtzstrasse[1].name != "") {
                switch (response.helmholtzstrasse[1].name) {
                    case "Striesen":
                        direction = "right";
                        break;
                    case "Löbtau Süd":
                        direction = "left";
                        break;
                    case "Löbtau":
                        direction = "left";
                        break;
                    case "Plauen, Rathaus":
                        direction = "left";
                        break;
                    case "Btf. Gruna":
                        direction = "right";
                        break;
                    case "Gruna":
                        direction = "right";
                        break;
                }
                html += "<p><strong>" + response.helmholtzstrasse[1].minutes + "</strong> min";
                html += "<i class='fa fa-angle-" + direction + "'></i>";
                html += "<span>" + response.helmholtzstrasse[1].number + "</span>" + response.helmholtzstrasse[1].name;
            } else {
                html += "<p>Keine Daten vorhanden.</p>";
            }
        } else {
            html += "<p>Keine Daten vorhanden.</p>";
        }
        html += "<h3>Münchner Platz</h3>";

        if (0 in response.muenchnerplatz) {
            var direction;
            if (response.muenchnerplatz[0].name != "") {
                switch (response.muenchnerplatz[0].name) {
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
                html += "<p><strong>" + response.muenchnerplatz[0].minutes + "</strong> min";
                html += "<i class='fa fa-angle-" + direction + "'></i>";
                html += "<span>" + response.muenchnerplatz[0].number + "</span>" + response.muenchnerplatz[0].name;
            } else {
                html += "<p>Keine Daten vorhanden.</p>";
            }
        } else {
            html += "<p>Keine Daten vorhanden.</p>";
        }
        if (1 in response.muenchnerplatz) {
            var direction;
            if (response.muenchnerplatz[1].name != "") {
                switch (response.muenchnerplatz[1].name) {
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
                html += "<p><strong>" + response.muenchnerplatz[1].minutes + "</strong> min";
                html += "<i class='fa fa-angle-" + direction + "'></i>";
                html += "<span>" + response.muenchnerplatz[1].number + "</span>" + response.muenchnerplatz[1].name;
            } else {
                html += "<p>Keine Daten vorhanden.</p>";
            }
        } else {
            html += "<p>Keine Daten vorhanden.</p>";
        }


        html += "</article>";
        self.replace_simple(elem, html, self);
    },
    updateTime: function () {
        'use strict';
    }
};
