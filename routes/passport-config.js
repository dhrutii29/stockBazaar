const LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcrypt')

function initialize(passport, getUserByUserId, getUserById) {
    const authenticateUser = async (userId, password, done) => {
      const user = getUserByUserId(userId)
      console.log(user)
      if (user == null) {
        return done(null, false, { message: 'No user with that userId' })
      }
  
      try {
        if (await bcrypt.compare(password, user.obj.password)) {
          return done(null, user)
        } else {
          return done(null, false, { message: 'Password incorrect' })
        }
      } catch (e) {
        return done(e)
      }
    }
  
    passport.use(new LocalStrategy({ usernameField: 'userId' }, authenticateUser))
    passport.serializeUser((user, done) => done(null, user._id))
    passport.deserializeUser((_id, done) => {
      return done(null, getUserById(_id))
    })
  }
  
  module.exports = initialize