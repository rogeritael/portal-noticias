const express = require ('express');
const path = require('path');
const mongoose = require('mongoose');
var bodyParser = require('body-parser');
const res = require('express/lib/response');

const app = express();

const Posts = require('./post.js');

mongoose.connect('mongodb+srv://root:4rvf2qx7kmHUxkJz@cluster0.k3fqg.mongodb.net/dankicode?retryWrites=true&w=majority', {useNewUrlParser: true, useUnifiedTopology: true}).then(()=>{
    console.log('conectado');
}).catch((err) => {
    console.log(err.message);
})


app.use( bodyParser.json());
app.use( bodyParser.urlencoded({
    extended: true
}));

app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
app.use('/public', express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, '/pages'));

app.get('/', (req, res)=>{
    if(req.query.busca == null){
        Posts.find({}).sort({'_id': -1}).exec(function(err, posts){
            posts = posts.map(function(val){
                return{
                    titulo: val.titulo,
                    conteudo: val.conteudo,
                    descricaoCurta: val.conteudo.substr(0, 150),
                    imagem: val.imagem,
                    slug: val.slug,
                    categoria: val.categoria,
                }
            })

            res.render('home', {posts:posts});
        })

        
    }else{
        res.render('busca', {});
    }
})

app.get('/:slug', (req, res)=>{
    Posts.findOneAndUpdate({slug: req.params.slug}, {$inc: {views: 1}}, {new: true}, function(err, resposta){
        console.log(resposta);

        res.render('single', {noticia: resposta}) 
    }) 
})








app.listen(8080, ()=>{
    console.log("rodando");
});