app.controller("MainCtrl", function ($scope, $modal, $rootScope, $location, User) {
    $scope.page = {};
    $scope.page.current = 0;
    $scope.menuClass = function (page) {
        var current = $location.path().substring(1);
        return page === current ? "active" : "";
    }

    $scope.currentUser = User.currentUser();

    $scope.logout = function () {
        User.logout();
    };

    $scope.toggleNav = function () {
        if ($('#site-wrapper').hasClass('show-nav')) {
            // Do things on Nav Close
            $('#site-wrapper').removeClass('show-nav');
        } else {
            // Do things on Nav Open
            $('#site-wrapper').addClass('show-nav');
        }
    };

    $scope.$watch(User.isLoggedIn, function (isLoggedIn) {
        console.log("Watching....IsLoggedIn changed.")
        $scope.isLoggedIn = isLoggedIn;
        $scope.currentUser = User.currentUser();
    });
});