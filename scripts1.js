const cards = document.querySelectorAll('.memory-card');

let hasFlippedCard = false;
let firstCard, secondCard;

function flipCard() {
    this.classList.add('flip');

  if (!hasFlippedCard) {
    // first click
    hasFlippedCard = true;
    firstCard = this;

    console.log({hasFlippedCard, firstCard});
  } else {
    // second click
    hasFlippedCard = false;
    secondCard = this;

    // do cards match?
    console.log{firstCard.dataset.framework};
    console.log{secondCard.dataset.framework};

  }
}

cards.forEach(card => card.addEventListener('click', flipCard))
;