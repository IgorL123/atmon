const {Router} = require('express')
const Task = require('../models/Task')
const User = require('../models/User')
const auth = require('../middleware/auth.middleware')
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
        res.status(500).json({message: `Something go wrong... ${e}`})
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

router.post('/delete', auth, async (req,res) => {
    try {

        const del = await Task.findByIdAndDelete(req.body.index)
        res.status(201).json({message: 'Task deleted successfully'})

    } catch (e) {
        res.status(500).json({message: 'Something go wrong...'})
    }
})

router.post('/edit', auth, async (req,res) => {
    try {

        //const edit = await Task.findByIdAndUpdate(req.body.index, {req.body.newtext})
        res.status(201).json({message: 'Task edited successfully'})

    } catch (e) {
        res.status(500).json({message: 'Something go wrong...'})
    }
})


module.exports = router