"use strict"

var root = document.getElementById("deck");
/*
 * Create a list that holds all of your cards
 */
/*
 * Getting all cards and store in node
 * stored cards in the from of list
 * convert list to array
 */
var nodes = document.getElementsByClassName("card");
var nodeList = Array.from(nodes);

var currentTime = 0;
// intializing  moves
var action = 0;
var cardLoad = [];
var moveArea = document.getElementById('moves');
// intializing the starcount
var starCount = 3;
// intializing the matchedcards
var matches = 0;
// stroring the stars in the form of array
var starSection = [...document.getElementsByClassName("fa-star")];
var status;
/*
 *intializing the second ,mintue,hours
 */
var seconds = 0;
var minutes = 0;
var hours = 0;
/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
  var currentIndex = array.length,
    temporaryValue, randomIndex;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}
//  on refreshing new game starts
window.onload = beginGame();

function beginGame() {
  var limpCards = shuffle(nodeList); // shuffled cards
  for (var i = 0; i < limpCards.length; i++) {
    root.appendChild(limpCards[i]);
  }
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
// adding eventlisteners to all cards
for (var i = 0; i < nodeList.length; i++) {
  nodeList[i].addEventListener("click", exhibitCard)
}
// displaying cards
function exhibitCard() {
  if (currentTime == 0) {
    // function to counting time
    startTime();
    currentTime = currentTime + 1;
  }
  this.classList.add("card");
  this.classList.add("open");
  this.classList.add("show");
  this.classList.add("disable");

  cardLoad.push(this);
  if (cardLoad.length == 2) {
    action = action + 1;
    // calling the function to display stars
    rating();
    // showing the no.of moves
    moveArea.innerHTML = action;
    // comparing 2 cards
    if (cardLoad[0].children[0].classList.item(1) == cardLoad[1].children[0].classList.item(1)) {
      console.log("matched");
      cardLoad[0].classList.add("match", "disbale");
      cardLoad[1].classList.add("match", "disable");
      cardLoad = [];
      matches = matches + 1;
      console.log("match crads =" + matches);
      if (matches == 8) {
        // stop time function
        stopTimer();
        // popup message to Congragulate
        switch (starCount) {
          case 1:
            Swal.fire({
              title: 'Congragulations',
              html: 'Rating<i class="fa fa-star"></i><br>moves :' + action + '<br>time<br>' + hours + 'hours:' + minutes + 'minutes:' + seconds + 'seconds',
              showCancelButton: true,
              confirmButtonColor: '#3085d6',
              cancelButtonColor: '#962F03',
              confirmButtonText: ' Restart'
            }).then((result) => {
              if (result.value) {
                document.location.reload();
              }
            });
            break;
          case 2:
            Swal.fire({
              title: 'Congragulations',
              html: 'Rating<i class="fa fa-star"></i><i class="fa fa-star"></i><br>moves :' + action + '<br>time <br>' + hours + 'hours:' + minutes + 'minutes:' + seconds + 'seconds',
              showCancelButton: true,
              confirmButtonColor: '#3085d6',
              cancelButtonColor: '#962F03',
              confirmButtonText: ' Restart'
            }, ).then((result) => {
              if (result.value) {
                document.location.reload();
              }
            });
            break;
          case 3:
            Swal.fire({
              title: 'Congragulations',
              html: 'Rating<i class="fa fa-star"></i><i class="fa fa-star"></i><i class="fa fa-star"></i><br>moves :' + action + '<br>time<br>' + hours + 'hours:' + minutes + 'min:' + seconds + 'sec',
              showCancelButton: true,
              confirmButtonColor: '#3085d6',
              cancelButtonColor: '##962F03',
              confirmButtonText: ' Restart'
            }, ).then((result) => {
              if (result.value) {
                document.location.reload();
              }
            });
        }
      }
    } else {
      console.log("not matched");
      cardLoad[0].classList.add("unmatch");
      cardLoad[1].classList.add("unmatch");
      cardLoad.map((son) => {
        setTimeout(() => {
          son.classList.remove("unmatch", "open", "show", "disable");
        }, 200)
        cardLoad = [];
      })

    }
  }
}
// timer functiona
function startTime() {

  status = setInterval(() => {
    seconds = seconds + 1;
    if (seconds == 59) {
      seconds = 0;
      minutes = minutes + 1;
    }
    if (minutes == 60) {
      minutes = 0;
      hours = hours + 1;
    }
    time.innerHTML = hours + "::" + minutes + "::" + seconds;
  }, 1000)
}

// starcount function
function rating() {
  if (action > 10 && action <15) {
    starCount = 2;
    starSection[2].style.display = "none";
  }
  if (action > 16) {
    starCount = 1;
    starSection[1].style.display = "none";
  }
}
// to stop time when game is completed
function stopTimer() {
  clearInterval(status);
}
