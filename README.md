# estoque_loja
 vamos começar com a modelagem das entidades, que primeiramente vão ser:
 Produtos , Emitente , MovEntrada , MovVenda , MovTransaferencia , EstoqueFiscal e EstoqueFisico.

 -Entidade Produtos
 ````
 Produtos : {
   codigoInterno: {
     type:Number
   },
   descrição: {
     type:String
   },
   codigoBarras: {
     type:Number
   },
 }
 ````

 -Entidade Emitente
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
  }
}
````
