const {Router} = require('express')
const db = require("../database")
const router = Router()

router.post('/get', async (req,res) => {
    try {
        const date = req.body.date
        const ops = await db.query("SELECT transaction.id, account_id, card_id, c.name, atm_id, value, transaction.place, date, blocked," +
            "c.exchange_ration2rub  FROM transaction\n" +
            "    JOIN currency c on transaction.currency_id = c.id JOIN atm a on transaction.atm_id = a.id" +
            "   WHERE date = ($1)", [date])
        res.json(ops.rows)
    } catch (e) {
        res.status(500).json({message: 'Something go wrong...'})
    }
})


router.post('/block', async (req,res) => {
    try {
        const index = req.body.index
        const ops = await db.query("UPDATE transaction SET blocked = not blocked WHERE id=($1)", [index])
        res.json(ops.rows)
    } catch (e) {
        res.status(500).json({message: 'Something go wrong...'})
    }
})

module.exports = router