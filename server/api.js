'use strict'
const api = require('express').Router()
const { Campus, Student } = require('../db/models')

// If you aren't getting to this object, but rather the index.html (something with a joke) your path is wrong.
// I know this because we automatically send index.html for all requests that don't make sense in our backend.
// Ideally you would have something to handle this, so if you have time try that out!
api.get('/', (req, res) => res.send({ hello: 'world' }))

api.get('/students', (req, res, next) => {
    Student.findAll({})
        .then(students => res.json(students))
        .catch(next);
});

api.get('/students/:studentId', (req, res, next) => {
    Student.findById(req.params.studentId)
        .then(student => res.json(student))
        .catch(next)
})

api.get('/campuses', (req, res, next) => {
    Campus.findAll({})
        .then(campuses => res.json(campuses))
        .catch(next);
});

api.get('/campuses/:campusId', (req, res, next) => {
    Campus.findById(req.params.campusId)
        .then(campus => res.json(campus))
        .catch(next); 
})

module.exports = api