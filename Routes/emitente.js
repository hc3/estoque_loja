/*jslint node: true */
/*jshint esversion: 6 */
'use strict';

var Emitente = require('../Models/emitente.js');
var callback = require('./callback-express.js');

module.exports = function(app) {

  var consultaEntradas = function(req,res) {
    console.log("GET - /api/entradas");

    return Emitente.find(function(err,emitente) {
      if(!err) {
        emitente.forEach(function(element,index) {
          console.log(element.estoqueFiscal);
        });
      } else {

      }
    });
  };


  var buscaEmitente = function(req,res) {
    console.log("GET - /api/BuscaEmitente");

    return Emitente.find(function(err,emitente){
      callback.callbackFind(err,emitente,res);
    });
  };


  var buscaEmitentePopulate = function(req,res) {
    console.log("GET - /api/buscaEmitentePopulate");

    var id = req.params.id;
    return Emitente
            .find()
            .populate('movimentacoes')
            .exec(function(err,emitente) {
              if(!emitente) {
                res.statusCode = 404;
                return res.send({error:"Emitente não foi localizado"});
              }
              if(!err) {
                return res.send(emitente);
              } else {
                res.statusCode = 500;
                console.log("Erro interno",res.statusCode,err.message);
                return res.send({error:"erro ao tentar buscar emitente"});
              }
            });
  };

  var calculaSaldo = function(req,res) {
    console.log("GET - /api/calculaSaldo/:id");

    var id = req.params.id;
    var entradas = 0;
    var saidas = 0;
    var saldo = 0;
    return Emitente
            .find()
            .populate('movimentacoes')
            .exec(function(err,emitente) {
              if(!emitente) {
                res.statusCode = 404;
                return res.send({error:"Emitente não foi localizado"});
              }
              if(!err) {
                emitente.forEach(function(emit,index) {
                  emit.movimentacoes.forEach(function(mov,index){
                    if(mov.produto == id) {
                      if(mov.tipoMov == "ENTRADA"){
                        entradas = mov.quantidade + entradas;
                      }
                      if(mov.tipoMov == "SAIDA") {
                        saidas = mov.quantidade + saidas;
                      }
                    }
                  });
                });
                saldo = entradas - saidas;
                return res.send({saldo});
                //return console.log(emitente);//es.send(emitente);
              } else {
                res.statusCode = 500;
                console.log("Erro interno",res.statusCode,err.message);
                return res.send({error:"erro ao tentar buscar emitente"});
              }
            });
  };


  var buscaEmitentePorId = (req,res) => {
    console.log("GET /api/buscaEmitente/:id");

    var id = req.params.id;
    return Emitente.findById({_id:id},(err,emitente) => {
      callback.callbackFindById(err,emitente,res);
    });
  };

  var removeEmitente = (req,res) => {
    console.log("DELETE - /api/emitente/:id");

    var id = req.params.id;
    return Emitente.findById({_id:id},(err,emitente) =>{
      if(!emitente) {
        res.statusCode = 404;
        return res.send({error:"Emitente não foi localizado!"});
      }
      return emitente.remove((err) => {
        callback.callbackRemove(err,res);
      });
    });
  };

  var adicionaEmitente = function(req,res) {
    console.log("POST - /api/emitente");

    var emitente = new Emitente(req.body);
    emitente.save(function(err) {
      callback.callbackSave(err,res);
    });
  };

  app.post("/api/emitente",adicionaEmitente);
  app.delete("/api/emitente/:id",removeEmitente);
  app.get("/api/emitente",buscaEmitente);
  app.get("/api/emitenteAll",buscaEmitentePopulate);
  app.get("/api/calculaSaldo/:id",calculaSaldo);
  app.get("/api/entradas",consultaEntradas);
  app.get("/api/emitente/:id",buscaEmitentePorId);

};
