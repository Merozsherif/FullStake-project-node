const express = require('express')
const app = express()
const port = 3000
const mongoose = require('mongoose');
app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs')
const Mydata = require("./models/mydataSchema")
app.use(express.static('public'))
app.get('/', (req, res) => {



// auto refresh
const path = require("path");
const livereload = require("livereload");
const liveReloadServer = livereload.createServer();
liveReloadServer.watch(path.join(__dirname, 'public'));
 
 
const connectLivereload = require("connect-livereload");
app.use(connectLivereload());
 
liveReloadServer.server.once("connection", () => {
  setTimeout(() => {
    liveReloadServer.refresh("/");
  }, 100);
});


  Mydata.find().then((result)=>{
    res.render("home", {mytitle:" home page" , arr : result});
    
    console.log(result)
  }).catch((err)=>{
    console.log(err)
  })
})


app.get('/index.html', (req, res) => {
  res.send(" your data in db now")
})



mongoose.connect('mongodb+srv://marwan:102030@clustersecondapp.fwwwgtm.mongodb.net/all-data?')
        .then(() =>{
            app.listen(port, () => {
                console.log(`http://localhost:${port}/`)
                })  
        }) 
        .catch((err) =>{console.log(err)}); 

app.post('/', (req, res) => {
    console.log(req.body)
    const mydata = new Mydata(req.body);

    mydata.save().then(()=>{
        res.redirect("/index.html")

    }).catch((err)=>{
        console.log(err)
    })
    })