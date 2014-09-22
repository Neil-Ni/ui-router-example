angular.module('uiRouterSample.authors.service', [

])
.factory('authors', ['$http', function ($http, utils) {
  var path = 'assets/authors.json';
  var authors = $http.get(path).then(function (resp) {
    return resp.data.authors;
  });

  var factory = {};
  factory.all = function () {
    return authors;
  };
  factory.get = function (id) {
    return authors.then(function(){
      return utils.findById(authors, id);
    })
  };
  return factory;
}]);