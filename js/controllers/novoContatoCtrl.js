angular
  .module("listaTelefonica")
  .controller("novoContatoCtrl", novoContatoCtrl);


novoContatoCtrl.$inject = [
  '$scope',
  '$http',
  'contatosAPI',
  'serialGenerator',
  'operadoras'
];

function novoContatoCtrl($scope,$http,contatosAPI,serialGenerator,operadoras) {

  $scope.app = "Lista Telefonica";
  $scope.error = "";
  $scope.operadoras = operadoras.data;
  
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
