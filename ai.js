function choose_card(player_cards,ai_cards,score_cards, round_number, player_score, ai_score)
{
	//There should be a smaller (~10% chance) of just going with Rando Cardrissian)
	if(Math.random() * 100 < 10.0 || !game_winnable(player_score, ai_score, score_cards, round_number)){
		return choose_random(player_cards, ai_cards, score_cards, round_number);
	}

	//Down here, we'll have our more robust card-choosing algorithms based on remaining
	//number of cards.
	//We can hardcode a bit more as the number of cards dwindles.
	//Before that, we can have a recursive card-chooser that goes to a limited depth
	//before calling it a day and returning the card it has selected.
	
	if(round_number > 6) return choose_recurse(player_cards, ai_cards, score_cards, round_number, 0, 0);
	else return choose_direct(player_cards, ai_cards, score_cards, round_number);
	
}

function game_winnable(player_score, ai_score, score_cards, round_number)
{
	var total_points = ai_score + player_score;
	var previous_cards = 0;
	var remaining_cards = 0;
	for(i = 0; i < 13; i++){
		if(i < round_number) previous_cards += score_cards[i];
		else remaining_cards += score_cards[i];
	}
	var points_in_play = 91 - (previous_cards - total_points);
	if(points_in_play - ai_score > remaining_cards) return false;
	if(points_in_play - player_score > remaining_cards) return false;
	return true;
}

function choose_random(player_cards, ai_cards, score_cards, round_number){
	var	i = Math.floor(Math.random()*13);
	var d = 0;
	console.log("Random Card Selected: ")
	console.log(i);
	while(ai_cards[i+d] === 0 && ai_cards[i-d] === 0 && d < 13){d++;}
	if(i+d < 13 && ai_cards[i+d] === 1) return i+d;
	if(i - d > -1 && ai_cards[i-d] === 1) return i-d;
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