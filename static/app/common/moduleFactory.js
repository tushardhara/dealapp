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
    return moduledata;
}]);