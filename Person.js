const mongoose = require('mongoose')
const Person = mongoose.model('Person', {
    nome: String,
    matricula: Number, 
    turma: String,
    idade: Number, 
    aprovado: Boolean,
})

module.exports = Person 
