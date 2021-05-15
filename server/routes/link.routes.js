const {Router} = require('express')
const Task = require('../models/Task')
const auth = require('../middleware/auth.middleware')
const router = Router()

router.post('/make', async (req,res) => {
    try {

        const task = new Task({
            text: req.body.value,
            author: req.body.userId,
            desk: req.body.deskInfo,
            date: req.body.date
        })

        await task.save()
        res.status(201).json({task})

    } catch (e) {
        res.status(500).json({message: `Something go wrong... ${e}`})
    }

})

router.post('/get', async (req,res) => {
    try {
        const personal_tasks = await Task.find({author: req.body.userId, desk: req.body.deskInfo})
        res.json(personal_tasks)

    } catch (e) {
        res.status(500).json({message: 'Something go wrong...'})
    }
})

router.post('/delete', async (req,res) => {
    try {

        const del = await Task.findByIdAndDelete(req.body.index)
        res.json(del)
        //res.status(201).json({message: 'Task deleted successfully'})

    } catch (e) {
        res.status(500).json({message: 'Something go wrong...'})
    }
})

router.post('/edit', async (req,res) => {
    try {

        //const edit = await Task.findByIdAndUpdate(req.body.index, {req.body.newtext})
        res.status(201).json({message: 'Task edited successfully'})

    } catch (e) {
        res.status(500).json({message: 'Something go wrong...'})
    }
})


module.exports = router