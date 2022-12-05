const buttonColours = ["red", "blue", "green", "yellow"];
let gamePattern = [];  //empty array to store random colours generated
let userClickedPattern = []; //empty array to store user button clicks
let level = 0; //keep track of game level
let started = false; //keep track of whether game has started or not

// detect when keyboard key has been pressed
$(document).on("keypress", function () {
	if (!started) { //if variable started is false then...
		$("#level-title").text("Level " + level); //change h1 to value of level (Level 0)
		nextSequence(); // calls nextSequence function
		started = true; // changes value of started to true so it won't run nextSequence again
	}
});

function nextSequence() {
	playSequence(); //loops through sequence

	setTimeout(() => {
		
		userClickedPattern = []; //resets userClickedPattern array to empty when function is triggered, ready for next level
		
		++level; //increase level value by 1 each time nextSequence is called
		$("#level-title").text("Level " + level); //update value of h1 as level changes
	
		let randomNumber = Math.floor(Math.random() * 4); //generate random number between 0 and 3 (instead of *3 +1)
		let randomChosenColour = buttonColours[randomNumber]; //use random number to select colour from buttonColours array
		gamePattern.push(randomChosenColour); //add new random colour to end of gamePattern array
		$("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);  // button flash
		playSound(randomChosenColour);// calls the function playSound
	}, 500 * gamePattern.length); //gives a timeout space of the length of the array so the flashes and sounds don't overlap

};

// $(document).on("click", nextSequence); //a click anywhere on document initiates nextSequence function

$(".btn").on("click", function () {  //when element with class of .btn is clicked
	if(started){ //checks if game has started (= true) with keypress, if not started won't allow clicks on buttons

		let userChosenColour = $(this).attr("id"); //variable stores id value of .btn that was clicked
		userClickedPattern.push(userChosenColour); //adds value to array
	
		playSound(userChosenColour);// calls the function playSound
		animatePress(userChosenColour);
	
		checkAnswer(userClickedPattern.length - 1);
	}
});

function playSound(name) {
	let audio = new Audio("sounds/" + name + ".mp3"); //select sound file according to element selected - either by userChosenColour or randomChosenColour
	audio.play(); //play sound file
}

function animatePress(currentColour) {
	$("#" + currentColour).addClass("pressed"); //adds .pressed class to element that was clicked
	setTimeout(function () {
		$("#" + currentColour).removeClass("pressed");
	}, 100); //removes class from selected element after 100 milliseconds
}

function checkAnswer(currentLevel) {
	if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
		console.log("Success");
		// check that length of arrays match
		if (userClickedPattern.length === gamePattern.length) {
			setTimeout(function () {
				nextSequence();
			}, 1000); // calls nextSequence function after delay
		} 

	} else {
		console.log("Wrong");
		playSound("wrong");
		$("body").addClass("game-over");
		setTimeout(function(){
			$("body").removeClass("game-over")
		}, 200);
		$("#level-title").text("Game Over, Press Any Key to Restart");
			
			startOver(); // calls startOver function to reset values
	}
}

//function to reset values
function startOver(){
	level = 0;
	gamePattern = [];
	started = false;
}

// CHALLENGE - WORK OUT HOW TO PLAY THE GAME PATTERN ARRAY EACH TIME BEFORE ADDING A NEW ITEM

// each - loops through entire sequence
function playSequence(){
	$.each(gamePattern, function(i, val){  //val = gamePattern[i]
		setTimeout(function() {
			$("#" + val).fadeIn(100).fadeOut(100).fadeIn(100);
			playSound(val);
		}, 500 * i);
	})
}

// ALTERNATIVES

// function playSound(name) {  //selects audio & plays file according to element id
// 	switch (name) {
// 		case "#red": let red = new Audio('./sounds/red.mp3');
// 			red.play();
// 			break;
// 		case "#blue": let blue = new Audio('./sounds/blue.mp3');
// 			blue.play();
// 			break;
// 		case "#green": let green = new Audio('./sounds/green.mp3');
// 			green.play();
// 			break;
// 		case "#yellow": let yellow = new Audio('./sounds/yellow.mp3');
// 			yellow.play();
// 			break;
// 		default: new Audio('./sounds/wrong.mp3');
// 	}
// }





