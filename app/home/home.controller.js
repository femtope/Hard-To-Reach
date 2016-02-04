'use strict';

angular.module('hardToReach')
  .controller('HomeCtrl', function ($scope) {
    $scope.model1 = {
      name : ''
    };
    $scope.model2 = {
      name : ''
    };

    var sublayers = [];

    // Creating SubLayers for Administrative Levels
    var layerSource = {
      user_name: 'ehealthafrica',
      type: 'cartodb',
      sublayers: [{
        sql: "SELECT * FROM nigeria_state_boundary",
        cartocss: "#nigeria_state_boundary{polygon-fill: #C0C0C0; polygon-opacity: 0.5; line-color: #900000; line-width: 2.0; line-opacity: 2;}"
      },
        {
          sql: "SELECT * FROM nigeria_lgas",
          cartocss: "#nigeria_lgas{polygon-fill: #E0E0E0; polygon-opacity: 0.2; line-color: #FF2900; line-width: 1.5; line-opacity: 2;} #nigeria_lgas::lables{text-name: [lganame]; text-face-name: 'DejaVu Sans Bold'; text-size: 12; text-label-position-tolerance: 10; text-fill: #41006D; text-halo-fill: #FFFFFF; text-halo-radius: 0.5; text-dy: -10; text-allow-overlap: false; text-placement: point; text-placement-type: simple; [zoom <=7] {text-size:2}[zoom =7] {text-size:5}[zoom=8] {text-size:9}[zoom=9] {text-size:12}[zoom=10] {text-size:20}[zoom=11] {text-size:25}[zoom =8] {text-dy:-25}[zoom =9] {text-dy:-25}[zoom =10] {text-dy:-39}[zoom =11] {text-dy:-29}[zoom =12] {text-dy:-39}[zoom <=8] {text-allow-overlap: false}[zoom=5] {text-size:0.5}[zoom=5] {text-halo-radius:0.5}[zoom=6] {text-halo-radius:1.5}}"
        },
        {
          sql: "SELECT * FROM northern_state_boundary",
          cartocss: "#northern_state_boundary{polygon-fill: #ebebeb; polygon-opacity: 0.7; line-color: #FF2900; line-width: 2; line-opacity: 2;}"
        }]
    };



    $scope.layerItem = ['Google', 'OSM', 'MapBox'];
    $scope.layer1Item = ['StateLevel', 'LGALevel', 'WardLevel', 'ProjectState'];

    $scope.selectedLayerItem = $scope.model1;
    $scope.selectedLayer1Item = $scope.model2;


    //MapBox Map is added to the Code here
    var getMapBoxLayer =  function (){
      delete(getOpenStreetMap.mapObjectOSM);
      //delete(getMapBoxLayer.mapObjectMapBox);
      delete(getGoogleMap.mapObjectGoogle);

      // initiate leaflet map
      var mapObjectMapBox = new L.Map('map', {
        center: [10, 8],
        zoom: 7
      });


      L.tileLayer('https://maps.nlp.nokia.com/maptiler/v2/maptile/newest/normal.day.grey/{z}/{x}/{y}/256/png8?lg=eng&token=61YWYROufLu_f8ylE0vn0Q&app_id=qIWDkliFCtLntLma2e6O', {
        maxZoom: 15,
        attribution: 'Mapbox <a href="http://mapbox.com/about/maps" target="_blank">Terms &amp; Feedback</a>'
      }).addTo(mapObjectMapBox);




      cartodb.createLayer(mapObjectMapBox, layerSource)
        .addTo(mapObjectMapBox)
        .on('done', function(layer) {

          for (var i = 0; i < layer.getSubLayerCount(); i++) {
            sublayers[i] = layer.getSubLayer(i);
            //alert("Congrats, you added sublayer #" + i + "!");
          }
        });


    };


    //Adding OpenStreetMap to the Code
    var getOpenStreetMap = function (){
      //delete(getOpenStreetMap.mapObjectOSM);
      delete(getMapBoxLayer.mapObjectMapBox);
      delete( getGoogleMap.mapObjectGoogle);
      // Initial OpenStreetMap
      var element = document.getElementById("map");

      var mapObjectOSM = new google.maps.Map(element, {
        center: new google.maps.LatLng(10, 8),
        zoom: 7,
        mapTypeId: "OSM",
        mapTypeControl: false,
        stretViewControl: true
      });
      mapObjectOSM.mapTypes.set("OSM", new google.maps.ImageMapType({
        getTileUrl: function(coord, zoom){
          return "http://tile.openstreetmap.org/" + zoom + "/" + coord.x +"/" + coord.y + ".png";
        },
        tileSize: new google.maps.Size(256, 256),
        name: "OpenSTreetMap",
        maxZoom: 15
      }));

    };



    //Adding Google Map to the Code
    var getGoogleMap = function () {
      delete(getOpenStreetMap.mapObjectOSM);
      delete(getMapBoxLayer.mapObjectMapBox);
      //delete( getGoogleMap.mapObjectGoogle);
      var mapObjectGoogle = new google.maps.Map(document.getElementById('map'), {
        center: {lat: 10, lng: 8},
        zoom: 7,
        maxZoom: 15
      });


    };

    //Making Google the Initial Base Map
    var googleMap = new google.maps.Map(document.getElementById('map'), {
      center: {lat: 10, lng: 8},
      zoom: 7
    });




    //Switching Base Map Layers
    $scope.selectedLayer = function (layer) {
      layer = layer.toLowerCase();
      var layers = {
        osm: getOpenStreetMap,
        google: getGoogleMap,
        mapbox: getMapBoxLayer
      };

      if (layers.hasOwnProperty(layer)) {
        console.log('here', layer);
        layers[layer]();
      }
    };


    var showState = function () {
      sublayers[0].toggle();
      sublayers[1].hide();
      sublayers[2].hide();
    };

    var showLgas = function () {
      sublayers[1].toggle();
      sublayers[0].hide();
      sublayers[2].hide();
    };

    var showProjectState = function () {
      sublayers[2].toggle();
      sublayers[0].hide();
      sublayers[1].hide();
    };


    //Switching Administrative Boundaries
    $scope.selectedLevel = function (layer1) {
      layer1 = layer1.toLowerCase();
      var layerLevel = {
        statelevel: showState,
        lgalevel: showLgas,
        wardlevel: function() {},
        projectstate: showProjectState
      };

      if (layerLevel.hasOwnProperty(layer1)) {
        console.log('here', layer1);
        layerLevel[layer1]();
      }
    };


    // Loading CSV Files into the system
    function uploadFile() {
      var file = $('#csvFile')[0].files[0];
      if (file.type !== 'text/csv') {
        alert('Please Upload a CSV Formatted File, Thanks!!!');
      }

      //
    }
  })
