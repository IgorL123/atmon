const {Router} = require('express')
const db = require("../database")
const router = Router()

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
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

router.post('/getrange', async (req,res) => {
    try {
        const {date1, date2} = req.body
        const ops = await db.query("SELECT transaction.id, account_id, card_id, c.name, atm_id, value, transaction.place, date, blocked," +
            "c.exchange_ration2rub  FROM transaction\n" +
            "    JOIN currency c on transaction.currency_id = c.id JOIN atm a on transaction.atm_id = a.id" +
            "   WHERE date BETWEEN ($1) AND ($2)", [date1, date2])
        res.json(ops.rows)
    } catch (e) {
        res.status(500).json({message: 'Something go wrong...'})
    }
})



router.post('/block', async (req,res) => {
    try {
        await db.query('BEGIN')
        const index = req.body.index
        await db.query('LOCK TABLE transaction ')
        const result = await db.query("SELECT id FROM transaction WHERE id=($1) FOR UPDATE nowait ", [index])
        await sleep(1000)
        if( result.rowCount === 0) {
            await db.query("ROLLBACK")
            res.json(500)
        }
        await db.query("UPDATE transaction SET blocked = not blocked WHERE id=($1)", [index])
        await db.query("COMMIT")
        res.json(100)
    } catch (e) {
        res.status(500).json({message: `Something go wrong... ${e}`})
    }
})

module.exports = router