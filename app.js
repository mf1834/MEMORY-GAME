/*
 * Create a list that holds all of your cards
 */
/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */
// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array)
{
  let currentIndex = array.length, temporaryValue, randomIndex;
  while (currentIndex !== 0)
  {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }
  return array;
}
/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
let decks = document.querySelector('.deck');
let openedCards = [];
let isTimeout = false;
let restart = document.querySelector('.restart');
let moves = 0;
let move = document.querySelector('.moves');
let clockId;
const timer = document.querySelector('.timer');
let time = 0;
let clockOff = true;
let starCount = 3;
let matched = 0;
window.onload = function()
{
  decks.addEventListener('click', function()
  {
    if (!isTimeout)
    {
      let clicked = event.target;
      if (clicked.classList.contains('card') && openedCards.length < 2)
      {
        if (!clicked.classList.contains('match') && !openedCards.includes(
            clicked))
        { //to match upcoming cards other than already matched
          moves++;
          move.innerHTML = moves; //added moves count
          if (clockOff)
          {
            startClock();
            clockOff = false;
          }
          openCard(clicked);
          openedCards.push(clicked); //adds to array of opened card to restrict only 2 open cards
          if (openedCards.length == 2)
          { //checks remaining cards to  match
            matchCard();
            checkScore();
          }
        }
      }
      if (matched == 8)
      {
        gameOver();
      }
    }
  });
}

function openCard(clicked)
{
  clicked.classList.toggle("open"); //referred from w3schools.com
  clicked.classList.toggle("show");
}

function startClock()
{
  time = 0;
  clockId = setInterval(() =>
  {
    time++;
    displayTime();
  }, 1000);
}

function displayTime()
{
  const minute = Math.floor(time / 60);
  const second = time % 60;
  if (second < 10) timer.innerHTML = `${minute}:0${second}`;
  else timer.innerHTML = `${minute}:${second}`;
}

function stopClock()
{
  clearInterval(clockId); //for stopping time after all cards matched
}

function checkScore()
{
  if (moves === 20 || moves === 32) hideStar(); // setting stars range acc to moves
}

function hideStar()
{
  const starList = document.querySelectorAll('.stars li');
  for (star of starList)
  {
    if (star.style.display !== 'none')
    {
      star.style.display = 'none';
      starCount--;  //a count on number of stars for scorecard use.
      break;
    }
  }
}

function matchCard()
{
  let c1 = openedCards[0];
  let c2 = openedCards[1];
  if (c1.firstElementChild.className === c2.firstElementChild.className)
  {
    c2.classList.toggle('match');
    c1.classList.toggle('match');
    openedCards = [];
    matched++;  // to keep count on finishing Game.
  }
  else
  {
    isTimeout = true; // time out to disappear after 1sec
    setTimeout(function()
    {
      openCard(c1);
      openCard(c2);
      openedCards = []; //this line saved me after big research and help from community. (Making it a comment so I'll be thankful in future)
    }, 500);
    isTimeout = false; // No card is clicked until timeout is set false!
  }
}
restart.addEventListener('click', restartGame);

function restartGame()
{let cards = document.querySelectorAll('ul.deck li');
  decks.innerHTML = "";
  moves = 0;
  moves.innerHTML = 0; //for restarting, moves also restarts
  stopClock();
  clockOff = true;
  time = 0;
  displayTime();
  var shuffledCard = shuffle(Array.from(cards)); //shuffles the cards for new Game
  for (newCard of shuffledCard)
  {
    newCard.className = "card";
    decks.appendChild(newCard); //updates shuffled cards to DOM
  }
  togglePopup();
}
document.querySelector('.popup-cancel').addEventListener('click', togglePopup);
document.querySelector('.popup-replay').addEventListener('click', restartGame);

function togglePopup()
{
  const popup = document.querySelector('.popup');
  popup.classList.toggle('hide');
}

function writePopupStats()
{
  const timeStats = document.querySelector('.popup-time');
  const clockTime = timer.innerHTML;
  const movesStats = document.querySelector('.popup-moves');
  const starsStats = document.querySelector('.popup-stars');
  timeStats.innerHTML = `Time = ${clockTime}`;  //displaying in score card popup
  starsStats.innerHTML = `Stars = ${starCount}`;
  movesStats.innerHTML = `Moves = ${moves}`;
}
