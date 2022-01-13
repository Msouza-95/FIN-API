
const { response } = require("express");
const express = require("express")

const {v4:uuid} = require("uuid") 

const app = express();

// usar json
app.use(express.json())

const customers = [];


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


app.get("/statement/:cpf",(request, response)=>{

    const { cpf} = request.params;

   
    const customer = customers.find((customer) => customer.cpf === cpf);

    return response.json(customer.statement);
})

// definir a porta do servidor
app.listen(3333)