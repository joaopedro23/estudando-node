// variaveis importante------//


const express = require("express")
const { v4: uuidv4 } = require('uuid');
const app = express();
app.use(express.json());

const projects = [];


app.set("view engine", "ejs")
app.get("/home", function(req, res){
    res.render('../views/home')
})


app.get("/", function(req, res){
    res.json({name: "joao", idade:"21", porfession: 'DESENVOLVEDOR JUNIO'});
});


app.get('/form/:nome/:sobrenome?', function(req, res){
    res.send("<h1>"+ req.params.nome + ' '+ req.params.sobrenome + "</h1>")
})

// aqui estou usando o ejs para abri html5 //
app.set('views engine', "esj")
app.get("/form", function(req, res){
    res.render("../views/form")
})

// aqui estou usando o insomnia //  
// o uuid deu prego e esta obsoleto e estou tentando resolver---//

app.post('/projects',( req, res)=>{
    const {name, language} = req.body;
      const porject = {
        id:uuidv4(),
        name, 
        language
      }  

      projects.push(porject);

    return res.status(201).json(porject);

})
//mesma linha de rota porem metodo diferente----------// 
app.get('/projects', (req, res )=>{
    return res.json(projects)
});

//usando mesma linha de rota porem com metodo PUT-----//
app.put('projects/:id', (req, res )=> {
    const { id } = req.params;
    const {name, language} = req.body;

    const newProject = {
        id,
        name,
        language
    }
    const projectIndex = projects.findIndex(project => project.id === id );

    projects[projectIndex] = newProject;
    return res.json(newProject);

}) 


app.get('/query', function(req, res){
    let name = req.query['nome']
    if(name){

        res.send('<h1>' + name + '</h1>')
    }else {

        res.send('<h1> nada foi passado </h1>')
    }
});

app.listen(3000, function () {
    console.log("executando na porta 3000");
});