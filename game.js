var buttonColours=["red", "blue", "green", "yellow"];
var gamePattern=[];
var userClickedPattern=[];
var level = 0;
var started = false;


$('.btn').click(function(){
    var userChosenColour = $(this).attr('id');
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length-1)
})

function nextSequence(){
    userClickedPattern=[]
    level+=1;
    $('h1').text('Level '+level)
    randomNumber=Math.floor(Math.random()*4)
    randomChosenColour=buttonColours[randomNumber]
    gamePattern.push(randomChosenColour)
    
    $("#"+randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
}

function playSound(name){
    var audio = new Audio("sounds/"+name+".mp3");
    audio.play();
}

function animatePress(currentColour){
    $("#" + currentColour).addClass('pressed')
    setTimeout(() => {
        $("#" + currentColour).removeClass('pressed'); 
    }, 100);    
}

function checkAnswer(currentLevel){
 if(userClickedPattern[currentLevel]==gamePattern[currentLevel]){
    if(gamePattern.length==userClickedPattern.length){
        setTimeout(function () {
            nextSequence();
          }, 1000);
    }
 }
 else{
    playSound("wrong")
    $("body").addClass('game-over')
    setTimeout(() => {
        $("body").removeClass('game-over'); 
    }, 200);
    $('h1').text('Game Over, Press Any Key to Restart') 
    startOver()
 }
}

function startOver(){
    gamePattern=[];
    started=false;
    level=0;
}

$(document).keydown(function(){
    if(!started){
        $('h1').text('Level 0');
        nextSequence();
        started=true;
    }
})

