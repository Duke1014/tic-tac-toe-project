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
            cell.setAttribute("id", `${x}` + `${y}`)
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
    return checkGameCompletion()
}


function checkGameCompletion () {
    let gameComplete = true;

    const cellId1 = document.getElementById("00")
    const cellId2 = document.getElementById("01")
    const cellId3 = document.getElementById("02")
    const cellId4 = document.getElementById("10")
    const cellId5 = document.getElementById("11")
    const cellId6 = document.getElementById("12")
    const cellId7 = document.getElementById("20")
    const cellId8 = document.getElementById("21")
    const cellId9 = document.getElementById("22")

    // const winCon = [
    //     ["00", "01", "02"],
    //     ["10", "11", "12"],
    //     ["20", "21", "22"],
    //     ["00", "10", "20"],
    //     ["01", "11", "21"],
    //     ["02", "12", "22"],
    //     ["00", "11", "22"],
    //     ["02", "11", "20"]
    // ]

    const winCon = [
        [cellId1, cellId2, cellId3],
        [cellId4, cellId5, cellId6],
        [cellId7, cellId8, cellId9],
        [cellId1, cellId4, cellId7],
        [cellId2, cellId5, cellId8],
        [cellId3, cellId6, cellId9],
        [cellId1, cellId5, cellId9],
        [cellId3, cellId5, cellId7]
    ]

    for (let i = 0; i < 8; i++) {
        if (winCon[i][0].className == "clickedBlue" && winCon[i][1].className == "clickedBlue" && winCon[i][2].className == "clickedBlue") {
            alert("Blue wins!")
            appendDog()
            startGame()
        } else if (winCon[i][0].className == "clickedRed" && winCon[i][1].className == "clickedRed" && winCon[i][2].className == "clickedRed"){
            alert("Red wins!")
            appendDog()
            startGame()
        } else {
            gameComplete = false
        }
    }
}


function appendDog () {
    fetch(randomDogApi)
    .then(res => res.json())
    .then(data => {
        dogImage.innerHTML = `<img src = "${data.message}" alt = "dog"/>`
    })
}