let grid = document.querySelector('#grid');
let guessInput = document.querySelector('#guessInput');
let submitGuess = document.querySelector('#submitGuess');
let container = document.querySelector('.container');
let word = words[Math.floor(Math.random() * words.length)].toUpperCase();
let attempts = 0;
let gameOver = false;

submitGuess.addEventListener('click',()=>{
    if(gameOver) return;
    let guess = guessInput.value.trim().toUpperCase();

    if(guess.length===5){
        attempts++;

        Array.from(guess).forEach(letter => {
        let cell = document.createElement('div');
        cell.classList.add('cell');
        cell.textContent = letter;
        grid.appendChild(cell);
    });
    if(attempts >= 6 && guess !== word){
        gameOver=true;
        let gameOverDiv = document.createElement('div');
        gameOverDiv.textContent = `Game Over! The word was ${word}`;
        gameOverDiv.textColor='black';
        container.appendChild(gameOverDiv);
        return;
    }
    else if(guess === word){
        gameOver=true;
        let winDiv = document.createElement('div');
        winDiv.textContent = `Congratulations you guessed the word`;
        container.appendChild(winDiv);
        return;
    }
    else{
        let arr = Array.from(guess);
        arr.forEach((letter, index) => {
            let cell = grid.children[(attempts * 5) - 5 + index];
            if (letter === word[index]) {
                cell.style.backgroundColor = 'green';
                cell.style.textColor = 'white';
            } else if (word.includes(letter)) {
                cell.style.backgroundColor = 'yellow';
                cell.style.textColor = 'black';
            } else {
                cell.style.backgroundColor = 'gray';
                cell.style.textColor = 'white';
            }
        });
    }    
    guessInput.value="";
    }else{
        let error=document.createElement("div");
        error.textContent="the word length must be 5"
        container.appendChild(error);
        return;
    }

});
guessInput.addEventListener('keydown', (event) => {
    if(event.key==="Enter"){
        submitGuess.click();
    }
});    