/*jslint node: true */
/*jshint esversion: 6 */
'use strict';

var Emitente = require('../Models/emitente.js');

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
      if(!err) {
        return res.send(emitente);
      } else {
        res.statusCode = 500;
        console.log("Erro interno",res.statusCode,err.message);
        return res.send({error:"erro o tentar buscar Emitente"});
      }
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


  var buscaEmitentePorId = function(req,res) {
    console.log("GET /api/buscaEmitente/:id");

    var id = req.params.id;
    return Emitente.findById({_id:id},function(err,emitente){
      if(!emitente) {
        res.statusCode = 404;
        return res.send({error:"Emitente não foi localizado"});
      }
      if(!err) {
        return res.send({status:"OK",emitente:emitente});
      } else {
        res.statusCode = 500;
        console.log("Erro interno",res.statusCode,err.message);
        return res.send({error:"erro ao tentar buscar emitente"});
      }
    });
  };

  var removeEmitente = function(req,res) {
    console.log("DELETE - /api/emitente/:id");

    var id = req.params.id;
    return Emitente.findById({_id:id},function(err,emitente){
      if(!emitente) {
        res.statusCode = 404;
        return res.send({error:"Emitente não foi localizado!"});
      }
      return emitente.remove(function(err) {
        if(!err) {
          console.log("Emitente removido com sucesso!");
          return res.send({status:"OK",emitente:emitente});
        }
        else {
          res.statusCode = 500;
          console.log("Erro ao tentar remover",res.statusCode,err.message);
          return res.send({error:"erro no servidor"});
        }
      });
    });
  };

  var adicionaEmitente = function(req,res) {
    console.log("POST - /api/emitente");

    var emitente = new Emitente(req.body);
    emitente.save(function(err) {
      if(err) {
        console.log("Erro ao tentar salvar"+err);
        res.send({error:err});
      }
      else {
        console.log("Emitente cadastrado com sucesso!");
        res.send({status:"OK",emitente:emitente});
      }
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
