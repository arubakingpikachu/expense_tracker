const Port=process.env.PORT||3000
//require區
const express=require('express') 
const exphbs = require('express-handlebars')
const methodOverride=require('method-override')
const routes=require('./routes')
const session = require('express-session')
const usePassport = require('./config/passport')
const flash = require('connect-flash')


require('./config/mongoose')
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const app =express()

app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')

//middleware區
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true
}))
app.use(express.urlencoded({ extended: true }))
app.use(methodOverride('_method'))
app.use(flash())
usePassport(app)
app.use((req, res, next) => {
  console.log(req.isAuthenticated())
  res.locals.isAuthenticated = req.isAuthenticated()
  res.locals.user = req.user
  res.locals.success_msg = req.flash('success_msg')
  res.locals.warning_msg = req.flash('warning_msg')
  next()
})
app.use(routes)






app.listen(Port,() => {
  console.log(`Express is listening on localhost:${Port}`)
})