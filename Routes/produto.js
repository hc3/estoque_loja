/*jslint node: true */
'use strict';

var Produto = require('../Models/produto.js');
var callback = require('./callback-express.js');

module.exports = function(app) {

  var buscaProduto = (req,res) => {
    console.log('GET- /api/buscaProduto');

    return Produto.find((err,produto) => {
      callback.callbackFind(err,produto,res);
    });
  };

  var buscaProdutoPorId = (req,res) => {
    console.log('GET - /api/buscaProduto/:id');

    var id = req.params.id;
    return Produto.findById({_id:id},(err,produto) => {
      callback.callbackFindById(err,produto,res);
    });
  };

  var removeProduto = (req,res) => {
    console.log('DELETE - /api/produto/:id');

    var id = req.params.id;
    return Produto.findById({_id:id},(err,produto) => {
      if(!produto) {
        res.statusCode = 404;
        return res.send({error:"Produto não foi localizado"});
      }
      return produto.remove((err) => {
        callback.callbackRemove(err,res);
      });
    });
  };

  var adicionarProduto = (req,res) => {
    console.log('PUT - /api/produto');

    var produto = new Produto(req.body);
    produto.save((err,produto) => {
      callback.callbackSave(err,res);
    });
  };

  app.post("/api/produto",adicionarProduto);
  app.delete("/api/produto/:id",removeProduto);
  app.get("/api/produto",buscaProduto);
  app.get("/api/produto/:id",buscaProdutoPorId);

};
