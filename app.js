const BASE_URL =
  "https://v6.exchangerate-api.com/v6/fdd54ba3f762b1b691b286b7/pair";
let dropdowns = document.querySelectorAll(".drop-down select");
let btn = document.querySelector("button");
let fromCur = document.querySelector(".from select");
let toCur = document.querySelector(".to select");
let msg = document.querySelector(".msg");
let amountInput = document.getElementById("amountInput");
let currentCurrencyRate = 0;
let currencyFrom = "USD";
let currencyTo = "INR";

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

const updateFlag = async (element) => {
  let currCode = element.value;

  if (element.name === "from") {
    currencyFrom = currCode;
  } else {
    currencyTo = currCode;
  }

  let countryCode = countryList[currCode];
  let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
  let img = element.parentElement.querySelector("img");
  img.src = newSrc;
  await getCurrency();
  msg.innerText = `${amountInput.value} ${currencyFrom} = ${
    amountInput.value * currentCurrencyRate
  } ${currencyTo}`;
};

btn.addEventListener("click", async (evt) => {
  evt.preventDefault();
  let amt = amountInput.value;
  if (amt === "" || amt < 1) {
    amt = 1;
    amountInput.value = 1;
  }

  let finalAmount = amt * currentCurrencyRate;
  msg.innerText = `${amt} ${currencyFrom} = ${finalAmount} ${currencyTo}`;
});

window.addEventListener("load", async () => {
  await getCurrency();
  msg.innerText = `${amountInput.value} ${currencyFrom} = ${
    amountInput.value * currentCurrencyRate
  } ${currencyTo}`;
});

const getCurrency = async () => {
  const URL = `${BASE_URL}/${currencyFrom}/${currencyTo}`;
  let response = await fetch(URL);
  let data = await response.json();
  currentCurrencyRate = data.conversion_rate;
};
