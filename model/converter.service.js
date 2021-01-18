const api = require('./converter.api');

const converterManager = (req, callback) => {
    const currencyData = {
        amount : +req.body.amount,
        to : req.body.toCurr,
        from : req.body.fromCurr
    }
    api.getJSON((status, data) =>{
        if(status === 200){
        data.forEach(element => {
            if(currencyData.from === element.ccy){
                currencyData.fromPrice = element.buy;
            }
            if(currencyData.to === element.ccy){
                currencyData.toPrice = element.buy;
            }
          })
        
            callback ({status : 'OK' ,message : 'The operation is successful', data : calculate(currencyData)});
        }else{
            callback ({status : 'failed', message: 'Can not get api.privatbank.ua'})
        }
         
   })
}


const calculate = (data) => {
    const result = {
        code : data.to
    }
    if(data.from === 'UAH'){
        result.amount = data.amount / data.toPrice;
    }else if(data.to === 'UAH'){
        result.amount = data.amount*data.fromPrice;
    }else{
        result.amount = (data.amount*data.fromPrice)/data.toPrice;
    }
    result.amount = result.amount.toFixed(2);
    return result;
}

module.exports = {
    converterManager
}