if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const db=require('../../config/mongoose')
const bcrypt = require('bcryptjs')
const Category=require('../category')
const User=require('../user')
const Record=require('../record')
const record = require('../record')

const userData=require('../seedData/userData.json').results
console.log(userData)
const categoryData=require('../seedData/categoryData.json').results
const recordData=require('../seedData/recordsData.json').results

db.once('open',async()=>{
  
  const getSalt=await bcrypt.genSalt(10)
  const getHash=await bcrypt.hash(userData[0].password,getSalt)
  const seedUser=await User.create({
    name:userData[0].name,
    email:userData[0].email,
    password:getHash
  })
  console.log('created user!')

  const userId=seedUser._id

 
  recordData.forEach(async record=>{
    const {name,amount,date,category}=record
    const refCate=await Category.findOne({categoryName:category})//找出要新增的類別
    const categoryId=refCate._id
    await  Record.create({name,amount,date,categoryId,userId})
  })
  console.log('created record!')


})