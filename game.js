
var gamePatterns = [];
var userClickedPattern = [];
var level = 0;
var start = false;
var buttonColours = ['red', 'blue', 'green', 'yellow'];

$('.btn').click(function () {
  var userChosenColour = $(this).attr('id');
  userClickedPattern.push(userChosenColour);

  playSound(userChosenColour);
  AnimateButton(userChosenColour);
  checkAnswers(userClickedPattern.length - 1);
});

$(document).keydown(function () {
  if (!start) {
    $('h1').text('level 0');
    nextSequence();
  }
});

function checkAnswers(currentLevel) {
  if (userClickedPattern[currentLevel] === gamePatterns[currentLevel]) {
    if (userClickedPattern.length === gamePatterns.length) {
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }
  }else {
    var wrong = new Audio('sounds/wrong.mp3');
    wrong.play();
    $('body').addClass('game-over');
    setTimeout(function () {
      $('body').removeClass('game-over');
    }, 200);

    $('h1').text('Game Over, Press Any Key to Restart');
    startOver();

  }
}

function nextSequence() {
  userClickedPattern = [];
  level++;
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePatterns.push(randomChosenColour);
  console.log(randomChosenColour);
  $('#' + randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
  $('h1').text('level ' + level);

}

function playSound(name) {
  var audio = new Audio('sounds/' + name + '.mp3');
  audio.play();
}

function AnimateButton(name) {
  $('#' + name).addClass('pressed');
  setTimeout(function () {
    $('#' + name).removeClass('pressed');
  }, 100);
}

function startOver() {
  level = 0;
  gamePatterns = [];
  start = false;
}
