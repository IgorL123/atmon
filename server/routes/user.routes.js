const {Router} = require('express')
const db = require('../database')
const bcrypt = require('bcryptjs')
fs = require("fs")
const router = Router()
const pwdChars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
const pwdLen = 10;


// /api/user/...

router.get('/getusers', async (req,res) => {
    try {
        const data = await db.query('SELECT * from users')
        res.json(data.rows)

    } catch (e) {
        res.status(500).json({message: `Something go wrong... ${e}`})
    }
})

router.get('/getuser', async (req,res) => {
    try {
        const {email} = req.body
        const data = await db.query('SELECT * from users WHERE email = ($1)', [email])
        res.json(data.rows)
    } catch (e) {
        res.status(500).json({message: `Something go wrong... ${e}`})
    }
})

router.post('/adduser', async (req,res) => {
    try {
        const randPassword = new Array(pwdLen).fill(0).map(x => (function(chars) { let umax = Math.pow(2, 32), r = new Uint32Array(1), max = umax - (umax % chars.length); do { crypto.getRandomValues(r); } while(r[0] > max); return chars[r[0] % chars.length]; })(pwdChars)).join('');
        const {email, superuser} = req.body
        fs.writeFileSync("./pass.txt", email + " " + randPassword, "ascii");
        const hashpass = await bcrypt.hash(randPassword, 12)
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