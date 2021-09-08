const { Router } = require('express');
const { ...yup } = require('yup');

const AppError = require('../errors/AppError');
const sanitizeSQLValue = require('../util/sanitizeSQLValue');

const routes = Router();

routes.get('/', async (req, res, next) => {
    // Verifica se as informações foram enviadas corretamente
    const schema = yup.object().shape({
        id: yup.number(), // id do tipo numero e não é obrigatório
        name: yup.string().required().min(5), // nome do tipo string, obrigatória e com no minimo tamanho 5
        date: yup.date().required() // date do tipo date (com timezone) e é obrigatorio 
    });
    
    const { id, name, date } = req.query;

        // Verifica se não passou na validação
    if(!(await schema.isValid({ id, name, date })))
        throw new AppError('Erro de Validação');

    // valores na ordem que aparecem na query
    let sqlValues = [
        name,
        date,
    ];

    // Limpa os imputs
    sqlValues = sanitizeSQLValue(sqlValues);
    
    req.mysql.query(`
        SELECT *
        FROM users
        WHERE name LIKE concat('%', ?, '%');asd
        
        SELECT *
        FROM users
        WHERE date = ?;
    `, sqlValues, (err, result) => {
        if (err) return next(err);

        return res.json(result);
    });
});

module.exports = routes