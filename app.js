const express = require("express");
const app = express();
const Datastore = require('nedb');
app.listen(3000, () => {
 console.log("Server running on port 3000");
});

app.use(express.static('public', {index: 'login.html'}));
app.use(express.json());

const db = new Datastore('database.db')
db.loadDatabase();  


app.post('/url', (request, response) =>{
    const data = request.body;    
   var val =  JSON.stringify(data);   
   if(val !== "{}"){
    val = JSON.parse(val)
       db.insert(val);
   }

    response.redirect('/redirect.html')
});

app.get('/url', (request, response) => {
    db.persistence.compactDatafile()
    db.find({}, (err, data) =>{
        if(err){
            console.log(err)
            response.end()
            return
        }
        response.json(data[0]);
     
    //    console.log(data)
    })
    
});

app.post('/login', (request, response) =>{
    const login = request.body;
    console.log(login)


    response.redirect('/home.html')

    
});

