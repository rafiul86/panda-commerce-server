const express = require('express')
require('dotenv').config()
const port = 5000 
const app = express()
const cors = require('cors')
const MongoClient = require('mongodb').MongoClient;
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.3be27.mongodb.net/vandb?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

app.get('/', (req, res) => res.send('Hello World! What is the main focus of the day !!'))
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))




client.connect(err => {
  const collection = client.db("vandb").collection("van");
  const clientDataCollection = client.db("vandb").collection("panda");
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
        const search = req.query.search
        collection.find({name : {$regex : search }})
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
    app.post('/addOrders',(req,res)=>{
        const orderInfo = req.body ;
        clientDataCollection.insertOne(orderInfo)
        .then(result =>{
            res.send(result.insertedCount > 0)
        })
    })
  console.log('database connected')
});
app.listen(process.env.PORT || port)