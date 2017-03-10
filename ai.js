function choose_card(player_cards,ai_cards,score_cards)
{
	var	i = floor(math.random()*13);
	while(ai_cards[i]===0)
	{
		i = floor(math.random()*13);
	}
	return i;
}