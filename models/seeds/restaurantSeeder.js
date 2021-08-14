const bcrypt = require('bcryptjs')
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
const Restaurant = require('../restaurant.js')
const db = require('../../config/mongoose')
const User = require('../user')
const restaurantList = require('../../restaurant.json').results

const SEED_USER = [
  {
    name: 'user1',
    email: 'user1@example.com',
    password: '12345678'
  },
  {
    name: 'user2',
    email: 'user2@example.com',
    password: '12345678'
  }
]
db.once('open', () => {
  return Promise.all(Array.from(
    { length: 2 },
    (_, i) => {
      bcrypt
        .genSalt(10)
        .then(salt =>
          bcrypt.hash(SEED_USER[i].password, salt)
        )
        .then(hash => User.create({
          name: SEED_USER[i].name,
          email: SEED_USER[i].email,
          password: hash,
        }))
        .then(user => {
          const userId = user._id
          return Promise.all(Array.from(
            { length: 4 },
            (_, j) => {
              if (i === 0) {
                Restaurant.create({
                  name: restaurantList[j].name,
                  name_en: restaurantList[j].name_en,
                  category: restaurantList[j].category,
                  image: restaurantList[j].image,
                  location: restaurantList[j].location,
                  google_map: restaurantList[j].google_map,
                  rating: restaurantList[j].rating,
                  phone: restaurantList[j].phone,
                  description: restaurantList[j].description,
                  userId
                })
              }
              else if (i === 1) {
                Restaurant.create({
                  name: restaurantList[j + 4].name,
                  name_en: restaurantList[j + 4].name_en,
                  category: restaurantList[j + 4].category,
                  image: restaurantList[j + 4].image,
                  location: restaurantList[j + 4].location,
                  google_map: restaurantList[j + 4].google_map,
                  rating: restaurantList[j + 4].rating,
                  phone: restaurantList[j + 4].phone,
                  description: restaurantList[j + 4].description,
                  userId
                })
              }
            }
          ))
        })
      //   console.log('done!')
    })
  )
})