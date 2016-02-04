angular.module('hardToReach')
  .config(function ($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/')
    $stateProvider
      .state('root', {
        abstract: true,
        views   : {
          root: {
            templateUrl: 'app/index.html'
          }
        }
      })
      .state('index', {
        parent: 'root',
        abstract: true,
        views: {
          content: {}
        }
      })
  })
