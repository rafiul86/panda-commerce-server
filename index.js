const express = require('express')
require('dotenv').config()

const app = express()
const cors = require('cors')
const MongoClient = require('mongodb').MongoClient;
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.3be27.mongodb.net/vandb?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

app.get('/', (req, res) => res.send('Hello World!'))
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))




client.connect(err => {
  const collection = client.db("vandb").collection("van");

  app.post('/reviewProduct',(req,res)=>{
      const productKeys = req.body;
      collection.find({key : {$in : productKeys}})
      .toArray((err,documents)=>{
          res.send(documents)
      })
  })

  app.get('/product/:key',(req,res)=>{
    collection.find({key : req.params.key})
    .toArray((err, documents)=>{
        res.send(documents[0])
    })
})
    app.get('/products',(req,res)=>{
        collection.find({})
        .toArray((err, documents)=>{
            res.send(documents)
        })
    })
    app.post('/addProducts',(req,res)=>{
        const products = req.body ;
        collection.insertMany(products)
        .then(result =>{
            res.send(result)
        })
    })
  console.log('database connected')
});
app.listen(5000)