#Synopsis

##Problem
Our area of focus for the final project in aesthetic programming will be placed on generative art. Our idea for our final program is to make a twitter bot, which tweets movie plots.  
The purpose of this project is to illustrate the idea of generative art and the problems related to said subject. We would also like to focus on the contrast in aesthetic value between product and code. Finally we will challenge the idea of generative art without a human to perceive the “art “ made by the generator. 

The texts, which we will use in correlation with this program are Generative Art Theory(Philip Galanter), The Aesthetics of Generative Code(Geoff Cox) and Love Letter Generator(Noah Wardrip-Fruin). These texts will provide theory for our final project. 

##Method
The program is going to generate its messages for twitter, through a process of ‘filling the blanks’ from a JSON-file. The JSON-file is going to contain both words in categories like; roles, actions, actor/actress twitter accounts, items etc. Furthermore the JSON-file is going to contain various 8 structures for messages. Here the the program fetches a message structure, and fills out the blank, from a random entry in the arrays.

The program will run through node.js, since we need OAuth for the Twitter API. This also means that we can upload the program to a server, where it will be able to run 24/7. 
In the Twitter API, we’re going to use the ‘POST statuses/update’ function, which lets us post a tweet to Twitter, but but also interpret the callback for errors like; downtime, duplicate message (posting the same message twice), allowed messages a day etc. This means we can try to make the program run more smoothly with the API, which is also noted in the flowchart for the program.

##Definition of concepts
*Generative Art*
Phillip Galanters defines this as, “Generative art refers to any art practice in which the artist uses a system, such as a set of natural language rules, a computer program, a machine, or other procedural invention, that is set into motion with some degree of autonomy, thereby contributing to or resulting in a completed work of art. (Galanter 2003)”

*API (Application Programming Interface)*
A feature of a program that enables others to interact with the program or database through the use of server requests

##Disposition for oral presentation 
Presentation of choice of focus Presentation of product, function and flowchart Discussion af problemstilling gennem brug af produkt Discussion of focus points and problems through the use of the product Conclusion.

##Flowchart
![Flowchart of the program](twitterbot-flowchart.png?raw=true "Flowchart of the program")