window.onload = function() {

    var alphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h',
        'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's',
        't', 'u', 'v', 'w', 'x', 'y', 'z'
    ];

    var words = ["death star",
        "alderaan",
        "pod racer",
        "millennium falcon",
        "the republic",
        "first order",
        "the force",
        "storm trooper",
        "jabba the hutt",
        "darth maul",
        "jar jar binks"
    ];

    var lives = 10;
    var wins = 0;
    var dashes = [];
    var guessessofar = "";
    var guessedletters = [];

    var showLives = document.getElementById("mylives");
    var lettersGuessed = document.getElementById("guessed");
    var showWins = document.getElementById("wins");
    var resetGame = document.getElementById("reset");




    //Choose random words
    var correctWord = words[Math.floor(Math.random() * words.length)];
    console.log(correctWord)

    //Function to take word and make underscores
    for (i = 0; i < correctWord.length; i++) {
        if (correctWord[i] !== " ") {
            dashes.push(" _ ")
        } else {
            dashes.push('-')
        }
    }

    console.log(dashes);
    document.getElementById('actualWord').innerHTML = dashes.join(' ');


    //key.event for user input- use key codes
    document.onkeyup = function(event) {
        var userGuess = event.key;
        console.log(userGuess)


        // if userguess has been guessed already then alert that they already guessed it
        if (guessedletters.indexOf(userGuess) == -1) {
            guessedletters.push(userGuess);
            console.log(guessedletters)
        } else {
            console.log("does exist", userGuess)
            alert("You already guessed that letter.");
            return
        }
        document.getElementById('guessed').innerHTML = guessedletters.join();

        //if letter is not in the word, then lives go down
        if (correctWord.indexOf(userGuess) == -1) {
            lives--;
        }

        showLives.innerHTML = "Number of Guesses Remaining: " + lives;

        //if lives is less than 1, then game is over
        if (lives < 1) {
            showLives.innerHTML = "Game Over";
        }

        //if letter guessed is correct then add to correct word
        for (var i = 0; i < correctWord.length; i++) {
            if (userGuess === correctWord[i]) {
                dashes[i] = userGuess;
            }
        }

        //if you guess all the letters correctly then you win
        document.getElementById('actualWord').innerHTML = dashes.join('');
        console.log(correctWord, dashes.join('').replace('-', ' '))
        if (correctWord === dashes.join('').replace('-', ' ')) {
            alert("You win!");
            wins++;
            resetGame();
        }

        showWins.innerHTML = "Wins: " + wins;

    }

    //reset the game
    resetGame = function() {
        lives = 10;
        dashes = [];
        guessessofar = "";
        guessedletters = [];

    }
}

