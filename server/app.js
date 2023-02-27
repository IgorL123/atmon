const express = require('express')
const config = require('config')
const app = express()

app.use(express.json({ extended: true }))
app.use('/api/auth', require('./routes/auth.routes'))
app.use('/api/op', require('./routes/op.routes'))
app.use('/api/table' , require('./routes/table.routes'))
app.use('/api/user', require('./routes/user.routes'))

const PORT = config.get('port') || 5000

async function start() {
        app.listen(PORT, () => console.log(`App has been started on port ${PORT}...`))
}

start()

