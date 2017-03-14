function choose_card(player_cards,ai_cards,score_cards)
{
	var	i = Math.floor(Math.random()*13);
	var d = 0;
	console.log("Random Card Selected: ")
	console.log(i);
	while(ai_cards[i+d] === 0 && ai_cards[i-d] === 0 && d < 13){d++;}
	if(i+d < 14 && ai_cards[i+d] === 1) return i+d;
	if(i - d > -1 && ai_cards[i-d] === 1) return i-d;
	return i;
}