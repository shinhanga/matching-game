let timer = {seconds: 0, minutes: 0, clearTime: -1};

let startTimer = function() {
          if (timer.seconds === 59) {
            timer.minutes++;
            timer.seconds = 0;} 
          else {
            timer.seconds++;}

          /* format single digit seconds */
          let formattedSec = "0";
          if (timer.seconds < 10) {
            formattedSec += timer.seconds;} 
          else {
            formattedSec = String(timer.seconds);}

          let time = String(timer.minutes) + ":" + formattedSec;
          document.getElementById("game-clock").innerHTML = (time);
};

function openPage () {

  /* create an array of icons */
  const randomIcons = ["hamsa", "poo", "utensils", "wrench", "paw", "umbrella", "running", "om",
  "heart", "skull", "meteor", "bolt", "tree", "tshirt", "tint", "spider", "grin-stars", "hand-spock", 
  "crow", "bicycle", "camera-retro", "ghost", "gem", "glasses"]
  
  /* shuffle icon array */
  shuffle(randomIcons);

	/* create an array to holds 8 pairs of cards */
	const deckOfCards = [{type:randomIcons[0], color:"0"}, {type:randomIcons[0], color:"0"}, 
		{type:randomIcons[1], color:"1"}, {type:randomIcons[1], color:"1"}, 
		{type:randomIcons[2], color:"2"}, {type:randomIcons[2], color:"2"}, 
		{type:randomIcons[3], color:"3"}, {type:randomIcons[3], color:"3"}, 
		{type:randomIcons[4], color:"4"}, {type:randomIcons[4], color:"4"}, 
		{type:randomIcons[5], color:"5"}, {type:randomIcons[5], color:"5"}, 
		{type:randomIcons[6], color:"6"}, {type:randomIcons[6], color:"6"}, 
		{type:randomIcons[7], color:"7"}, {type:randomIcons[7], color:"7"}];

	/* create an array to hold 8 colors (1 color per pair) */
	const colorsOfCards = ["#FFADE7", "#41E3B7", "#1A59ED", "#B70092", "#FC4E73", "#6960EC", "#090081", "#5D0F99"];

	/* call the shuffle function for deck array and color array */
	shuffle(deckOfCards);
	shuffle(colorsOfCards);	

	/* loop through each card in the shuffled deck, adding it to the page */
	for (let j = 0; j < deckOfCards.length; j++) {
		/* create LI NODE for each card */
		let node = document.createElement("li");
		node.className = "card";

		/* create and append ICON NODE to each card (LI NODE) */
		let iconNode = document.createElement("i");
    iconNode.className = "fa fa-"+deckOfCards[j].type;
    node.appendChild(iconNode);
		
		/* create and append COMMENT NODE to card (LI NODE) to contain the random color assigned to each card pair */
		let colorNum = deckOfCards[j].color;
		let commentNode = document.createComment(colorsOfCards[colorNum]);
		node.appendChild(commentNode);

		/* append card (LI NODE) to the deck (UL ELEMENT NODE) */
		document.getElementById("deck").appendChild(node);
  }

	/* add two array variables to track card information during game play */
	const colorList = [];
	const elemList = [];

	/* add event listener to the deck */
  document.getElementById("deck").addEventListener("click", event => {
  	
  	/* if CARD is clicked, and is NOT ALREADY MATCHED and is NOT OPEN */
  	if ((event.target.classList.contains ('card')) && 
  		!(event.target.classList.contains ('match')) &&
  		!(event.target.classList.contains ('open')) && 
      (colorList.length < 2)) {

      /* run move counting function */
      moveCount();

  		/* insert CARD into the color list and element list */
  		colorList.push(event.target.lastChild.nodeValue);
  		elemList.push(event.target);
 
  		/* if clicked card is the FIRST CARD */
  		if (elemList.length == 1) {

  			/* open and show FIRST CARD */
  			event.target.classList.add('open', 'show');
        event.target.classList.remove('hidden');

  			/* update background color of FIRST CARD */
  			event.target.style.backgroundColor = event.target.lastChild.nodeValue;}

  		/* if clicked card is the SECOND CARD */
  		if (elemList.length == 2) {

  			/* open and show SECOND CARD */
  			event.target.classList.add('open', 'show');
        event.target.classList.remove('hidden');

  			/* update background color of SECOND CARD */
  			event.target.style.backgroundColor = event.target.lastChild.nodeValue;
          
        /* unpack card array into two target variables */
        const secondTarget = elemList.pop();
        const firstTarget = elemList.pop();

        /* if FIRST & SECOND CARDS are MATCHING */
  			if (matchTest(colorList)) {setTimeout(function () {
  				
          /* run match counting function */
          matchCount();



          /* add icon to score panel */
          let iconNum = (8-document.getElementById("match-number").innerHTML);
          let matchedIcon = event.target.children[0].classList.value;
          let iconClass = matchedIcon.substr(3);
          document.getElementById("pairs-icons").children[iconNum].classList.add('fa');
          document.getElementById("pairs-icons").children[iconNum].classList.add(iconClass);
          


  		  	/* remove OPEN and SHOW class from both cards */
  				firstTarget.classList.remove('open', 'show');
  				secondTarget.classList.remove('open', 'show');

  				/* add MATCH class to both cards */
  				firstTarget.classList.add('match');
  				secondTarget.classList.add('match');

          colorList.pop();
          colorList.pop();
  				}, 1000);}

        /* if FIRST & SECOND CARDS are NOT MATCHING */
  			else {setTimeout(function () {

          /* cards turn back down after 1 second */
          firstTarget.classList.add('hidden');
          secondTarget.classList.add('hidden');

          /* remove open & show classes from both cards */
  				firstTarget.classList.remove('open', 'show');
  				secondTarget.classList.remove('open', 'show');
  					
  				/* change background color of cards back to hidden state */
  				firstTarget.style.backgroundColor = '#2e3d49';
  				secondTarget.style.backgroundColor = '#2e3d49';

          /* empty the color array prior to next move */
          colorList.pop();
          colorList.pop();
				  }, 1000);}
				}
  		} 			
  	});
}


