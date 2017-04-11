var width = 1280;
var height = 720;

var game  = new Game(width,height);
var input = new Input();

var player_score = 0;
var ai_score = 0;


var card_width = 64;
var click = 0;
var card_height = 103;
var card_gap = 10;
var hand_x = 0;
var hand_y = 0;
var last_cards=[-1,-1];
var card_selected = -1;
var mouse_x = 0;
var mouse_y = 0;
var card_strings = ["A","2","3","4","5","6","7","8","9","10","J","Q","K"];
var round_number = 0;
var state = "player_input";

player_cards = [1,1,1,1,1,1,1,1,1,1,1,1,1];
ai_cards = [1,1,1,1,1,1,1,1,1,1,1,1,1];
score_cards = [0,1,2,3,4,5,6,7,8,9,10,11,12];

function shuffle_scores(){
	var temp = null

	for(i = 12; i >= 0; i -= 1) {
		var x = Math.floor(Math.random() * (i + 1));
		temp = score_cards[i];
		score_cards[i] = score_cards[x];
		score_cards[x] = temp;
	}
}

shuffle_scores();

function onMouseUpdate(e)
{
	mouse_x = e.layerX;
	mouse_y = e.layerY;

	if (mouse_x === NaN)
		mouse_x = 0;
	if (mouse_y === NaN)
		mouse_y = 0;
}

// event listener for mouse movement
document.addEventListener('mousemove',onMouseUpdate, false);
document.addEventListener('mouseup',function(){
	click = 0;
},false);
document.addEventListener('mousedown',function(){
	click = 1;
},false);

function draw_card(x,y,width,height,num,mouse_over)
{
	game.drawRectangle(x,y,width,height,"rgba(255,255,255,1)");
	var color = "rgba(255,0,0,1)";
	if (mouse_over)
		color = "rgba(0,0,255,1)";

	game.drawText(x+width/2,y+width/2,"28px Monospace",color,num);
}

function count_card(hand)
{
	count = 0;
	for(i=0; i<14;i++)
	{
		if (hand[i]===1)
			count++;
	}
	return count;
}

function point_in_rect(px,py,x,y,width,height)
{
	return (px>x && px<(x+width) && py > y && py<(y+height));
}

function step()
{
	if (state==="player_input")
	{
		card_selected = -1;
		var i;
		for(i=0;i<13;i++)
		{
			if (point_in_rect(mouse_x,mouse_y,i*(card_width+card_gap),height-card_height,card_width,card_height))
			{
				card_selected = i;
				break;
			}
		}
		if (click && card_selected!=-1)
		{
			player_cards[card_selected] = 0;
			last_cards[0] = card_selected;
			click = 0;
			state = "ai_turn";
		}
	}
	else if (state==="ai_turn")
	{
		card_selected = -1;
		card_selected = choose_card(player_cards, ai_cards, score_cards, round_number);
		ai_cards[card_selected] = 0;
		last_cards[1] = card_selected;
		state = "player_input";
		
		//Adjust scores for round. Clamped to 1-10, to account for face cards, since score_cards is an array of indexes, not necessarily score values.
		if(last_cards[0] > last_cards[1]) player_score += Math.max(Math.min(score_cards[round_number]+1, 10), 1);
		else if (last_cards[1] > last_cards[0]) ai_score += Math.max(Math.min(score_cards[round_number]+1, 10), 1);
		
		round_number++;
		if(round_number == 13) state = "game_over";
	}	
}


function draw()
{
	
	console.log(card_selected);
	game.drawRectangle(0,0,width,height,"rgba(16,160,60,1)");
	if(state === "game_over"){
		game.drawText( 1280/2, 100, "28px Monospace", "rgba(128, 255, 255, 1)", "Final AI Score: "+ai_score);
		game.drawText( 1280/2, 400, "28px Monospace", "rgba(128, 255, 255, 1)", "Final Player Score: "+player_score);
		return;
	}

	var i;
	var mouseover = 0;

	var mouse_over = -1;
	
	//The player's faceup cards.
	for(i=0; i<14;i++)
	{
		if (player_cards[i]===1)
		{
			mouse_over = (i === card_selected);
			draw_card(i*(card_width+card_gap),height-card_height,card_width,card_height,card_strings[i],mouse_over);
		}
	}

	//The AI's facedown cards.
	for(i=0; i<count_card(ai_cards);i++)
	{
		game.drawRectangle(i*(card_width+card_gap),0,card_width,card_height,"rgba(128,255,255,1)");
	}

	//The most recently played cards.
	if (last_cards[0]!== -1)
	{
		draw_card(20,360+card_height,card_width,card_height,card_strings[last_cards[0]],0);
		draw_card(20,360-card_height,card_width,card_height,card_strings[last_cards[1]],1);
	}
	
	//The current score card up for grabs.
	draw_card(200, 360, card_width, card_height, card_strings[score_cards[round_number]], 0);

	// draw ai score
	game.drawText(1280-200,0,"28px Monospace","rgba(128,255,255,1)","Ai Score: "+ai_score);

	game.drawText(1280-200,720-100,"28px Monospace","rgba(128,255,255,1)","Score: "+player_score);
	
	game.drawText(0, 150, "12px Monospace", "rgba(0, 0, 0, 1)", "AI Cards:");
	for(i = 0; i < 13; i++){
		game.drawText(30*i + 90, 150, "12px Monospace", "rgba(0, 0, 0, 1)", ""+ai_cards[i]+",");	
	}
}

function update()
{
	step();
	draw();
}

game.Loop(update);
