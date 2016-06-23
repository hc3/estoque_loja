/*jslint node: true */
/*jshint esversion: 6 */

'use strict';

angular.module("loja")
  .controller("EmitenteController",EmitenteController);

  function EmitenteController(EmitenteService) {
    var vm = this;

    vm.titulo = "";
    vm.emitentes = [];

    vm.cadastrar = cadastrar;
    vm.listarTodos = listarTodos;
    vm.remover = remover;

    vm.reset = reset;

    function reset(form) {
      if(form) {
        form.$setPristine();
        form.$setUntouched();
        delete vm.emitente;
      }
    }

    function listarTodos() {
      EmitenteService.listarTodos()
      .success(function(data) {
        vm.emitentes = data;
      })
      .error(function(data) {
        console.log(data);
      });
    }

    function cadastrar(emitente,form) {
      EmitenteService.cadastrar(emitente)
      .success(function(data){
        reset(form);
        listarTodos();
      })
      .error(function(data) {
        console.log(data);
      });
    }

    function remover(emitente) {
      EmitenteService.remover(emitente)
      .success(function(data) {
        console.log("Produto removido com sucesso!"+data);
        listarTodos();
      })
      .error(function(data) {
        console.log("Erro ao remover",data);
      });
    }

    listarTodos();
  }
