// on window load
window.onload = function() {
    // alphabet letters array
    var alphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h',
        'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's',
        't', 'u', 'v', 'w', 'x', 'y', 'z'
    ];
    // correct words array
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

    // variables
    var lives = 10;
    var wins = 0;
    var dashes = [];
    var guessessofar = "";
    var guessedletters = [];

    // grabs id from index.html to display on page
    var showLives = document.getElementById("mylives");
    var lettersGuessed = document.getElementById("guessed");
    var showWins = document.getElementById("wins");
    // var resetGame = document.getElementById("reset");

    //start game function
    startGame = function() {
        // Choose random words
        var correctWord = words[Math.floor(Math.random() * words.length)];
        console.log(correctWord)

        // For loop to create underscores and dashes for words
        for (i = 0; i < correctWord.length; i++) {
            // if correctWord[i] equals a letter
            if (correctWord[i] !== " ") {
                // then make underscore
                dashes.push(" _ ")
                    // else make a dash
            } else {
                dashes.push('-')
            }
        }

        console.log(dashes);
        // grabs id from index.html to display underscores and dashes on page
        document.getElementById('actualWord').innerHTML = dashes.join(' ');

        //key.event for user input- use key codes
        document.onkeyup = function(event) {
            var userGuess = event.key;
            // if (event.keyCode > 64 && event.keyCode < 91) { //Google this.
            //     alert("That is not a valid letter!")
            // }
            console.log(userGuess)

            // if indexOf userGuess equals -1
            if (guessedletters.indexOf(userGuess) == -1) {
                // push userGuess into guessedletters array
                guessedletters.push(userGuess);
                console.log(guessedletters)
            } else {
                // if userguess was already guessed then alert
                console.log("does exist", userGuess)
                alert("You already guessed that letter.");
                return
            }
            document.getElementById('guessed').innerHTML = guessedletters.join();

            //if letter is not in the correctWord, then lives go down
            if (correctWord.indexOf(userGuess) == -1) {
                lives--;
            }

            showLives.innerHTML = "Number of Guesses Remaining: " + lives;

            //if lives is less than 1, then game is over
            if (lives < 1) {
                showLives.innerHTML = "Game Over";
                wins = 0;
                resetGame();
            }


            //if letter guessed is correct then add letter to correct word
            for (var i = 0; i < correctWord.length; i++) {
                if (userGuess === correctWord[i]) {
                    // dashes equals userguess
                    dashes[i] = userGuess;
                }
            }

            //if you guess all the letters correctly then you win
            document.getElementById('actualWord').innerHTML = dashes.join('');
            console.log(correctWord, dashes.join('').replace('-', ' '))
            if (correctWord === dashes.join('').replace('-', ' ')) {
                console.log("You win!");
                // wins increase
                wins++;
                // game resets with new word
                resetGame();
            }
            // adds win count into html
            showWins.innerHTML = "Wins: " + wins;

        }
    }
    startGame();

    //reset the game
    resetGame = function() {
        lives = 10;
        dashes = [];
        guessessofar = "";
        guessedletters = [];

        showLives = document.getElementById("mylives");
        lettersGuessed = document.getElementById("guessed");
        showWins = document.getElementById("wins");

        showLives.innerHTML = "Number of Guesses Remaining: " + lives;
        showWins.innerHTML = "Wins: " + wins;
        document.getElementById('guessed').innerHTML = guessedletters.join();
        // resetGame = document.getElementById("reset");
        startGame();

    }

}
