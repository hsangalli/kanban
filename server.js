const express = require('express')
const app = express()
const MongoClient = require('mongodb').MongoClient
const connectionURI = "mongodb://localhost/dontkanban"

var kanbanTitle = ''
var collection = ''

app.use(express.static(__dirname + '/public'))

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html')
})

app.get('/:kanban', (req, res) => {
  res.sendFile(__dirname + '/views/kanban.html')
})

app.get('/:kanban/pull', (req, res) => {
  MongoClient.connect(connectionURI,(connectionError, database) => {
    if(connectionError) {
      res.send(connectionError)
    } else{
      kanbanTitle = req.params['kanban']
      collection = database.collection('kanbans')
      collection.find({title: kanbanTitle}).toArray((err, items) => {
        res.setHeader('Content-Type', 'application/json')
        res.send(JSON.stringify(items))
      })
    }
  })
})

app.post('/:kanban/push', (req, res) => {
  MongoClient.connect(connectionURI,(connectionError, database) => {
    if(connectionError) {
      res.send(connectionError)
    } else{
      // collection.update(
      //   {title: kanbanTitle},
      //   <<< Vue.data.kanban >>>
      // );
    }
  })
})

app.listen(3000, () => {
  console.log('Servidor rodando em http://localhost:3000/')
})
