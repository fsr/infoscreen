/*\
|*| InfoScreen Front-End
|*|
|*| ask: lars@ifsr.de or vogel@ifsr.de
\*/

//var console = window.console;
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

    //$(document).bind('contextmenu', function (e) {
    //    e.preventDefault();
    //});

    self.basepath = "/"; //"127.0.0.1:5000/";
    self.postfix = ""; //"";

    self.newsRefreshTime = 30000; // all 30 sec
    self.mealsRefreshTime = 6000000; // all 100min
    self.busRefreshTime = 60000; // evr min
    self.postillonRefreshTime = 600000; // all 10min
    self.weatherRefreshTime = 300000; // all 5min
    self.miscToggleTime = 30000; //evr 30sec

    self.postillonTicker = [];
    self.postillonAmount = 3;
    self.postillonDisplayedIDs = [];
    self.postillonTickerTime = 6000;

    self.fadeTime = 0;
    self.postillonFadeTime = 500;

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

        self.request("weather", self.refreshWeather);
        setInterval(function () {
            self.request("weather", self.refreshWeather);
        }, self.weatherRefreshTime);

        setInterval(function () {
            self.updatePostillon();
        }, self.postillonTickerTime);

        setInterval(function () {
            self.miscToggle();
        }, self.miscToggleTime);
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
              elem.html(html);
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
    refreshPostillon: function (response, self) {
        'use strict';
        self.postillonTicker = response;

    },
    refreshWeather: function (response, self) {
        'use strict';
        var icon ="";
        switch (response.icon) {
        case "day-sunny":
            icon = "wi-forecast-io-clear-day:";
            break;
        case "night-clear":
            icon = "wi-forecast-io-clear-night";
            break;
        case "rain":
            icon = "wi-forecast-io-rain";
            break;
        case "snow":
            icon = "wi-forecast-io-snow";
            break;
        case "sleet":
            icon = "wi-forecast-io-sleet";
            break;
        case "strong-wind":
            icon = "wi-forecast-io-wind";
            break;
        case "fog":
            icon = "wi-forecast-io-fog";
            break;
        case "cloudy":
            icon = "wi-forecast-io-cloudy";
            break;
        case "day-cloudy":
            icon = "wi-forecast-io-partly-cloudy-day";
            break;
        case "night-cloudy":
            icon = "wi-forecast-io-partly-cloudy-night";
            break;
        case "hail":
            icon = "wi-forecast-io-hail";
            break;
        case "thunderstorm":
            icon = "wi-forecast-io-thunderstorm";
            break;
        case "tornado":
            icon = "wi-forecast-io-tornado";
            break;
        }
        if(icon ==""){
          icon = "wi wi-forecast-io-" + response.icon;
        } else {
        icon = "wi " + icon;
      }
        $("#weather-icon").removeClass().addClass(icon);
        $("#weather-temperature").html(response.temperature + "°C");
        $("#weather-text").html(response.summary);
    },
    miscToggle: function () {
        'use strict';
        if ($('#postillon').css('display') == 'none'){
          $('#weather').css('display','none');
          $('#postillon').css('display','block');
        } else {
          $('#weather').css('display','block');
          $('#postillon').css('display','none');
        }
    },
    refreshBus: function (response, self) {
        'use strict';
        var s, r, html, direction, elem = $("#dvb");

        html = "";

        html += "<article><header>Helmholtzstraße</header>";
        for (s in response.helmholtzstrasse) { //alle Daten für Helmholzstraße

            direction = "";
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
            case "E Karcherallee":
                direction = "left";
                break;
            case "Hp. Strehlen":
                direction = "left";
                break;
            }
            html += "<p><strong>" + response.helmholtzstrasse[s].minutes + "</strong> min";
            html += "<i class='fa fa-angle-" + direction + "'></i>";
            html += "<span>" + response.helmholtzstrasse[s].number + "</span>" + reduceString(response.helmholtzstrasse[s].name, 20);


        }
        html += "</article><article><header>Münchner Platz</header>";
        for (s in response.muenchnerplatz) {

            direction = "";
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
            html += "<span>" + response.muenchnerplatz[s].number + "</span>" +
                    reduceString(response.muenchnerplatz[s].name, 20);


        }
        html += "</article><article><header>Technische Universität</header>";
        for (s in response.technischeuniversitaet) {

            direction = "";
            html += "<p><strong>" + response.technischeuniversitaet[s].minutes + "</strong> min";
            html += "<span>" + response.technischeuniversitaet[s].number + "</span>" + reduceString(response.technischeuniversitaet[s].name, 20);


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
                $("#postillon" + self.postillonDisplayedIDs[0]).slideUp(self.postillonFadeTime, function () {
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
            $("#misc > #postillon").append(html);
            html.slideDown(self.postillonFadeTime);
        }
    },
    updateTime: function () {
        'use strict';
    }
};
