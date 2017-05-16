console.log("Node startet");  			//A logging that the node actually started.

var db = require('./db.json'); 			//Getting the json-file, which contains all the content for the text generator.
var Twit = require('twit');				//We need the Twit node package, inorder to post to twitter.
var config = require('./config');		//This is a js-script containg the API tokens, check the config_template.js in order to see how it is setup.
var T = new Twit(config);				//Configurating Twit with the information need.

var uniqueEntries = [];					//Some templates needs to use the same random content from the db.json-file, this is used for this further down in the script.

var templateUseCnt = 0;					//We count how many times we used a ceratain template, in order to switch it after a certain amount.
var curTemplate = chooseTemplate();		//We want the current template to be global. With the initilizng of the variable, we get a random template.

var Timer = setInterval(function(){ generateMessage() }, 3600000);		//We use setInterval() in order to run the code every hour, instead of having the code constantly looping.
generateMessage();									//Set interval will not run when initiated, so that is done here.


//This is the main-loop, that is run every hour.
function generateMessage()
{	
	var message = '';
	
	//Check if we need a new template, if so we grab a new and resets the counter
	if(templateUseCnt > 4)
	{
		curTemplate = chooseTemplate();
		templateUseCnt = 0;
	}

	//First of we don't want to curTemplate var, so we create a local variable for that.
	//Then we split the template into multiple strings, in a string array.
	//The split happens at every space-character
	var template = curTemplate.split(' ');

	//This for-loop is going through every word in the template, from start to finish of the sentece.
	for(var i = 0; i < template.length; i++)
	{
		//The strings contains $ or € if there is a need for a random($) or a unique(€) entry from the db.json-file.
		if(template[i].charAt(0) === '$')
		{
			var tCriteria;	//Some lookups need grammatical criterias, which is indicated with a ':' char in the string from the template.
			var tableLookup = template[i].slice(1); //We slice off the first character, since that is the identifier and not part of the table name.

			//If there is a criteira in need, we also need this seperated, in order to parse it to the function tableLookup(table, criteria).
			if(tableLookup.indexOf(':') >= 0)
			{
				tableLookupOptions = tableLookup.split(':');
				tableLookup = tableLookupOptions[0];
				tCriteria = tableLookupOptions[1];

				message += getRandomEntry(tableLookup, tCriteria) + ' ';	// Here we add the random-generated word to the final message
			}
			//If there is no need for a criteria, we just get the random entry and add it
			else
			{
				message += getRandomEntry(tableLookup) + ' '; 
			}

				
		}
		//This loop is used for unique randomization. In if there is a need for the same entry twice in the template, we use this loop.
		//It is much like the previous, in that we still need to randomize the first and allocate it to the uniqueEntries-array.
		//If we hit this the second, third, fourth etc. time, we just grab the already allocated value.
		else if(template[i].charAt(0) === '€')
		{
			var tCriteria;
			var tableLookup = template[i].slice(1);

			if(tableLookup.indexOf(':') >= 0)
			{
				tableLookupOptions = tableLookup.split(':');
				tableLookup = tableLookupOptions[0];
				tCriteria = tableLookupOptions[1];
			}

			var returnValue = getUniqueEntry(tableLookup);

			if(returnValue === false)
			{
				var tValue;

				if(tCriteria === undefined)
				{
					tValue = getRandomEntry(tableLookup);
				}
				else
				{
					tValue = getRandomEntry(tableLookup, tCriteria);
				}

				setUniqueEntry(tValue, tableLookup);

				message += tValue + ' ';
			}
			else
			{
				message += returnValue + ' ';
			}
				

		}
		//If we don't need random values, we will check for characters like comma and punctuation, which requires the last space character of the message to removed.
		//Else we jut add the word, without getting random entries.
		else
		{
			if(template[i].charAt(0) === '.' || template[i].charAt(0) === ',')
			{
				message = message.slice(0, -1);
			}

			message += template[i] + ' ';
		}
	}

	//The last character will always be a space, thus it's removed here before posting.
	message = message.slice(0, -1);
		
	//If the message is above the maximum allowed characters of 140, we will generate a new message.
	//Else we will simply post it to twitter.
	if(message.length > 139)
	{
		generateMessage();
	}
	else
	{
		tweetMessage(message);
		templateUseCnt++;		//We advance the counter for template use. This needs altering, since we don't know if the message actually was posted to twitter. Will be moved to a callback function of tweetMessage.
	}

	clearUniqueEntries();	//The unique entries will need to be emptied after every randomization, since they are unique to this instance only.
}

