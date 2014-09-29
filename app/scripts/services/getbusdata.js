'use strict';

/**
 * @ngdoc service
 * @name infoBusApp.getBusData
 * @description
 * # getBusData
 * Factory in the infoBusApp.
 *
 * Author: DS Fonseka
 * Date: 17/09/2014
 *
 * Comments: 
 *      TODO: Geolocation + Geolocation fallback
 *      TODO: Single call to get all the stops then store in array. After the inital request using geolocation
 *
 **/
infoBusApp.factory('busData', ['$http', '$window', '$q',
    function ($http, $window, $q) {

        var baseURL = 'http://digitaslbi-id-test.herokuapp.com/bus-stops';
        var ngCallback = '?callback=JSON_CALLBACK&';

        function getBusData(dataUrl) {
            var deferred = $q.defer();

            $http({
                method: 'JSONP',
                url: dataUrl
            }).
            success(function (data, status, headers, config) {
                deferred.resolve({
                    requestUrl: dataUrl,
                    status: status,
                    data: data

                });

            }).
            error(function (data, status, headers, config) {
                deferred.reject({
                    requestUrl: dataUrl,
                    status: status
                });

            });
            return deferred.promise;
        }

        var getBusStops = function (mapCoords) {
            var busStopsUrl = baseURL + ngCallback + mapCoords;
            return getBusData(busStopsUrl);
        };


        var getBusRoutes = function (stopId) {
            var routeDataUrl = baseURL + '/' + stopId + ngCallback ;
            return getBusData(routeDataUrl);
        };

        return {
            busStopsData: getBusStops,
            busRouteData: getBusRoutes


        };
    }]);