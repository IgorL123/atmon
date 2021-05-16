const {Router} = require('express')
const Desk = require('../models/Desk')
const Task = require('../models/Task')
const router = Router()
const auth = require('../middleware/auth.middleware')

// /api/desk/...

router.post('/getdesks', async (req,res) => {
    try {

        let desks = await Desk.find({author: req.body.userId})
        res.json(desks)

    } catch (e) {
        res.status(500).json({message: `Something go wrong... ${e}`})
    }
})


router.post('/createdesk', async (req,res) => {
    try {

        const desk = new Desk({
            text: req.body.value, author: req.body.userId
        })

        await desk.save()
        res.status(201).json({desk})

    } catch (e) {
        res.status(500).json({message: 'Something go wrong...'})
    }
})

router.post('/deletedesk', async (req,res) => {
    try {
        const del1 = await Desk.findByIdAndDelete(req.body.index)
        const del2 = await Task.deleteMany({desk: req.body.deskInfo})
        res.json(del1)
        //res.status(201).json({message: 'Desk deleted successfully'})

    } catch (e) {
        res.status(500).json({message: `Something go wrong...${e}`})
    }
})

module.exports = router