angular
  .module("listaTelefonica")
  .controller("listaTelefonicaCtrl", listaTelefonicaCtrl);


listaTelefonicaCtrl.$inject = [
  '$scope',
  '$http',
  'contatosAPI',
  'operadorasAPI',
  'serialGenerator'
];

function listaTelefonicaCtrl($scope,$http,contatosAPI,operadorasAPI,serialGenerator) {

  $scope.app = "Lista Telefonica";
  $scope.contatos = [];
  $scope.error = "";


  var carregarContatos = function() {
    contatosAPI.getContatos().then(function(response) {
      $scope.contatos = response.data;
    }, function(response) {
      $scope.error = "Não foi possivel carregar os dados!";
    });
  };

  var carregarOperadoras = function() {
    operadorasAPI.getOperadoras().then(function(response) {
      $scope.operadoras = response.data;
    } );
  }

  $scope.adicionarContato = function(contato) {
    contato.serial = serialGenerator.generate();
    contato.data = new Date;
    contatosAPI.saveContato(contato).then(function(response) {
      delete $scope.contato;
      $scope.contatoForm.$setPristine();
      carregarContatos();
    }, function(response) {
      $scope.error = "Aconteceu um problema: " + response.status;
    });
  };
  $scope.apagarContatos = function(contatos) {
    $scope.contatos = contatos.filter(function(contato) {
      if (contato.selecionado) return contato;
    });
  }
  $scope.isContatoSelecionado = function(contatos) {
    return contatos.some(function(contato) {
      return contato.selecionado;
    });
  }
  $scope.ordenarPor = function(campo) {
    $scope.criterioDeOrdenacao = campo;
    $scope.direcaoDaOrdenacao = !$scope.direcaoDaOrdenacao;
  }
  carregarContatos();
  carregarOperadoras();
}
