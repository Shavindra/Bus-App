'use strict';

/**
 * @ngdoc directive
 * @name infoBusApp.directive:mapCanvas
 * @description
 * # mapCanvas
 *
 * Author: DS Fonseka
 * Date: 17/09/2014
 *
 * Comments: 
 *		Created own directive instead of https://angular-ui.github.io/angular-google-maps/#!/
 *      TODO: Set interval timeout and queue the marker processing / MarkerCluster
 *      TODO: Styled map
 *
 **/
infoBusApp.directive('mapCanvas', ['busData', '$rootScope',
    function (busData, $rootScope, $watch) {
        var mapLoad = function () {
            var map = new google.maps.Map(document.getElementById('map'), {
                zoom: 15,
                center: new google.maps.LatLng(51.5286416, -0.1015987),
                mapTypeControlOptions: {
                    mapTypeIds: [google.maps.MapTypeId.ROADMAP,
                                 google.maps.MapTypeId.SATELLITE, 
                                 google.maps.MapTypeId.HYBRID,
                                 google.maps.MapTypeId.TERRAIN, 'styled_maps']
                },
                mapTypeId: google.maps.MapTypeId.ROADMAP
            });

            return map;

        };

        var mapUi = {

            icoMarker: {
                path: "M21.8,1.8c1,0.2,2.1,0.4,3.1,0.7c3.1,0.8,5.8,2.5,8,4.8c2.4,2.5,4,5.5,4.7,8.9c0.7,3.1,0.4,6.2-0.8,9.1c-1.2,3-2.8,5.9-4.6,8.6c-3.4,5.3-7.2,10.2-11.3,14.9c-0.3,0.3-0.6,0.6-0.9,1c-1-1.2-2-2.3-2.9-3.4c-2.7-3.2-5.2-6.5-7.6-10c-2.2-3.2-4.2-6.5-5.8-10.1c-1.1-2.5-1.9-5-1.7-7.7c0.3-3.3,1.3-6.3,3.2-9c2.3-3.3,5.4-5.6,9.2-6.9c1.1-0.4,2.3-0.5,3.5-0.8c0.1,0,0.2-0.1,0.4-0.1C19.3,1.8,20.5,1.8,21.8,1.8z",
                fillColor: '#FF0000',
                fillOpacity: 0.6,
                strokeColor: '#ED1C27',
                strokeWeight: 2,
                scale: 0.5,
                anchor: new google.maps.Point(20, 48)
            },

            styledMap: {
                styles: [{
                    "featureType": "water",
                    "stylers": [{
                        "hue": "#003bff"
                    }]
                }, {
                    "featureType": "road.highway",
                    "elementType": "labels",
                    "stylers": [{
                        "visibility": "off"
                    }]
                }, {
                    "stylers": [{
                        "hue": "#ff0000"
                    }]
                }],
                name: "Styled Map"
            }

        };


        var mapData = {
            mapBounds: function (event) {
                var ne = rectangle.getBounds().getNorthEast();
                var sw = rectangle.getBounds().getSouthWest();
            },

            addMarkers: function (markers, map) {
                var markers = markers;
                var marker, i;
                // var infowindow = new google.maps.InfoWindow();

                for (i = 0; i < markers.length; i++) {
                    var lat = markers[i].lat;
                    var lng = markers[i].lng;
                    marker = new google.maps.Marker({
                        position: new google.maps.LatLng(lat, lng),
                        map: map,
                        icon: mapUi.icoMarker,
                        anchor: new google.maps.Point(60, 100)
                    });

                    google.maps.event.addListener(marker, 'click', (function (marker, i) {

                        return function () {
                             MapInteractions.showTime();
                            $rootScope.markerClick(markers[i]);
                        };

                    })(marker, i));
                }
            }

        };

        var mapEvents = {

            boundChange: function (map) {
                google.maps.event.addListener(map, 'idle', function () {
                    //console.log('bound change');
                    var mapBounds = map.getBounds();
                    $rootScope.$apply(function () {

                        $rootScope.markerBounds(mapBounds);
                    });

                });
            },

            clickListen: function (markerId) {

            }
        };

        return {
            template: '<div></div>',
            restrict: 'E',
            replace: true,
            link: function (scope, element, attrs) {
                var map = mapLoad();
                // Split map load and markers
                // Ensure only update the markers when get the new bounds
                var listener = scope.$watch('locations', function (locations) {
                    if (locations !== undefined) {
                        listener();
                        mapEvents.boundChange(map);
                    }
                });

                var checkChanges = scope.$watch('locations', function (locations) {

                    mapData.addMarkers(locations, map);
               });

            }
        };

    }]);