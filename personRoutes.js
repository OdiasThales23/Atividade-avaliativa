const router = require('express').Router()
const Joi = require('joi');
const Person = require('../models/Person')

//criaçao de dados
router.post('/', async (req, res) => {

    const {nome, matricula, turma, idade, aprovado} = req.body

    if(!nome) {
        res.status(422).json({ error: 'O nome é obrigatorio!' })
        return
    }
    
    const person = {
        nome, 
        matricula, 
        turma,
        idade,
        aprovado,
    }

    try {
        

const personSchema = Joi.object({
     nome: Joi.string().required(),   
     matricula: Joi.number().required(),
     turma: Joi.string().required(),
     idade: Joi.number().required(),
     aprovado: Joi.boolean().required(),
});
        
     function validarDadosPerson(req, res, next) {
         const { error } = personSchema.validate(req.body);
         if (error) {
             return res.status(400).send(error.details[0].message);
      }
         next();
 }

        // criando dados
        await Person.create(person)

        res.status(201).json({ Mensagem: 'Aluno adicionado com sucesso!' })

    } catch (error) {
        res.status(500).json({error: error})
    }
    
})

//leitura de dados
router.get('/', async (req, res) => {
    try {
        
        const people = await Person.find()

        res.status(200).json(people)

    } catch (error) {
        res.status(500).json({error: error})

    }
})

router.get('/:id', async (req, res) => {

    // extrair do dado da requisição, pela url = req.params
    const id = req.params.id

    try {
        
        const person = await Person.findOne({ _id: id })

        if(!person) {
            res.status(422).json({ Mensagem: 'O usuario não foi encontrado!' })
            return
        }

        res.status(200).json(person)

    } catch (error) {
        res.status(500).json({error: error})

    }
})

// atualizaçao de dados 
router.patch('/:id', async (req, res) => {

    const id = req.params.id

    const {nome, matricula, turma, idade, aprovado} = req.body

    const person = {
        nome, 
        matricula,
        turma,
        idade,
        aprovado,
    }

    try {
        
        const updatedPerson = await Person.updateOne({ _id: id}, person )

        if(updatedPerson.matchedCount === 0 ){
            res.status(422).json({ Mensagem: 'O usuario não foi encontrado!' })
            return

        }

        res.status(200).json(person)

    } catch (error) {      
        res.status(500).json({error: error})

}

})

//deletar dados 
router.delete('/:id', async (req, res) => {

    const id = req.params.id 

    const person = await Person.findOne({ _id: id })

    if(!person) {
        res.status(422).json({ Mensagem: 'O usuario não foi encontrado!' })
        return
    }

    try {
        
         await Person.deleteOne({ _id: id })

            res.status(200).json({ Mensagem: 'Usuario removido com sucesso!' })

    } catch (error) {
        res.status(500).json({error: error})

    }

})


module.exports = router 