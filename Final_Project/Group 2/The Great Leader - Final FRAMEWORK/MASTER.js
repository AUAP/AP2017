//Utilizing the "webshot" framework to grab a screenshot from an external sketch
var webshot = require("webshot");
var webshot1 = require("webshot");

//Options for the screenshot
var optionsRaw = {
  streamType: "png",
  //Delay for when webshot takes a screenshot of the sketch
  renderDelay: 60000,
  windowSize: {
    width: 1000,
    height: 1000,
  },
  shotSize: {
    width:"1000",
    height:"1000",
  },
    left: 0,
  shotOffset: {
    right: 0,
    top: 0,
    bottom: 0,
  }
};

var optionsStatement = {
  streamType: "png",
  //Delay for when webshot takes a screenshot of the sketch
  renderDelay: 60000,
  windowSize: {
    width: 1000,
    height: 1000,
  },
  shotSize: {
    width:"1000",
    height:"1000",
  },
  shotOffset: {
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  }
};
//Variable for hours counter.
var botStatusCounter = 0

//Log status to the console once every hour.
botStatus();
setInterval(botStatus, 1000*60*60)

function botStatus() {
  //Log bot status.
  console.log(botStatusCounter + " hours since deployment. I'm still alive!")
  //Increment bot by one.
  botStatusCounter++
}

//Delays the creations of the screenshots x hours
setTimeout(screenshotDelay, 1000*60*60*18);

function screenshotDelay() {
	//How often to generate new screenshots
	ScreenshotRawdata();
	ScreenshotStatement();
	//Generates screenshots once every 24 hours
	setInterval(ScreenshotRawdata, 1000*60*60*24);
	setInterval(ScreenshotStatement, 1000*60*60*24);
}

//Timeout used to time the function in compliance with the rest of the program
setTimeout(shellCleanupDelay, 1000*60*60*(24+17.5));
//Function used to run the screenshot cleanup shell script once everyday
function shellCleanupDelay() {
	shellCleanup();
	setInterval(shellCleanup, 1000*60*60*24);
}

//Timeout used to time the function in compliance with the rest of the program
setTimeout(shellUploadDelay, 1000*60*60*(18.5+24));
//Function used to run the screenshot cleanup shell script once everyday
function shellUploadDelay() {
	shellUploader();
	setInterval(shellUploader, 1000*60*60*24);
}

//Delay for when the timer for the daily post should be executed
setTimeout(tweetDailyTimer, 1000*60*60*20);

//Makes the bot tweet a daily tweet every 24 hours
function tweetDailyTimer() {
	tweetDaily();
  	setInterval(tweetDaily, 1000*60*60*24);
  	resetTimer();
  	//Runs the function once daily
	setInterval(resetTimer, 1000*60*60*24)
}

//Resets certain counters in the bot
function resetTimer() {
	//Counter for how many "active" citizens. Resets once every day, or when
	//the bot restarts
	tagcounter = 0;
	//Neat little counter used for making the bot only post once when it reaches
	//enough active citizens
	cooldown = 0;
}

//Makes the bot tweet a official statement for everyone. As its a media file,
//twitters media/upload function is used in correspondance with the "twit" framework.
function tweetDaily() {
    //Logging the action to the console
		console.log('TIME FOR THE DAILY BULLETIN FROM THE NATION')
		  //Defining specific filepath
	  	var filename = 'OfficialStatement.png';
	  	//Parameters used in the "filesync" command.
	  	var params = {
	    	encoding: 'base64'
	  	}
	    var b64 = fs.readFileSync(filename, params);
      //Uploading the media
	    T.post('media/upload', { media_data: b64 }, uploadedDaily);
      
      //Nested function used to post the preuploaded image file
			function uploadedDaily(err, data, response) {
				var id = data.media_id_string;
				//Defining the text and media ID for the post
				var tweet = {
					status: 'Daily bulletin from The Great Leader:',
					media_ids: [id]
					}
				//Actually posting the tweet
				T.post('statuses/update', tweet, tweetedImageDaily);
			}
        //Nested function to console log
				function tweetedImageDaily(err, data, response) {
					if (err) {
					    console.log("Error publishing official statement - DAILY");
				    } else {
				      console.log("Official statement published - DAILY");
					}
				}
}

