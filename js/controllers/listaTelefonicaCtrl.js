angular
  .module("listaTelefonica")
  .controller("listaTelefonicaCtrl", listaTelefonicaCtrl);


listaTelefonicaCtrl.$inject = [
  '$scope',
  '$http',
  'contatosAPI',
  'operadorasAPI'
];

function listaTelefonicaCtrl($scope,$http,contatosAPI) {

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

  $scope.apagarContatos = function(contatos) {
    $scope.contatos = contatos.filter(function(contato) {
      if (!contato.selecionado) return contato;
    });
  };

  $scope.isContatoSelecionado = function(contatos) {
    return contatos.some(function(contato) {
      return contato.selecionado;
    });
  };

  $scope.ordenarPor = function(campo) {
    $scope.criterioDeOrdenacao = campo;
    $scope.direcaoDaOrdenacao = !$scope.direcaoDaOrdenacao;
  };

  carregarContatos();
}
