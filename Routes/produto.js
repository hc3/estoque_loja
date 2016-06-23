/*jslint node: true */
'use strict';

var Produto = require('../Models/produto.js');

module.exports = function(app) {

  var buscaProduto = function(req,res) {
    console.log('GET- /api/buscaProduto');

    return Produto.find(function(err,produto) {
      if(!err) {
        return res.send(produto);
      }else {
        res.statusCode = 500;
        console.log("Erro interno!",res.statusCode,err.message);
        return res.send({error:"erro ao tentar buscar Produto!"});
      }
    });
  };

  var buscaProdutoPorId = function(req,res) {
    console.log('GET - /api/buscaProduto/:id');

    var id = req.params.id;
    return Produto.findById({_id:id},function(err,produto) {
      if(!produto) {
        res.statusCode = 404;
        return res.send({error:"Produto não foi localizado"});
      }
      if(!err) {
        return res.send({status:"OK",produto:produto});
      }
      else {
        res.statusCode = 500;
        console.log("Erro interno!",res.statusCode,err.message);
        return res.send({error:"erro ao tentar buscar produto"});
      }
    });
  };

  var removeProduto = function(req,res) {
    console.log('DELETE - /api/produto/:id');

    var id = req.params.id;
    return Produto.findById({_id:id},function(err,produto){
      if(!produto) {
        res.statusCode = 404;
        return res.send({error:"Produto não foi localizado"});
      }
      return produto.remove(function(err){
        if(!err) {
          console.log("Produto removido com sucesso!");
          return res.send({status:"OK",produto:produto});
        }
        else {
          res.statusCode = 500;
          console.log("Erro ao tentar remover",res.statusCode,err.message);
          return res.send({error:"erro no servidor"});
        }
      });
    });
  };

  var adicionarProduto = function(req,res) {
    console.log('PUT - /api/produto');

    var produto = new Produto(req.body);
    produto.save(function(err) {
      if(err) {
        console.log("Erro ao tentar salvar "+err);
        res.send({error:err});
      }
      else {
        console.log("Produto cadastrado com sucesso!");
        res.send({status:"OK",produto:produto});
      }
    });
  };

  app.post("/api/produto",adicionarProduto);
  app.delete("/api/produto/:id",removeProduto);
  app.get("/api/produto",buscaProduto);
  app.get("/api/produto/:id",buscaProdutoPorId);

};
