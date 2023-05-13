const express = require('express')
const router = express.Router()

const home=require('./modules/home')
const user=require('./modules/users')
const record=require('./modules/records')
const fbAuth=require('./modules/fbAuth')

const {authenticator}=require('../middleware/auth')//引入authenticator函式


router.use('/records',authenticator,record)
router.use('/users',user)
router.use('/auth',fbAuth)
router.use('/',authenticator,home)


module.exports=router