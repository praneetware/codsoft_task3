let infixExpression="";

const displayScreen = document.getElementById("display-screen")
function displayExpression(){
    displayScreen.value = infixExpression;
}

const clearBtn = document.getElementById("child-clear-all")
clearBtn.addEventListener("click", function(){
    infixExpression="";
    displayExpression();
});

const delBtn = document.getElementById("op-del")
delBtn.addEventListener("click", function(){
    infixExpression = infixExpression.slice(0, -1)  ;
    displayExpression(); 
});

//Defining the operands
const num1 = document.getElementById("num-1")
num1.addEventListener("click", function(){
    infixExpression = infixExpression.concat("1");
    displayExpression();
});

const num2 = document.getElementById("num-2")
num2.addEventListener("click", function(){
    infixExpression = infixExpression.concat("2");
    displayExpression();
});

const num3 = document.getElementById("num-3")
num3.addEventListener("click", function(){
    infixExpression = infixExpression.concat("3");
    displayExpression();
});

const num4 = document.getElementById("num-4")
num4.addEventListener("click", function(){
    infixExpression = infixExpression.concat("4");
    displayExpression();
});

const num5 = document.getElementById("num-5")
num5.addEventListener("click", function(){
    infixExpression = infixExpression.concat("5");
    displayExpression();
});

const num6 = document.getElementById("num-6")
num6.addEventListener("click", function(){
    infixExpression = infixExpression.concat("6");
    displayExpression();
});

const num7 = document.getElementById("num-7")
num7.addEventListener("click", function(){
    infixExpression = infixExpression.concat("7");
    displayExpression();
});

const num8 = document.getElementById("num-8")
num8.addEventListener("click", function(){
    infixExpression = infixExpression.concat("8");
    displayExpression();
});

const num9 = document.getElementById("num-9")
num9.addEventListener("click", function(){
    infixExpression = infixExpression.concat("9");
    displayExpression();
});

const num0 = document.getElementById("num-0")
num0.addEventListener("click", function(){
    infixExpression = infixExpression.concat("0");
    displayExpression();
});

//Defining operators
const division = document.getElementById("op-divide")
division.addEventListener("click", function(){
    infixExpression = infixExpression.concat("/");
    displayExpression();
});

const multiply = document.getElementById("op-mul")
multiply.addEventListener("click", function(){
    infixExpression = infixExpression.concat("*");
    displayExpression();
});

const subtraction = document.getElementById("op-sub")
subtraction.addEventListener("click", function(){
    infixExpression = infixExpression.concat("-");
    displayExpression();
});

const add = document.getElementById("item-addition")
add.addEventListener("click", function(){
    infixExpression = infixExpression.concat("+");
    displayExpression();
});

const radix = document.getElementById("op-dot")
radix.addEventListener("click", function(){
    infixExpression = infixExpression.concat(".");
    displayExpression();
});

const result = document.getElementById("item-equals")
result.addEventListener("click", function(){
    evaluateExpression();
    displayExpression();
});

//evaluateExpression() part
function evaluateExpression(){
/*
    try{
    infixExpression =  `=${eval(infixExpression)}`
    }catch(error){
        infixExpression = "Error"
    }
*/
    // discarding eval() approach due to security risks

    if(isValidExpression(infixExpression)){
        infixExpression = infixToPostfix(infixExpression);
        infixExpression = evaluatePostfix(infixExpression);
    }else{
        infixExpression = "Error";
    }

}

function isValidExpression(expression) {
    if (!expression || typeof expression !== "string") 
        return false;

    const operators = "+-*/";
    const digits = "0123456789.";

    if (operators.includes(expression[0]) || operators.includes(expression.slice(-1)) || expression.slice(-1) === "."){
        return false;
    }

    let lastChar = "";
    let decimalUsed = false;

    for (let i = 0; i < expression.length; i++) {
        const char = expression[i];

        if (digits.includes(char)) {
            if (char === ".") {
                if (decimalUsed) 
                    return false;
                decimalUsed = true;
            }
        } else if (operators.includes(char)) {
            if (operators.includes(lastChar)) 
                return false;
            decimalUsed = false;
        } else {
            return false;
        }

        lastChar = char;
    }
    return true;
}

// I am converting this using the Shunting Yard Algorithm, which i learned from google
function infixToPostfix(expression) {
    const precedence = { "+": 1, "-": 1, "*": 2, "/": 2 };
    const output = [];
    const operators = [];
    let number = "";

    for (let i = 0; i < expression.length; i++) {
        const char = expression[i];

        if (!isNaN(char) || char === ".") {
            number += char; 
        } else {
            if (number) {
                output.push(number);
                number = "";
            }
            while (operators.length && precedence[operators[operators.length - 1]] >= precedence[char]) {
                output.push(operators.pop());
            }
            operators.push(char);
        }
    }

    if (number) output.push(number);
    while (operators.length) output.push(operators.pop());

    return output;
}

function evaluatePostfix(postfixTokens) {
    const stack = [];

    for (const token of postfixTokens) {
        if (!isNaN(token)) {
            stack.push(parseFloat(token));
        } else {
            if(stack.length < 2) return "Error";

            const b = stack.pop();
            const a = stack.pop();

            let result;
            switch (token) {
                case "+": result = a + b; break;
                case "-": result = a - b; break;
                case "*": result = a * b; break;
                case "/":
                    if (a === 0 && b === 0)
                        result = undefined;
                    else if (b === 0) 
                        result = a === 0 ? 0 : Infinity;
                    else 
                        result = a / b;
                    break;
                default: return "Error";
            }
            stack.push(result);
        }
    }

    return stack.length === 1 ? stack[0] : "Error";
}
