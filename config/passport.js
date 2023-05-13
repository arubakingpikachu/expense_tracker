const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const FacebookStrategy = require('passport-facebook').Strategy
const User=require('../models/user')
const bcrypt=require('bcryptjs')

module.exports= app=>{
  app.use(passport.initialize())
  app.use(passport.session())

 // 
 passport.use(new LocalStrategy({usernameField: 'email'},(email, password, done)=> {
    User.findOne({email})
    .then(user=>{if(!user){return done(null,false)}
      return bcrypt.compare(password,user.password)
      .then(isMatch=>{if(!isMatch){return done(null,false)}
      return done(null,user)
    })
  }).catch((error)=>console.log(error))
    
  }
))//本地登入機制

passport.use(new FacebookStrategy({
  clientID: process.env.FACEBOOK_CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
  callbackURL: process.env.FACEBOOK_CALLBACK,
  profileFields: ['email', 'displayName']
},
async (accessToken, refreshToken, profile, done) =>{
 
  try{
    const { name, email } = profile._json

    const user=await User.findOne({email})
    if(user) {return done(null, user)}
     let randomPassword = Math.random().toString(36).slice(-8)
     const salt=await bcrypt.genSalt(10)
     randomPassword=await bcrypt.hash(randomPassword,salt)
     User.create({name,email,password:randomPassword})
  }catch{done(err, false)}

}
))

passport.serializeUser((user, done) => {
  done(null, user.id)
})
passport.deserializeUser((id, done) => {
  User.findById(id)
    .lean()
    .then(user => done(null, user))
    .catch(err => done(err, null))})


}