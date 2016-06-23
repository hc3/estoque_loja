/*jslint node: true */
/*jshint esversion: 6 */

'use strict';

angular.module('loja')
  .service('ProdutoService',ProdutoService);

  function ProdutoService($http) {    

    const url = "/api/produto/";

    this.cadastrar = function(produto) {
      return $http.post(url,produto);
    };

    this.remover = function(produto) {
      return $http.delete(url+produto._id,{params:{id:produto._id}});
    };

    this.listarTodos = function() {
      return $http.get(url);
    };

  }
