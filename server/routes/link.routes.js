const {Router} = require('express')
const auth = require('../middleware/auth.middleware')
const router = Router()

router.post('/make', async (req,res) => {
    try {


    } catch (e) {
        res.status(500).json({message: `Something go wrong... ${e}`})
    }

})

router.post('/get', async (req,res) => {
    try {

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

router.post('/complete', async (req,res) => {
    try {


    } catch (e) {
        res.status(500).json({message: `Something go wrong...${e}`})
    }
})

router.post('/edit', async (req,res) => {
    try {

    } catch (e) {
        res.status(500).json({message: 'Something go wrong...'})
    }
})




module.exports = router