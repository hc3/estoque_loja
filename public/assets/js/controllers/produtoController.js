/*jslint node: true */
/*jshint esversion: 6 */

'use strict';

angular.module("loja")
  .controller("ProdutoController",ProdutoController);

  function ProdutoController(ProdutoService) {
    var vm = this;

    vm.titulo = "";
    vm.produtos = [];

    vm.cadastrar = cadastrar;
    vm.listarTodos = listarTodos;
    vm.remover = remover;

    vm.reset = reset;

    function reset(form) {
      if(form) {
        form.$setPristine();
        form.$setUntouched();
        delete vm.produto;
      }
    }

    function listarTodos() {
      ProdutoService.listarTodos()
      .success(function(data) {
        vm.produtos = data;
      })
      .error(function(data) {
        console.log(data);
      });
    }

    function cadastrar(produto,form) {
      ProdutoService.cadastrar(produto)
      .success(function(data) {
        reset(form);
        listarTodos();
      })
      .error(function(data){
        console.log(data);
      });
    }

    function remover(produto) {
      ProdutoService.remover(produto)
      .success(function(data) {
        console.log("Produto removido com sucesso!"+data);
        listarTodos();
      })
      .error(function(data) {
        console.log("erro ao remover",data);
      });
    }

    listarTodos();
  }
