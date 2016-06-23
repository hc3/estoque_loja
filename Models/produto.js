/*jslint node: true */
/*jshint esversion: 6 */
'use strict';
var mongoose = require('mongoose');
const Schema = mongoose.Schema;
var produto = {

  codigoInterno: {
    type:Number,
    require:true
  },
  referencia: {
    type:String,
    require:true
  },
  descricao: {
    type:String,
    require:true
  },
  codigoDeBarras: {
    type:Number,
    require:true
  }

};

var produtoSchema = new Schema(produto);

module.exports = mongoose.model('Produto',produtoSchema);
