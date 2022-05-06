const curp = require("curp");

function validateCURP (property) {
    return (req, res, next) => {
    const data = req[property].curp;
        if (curp.validar(data)) {
            next(data)
        } else {
            res.status(400).json({
                message: "Curp no valida"
            })
        }
    }
}

function errorCurp (req, res, next) {
    res.status(400).json({
        message: "Curp no valida"
    })
}

module.exports = { validateCURP, errorCurp }