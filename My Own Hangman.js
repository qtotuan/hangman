$(document).ready(function() {

  var wordsList = ["hangman", "kindergarden", "dogsitter", "impeccable", "intergalactic"];
  var randomNumber = Math.floor(Math.random() * wordsList.length);
  console.log(randomNumber);
  console.log(wordsList.length);
  var randomWord = wordsList[randomNumber];
  console.log(randomWord);
  var hangmanWord = randomWord.split("");
  var userGuess;
  var guesses = 0;
  var lines = [];
  var guessIsCorrect = false;
  var gameIsOver = false;
  var guessedLetters = [];
  console.log(typeof guessedLetters[0]);

  var printLines = function() {
    $(".lines").text(lines.join(" "));
  };

  var initializeGame  = function() {
    guessedLetters = [];
    gameIsOver = false;
    randomNumber = Math.floor(Math.random() * wordsList.length);
    randomWord = wordsList[randomNumber];
    hangmanWord = randomWord.split("");
    lines = [];
    for (var i = 0; i < hangmanWord.length; i++) {
      lines.push("_");
    }
    printLines();
    guesses = 0;
    $(".btn").text("I give up. Give me a new word.");
    $(".error-message").text("Let's play!");
    $(".hill").hide();
    $(".first-stick").hide();
    $(".second-stick").hide();
    $(".small-stick").hide();
    $(".cord").hide();
    $(".head").hide();
    $(".body").hide();
    $(".right-arm").hide();
    $(".left-arm").hide();
    $(".right-leg").hide();
    $(".left-leg").hide();

  };
  initializeGame();

  $(".btn").click(function() {
    initializeGame();
  });

  //When user clicks submit, store value in variable
  $("#form").submit(function(event) {
    userGuess = $("#guessed-letter").val().toLowerCase();
    guessedLetters.push(userGuess);
    event.preventDefault();
      findLetterPosition();
      $("#guessed-letter").val("");
      checkWin();
  });


//Check validity of user entry
var checkLetterAlreadyGuessed = function() {
  if (typeof guessedLetters[0] !== null) {
    console.log("I am in here");
    for (var i = 0; i < guessedLetters.length; i++) {
      if (userGuess === guessedLetters[i]) {
        return true;
      }
    }
  }
};

var checkIfNotEmpty = function() {
  if (userGuess === "") {
    return false;
  }
};

//Find the position of the user guess in the hangman word
var findLetterPosition = function() {
  guessIsCorrect = false;
  for (var i = 0; i < hangmanWord.length; i++){
    if (userGuess ===  hangmanWord[i]) {
      lines[i] = hangmanWord[i];
      $(".error-message").text("");
      guessIsCorrect = true;
    }
    printLines();
    console.log(guessIsCorrect);
  }
  if (!guessIsCorrect && !gameIsOver) {
    guesses++;
    $(".error-message").text("Wrong guess :(");
    console.log("wrong guesses are" + guesses);
      showHangmanBits();
  }
};

var hangmanBits = ["hill", "first-stick", "second-stick", "small-stick", "cord", "head", "body", "right-arm", "left-arm", "right-leg", "left-leg"];
var showHangmanBits = function() {
    $("." + hangmanBits[guesses-1]).show();
};

var checkWin = function () {
  if (guesses < 12 && lines.join("") === randomWord) {
    gameIsOver = true;
    $(".error-message").text("Victory!");
    $(".error-message").css("font-size", "50px");
    $(".error-message").css("color", "#006600");
    $(".btn").text("Play again!");
  } else if (guesses > 10) {
    //console.log(guesses);
    $(".error-message").text("Game Over");
    $(".error-message").css("font-size", "50px");
    //$("#hangman-image").show();
    lines = randomWord.split("");
    printLines();
    $(".btn").text("Play again!");
  }
};

/*
Style:
Wrong guess is green after playing one time Victory
Game Over should turn red
Hangman should be displayed next to letters, hard to see at the bottom

Check if Valid:
Display error when the same letter has been guessed
Hangman bits show when an empty field is entered
*/

});