/* function to test whether two cards are matching or not */
function matchTest (array) {
  
  /* compare FIRST and SECOND CARDS in array variable */
  const secondColor = array[1];
  const firstColor = array[0];

  /* if cards are a match, return true */
  if (firstColor == secondColor) {
    return true;
  }
  /* if cards are not a match, return false */
  else {
    return false;
  }
}


/* function to count moves and keep score during game play */
function moveCount () {
    
  /* increment move count by 1 */
  document.getElementById("move-number").innerHTML = parseInt(document.getElementById("move-number").innerHTML)+1;

  /* when the 1st move is made */
  if (document.getElementById("move-number").innerHTML == 1) {

    /* adjust the spelling of MOVES span to singular */
    document.getElementById("moves").innerHTML = "move";

    /* and start the timer function */
    resetTimer();
  }

  else {
    /* adjust the spelling of MOVES span to plural */
    document.getElementById("moves").innerHTML = "moves";}

  /* if move count reaches 21, gray out one star / node */
  if (document.getElementById("move-number").innerHTML == 21) {
    document.getElementById("stars-score").children[4].classList.add('gray');
    document.getElementById("modal-stars-score").children[4].classList.add('gray');
  }

  /* if move count reaches 31, gray out another star / node */
  if (document.getElementById("move-number").innerHTML == 31) {
    document.getElementById("stars-score").children[3].classList.add('gray');
    document.getElementById("modal-stars-score").children[3].classList.add('gray');
  }

  /* if move count reaches 41, gray out another star / node */
  if (document.getElementById("move-number").innerHTML == 41) {
    document.getElementById("stars-score").children[2].classList.add('gray');
    document.getElementById("modal-stars-score").children[2].classList.add('gray');
  }

  /* if move count reaches 51, gray out another star / node */
  if (document.getElementById("move-number").innerHTML == 51) {
    document.getElementById("stars-score").children[1].classList.add('gray');
    document.getElementById("modal-stars-score").children[1].classList.add('gray');
  }

  /* if move count reaches 61, gray out final star / node */
  if (document.getElementById("move-number").innerHTML == 61) {
    document.getElementById("stars-score").children[0].classList.add('gray');
    document.getElementById("modal-stars-score").children[0].classList.add('gray');
  }
}


/* function to count the number of matched pairs during game play */
function matchCount () {

  /* increment number of matched pairs by 1 */  
  document.getElementById("match-number").innerHTML = parseInt(document.getElementById("match-number").innerHTML)+1;

  /* when 1st pair is matched */
  if (document.getElementById("match-number").innerHTML == 1) {

    /* adjust spelling of PAIRS span to singular */
    document.getElementById("pairs").innerHTML = "pair";}
  
  else {
    /* adjust spelling of PAIRS span to plural */
    document.getElementById("pairs").innerHTML = "pairs";}

  /* when 8 matches are made, call end of game modal function */
  if (document.getElementById("match-number").innerHTML == 8) {
    endOfGame();
  }
}

/* resets the game timer and begins counting seconds */
function resetTimer () {

  if (document.getElementById("match-number").innerHTML == 0) { 
    clearInterval(timer.clearTime);
    timer.seconds = 0;
    timer.minutes = 0;
    document.getElementById("game-clock").innerHTML = "0:00";
    timer.clearTime = setInterval(startTimer, 1000);
  }

  if (document.getElementById("match-number").innerHTML == 8) {
    clearInterval(timer.clearTime);

    /* update game-time span in modal to display user's finishing time */
    document.getElementById("game-time").innerHTML = document.getElementById("game-clock").innerHTML;
  }
}


/* shuffle function from http://stackoverflow.com/a/2450976 */
function shuffle (array) {

    let currentIndex = array.length, temporaryValue, randomIndex;
    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    return array;
}



/* function to display dropdown scoring rules on console */
function scoringRules() {

  /* show dropdown scoring rules when function is called */
  document.getElementById("scoringDropdown").classList.toggle("show-dropdown");

  /* remove dropdown scoring rules if user clicks outside of it */
  window.onclick = function(event) {
    if (!event.target.matches('.scoring-btn')) {
      let dropdowns = document.getElementsByClassName("dropdown-content");

      for (let i = 0; i < dropdowns.length; i++) {
        let openDropdown = dropdowns[i];
        if (openDropdown.classList.contains('show-dropdown')) {
          openDropdown.classList.remove('show-dropdown');
        }
      }
    }
  }
}


/* end of game function that displays modal */
function endOfGame() {

  /* stop the game timer */
  resetTimer();

  /* change modal display to visible */
  const modal = document.getElementById('endModal');
  modal.style.display = "block";

  /* create span element that can close the modal */
  const span = document.getElementsByClassName("close")[0];

  /* when user clicks on span (x), close the modal */
  span.onclick = function() {
    modal.style.display = "none";
  }

  /* when user clicks anywhere outside of the modal, close the modal */
  window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
  }

  /* update modal-score to display user's current score */
  document.getElementById("modal-score").innerHTML = "<p>YOU FINISHED THE GAME IN "
  +document.getElementById("move-number").innerHTML+" MOVES!</p>";


}