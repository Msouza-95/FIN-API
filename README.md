
# FinApi 

Api de finanças simples  feita em memória para treinar os conceitos de rotas com nodejs.

# Instalação 

Será necessário a instalação do `Node.js` e o `Yarn`.

Em seguida, utilize o comando abaixo para instalar as dependências:

```bash
yarn install
```

# Iniciando a Apliação 

Execute o seguinte comando para iniciar o aplicativo em um ambiente de desenvolvimento:

```bash
yarn dev`
```

### Requisitos Funcionais 

- [x] Deve ser possível criar umma conta.
- [x] Deve ser possível buscar o extrato bancário do cliente.
- [x] Deve ser possível realizar um depósito.
- [X] Deve ser possível realizar um saque.
- [x] Deve ser possível buscar o extrato bancário do cliente por data.
- [x] Deve ser possível atualizar dados da conta do cliente.
- [x] Deve ser possível obter dados da conta do cliente.
- [x] Deve ser possível deletar uma conta.
- [x] Deve ser possível retornar o balanço.

### Requisitos Não Funcionais 
- [x] Não deve ser possível cadastrar uma conta com CPF já existente
- [x] Não deve ser possível fazer depósito em uma conta não existente
- [x] Não deve ser possível buscar extrato em uma conta não existente
- [x] Não deve ser possível fazer saque em uma conta não existente
- [x] Não deve ser possível excluir uma conta não existente
- [x] Não deve ser possível fazer saque quando o saldo for insuficiente




### 🛠 Tecnologias

As seguintes ferramentas foram usadas na construção do projeto:


- [Node.js](https://nodejs.org/en/)
- [TypeScript](https://www.typescriptlang.org/)
- [Express](https://expressjs.com/pt-br/)
