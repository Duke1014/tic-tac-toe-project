document.addEventListener("DOMContentLoaded", () => {
    document.querySelector("#start-game").addEventListener('click', startGame)  // 'Start Game!' button
    document.querySelector("#give-me-dog").addEventListener('click', appendDog) // 'I deserve a dog.' button
})

const randomDogApi = "https://dog.ceo/api/breeds/image/random";
const dogImage = document.getElementById('dog')

function startGame() {
    const grid = document.getElementById("grid");
    grid.innerHTML = "";

    for (let x = 0; x < 3; x++) {
        const row = grid.insertRow(x);
        for (let y = 0; y < 3; y++) {
            const cell = row.insertCell(y);
            cell.onclick = function() {clickCell(this);}
            cell.onmousedown = function(event) {
                if (event.which == 3) {
                    rightClickCell(this);
                }
            }
        }
    }
}
function clickCell(cell) {

    cell.className = "clicked";

}
function rightClickCell(cell) {
    cell.className = "right-clicked"
}

function appendDog () {
    fetch(randomDogApi)
    .then(res => res.json())
    .then(data => {
        dogImage.innerHTML = `<img src = "${data.message}" alt = "dog"/>`
    })
}