console.log("javascript is running")
let input = document.querySelector('#amount')
let country1 = document.querySelector('#country1')
let country2 = document.querySelector('#country2')
let button = document.querySelector('.button');
let result = document.createElement('div');
result.classList.add("result");
button.appendChild(result);

async function loadCountries() {
    try {
        let response = await fetch(
            "https://api.restcountries.com/countries/v5?response_fields=names.common,names.native,names.official,currencies,flag.emoji&limit=100&offset=0&api-key=rc_live_cc69a97858ab4532a3ea4027a39c5f2a&pretty=1"
        );

        let data = await response.json();

        console.log(data); // Check the API response

        if (!response.ok || data.errors) {
            throw new Error(JSON.stringify(data.errors || data));
        }

        let countries = data.data.objects;


        let country1 = document.querySelector("#country1");
        let country2 = document.querySelector("#country2");
        country1.innerHTML = "";
        country2.innerHTML = "";

        countries.forEach(country => {
            country.currencies.forEach(currency => {
                let code = currency.code;
                let name = currency.name;

                [country1, country2].forEach(select => {
                    if (![...select.options].some(option => option.value === code)) {
                        let option = document.createElement("option");
                        option.value = code;
                        option.textContent =
                            `${country.flag.emoji} ${code} - ${name}`;

                        select.appendChild(option);
                    }
                });
            });
        });
    } catch (error) {
        console.error("Failed to load countries:", error);
    }
}

loadCountries();

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







