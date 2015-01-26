var app = angular.module("MyApp", ['ngRoute', 'ui.bootstrap', 'ngAnimate'])

app.config(function ($routeProvider, $locationProvider) {
    $locationProvider.hashPrefix("!"),
    $routeProvider.
        when("/",
            {
                templateUrl: "partials/login.html",
                controller: "LoginCtrl"
            }).
        when("/employees",
            {
                templateUrl: "partials/employees.html",
                controller: "EmployeeIndexCtrl"
            }).
        when("/employees/:id",
            {
                templateUrl: "partials/employee_details.html",
                controller: "EmployeeDetailCtrl"
            }).
        when("/sketchtest",
            {
                templateUrl: "partials/sketchpad.html",
                controller: "SketchPadCtrl"
            }).
        otherwise({ redirectTo: "/" });
})

