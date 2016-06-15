# Controle de estoque feito com MEAN fullstack.

- primeiro vamos ao problema, o cliente em questão tem algumas lojas de móveis e ele transfere produtos entre essas lojas essa transferência
está acontecendo sem controle até porque ele não faz transferência com nota fiscal apenas move o produto fisicamente de uma loja pra outra,
isso ocorre se acontecer de uma cliente chegar na loja1 para comprar um notebook mas a loja1 não recebeu nota de notebook quem recebeu foi a
loja2, então ele manda alguém que está na loja2 mandar o notebook fisicamente para loja1, em seguida manda a loja2 emitir um cupom fiscal para
o cliente.

-nesse ponto chegamos a questão de que o dono das lojas quer controlar o estoque físico dos produtos mas quer controlar também quem são as
lojas que tem esse produto no estoque fiscal, por exemplo ele recebe 5 geladeiras na loja1 ele da entrada nessa nota na loja1 então a loja1
tem o saldo de 5 geladeiras, mas dai ele resolve mandar 2 geladeiras para a loja2, então ele faz uma transferencia (sem valor fiscal) apenas
para controlar que das 5 geladeiras que foram dado entrada na loja1 ele tem 2 na loja2 que se forem vendidas na loja2 ele tem que faturar pela
loja1 já que foi lá que foi dado entrada na nota fiscal.

 vamos começar com a modelagem das entidades, que primeiramente vão ser:
 Produtos , Emitente , MovEntrada , MovSaida , MovTransaferencia , EstoqueFiscal e EstoqueFisico.

 Produtos - entidade que vai ter as informações dos produtos.
 Emitente - esses vão ser as lojas que cada loja vai ter um estoque fiscal e um estoque físico.
 MovEntrada - essa é a entidade que vai controlar o que foi dado entrada no estoque fiscal de qual emitente.
 MovSaida - essa é a entidade que vai descontar as saidas desses produto iformando o local onde foi dado entrada e o local que fez a venda.
 EstoqueFiscal -

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
