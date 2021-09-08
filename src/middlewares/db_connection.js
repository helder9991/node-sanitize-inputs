const { createPool } = require('mysql');

module.exports = (req, res, next) => {
    const mysqlPool = createPool({
        multipleStatements: true,
        user: 'root',
        host: 'localhost',
        database: 'Sanitize',
        password: 'docker',
        port: 3306,
    });

    mysqlPool.getConnection((err, connection) => {
        if(err) return next(err);

        req.mysql = connection;
        
        next();
    });
}