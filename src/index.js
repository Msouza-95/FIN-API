
const { response, request } = require("express");
const express = require("express");
const { type } = require("express/lib/response");

const {v4:uuid} = require("uuid") 

const app = express();

// usar json
app.use(express.json())

const customers = [];

//Middleware 

function verifyIFExixtsAccountCPF(request,response,next){
    const { cpf} = request.headers

    const customer = customers.find((customer)=> customer.cpf === cpf)


    if(!customer){
        return response.status(400).json({error:"Customer not found"})
    }

    request.customer = customer;

    return next()
}
function getBalance(statement) {

   const balance =  statement.reduce((acc, operation) =>{
        if(operation.type === 'credit'){
            return acc + operation.amount
        }else{
            return acc - operation.amount;
        }
    }, 0)

    return balance;
}


app.post("/account",(request,response)=>{
    const { cpf, name } = request.body

    const  customerAlreadyExists = customers.some((customer)=>customer.cpf ===cpf)

    if(customerAlreadyExists){
        return response.status(400).json({erro:"Customer already exists!"})
    }


    const newAccount ={
        cpf, 
        name,
        id : uuid(),
        statement :[],
    } 
    customers.push(newAccount)

    return response.status(201).send(newAccount);
})


app.get("/statement", verifyIFExixtsAccountCPF, (request, response)=>{

    const { customer} = request

    return response.json(customer.statement);
})

app.post("/deposit", verifyIFExixtsAccountCPF,(request,response) =>{
  const  { description, amount } = request.body

  const { customer} = request

  const statementOperation = {
      description,
      amount,
      created_at : new Date(),
      type: "credit", 
  }

  customer.statement.push(statementOperation)

  return response.status(201).json(statementOperation)
})

app.post('/withdraw', verifyIFExixtsAccountCPF, (request, response) =>{

    const { amount } = request.body

    const { customer} = request

    const balance = getBalance(customer.statement);

 ""

    if(balance < amount){
        return response.status(400).json({ error: "Insufficient funds"})
    }

    const statementOperation = {
        amount,
        created_at : new Date(),
        type: "debit", 
    }

    customer.statement.push(statementOperation)

    return response.status(201).send("saque realizado");
})



// definir a porta do servidor
app.listen(3333)