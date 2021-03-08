const {Router} = require('express')
const Task = require('../models/Task')
const User = require('../models/User')
const auth = require('../middleware/auth.middleware')
const config = require('config')
const router = Router()

router.post('/make', auth, async (req,res) => {
    try {

        const {from} = req.body

        const task = new Task({
            text: from, author: req.user.userId
        })

        await task.save()
        res.status(201).json({task})

    } catch (e) {
        res.status(500).json({message: 'Something go wrong...'})
    }

})

router.get('/', auth, async (req,res) => {
    try {

        const personal_tasks = await Task.find({author: req.user.userId})
        res.json(personal_tasks)

    } catch (e) {
        res.status(500).json({message: 'Something go wrong...'})
    }
})

router.get('/delete', auth, async (req,res) => {
    try {


    } catch (e) {
        res.status(500).json({message: 'Something go wrong...'})
    }
})

module.exports = router