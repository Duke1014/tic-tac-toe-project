document.addEventListener("DOMContentLoaded", () => {
    document.querySelector("#start-game").addEventListener('click', startGame)  // 'Start Game!' button
    document.querySelector("#give-me-dog").addEventListener('click', appendDog) // 'I deserve a dog.' button
})

const randomDogApi = "https://dog.ceo/api/breeds/image/random";
const dogImage = document.getElementById('dog')

const turns = document.getElementById("turn");
const grid = document.getElementById("grid");

function startGame() {
    turnNumber = 1
    grid.innerHTML = "";
    turns.innerHTML = "";
    turns.innerHTML = `Blue's Turn! Turn ${turnNumber}`;

    for (let x = 0; x < 3; x++) {
        const row = grid.insertRow(x);
        for (let y = 0; y < 3; y++) {
            const cell = row.insertCell(y);
            // cell.setAttribute("id", `${x}` + `${y}`)
            cell.onclick = function() {clickCell(this);}
        }
    }
}

function clickCell(cell) {
    // console.log(cell)
    let oddCounter = turnNumber % 2;
    if (oddCounter == 0) {
        cell.className = "clickedRed"; 
        turnNumber = turnNumber + 1;
        turns.innerHTML = `Blue's Turn! Turn ${turnNumber}`;
    } else if (oddCounter == 1) {
        cell.className = "clickedBlue";
        turnNumber = turnNumber + 1;
        turns.innerHTML = `Red's Turn! Turn ${turnNumber}`;
    }
    // return checkGameCompletion()
}

function appendDog () {
    fetch(randomDogApi)
    .then(res => res.json())
    .then(data => {
        dogImage.innerHTML = `<img src = "${data.message}" alt = "dog"/>`
    })
}