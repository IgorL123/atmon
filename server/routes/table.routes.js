const {Router} = require('express')
const db = require('../database')
const router = Router()

// /api/table/...

router.get('/getclients', async (req,res) => {
    try {
        const clients = await db.query('SELECT * from client')
        res.json(clients.rows)

    } catch (e) {
        res.status(500).json({message: `Something go wrong... ${e}`})
    }
})
router.get('/getcurrency', async (req,res) => {
    try {
        const cur = await db.query('SELECT * from currency')
        res.json(cur.rows)

    } catch (e) {
        res.status(500).json({message: `Something go wrong... ${e}`})
    }
})

router.get('/getatm', async (req,res) => {
    try {
        const atm = await db.query('SELECT * from atm')
        res.json(atm.rows)

    } catch (e) {
        res.status(500).json({message: `Something go wrong... ${e}`})
    }
})

router.get('/getaccount', async (req,res) => {
    try {
        const acc = await db.query('SELECT * from account')
        res.json(acc.rows)

    } catch (e) {
        res.status(500).json({message: `Something go wrong... ${e}`})
    }
})

router.get('/getcards', async (req,res) => {
    try {
        const card = await db.query('SELECT * from card')
        res.json(card.rows)
    } catch (e) {
        res.status(500).json({message: `Something go wrong... ${e}`})
    }
})

module.exports = router