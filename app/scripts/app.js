'use strict';

/**
 * @ngdoc overview
 * @name infoBusApp
 * @description
 * # infoBusApp
 *
 * Main module of the application.
 */
//var infoBusApp = angular.module('infoBusApp', ['google-maps']);

var infoBusApp = angular.module('infoBusApp', []);



var MapInteractions = {


    run: function () {

      //  MapInteractions.showTime();
        MapInteractions.navClick();
     //   MapInteractions.mapClick();
        MapInteractions.windowResize();
    },

    navClick: function () {
        $('[data-toggle=offcanvas]').click(function () {
            MapInteractions.showTime();
        });

    },

    mapClick: function () {

        $('.col-sm-8').click(function () {
            console.log($('.active').length);
            console.log($('.active').length);
            if ($('.active').length == 0) {
                
                MapInteractions.showTime();
            }

        });

    },

    windowResize: function () {
        $(window).resize(function () {
            var ww = $(window).width();
            console.log(ww);
            if (ww > 480 && $('.active').length > 0) {
                console.log($('.active').length);
                MapInteractions.showTime();
            }
        });
    },

    showTime: function () {
        $('[data-toggle=offcanvas]').toggleClass('visible-xs text-center');
        $('[data-toggle=offcanvas]').find('i').toggleClass('glyphicon-chevron-right glyphicon-chevron-left');
        $('.row-offcanvas').toggleClass('active');

    }

};






$(document).ready(function () {

    MapInteractions.run();

});