const { request, response } = require("express")
const express = require("express")
const { v4: uuidv4 } = require("uuid")
const app = express()


app.use(express.json())



// ###  REQUISITOS DA APLICAÇÃO

//  - DEVE SER POSSIVEL CRIAR UMA CONTA
//  - DEVE SER POSSIVEL BUSCAR O EXTRATO BANCARIO DO CLIENTE
//  - DEVE SER POSSIVEL REALIZAR UM DEPOSITO
//  - DEVE SER POSSIVEL REALIZAR UM SAQUE
//  - DEVE SER POSSIVEL BUSCAR O EXTRATO BANCARIO DO CLIENTE POR DATA
//  - DEVE SER POSSIVEL ATUALIZAR DADOS DO CLIENTE
//  - DEVE SER POSSIVEL OBTER DADOS DE UMA CONTA DO CLIENTE



/**
 * cpf  - string
 * name -  string
 * id -  uuid
 * statement []
 */

const customers = []


//middleware
function verifyCpf(request, response, next) {
    const { cpf } = request.headers

    const customer = customers.find(customer => customer.cpf === cpf)
    if (!customer) {
        return response.status(400).json({ error: 'customer not found' })
    }
    request.customer = customer
    return next()
}


app.post("/account", (request, response) => {
    const { cpf, name } = request.body
    const customerAlreadyExists = customers.some((customer) => customer.cpf === cpf)
    if (customerAlreadyExists) {
        return response.status(400).json({ error: "USUARIO JA EXISTE" })
    }
    const id = uuidv4()

    customers.push({
        cpf,
        name,
        id: uuidv4(),
        statement: []
    })
    return response.status(201).json({ STATUS: "CADASTRADO COM SUCESSO" })
})



app.get("/statement/date", verifyCpf, (request, response) => {
    const { customer } = request
    const { date } = request.query

    const dateFormat = new Date(date + " 00:00")

    const statement = customer.statement.filter((statement) => statement.created_at.toDateString() === new Date()
        (dateFormat).toDateString())

    return response.json(customer.statement)
})



app.post('/deposit', verifyCpf, (request, response) => {
    const { description, amount } = request.body

    const { customer } = request

    const statementOperartion = {
        description,
        amount,
        created_at: new Date(),
        type: 'credit'
    }

    customer.statement.push(statementOperartion)
    return response.status(201).send()

})


app.put("/account", (request, response) => {
    const { name } = request.body

    const { customer } = request
    customer.name = name
    return response.status(201).send()
})

app.get("/account",verifyCpf, (response,request)=>{
   const {customer} = request

   return response.json(customer)
})




app.delete('/account', verifyCpf,(request,response)=>{
const {customer} = request

customer.splice(customer,1);
return response.status(200).json(customer)
})

app.get("/balance", verifyCpf, (request,response)=>{
    const {customer} = request
    const balance = getBalance(customer.statement)
    return response.json(balance)
})

app.listen(1337, () => {
    console.log('servidor ok')
})