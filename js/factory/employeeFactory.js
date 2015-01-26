app.factory("Employees", function () {

    var employees = [
        {
            firstname: "Homer",
            lastname: "Simpson",
            address: "742 Evergreen Terrace",
            zipcode: "00000",
            city: "Springfield",
            state: "None",
            phonenumber: "5555555",
            birthdate: "5/12/1955",
            workplace: "Power Plant",
            signature: "",
            id: 1
        },
        {
            firstname: "Marge",
            lastname: "Simpson",
            address: "742 Evergreen Terrace",
            zipcode: "00000",
            city: "Springfield",
            state: "None",
            phonenumber: "5555555",
            birthdate: "11/19/1957",
            workplace: "Other",
            signature: "",
            id: 2
        },
        {
            firstname: "Bart",
            lastname: "Simpson",
            address: "742 Evergreen Terrace",
            zipcode: "00000",
            city: "Springfield",
            state: "None",
            phonenumber: "5555555",
            birthdate: "5/2/1988",
            workplace: "Student",
            signature: "",
            id: 3
        },
        {
            firstname: "Lisa",
            lastname: "Simpson",
            address: "742 Evergreen Terrace",
            zipcode: "00000",
            city: "Springfield",
            state: "None",
            phonenumber: "5555555",
            birthdate: "1/3/1990",
            workplace: "Student",
            signature: "",
            id: 4
        },
        {
            firstname: "Maggie",
            lastname: "Simpson",
            address: "742 Evergreen Terrace",
            zipcode: "00000",
            city: "Springfield",
            state: "None",
            phonenumber: "5555555",
            birthdate: "4/3/1995",
            workplace: "Baby",
            signature: "",
            id: 5
        },
    ];

    return {
        all: function () {
            return employees;
        },
        get: function (id) {
            var result = null;
            angular.forEach(employees, function (p) {
                if (p.id == id) result = p;
            });
            return result;
        },
        set: function(value) {
            employees = value;
        },
        total: function () {
            return employees.length;
        }
    };
});