const BASE_URL = "https://v6.exchangerate-api.com/v6/fdd54ba3f762b1b691b286b7/pair";
let dropdowns = document.querySelectorAll(".drop-down select")
let btn= document.querySelector("button");
let fromCur = document.querySelector(".from select");
let toCur = document.querySelector(".to select");
let msg = document.querySelector(".msg")
let amountInput = document.getElementById('amountInput')

amountInput.addEventListener('input', () => {
  btn.click()
})

for (let select of dropdowns){
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


const updateFlag = (element) => {
  let currCode = element.value;
  let countryCode = countryList[currCode];
  let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
  let img = element.parentElement.querySelector("img");
  img.src = newSrc;
  btn.click()
};

btn.addEventListener("click",async (evt) => {
  evt.preventDefault();
  let amount = document.querySelector("form input");
  let amt = amount.value;
  if(amt===""|| amt<1) {
    amt = 1;
    amount.value = 1;
  }
  const URL = `${BASE_URL}/${fromCur.value}/${toCur.value}`;
  let response = await fetch(URL);
  let data = await response.json();
  let rate = data.conversion_rate;
  
  let finalAmount = amt * rate;
  msg.innerText = `${amt} ${fromCur.value} = ${finalAmount} ${toCur.value}`;
})

addEventListener('load', () => {
  btn.click()
})


