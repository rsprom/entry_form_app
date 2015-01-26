app.controller("LoginCtrl", function ($scope, $rootScope, $routeParams, $location, User, IndexDbService) {
    $scope.pageClass = 'page-login';

    $scope.loginCheck = function () {
        User.login($scope.user);
        //IndexDbService.open();
    };
});