var map;
var a = -1;
function initMap() {
    map = new google.maps.Map(document.getElementById('googleMapIn'), {
        zoom: 16.1,
        center: { lat: 24.96854, lng: 121.1914 },
        scrollwheel: false,
        mapTypeControl: false,
        streetViewControl: false,
        zoomControl: false,
        clickableIcons: false,
        disableDoubleClickZoom: false,
        fullscreenControl: false,
        styles: [
            {
                "elementType": "labels",
                "stylers": [
                    {
                        "visibility": "off"
                    }
                ]
            },
            {
                "featureType": "administrative.land_parcel",
                "stylers": [
                    {
                        "visibility": "off"
                    }
                ]
            },
            {
                "featureType": "administrative.neighborhood",
                "stylers": [
                    {
                        "visibility": "off"
                    }
                ]
            },
            {
                "featureType": "landscape",
                "stylers": [
                    {
                        "color": "#f9ddc5"
                    },
                    {
                        "lightness": -7
                    }
                ]
            },
            {
                "featureType": "poi.business",
                "stylers": [
                    {
                        "visibility": "off"
                    }
                ]
            },
            {
                "featureType": "poi.government",
                "stylers": [
                    {
                        "color": "#9e5916"
                    },
                    {
                        "lightness": 46
                    }
                ]
            },
            {
                "featureType": "poi.medical",
                "elementType": "geometry.fill",
                "stylers": [
                    {
                        "color": "#813033"
                    },
                    {
                        "lightness": 38
                    },
                    {
                        "visibility": "off"
                    }
                ]
            },
            {
                "featureType": "poi.park",
                "stylers": [
                    {
                        "color": "#645c20"
                    },
                    {
                        "lightness": 39
                    }
                ]
            },
            {
                "featureType": "poi.school",
                "stylers": [
                    {
                        "color": "#a95521"
                    },
                    {
                        "lightness": 35
                    }
                ]
            },
            {
                "featureType": "poi.sports_complex",
                "stylers": [
                    {
                        "color": "#9e5916"
                    },
                    {
                        "lightness": 32
                    }
                ]
            },
            {
                "featureType": "road",
                "stylers": [
                    {
                        "color": "#813033"
                    },
                    {
                        "lightness": 43
                    }
                ]
            },
            {
                "featureType": "road",
                "elementType": "labels.icon",
                "stylers": [
                    {
                        "visibility": "off"
                    }
                ]
            },
            {
                "featureType": "road.local",
                "elementType": "geometry.fill",
                "stylers": [
                    {
                        "color": "#f19f53"
                    },
                    {
                        "lightness": 16
                    },
                    {
                        "visibility": "on"
                    },
                    {
                        "weight": 1.3
                    }
                ]
            },
            {
                "featureType": "road.local",
                "elementType": "geometry.stroke",
                "stylers": [
                    {
                        "color": "#f19f53"
                    },
                    {
                        "lightness": -10
                    }
                ]
            },
            {
                "featureType": "transit",
                "stylers": [
                    {
                        "lightness": 38
                    },
                    {
                        "visibility": "off"
                    }
                ]
            },
            {
                "featureType": "transit.line",
                "stylers": [
                    {
                        "color": "#813033"
                    },
                    {
                        "lightness": 22
                    }
                ]
            },
            {
                "featureType": "transit.station",
                "stylers": [
                    {
                        "visibility": "off"
                    }
                ]
            },
            {
                "featureType": "water",
                "stylers": [
                    {
                        "color": "#1994bf"
                    },
                    {
                        "saturation": -69
                    },
                    {
                        "lightness": 43
                    },
                    {
                        "gamma": 0.99
                    }
                ]
            }
        ]
    });

    var polygonPathPoints = [
        { lat: 24.965589, lng: 121.191112 },
        { lat: 24.966638, lng: 121.189521 },
        { lat: 24.966271, lng: 121.187509 },
        { lat: 24.967928, lng: 121.184895 },
        { lat: 24.971555, lng: 121.190490 },
        { lat: 24.971555, lng: 121.195672 },
        { lat: 24.970655, lng: 121.196643 },
        { lat: 24.966384, lng: 121.196701 },
        { lat: 24.965699, lng: 121.195683 },
    ];

    var polygonPath = new google.maps.Polygon({
        paths: polygonPathPoints,
        strokeColor: '#f00',
        strokeOpacity: .5,
        strokeWeight: 5,
        strokePosition: google.maps.StrokePosition.CENTER,
        fillColor: '#fa0',
        fillOpacity: 0.35,
        map: map
    });
    polygonPath.addListener('mouseover', function () {
        this.setOptions({
            fillColor: '#0a0'
        });
    });
    polygonPath.addListener('mouseout', function () {
        this.setOptions({
            fillColor: '#fa0'
        });
    });
    polygonPath.addListener('click' ,function(){

    });

    


    features.forEach(function (feature) {
        var marker = new google.maps.Marker({
            position: feature.position,
            icon: icons[feature.type],
            map: map,

        });

        marker.setAnimation(google.maps.Animation.BOUNCE);
    });

}