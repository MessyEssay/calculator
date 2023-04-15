//bind buttons
let currentNum = [];
let lastSolved = "";
let nextInput = "";
let answer = "";

const buttons = document.getElementsByTagName('button');
const pastWork = document.querySelector('.pastWork');
const answerBox = document.querySelector('.answer');

//console.log(buttons)

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
    console.table([ "currentNum = " + currentNum, "lastSolved = " + lastSolved, "nextInput = " + nextInput, "answer = " + answer]);
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

function solve() {
  if (!currentNum.length) {
    answer = '';
    return;
  }
  const expression = `${lastSolved} ${nextInput} ${currentNum.join('')}`;
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

function evaluateThis(expression) {
  const stack = [];
  const operators = ["+", "-", "*", "/"];

  for (let i = 0; i < expression.length; i++) {
    const token = expression[i];

    if (!isNaN(token)) {
      //if the token is a num, push it on to the stack
      stack.push(parseFloat(token));
    } else if (operators.includes(token)) {
      // If the token is an operator, pop the last two numbers off the stack,
      // perform the operation, and push the result back onto the stack
      const b = stack.pop();
      const a = stack.pop();

      switch (token) {
        case "*":
            stack.push(a * b);
            break;
        case "/":
            stack.push(a / b);
            break;
        case '+':
            stack.push(a + b);
            break;
        case '-':
            stack.push(a - b);
            break;
      }
    }
  }
  return stack.pop();
}