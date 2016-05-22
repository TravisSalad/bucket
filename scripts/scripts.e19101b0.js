"use strict";angular.module("angularTestApp",["ngAnimate","ngAria","ngCookies","ngMessages","ngResource","ngRoute","ngSanitize","ngStorage","ngTouch","uiGmapgoogle-maps"]).config(["$routeProvider","uiGmapGoogleMapApiProvider",function(a,b){a.when("/",{templateUrl:"views/main.html",controller:"MainCtrl",controllerAs:"main"}).otherwise({redirectTo:"/"}),b.configure({key:"AIzaSyANULjox-0qcLdFkdlsYBoj4iMlOUiS5_g",v:"3.20",libraries:"places"})}]),angular.module("angularTestApp").controller("MainCtrl",["$scope","$log","uiGmapGoogleMapApi","current","$localStorage",function(a,b,c,d,e){angular.extend(a,{map:{center:{latitude:47.6062095,longitude:-122.3320708},zoom:8},coords:{latitude:{},longitude:{}},searchbox:{template:"searchbox.tpl.html",events:{places_changed:function(b){var c=b.getPlaces();a.placesID=c[0].place_id,a.currentPlace=d.query({placeID:c[0].place_id}),a.addPlaces=function(b){var c=b.result.name,d=b.result.geometry.location.lat,f=b.result.geometry.location.lng,g={name:c,lat:d,lng:f};if(e.savedCities){for(var h=!0,i=0;i<e.savedCities.length;i++)e.savedCities[i].name===g.name&&(h=!1);h===!0?e.savedCities.push(g):console.log("city already saved")}else e.savedCities=[g];a.coords={latitude:d,longitude:f}},a.findPlaces=function(){a.map={center:{latitude:c[0].geometry.location.lat(),longitude:c[0].geometry.location.lng()}},a.coords={latitude:c[0].geometry.location.lat(),longitude:c[0].geometry.location.lng()}}}}},options:{scrollwheel:!1}}),a.storage=e}]),angular.module("angularTestApp").factory("current",["$resource",function(a){return a("https://crossorigin.me/https://maps.googleapis.com/maps/api/place/details/json?placeid=:placeID&key=AIzaSyANULjox-0qcLdFkdlsYBoj4iMlOUiS5_g",{},{query:{method:"GET",params:{placeID:"ChIJyU1YTzwC54kRj4V6zn6M68s"},isArray:!1}})}]),angular.module("angularTestApp").run(["$templateCache",function(a){a.put("views/main.html",'<div class="mainn" ng-app="angularTestApp" ng-controller="MainCtrl"> <div class="col-sm-4 text-center content"> <h1>Seattle, WA</h1> <hr> <div id="search" ng-model="location"></div><br> <button class="btn btn-primary btn-find" ng-click="findPlaces()">Search for places to visit</button><br><br> <button class="btn btn-primary btn-find" ng-click="addPlaces(currentPlace)">Add place to bucket list</button><br><br> <div class="saved-places text-left"> <p ng-repeat="city in storage.savedCities">{{city.name}}</p> </div> <div ng-repeat="city in storage.savedCities"> <ui-gmap-marker idkey="1" coords="cooords" events="searchbox.events"></ui-gmap-marker> </div> <script id="searchbox.tpl.html" type="text/ng-template"><input type="text" placeholder="Search by City, State, Location..." style="width: 70%;"></script> </div> <div class="col-sm-8 map-canvas"> <div cass="map-container"> <ui-gmap-google-map center="map.center" zoom="map.zoom" options="options"> <ui-gmap-search-box parentdiv="\'search\'" template="searchbox.template" events="searchbox.events"></ui-gmap-search-box> <ui-gmap-marker idkey="1" coords="coords" events="searchbox.events"></ui-gmap-marker> </ui-gmap-google-map> </div> </div> </div>')}]);