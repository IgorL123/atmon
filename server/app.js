const express = require('express')
const config = require('config')
const app = express()

app.use(express.json({ extended: true }))
app.use('/api/auth', require('./routes/auth.routes'))
app.use('/api/op', require('./routes/op.routes'))
app.use('/api/desk' , require('./routes/table.routes'))


const PORT = config.get('port') || 5000

async function start() {
        app.listen(PORT, () => console.log(`App has been started on port ${PORT}...`))
}

start()

