app.controller("EmployeeIndexCtrl", function ($scope, $modal, $rootScope, Employees, User, IndexDbService) {
    //// FOR INDEXEDDB
    //$scope.employeeHomer = {
    //    firstname: "Homer",
    //    lastname: "Simpson",
    //    address: "742 Evergreen Terrace",
    //    zipcode: "00000",
    //    city: "Springfield",
    //    state: "None",
    //    phonenumber: "5555555",
    //    birthdate: "5/12/1955",
    //    workplace: "Power Plant",
    //    signature: "",
    //};

    //$scope.addperson = function () {
    //    IndexDbService.addEmployee($scope.employeeHomer);
    //}

    //$scope.getcount = function () {
    //    IndexDbService.getCount();
    //}

    //$scope.getall = function () {
    //    $scope.employees = IndexDbService.getAllEmployees();
    //    console.log($scope.employees.length);
    //}

    //$scope.$watch(IndexDbService.getAllEmployees, function (getAllEmployees) {
    //    console.log("Watching....getAllEmployees changed.")
    //    $scope.employees = getAllEmployees;
    //});
    //// FOR INDEXEDDB

    $scope.employees = Employees.all();
    $scope.pageClass = 'page-index';

    $scope.open = function (size) {
        console.log("Inside open() function")

        var modalInstance = $modal.open({
            templateUrl: 'partials/entry_form_modal.html',
            controller: 'EntryFormModalInstanceCtrl',
            windowClass: 'app-modal-window',
            backdrop: true,
            size: size,
            resolve: {
                action: function () {
                    return "add";
                },
                id: function () {
                    return null;
                }
            }
        });
    }

});

app.controller("EmployeeDetailCtrl", function ($scope, $rootScope, $routeParams, $location, $modal, Employees) {
    $scope.pageClass = 'page-detail';
    $scope.employee = Employees.get($routeParams.id);


    document.getElementById('signatureImage').src = $scope.employee.signature;

    $scope.open = function (size) {
        console.log("Inside open() function")

        var modalInstance = $modal.open({
            templateUrl: 'partials/entry_form_modal.html',
            controller: 'EntryFormModalInstanceCtrl',
            windowClass: 'app-modal-window',
            backdrop: true,
            size: size,
            resolve: {
                action: function () {
                    return "edit";
                },
                id: function () {
                    return $routeParams.id;
                }
            }
        });
    }

    $scope.goBack = function () {
        $location.path('/employees');
        $location.replace();
    }
});

app.controller("EntryFormModalInstanceCtrl", function ($scope, $modalInstance, action, id, Employees) {
    $scope.employees = Employees.all();

    // Signature stuff
    if (id == null) {
        $scope.employee = {};
        $scope.existingSignature = false;
        $scope.newSignature = true;


    }
    else {
        $scope.employee = Employees.get(id);
        $scope.existingSignature = true;
        $scope.newSignature = false;
    }

    $scope.submit = function () {
        if (action == "add") {
            console.log("Adding item");
            $scope.addEmployee();
        }
        else {
            console.log("Editing item");
            $scope.editEmployee();
        }

        $modalInstance.dismiss('cancel');
    }

    $scope.cancel = function () {
        if (action == "add")
        {
            $scope.employee = null;
        }
        $modalInstance.dismiss('cancel');
    }

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

    $scope.addEmployee = function () {
        //$scope.dataUrl = document.getElementById('signature-pad').toDataURL('image/png');

        $scope.employees.push({
            firstname: $scope.employee.firstname,
            lastname: $scope.employee.lastname,
            address: $scope.employee.address,
            zipcode: $scope.employee.zipcode,
            city: $scope.employee.city,
            state: $scope.employee.state,
            phonenumber: $scope.employee.phonenumber,
            birthdate: $scope.employee.birthdate,
            workplace: $scope.employee.workplace,
            signature: $scope.dataUrl,
            id: Employees.total() + 1
        });

        Employees.set($scope.employees);


        //// FOR INDEXEDDB
        //$scope.employee.signature = $scope.dataUrl;

        //IndexDbService.addEmployee($scope.employee);
        //// FOR INDEXEDDB
    };

    $scope.editEmployee = function () {

        //Update new signature
        document.getElementById('signatureImage').src = document.getElementById('signature-pad').toDataURL('image/png');
        $scope.employee.signature = document.getElementById('signature-pad').toDataURL('image/png');

        for (var i = 0; i < $scope.employees.length; i++) {
            if ($scope.employees[i].id === $scope.employee.id) {
                $scope.employees[i] = $scope.employee;
            }
        }

        Employees.set($scope.employees);
    };
});