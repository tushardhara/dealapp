app.factory('moduleFactory', ['$http', '$q', function ($http, $q) {
    var moduledata = {};
    moduledata.getdata = function () {
        var deferred = $q.defer();
        $http.get('/read')
            .success(function (data, status, headers, config) {
                deferred.resolve(data);
            })
            .error(function (data, status, headers, config) {
                deferred.reject('Network error: ' + status);
            });
        return deferred.promise;
    }
    moduledata.editdata = function (JSONDATA) {
        var deferred = $q.defer();

        $http.post('/edit',JSONDATA)
            .success(function (data, status, headers, config) {
                deferred.resolve(data);
            })
            .error(function (data, status, headers, config) {
                deferred.reject('Network error: ' + status);
            });
        return deferred.promise;
    }
    moduledata.deletedata = function (JSONDATA) {
        var deferred = $q.defer();

        $http.post('/delete',JSONDATA)
            .success(function (data, status, headers, config) {
                deferred.resolve(data);
            })
            .error(function (data, status, headers, config) {
                deferred.reject('Network error: ' + status);
            });
        return deferred.promise;
    }
    moduledata.createdata = function (JSONDATA) {
        var deferred = $q.defer();

        $http.post('/create',JSONDATA)
            .success(function (data, status, headers, config) {
                deferred.resolve(data);
            })
            .error(function (data, status, headers, config) {
                deferred.reject('Network error: ' + status);
            });
        return deferred.promise;
    }
    return moduledata;
}]);