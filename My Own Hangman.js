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

  var printLines = function() {
    $(".lines").text(lines.join(" "));
  };

  var initializeGame  = function() {
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
    $(".error-message").text("Let's play!")

    $("#bacon").slideDown();

  };
  initializeGame();

  $(".btn").click(function() {
    initializeGame();
  });

  //When user clicks submit, store value in variable
  $("#form").submit(function(event) {
    userGuess = $("#guessed-letter").val().toLowerCase();
    event.preventDefault();
      findLetterPosition();
      $("#guessed-letter").val("");
    checkWin();
  });

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
  if (!guessIsCorrect) {
    guesses++;
    $(".error-message").text("Wrong guess :(");
    console.log("wrong guesses are" + guesses);
  }
};

var checkWin = function () {
  if (guesses < 10 && lines.join("") === randomWord) {
    $(".error-message").text("Victory!");
    $(".error-message").css("font-size", "50px");
    $(".error-message").css("color", "#006600");
    $(".btn").text("Play again!");
  } else if (guesses > 9) {
    //console.log(guesses);
    $(".error-message").text("Game Over");
    $(".error-message").css("font-size", "50px");
    lines = randomWord.split("");
    printLines();
    $(".btn").text("Play again!");
  }
};

/*
Make it rain bacon
*/

});
