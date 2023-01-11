const button = document.querySelector("#getCurrencies");
const input = document.querySelector("#amount");
const select = document.querySelector('#currency');
let selectedCurrency;
let currencies = [];
let exchangeValue;
const resultArea = document.querySelector('#result span');
const errArea = document.querySelector('.err');
const apiErrArea = document.querySelector('.api-err');

function validate(val){
    if(val < 0){
        errArea.innerText = 'Wartość musi być dodatnia.';
        return false;
    }
    errArea.innerText = '';
    return true;
}

function createList(currency){
    const requiredCurrencies = ['USD', 'EUR', 'CHF']
    for(let i = 0; i < currency.length; i++){
	        if(requiredCurrencies.includes(currency[i].code)){
	            currencies.push(currency[i]);
	        }
    }
    exchange(currencies);
}

function exchange(currencies){   
    if( validate(input.value)){
        selectedCurrency = select.options[select.selectedIndex].value;
        currencies.find((currency) => {
            if (currency.code === selectedCurrency) {
              exchangeValue = currency.mid * input.value;
            }
        });
        resultArea.innerText = exchangeValue.toFixed(2);
    }
    else{
        resultArea.innerText = 0;
    }  
}

function getCurrencyList(e){
    e.preventDefault();
    const urlAddress = 'https://api.nbp.pl/api/exchangerates/tables/a/?format=json/';
    document.querySelector('.loader').classList.remove('invisible');
    fetch(urlAddress)
    .then((response) => response.json())
    .then((data) => createList(data[0].rates))
    .catch(error => apiErrArea.innerText = `Nastąpił błąd: ${error}`)
    .finally(document.querySelector('.loader').classList.add('invisible')); 
}

button.addEventListener('click', (e) => getCurrencyList(e));
