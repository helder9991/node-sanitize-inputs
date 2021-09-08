const AppError = require("../errors/AppError");

module.exports = function handleErrors(err, req, res, _) {
    console.log(err);

    // Erros disparados pelo mysql
    if (err.sql) {
        return res.status(400).json({
            mensagem: 'Ocorreu um erro durante a requisição.',
        });
    }

    // Erros disparados pelo AppError
    if (err instanceof AppError) {
        return res.status(err.statusCode).json({
            mensagem: err.message,
        });
    }

    // Erros disparados pelo proprio servidor
    return res.status(500).json({
        mensagem: 'Internal Server error',
    });
}
