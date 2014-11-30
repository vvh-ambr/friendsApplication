angular.module('friendsApp')
  .controller('ProfileController', function($scope, $rootScope, RegisteredUsers, $routeParams, $http, $location) {
    $rootScope.PAGE = 'profile';

    $scope.profileData = RegisteredUsers.get({name: $routeParams.name});

    $scope.addFriend = function() {
      // $http.put('/allUsers/' + $routeParams.name, { invitationFrom: 'Elle' }).
      //   success(function(data, status, headers, config) {
      //     // this callback will be called asynchronously
      //     // when the response is available
      //
      //   }).
      //   error(function(data, status, headers, config) {
      //     // called asynchronously if an error occurs
      //     // or server returns response with an error status.
      //   });
      $location.url('/search');
    };

    $scope.deleteFriend = function() {
      $location.url('/search');
    };

  })
  .controller('SearchController', function($scope, $rootScope, RegisteredUsers, $location) {
    $rootScope.PAGE = 'search';

    $scope.users = RegisteredUsers.query();
    $scope.fields = ['firstName', 'lastName'];

    //  $scope.query = 'something';

    $scope.sort = function(field) {
      $scope.sort.field = field;
      $scope.sort.order = !$scope.sort.order;

    };

    $scope.sort.field = 'firstName';
    $scope.sort.order = false;

    $scope.show = function(id) {
      $location.url('/contact/' + id);
    };
  })
