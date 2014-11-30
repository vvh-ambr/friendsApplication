angular.module('friendsApp', ['ngRoute', 'ngResource', 'ngMessages'])
.config(function($routeProvider, $locationProvider) {

  $routeProvider
    .when('/profile/:name', {
      controller: 'ProfileController',
      templateUrl: 'states/profile.html'
    })
    .when('/search', {
      controller: 'SearchController',
      templateUrl: 'states/search.html'
    })
    .when('/friends', {
      controller: 'SearchController',
      templateUrl: 'states/friends.html'
    })
    .when('/contact/:name', {
      controller: 'ProfileController',
      templateUrl: 'states/single.html'
    });

  $locationProvider.html5Mode(true);
});
