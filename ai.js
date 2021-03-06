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

	//For a lower value score card, we might try to undercut instead and save a higher value card.
	if (card/2 > score_cards[round_number] && !player_win_in_reach && !win_in_reach)
		for(var i = 0; i<13; i++){
		if (cardInSet(i,arrayToSet(ai_cards))) return i;
	}
	
	return card;
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
			(setSum(count)>=min_win) &&
			isSubSet(ai_set,count) && 
			(!anyInSet(player_set,count)) &&
			(!anyInSet(discard_set,count)) &&
			cardInSet(score_cards[round_number],count)
		)
		{
			sets.push(count);
		}
	}
	// pick one of the valid sets at random
	if (sets.length === 0)
			return 0;
	
	return sets[Math.floor(Math.random()*sets.length)];
	
}

function cardInSet(card,s)
{
	return (s >> card) & 1;
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

function setSum(s)
{
	var sum = 0;
	for(var i = 0; i<13;i++)
	{
		if (cardInSet(i,s))
			sum+=i+1;
	}
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