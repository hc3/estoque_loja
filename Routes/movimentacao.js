/*jslint node: true */
/*jshint esversion: 6 */
'use strict';

var Mov = require('../Models/movimentacao.js');
var Emitente = require('../Models/emitente.js');

module.exports = function(app) {

  var buscaMov = function(req,res) {
    console.log('GET - /api/buscaMov');

    return Mov.find(function(err,mov) {
      if(!err) {
        return res.send(mov);
      } else {
        res.statusCode = 500;
        console.log("Erro interno!",res.statusCode,err.message);
        return res.send({error:"erro ao tentar buscar produto"});
      }
    });
  };

  var buscaMovPopulada = function(req,res) {
    console.log('GET - /api/buscaMovPopulada');

    return Mov.find()
      .populate('produto')
      .populate('emitente')
      .exec(function(err,mov) {
        if(err) return console.log(err);
        return res.send(mov);
      });

  };

  var buscaSaldoEstoqueFiscal = function(req,res) {
    console.log('GET - /api/saldoFisico');
    var entradas = 0;
    var saidas = 0;
    var saldo = 0;

    return Mov.find()
      .populate('produto')
      .populate('emitente')
      .exec(function(err,mov) {
        mov.forEach(function(element,index) {

          if(element.produto._id == req.params.id) {
              if(element.tipoMov == "ENTRADA") {
                entradas = element.quantidade + entradas;
              }
              if(element.tipoMov == "SAIDA") {
                saidas = element.quantidade + saidas;
              }
          }

        });
        saldo = entradas - saidas;
        if(err) return console.log(err);
        return res.send({saldo});
      });
  };


  var buscaMovPorId = function(req,res) {
    console.log('GET - /api/buscaMov/:id');

    var id = req.params.id;
    return Mov.findById({_id:id},function(err,mov) {
      if(!mov) {
        res.statusCode = 404;
        return res.send({error:"Movimentação não foi localizada!"});
      }
      if(!err) {
        return res.send({status:"OK",mov:mov});
      }
      else {
        res.statusCode = 500;
        console.log("Erro interno",res.statusCode,err.message);
        return res.send({error:"Erro ao tentar buscar o produto"});
      }
    });
  };

  var removerMov = function(req,res) {
    console.log('DELETE - /api/mov/:id');

    var id = req.params.id;
    return Mov.findById({_id:id},function(err,mov) {
      if(!mov) {
        res.statusCode = 404;
        return res.send({error:"Movimentação não foi localizada"});
      }
      return mov.remove(function(err) {
        if(!err) {
          console.log("Movimentação removida com sucesso!");
          return res.send({status:"OK",mov:mov});
        }
        else {
          res.statusCode = 500;
          console.log("Erro ao tentar remover",res.statusCode);
          return res.send({error:"Erro no servidor"});
        }
      });
    });
  };

  var adicionarMov = function(req,res) {
    console.log("PUT - /api/mov");
    console.log("vem da req",req.body.produto);
    /**
    -movimentação precisa de uma validação para verificar se o tipo é entrada ou saida por que
    se não for nem um nem outro deve exibir um erro.
    -podemos validar no front também com o angular.


    var buscaSaldoEstoqueFiscal = function(req,res) {
      console.log('GET - /api/buscaMovPopulada');
      var entradas = 0;
      var saidas = 0;
      var saldo = 0;

      return Mov.find()
        .populate('produto')
        .populate('emitente')
        .exec(function(err,mov) {
          mov.forEach(function(element,index) {
            if(element.produto._id === req.params.id) {
              if(element.emitente._id === req.params.idEmitente) {
                if(element.tipoMov === "ENTRADA") {
                  entradas = element.quantidade + entradas;
                }
                if(element.tipoMov === "SAIDA") {
                  saidas = element.quantidade + saidas;
                }
              }
            }
          });
          if(err) return console.log(err);
          return console.log(entradas);
        });
    };







    **/
    var mov = new Mov(req.body);
    mov.save(function(err) {
      if(err) {
        console.log("Erro ao tentar salvar"+err);
        res.send({error:err});
      }
      else {
        console.log("Movimentação cadastrado com sucesso!");

        Emitente.findById({_id:req.body.emitente},function(err,emitente) {
          emitente.movimentacoes.push(mov);
          emitente.save(function(err) {
            if(err) {
              console.log("Erro ao adicionar Movimentação no estoque");
            }
            else {
              console.log("Movimentação adicionada ao estoque");
            }
          });

        });
        res.send({status:"OK",mov:mov});
      }
    });
  };

  app.post("/api/mov",adicionarMov);
  app.delete("/api/mov/:id",removerMov);
  app.get("/api/mov",buscaMov);
  app.get("/api/movAll",buscaMovPopulada);
  app.get("/api/mov/:id",buscaMovPorId);

  // estoque

  app.get("/api/saldoFisico/:id",buscaSaldoEstoqueFiscal);


};
