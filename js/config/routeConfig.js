angular
  .module("listaTelefonica")
  .config(function($stateProvider, $urlRouterProvider, $locationProvider) {

    $stateProvider
      .state('index', {
        url: "/contatos",
        views: {
          'contatos': {
            templateUrl: 'view/contatos.html',
            controller: 'listaTelefonicaCtrl',
          }
        }
      })
      .state('route1', {
        url: "/novoContato",
        resolve: {
          operadoras: function(operadorasAPI) {
            return operadorasAPI.getOperadoras();
          }
        },
        views: {
          'contatos': {
            templateUrl: 'view/novoContato.html',
            controller: 'novoContatoCtrl',
          }
        }
      })
      .state('route2', {
        url: "/detalhesContato/:id",
        views: {
          'contatos': {
            templateUrl: 'view/detalhesContato.html',
            controller: 'detalhesContatoCtrl',
          }
        }
      });

    // $locationProvider.html5Mode(true);
    $urlRouterProvider.otherwise('/contatos');
  });
