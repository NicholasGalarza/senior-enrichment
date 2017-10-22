const faker = require('faker')

const User = {
  name: faker.name.findName(),
  email: faker.internet.email(),
  website: faker.internet.url(),
  address: faker.address.streetAddress() + faker.address.city() + faker.address.country(),
  bio: faker.lorem.sentences(),
  image: faker.image.avatar()
}


console.log(User); 

module.exports = User
