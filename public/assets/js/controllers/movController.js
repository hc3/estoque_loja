/*jslint node: true */
/*jshint esversion: 6 */

angular.module("loja")
  .controller("MovController",MovController);

  function MovController(MovService,ProdutoService,EmitenteService) {
    var vm = this;

    vm.titulo = "";
    vm.movimentacoes = [];
    vm.produtos = [];
    vm.emitentes = [];

    vm.cadastrarEntrada = cadastrarEntrada;
    vm.cadastrarSaida = cadastrarSaida;
    vm.listarTodos = listarTodos;
    vm.remover = remover;

    vm.resetEntrada = resetEntrada;
    vm.resetSaida = resetSaida;

    function resetEntrada(form) {
      if(form) {
        form.$setPristine();
        form.$setUntouched();
        delete vm.entrada;
      }
    }

    function resetSaida(form) {
      if(form) {
        form.$setPristine();
        form.$setUntouched();
        delete vm.saida;
      }
    }

    function listarTodos() {
      MovService.listarTodos()
      .success(function(data) {
        vm.movimentacoes = data;
      })
      .error(function(data) {
        console.log(data);
      });
    }

    function listarProdutos() {
      ProdutoService.listarTodos()
      .success(function(data){
        vm.produtos = data;
      })
      .error(function(data){
        console.log(data);
      });
    }

    function listarEmitentes() {
      EmitenteService.listarTodos()
      .success(function(data){
        vm.emitentes = data;
      })
      .error(function(data) {
        console.log(data);
      });
    }

    function cadastrarEntrada(mov,form) {
      mov.dataMov = new Date();
      mov.tipoMov = "ENTRADA";
      MovService.cadastrar(mov)
      .success(function(data){
        resetEntrada(form);
        listarTodos();
      })
      .error(function(data){
        console.log(data);
      });
    }

    function cadastrarSaida(mov,form) {
      mov.dataMov = new Date();
      mov.tipoMov = "SAIDA";
      MovService.cadastrar(mov)
      .success(function(data){
        resetSaida(form);
        listarTodos();
      })
      .error(function(data){
        console.log(data);
      });
    }

    function remover(mov) {
      MovService.remover(mov)
      .success(function(data) {
        console.log("Produto removido com sucesso!"+data);
        listarTodos();
      })
      .error(function(data) {
        console.log("Erro ao remover",data);
      });
    }

    listarProdutos();
    listarEmitentes();
    listarTodos();
  }
