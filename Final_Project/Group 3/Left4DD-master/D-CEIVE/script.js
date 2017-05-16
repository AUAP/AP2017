/*
   ******************************************************
   ** Left4DD Final Project Super Happy Go-Go Supreme™ **
   ******************************************************
   TODO:
    * clean up code(!)
    * Figure out presentation
*/

// initialization of global variables
var cat        = 0, // 'cat' and 'subCat' are counters to keep
    subCat     = 0, // track of which page is currently showing.
    person     = {}, // Person is an empty object we will push user input to.
    pages      = [], // 'pages' will be a 2D array that contains the element of each page
    images     = [], // contains path to adpopup images in the form of strings.
    lastPage,
    catHeaders = ["Account", "Name", "Sex", "Age", "Location", "Employment", "Attraction", "Hobbies", "Sports", "Medical Conditions", "Insurance", "Religion"], // category names
    genAds =["attorney","checklist","discount","spendee","websoftex","Evony","Farmheroes"], // general add names
    multChoice = {
      sex:["Male", "Female"],
      age:['18-25', '26-35', '36-45', '46-55', '56-65', '66+'],
      hobbies:['Fishing', 'Technology', 'Fitness', 'Art', 'Crafts', 'Gaming', 'Gardening', 'Cooking'],
      sports:['Horseback Riding', 'Football', 'Handball', 'Motorsport', 'Tennis', 'E-sports', 'Golf', 'Hockey', 'Swimming'],
      medical:['ADHD', 'Allergies', 'Asthma', 'Back pain', 'Diabetes', 'Heartburn', 'Migraines', 'High blood pressure', 'Heart disease', 'Impotence', 'Obesity'],
      insurance:['Life insurance', 'Property insurance', 'Health insurance', 'Self insurance', 'Travel insurance'],
      religion:['Christianity', 'Catholic', 'Islam', 'Judaism', 'Buddhism', 'Sikhism', 'Hinduism', 'Atheism']
    }, // checkbox names
    headers    = [   // objects of the 'Page' type (see constructor).
      ['Username', 'Password', 'Repeat Password'],
      ['What is your first name?', 'What is your last name?', 'What is your middle name?'],
      [multChoice.sex],
      [multChoice.age],
      ['Which country do you live in?', 'Which city do you live in?', 'What is the name of your street?', 'What is your house-number?'],
      ['What is your education level?', 'What is your job?', 'Who is your employer?', 'What is your mounthly household income?'],
      ['What is your sexual orientation?'],
      [multChoice.hobbies],
      [multChoice.sports],
      [multChoice.medical],
      [multChoice.insurance],
      [multChoice.religion],
    ];




function frontPage(){
  // Create front img and button
  var frontImg = createImg("assets/forside.jpg");
  frontImg.position((window.innerWidth/2)-800, (window.innerHeight/2)-450);
  frontImg.addClass('background');

  var beginbutton = createButton("Sign up");
  beginbutton.position((window.innerWidth/2)-110, (window.innerHeight/2)+ 100);
  beginbutton.id('btn');

  beginbutton.mousePressed( function(){ beginbutton.hide(); frontImg.hide();
    // make first page (in sign up process) hide
    for (element in pages[0][0]) {
      pages[0][0][element].show();
    }
  }
);
}
  // Test if the next page is a input or checkbox page
function pageType(arg1, arg2) {
  var newPage;
  // If category is one of these titles, the page is checkbox.
  switch (arg1) {
    case 'Age':
    case 'Sex':
    case 'Hobbies':
    case 'Sports':
    case 'Medical Conditions':
    case 'Insurance':
    case 'Religion':
      // Making an array of checkboxes that matches the length of the array of the same name as the page.
      newPage = new Page2(arg1, arg2);
      for (element in newPage) {
        if (Array.isArray(newPage[element])) {
          for (m = 0; m < newPage[element].length; m++) {
            newPage[element][m].hide();
          }
        } else {
          newPage[element].hide();
        }
      }
      break;
    default:
      newPage = new Page1(arg1, arg2);
      for (element in newPage) {
        newPage[element].hide();
      }
  }
  return newPage;
}

