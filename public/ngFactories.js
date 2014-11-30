angular.module('friendsApp')
  .factory('RegisteredUsers', function($resource) {
    return $resource('/api/allUsers/:name', { name: '@firstName'});
  });
