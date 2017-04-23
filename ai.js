function choose_card(player_cards,ai_cards,score_cards, round_number, player_score, ai_score,min_win)
{
	console.log("player cards: "+card_sum(player_cards));
	console.log("ai cards: "+card_sum(ai_cards));
	
	var c = best_lowest_card(player_cards,ai_cards);
	var v = choose_random(player_cards,ai_cards,score_cards,round_number);
	console.log("best lowest card: "+c);
	var win_in_reach = (ai_score + score_cards[round_number]+1 >= min_win);
	var swing_card = (ai_score+score_cards[round_number]+1 >= player_score && player_score+score_cards[round_number]+1 >= ai_score)
	var player_win_in_reach = (player_score + score_cards[round_number]+1 >= min_win);
	var comfy_margin = score_cards[round_number] + average_card(score_cards, round_number+1) < ai_score - player_score;
	var player_median = median_hand(player_cards);
	var ai_median = median_hand(ai_cards);
	var average_score = average_card(score_cards);
	var permutations = mvp(score_cards,round_number,min_win,ai_score);
	for (var i = 1; i<permutations.length; i++)
	{
		console.log(permutations[i] - permutations[i-1]);
	}
	console.log(permutations);//permutator(score_cards.splice(6,score_cards.length));
	if (c!=-1)
	{
		// force round win
		if (win_in_reach || swing_card || player_win_in_reach) return c;
		else
		{
			if (!comfy_margin)
			{
				if (round_number != 12)
				{
					ai_cards[c] = 0;
					v = best_lowest_card(player_cards,ai_cards);
					ai_cards[c] = 1;
					if (v ===-1)
						v = closest_match(c, ai_cards);
					if (v === -1)
						v = choose_random(player_cards,ai_cards,score_cards,round_number);
					
				}
			}
			else
			{
				v = min(ai_cards);
			}
		}
	}
 
	if (card_sum(player_cards)>=card_sum(ai_cards))
		return random_less(score_cards[round_number],ai_cards);
	return v;
	//return random_match(score_cards[round_number],ai_cards);
	/*
	if (Math.random()*100 > 50)
	{
		return choose_random(player_cards,ai_cards,score_cards,round_number);
	}
	else
	{
		if (player_cards[round_number]!=0)
			return round_number;
		else
		{
			var c;
			c = best_lowest_card(player_cards,ai_cards);
			if (c != -1)
				return c;
			else
				choose_random(player_cards,ai_cards,score_cards,round_number);
		}

	}
	
	//There should be a smaller (~10% chance) of just going with Rando Cardrissian)
	if(Math.random() * 100 < 10.0 || game_isover(player_score, ai_score, min_win)){
		return choose_random(player_cards, ai_cards, score_cards, round_number);
	}

	//Since tier 1 always begins at 0, there are 4 indexes to denote the borders.
	var ai_card_tiers = ai_cards;
	var player_cards_tiers = player_cards;

	//For each player_card, find out how what proportion of ai_cards outrank it.
	for(x = 0; x < 13; x++){
		//Find out where ai cards start to outrank this card.
		var count = 0;
		if(player_cards[x]){
			for( y = 0; y < 13; y++){
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


	return choose_random(player_cards,ai_cards,score_cards,round_number);
	//Down here, we'll have our more robust card-choosing algorithms based on remaining
	//number of cards.
	//We can hardcode a bit more as the number of cards dwindles.
	//Before that, we can have a recursive card-chooser that goes to a limited depth
	//before calling it a day and returning the card it has selected.
	*/
	/*if(round_number > 6) return choose_recurse(player_cards, ai_cards, score_cards, round_number, 0, 0);
	else return choose_direct(player_cards, ai_cards, score_cards, round_number);*/
	

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
/*
	var	i = Math.floor(Math.random()*13);
	var d = 0;
	console.log("Random Card Selected: ")
	console.log(i);
	while(d < 13)
	{
		d++;
		if(i+d < 13 && ai_cards[i+d] === 1) return i+d;
		if(i - d > -1 && ai_cards[i-d] === 1) return i-d;
	}*/
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

function max(list)
{
	console.log("max");
	var i = list.length;
	while(list[i-1]===0)
		i--;
	return i-1;
}

// returns the lowest card the ai can play to win a bid
function best_lowest_card(player_cards, ai_cards)
{
	console.log("best_lowest_card");
	player_max = max(player_cards);
	//console.log("max "+player_max);
	for(var i = 0; i<13; i++)
	{
		if (i > player_max && ai_cards[i])
			return i;
	}
	return -1;
	//Average available player cards and compare to the upcard.
	
	//If the average player card is HIGHER than the upcard, AI should play low.



	//If LOWER, AI should play high.
	
	//There is also a small chance of acting opposite.
}

function min(cards)
{
	console.log("min");
	var i = 0;
	while(cards[i]===0)
		i++;
	return i;
}

function card_sum(cards)
{
	console.log("card sum");
	sum = 0;
	for(i=0; i<cards.length; i++)
	{
		if (cards[i]===1)
			sum+=i+1;
	}
	return sum;
}

function closest_match(c,cards)
{
	console.log("closest_match");
	if (cards[c]===1)
		return c;
	else
	{
		var closest = -1;
		for(var i = 0; i<cards.length; i++)
		{
			if (closest === -1 && cards[i] === 1)
				closest = i;
			else if (cards[i] === 1 && Math.abs(c-i) < Math.abs(c - closest))
				closest = i;
		}
		return closest;
	}
}

function average_card(cards,index)
{
	var sum = 0;
	var count = 0;
	for(var i = index; i<cards.length; i++)
	{
		if (cards[i])
		{
			sum+=i+1;
			count++;
		}
	}
	if (sum === 0)
		return 0;
	return sum/count;
}

function median_hand(hand)
{
	cards = [];
	for(var i = 0; i<hand.length; i++)
		if (hand[i])
			cards.push(i);
	return cards[Math.floor(cards.length/2)];
}

function random_less(card,ai_cards)
{
	var can_do = 0;
	for(var i = 0; i<card; i++)
	{
		if (ai_cards[i])
		{
			can_do = 1;
			break;
		}
	}
	if (can_do)
	{
		var c = Math.floor(Math.random()*card)
		while(!ai_cards[c])
			c = Math.floor(Math.random()*card);
		return c;
	}
	else
		return choose_random(player_cards,ai_cards,score_cards,round_number);
}

function mvp(score_cards,round_number,min_win,score)
{
	var tallies = [0,0,0,0,0,0,0,0,0,0,0,0,0];
	for(var count = 0; count<2**13; count++)
	{
		var bits = count;
		var sum = 0;
		for(var i = round_number; i<13; i++)
		{
			var pbit = bits & 1;
			sum += pbit * score_cards[i];
			bits = bits >> 1;
		}
		if(sum+score >= min_win){
			bits = count;
			//Increment the tally values.
			for(var i = round_number; i < 13; i++){
				var pbit = bits & 1;
				if(pbit)
					tallies[i]++;
				bits = bits >> 1;
			}
		}
	}
	return tallies;
}


/*function permutator(inputArr) 
{
	var results = [];
	function permute(arr, memo) 
	{
		var cur, memo = memo || [];

		for (var i = 0; i < arr.length; i++) 
		{
			cur = arr.splice(i, 1);
			if (arr.length === 0) 
			{
				results.push(memo.concat(cur));
			}
			permute(arr.slice(), memo.concat(cur));
			arr.splice(i, 0, cur[0]);
		}

		return results;
	}
	return permute(inputArr);
}*/

/*
function find most common card in permutation
for(x = 0; x < 2^n; x++){
	count++;

}
*/