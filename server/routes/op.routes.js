const {Router} = require('express')
const db = require("../database")
const router = Router()

router.post('/get', async (req,res) => {
    try {
        const ops = await db.query("SELECT transaction.id, account_id, card_id, c.name, atm_id, value, transaction.place, date, blocked," +
            "c.exchange_ration2rub  FROM transaction\n" +
            "    JOIN currency c on transaction.currency_id = c.id JOIN atm a on transaction.atm_id = a.id")
        res.json(ops.rows)
    } catch (e) {
        res.status(500).json({message: 'Something go wrong...'})
    }
})

router.post('/delete', async (req,res) => {
    try {


    } catch (e) {
        res.status(500).json({message: 'Something go wrong...'})
    }
})

module.exports = router