# estoque_loja
 vamos começar com a modelagem das entidades, que primeiramente vão ser:
 Produtos , Emitente , MovEntrada , MovSaida , MovTransaferencia , EstoqueFiscal e EstoqueFisico.

 -Produtos
 ````
 Produto : {
   codigoInterno: {
     type:Number
   },
   referencia: {
     type:Number
   }
   descrição: {
     type:String
   },
   codigoBarras: {
     type:Number
   }
 }
 ````

 -Emitente
````
Emitente : {
  Razao : {
    type:String
  },
  Fantasia : {
    type:String
  },
  codigoInterno: {
    type:Number
  },
  Cnpj : {
    type:Number
  },
  Endereco : {
    Rua: {
      type:String
    },
    Telefone: {
      type:String
    },
    Bairro : {
      type:String
    },
    Numero : {
      type:String
    },
    Cidade : {
      type:String
    },
    Uf : {
      type:String
    }
  },
  EstoqueFisico : {
    type:Schema.Type.ObjectId,
    ref:'estoquefisico'
  },
  EstoqueFiscal : {
    type:Schema.Type.ObjectId,
    ref:'estoquefiscal'
  }
}
````

-Estoque Fiscal
````
EstoqueFiscal : {
  MovEntrada : {[
    type:Schema.Type.ObjectId,
    ref:'moventrada'
  ]},
  MovSaida : {[
    type:Schema.Type.ObjectId,
    ref:'movsaida'
  ]}
}
````

-Movimento de entrada
````
movEntrada : {
  numeroNf : {
    type:Number
  },
  dataMov : {
    type:Date
  },
  Produto : {
    type:Schema.Type.ObjectId,
    ref:'produto'
  },
  Quantidade: {
    type:Number
  },
  emitente : {
    type:Schema.Type.ObjectId,
    ref:'emitente'
  }
}
````

-Movimento de saida
````
movSaida : {
  Produto : {
    type:Schema.Type.ObjectId,
    ref:'produto'
  },
  localSaida : {
    type:Schema.Type.ObjectId,
    ref:'emitente'
  },
  origemSaida : {
    type:Schema.Type.ObjectId,
    ref:'emitente'
  },
  dataMov: {
    type:Date
  },
  Quantidade: {
    type:Number
  }
}
````
