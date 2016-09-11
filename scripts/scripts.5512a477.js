"use strict";angular.module("angularTestApp",["ngAnimate","ngAria","ngCookies","ngMessages","ngResource","ngRoute","ngSanitize","ngStorage","ngTouch","uiGmapgoogle-maps"]).config(["$routeProvider","uiGmapGoogleMapApiProvider",function(a,b){a.when("/",{templateUrl:"views/home.html",controller:"HomeCtrl",controllerAs:"home"}).when("/new/:id",{templateUrl:"views/new.html",controller:"NewCtrl",controllerAs:"new"}).when("/about",{templateUrl:"views/about.html",controller:"AboutCtrl",controllerAs:"about"}).when("/saved",{templateUrl:"views/saved.html",controller:"SavedCtrl",controllerAs:"saved"}).when("/create",{templateUrl:"views/create.html",controller:"CreateCtrl",controllerAs:"create"}).otherwise({redirectTo:"/"}),b.configure({key:"AIzaSyANULjox-0qcLdFkdlsYBoj4iMlOUiS5_g",v:"3.23",libraries:"places"})}]),angular.module("angularTestApp").controller("HomeCtrl",["$scope","shared",function(a,b){a.sharedProps=b,a.createMap=function(){b.title=a.titleInput,b.locations=[]},a.cancel=function(){a.titleInput=""},angular.extend(a,{map:{center:{latitude:47.6062095,longitude:-122.3320708},zoom:12},options:{scrollwheel:!1}})}]),angular.module("angularTestApp").controller("NewCtrl",["$scope","uiGmapGoogleMapApi","current","$localStorage","shared",function(a,b,c,d,e){a.sharedProps=e,a.sharedProps.locations.length?a.locations=a.sharedProps.locations:a.locations=[],a.storage=d,d.savedMaps?d.savedMaps:d.savedMaps=[],a.clearShared=function(){a.sharedProps={title:"",locations:[]}},angular.extend(a,{map:{center:a.sharedProps.center,zoom:a.sharedProps.zoom},searchbox:{template:"searchbox.tpl.html",events:{places_changed:function(b){var d=b.getPlaces();a.currentPlace=c.query({placeID:d[0].place_id}),a.findPlaces=function(b){a.map={center:{latitude:b.result.geometry.location.lat,longitude:b.result.geometry.location.lng}},a.coords={latitude:b.result.geometry.location.lat,longitude:b.result.geometry.location.lng}},a.addPlaces=function(b){a.map={center:{latitude:b.result.geometry.location.lat,longitude:b.result.geometry.location.lng},zoom:12},a.coords={latitude:b.result.geometry.location.lat,longitude:b.result.geometry.location.lng};var c={name:b.result.name,url:b.result.url,coords:{latitude:b.result.geometry.location.lat,longitude:b.result.geometry.location.lng}};a.locations.push(c)}}}},options:{scrollwheel:!1}}),a.refocus=function(b){a.map.center=b,a.map.zoom=14},a.closeMap=function(){a.clearShared()},a.saveMap=function(){d.savedMaps?d.savedMaps===d.savedMaps:d.savedMaps=[];var b={name:a.sharedProps.title,locations:a.locations,id:a.sharedProps.id};d.savedMaps.push(b)},a.removePlace=function(b){var c=a.locations.indexOf(b);a.locations.splice(c,1)}}]),angular.module("angularTestApp").controller("AboutCtrl",["$scope","shared",function(a,b){angular.extend(a,{map:{center:{latitude:47.6062095,longitude:-122.3320708},zoom:12},options:{scrollwheel:!1}})}]),angular.module("angularTestApp").controller("SavedCtrl",["$scope","$localStorage","shared",function(a,b,c){a.sharedProps=c,a.storage=b,a.remove=function(a){b.savedMaps.forEach(function(c,d){c.id===a.id&&b.savedMaps.splice(d,1)})},a.maps=function(a){c.title=a.name,c.locations=a.locations,c.center=a.locations[0].coords,c.zoom=8},angular.extend(a,{map:{center:{latitude:47.6062095,longitude:-122.3320708},zoom:12},options:{scrollwheel:!1}})}]),angular.module("angularTestApp").controller("CreateCtrl",["$scope","$localStorage","shared",function(a,b,c){a.sharedProps=c,a.createMap=function(){c.title=a.titleInput,c.id=Date.now(),c.locations=[]},angular.extend(a,{map:{center:{latitude:47.6062095,longitude:-122.3320708},zoom:12},options:{scrollwheel:!1}})}]),angular.module("angularTestApp").factory("current",["$resource",function(a){return a("https://crossorigin.me/https://maps.googleapis.com/maps/api/place/details/json?placeid=:placeID&key=AIzaSyANULjox-0qcLdFkdlsYBoj4iMlOUiS5_g",{},{query:{method:"GET",params:{placeID:"ChIJyU1YTzwC54kRj4V6zn6M68s"},isArray:!1}})}]),angular.module("angularTestApp").service("shared",function(){return{title:"",locations:[],id:"",center:{latitude:39.0997,longitude:-94.5786},zoom:4}}),angular.module("angularTestApp").run(["$templateCache",function(a){a.put("views/about.html",'<div class="container-flex"> <div class="container-flex-top"></div> <div class="flex-item intro jumbo"> <h1>About Bucket</h1><hr><br> <div class="text-left"> <p>Ever see a post on social media or an article about a place that you would love to visit and then forgotten about that location when you went to book your next trip?</p><br> <p>Bucket is an easy way to save travel destinations and places that you would like to visit while on vacation. Just create a bucket, choose a destination, and start adding places you want to visit while you are on that trip! When you\'re done, save the map and it will be saved for you to refer to when you book your next trip. Do this over and over again for as many destinations as you\'d like!</p><br> </div> <a class="btn btn-primary" ng-href="#/create">Get Started!</a><br><br> </div> <div class="container-flex-bottom"></div> </div> <ui-gmap-google-map center="map.center" zoom="map.zoom" options="options"> </ui-gmap-google-map>'),a.put("views/create.html",'<div class="bucket" ng-app="angularTestApp" ng-controller="CreateCtrl"> <div class="container-flex text-center"> <div class="conatiner-flex-top"></div> <div class="flex-item intro"> <div class="text-center intro-content"> <h2>Enter a destination and click Create!</h2><br> <div class="name-input col-xs-10 col-sm-6 col-sm-offset-2"> <input type="text" id="titleInput" ng-model="titleInput" class="form-control" placeholder="Enter a location" aria-describedby="basic-addon1"> </div> <div class="text-left name-input col-xs-2"> <a type="button" class="btn btn-primary" ng-click="createMap()" ng-href="#/new/{{sharedProps.id}}">Create!</a> </div> <br> </div> </div> <div class="container-flex-bottom"></div> </div> <ui-gmap-google-map center="map.center" zoom="map.zoom" options="options"> </ui-gmap-google-map> </div>'),a.put("views/home.html",'<div class="bucket" ng-app="angularTestApp" ng-controller="HomeCtrl"> <div class="container-flex text-center"> <div class="conatiner-flex-top"></div> <div class="flex-item intro"> <div class="intro-content"> <i class="fa fa-plane fa-5x" aria-hidden="true"></i> <h1>Welcome to Bucket!<br><br> <a class="btn btn-primary" ng-href="#/about">ABOUT</a> <a class="btn btn-primary" type="button" href="#/create">CREATE</a> </h1></div> </div> <div class="container-flex-bottom"></div> </div> <ui-gmap-google-map center="map.center" zoom="map.zoom" options="options"> </ui-gmap-google-map> </div>'),a.put("views/new.html",'<div class="new" ng-app="angularTestApp" ng-controller="NewCtrl"> <div class="col-xs-4 content"> <div class="title-search text-center"> <h1 class="bucket-title">{{sharedProps.title}}</h1><br> </div> <div id="search" ng-model="location"></div> <br> <div class="text-center"> <button class="btn btn-primary btn-find btn-search" ng-click="findPlaces(currentPlace)">Search for places to visit</button> <button class="btn btn-primary btn-find" ng-click="addPlaces(currentPlace)">Add to place bucket list</button> </div> <script id="searchbox.tpl.html" type="text/ng-template"><input class="bucket-input" type="text" placeholder="Search for places to visit" style="width: 100%;"></script> <hr> <div> <h2 class="text-center">Saved Places</h2> </div> <hr> <div class="saved-places text-center"> <p ng-repeat="location in locations"> <a class="place-title" href="" ng-click="refocus(location.coords)">{{location.name}}</a><br> <a target="_blank" href="{{location.url}}">more info</a> | <a ng-click="removePlace(location)" href="">delete</a> </p> </div> </div> <div class="save"> <button class="btn btn-primary btn-save" ng-click="saveMap()">Save Map</button> <a class="btn btn-primary btn-save" ng-click="closeMap()" href="#/saved">Close Map</a> </div> <div class="col-xs-8 map-canvas hidden-xs"> <div class="map-container"> <ui-gmap-google-map center="map.center" zoom="map.zoom" options="options"> <ui-gmap-search-box parentdiv="\'search\'" template="searchbox.template" events="searchbox.events"></ui-gmap-search-box> <ui-gmap-marker idkey="1" coords="coords" events="searchbox.events"></ui-gmap-marker> <ui-gmap-marker ng-repeat="location in locations" idkey="2" coords="location.coords"></ui-gmap-marker> </ui-gmap-google-map> </div> </div> </div>'),a.put("views/saved.html",'<div class="container-flex text-center"> <div class="conatiner-flex-top"></div> <div class="flex-item jumbo intro"> <h1>Saved Maps</h1> <hr> <p ng-repeat="map in storage.savedMaps"> <a class="place-title" href="#/new/{{map.id}}" ng-click="maps(map)">{{map.name}}</a> - <a href="" class="remove-place" ng-click="remove(map)">(remove)</a> </p> </div> <div class="container-flex-bottom"></div> </div> <ui-gmap-google-map center="map.center" zoom="map.zoom" options="options"> </ui-gmap-google-map>')}]);