const db = require('../database')


class authController {
    async createUser(req, res){
        const {name, password_number} = req.body
        const  Person = await db.query('INSERT INTO users VALUES($1, $2)', [name , password_number])
        res.json(Person)
    }
    async getUsers(req, res){
        const users = await db.query("SELECT * FROM users")
        res.json(users.rows[1])

    }
    async getOneUser(req, res){
        const user = await db.query("SELECT * FROM users WHERE id = $1", [res.params.id])
        res.json(user.rows)
    }
    async updateUser(req, res){

    }
    async deleteUser(req, res){
        const user = await db.query("DELETE users WHERE id = $1", [res.params.id])
    }
}

module.exports = new authController()