var app = angular.module('communityCasts', ['ngMaterial', 'ui.router', 'config', 'smoothScroll'])
  .config(['$stateProvider', '$urlRouterProvider', '$locationProvider', function($stateProvider, $urlRouterProvider, $locationProvider) {
    $locationProvider.html5Mode(true);
    $urlRouterProvider.otherwise('/');
    $stateProvider.state('about', {
      url: '/about',
      templateUrl: '/app/views/_about.html',
      data : {
        pageTitle: 'About Community Casts'
      }
    });
    $stateProvider.state('submit', {
      url: '/submit',
      templateUrl: '/app/views/_submit.html',
      controller: 'submitController',
      data : {
        pageTitle: 'Submit a screencast'
      }
    });
    $stateProvider.state('home', {
      url: '/:tagged?',
      templateUrl: '/app/views/_screencasts.html',
      controller: 'screencastsController',
      params: {
        sort: 'popular',
        tagged: '',
      },
      data : {
        pageTitle: 'Community Casts'
      }
    });
  }])
  .run(['$rootScope', '$state', '$stateParams', function ($rootScope, $state, $stateParams) {
    $rootScope.$state = $state;
    $rootScope.$stateParams = $stateParams;
  }]);
