function display_title(){
	var s = story_json.Story;
	var html = '';
	if (s.title_image!=='' && s.hasOwnProperty("title_image")){
		html += '<div class="content">';
		html += '<div class="img_cont">';
		html += '<img class="center-fit" src="' + s.title_image +'">';
		html += '</div><!--img_cont-->';
		html += '</div><!--content-->';
	}
	else{
		html += '<div class="content, title-page">';
		html += '<div class="title">';
		html += '<h1>' + s.title + '</h1>';
		html += '<h3>by</h3>';
		html += '<h2>' + s.author + '</h2>';
		html += '</div><!--title-->';
		html += '</div><!--content-->';
	}
	document.getElementById("mainbody").innerHTML = html;
}

function display_scene(scene_id){
	var s = story_json.Scenes[scene_id];
	var html =""
	var loc = eval("story_json.locations." + s.local)
	
	html += '<div class="content">';
	html += '<div class="img_cont">';
	html += '<img class="center-fit" src="media/Loc/' + loc + '">';
		
	
	html += '<div class="dollgrid">';
	for(i=0;i<s.Doll_Pos.length;i++){
		var d = s.Doll_Pos[i][0];
		console.log(d);
		var st = "story_json.Characters." + d;
		console.log(st);
		var d = eval(st);
		var pos = s.Doll_Pos[i][1];
		html += '<img class="Doll-' + pos +'" src="media/' + d + '">'
	}
	html += '</div><!--Dollgrid-->';
	
	
	html += '<div id="dialog" class="dialog">';
	html += '<div class="name"><h2>' + s.name + '</h2></div><!--name-->';
	html += '<div class="dialogtext">' + s.dialog +'</div>';
	if(Array.isArray(s.responses) && s.responses.length){
		for(let i=0;i<s.responses.length;i++){
			html += '<div class="response"><div class="resbut"><button class="reply" onclick="display_scene(' + s.responses[i].go + ')">select</button></div><div class="restext">' + s.responses[i].reply +'</div></div>';
		}
	}
	if(Array.isArray(s.buttons) && s.buttons.length){
		for(let i=0;i<s.buttons.length;i++){
			if(s.buttons[i].hasOwnProperty("next")){html += '<button class="next" onclick="display_scene(' + s.buttons[i].next + ')">next</button>';}
			if(s.buttons[i].hasOwnProperty("replay")){
				html += '<div class="rq">';
				html += '<button class="replay" onclick="display_scene(0)">replay</button>';
				html += '<button class="quit" onclick="window.close()">quit</button>';
				html += '</div><!--rq-->';
			}
		}
	}
	html += '</div><!--dialog-->';
	
	html += '</div><!--img_cont-->';
	html += '</div><!--content-->';
	
	document.getElementById("mainbody").innerHTML = html;
	document.getElementById("dialog").style.backgroundColor = "rgba(" + s.RGBA[0]+","+ s.RGBA[1]+","+ s.RGBA[2]+","+ s.RGBA[3] + ")";
}

function main(){
	setTimeout(function(){
		display_title();
	}, 1000);
	setTimeout(function(){
		display_scene(0);
	}, 3000);
}


window.addEventListener("keyup", (e) =>{
	if(e.key == "H" || e.key=="h"){ 
		var d = document.getElementById("dialog");
		d.style.display = d.style.display == "none" ? "block" : "none";
	}
});

