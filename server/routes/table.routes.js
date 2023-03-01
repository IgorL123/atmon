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

router.post('/getcurrencydata', async (req,res) => {
    try {
        const {date1, date2} = req.body
        const cur = await db.query('SELECT currency.name, SUM(t.value) AS sum, count(t.value), sum(t.value * exchange_ration2rub) AS RUB from currency\n' +
            'JOIN transaction t on currency.id = t.currency_id\n' +
            'WHERE date BETWEEN ($1) AND ($2)\n' +
            'GROUP BY name\n' +
            'ORDER BY sum(t.value) DESC;',[date1, date2])
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

router.post('/getatmsdata', async (req,res) => {
    try {
        const {date1, date2} = req.body
        const atm = await db.query('SELECT atm.number, atm.bank_name, atm.place, COUNT(t.id) AS count, SUM(value) as cash FROM atm\n' +
            'JOIN transaction t on atm.id = t.atm_id\n' +
            'WHERE t.date BETWEEN ($1) AND ($2)\n' +
            'GROUP BY atm.id\n' +
            'ORDER BY COUNT(t.id) DESC;', [date1, date2])
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