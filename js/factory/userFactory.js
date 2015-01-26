app.factory("User", function ($location) {

    var currentUser =
        {
            username: "",
            password: "",
            isLoggedIn: false,
        };

    return {
        set: function (value) {
            currentUser = value;
        },
        login: function (user) {
            currentUser = user;
            currentUser.isLoggedIn = true;

            $location.path('/employees');
            $location.replace();
        },
        logout: function () {
            currentUser.username = "";
            currentUser.password = "";
            currentUser.isLoggedIn = false;

            $location.path('/');
            $location.replace();
        },
        isLoggedIn: function() {
            return currentUser.isLoggedIn;
        },
        currentUser: function () {
            return currentUser;
        }
    };
});