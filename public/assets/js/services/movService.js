/*jslint node: true */
/*jshint esversion: 6 */

'use strict';

angular.module('loja')
  .service('MovService',MovService);

  function MovService($http) {
    const url = "/api/mov/";

    this.cadastrar = function(mov) {
      return $http.post(url,mov);
    };

    this.remover = function(mov) {
      return $http.delete(url+mov._id,{params:{id:mov._id}});
    };

    this.listarTodos = function() {
      return $http.get(url);
    };

  }
