
cards = [ ['The Temple', 'high', 10000, 1, function(card, player) {player.field.push(player.hand[card]);console.log(player.field);}], ["Eulogist's Pulpit", 'high', 10000, 1, function(card, player) {player.field.push(player.hand[card]);console.log(player.field);}], ["Aanjalie's Athame", 'special', 15000, 2, function(card, player) {player.field.push(player.hand[card]);console.log(player.field);}],
["Nathan's Katar", 'special', 15000, 2, function(card, player) {player.field.push(player.hand[card]);console.log(player.field);}], ["Eastern Farmer's Field", 'middle', 5000, 3, function(card, player) {player.field.push(player.hand[card]);console.log(player.field);}], ["Western Farmer's Field", 'middle', 5000, 3, function(card, player) {player.field.push(player.hand[card]);console.log(player.field);}], ['Railroad #1', 'middle', 5000, 4, function(card, player) {player.field.push(player.hand[card]);console.log(player.field);}],
['Railroad #2', 'middle', 5000, 4, function(card, player) {player.field.push(player.hand[card]);console.log(player.field);}], ['Railroad #3', 'middle', 5000, 4, function(card, player) {player.field.push(player.hand[card]);console.log(player.field);}], ['Railroad #4', 'middle', 5000, 4, function(card, player) {player.field.push(player.hand[card]);console.log(player.field);}], ["Nomad's Camel", 'low', 2500, 5, function(card, player) {player.field.push(player.hand[card]);console.log(player.field);}], ["Nomad's Map", 'low', 2500, 5, function(card, player) {player.field.push(player.hand[card]);console.log(player.field);}],
["Nomad's Poppy", 'low', 2500, 5, function(card, player) {player.field.push(player.hand[card]);console.log(player.field);}], ['Gold Coins', 'low', 1500, "none", function(card, player) {player.bank = player.bank + 1500;console.log(player)}], ['Gold Coins', 'low', 1500, "none", function(card, player) {player.bank = player.bank + 1500;console.log(player)}], ['Gold Coins', 'low', 1500, "none", function(card, player) {player.bank = player.bank + 1500;console.log(player)}], ['Gold Coins', 'low', 1500, "none", function(card, player) {player.bank = player.bank + 1500;console.log(player)}]];
//The above array is all of the cards in the deck, cards get spliced out of this array and turned in to a Card object and then insterted in to an array called "hand" in a Player object

discardPile = [];



class Card {	// for creating card objects from the nested arrays in 'cards'
	constructor(name, tier, value, set, action){

		this.name = name;
		this.tier = tier;
		this.value = value;
		this.set = set;
		this.action = action;
	}
}


class Player {	// for creating new players
	constructor(nameber){
		
		this.field = [];
		this.bank = 0;
		this.playerNameber = nameber;	//nameber is an ambiguous word I made up for name/number
		this.hand = [];
	}
}


function dealCard(min, max, player) {	//selects a random card from 'cards', creates a random number 'x' that lies inclusively between 'min' and 'max'

  min = Math.ceil(min);
  max = Math.floor(max);
  x = Math.floor(Math.random() * parseInt(max - min)) + min; //The maximum is inclusive and the minimum is inclusive -- IDK if you need 'parseInt'
  console.log(x);
  drawn = new Card(...cards[x]);
  console.log(drawn);
  player.hand.push(drawn);
  cards.splice(x,1);
  console.log(`The length of cards list is now ${cards.length}`);
  console.log(`This is what the deck looks like `, cards);
}


function dealHand(player) {

	for (i=0; i<=4; i++){
		dealCard(0,(cards.length), player);
	}
	for (i=0; i < player.hand.length; i++){
		console.log(player.hand[i].name);
	}
	console.log(player.playerNameber);
}


function introDeal() {

	players = ["Nathan", "Aanjalie", "Luna"];		//REFACTOR THIS TO EVENTUALLY TAKE A USER INPUTTED AMOUNT OF PLAYERS/NAMES

	for (i = 0; i <= players.length -1 ; i++) {
		//console.log(`THIS IS PASS NUMBER `, i);
		players[i] = new Player(players[i]);
		//console.log(players);
	}

	for (let value of players) {
		dealHand(value);
	}

	gameController(players);
}


function gameController(players) {

	let winCondition = false; //someone has won the game
	let currentPlayer = null;

	function cardAction(card, player) {
		//console.log(`WE GOT INSIDE HERE!`);
		currentPlayer.hand[card].action(card, player);	//execute the method for the card's action
		console.log(currentPlayer.bank);
		document.getElementById('game').innerHTML = "The card was played";
	}


	function turn(player) {

		let cardNames = [];

		for (x = 0; x < 3; x++) { //for 3 'moves' in a turn play a card


			for (i=0; i < player.hand.length; i++){
				console.log(player.hand[i].name);
				cardNames.push(player.hand[i].name);	//takes the name of all cards in the players hand
			}


			console.log(`Please make a move ${player.playerNameber}: \n`);
			console.log(i, ` You have this many cards in your hand.`);
			let pick = prompt("Which card would you like to play?");

			if (cardNames.includes(pick)) {
				console.log(`You played a card!`);
				console.log(x);	//prints which turn this is
				cardInd = cardNames.indexOf(pick);
				console.log(`Card index is ${cardInd}`);
				cardAction(cardInd, currentPlayer);
			} else {
				console.log(`Sorry, couldn't find that card in your hand...`);
				console.log(x);
			}
		}
	}





	while (winCondition === false) {		//while noone has won the game
		for (y = 0; y<players.length; y++) {
			console.log(players[y]);

			if (y == players.length) {		//Might just be able to refactor out this whole if statement... just while and for ?

				console.log(`y was == players.length`);
			} else if (y < players.length){
				currentPlayer = players[y];
				turn(players[y]);

				console.log(`y was less than players.length`);
			}
		}
	}

	
}

function sleep(milliseconds) {
  var start = new Date().getTime();
  for (var i = 0; i < 1e7; i++) {
    if ((new Date().getTime() - start) > milliseconds){
      break;
    }
  }
}


alert(`Open the console! Game auto-runs once you press 'OK'!`);
introDeal();