**Q: I have probably tried out four or five different API's at this point (Wolfram Alpha, XKCD and a few more) and have not been able
to successfully make requests to any of them. I have tried using the built-in 'XMLHttpRequest' object (AJAX), p5.js' 'loadJSON()'
function, and the built-in 'JSON.parse()' object, and every time my plans are foiled because the API does not support Cross-Origin Resource Sharing (i.e. loading content from other domains). I've found a list of API's that are supposed to support CORS, and even
a technique for making special CORS requests with Javascript, but nothing seems to work. Are you familiar with this problem? Can
you point me to any resources/documentation that describe, step-by-step, how to make CORS work?**

A: I have just done a test on wolframAlpha to understand the issue that you have asked. Below is the sample code:

///////

/*
test on WolframAlpha, pls use your app key
*/

var request = 'http://api.wolframalpha.com/v2/query?appid=VJ3E4A-4R8W8VWRK2&output=json&input=population%20of%20france';


function setup() {

  createCanvas(700,700);
  background(0);
  frameRate(1);

}

function gotData(data) {   //a callback needs an argument

  console.log(data);  //to test if there is any response
 
}

function draw() {

  loadJSON(request, gotData); //this is the key syntax and line of code to make a query request and get a query response
  noLoop();

}

///////

1) If you put the whole request URL on a web browser, it did return something back: http://api.wolframalpha.com/v2/query?appid=VJ3E4A-4R8W8VWRK2&output=json&input=population%20of%20france. This shows that the query link is correct and no problem with the wolframalpha server. If there are anythings can't display with the code, that is p5js issue or your own code writing issue (this helps to isolate the problem)

* I am more familiar with json than xml, that's why the query with the paramenter > output with json as you can see in the query request. 

2) When I run the above program, I got similar issue as what you have said: "No access-control-allow-origin' . From this I know this is web issue and that is nothing wrong with the wolframalpha server or the query code (as per step 1 experiment)

3) Then I google the issue and found this: http://stackoverflow.com/questions/20035101/no-access-control-allow-origin-header-is-present-on-the-requested-resource

4) For immediate fix, I install a chrome extension as recommended by step 3: https://chrome.google.com/webstore/detail/allow-control-allow-origi/nlfbmbojpeacfghkpbjhddihlkkiljbi/related?hl=en-US

5) I tried to run the code again, and it works. This means it returns something (which is not error) in the console log. (the extension allows by passing the cross domain issue) This also implies the p5js code is correct.

6) But this is more a temporary fix to test your code whether it is workable or not. As a long run, it is still needed to be fixed by having node.js to allow server side communication. Since you don't have a real web hosting (and you can't really install it on github), it is then more for you to run your program in your computer as a server machine. (For details about node.js, please check with daniel shiffman : https://www.youtube.com/watch?v=RF5_MPSNAtU)

7) For the sake of mini ex submission, I recommend you use the method of having google chrome extension (state the rules in your readme so people know how to download and execute your program. I also think there should be similar plugin available for firefox). I do mention it in the mini ex step: "Please indicate if your work requires to download and run on our own computer. (As for mine, github doesn't work for me that's why I have to upload to my own server and ask you to download it to run on your computer)"

8) The issue is that github is more a source code sharing platform, it is not a real web hosting platform allows you to run the server side program (such as the installation of node.js). One way you can do is to (if you want to solve it as a long term issue and you want to experiment and explore this) install it in your own machine that acts as a web server. 

