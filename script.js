//bind buttons
let currentNum = []

const buttons= document.getElementsByTagName('button')

console.log(buttons)

for (let i = 0; i < buttons.length; i++) {
    const button = buttons[i];

    //adding a click event listener to the buttons
    button.addEventListener('click',event=>{
            const input= event.target.innerHTML;
            switch(input) {
                case "+":
                case "-":
                case "*":    
                case "/":
                    //seperate previous from current add opperator
                case "=":
                    //solve()
                case "c":
                    //clear()
                default:
                    currentNum.push(input)
        }
        currentNum = currentNum.join('');
        currentNum = currentNum.split()
        console.log(currentNum)
    })


    //adding a keydown listener 
    button.addEventListener('keydown',event=>{
        const input = event.key;
        switch (input) {
            case "+":
            case "-":
            case "*":
            case "/":
                //seperate previous from current add opperator
            case "Enter":
                //solve()
            case "c":
                //clear()
            default:
                currentNum.push(input)
    }
    currentNum = currentNum.join('');
    currentNum = currentNum.split()
    console.log(currentNum)
  });
}

// console.log(buttons)

//make a place to store shit
    //-lastSolved, -nextImput, -answer

    //imput: display both lastSolved and nextImput in .pastWork
        //lastSolved (eval) nextImput

    //output: display answer in .answerBox

//make a  few functions
    //*solve, *clear