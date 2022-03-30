
const { response, request, next } = require("express");
const express = require("express");


const { v4: uuid } = require("uuid")

const app = express();

// usar json
app.use(express.json())

const customers = [];

//Middleware 

function verifyIFExixtsAccountCPF(request, response, next) {
    const { cpf } = request.headers

    const customer = customers.find((customer) => customer.cpf === cpf)


    if (!customer) {
        return response.status(400).json({ error: "Customer not found" })
    }

    request.customer = customer;

    return next()
}
function getBalance(statement) {

    const balance = statement.reduce((acc, operation) => {
        if (operation.type === 'credit') {
            return acc + operation.amount
        } else {
            return acc - operation.amount;
        }
    }, 0)

    return balance;
}


app.post("/account", (request, response) => {
    const { cpf, name } = request.body

    const customerAlreadyExists = customers.some((customer) => customer.cpf === cpf)

    if (customerAlreadyExists) {
        return response.status(400).json({ erro: "Customer already exists!" })
    }


    const newAccount = {
        cpf,
        name,
        id: uuid(),
        statement: [],
    }
    customers.push(newAccount)

    return response.status(201).send(newAccount);
})


app.get("/statement", verifyIFExixtsAccountCPF, (request, response) => {

    const { customer } = request

    return response.json(customer.statement);
})


app.post("/deposit", verifyIFExixtsAccountCPF, (request, response) => {
    const { description, amount } = request.body;

    const { customer } = request;

    const statementOperation = {
        description,
        amount,
        created_at: new Date(),
        type: "credit",
    }

    customer.statement.push(statementOperation)

    return response.status(201).json(statementOperation)
})

app.post("/withdraw", verifyIFExixtsAccountCPF, (request, response) => {

    const { amount } = request.body;

    const { customer } = request;

    const balance = getBalance(customer.statement);


    console.log(amount);

    if (balance < amount) {
        return response.status(400).json({ error: "Insufficient funds" })
    }

    const statementOperation = {
        amount,
        created_at: new Date(),
        type: "debit",
    }

    customer.statement.push(statementOperation)

    return response.status(201).json(statementOperation);
})

app.get("/statement/data", verifyIFExixtsAccountCPF, (request, response) => {

    const { customer } = request;
    const { data } = request.params;

    const formatData = new Date(data + " 00:00");

    const statement = customer.statement.statement.filter((statement) => statement.data.toDataString() === new Date(formatData).toDateString());

    return response.json(statement).status(201);
})


app.put("/account", verifyIFExixtsAccountCPF, (request, response)=>{
    const { name} = request.body;
    const { customer} = request;

    customer.name = name;

    return response.status(201).json(customer);

})

app.get("/account", verifyIFExixtsAccountCPF, (request, response)=>{
    const { customer} = request;

    return response.status(201).json(customer);

})

app.delete("/account", verifyIFExixtsAccountCPF, (request, response)=>{
    const { customer} = request;

    customers.splice(customer,1);

    return response.status(200).json(customers);

})

app.get("/balance", verifyIFExixtsAccountCPF, (request, response)=>{
    const { customer} = request;


    const balance = getBalance(customer.statement);

    return response.status(201).json(balance);

})

// definir a porta do servidor
app.listen(3333)