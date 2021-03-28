const express = require('express')
require('dotenv').config()
const app = express()
const cors = require('cors')

const MongoClient = require('mongodb').MongoClient;
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.3be27.mongodb.net/sagoldb?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
console.log(process.env.DB_USER)
app.get('/', (req, res) => res.send('Hello World!'))
app.use(cors)
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

client.connect(err => {
  const collection = client.db("sagoldb").collection("sagol");





  console.log('sagol connected')
});

app.listen(5000)