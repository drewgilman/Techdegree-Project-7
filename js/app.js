const overlay = document.querySelector('#overlay');
const startButton = document.querySelector('.btn__reset');
const keyboard = document.querySelector('#qwerty');
const phrase = document.querySelector('#phrase');
let missed = 0;
const phrases = [
  'Supercalifragilisticexpialidocious',
  'Hakuna Matata what a wonderful phrase',
  'You are killing me Smalls',
  'We are going to need a bigger boat',
  'To Infinity and Beyond'
];
const title = document.querySelector('.title');



// Hide the start screen
startButton.addEventListener('click', (e)=> {
  overlay.style.display = 'none';
});

//Get random phrase function
function getRandomPhraseAsArray (array) {
  //Choose random array item
  const length = array.length;
  const randNum = Math.random();
  const item = Math.floor(randNum * length);
  const arrayItem = array[item];

  //Split phrase into characters
  const indvCharacters = arrayItem.split("");
  return indvCharacters;
}

//Create the game display
function addPhraseToDisplay(arr){
  for (let i = 0; i < arr.length; i += 1) {
    //create list item
    const li = document.createElement('li');
    //put character inside list item
    li.textContent = arr[i].toUpperCase();
    //append li item to #phrase
    phrase.appendChild(li);
    //add class to letter
    if(arr[i] !== " "){
      li.className = "letter";
    } else {
      li.className = "space";
    }
  }
}

// Show the game display
const phraseArray = getRandomPhraseAsArray(phrases);
addPhraseToDisplay(phraseArray);


//Create a check letter function
function checkLetter (clickedButton) {
  const allLetters = document.querySelectorAll('.letter');
  let letterFound = null;
  for (let i = 0; i < allLetters.length; i += 1) {
    if (allLetters[i].textContent.toLowerCase() === clickedButton) {
      allLetters[i].classList.add('show');
      letterFound = true;
    }
  }
  return letterFound;
}

//Check if the game has been won or lost
function checkWin (){
  const lettersCount = document.querySelectorAll('.letter').length;
  const lettersShown = document.querySelectorAll('.show').length;
  const h2 = document.createElement('h2');
  h2.className = 'subHeadline';
  if (lettersCount === lettersShown) {
    title.textContent = phraseArray.join('');
    h2.textContent = "You solved the puzzle!";
    overlay.insertBefore(h2, startButton);
    overlay.className = 'win';
    overlay.style.display = '';
  }
  if (missed >= 5) {
    title.textContent = "I'm sorry. The correct answer was... " + '"' + phraseArray.join('') + '"';
    // startButton.style.display = 'none';
    overlay.className = 'lose';
    overlay.style.display = '';
  }
}

//Add event listener to keyboard
keyboard.addEventListener('click', (e) => {
  let clickedButton = e.target.textContent;
  let guess = checkLetter(clickedButton);
  if(e.target.type === 'submit'){
    e.target.classList.add('chosen');
    e.target.disabled = true;
  }
  //count the missed guessed
  if(guess === null){
    const ol = document.querySelector('#scoreboard').firstElementChild;
    const li = ol.lastElementChild;
    ol.removeChild(li);
    missed += 1;
  }
  checkWin();
});
