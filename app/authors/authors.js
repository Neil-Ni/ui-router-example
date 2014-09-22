angular.module('uiRouterSample.authors', [
  'ui.router'
])
  
.config(
  [          '$stateProvider', '$urlRouterProvider',
    function ($stateProvider,   $urlRouterProvider) {
      $stateProvider
        .state('authors', {
          abstract: true,
          url: '/authors',
          templateUrl: 'app/authors/authors.html',
          resolve: {
            authors: ['authors',
              function( authors){
                return authors.all();
              }]
          },
          controller: ['$scope', '$state', 'authors', 'utils',
            function (  $scope,   $state,   authors,   utils) {
              $scope.authors = authors;

              $scope.goToRandom = function () {
                var randId = utils.newRandomKey($scope.authors, "id", $state.params.authorId);
                $state.go('authors.detail', { authorId: randId });
              };
            }]
        })
        .state('authors.index', {
          url: '',
          templateUrl: 'app/authors/authors.index.html'
        })
        .state('authors.detail', {
          abstract: true,
          url: '/{authorId:[0-9]{1,4}}',
          template: '<div ui-view></div>'
        })
        .state('authors.detail.index', {
          url: '',
          views: {
            '': {
              templateUrl: 'app/authors/authors.detail.html',
              controller: ['$scope', '$stateParams', 'utils',
                function (  $scope,   $stateParams,   utils) {
                  $scope.author = utils.findById($scope.authors, $stateParams.authorId);
                }]
            },
            'hint@': {
              template: 'This is authors.detail populating the "hint" ui-view'
            },
            'menuTip': {
              templateProvider: ['$stateParams',
                function (        $stateParams) {
                  return '<hr><small class="muted">author ID: ' + $stateParams.authorId + '</small>';
                }]
            }
          }
        })
        .state('authors.detail.books', {
          abstract: true,
          url: '/books',
          template: '<div ui-view></div>'
        })
        .state('authors.detail.books.index', {
          url: '',
          templateUrl: 'app/authors/authors.detail.books.html',
          controller: ['$scope', '$stateParams', '$state', 'utils',
            function (  $scope,   $stateParams,   $state,   utils) {
              $scope.author = utils.findById($scope.authors, $stateParams.authorId);
            }]
        })
        .state('authors.detail.books.detail', {
          abstract: true,
          url: '/{bookId:[0-9]{1,4}}',
          template: '<div ui-view></div>'
        })
        .state('authors.detail.books.detail.index', {
          url: '',
          templateUrl: 'app/authors/authors.detail.books.detail.html',
          controller: ['$scope', '$stateParams', '$state', 'utils',
            function (  $scope,   $stateParams,   $state,   utils) {
              $scope.author = utils.findById($scope.authors, $stateParams.authorId);
              $scope.book = utils.findById($scope.author.books, $stateParams.bookId);
            }]
        })
        .state('authors.detail.item', {
          url: '/item/:itemId',
          views: {
            '': {
              templateUrl: 'app/authors/authors.detail.item.html',
              controller: ['$scope', '$stateParams', '$state', 'utils',
                function (  $scope,   $stateParams,   $state,   utils) {
                  $scope.author = utils.findById($scope.authors, $stateParams.authorId);
                  $scope.item = utils.findById($scope.author.items, $stateParams.itemId);

                  $scope.edit = function () {
                    $state.go('.edit', $stateParams);
                  };
                }]
            },
            'hint@': {
              template: ' This is authors.detail.item overriding the "hint" ui-view'
            }
          }
        })
        .state('authors.detail.item.edit', {
          views: {
            '@authors.detail': {
              templateUrl: 'app/authors/authors.detail.item.edit.html',
              controller: ['$scope', '$stateParams', '$state', 'utils',
                function (  $scope,   $stateParams,   $state,   utils) {
                  $scope.author = utils.findById($scope.authors, $stateParams.authorId);
                  $scope.item = utils.findById($scope.author.items, $stateParams.itemId);
                  $scope.done = function () {
                    $state.go('^', $stateParams);
                  };
                }]
            }
          }
        });
    }
  ]
);
