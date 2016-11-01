var express = require('express');
var router = express.Router();
import userschema from './data/user.schema'
import notesschema from './data/notes.schema'
import {
    graphql
} from 'graphql'

app.get('/api/users', (req, res) => {
    let query = '{users {name age}}'
    graphql(userschema, query).then(result => {
        res.json(result)
    })
})

app.post('/api/users', (req, res) => {
    let query = `mutation{insert(name: "${req.body.name}", age: ${req.body.age}){id name age}}`
    graphql(userschema, query).then(result => {
        res.json(result)
    })
})

app.put('/api/users/:id', (req, res) => {
    let query = `mutation{update(id : "${req.params.id}", name: "${req.body.name}", age: ${req.body.age}){id name age}}`
    graphql(userschema, query).then(result => {
        res.json(result)
    })
})

app.delete('/api/users/:id', (req, res) => {
    let query = `mutation{delete(id : "${req.params.id}"){id name age}}`
    graphql(userschema, query).then(result => {
        res.json(result)
    })
})

app.get('/api/notes', (req, res) => {
    let query = '{notes {userid name age}}'
    graphql(notesschema, query).then(result => {
        res.json(result)
    })
})

app.post('/api/notes', (req, res) => {
    let query = `mutation{insert(userid: "${req.body.userid}",title: "${req.body.title}", content: ${req.body.content}){userid title content}}`
    graphql(notesschema, query).then(result => {
        res.json(result)
    })
})

app.put('/api/notes/:id', (req, res) => {
    let query = `mutation{update(id : "${req.params.id}",title: "${req.body.title}", content: ${req.body.content}){userid title content}}`
    graphql(notesschema, query).then(result => {
        res.json(result)
    })
})

app.delete('/api/notes/:id', (req, res) => {
    let query = `mutation{delete(id : "${req.params.id}"){userid title content}}`
    graphql(notesschema, query).then(result => {
        res.json(result)
    })
})

module.exports = router;
