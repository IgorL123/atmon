const Pool = require("pg").Pool;

const pool = new Pool({
            user: 'postgres_user',
            host: '172.16.184.27',
            database: 'postgres_user',
            password: '12345',
            port: 54321,
        });

module.exports = pool