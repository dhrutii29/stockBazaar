if (process.env.NODE_ENV !== 'production') {
	require('dotenv').config()
}

const express = require('express');
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');
const passport = require('passport');
const flash = require('express-flash');
const session = require('express-session');
const router = express.Router();
const jwt = require('jsonwebtoken');

const JWT_SECRET = 'sdjkfh8923yhjdksbfma@#*(&@*!^#&@bhjb2qiuhesdbhjdsfg839ujkdhfjk'

/*const initializePassport = require('./passport-config')
initializePassport(
  passport,
  userId => signup.findOne({userId}),
  _id => signup.findOne({_id})
)*/

router.use(express.urlencoded({ extended: false }))
/*router.use(flash());
router.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}))
router.use(passport.initialize());
router.use(passport.session());*/

const signup_model = require("./signup_module");
const signup = signup_model.Signup;


router.get('/', async (req, res) => {
    
    res.render('login')
})
router.post('/', async (req, res) => {
  const { userId, password } = req.body
	console.log(userId, password);
  try{
    const user = await signup.findOne({ userId }).lean()
	console.log(user)

	if (!user) {
    //res.render('/', { message: 'Invalid username/password'})
		return res.json({ status: 'error', error: 'Invalid username/password' })
	}

	if (await bcrypt.compare(password, user.password)) {
		// the username, password combination is successful

		const token = jwt.sign(
			{
				id: user._id,
				userId: user.username
			},
			JWT_SECRET
		)
		res.redirect('/portfolio/'+user._id )
		
	}

	//res.json({ status: 'error', error: 'Invalid username/password' })
  }catch(e) {
    console.log(e)
    res.redirect('/login')
  }
  
})
router.get('/signup', async (req, res) => {
    
    res.render('signup')
})
router.post('/signup', async (req, res) => {
    var userid = function () {
        // Math.random should be unique because of its seeding algorithm.
        // Convert it to base 36 (numbers + letters), and grab the first 6 characters
        // after the decimal.
        return Math.random().toString(36).substr(2, 6).toUpperCase();
      };
    var uid = userid();
    var transporter = nodemailer.createTransport({
		service: 'gmail',
		auth: {
		  user: 'delenaa29@gmail.com',
		  pass: 'Dhruti@1234'
		}
	});
	  
	var mailOptions = {
	from: 'Stock Bazaar<delenaa29@gmail.com>',
	to: req.body.email,
	subject: 'Registration Successful 🤑',
	text: 'Congratulations '+ req.body.name +'! You have successfully registered yourself at stockBazaar. Your userId is ' + uid + '. Keep this Id safe as it will be required during login.'
	};

	transporter.sendMail(mailOptions, function(error, info){
	if (error) {
		console.log(error);
	} else {
		console.log('Email sent: ' + info.response);
	}
	});
    try{
        const hashedpassword = await bcrypt.hash(req.body.password, 10)
        
        const user = new signup({
            name: req.body.name,
            contactNo: req.body.contacts,
            email: req.body.email,
            balance: req.body.balance,
            password: hashedpassword,
            userId: uid
          })
        const newUser = await user.save()
        console.log(user)
        res.redirect('/login')
    }catch {
        res.redirect('/login/signup', {status: 'error'})
    }
    
})

module.exports = router