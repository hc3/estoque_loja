var obj = {

  callbackFind: (err,element,res) => {
    if(!err) {
      return res.send(element);
    }else {
      res.statusCode = 500;
      console.log("Erro interno!",res.statusCode,err.message);
      return res.send({error:"erro ao tentar buscar Produto!"});
    }
  },

  callbackFindById: (err,element,res) => {
    if(!element) {
      res.statusCode = 404;
      return res.send({error:"Produto não foi localizado"});
    }
    if(!err) {
      return res.send({status:"OK"});
    }
    else {
      res.statusCode = 500;
      console.log("Erro interno!",res.statusCode,err.message);
      return res.send({error:"erro ao tentar buscar"});
    }
  },

  callbackRemove: (err,res) => {
    if(!err) {
      console.log("Produto removido com sucesso!");
      return res.send({status:"OK"});
    }
    else {
      res.statusCode = 500;
      console.log("Erro ao tentar remover",res.statusCode,err.message);
      return res.send({error:"erro no servidor"});
    }
  },

  callbackSave: (err,res) => {
    if(err) {
      console.log("Erro ao tentar salvar "+err);
      res.send({error:err});
    }
    else {
      console.log("Produto cadastrado com sucesso!");
      res.send({status:"OK"});
    }
  }
  
};

module.exports = obj;