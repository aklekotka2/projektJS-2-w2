const button = document.querySelector("#getCurrencies");
const input = document.querySelector("#amount");
const select = document.querySelector('#currency');
let selectedCurrency;
let currencies = [];
let exchangeValue;
const resultArea = document.querySelector('#result span');

function createList(currency){
    console.log(currency);
    for(let i = 0; i < currency.length; i++){
        if(currency[i].code ==='USD'){
            currencies.push(currency[i]);
        }else if(currency[i].code ==='EUR'){
            currencies.push(currency[i]);
        }else if(currency[i].code ==='CHF'){
            currencies.push(currency[i]);
        }
    }
    console.log(currencies);
    exchange(currencies);
}

function exchange(currencies){
    
    selectedCurrency = select.options[select.selectedIndex].value;
    console.log('exchange '+ currencies);
    currencies.find((currency) => {
        if (currency.code === selectedCurrency) {
          exchangeValue = currency.mid * input.value;
          console.log('exchangeValue ' +exchangeValue);
        }
    });
    console.log(exchangeValue);
    resultArea.innerText = Number(Math.round(exchangeValue + 'e+2') + 'e-2');;
}
function getCurrencyList(e){
    e.preventDefault();
    const urlAddress = 'http://api.nbp.pl/api/exchangerates/tables/a/?format=json/';
    document.querySelector('.loader').classList.remove('invisible');
    fetch(urlAddress)
    .then((response) => response.json())
    .then((data) => createList(data[0].rates));
    setTimeout(()=>{ document.querySelector('.loader').classList.add('invisible'); }, 3000 ); 
}

button.addEventListener('click', (e) => getCurrencyList(e));