let story_json = {
	"Story": {
		"title": "A Short tale",
		"author": "Whoever",
		"title_image": "media/title.png"
	},
	"Characters":{
		"Tim":{"uniform":{"happy":"Male_1/MS1-smile3.png","sad":"Male_1/MS1-sad.png","angry":"Male_1/MS1-angry.png"}},
		"Mark":{"uniform":{"happy":"Male_2/MS2-smile3.png","sad":"Mark-uni-sad.png","angry":"Mark-uni-angry.png"}},
		"Sue":{"uniform":{"happy":"Female_1/FS1-smile2.png","sad":"Sue-uni-sad.png","angry":"Sue-uni-angry.png"}},
		"Lisa":{"uniform":{"happy":"Lisa-uni-happy.png","sad":"Lisa-uni-sad.png","angry":"Lisa-uni-angry.png"}},
		"Kate":{"uniform":{"happy":"Kate-uni-happy.png","sad":"Kate-uni-sad.png","angry":"Kate-uni-angry.png"}}		
	},
	"locations":{
		"beach":{"day":"beach-day.png","night":"beach-night.png","rain":"beach-rain.png"},
		"park":{"day":"park-day.png","night":"park-night.png","rain":"park-rain.png"},
		"school":{"day":"school-day.png","night":"school-night.png","rain":"school-rain.png"}	
	},
	"Scenes": [
		{
			"ID": 0,
			"RGBA": [20, 20, 20, 0.8],
			"Doll_Pos":[
				["Tim.uniform.happy","center"],
				["Sue.uniform.happy","right"]
			],
			"local": "school.day",
			"name": "Tim",
			"dialog": "Hi, this is just a real short demo. You can create multiple ending stories with this system. By the way you can hide the Text area by hitting 'H' or 'h'. To go to the next screen click the next button at the bottom.",
			
			"buttons": [{ "next": 1 }]
		},
		{
			"ID": 1,
			"RGBA": [20, 20, 20, 0.8],
			"Doll_Pos":[
				["Tim.uniform.happy","center"],
				["Sue.uniform.happy","right"]
			],
			"local": "park.day",
			"name": "Tim",
			"dialog": "As you can see you can have multiple responses. Each can lead to a different scene. A hard coded limit hasn't been set on the number of responses at present.",
			"responses": [
				{
					"reply": "Learn about the features this game currently has and what is to come.",
					"go": 2
				},
				{
					"reply": "Learn how the story is created.",
					"go": 3
				},
				{
					"reply": "Learn about the license",
					"go": 4
				}
			]
		},
		{
			"ID": 2,
			"RGBA": [20, 20, 20, 0.8],
			"Doll_Pos":[
				["Tim.uniform.happy","center"],
				["Mark.uniform.happy","right"]
			],
			"local":"park.night",
			"name": "Tim",
			"dialog": "<p>The engine has currently allows for placing dolls to represent the characters talking on screen. You can have up to 5 characters at once on the screen. The system allows giving state names to the doll images like happy, sad, angry and so on. Locations are also featured and can have different images for the same location such as for day night and so on. There is a system in place allowing you to name those as well. Of course the story allows for you to create multiple story lines and endings for the stories.</p><p>In the future we have plans to add a number of other features including SVG graphics and layering along with character attributes, event systems and more.",
			"buttons": [{ "next": 5 }]
		},
		{
			"ID": 3,
			"RGBA": [20, 20, 20, 0.8],
			"Doll_Pos":[
				["Tim.uniform.happy","center"],
				["Sue.uniform.happy","right"]
			],
			"local": "beach.day",
			"name": "Tim",
			"dialog": "<p>At present the entire story is stored in JSON. That will be the intent in the future as well. This Makes it very easy to keep the story separated from the code itself and to allow us to create a graphical ide for building the story that will require no programming on the story developers part.</p>",
			"buttons": [{ "next": 5 }]
		},
		{
			"ID": 4,
			"RGBA": [20, 20, 20, 0.8],
			"Doll_Pos":[
				["Tim.uniform.happy","center"],
				["Sue.uniform.happy","right"]
			],
			"local": "school.day",
			"name": "Tim",
			"dialog": "<p>Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the “Software”), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:</p></br><p>The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.</p></br><p>THE SOFTWARE IS PROVIDED “AS IS”, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.</p></br><p>This licensing only applies to this and earlier versions of the engine. It does not apply to future engines or the ide in developement.</p>",
			"buttons": [{ "next": 5 }]
		},
		{
			"ID": 5,
			"RGBA": [20, 20, 20, 0.8],
			"Doll_Pos":[
				["Tim.uniform.happy","center"],
				["Sue.uniform.happy","right"]
			],
			"local": "school.day",
			"name": "Tim",
			"dialog": "<p>If you want to replay the game simply click the replay button below it will take you to the first scene. If you use the quit button it will close the window.</p><br/><p>The Artist/Creator as 'Elzee' created the character images. License for each is include in their perspective directory. The background images are my own creation artistically base on other images.",
			"buttons": [{"replay":0}, {"quit":-1}]
		}
	]
};

window.onload = main();
