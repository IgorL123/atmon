const {Router} = require('express')
const db = require('../database')
const router = Router()

// /api/table/...

router.post('/getOps', async (req,res) => {
    try {
        const date = req.body
        const ops = await db.query('SELECT * from transaction WHERE data = ($1)', [date])
        res.json(ops)

    } catch (e) {
        res.status(500).json({message: `Something go wrong... ${e}`})
    }
})


router.post('/createdesk', async (req,res) => {
    try {


    } catch (e) {
        res.status(500).json({message: 'Something go wrong...'})
    }
})

router.post('/deletedesk', async (req,res) => {
    try {

        const op = req.body
        await db.query("DELETE FROM transaction WHERE id = ($1)", [op])

    } catch (e) {
        res.status(500).json({message: `Something go wrong...${e}`})
    }
})

module.exports = router