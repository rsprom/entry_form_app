app.factory("IndexDbService", function ($q) {
    var employeeList = [];
    var employeeDB = {};
    employeeDB.indexedDB = {};
    employeeDB.indexedDB.db = null;

    employeeDB.indexedDB.open = function () {
        var employees = [];
        console.log("Inside indexedDB.open");
        //indexedDB.deleteDatabase("employees");

        //Version set to greater than 2 or else onupgradeneeded() is never called on initial
        var version = 7;
        var request = indexedDB.open("employees", version);

        //Creates/updates database
        request.onupgradeneeded = function (e) {
            console.log("Inside indexedDB.onupgradeneeded");

            var db = e.target.result;

            e.target.transaction.onerror = employeeDB.indexedDB.onerror;

            if (db.objectStoreNames.contains("employee")) {
                db.deleteObjectStore("employee");
            }

            var objectStore = db.createObjectStore("employee", { keyPath: "id", autoIncrement: true });

            objectStore.createIndex("firstname", "firstname", { unique: false });
            objectStore.createIndex("lastname", "lastname", { unique: false });
            objectStore.createIndex("address", "address", { unique: false });
            objectStore.createIndex("zipcode", "zipcode", { unique: false });
            objectStore.createIndex("city", "city", { unique: false });
            objectStore.createIndex("state", "state", { unique: false });
            objectStore.createIndex("phonenumber", "phonenumber", { unique: false });
            objectStore.createIndex("birthdate", "birthdate", { unique: false });
            objectStore.createIndex("workplace", "workplace", { unique: false });
            objectStore.createIndex("signature", "signature", { unique: false });
        }

        request.onsuccess = function (e) {
            employeeDB.indexedDB.db = e.target.result;
            //employeeDB.indexedDB.addInitialData();
        }

        request.onerror = function (e) {
        }
    }

    employeeDB.indexedDB.addEmployee = function (employee) {
        var db = employeeDB.indexedDB.db;
        var trans = db.transaction(["employee"], "readwrite");
        var store = trans.objectStore("employee");
        var request = store.put({
            "firstname": employee.firstname,
            "lastname": employee.lastname,
            "address": employee.address,
            "zipcode": employee.zipcode,
            "city": employee.city,
            "state": employee.state,
            "phonenumber": employee.phonenumber,
            "birthdate": employee.birthdate,
            "workplace": employee.workplace,
            "signature": employee.signature
        });

        trans.oncomplete = function (e) {
            employeeDB.indexedDB.getAllEmployees();
        }

        request.onerror = function (e) {
            console.log(e.value);
        }
    }

    employeeDB.indexedDB.getAllEmployeeItems = function () {
        var db = employeeDB.indexedDB.db;
        var trans = db.transaction(["employee"], "readwrite");
        var store = trans.objectStore("employee");

        var keyRange = IDBKeyRange.lowerBound(0);
        var cursorRequest = store.openCursor(keyRange);

        cursorRequest.onsuccess = function (e) {
            var result = e.target.result;
            if (!!result == false)
                return;

            result.continue();
        }

        cursorRequest.onerror = employeeDB.indexedDB.onerror;
    }

    employeeDB.indexedDB.getAllEmployees = function () {
        var employees = [];
        var db = employeeDB.indexedDB.db;

        if (db == null) {
            var request = indexedDB.open("employees");

            request.onsuccess = function (e) {
                db = e.target.result;
                //employeeDB.indexedDB.getAllEmployees();
            }

            request.onerror = employeeDB.indexedDB.onerror;
        }
        else {
            var trans = db.transaction(["employee"], "readonly");
            var store = trans.objectStore("employee");

            store.openCursor().onsuccess = function (e) {
                var cursor = e.target.result;
                if (cursor) {
                    employees.push(cursor.value);
                    cursor.continue();
                }
                else {
                    console.log("Got all customers: " + employees);
                }

                employeeList = employees;
            };
        }
    }

    employeeDB.indexedDB.getEmployee = function (id) {
        var db = employeeDB.indexedDB.db;
        var trans = db.transaction(["employee"]);
        var store = trans.objectStore("employee");
        var request = store.get(id);

        request.onsuccess = function (e) {
            console.log("SUCCESS!");
            return request.result;
        };

        request.onerror = function (e) {
            console.log("FAILED!");
            console.log("No user found");
        };
    }

    employeeDB.indexedDB.getCount = function () {
        var db = employeeDB.indexedDB.db;
        var trans = db.transaction(["employee"], "readonly");
        var store = trans.objectStore("employee");

        var request = store.count();

        request.onsuccess = function (e) {
            var count = e.target.result;
            console.log("This is the count: " + count);
        }
    }

    employeeDB.indexedDB.addInitialData = function () {
        var db = employeeDB.indexedDB.db;
        var trans = db.transaction(["employee"], "readwrite");
        var store = trans.objectStore("employee");

        var homerSimpson = {
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
            id: 1,
        }

        var margeSimpson = {
            firstname: "Marge",
            lastname: "Simpson",
            address: "742 Evergreen Terrace",
            zipcode: "00000",
            city: "Springfield",
            state: "None",
            phonenumber: "5555555",
            birthdate: "2/13/1959",
            workplace: "Home",
            signature: "",
            id: 2,
        }

        var request = store.put(homerSimpson);
        var request2 = store.put(margeSimpson);

        trans.oncomplete = function (e) {
            var employees = [];
            employeeDB.indexedDB.getAllEmployees();
        }

        request.onerror = function (e) {

            console.log(e.value);
        }
    }

    return {
        open: function () {
            return employeeDB.indexedDB.open();
        },
        addEmployee: function (employee) {
            return employeeDB.indexedDB.addEmployee(employee);
        },
        getAllEmployeeItems: function () {
            return employeeDB.indexedDB.getAllEmployeeItems();
        },
        getAllEmployees: function () {
            employeeDB.indexedDB.getAllEmployees();
            return employeeList;

        },
        getEmployee: function (id) {
            return employeeDB.indexedDB.getEmployee(id);
        },
        getCount: function (id) {
            return employeeDB.indexedDB.getCount();
        }
    };
});