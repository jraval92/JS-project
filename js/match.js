let cards = document.querySelectorAll('.cards');

let flippedCard = false;
let card1, card2;
let lockGame = false;

function flipCard()
{
    //this.classList.toggle('flip');
    if (lockGame)
    {
        return;
    }

    if(this == card1)
    {
        return;
    }
    
    this.classList.add('flip');

    if(!flippedCard)
    {
        flippedCard = true;
        card1 = this;
        return;
    }

    card2 = this;

    match();
}

function match()
{
    if (card1.dataset.cardset == card2.dataset.cardset)
    {
        disableFlip();
        return;
    }
    unFlip();
}

function disableFlip()
{
    card1.removeEventListener('click', flipCard);
    card2.removeEventListener('click', flipCard);
    resetGame();
}

function resetGame()
{
    flippedCard = false;
    lockGame = false;
    card1 = null;
    card2 = null;
}

function unFlip()
{
    lockGame = true;
    setTimeout(() => {card1.classList.remove('flip');
                      card2.classList.remove('flip'); resetGame();}, 1500);
}

(function shuffleCards()
{
    cards.forEach(card => {
        let ranPos = Math.floor(Math.random() * 10);
        card.style.order = ranPos;
    });
})();

cards.forEach(card => card.addEventListener('click', flipCard));