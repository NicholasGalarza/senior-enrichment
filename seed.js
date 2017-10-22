// This file should contain all the record creation needed to seed the database with its default values.
// The data can then be loaded with the node seed.js

const Promise = require("bluebird");
const {
  Campus,
  Student,
} = require('./db/models');

const db = require('./db'); 
const data = {
  student: [
    {
      name: "Roy Townsend",
      campus: {
        name: "New York University",
        image: "http://via.placeholder.com/350x350"
      },
      email: "me@mail.com"
    },
    {
      name: "Fernando	Ballard",
      campus: {
        name: "Boston University",
        image: "http://via.placeholder.com/350x350"
      },
      email: "me@mail.com"
    },
    {
      name: "Jill	Brady",
      campus: {
        name: "CUNY Hunter College",
        image: "http://via.placeholder.com/350x350"
      },
      email: "me@mail.com"
    },
    {
      name: "Gabriel Huffe",
      campus: {
        name: "Stony Brook University",
        image: "http://via.placeholder.com/350x350"
      },
      email: "me@mail.com"
    },
    {
      name: "Ada Frazier",
      campus: {
        name: "Vanderbuilt University",
        image: "http://via.placeholder.com/350x350"
      },
      email: "me@mail.com"
    },
    {
      name: "Jorge Pratt",
      campus: {
        name: "Oxford University",
        image: "http://via.placeholder.com/350x350"
      },
      email: "me@mail.com"
    },
    {
      name: "Monica	Perry",
      campus: {
        name: "Harvard University",
        image: "http://via.placeholder.com/350x350"
      },
      email: "me@mail.com"
    },
    {
      name: "Pearl Reyes",
      campus: {
        name: "Texas A&M University",
        image: "http://via.placeholder.com/350x350"
      },
      email: "me@mail.com"
    },
    {
      name: "Eugene	Wagner",
      campus: {
        name: "Binghamton University",
        image: "http://via.placeholder.com/350x350"
      },
      email: "me@mail.com"
    },
    {
      name: "Sara	Lawson",
      campus: {
        name: "Cornell University",
        image: "http://via.placeholder.com/350x350"
      },
      email: "me@mail.com"
    },
    {
      name: "Sammy Chandler",
      campus: {
        name: "University of California, Los Angeles",
        image: "http://via.placeholder.com/350x350"
      },
      email: "me@mail.com"
    },
    {
      name: "Peter Wright",
      campus: {
        name: "Loyola University",
        image: "http://via.placeholder.com/350x350"
      },
      email: "me@mail.com"
    },
    {
      name: "Lois	Farmer",
      campus: {
        name: "Hofstra University",
        image: "http://via.placeholder.com/350x350"
      },
      email: "me@mail.com"
    },
    {
      name: "Melissa Willis",
      campus: {
        name: "Standford University",
        image: "http://via.placeholder.com/350x350"
      },
      email: "me@mail.com"
    },
    {
      name: "John Doe",
      campus: {
        name: "University of Pennsylvania",
        image: "http://via.placeholder.com/350x350"
      },
      email: "me@mail.com"
    }
  ]
};

db
  .sync({ force: true })
  .then(function() {
    console.log("Dropped old data, now inserting data");
    return Promise.map(Object.keys(data), function(name) {
      return Promise.map(data[name], function(item) {
        return db.model(name).create(item, {
          include: [Campus]
        });
      });
    });
  })
  .then(function() {
    console.log("Finished inserting data");
  })
  .catch(function(err) {
    console.error("There was totally a problem", err, err.stack);
  })
  .finally(function() {
    db.close(); // uses promises but does not return a promise. https://github.com/sequelize/sequelize/pull/5776
    console.log("connection closed"); // the connection eventually closes, we just manually do so to end the process quickly
    return null; // silences bluebird warning about using non-returned promises inside of handlers.
  });
