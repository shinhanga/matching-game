PROJECT NAME
------------
Find the Matching Pairs

The assignment for this Udacity class project was to create a memory game using a Javascript-generated deck of 16 cards (8 pairs). The game begins with all 16 cards in the deck facedown. As the user clicks on the deck, each clicked card "turns over" to reveal its icon and color. The first clicked card will remain open (with icon and color showing) until the user clicks on a second card. When a second card is clicked, it also "turns over", at which point the game compares the two cards to see if they are a matching pair. If the cards match, they both transform into the matching class (with icon and color still showing) and do not respond to further mouse clicks. If the cards do not match, they both "turn down" after 1 second  (icons and colors not showing), and they can be clicked again in a future move. 

The goal of playing this memory game is to locate all 8 matching pairs using as few moves as possible. The user's score in stars is displayed in the upper scoring panel, and this score goes down as the move count gets larger. An average game score is 3 stars, but with luck and a good memory, it is possible for a user to get 4 or 5 stars. Once all 8 pairs have been identified, the game timer stops, and an endgame modal pops up to display the user's statistics for that particular game (number of moves, time taken, game score in stars). The user can then click off this modal (closing the modal display) and start a new game if desired. 


FILE LIST
---------
index.html -----> HTML file with the memory game HTML layout

/css/app.css -----> CSS file for styling the game and the associated DOM objects

/js/app.js -----> Javascript file containing the various game functions


DESIGN PROCESS
--------------
My design process for this project started with the base files provided by Udacity. My first step was writing the Javascript functions to enable the individual cards to display their icons and colors when clicked, and then turn back down after a second card was clicked. This involved using an event listener on the "deck" element to respond to any clicks on the cards (which were node elements of the deck element). 

After figuring out how to make the cards respond individually to mouse clicks, I wrote a Javascript function to test for matching pairs, and additional functions to count the total number of moves and the total number of matched pairs. This enabled me to incorporate a game score using stars as per the project's instructions, so that the number of moves would generate a certain game score (anywhere from 0 to 5 stars). The next step was adding a game timer that would start when the first card was clicked and automatically stop when the last matching pair was identified. Finally, I added an endgame modal that displays over the game board when the last pair is found, to show the user's game score and game time. 

Besides programming these basic game play mechanics, I modified the cards to make the game more visually appealing for the user, adding colors and a random selection of icons, which changes each game. I also added a flipping animation to the cards using CSS, to simulate the turning action of real-life cards. And finally (for my own amusement), I added a tiny icon line to the scoring panel that displays small versions of the card icons as each matching pair is found. 




