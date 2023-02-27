const Pool = require("pg").Pool;

const pool = new Pool({
            user: 'postgres_user',
            host: '192.168.1.23',
            database: 'postgres_user',
            password: '12345',
            port: 54321,
        });

module.exports = pool