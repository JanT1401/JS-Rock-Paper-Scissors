const cards = document.getElementsByClassName('card');
const submitButton = document.getElementById('submitButton');
const winnerText = document.getElementById('winnerText');
const playAgain = document.getElementById('playAgain');
let submitButtonActive = false;
let selectionPossible = true;

Array.from(cards).forEach((card)=> {
    card.onclick = () => {
        submitButtonActive = true;
        submitButton.style.backgroundColor = 'rgb(36, 131, 255)';
        submitButton.style.opacity = '1';
        Array.from(cards).forEach(card => {
            card.classList.remove('selectedCard');
        })
        if(selectionPossible === true){
            card.classList.add('selectedCard');    
        }

    }
    submitButton.onclick = () => {
        if(submitButtonActive === true){
            submitButton.remove();
            Array.from(cards).forEach((card, index) => {
                if(card.classList.contains('selectedCard')){
                    compareCards(card, index);
                }
            })
        }
        else {
            submitButton.style.backgroundColor = 'rgb(255, 33, 33)';
        }
    }
})

function compareCards(card, index){
    let userPick = index;
    let randPick = Math.floor(Math.random() * 3);
    let winner;
    
    if(userPick === randPick){
        winner = 'none';
    }
    else if((userPick === 0 && randPick === 2) ||
            (userPick === 1 && randPick === 0) ||
            (userPick === 2 && randPick === 1)){
        winner = 'player';
    }
    else {
        winner = 'com';
    }
    showCards(userPick, randPick, winner);
}

function showCards(userPick, randPick, winner){
    selectionPossible = false;
    Array.from(cards).forEach((c, i) => {
        if(i !== userPick && i !== randPick){
            c.remove();
            if(document.querySelector('.cards').childElementCount === 1){
                let originalCard = document.querySelector('.card');
                let clonedCard = originalCard.cloneNode(true);
                document.querySelector('.cards').appendChild(clonedCard);
            }
        }
        for(let card of cards){
            card.classList.remove('selectedCard');
            card.style.opacity = '1';
        }
    })
    showWinner(winner);
}

function showWinner(winner){
    document.querySelector('.card:nth-child(1)').style.animation = 'playerCardSlide 1s ease-in-out';
    document.querySelector('.card:nth-child(2)').style.animation = 'comCardSlide 1s ease-in-out';
    setTimeout(() => {
        winnerText.style.transform = 'translateY(0px)';
        if(winner === 'player'){
            winnerText.textContent = 'You won!';
            winnerText.style.backgroundColor = 'gold';
        }
        else if(winner === 'com'){
            winnerText.textContent = 'You lost!';
            winnerText.style.backgroundColor = 'red';
        }
        else {
            winnerText.textContent = 'Draw!';
            winnerText.style.backgroundColor = 'gray';
        }
    }, 1000)
    setTimeout(() => {
        playAgain.style.transform = 'translate(-50%, 0%)';
    }, 1300)
}

playAgain.onclick = () => {
    history.go();
}