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

// first does a findOne, if nothing is found Sequelize does a Campus.create
// which means it does a build and save for us. 
// if it creates the bool returned will be true
api.post('/campuses/', (req, res, next) => {
    console.log(req.body);
    Campus.findOrCreate({
        where: {
            name: req.body.newCampus,
            image: req.body.image
        }
    })
        .spread((campus, bool) => {
            res.json(campus);
        })
        .catch(next);
})

api.put('/campuses/update/:campusId', (req, res, next) => {
    const id = req.params.campusId;
    Campus.findById(id)
        .then(campus => campus.update(req.body))
        .then(updatedCampus => res.send(updatedCampus))
        .catch(next);
})

api.delete('/campuses/:campusId', (req, res, next) => {
    console.log("succesfully delete", req.body);
    const id = req.params.campusId;
    Campus.destroy({ where: { id } })
        .then(() => res.status(201).end())
        .catch(next);
})

api.delete('/students/:studentId', (req, res, next) => {
    console.log("succesfully delete", req.body);
    const id = req.params.studentId;
    Student.destroy({ where: { id } })
        .then(() => res.status(201).end())
        .catch(next);
}) 

api.post('/students', (req, res, next) => {
    console.log("Attempting to add student from server", req.body)
    Student.findOrCreate({
        where: {
            name: req.body.name,
            email: req.body.email, 
            campusId: req.body.campusId
        }
    })
        .spread((student, bool) => {
            res.json(student);
        })
        .catch(next);
})

api.put('/students/update/:studentId', (req, res, next) => {
    console.log('updating with this object', req.body); 
    const id = req.params.studentId;
    Student.findById(id)
        .then(student => student.update(req.body))
        .then(updatedStudent => res.send(updatedStudent))
        .catch(next);
})

module.exports = api