//Grabs a screenshot from an external source
//This function uses the webshot framework, to grab a screenshot from the
//externally hosted headless sketch file. It generates the "raw" data screenshot
//being "spun" in the daily posted bulletin.
function ScreenshotRawdata(){
imagename = "RawData.png"

	webshot1("https://thegreatleadr.github.io/Github_Module/GitHub_FOLDER_RAWDATA/", imagename, optionsRaw, (err) => {
	if(err){
	   return console.log(err);
	}
	  console.log("RawData succesfully created");
	});
}

//This function executes a shell script as a child process. The script
//is used to upload the "raw" data screenshot to the Github repository.
function shellUploader() {

	var exec = require('child_process').execSync;
	var filename = "rawdatauploadscript.sh";

	exec(filename, processing);

		function processing(){
		  console.log("RawData succesfully uploaded to repository");
		}
	console.log("RawData succesfully uploaded to repository");
}

//This function executes a second shell script as a child process. 
//This script is used to remove the "raw" data screenshot which is
//already located in the Github repository.
function shellCleanup() {

	var exec1 = require('child_process').execSync;
	var filename1 = "cleanupscript.sh";

	exec1(filename1, processing1);

		function processing1(){
		  console.log("RawData succesfully cleaned up");
		}
	console.log("RawData succesfully cleaned up");
}

//This function uses the webshot framework, to grab a screenshot from the
//externally hosted headless sketch file. It generates the "Official statement"
//being posted as the daily bulletin.
function ScreenshotStatement(){
imagename = "OfficialStatement.png"

	webshot("https://thegreatleadr.github.io/Github_Module/GitHub_FOLDER_STATEMENT/", imagename, optionsStatement, (err) => {
	if(err){
	   return console.log(err);
	}
	  console.log("OfficialStatement succesfully created");
	});
}

console.log('Starting up truthful government')

//This bot takes use of the "Twit" API client. Its a Twitter API client that works
//with node.
var Twit = require('twit');

//The configuration files for the twitter account is saved in a different
//location and loaded here. It loads from the file "config.js"
var config = require('./config');
var T = new Twit(config);

var fs = require('fs');

//Variable used to count the amount of times the chosen string have been sent
//to the bot
var tagcounter = 0;

//The "stream" command is used, because the program constantly needs
//to check with the Twitter server
var stream = T.stream('user');
stream.on('tweet', tweetEvent);

