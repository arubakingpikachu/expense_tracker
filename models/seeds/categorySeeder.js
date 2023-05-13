
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const db=require('../../config/mongoose')
const Category=require('../category')
const categoryData=require('../seedData/categoryData.json').results

db.once('open',()=>{
  Category.create(categoryData)
  .then(() => {
    console.log('done')
    process.exit()
  })
})