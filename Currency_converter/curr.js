let input = document.querySelector('#amount')
let country1 = document.querySelector('#country1')
let country2 = document.querySelector('#country2')
let button = document.querySelector('.button');
let result = document.createElement('div');
result.classList.add("result");
button.appendChild(result);
button.addEventListener('click',async ()=>{
    result.textContent="";
    let val1= input.value;
    let fromCurrency = country1.value;
    let toCurrency = country2.value;
    if(val1.trim()!=="" && !isNaN(val1) && val1>0){
        const apikey='4fe6b8fe50875de8e626c764'
        const url=`https://v6.exchangerate-api.com/v6/${apikey}/pair/${fromCurrency}/${toCurrency}/${val1}`;    
        try{
            const response = await fetch(url);
            if(!response.ok){
                throw new Error('network response was failed');
            }
            const data = await response.json();
            if(data.result!=='success'){
                throw new Error(data['error-type']||'conversion failed')
            }
            
            result.textContent=`${val1} ${fromCurrency} = ${data.conversion_result} ${toCurrency}`;
        }
        catch(error){
            console.error(error);
            result.textContent="An error has occured, please try again later"
        }
    }
    else{
        result.textContent="Enter a valid Number.";
        return;
    }
    

});







