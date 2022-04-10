const express = require ('express');
const path = require('path');
var bodyParser = require('body-parser');
const res = require('express/lib/response');

const app = express();

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
        res.render('home', {});
    }else{
        res.render('busca', {});
    }
})

app.get('/:slug', (req, res)=>{
    res.render('single', {})    
})








app.listen(8080, ()=>{
    console.log("rodando");
});