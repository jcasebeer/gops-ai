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
}

function game_winnable(player_score, ai_score, min_win)
{
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
}

function choose_best_odds(player_cards, ai_cards, round_number){
	var player_cards_shuffled[13];
	var ai_cards_shuffled[13];
	var card_scores[13];
	
	//Fill up the cards with appropriate values.
	var count = 0;
	var p_index = 0;
	var a_index = 0;
	
	while(count < 13){
		if(player_cards[count]) player_cards_shuffled[p_index++] = count;
		if(ai_cards[count]) ai_cards_shuffled[p_index++] = count;
		count++;
	}
	
	//Shuffle those suckers up.
	for(i = 12-round_number; i >= 0; i -= 1) {
		var x = Math.floor(Math.random() * (i + 1));
		var y = Math.floor(Math.random() * (i + 1));
		temp_a = player_cards_shuffled[i];
		temp_b = ai_cards_shuffled[i];
		player_cards_shuffled[x] = player_cards_shuffled[i];
		ai_cards_shuffled[y] = ai_cards_shuffled[i];
	}
	
	//For each card left in our hand, call count_recurse to find the highest likely tally of wins.
	for(x = 0; x < 13-round_number; x++){
		card_scores[x] = count_recurse(player_cards_shuffled, ai_cards_shuffled, 0, round_number);
		//Cycle the cards around so that the next ai_card will be tested.
		var front_card = ai_cards_shuffled[0];
		for(y = 0; y < 12-round_number; y++){
			ai_cards_shuffled[y] = ai_cards_shuffled[y+1];
		}
		ai_cards_shuffled[12-round_number] = front_card;
	}
	
	//We'll have a full cycle finished, so the cards will be in their original (shuffled) setup.
	//Choose the highest scoring card available.
	var highest = 0;
	for(x = 0; x < 13 - round_number; x++){
		if(card_scores[x] > card_scores[highest]) highest = x;
	}
	
	highest = 
	
	return highest;
}

function count_recurse(player_cards, ai_cards, score, round_number, depth, score){
	//Increment depth. If we're deep enough, return the number of wins.
	if(depth++ == 6) return score;
	
	//Choose the next random player card.
	player_cards_shuffled[round_number-1];
	
	//Compare a win or loss, add it to the tally.
	
	
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