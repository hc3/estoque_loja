/*jslint node: true */
/*jshint esversion: 6 */
'use strict';

var mongoose = require('mongoose');
const Schema = mongoose.Schema;

var emitente = {
   razao : {
     type:String
   },
   fantasia : {
     type:String
   },
   codigoInterno: {
     type:Number
   },
   cnpj : {
     type:Number
   },
   endereco : {
     rua: {
       type:String
     },
     telefone: {
       type:String
     },
     bairro : {
       type:String
     },
     numero : {
       type:String
     },
     cidade : {
       type:String
     },
     uf : {
       type:String
     }
   },
   movimentacoes : [{
       type:Schema.Types.ObjectId,
       ref:'Movimentacao'
   }]
};
const emitenteSchema = new Schema(emitente);
module.exports = mongoose.model('Emitente',emitenteSchema);
