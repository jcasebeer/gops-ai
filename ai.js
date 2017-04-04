function choose_card(player_cards,ai_cards,score_cards, round_number)
{
	//There should be a smaller (~10% chance) of just going with Rando Cardrissian)
	return choose_random(player_cards, ai_cards, score_cards, round_number);
	
	//Down here, we'll have our more robust card-choosing algorithms based on remaining
	//number of cards.
	//We can hardcode a bit more as the number of cards dwindles.
	//Before that, we can have a recursive card-chooser that goes to a limited depth
	//before calling it a day and returning the card it has selected.
	
	if(round_number > 6) return choose_recurse(player_cards, ai_cards, score_cards, round_number, 0, 0);
	else return choose_direct(player_cards, ai_cards, score_cards, round_number);
	
}

function choose_random(player_cards, ai_cards, score_cards, round_number){
	var	i = Math.floor(Math.random()*13);
	var d = 0;
	console.log("Random Card Selected: ")
	console.log(i);
	while(ai_cards[i+d] === 0 && ai_cards[i-d] === 0 && d < 13){d++;}
	if(i+d < 14 && ai_cards[i+d] === 1) return i+d;
	if(i - d > -1 && ai_cards[i-d] === 1) return i-d;
}

function choose_recurse(player_cards, ai_cards, score_cards, round_number, selected, depth){
	if(depth == 50) return selected;
	//CARD-CHOOSING-INCREMENTING-WHATEVER LOGIC GOES HERE!
	return choose_recurse(player_cards, ai_cards, score_cards, selected, depth);
}

function choose_direct(player_cards, ai_cards, score_cards, round_number){
	return 0;
}