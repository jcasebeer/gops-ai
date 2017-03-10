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

var state = "player_input"

player_cards = [1,1,1,1,1,1,1,1,1,1,1,1,1];
ai_cards = [1,1,1,1,1,1,1,1,1,1,1,1,1];
score_cards = [0,1,2,3,4,5,6,7,8,9,10,11,12];

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
		for(i=0;i<14;i++)
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
			click = 0;
		}
	}
	else if (state==="some other state")
	{

	}

	
}


function draw()
{
	console.log(card_selected);
	game.drawRectangle(0,0,width,height,"rgba(128,32,64,1)");
	var i;
	var mouseover = 0;
	//for(i=1; i<14;i++)
	//{
	//	mouse_over = (i === card_selected);
	//	draw_card((i-1)*100,0,64,103,card_strings[i],mouse_over);
	//}
	var mouse_over = -1;
	for(i=0; i<14;i++)
	{
		if (player_cards[i]===1)
		{
			mouse_over = (i === card_selected);
			draw_card(i*(card_width+card_gap),height-card_height,card_width,card_height,card_strings[i],mouse_over);
		}
	}

	for(i=0; i<count_card(ai_cards);i++)
	{
		game.drawRectangle(i*(card_width+card_gap),0,card_width,card_height,"rgba(128,255,255,1)");
	}


	if (last_cards[0]!== -1)
	{
		draw_card(0,360+card_height,card_width,card_height,card_strings[last_cards[0]],0);
		draw_card(0,360-card_height,card_width,card_height,card_strings[last_cards[1]],1);
	}

	// draw ai score
	game.drawText(1280-200,0,"28px Monospace","rgba(128,255,255,1)","Ai Score: "+ai_score);

	game.drawText(1280-200,720-100,"28px Monospace","rgba(128,255,255,1)","Score: "+player_score);
}

function update()
{
	step();
	draw();
}

game.Loop(update);
