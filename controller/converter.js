const jsonService = require('../model/converter.service')

const get_currency = (req, res) => {
    jsonService.converterManager(req, (result) =>{
        res.send(result)
    });
}

module.exports = {
    get_currency
};