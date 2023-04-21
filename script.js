//initalize variables
let currentNum = [];
let lastSolved = "";
let nextInput = "";
let answer = "";

//bind buttons
const buttons = document.getElementsByTagName('button');
const pastWork = document.querySelector('.pastWork');
const answerBox = document.querySelector('.answer');

//add listiners
for (let i = 0; i < buttons.length; i++) {
  const button = buttons[i];

  //adding a click event listener to the buttons
  button.addEventListener('click', (event) => {
    const input = event.target.textContent;
    switch (input) {
      case "+":
      case "-":
      case "*":
      case "/":
        //separate previous from current add operator
        nextInput += ` ${input} `;
        break;
      case "=":
        solve();
        break;
      case "CL":
        clear();
        break;
      default:
        currentNum.push(input);
        nextInput += input;
    }
    updateDisplay();
  });

  //adding a keydown listener
  button.addEventListener('keydown', event => {
    const input = event.key;
    switch (input) {
      case "+":
      case "-":
      case "*":
      case "/":
        // separate previous from current add operator
        nextInput += ` ${input} `;
        break;
      case "0":
      case "1":
      case "2":
      case "3":
      case "4":
      case "5":
      case "6":
      case "7":
      case "8":
      case "9":
        currentNum.push(input);
        nextInput += input;
        break;
      case "Enter":
        solve();
        break;
      case "c":
        clear();
        break;
      default:
        alert("not an option");
    }
    updateDisplay();
  });

}

function clear() {
  currentNum = [];
  lastSolved = "";
  nextInput = "";
  answer = "";
}

function updateDisplay() {
  pastWork.innerHTML = `${lastSolved} ${nextInput}`;
  answerBox.innerHTML = answer;
}

function solve() {
  if (!currentNum.length) {
    answer = '';
    return;
  }
  let expression = `${lastSolved} ${nextInput}`;
  if (currentNum.length) {
    expression += ` ${currentNum.join('')}`;
  }
  try {
    const result = evaluateThis(expression);

    lastSolved = expression;
    nextInput = result.toString();
    currentNum = [result.toString()];
    answer = result.toString();
  } catch (error) {
    answer = 'Error!';
  }
}

function evaluateThis(expression) {
  const stack = [];
  const operatorStack = [];
  const operators = ["+", "-", "*", "/"];

  let currentNumber = "";

  for (let i = 0; i < expression.length; i++) {
    const token = expression[i];

    if (!isNaN(token) || token === ".") {
      // If the token is a digit or a decimal point, add it to the current number
      currentNumber += token;
    } else if (operators.includes(token)) {
      // If the token is an operator, push the current number onto the stack
      // and reset the current number to an empty string. Then, push the operator
      // onto the operator stack.
      if (currentNumber !== "") {
        stack.push(parseFloat(currentNumber));
        currentNumber = "";
      }
      operatorStack.push(token);
    } else if (token === " ") {
      // If the token is a space, ignore it.
      continue;
    } else {
      throw new Error("Invalid token: " + token);
    }

    if (stack.length >= 2 && operatorStack.length > 0) {
      const b = stack.pop();
      const a = stack.pop();
      const operator = operatorStack.pop();
      switch (operator) {
        case "+":
          stack.push(a + b);
          break;
        case "-":
          stack.push(a - b);
          break;
        case "*":
          stack.push(a * b);
          break;
        case "/":
          stack.push(a / b);
          break;
        default:
          throw new Error("Invalid operator: " + operator);
      }
    }
  }

  if (stack.length !== 1 || operatorStack.length !== 0) {
    throw new Error("Invalid expression.");
  }

  return stack.pop();
}