//This function checks if the bot account should tweet or not.
function tweetEvent(eventMsg) {

	//Theses variables are used to make the coding and reading process easier
	//for the programmer. "eventMsg" is a callback function needed when
	//communicating data with Twitters servers. The paths refers to files 
	//in a JSON format, and are present in every tweet.
	var replyto = eventMsg.in_reply_to_screen_name;
	var text = eventMsg.text;
	var from = eventMsg.user.screen_name;

	function tweetImage(eventMsg) {
	  var tweet = {
	      //Using the predefined variable to respond to the specific username
	      //of the user posting to the bot account 
      	screen_name: from,
      	//The text send in the direct message, with a link to 
      	//the "raw" .json data used for the daily bulletin
      	text: 'DATA obtained and ready for wordprocessing_module.exe https://raw.githubusercontent.com/TheGreatLeadr/Final-Project/master/RawData.png',
	  }
    //Makes the bot post a direct message to the "active" user
	  T.post('direct_messages/new', tweet, tweeted);
    }
    
    //Console callbacks for the function
	function tweeted(err, data, response) {

	  if (err) {
	  	  console.log("Error publishing official statement - REPLY");
	  } else {
	      console.log("DATA leaked to a curious citizen- IMAGE");
	  }
	}

	//Variable for the specific tag used
	var chosentag = '@TheGreatLeadr #source'
	//A capitalized version can be used as well, to make the interaction more "forgiving"
	var chosentag2 = '@TheGreatLeadr #Source'

	//Logs the communication between twitter accounts to the console
	console.log(from + ' sent a tweet to ' + replyto);

	//Setting up the criteria for the interaction with the bot. You can see this
	//as two different options. Either A: The tweet to the bot account is correct
	//								Or B: The tweet to the bot account is incorrect
	//Depending on the tweet meets case A or B, the bot will send different messages.
	//
	//Case A (correct):
	if(replyto === 'TheGreatLeadr' || replyto === 'thegreatleadr' && text === chosentag || text === chosentag2) {
		tweetImage();
	} else {
	//Case B (incorrect):
		if(replyto === 'TheGreatLeadr') {
			var newtweet = '@' + from + ' Thanks for your participation. Stand by for more official bulletins from The Great Leader.';
			tweetIt(newtweet);
		}
	}
	//Counts the amount of times the specific string below has been posted since the
	//bot started running.
	if (text === chosentag) {
		tagcounter = tagcounter + 1;
	}
}
//This function is used in the cases above. It makes the account tweet. 
function tweetIt(txt) {

	var tweet = {
		status: txt
	}

	//Makes the bot account post a status update.
	T.post('statuses/update', tweet, tweeted);

	//Nested function that logs strings to the console. Makes it easier to see
	//if the bot works or not
	function tweeted(err, data, response) {
		if (err) {
			console.log("Error posting tweet respone - MESSAGE");
		} else {
			console.log("Citizen participation noticed - MESSAGE");
		}
	}
}
//Cooldown used for making the bot only post once when there is enough
//active citizens
var cooldown = 0;

//Makes the bot post an specific image when there are enough "active" followers
//The syntax is similar to the one explained earlier
function tweetImageActive() {
	//Only if "cooldown" is under 1 will the bot post the image
	if(cooldown<=1){
		console.log('ACTIVE LEVEL REACHED - POSTING THE SOURCE FOR EVERYONE')
	  	var filename = 'RawData.png';
	  	var params = {
	    	encoding: 'base64'
	  	}
	    var b64 = fs.readFileSync(filename, params);

	    T.post('media/upload', { media_data: b64 }, uploadedActive);

	    function uploadedActive(err, data, response) {
	      var id = data.media_id_string;
		  var tweet = {
			  status: 'Due to collaborative efforts from the citizens of The Great Nation, the following data has been leaked.',
		      media_ids: [id]
		  }
	      T.post('statuses/update', tweet, tweetedImageActive);
	    }

			function tweetedImageActive(err, data, response) {
			  if (err) {
				  console.log("Error publishing official datasource - ACTIVE");
			  } else {
			      console.log("Official datasource posted - ACTIVE");
			  }
			}
	}
}
//Logs the amount of followers the bot everytime the interval has passed.
//10000 milliseconds equals to 10 seconds in this example.
setInterval(getFollowers, 10000);

//Variable used to make the console log followers only once a minute, 
//even though "getFollowers" are called every 10 seconds
var followerMod = 0;

//Grabs the data from the specific twitter name the bot is using.
function getFollowers() {
	T.get('users/show', { screen_name: 'TheGreatLeadr' },  function (err, data, response) {
	followerMod++;
  if(followerMod >= 6){	
  		//Logs the amount responses to the bot with the specific string to the console.
  		//Dubbed here as "active citizens".
  console.log("There are currently " + tagcounter + " active citizens of " + data.followers_count + " total citizens in the great nation.")
    followerMod = 0;
  }
  
	  		//Calculates the "citizen"/"active citizen" ratio and acts respectively.
	  		if (data.followers_count >= tagcounter * 2) {
		
		} else {

			//If the active amount of users (people who tweet the specific string to the bot)
			//is more than 50% of the followers, this log will show
			console.log('NATION REACHED ACTIVE LEVEL');

			//Makes the cooldown trick do wonders
			cooldown++;

			//Calls the "Active" level image function to be executed
			tweetImageActive();
		}
	})
}