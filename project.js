const BASEURL =
    "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies";
const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector(".btn")
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const msg = document.querySelector(".msg");


//update the dropdown by code.js  means add the country code 
for (let select of dropdowns) {
    for (currCode in countryList) {
        let newOption = document.createElement("option");
        newOption.innerText = currCode;
        newOption.value = currCode;
        if (select.name === "from" && currCode === "USD") {
            newOption.selected = "selected";
        } else if (select.name === "to" && currCode === "INR") {
            newOption.selected = "selected";
        }
        select.append(newOption);
    }
    select.addEventListener("change", (evt) => {
        updateFlag(evt.target);
    });
}
//Calculating the exchange rate and changing dynamic api
const updateExchange = async() => {
    let amount = document.querySelector(".amount input");
    let amval = amount.value;
    if (amval === "" || amval < 1) { // if any one write -5 then it will write 1
        amval = 1;
        amount.value = "1";
    }

    const url = `${BASEURL}/${fromCurr.value.toLowerCase()}/${toCurr.value.toLowerCase()}.json`;
    let response = await fetch(url);
    let data = await response.json();
    let rate = data[toCurr.value.toLowerCase()]
    let finalAmount = amval * rate;
    msg.innerText = ` ${amval} ${fromCurr.value} = ${finalAmount} ${ toCurr.value }`;
}

//update the flag
const updateFlag = (element) => {
    let currCode = element.value;
    let countryCode = countryList[currCode];
    let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
    let img = element.parentElement.querySelector("img");
    img.src = newSrc;
};

//get exchange rate
btn.addEventListener("click", (evt) => {
    evt.preventDefault(); //when submit form page will refresh but we dont want this
    updateExchange();

});

//First page loading
window.addEventListener("load", () => {
    updateExchange();

});