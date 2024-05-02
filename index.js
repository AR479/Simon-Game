var buttonColours=["red","blue","green","yellow"];
var gamePattern=[];
var userClickedPattern=[];
var userChosenColour;
var level=0;
var started=false;

$(document).keypress(function(event){
    if(!started){
        nextSequence();
        started=true;
    }
        
    //console.log("a");
});

$(".btn").click(function(e){
    userChosenColour=e.target.id;
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    //$(".btn").addClass("pressed");
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length-1);
});


function nextSequence(){
    var randomNumber=Math.floor((Math.random()*3)+1);
    var randomChosenColour=buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    $("#"+randomChosenColour).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);

    $("#level-title").text("Level "+level);
    level++;
    userClickedPattern=[];
}

function playSound(sound){
    var mus=new Audio("./sounds/"+sound+".mp3"); 
    mus.play();
}

function animatePress(currentColour){
    $("#"+currentColour).addClass("pressed");
    setTimeout(function(){
        $("#"+currentColour).removeClass("pressed");
    }, 100);

    
    
}

function checkAnswer(currentLevel){
    if(userClickedPattern[currentLevel]==gamePattern[currentLevel]){
        console.log("success");
    }
    
    else{
        var gOverSound=new Audio("./sounds/wrong.mp3");
        console.log("Game Over");
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        },200);
        $("#level-title").text("Game Over Press Any Key to Restart");
        startOver();
    }

    if(userClickedPattern.length==gamePattern.length){
        setTimeout(function(){
            nextSequence();
        },1000);
    }
}

function startOver(){
    level=0;
    gamePattern=[];
    started=false;
}

