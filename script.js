// import html data
const back = document.getElementById('background');
const display = document.getElementById('quest');
const choose = document.getElementById('choose');
const lose = document.getElementById('deg');
const count = document.getElementById('countTrue');
const again = document.getElementById('again');
const counter = document.getElementById('count');

// main variables
let sol;
let trueNum = 0;
let con = true;

// background function
const num = 5 + Math.floor(Math.random() * 20)

// add html data
for (let i = 0; i < num; i++) {

    // create html element
    const p = document.createElement('p')

    p.textContent = Math.floor(Math.random() * 10) // content

    // style 
    p.style.left = `${Math.random() * (window.innerWidth - 50)}px`
    p.style.top = `${Math.random() * (window.innerHeight - 50)}px`
    p.style.transform = `rotate(${Math.random() * 360}deg)`;
    p.style.fontSize = `${20 + Math.random() * 50}px`;

    back.appendChild(p) // add p to html

}

// question function
function quest() {

    // start
    display.textContent = ''
    choose.textContent = ''
    counter.textContent = trueNum

    // question
    var num1 = 1 + Math.floor(Math.random() * 1000);
    var num2 = 1 + Math.floor(Math.random() * 1000);

    var operation = ['+', '-', '*', '/'];
    var operationNum = Math.floor(Math.random() * 4);

    var sign = operation[operationNum];

    display.append(num1 + " " + sign + " " + num2 + " =");

    // get the solution
    if (sign === '+') {
        sol = num1 + num2;
    } 
    else if (sign === '-') {
        sol = num1 - num2;
    } 
    else if (sign === '*') {
        sol = num1 * num2;
    } 
    else {
        sol = num1 / num2;
    }    

    function randomNearSol() {
        return sol + Math.floor(Math.random() * 41) - 20;
    }

    var a = randomNearSol();
    var b = randomNearSol();
    var c = randomNearSol();

    while (a === b || b === c || c === a || a === sol || b === sol || c === sol) {
        a = randomNearSol();
        b = randomNearSol();
        c = randomNearSol();
    }

    var sols = [a, b, c, sol]
    sols.sort()

    // solution
    for (let i = 0; i < 4; i++) {
        
        const button = document.createElement('button');
        
        button.textContent = sols[i]

        choose.appendChild(button)

        if (sols[i] === sol) {
            button.className = 'sol';

            button.addEventListener('click', () => {
                newQuest()
            })
        }
        else {
            button.addEventListener('click', () => {
                con = false;

                stop()
            })
        }

        

    }

}

function stop() {
    if (con) {
        return;
    } else {
        lose.classList.add('show')
    }

    count.textContent = `you have solved ${trueNum} question`;
}

function newQuest() {
    trueNum++
    quest()

    stop()
}

again.addEventListener('click', () => {
    con = true;
    trueNum = 0;
    lose.classList.remove('show')

    quest()
})

quest()