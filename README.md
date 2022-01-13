
# FinApi 

Api de finanças

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

-[x] Deve ser possível criar umma conta.
- [] Deve ser possível buscar o extrato bancário do cliente.
- [] Deve ser possível realizar um depósito.
- [] Deve ser possível realizar um saque.
- [] Deve ser possível buscar o extrato bancário do cliente por data.
- [] Deve ser possível atualizar dados da conta do cliente.
- [] Deve ser possível obter dados da conta do cliente.
- [] Deve ser possível deletar uma conta.

### Requisitos Não Funcionais 
- [x] Não deve ser possível cadastrar uma conta com CPF já existente
- [] Não deve ser possível fazer depósito em uma conta não existente
- [] Não deve ser possível buscar extrato em uma conta não existente
- [] Não deve ser possível fazer saque em uma conta não existente
- [] Não deve ser possível excluir uma conta não existente
- [] Não deve ser possível fazer saque quando o saldo for insuficiente




### 🛠 Tecnologias

As seguintes ferramentas foram usadas na construção do projeto:


- [Node.js](https://nodejs.org/en/)
- [TypeScript](https://www.typescriptlang.org/)
- [Express](https://expressjs.com/pt-br/)