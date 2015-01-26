app.controller("EntryFormCtrl", ['$scope', '$location', 'Employees',
    function ($scope, $location, Employees) {
        $scope.employees = Employees.all();

        $scope.addEmployee = function () {

            $scope.employees.push({
                firstname:  $scope.employee.firstname,
                lastname: $scope.employee.lastname,
                address: $scope.employee.address,
                zipcode: $scope.employee.zipcode,
                city: $scope.employee.city,
                state: $scope.employee.state,
                phonenumber: $scope.employee.phonenumber,
                birthdate: $scope.employee.birthdate,
                workplace: $scope.employee.workplace,
                id: Employees.total() + 1
            });

            Employees.set($scope.employees);

            $location.path('/employees');
            $location.replace();
        };

        $scope.clearFields = function () {
            $scope.employee.firstname = null;
            $scope.employee.lastname = null;
            $scope.employee.address = null;
            $scope.employee.zipcode = null;
            $scope.employee.city = null;
            $scope.employee.state = null;
            $scope.employee.phonenumber = null;
            $scope.employee.birthdate = null;
            $scope.employee.workplace = null;
        };
}]);