9) Updated: I have also tried the Firefox plugin called **CORS Everywhere** with the above sample code and it works fine too to by pass the issue (https://addons.mozilla.org/en-US/firefox/addon/cors-everywhere/) - pls check how to enable the add-on [my testing platform: mac os 10.9.5 + firefox 52.0.2 + CORS EVERYTHERE add-on ver 20150910-1410]. For my chrome setting, the extenson is called Allow-Control-Allow-Origin (https://chrome.google.com/webstore/detail/allow-control-allow-origi/nlfbmbojpeacfghkpbjhddihlkkiljbi) [my testing platform is mac os 10.9.5 + chrome 57.0.2987.133 + extension:ver 1.0.3] 

**Q: You write in the readme that we have to use found litteratur. But would it also be okay if [we] create our own narrative/story?**

A: Sure :)  (as I just afraid it will be difficult for you to create text) The objective is more for you all to explore a new library and to think about what it means by materiality of medium. 

**Q: I see that a lot of the others gets issues from you, and I would like that as well, since you are the most qualified candidate. So I just want to be sure that its not a mistake :-)**

A: True as it is difficult to reach out everyone every week. Therefore, my plan is to reach out every 2 groups each week so as to make sure by the end of the course everyone will get at least one/two feedback from me. But usually if I see there are some special issues I will address accordingly in a quick way. Actually, the feedback does not really mean for a particular person, what I actually want to cultivate is to let everyone see which / what perspective I am looking at and to ask questions so as to open up wider thinking on programming (learning through peer critique with each other). The problem I usually see is that most of you address the technical aspect, and how the work works computationally, but without much reflective articulation. The feedback is actually for everyone to see how one might relate a very concrete project to a wider discussion. As such, I actually see the feedback that I gave to a particular student could be used the same way to response to many of you. Do you see my point?

I also see there are many great learners and reflexive practitioners in our class, and they are equally qualified, but of course, sometimes, the students are less patient to do a more thorough feedback. I actually see the students should also take up the responsibility.  It is equally important for everyone to check all the other works and README file to learn from one another. There are indeed many great pieces of work if you look at students’ work, concept and articulation. 

**Q: I hope you can help me to get a better understanding of this feedback loop**

A: To deal with the concept of feedback loop, I have the following questions would like to ask you:

- In the article cybernetics one that I asked the class to read as part of this week mini ex, can you describe some of the characteristics of cybernetics? In what way we may understand it through logics? 
- The article also discusses a fire control system, can you tell me what is that about? How can it helps to control informations? 
- Nicolas Schöffer is one of the key persons in the field of cybernetics, can you look for more information to describe one of his works? (for example his early work CYSP 1)
- To extend the concept of feedback loop from system/maths, can you observe what other kinds of software/platforms are having the concept of feedback/loop in your everyday life? 
- Then go to the link that I have given (with many students' work example - http://www.creativeapplications.net/processing/feedback-machines-mis-using-technology-non-linear-behavioural-systems/), what are the common characteristics of all the works? what’s the logic of the work? (although most of the works are responded to external stimulus to obtain data, you may also consider about the input with other materials that you have learn in our last class, such as video/audio/key or mouse press?)


**Q: I'm not sure I understand the last question: How may we use programming to reflect and inquire digital (visual) culture?**

A: In general, how may you think about using programming (the practice part – the actual coding, planning and thinking) as a means of inquiry on border cultural issues (such as a throbber or imagine other digital (visual) culture).

**Q: How to resize an image?**

A: You can try to use image function, see here: https://p5js.org/reference/#/p5/image
I also find a pretty good site in explaining the transformation: http://genekogan.com/code/p5js-transformations/

**Q: Which editor you use? Can I use mine?**

A: For my personal interest I use TextWrangler. Feel free to use any other editor that does the job. (P5.js editor is deprecated but you can still use it for free)

**Q: What language are we meant to speak in at the exam?**

A: English

**Q: The program we should write code in, that you linked to seems to be another program than "processing" (wich they use in the oding train video-series on YouTube you recommended)? Is there a reason for this or am I just confused for no reason?**

A: Daniel Shiffman teaches both Processing and P5.js. They are pretty similar but P5.js supports better web-based application. We are using P5.js but not processing in AP course, however you can also gain some of the fundamental programming concepts from Daniel Shiffman's book "Learning Processing" (I have put in the reference list).
