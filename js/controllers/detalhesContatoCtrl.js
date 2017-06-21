angular
  .module("listaTelefonica")
  .controller("detalhesContatoCtrl", detalhesContatoCtrl);


detalhesContatoCtrl.$inject = [
  '$scope',
  '$http',
  'contatosAPI',
  'serialGenerator',
  'operadoras'
];

function detalhesContatoCtrl($scope,$http,contatosAPI,serialGenerator,operadoras) {

  $scope.adicionarContato = function(contato) {
    contato.serial = serialGenerator.generate();
    contato.data = new Date;
    contatosAPI.saveContato(contato).then(function(response) {
      delete $scope.contato;
      $scope.contatoForm.$setPristine();
    }, function(response) {
      $scope.error = "Aconteceu um problema: " + response.status;
    });
  };

}
