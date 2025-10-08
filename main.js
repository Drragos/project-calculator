let currentNum = "";
let previousNum = "";
let operator = "";

window.addEventListener("keydown", handleKeyPress);

function handleKeyPress(e) {
  e.preventDefault();
  if (e.key >= 0 && e.key <= 9) {
    handleNumber(e.key);
  }
  if (e.key === "+" || e.key === "-" || e.key === "*" || e.key === "/") {
    handleOperator(e.key === "*" ? "×" : e.key === "/" ? "÷" : e.key);
  }
  if (e.key === "Enter" || e.key === "=") {
    if (currentNum !== "" && previousNum !== "") {
      calculate();
    }
  }
  if (e.key === "Backspace") {
    handleDelete();
  }
  if (e.key === ".") {
    addDecimal();
  }
}

const currentDisplayNumber = document.querySelector(".currentNumber");
const previousDisplayNumber = document.querySelector(".previousNumber");

const equal = document.querySelector(".equal");
equal.addEventListener("click", () => {
  if (currentNum !== "" && previousNum !== "") {
    calculate();
  }
});

const clear = document.querySelector(".clear");
clear.addEventListener("click", clearCalculator);

const decimal = document.querySelector(".decimal");
decimal.addEventListener("click", () => {
  addDecimal();
});

const numberButtons = document.querySelectorAll(".number");
const operators = document.querySelectorAll(".operator");

numberButtons.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    handleNumber(e.target.textContent);
  });
});

function handleNumber(number) {
  // If a result is showing and no operator is selected, start new calculation
  if (previousNum !== "" && currentNum === "" && operator === "") {
    previousNum = "";
    previousDisplayNumber.textContent = "";
    currentDisplayNumber.textContent = "";
  }
  if (currentNum.length <= 11) {
    currentNum += number;
    currentDisplayNumber.textContent = currentNum;
  }
}

operators.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    let op = e.target.textContent;
    if (op === "x" || op === "*") op = "×";
    if (op === "/") op = "÷";
    handleOperator(op);
  });
});

function handleOperator(op) {
  // If a result is showing and user clicks an operator, start chaining
  if (previousNum !== "" && currentNum === "" && operator === "") {
    operator = op;
    previousDisplayNumber.textContent = previousNum + " " + operator;
    currentDisplayNumber.textContent = "";
    return;
  }

  // If starting a new operation
  if (previousNum === "") {
    previousNum = currentNum;
    operatorCheck(op);
  }
  // If chaining operations (both operands present)
  else if (currentNum !== "") {
    calculate();
    operator = op;
    previousDisplayNumber.textContent = previousNum + " " + operator;
    currentNum = "";
  }
  // If operator is changed before entering second operand
  else {
    operatorCheck(op);
  }
}

function operatorCheck(txt) {
  operator = txt;
  previousDisplayNumber.textContent = previousNum + " " + operator;
  currentNum = "";
  currentDisplayNumber.textContent = "";
}

function calculate() {
  previousNum = Number(previousNum);
  currentNum = Number(currentNum);

  if (operator === "+") {
    previousNum += currentNum;
  } else if (operator === "-") {
    previousNum -= currentNum;
  } else if (operator === "×") {
    previousNum *= currentNum;
  } else if (operator === "÷") {
    if (currentNum === 0) {
      previousNum = "Error, cannot divide by 0";
      displayResult();
      return;
    } else {
      previousNum /= currentNum;
    }
  }

  previousNum = roundNumber(previousNum);
  previousNum = previousNum.toString();
  displayResult();

  function roundNumber(num) {
    return Math.round(num * 100000) / 100000;
  }

  function displayResult() {
    if (previousNum.length <= 11) {
      currentDisplayNumber.textContent = previousNum;
    } else {
      currentDisplayNumber.textContent = previousNum.slice(0, 11) + "...";
    }
    previousDisplayNumber.textContent = "";
    operator = "";
    currentNum = "";
  }
}

function clearCalculator() {
  currentNum = "";
  previousNum = "";
  operator = "";
  currentDisplayNumber.textContent = "0";
  previousDisplayNumber.textContent = "";
}

function addDecimal() {
  if (!currentNum.includes(".")) {
    currentNum += ".";
    currentDisplayNumber.textContent = currentNum;
  }
}

function handleDelete() { 
    if (currentNum !== "") {
    currentNum = currentNum.slice(0, -1);
    currentDisplayNumber.textContent = currentNum;
    if (currentNum === "") {
      currentDisplayNumber.textContent = "0";
    }
  }
  if (currentNum === "" && previousNum !== "" && operator === "") {
    previousNum = previousNum.slice(0, -1);
    currentDisplayNumber.textContent = previousNum;
};
};
