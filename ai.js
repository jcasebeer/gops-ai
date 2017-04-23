function choose_card(player_cards,ai_cards,score_cards, round_number, player_score, ai_score,min_win)
{
	//There should be a smaller (~10% chance) of just going with Rando Cardrissian)
	if(Math.random() * 100 < 10.0 || game_isover(player_score, ai_score, min_win)){
		return choose_random(player_cards, ai_cards, score_cards, round_number);
	}
<<<<<<< HEAD
	//Since tier 1 always begins at 0, there are 4 indexes to denote the borders.
	var ai_card_tiers = ai_cards;
	var player_cards_tiers = player_cards;

	//For each player_card, find out how what proportion of ai_cards outrank it.
	for(x = 0; x < 13; x++){
		//Find out where ai cards start to outrank this card.
		var count = 0;
		if(player_cards[x]{
			for( y = 0; y < 13){
				if(y > x && ai_cards[y] != 0) count++;
			}
			var tier = 0;
			//This card goes into the lowest tier.
			if(count / 13 > .25) tier = 1;
			if(count / 13 > .5) tier = 2;
			if(count / 13 > .75) tier = 3;
			player_card_tiers[x] = tier;
		}
	}
	
	//Split the AI_cards into even tiers.
	var spots = 13 - round;
	var count = 0;
	var tier = 0;
	for(x = 0; x < 13; x++){
		if(count < spots/4 && AI_cards[x] != 0){
			ai_card_tiers[x] = tier;
			tier++;
			count++;
		}
	}
	
	var selected_tier = 0;
	//Run a straightforward Monte Carlo search tree based on the tiers.
	
	//Once we have the approximate best tier to play from, choose a random card from within that tier.
	
	if(round_number > 6) return choose_recurse(player_cards, ai_cards, score_cards, round_number, 0, 0);
	else return choose_direct(player_cards, ai_cards, score_cards, round_number);
=======

	return choose_random(player_cards,ai_cards,score_cards,round_number);
	//Down here, we'll have our more robust card-choosing algorithms based on remaining
	//number of cards.
	//We can hardcode a bit more as the number of cards dwindles.
	//Before that, we can have a recursive card-chooser that goes to a limited depth
	//before calling it a day and returning the card it has selected.
	
	/*if(round_number > 6) return choose_recurse(player_cards, ai_cards, score_cards, round_number, 0, 0);
	else return choose_direct(player_cards, ai_cards, score_cards, round_number);*/
	
>>>>>>> 9186249ea475ec8015174dc6f0ff21dc1b39ee54
}

function game_winnable(player_score, ai_score, min_win)
{
	/*var total_points = ai_score + player_score;
	var previous_cards = 0;
	var remaining_cards = 0;
	for(i = 0; i < 13; i++){
		if(i < round_number) previous_cards += score_cards[i];
		else remaining_cards += score_cards[i];
	}
	var points_in_play = 91 - (previous_cards - total_points);
	if(points_in_play - ai_score > remaining_cards) return false;
	if(points_in_play - player_score > remaining_cards) return false;
	return true;*/
	return !(player_score >= min_win);
}


function game_isover(player_score, ai_score, min_win)
{
	return (ai_score >= min_win || player_score >= min_win);
}

function choose_random(player_cards, ai_cards, score_cards, round_number){
	var card = Math.floor(Math.random()*13);
	while(ai_cards[card]===0)
		card = Math.floor(Math.random()*13);
	return card;
	/*var	i = Math.floor(Math.random()*13);
	var d = 0;
	console.log("Random Card Selected: ")
	console.log(i);
	while(ai_cards[i+d] === 0 && ai_cards[i-d] === 0 && d < 13){d++;}
	if(i+d < 13 && ai_cards[i+d] === 1) return i+d;
	if(i - d > -1 && ai_cards[i-d] === 1) return i-d;*/
}

function choose_recurse(player_cards, ai_cards, score_cards, round_number, selected, depth){
	depth++;
	if(depth === 50) return selected;
	//CARD-CHOOSING-INCREMENTING-WHATEVER LOGIC GOES HERE!
	return choose_recurse(player_cards, ai_cards, score_cards, selected, depth);
}

function choose_direct(player_cards, ai_cards, score_cards, round_number){
	return 0;
}

// returns the lowest card the ai can play to win a bid
function best_lowest_card(player_cards, ai_cards)
{
	ai_max = max(ai_cards);
	for(var i = 0; i<13; i++)
	{
		if (i > ai_max && player_cards[i])
			return i;
	}
	return -1;
	//Average available player cards and compare to the upcard.
	
	//If the average player card is HIGHER than the upcard, AI should play low.



	//If LOWER, AI should play high.
	
	//There is also a small chance of acting opposite.
}