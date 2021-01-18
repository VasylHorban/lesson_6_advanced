const cout = document.querySelector('#count');

const currencyManager = (function () {
    let coutnBtn = document.querySelector('#count');
    let inputCurrency = document.querySelector('#input-currency');
    let amount = document.querySelector('#number');
    let radioCurrency = document.querySelectorAll('.to-curr');
    let url = 'http://localhost:3000/';
    let remarkHTML = {
        block: document.querySelector('#remark-block'),
        text: document.querySelector('#remark-text')
    }
    let warningStr = [
        'Будь ласка, введіть суму!',
        'Будь ласка, виберіть різні валюти!',
        'Суму введено некоректно !',
        'Не вдалось отримати результат.'
    ];
    const setEvent = () => {
        coutnBtn.addEventListener('click', start);
        amount.addEventListener('input', ()=> {
            onIput();
        })
    }

    const start = () => {
        if (isEmptyInput()) {
            showRemark(0);
        } else if (isSameCurr()) {
            showRemark(1);
        } else if (!isCorrectAmount()) {
            showRemark(2);
        } else {
            sendRequest(getData());
        }
    }

    const out = (data) => {
        document.querySelector('#out').textContent = filterCount(data.amount) + ' ' + data.code;
    }

    const sendRequest = async (data) => {
        let response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(data)
        })

        let result = await response.json();
        if (result.status === 'OK') {
            console.log(result.message)
            out(result.data)
        } else {
            console.log(result.message)
            showRemark(3);
        }
    }

    const onIput = () => {
        if(isCorrectAmount()){
            amount.classList.remove('red');
            amount.classList.add('green')
            return;
        };
        amount.classList.remove('green');
        amount.classList.add('red')
        return

    }

    const showRemark = (code) => {
        remarkHTML.text.textContent = warningStr[code]
        remarkHTML.block.classList.remove('hide');
        setTimeout(hideRemark, 4000);


    }
    const hideRemark = () => {
        remarkHTML.block.classList.add('hide')
    }

    const isCorrectAmount = () => {
        let isCorrect = true;
        if (isNaN(amount.value)) isCorrect = false;
        return isCorrect
    }
    const isSameCurr = () => {
        let isSame = false;
        radioCurrency.forEach(elem => {
            if (elem.checked) {
                if (elem.value === inputCurrency.value) isSame = true;
            };
        });
        return isSame;
    }
    const isEmptyInput = () => {
        let isEmty = false;
        if (amount.value === '' || amount.value === null || amount.value === undefined) {
            isEmty = true
        }
        return isEmty;
    }
    const filterCount = (num) =>{
        let arr = num.toString().split('');
        let counter = 0;
        let minusNumber = 1;
        if(arr.includes('.'))minusNumber = 4;
        for(let i = arr.length - minusNumber; i > 0; i--){
            if(counter === 2){
                arr.splice(i, 0, ' ')
                i--;
                counter = 0
            }
            counter++;
            
    
        }
        return arr.join('')
    }

    const getData = () => {
        let obj = {};
        obj.fromCurr = inputCurrency.value;
        radioCurrency.forEach(elem => {
            if (elem.checked) obj.toCurr = elem.value;
        })
        obj.amount = amount.value;
        return obj
    }

    const init = () => {
        setEvent();
    }
    return {
        init: init
    }
})();

currencyManager.init();


