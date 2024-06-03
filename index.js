
const express = require('express')
const mongoose = require('mongoose');
const app = express()

// forma de ler JSON / middlewares 
app.use(
    express.urlencoded({
        extended: true,
    }),
)

app.use(express.json())

// rotas da API
const personRoutes = require('./routes/personRoutes')

app.use('/person', personRoutes)

// rota inicial / endpoint 
app.get('/', (req, res) => {

    res.json({ message: 'Olá, seja bem vindo a API!' })

})

// porta

mongoose.connect('mongodb+srv://thalesdias36291:KpexNSaXQn9ut5Yb@cluster0.jar7kbz.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')

.then(() => {
console.log('Conectado ao mongoDB!')
app.listen(3000)

})
.catch((err) => console.log(err)) 


