const {Router} = require('express')
const bcrypt = require('bcryptjs')
const config = require('config')
const jwt = require('jsonwebtoken')
const {check, validationResult} = require('express-validator')
const db = require('../database')
const router = Router()


// /api/auth/register
router.post(
    '/register',
    [
      check('email','Wrong Email').isEmail(),
        check('password', 'Password at least 6 characters long')
            .isLength({min: 6 })
    ],
    async (req, res) => {
    try {
        const errors = validationResult(req)

        if (!errors.isEmpty()){
            return res.status(400).send(errors.array()[0].msg)
        }

        const {email, password} = req.body

        const exist = await db.query('SELECT email FROM "users" WHERE email = ($1)', [email])
        if (exist.rowCount !== 0){
            return res.status(400).send('User already exist')
        }

        const hashedPassword = await bcrypt.hash(password, 12)
        await db.query('INSERT INTO users(email, password, superuser) VALUES($1, $2, $3)', [email , hashedPassword, false])
        res.status(201).send('User was created')


    } catch (e) {
        res.status(500).send(e)
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
            const user = await db.query("SELECT id, email, password, superuser FROM users WHERE email = ($1)", [email])

            if (user.rowCount === 0){
                return res.status(400).send("Wrong email or password")
            }
            const isMatch = await bcrypt.compare(password, user.rows[0].password)

            if (!isMatch){
                return res.status(400).send( 'Wrong email or password')
            }

            const token = jwt.sign(
                {userId: user.rows[0].id, superuser: user.rows[0].superuser},
                config.get('jwtSecret'),
                {expiresIn: '2min'}
            )
            res.json({token: token, userID: user.rows[0].id, superuser: user.rows[0].superuser})

        } catch (e) {
            res.status(500).send( `${e} Something went wrong... `)
        }
})

module.exports = router

