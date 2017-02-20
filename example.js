keyCodes = {
      65: "a", 
      66: "b", 
      67: "c", 
      68: "d", 
      69: "e", 
      70: "f", 
      71: "g", 
      72: "h", 
      73: "i", 
      74: "j", 
      75: "k", 
      76: "l", 
      77: "m", 
      78: "n", 
      79: "o", 
      80: "p", 
      81: "q", 
      82: "r", 
      83: "s", 
      84: "t", 
      85: "u", 
      86: "v", 
      87: "w", 
      88: "x", 
      89: "y", 
      90: "z" 
    },
    keysSelected = [],
    board = $("#board"),
    wordContainer = $("#wordContainer"),
    doc = $(document),
    buttons = $(".hov"),
    words = ["happy", "saab", "charles", "computer", "amiga"],
    word,
    wrongGuesses = 0;

function assignWord(){
  word = words[Math.floor(Math.random() * words.length)]
}

function updateHangman(frame){
  board.text(frame);
}

function createWordSquares(){
  for(var i=0, len = word.length; i < len; i++){
    var id = 'letter_' + i;
    $('<div>', {id: id, class: 'wordy'}).appendTo(wordContainer);
  }
}

function attachEventhandlers(){
  doc.on("keyup", function(e){
    handleKeyPress(e.keyCode);
  });
  
  buttons.on("click", function(){
    handleClick($(this));
  });
}

function keyAlreadyPressed(keyCode){
  return $.inArray(keyCode, keysSelected) !== -1
}

function highlightPressedKey(letter){
  var id = "#" + letter;
  $(id).addClass("pressed"); 
}

function guessedCorrectly(letter){
  return word.indexOf(letter) != -1;
}

function updateWord(letter){
  var els = word.split('')
                .map( function(e,i){ if(e === letter) return '#letter_' + i;} )
                .filter(Boolean)
  
  $.each(els, function(index, value){
    $(value).text(letter).addClass("correct");
  });
}

function checkResult(){
  var lettersNeeded = word.length,
      lettersCorrect = $(".correct").length,
      gameOver = false;
      
  if (lettersNeeded === lettersCorrect){
    alert("You Won!");
    gameOver = true; 
  } else if(wrongGuesses > 6){
    alert("You lost!");
    gameOver = true; 
  }
  
  if (gameOver){
    removeEventHandlers();
  }
}

function removeEventHandlers(){
  doc.off("keyup");
  buttons.off("click");
}

function addKeyodeToArray(keyCode){
	keysSelected.push(keyCode);
  keysSelected = $.unique(keysSelected);
}

function checkGuess(letter){
  if (guessedCorrectly(letter)){
    updateWord(letter);
  } else {
    wrongGuesses++;
    updateHangman(frames[wrongGuesses]);
  }
}

function handleKeyPress(keyCode){
  if(keyCode < 64 || keyCode > 91 || keyAlreadyPressed(keyCode)){
    return;
  }
  
  var letter = keyCodes[keyCode];
	    
	addKeyodeToArray(keyCode);
  highlightPressedKey(letter);
	checkGuess(letter);
  checkResult();
}

function handleClick(elClicked){
  if(keyAlreadyPressed(keyCode)){
    return;
  }
	
  var letter = elClicked.attr("id"),
      keyCode = Object.keys(keyCodes).filter(function(key) {
        return keyCodes[key] === letter
      })[0];
  
	addKeyodeToArray(keyCode);
  highlightPressedKey(letter);
	checkGuess(letter);
  checkResult();
}

// Setup 
assignWord();
console.log(word);
updateHangman(frames[wrongGuesses]);
createWordSquares();
attachEventhandlers();