const buttonColours = ["red", "blue", "green", "yellow"]
let gamePattern = []
let userClickedPattern = []

let started = false
let level = 0

// Instanciamos una variable bandera para que llamar una vez a la función
$(document).keydown(function () {
    if (!started) {
        nextSequence()
        started = true
    }
})

$(".btn").click(function () {
    let userChosenColour = $(this).attr("id")
    userClickedPattern.push(userChosenColour)

    // Sound Effect when click event happend
    playSound(userChosenColour)

    // Animation Effect
    animatePress(userChosenColour)

    // Check Answer
    checkAnswer(userClickedPattern.length - 1)
})

function nextSequence() {
    userClickedPattern = []

    // Increase Level
    $("#level-title").text("Level " + level)
    level++

    let randomNumber = Math.floor(Math.random() * 4) // Parametro de 0 a 3
    let randomChosenColour = buttonColours[randomNumber]
    gamePattern.push(randomChosenColour)

    // Flash Animation
    $("#" + randomChosenColour).fadeOut(150).fadeIn(150)

    // Sound Effect
    playSound(randomChosenColour)
}

function checkAnswer(currentLevel) {
    if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(() => {
                nextSequence()
            }, 1000);
        }
    } else {
        playSound("wrong")

        $("body").addClass("game-over")

        setTimeout(() => {
            $("body").removeClass("game-over")
        }, 200);

        $("#level-title").text("¡Game Over! Press Any Key to Restart")
        startOver()
    }
}

/***************************
    UTILITIES FUNCTION 
****************************/

function playSound(nameButton) {
    let audioButtonColour = new Audio("/assets/sounds/" + nameButton + ".mp3")
    audioButtonColour.play()
}

function animatePress(currentColour) {
    $("#" + currentColour).addClass("pressed")

    setTimeout(() => {
        $("#" + currentColour).removeClass("pressed")
    }, 100);
}

function startOver() {
    level = 0
    gamePattern = []
    started = false
}