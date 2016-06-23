/*jslint node: true */
/*jshint esversion: 6 */

'use strict';

angular.module('loja')
  .controller('EstoqueController',EstoqueController);

  function EstoqueController(EmitenteService,ProdutoService) {
    var vm = this;

    vm.titulo = "";
    vm.produtos = [];
    vm.saldo = 0;
    vm.calculaSaldo = calculaSaldo;

    function carregaProdutos() {
      ProdutoService.listarTodos()
      .success(function(data) {
        vm.produtos = data;
      })
      .error(function(data) {
        console.log(data);
      });
    }

    function calculaSaldo(produto) {
      EmitenteService.calculaSaldo(produto)
      .success(function(data) {
        vm.saldo = data;
      })
      .error(function(data) {
        console.log(data);
      });
    }

    carregaProdutos();
  }
