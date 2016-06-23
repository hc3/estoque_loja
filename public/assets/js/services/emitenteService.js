/*jslint node: true */
/*jshint esversion: 6 */

'use strict';

angular.module('loja')
  .service('EmitenteService',EmitenteService);

  function EmitenteService($http) {

    const url = "/api/emitente/";
    const urlSaldo = "/api/calculaSaldo/";


    this.cadastrar = function(emitente) {
      return $http.post(url,emitente);
    };

    this.remover = function(emitente) {
      return $http.delete(url+emitente._id,{params:{id:emitente._id}});
    };

    this.listarTodos = function() {
      return $http.get(url);
    };

    this.calculaSaldo = function(produto) {
      return $http.get(urlSaldo+produto._id,{params:{id:produto._id}});
    };

  }
