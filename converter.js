
// let url = "https://api.exchangerate-api.com/v4/latest/USD";

let myHeaders = new Headers();
myHeaders.append("apikey", "i5Scxb1CoJgSxETP6FMwya3087kvWSj8");

let requestOptions ={
    method:'GET',
    redirect: 'follow',
    headers: myHeaders
};



const dropDowns = document.querySelectorAll(".dropDown");
const btn  = document.querySelector("button");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const msg = document.querySelector("#result");

for (let select of dropDowns) {
    for (currCode in countryList) {
        let newOption = document.createElement("option");
        newOption.innerText = currCode;
        newOption.value = currCode;
        if(select.name === "from" && currCode === "USD"){
            newOption.selected = "selected";
        } else if(select.name === "to" && currCode === "INR"){
            newOption.selected = "selected";
        }
        select.append(newOption);
    }

    select.addEventListener("change", (evt) =>{
        updataFlag(evt.target);
    })
}


const updataFlag = (element) => {
    let currCode = element.value;
    let countryCode = countryList[currCode];
    let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
    let img = element.parentElement.querySelector("img");
    img.src = newSrc;

}

btn.addEventListener("click", async (evt) =>{
    evt.preventDefault();
    let amount = document.querySelector("input");
    let amtValue = amount.value;

    if(amtValue < 1 || amtValue === ""){
        amtValue = 1;
        amount.value = "1";
    }



const BASE_URL = fetch(`https://api.apilayer.com/exchangerates_data/convert?to=${toCurr.value}&from=${fromCurr.value}&amount=${amtValue}`, requestOptions)
    .then((response)=>{
        response.json().then((data)=>{
            // console.log(data.result);
            let finalAmount = data.result ;
            msg.innerText = `${amtValue} ${fromCurr.value} = ${finalAmount} ${toCurr.value}`;
        })
    })
    .catch(error => console.log('error', error));

})





