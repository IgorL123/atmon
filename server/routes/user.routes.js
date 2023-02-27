const {Router} = require('express')
const db = require('../database')
const bcrypt = require('bcryptjs')
const router = Router()

// /api/user/...

router.get('/getusers', async (req,res) => {
    try {
        const data = await db.query('SELECT * from users')
        res.json(data.rows)

    } catch (e) {
        res.status(500).json({message: `Something go wrong... ${e}`})
    }
})

router.post('/adduser', async (req,res) => {
    try {
        const password = "password"
        console.log(password)
        const hashpass = await bcrypt.hash(password, 12)
        const {email, superuser} = req.body
        const data = await db.query('INSERT INTO users(email, superuser, password) VALUES($1, $2, $3)', [email, superuser, hashpass])
        res.json(data.rows)
        //res.status(201).send("User was created")

    } catch (e) {
        res.status(500).json({message: `Something go wrong... ${e}`})
    }
})

router.post('/deleteuser', async (req,res) => {
    try {
        const {email} = req.body
        const data = await db.query('DELETE from users WHERE email = ($1)', [email])
        res.json(data.rows)
        //res.status(201).send("User was deleted")

    } catch (e) {
        res.status(500).json({message: `Something go wrong... ${e}`})
    }
})

module.exports = router