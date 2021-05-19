const {Router} = require('express')
const bcrypt = require('bcryptjs')
const config = require('config')
const jwt = require('jsonwebtoken')
const {check, validationResult} = require('express-validator')
const User = require('../models/User')
const Desk = require('../models/Desk')
const router = Router()

// /api/auth/register
router.post(
    '/register',
    [
      check('email','Wrong Email').isEmail(),
        check('password', 'Password must be at least 6 characters long')
            .isLength({min: 6 })
    ],
    async (req, res) => {
    try {
        const errors = validationResult(req)

        if (!errors.isEmpty()){
            return res.status(400).send(errors.array()[0].msg)
        }

        const {email, password} = req.body

        const candidate = await User.findOne({ email })

        if (candidate){
            return res.status(400).send('User already exist.')
        }

        const hashedPassword = await bcrypt.hash(password, 12)
        const user = new User({email, password: hashedPassword })
        await user.save()

        if (user){
            const defaultDesk = new Desk({text: "default", author: user._id })
            await defaultDesk.save()
        }

        res.status(201).send('User was created')


    } catch (e) {
        res.status(500).send(`${e} Something go wrong...`)
    }
})

// /api/auth/login
router.post('/login',
    [
      check('email', 'Enter correct email').normalizeEmail().isEmail(),
      check('password','Enter password').exists()
    ],
    async (req,res) => {
        try {
            const errors = validationResult(req)

            if (!errors.isEmpty()){
                return res.status(400).send(errors.array()[0].msg)
            }
            const {email, password} = req.body

            const user = await User.findOne({ email })

            if (!user){
                return res.status(400).send('User doesnt exist ')
            }

            const isMatch = await bcrypt.compare(password, user.password)

            if (!isMatch){
                return res.status(400).send( 'Wrong password')
            }

            const token = jwt.sign(
                {userId: user.id },
                config.get('jwtSecret'),
                {expiresIn: '1h'}
            )
            res.json({token: token, userID: user.id })

        } catch (e) {
            res.status(500).send( 'Something go wrong...')
        }
})

module.exports = router

