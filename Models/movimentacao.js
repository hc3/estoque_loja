/*jslint node: true */
/*jshint esversion: 6 */
'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var movimentacao = {

  produto : {
    type:Schema.Types.ObjectId,
    ref:'Produto'
  },
  dataMov : {
    type:Date
  },
  quantidade: {
    type:Number,
    require:true
  },
  emitente : {
    type:Schema.Types.ObjectId,
    ref:'Emitente'
  },
  tipoMov : {
    type:String,
    require:true
  }
};

const movSchema = new Schema(movimentacao);

module.exports = mongoose.model('Movimentacao',movSchema);
