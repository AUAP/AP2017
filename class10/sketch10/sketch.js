/*
sketch09
- The program just runs once due to the current rate limit set by NYT (and i have to slow everything down in order to request multiple things in separate queries)
- check the rate limit of the API > some companies do not allow multiple requests per time (or per less than a second) A for loop runs very fast in millisecond!!
- If you have only one request in a time, better put the 'loadString' in setup or preload function 
- Apply your own API key here: https://developer.nytimes.com/
- check out the json file here: https://developer.nytimes.com/article_search_v2.json#/Console  (this is for reference only because I found that the interface cannot recognize some of the parameters)
- for other data >   "url": "images/2016/02/12/business/12db-markets-jp/12db-markets-jp-thumbWide.jpg", you need to add "https://www.nytimes.com/" in front to get the full image.  e.g http://www.nytimes.com/images/2016/02/12/business/12db-markets-jp/12db-markets-jp-thumbWide.jpg
- for easier data viewing (identify which node), you can put the full query request on a web browser

** pls do suggest a better way to deal with the rate limit issue with the code
*/

var url = 'http://api.nytimes.com/svc/search/v2/articlesearch.json';
var apikey ='INPUT YOUR OWN KEY HERE';
var request; //the full request API with your critera
var freq; //the returned hits
var barsize = 25; //size of the bar chart
var request_time =0;

//search criteria
var words = ["Sweden", "Denmark", "Hong+Kong", "San+Francisco", "Taiwan", "Oslo", "United+Kingdom", "China", "Boston", "Brazil", "Japan", "Thailand", "Vietnam", "Australia", "Cambodia"];
//var words = ["Sweden", "Denmark", "Hong+Kong"];
var start = "20160201";
var end = "20160301";


function setup() {
	createCanvas(700,700);
	background(0);
	frameRate(1);
}

function gotData(data) {   //a callback needs an argument
	//console.log(data);  //to test if there is any response
	freq = data.response.meta.hits;
	console.log("There were " + freq + " occurrences of the term " + words[request_time]);
	fill(255);
	translate(barsize*request_time, 0);
	rect(width/4, 0, barsize, map(freq, 0, 20000, 0, height));	
	
	//try getting other data e.g image
	//console.log(data.response.docs[0].multimedia[0].url)  
	
}


function draw() {
	
	if (request_time<words.length) {
		request = url + "?q=" + words[request_time] + "&begin_date=" + start + "&end_date" + end + "&api-key=" + apikey;
		console.log(request);  //print the full query request
		loadJSON(request, gotData);	
		request_time++;
	}else{
		noLoop();
	}
}

