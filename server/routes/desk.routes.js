const {Router} = require('express')

const router = Router()
const ath = require('../middleware/auth.middleware')

// /api/desk/...

router.post('/getdesks', async (req,res) => {
    try {

        //let desks = await Desk.find({author: req.body.userId})
        //res.json(desks)

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

    } catch (e) {
        res.status(500).json({message: `Something go wrong...${e}`})
    }
})

module.exports = router