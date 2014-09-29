'use strict';

/**
 * @ngdoc function
 * @name infoBusApp.controller:MapstopsCtrl
 * @description
 * # MapstopsCtrl
 * Controller of the infoBusApp
 * Author: DS Fonseka
 * Date: 17/09/2014
 *
 * Comments: 
 *
 **/
infoBusApp.controller('MapstopsCtrl', function ($scope, busData, $rootScope) {

    var latLong = 'northEast=51.52783450,-0.04076115&southWest=51.51560467,-0.10225884';
    var busStops = busData.busStopsData(latLong);
    $rootScope.locations = [];
    
    var busStopLocations = function () {
        busStops.then(function (result) {
            var stopData = result.data;
            var stopMarkers = stopData.markers
            $rootScope.locations = result.data.markers;

        }).catch(function(result){
             $rootScope.moduleState = 'mapError';
              
        });

    }
    
    busStopLocations();
    // REFACTOR THIS... don't need it here include in the MapCanvas
    $rootScope.markerBounds = function (latLong) {
        var ne = 'northEast=' + latLong.getNorthEast().lat() + ',' + latLong.getNorthEast().lng();
        var sw = 'southWest=' + latLong.getSouthWest().lat() + ',' + latLong.getSouthWest().lng();
        var latLongQuery = ne + '&' + sw;

        busStops = busData.busStopsData(latLongQuery);
        busStopLocations();

    }
    
    


});