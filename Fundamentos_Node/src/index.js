const { request, response } = require("express")
const express = require("express")
const app = express()
app.use(express.json())

//rotas 
app.get('/courses', (request, response) => {
const query  = request.query
console.log(query)


    return response.json([
        "Curso 1",
        'curso 2',
        "curso 3",
        'curso 4'
    ])
})


app.post('/courses', (request, response)=>{

    const body = request.body
    console.log(body)
    return response.json([
        "Curso 1",
        'curso 2',
        "curso 3",
        'curso 4',
        "curso 5 html"
    ])
})


app.put('/courses/:id', (request,response)=>{

    const {id} = request.params
    console.log(id)
    return response.json([
        "Curso 1",
        'curso 2',
        "curso 3",
        'curso  4',
        "curso 5 html"
    ])
})


app.patch("/courses/:id", (request,response)=>{
    return response.json([
        "Curso 1",
        'curso 2',
        "curso 8",
        'curso  4',
        "curso 5 html"
    ])
})



app.delete("/courses/:id", (request,response)=>{
    return response.json([
        "Curso 1",
        'curso 2',
        'curso  4',
        "curso 5 html"
    ])
})








app.listen(1337, () => {
    console.log('servidor ok')
})