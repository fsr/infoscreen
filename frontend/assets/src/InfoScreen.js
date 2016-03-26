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

    self.init();
};

InfoScreenManager.prototype = {
    constructor: InfoScreen,

    init: function () {
        'use strict';
        var self = this;

    }
};
