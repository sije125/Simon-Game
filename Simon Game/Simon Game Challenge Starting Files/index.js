
var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var clickedPattern = [];
var level = 0;
var started = false;

$('.btn').click(function() {
  var chosenColor = $(this).attr("id");
  playSound(chosenColor);
  animatePress(chosenColor);
  clickedPattern.push(chosenColor);
  checkAnswer(clickedPattern.length - 1);
});

$(document).keydown(function() {
  if (!started) {
    $('h1').text("Level " + level);
    nextSequence();
    started = true;
  }
});

function nextSequence() {
  clickedPattern = [];
  level++;
  $('h1').text("Level " + level);

  var randomNum = Math.floor(Math.random() * 4);
  var randomColor = buttonColors[randomNum];
  gamePattern.push(randomColor);

  $("#" + randomColor).fadeOut("1000").fadeIn("1000");

  playSound(randomColor);




}

function playSound(color) {
  var audio = new Audio("sounds/" + color + ".mp3");
  audio.play();
}

function animatePress(currentColor) {
  var color = "#" + currentColor;
  $(color).addClass("pressed");

  setTimeout(function() {
    $(color).removeClass("pressed");
  }, 100);

}

function checkAnswer(currentLevel) {
  if(clickedPattern[currentLevel] === gamePattern[currentLevel]) {
    //console.log("success");
    if (clickedPattern.length === gamePattern.length) {
      setTimeout(function() {
        nextSequence();
      }, 100);
    }
  }
  else {
    //console.log("wrong");
    var audio = new Audio("sounds/wrong.mp3");
    audio.play();

    $('body').addClass("game-over");

    setTimeout(function() {
      $('body').removeClass("game-over");
    }, 200);

    $('h1').text("Press any key to restart");
    startOver();
  }
}

function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
}
