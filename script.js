const data = {
  USD: { EUR: 0.82, GBP: 0.74, TRY: 7.6 },
  EUR: { USD: 1.23, GBP: 0.91, TRY: 9.34 },
  GBP: { USD: 1.35, EUR: 1.10, TRY: 10.2 },
  TRY: { USD: 0.13, EUR: 0.11, GBP: 0.09 }
};

const currencyKeys = Object.keys(data);

function createCurrencyElements(elements, root, inputName) {
  for (let i = 0; i < elements.length; i++) {
    const currencyKeyDiv = document.createElement("div");
    const currencyKeyInput = document.createElement("input");
    currencyKeyInput.setAttribute("type", "radio");
    currencyKeyInput.setAttribute("name", inputName);
    currencyKeyInput.setAttribute("id", inputName + elements[i]);
    currencyKeyInput.setAttribute("value", elements[i]);

    const currencyKeyLabel = document.createElement("label");
    currencyKeyLabel.setAttribute("for", inputName + elements[i]);
    currencyKeyLabel.textContent = elements[i];

    currencyKeyDiv.appendChild(currencyKeyInput);
    currencyKeyDiv.appendChild(currencyKeyLabel);
    root.appendChild(currencyKeyDiv);
  }
}

//from
const parentEl = document.querySelector("#currency-box-from");
const fromInputName = "currency_from";
createCurrencyElements(currencyKeys, parentEl, fromInputName);

// to
const parentToEl = document.querySelector("#currency-box-to");
const toInputName = "currency_to";
createCurrencyElements(currencyKeys, parentToEl, toInputName);

const calculateButton = document.querySelector("#calculate-button");
const currencyResult = document.querySelector("#currency-result");

calculateButton.addEventListener("click", function () {

  // from seçili mi değil mi
  let isFromChecked = document.querySelector("input[name='currency_from']:checked");

  // to seçili mi değil mi
  let isToChecked = document.querySelector("input[name='currency_to']:checked");

  if (!isFromChecked || !isToChecked) {
    currencyResult.innerHTML = "Please choose both currencies";
    return;
  }

  // kimden ceviriyourz
  const fromTarget = document.querySelector("input[name='currency_from']:checked").value;

  // kime ceviriyoruz
  const toTarget = document.querySelector("input[name='currency_to']:checked").value;

  if (fromTarget == toTarget) {
    currencyResult.innerHTML = "Please choose two different currencies";
    return;
  }

  // amountu alalim
  const amount = document.querySelector("input[name='amount']").value;

  if (isNaN(amount)) {
    currencyResult.innerHTML = "Please enter a number!";
    return;
  }

  const currentCurrencyObject = data[fromTarget];
  const resultForOne = currentCurrencyObject[toTarget];
  const result = amount * resultForOne;

  currencyResult.innerHTML = amount + " " + fromTarget + " = " + result + " " + toTarget;
});