function setup() {
  frontPage();
  noCanvas();
  // nested for-loop fills the 2D array 'pages' and gives
  // each object the appropriate header argument (see array 'headers')
  for (i = 0; i < headers.length; i++) {
    pages[i] = [];
    for (j = 0; j < headers[i].length; j++) {
      pages[i][j] = pageType(catHeaders[i], headers[i][j]);
      // Links the function 'submit' to all the buttons. 'submit' is wrapped in
      // an anonymous function to avoid a bug where the function fires in the
      // two following lines (which it isn't supposed to)
      pages[i][j].submit.mousePressed(function(){submit(false);});
      pages[i][j].noSubmit.mousePressed(function(){submit(true);});
    }
  }
  pages.push([]);
	pages[pages.length-1].push(new EndPage);

	// WE HAVE TO GO DEEPER
	lastPage = pages[pages.length-1][pages[pages.length-1].length-1];

	for (element in lastPage) {
		lastPage[element].hide();
	}
  pages[0][1].textInput.attribute('type', 'password');
  pages[0][2].textInput.attribute('type', 'password');
}
// function to call when submit or dont submit button is pressed
function submit(orNot) {
  // hide current page, check if is a checkbox page or input page.
  for (element in pages[cat][subCat]) {
    if (pages[cat][subCat][element] instanceof Array) {
      for (o = 0; o < pages[cat][subCat][element].length; o++) {
        pages[cat][subCat][element][o].hide();
      }
    } else {
    pages[cat][subCat][element].hide();
    }
  }

  // log user input to person object. save input.value if input page, and checkbox.checked if checkbox page.
  if (pages[cat][subCat] instanceof Page2) {
    person[catHeaders[cat]] = [];
    for (i = 0; i < pages[cat][subCat].options.length; i++) {
      if (pages[cat][subCat].options[i].checked()) {
        person[catHeaders[cat]].push(pages[cat][subCat].options[i].id());
      }
    }
    // prepears an popup add based on page type.  
    newReklam(1);
  } else {
    if (pages[cat][subCat].textInput.value() != '') {
      person[headers[cat][subCat]] = pages[cat][subCat].textInput.value();
      newReklam(0);
    }
  }

  // IF user chose 'Don't submit' OR user is on the last page of
  // this category, skip to the first question in next category.
  if (orNot || subCat == pages[cat].length-1) {
    cat++;
    subCat = 0;
  // ELSE go to the next question in this category
  } else {
    subCat++;
  }
    // if it is the last page you dont fuck shit up.
  if (pages[cat] == undefined) {
    cat == pages.length-1;
  }

  // now that 'cat' and 'subCat' have been changed
  // appropriately, show the "new" page.
    // basiclly the same thing as hide pages, just showing next page. based on page type.
  for (element in pages[cat][subCat]) {
    if (Array.isArray(pages[cat][subCat][element])) {
      for (o = 0; o < pages[cat][subCat][element].length; o++) {
        pages[cat][subCat][element][o].show();
      }
    } else {
      pages[cat][subCat][element].show();
    }
  }
  if (pages[cat][subCat] == lastPage) {
    popup();
  }
}
// you can press enter to press submit
function keyPressed() {
  if (keyCode == 13) {
    submit(false);
  }
}

// page constructor (text input)
// creates a template for the textbox page
function Page1(cathead, header) {
  this.catheader = createElement("h1",cathead);
  this.header    = createElement('h2', header);
  this.textInput = createInput('');
  this.submit    = createButton('Submit');
  this.submit.addClass('submit');
  this.noSubmit  = createButton('Don\'t Submit');
  this.noSubmit.addClass('noSubmit');
}

// page constructor (checkbox input)
// creates a template for the checkbox page
function Page2(cathead, arg2) {
  this.catheader = createElement("h1",'');
  this.header    = createElement('h2', cathead);
  this.options   = [];
  var container  = createDiv('');
    
// creates chekboxes based on the length of the chosen array.
  for (n = 0; n < arg2.length; n++) {
    this.options.push(createCheckbox(arg2[n], false));
    this.options[n].id(arg2[n]);
    this.options[n].position(window.innerWidth*0.35, 200 + (n*30));
    this.options[n].parent(container);
  }
//makes submit buttons
  this.submit    = createButton('Submit');
  this.submit.addClass('submit');
  this.noSubmit  = createButton('Don\'t Submit');
  this.noSubmit.addClass('noSubmit');
}

// page constructor (last page)
function EndPage() {
  this.bagside = createImg('assets/bagside.jpg');
  this.bagside.position((window.innerWidth/2)-800, (window.innerHeight/2)-450);
  this.bagside.addClass('background');
}
