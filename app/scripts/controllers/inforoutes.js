'use strict';
/**
 * @ngdoc function
 * @name infoBusApp.controller:InfoRoutesCtrl
 * @description
 * # InfoRoutesCtrl
 * Controller of the infoBusApp
 *
 * Author: DS Fonseka
 * Date: 17/09/2014
 *
 * Comments: 
 *		TODO: Filters for the returned data
 *		TODO: Handle empty route information
 *
 **/
infoBusApp.controller('InfoRoutesCtrl', function ($scope, busData, $rootScope) {


    $rootScope.moduleState = 'init';

    $rootScope.markerClick = function (stopData) {

        var busRoutes = busData.busRouteData(stopData.id);

        busRoutes.then(function (result) {
            var routeData = result.data;
            var arrivals = routeData.arrivals;
            $rootScope.stopData = stopData; // Slight lag if declared earlier
            $rootScope.arrivals = arrivals;
            $rootScope.moduleState = 'showData';

        }).catch(function () {
            $rootScope.$apply(function () {
                $rootScope.moduleState = 'error';
            });
        });

    }




});