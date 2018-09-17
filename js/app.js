const overlay = document.querySelector('#overlay');
const startButton = document.querySelector('.btn__reset');
const keyboard = document.querySelector('#qwerty');
const phrase = document.querySelector('#phrase');
const missed = 0;
const phrases = [
  'The Cat in the Hat',
  'This is heavy Doc',
  'You are killing me Smalls',
  'We are going to need a bigger boat',
  'To Infinity and Beyond'
];



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
    li.textContent = arr[i];
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
//Show the game display
const phraseArray = getRandomPhraseAsArray(phrases);
addPhraseToDisplay(phraseArray);