//This function post to twtiter, with the help of the Twit node-package function post.
function tweetMessage(message)
{
	T.post('statuses/update', { status: message }, function(err, data, response){ if(err){console.log(err)} });
}

//This function is a bit of mess, but is relatively easy to go through.
//The function is parsed with either a table value or a table and a criteria value.
//A switch case looks through the table and makes a randomizing according to the needed criterias.
function getRandomEntry(table, criteria)
{
	var tString = '';

	switch(table) 
	{
		case 'Template':
			tString = db.Templates[Math.floor(Math.random() * db.Templates.length)];
			break;

		case 'Role':
			if(criteria.indexOf('DefSingular') >= 0)
				tString = db.Roles[Math.floor(Math.random() * db.Roles.length)].DefSingular;

			else if(criteria.indexOf('IndefSingular') >= 0)
				tString = db.Roles[Math.floor(Math.random() * db.Roles.length)].IndefSingular;

			else if(criteria.indexOf('Plural') >= 0)
				tString = db.Roles[Math.floor(Math.random() * db.Roles.length)].Plural;

			else
				console.log("You didn't specify the gramatic criteria of Roles");
			break;

		case 'Action':
			if(criteria.indexOf('Verb') >= 0)
				tString = db.Actions[Math.floor(Math.random() * db.Actions.length)].Verb;

			else if(criteria.indexOf('ThirdPersonSingular') >= 0)
				tString = db.Actions[Math.floor(Math.random() * db.Actions.length)].ThirdPersonSingular;

			else
				console.log("You didn't specify the gramatic criteria of Action");

			break;

		case 'Adjective':
			tString = db.Adjectives[Math.floor(Math.random() * db.Adjectives.length)];
			break;

		case 'Place':
			tString = db.Places[Math.floor(Math.random() * db.Places.length)];
			break;

		case 'Setting':
			tString = db.Settings[Math.floor(Math.random() * db.Settings.length)];
			break;

		case 'Object':
			if(criteria.indexOf('DefSingular') >= 0)
				tString = db.Objects[Math.floor(Math.random() * db.Objects.length)].DefSingular;

			else if(criteria.indexOf('IndefSingular') >= 0)
				tString = db.Objects[Math.floor(Math.random() * db.Objects.length)].IndefSingular;

			else if(criteria.indexOf('Plural') >= 0)
				tString = db.Objects[Math.floor(Math.random() * db.Objects.length)].Plural;

			else
				console.log("You didn't specify the gramatic criteria of Objects");

			break;

		case 'Actor':
			tString = db.Actors[Math.floor(Math.random() * db.Actors.length)];
			break;

		case 'Genre':
			tString = db.Genres[Math.floor(Math.random() * db.Genres.length)];
			break;

		case 'Genre':
			tString = db.Genres[Math.floor(Math.random() * db.Genres.length)];
			break;

		case 'Event':
			tString = db.Events[Math.floor(Math.random() * db.Events.length)];
			break;

		case 'Concept':
			tString = db.Concepts[Math.floor(Math.random() * db.Concepts.length)];
			break;

		case 'Name':
			tString = db.Names[Math.floor(Math.random() * db.Names.length)];
			break;
		
		case 'Surname':
			tString = db.Surnames[Math.floor(Math.random() * db.Surnames.length)];
			break;

		default:
			console.log("Table: " + table + " dosen't exsist")
	}

	return(tString);
}

//This function is used for getting new templates, that are not identical to the previous selected one.
function chooseTemplate()
{
	var i = 0;
	var newTemplate;
	
	while(i == 0)
	{
		newTemplate = getRandomEntry('Template');
		
		if(curTemplate != newTemplate)
		{
			i++;
		}
	}

	console.log(newTemplate);
	return newTemplate;
}

//Function for putting a unique entry to the array of unique entries.
function setUniqueEntry(value, table)
{
	var tUniqueEntry = new Entry(value, table);
	uniqueEntries.push(tUniqueEntry);
}

//Used for finding a already allocated unique entry, returns false if it failed meaning that none of that table exsist already.
function getUniqueEntry(table)
{
	var tUniqueEntry;

	for(var i = 0; i < uniqueEntries.length; i++)
	{
		if(uniqueEntries[i].table == table)
			tUniqueEntry = uniqueEntries[i].value;
	}

	if(tUniqueEntry === undefined)
	{
		return false;
	}
	else
	{
		return tUniqueEntry
	}
}

//Simple function, but everyother manipulation of the uniqueEntry array is in functions, so this is too.
function clearUniqueEntries()
{
	uniqueEntries = [];
}

//A class for the Entry values, which needs a table name and a value of the randomization 
function Entry(value, table)
{
	this.value = value;
	this.table = table;
}
