const express = require('express'); // framework
const app = express();
const port = 3000;
const dados = require('./dados.json');
const bodyParser = require('body-parser'); //interpretação do json
const { Tarefa } = require('./models');
const { status } = require('./models');


app.use(bodyParser.json());

app.get('/', async(req, res)=>{
    res.send('Running =)');
});

app.get('/tarefas', async(req, res)=>{
    const tarefas = await Tarefa.findAll();
    res.status(200).json(tarefas);
});

app.get('/tarefas/:id', async(req, res)=>{
       const tarefa = await Tarefa.findAll({
           where:{
               id: req.params.id
           }
       });
     res.status(200).json(tarefa);
       
});

app.post('/tarefas', async(req, res)=> {
    const tarefa = await Tarefa.create(req.body);
    res.status(201).json(tarefa);
});

app.delete('/tarefas/:id', async(req, res)=>{
    const tarefa = await Tarefa.destroy({
        where:{
            id: req.params.id
        }
    })
    res.status(200).json(tarefa);
});

app.put('/tarefas/:id', async (req, res)=>{
    const tarefa = await Tarefa.update(req.body, {
        where:{
            id: req.params.id
        }
    });
    res.status(200).json(tarefa);
});


app.get('/tarefas/prioridade/:prioridade', async(req, res)=>{
    const tarefa = await Tarefa.findAll({
        where:{
            prioridade: req.params.prioridade
        }
    });
  res.status(200).json(tarefa);
    
});

app.get('/tarefas/status/:status', async(req, res)=>{
    const status = req.params.status !=="false"
    const tarefa = await Tarefa.findAll({
        where:{
            status: status
        }
    });
  res.status(200).json(tarefa);
    
});



app.listen(process.env.PORT || port);