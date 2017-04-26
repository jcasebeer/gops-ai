function choose_card(player_cards,ai_cards,score_cards, round_number, player_score, ai_score,min_win,goal_set,player_set,ai_set,discard_set)
{
	/*console.log("player cards: "+card_sum(player_cards));
	console.log("ai cards: "+card_sum(ai_cards));*/
	
	var c = best_lowest_card(player_cards,ai_cards);
	var v = choose_random(player_cards,ai_cards,score_cards,round_number);
	//console.log("best lowest card: "+c);
	var win_in_reach = (ai_score + score_cards[round_number]+1 >= min_win);
	var swing_card = (ai_score+score_cards[round_number]+1 >= player_score && player_score+score_cards[round_number]+1 >= ai_score);
	var player_win_in_reach = (player_score + score_cards[round_number]+1 >= min_win);
	var comfy_margin = score_cards[round_number] + average_card(score_cards, round_number+1) < ai_score - player_score;
	var player_median = median_hand(player_cards);
	var ai_median = median_hand(ai_cards);
	var average_score = average_card(score_cards);

	if (c!=-1)
	{
		// force round win
		if (win_in_reach || player_win_in_reach) return c;
	}

	//console.log("upcard: "+score_cards[round_number]);
	if (cardInSet(score_cards[round_number],goal_set))
	{
		console.log("card Map");
		// we want that card!
		var card = cardMap(score_cards[round_number],goal_set,ai_cards,ai_set);
	}
	else
	{
		console.log("play lowest");
		// play our lowest card
		for(var i = 0; i<13; i++)
		{
			if (cardInSet(i,arrayToSet(ai_cards)))
			{
				return i;
			}
		}
		
	}
	if (card === -1 || goal_set === 0)
	{
		card = closest_match(score_cards[round_number],ai_cards);
	}
	return card;
	//var permutations = mvp(score_cards,round_number,min_win,ai_score);

	//for (var i = 1; i<permutations.length; i++)
	//{
		//console.log(permutations[i] - permutations[i-1]);
	///}
	//console.log(permutations);//permutator(score_cards.splice(6,score_cards.length));
	/*if (c!=-1)
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
	return v;*/
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

function choose_from_set(desired_cards, ai_cards, player_cards, upcard, round_number){
	if(!(desired_cards >> upcard) & 1) return -1;	//If we don't want the upcard, throw it away.
	
	//Otherwise, return the lowest card that will still beat the average player card.
	var average_player_card = 0;
	for(x = 0; x < 13; x++){
		average_player_card += x * player_cards[x];
	}
	average_player_card /= (13-round_number);
	
	var best_lowest = 13;
	for(x = 12; x >= 0; x--){
		if(x * ai_cards > average_player_card) best_lowest = x * ai_cards[x];
	}
	
	//If we don't have one that will beat the average player card, play the highest.
	if(best_lowest === 13){
		best_lowest = 12;
		while(ai_cards[best_lowest] === 0) best_lowest--;
	}
	
	return best_lowest;
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

function cardMap(upcard,goal_set,ai_cards,ai_set)
{
	var high_cards = [];
	var goal_cards = [];
	for(var i = 12; i>0; i--)
	{
		if (cardInSet(i,arrayToSet(ai_cards)))
			high_cards.push(i);
		if (cardInSet(i,goal_set) && !cardInSet(i,ai_set))
			goal_cards.push(i);
	}

	console.log("high cards: "+high_cards);
	console.log("goal cards: "+goal_cards);

	for(var i = 0; i<goal_cards.length;i++)
	{
		if (goal_cards[i] === upcard)
			return high_cards[i];
	}
	return -1;

}

function genGoalSet(goal_set,ai_set,player_set,discard_set,score_cards,score,min_win,round_number)
{
	var sets = [];
	for(var count = 0; count<2**13; count++)
	{
		var bits = count;
		var sum = 0;
		// find sum of set
		for(var i = 0;i<13;i++)
		{
			var pbit = bits & 1;
			sum += pbit * (score_cards[i]+1);
			bits = bits >> 1;
		}
		/*console.log("sum+score: "+(sum+score));
		console.log("isSubSet: "+isSubSet(ai_set,count));
		console.log("eitherSubset pset: "+((!eitherSubset(player_set,count) || player_set===0)));
		console.log("eitherSubset dset: "+((!eitherSubset(discard_set,count) || discard_set===0)));*/
		// check for: is winning set, if cards we've already won are in the set, and if cards the player has won
		// are not in the set 
		
		if (
			((sum+score)>=min_win) &&
			isSubSet(ai_set,count) && 
			(!anyInSet(player_set,count)) &&
			(!anyInSet(discard_set,count))
		)
		{
			sets.push(count);
		}
	}
	// pick one of the valid sets at random
	if (sets.length === 0)
			return 0;
	
	var smallest = 0;
	for(var i = 0;i<sets.length;i++)
	{
		if(setLength(sets[i])<setLength(sets[smallest]))
			smallest = i;
	}
	return sets[smallest];
	
}


function cardInSet(card,set)
{
	return (set >> card) & 1;
}

function isSubSet(set1,set2)
{
	return (set1 & set2) === set1;
}

function eitherSubset(set1,set2)
{
	return isSubSet(set1,set2) || isSubSet(set2,set1);
}

function anyInSet(set1,set2)
{
	for(var i = 0; i<13; i++)
		if (cardInSet(i,set1) && cardInSet(i,set2))
			return 1;
	return 0;
}

function arrayToSet(a)
{
	var set = 0;
	for(var i = 0; i<a.length; i++)
	{
		if (a[i] === 1)
		set = set | (1 << i);
	}
	return set;
}

function setLength(s)
{
	var sum = 0;
	for(var i = 0; i<13; i++)
		if (cardInSet(i,s))
			sum++;
	return sum;
}

function addCardToSet(card,s)
{
	return s | (1<<card);
}

function printSet(s)
{
	var names = ["A","2","3","4","5","6","7","8","9","10","J","Q","K"];
	var result = [];
	for(var i = 0; i<13; i++)
	{
		if (cardInSet(i,s))
			result.push(names[i]);
	}
	console.log(result.toString());
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