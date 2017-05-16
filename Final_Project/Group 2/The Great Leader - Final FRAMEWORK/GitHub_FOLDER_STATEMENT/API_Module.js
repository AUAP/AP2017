//The following objects are the vital informations of each API
//CarbonEmissions / Energy
var api1 = {
    Name: "Carma",
    Master: 'http://carma.org/api/1.1/searchLocations?name=',
    Country: ["Denmark", "Argentina", "China", "United States", "France"],
      End: '&region_type=2&format=json',
    Hack: 'https://crossorigin.me/'
} 

//Humanitarian (Natural Disasters)
var api2 = {
    Name: "Humanitarian",
    Master: 'https://www.humanitarianresponse.info/api/v1.0/disasters?filter[status]=current',
} 

//Torture
var api3 = {
    Name: "Torture",
    Master: 'https://raw.githubusercontent.com/pdfliberation/amnestydata/master/parsed-data/2008%20torture%20extract.json'
} 

//Crime Rates / Types UK (Evt. brug antallet af crime cases som statement point)
var api4 = {
    Name: "Crime",
    Master: 'https://data.police.uk/api/crimes-no-location?category=all-crime&force=warwickshire&date=2013-0',
}

//Information of Humans killed by officers in service
var api5 = {
  Name: "Killings",
  Master: "https://thecountedapi.com/api/counted?state=",
  State: ["NY", "AL", "AK", "AZ", "AR", "CA", "CO", "CT", "DE", "FL", "GA", "HI"]
}

//These variables are INDEX modifiers. var i controls the random api function and var j controls random information from those api's
var dateOfCrime = 1;
var countryOfData = 0;
var stateOfKill = 0;

//The URL's and the elements they are composed of
var url1 = api1.Hack + api1.Master + api1.Country[countryOfData] + api1.End; //Carma URL
var url2 = api2.Master; //Humanitarian URL
var url3 = api3.Master //Torture URL
var url4 = api4.Master + dateOfCrime //CrimeData URL
var url5 = api5.Master + api5.State[stateOfKill] //Killings URL

//The apiSwitch is the backbone of the program. It choses an API from todays date. This is through the dateCheck variable.
function apiSwitch() {
    switch (dateCheck) {
        case 1: //Humanitarian
            humDate = 16 //floor(map(dateCheck, 4, 7, 10, 30)); //Api 1
            loadJSON(url2, gotData2);
            loadJSON("LeaderLexicon.json", humData);
            break;

        case 2: //Torture
            loadJSON(url3, gotData3)
            loadJSON("LeaderLexicon.json", tortData);
            break;

        case 3: //Crime
            dateOfCrime = 3 //floor(map(dateCheck, 11, 13, 1, 4));
            dateCrimeMod1 = 3;
            dateCrimeMod2 = 4;
            loadJSON(url4, gotData4)
            loadJSON("LeaderLexicon.json", crimeData);
            break;
            
        case 4: //Killings
            stateOfKill = 4 //floor(map(dateCheck, 14, 15, 0, 6));
            url5 = api5.Master + api5.State[stateOfKill]
            loadJSON(url5, gotData5);
            loadJSON("LeaderLexicon.json", killData);
          break;
          
        case 5: //Torture
          loadJSON(url3, gotData3)
          loadJSON("LeaderLexicon.json", tortData);
          break;
          
        case 6: //Humanitarian
          humDate = 6 //floor(map(dateCheck, 18, 21, 20, 40)); //Api 1
          loadJSON(url2, gotData2);
          loadJSON("LeaderLexicon.json", humData);
          break;
          
        case 7: //Killings
          stateOfKill = 7 //floor(map(dateCheck, 22, 25, 7, 11));
          url5 = api5.Master + api5.State[stateOfKill]
          loadJSON(url5, gotData5);
          loadJSON("LeaderLexicon.json", killData);
          break;
          
        case 8: //CarmaData
          carmaDate = 0 //floor(map(dateCheck, 25, 26, 0, 2)); //Api 0
          countryOfData = 3 //floor(map(dateCheck, 25, 26, 3, 5))
          url1 = api1.Hack + api1.Master + api1.Country[countryOfData] + api1.End;
          loadJSON(url1, gotData);
          loadJSON("LeaderLexicon.json", carmaData);
          break;
          
        case 9: //Crime
          url4 = api4.Master + dateOfCrime 
          dateOfCrime = 7 //floor(map(dateCheck, 27, 32, 7, 9));
          dateCrimeMod1 = 8;
          dateCrimeMod2 = 10;
          loadJSON(url4, gotData4)
          loadJSON("LeaderLexicon.json", crimeData);
          break;
          
        case 10: //Torture
          loadJSON(url3, gotData3)
          loadJSON("LeaderLexicon.json", tortData);
          break;

        case 11: //Humanitarian
          humDate = 25 //floor(map(dateCheck, 18, 21, 20, 40)); //Api 1
          loadJSON(url2, gotData2);
          loadJSON("LeaderLexicon.json", humData);
          break;
          
        case 12: //CarmaData
          carmaDate = 1 //floor(map(dateCheck, 25, 26, 0, 2)); //Api 0
          countryOfData = 4 //floor(map(dateCheck, 25, 26, 3, 5))
          url1 = api1.Hack + api1.Master + api1.Country[countryOfData] + api1.End;
          loadJSON(url1, gotData);
          loadJSON("LeaderLexicon.json", carmaData);
          break;
        
        case 13: //Crime
          url4 = api4.Master + dateOfCrime 
          dateOfCrime = 8 //floor(map(dateCheck, 27, 32, 7, 9));
          dateCrimeMod1 = 12;
          dateCrimeMod2 = 14;
          loadJSON(url4, gotData4)
          loadJSON("LeaderLexicon.json", crimeData);
          break;
          
        case 14: //Torture
          loadJSON(url3, gotData3)
          loadJSON("LeaderLexicon.json", tortData);
          break;
          
        case 15: //Crime
          url4 = api4.Master + dateOfCrime 
          dateOfCrime = 2 //floor(map(dateCheck, 27, 32, 7, 9));
          dateCrimeMod1 = 14;
          dateCrimeMod2 = 16;
          loadJSON(url4, gotData4)
          loadJSON("LeaderLexicon.json", crimeData);
          break;
          
        case 16: //Humanitarian
          humDate = 40 //floor(map(dateCheck, 18, 21, 20, 40)); //Api 1
          loadJSON(url2, gotData2);
          loadJSON("LeaderLexicon.json", humData);
          break;
          
        case 17: //CarmaData
          carmaDate = 0 //floor(map(dateCheck, 25, 26, 0, 2)); //Api 0
          countryOfData = 2 //floor(map(dateCheck, 25, 26, 3, 5))
          url1 = api1.Hack + api1.Master + api1.Country[countryOfData] + api1.End;
          loadJSON(url1, gotData);
          loadJSON("LeaderLexicon.json", carmaData);
          break;
          
        case 18: //CarmaData
          carmaDate = 1 //floor(map(dateCheck, 25, 26, 0, 2)); //Api 0
          countryOfData = 0 //floor(map(dateCheck, 25, 26, 3, 5))
          url1 = api1.Hack + api1.Master + api1.Country[countryOfData] + api1.End;
          loadJSON(url1, gotData);
          loadJSON("LeaderLexicon.json", carmaData);
          break;
          
        case 19: //Humanitarian
          humDate = 11 //floor(map(dateCheck, 18, 21, 20, 40)); //Api 1
          loadJSON(url2, gotData2);
          loadJSON("LeaderLexicon.json", humData);
          break;
          
        case 20: //Humanitarian
          humDate = 31 //floor(map(dateCheck, 18, 21, 20, 40)); //Api 1
          loadJSON(url2, gotData2);
          loadJSON("LeaderLexicon.json", humData);
          break;
          
        case 21: //Torture
          loadJSON(url3, gotData3)
          loadJSON("LeaderLexicon.json", tortData);
          break;
          
        case 22: //Crime
          url4 = api4.Master + dateOfCrime 
          dateOfCrime = 3 //floor(map(dateCheck, 27, 32, 7, 9));
          dateCrimeMod1 = 21;
          dateCrimeMod2 = 23;
          loadJSON(url4, gotData4)
          loadJSON("LeaderLexicon.json", crimeData);
          break;
          
        case 23: //Crime
          url4 = api4.Master + dateOfCrime 
          dateOfCrime = 7 //floor(map(dateCheck, 27, 32, 7, 9));
          dateCrimeMod1 = 22;
          dateCrimeMod2 = 24;
          loadJSON(url4, gotData4)
          loadJSON("LeaderLexicon.json", crimeData);
          break;
          
        case 24: //Killings
          stateOfKill = 9; //floor(map(dateCheck, 22, 25, 7, 11));
          url5 = api5.Master + api5.State[stateOfKill]
          loadJSON(url5, gotData5);
          loadJSON("LeaderLexicon.json", killData);
          break;
          
        case 25: //Torture
          loadJSON(url3, gotData3)
          loadJSON("LeaderLexicon.json", tortData);
          break;
          
        case 26: //Humanitarian
          humDate = 27; //floor(map(dateCheck, 18, 21, 20, 40)); //Api 1
          loadJSON(url2, gotData2);
          loadJSON("LeaderLexicon.json", humData);
          break;
          
        case 27: //Torture
          loadJSON(url3, gotData3);
          loadJSON("LeaderLexicon.json", tortData);
          break;
          
        case 28: //Humanitarian
          humDate = 28; //floor(map(dateCheck, 18, 21, 20, 40)); //Api 1
          loadJSON(url2, gotData2);
          loadJSON("LeaderLexicon.json", humData);
          break;
          
        case 29: //Crime
          url4 = api4.Master + dateOfCrime; 
          dateOfCrime = 8; //floor(map(dateCheck, 27, 32, 7, 9));
          dateCrimeMod1 = 27;
          dateCrimeMod2 = 32;
          loadJSON(url4, gotData4);
          loadJSON("LeaderLexicon.json", crimeData);
          break;
          
        case 30: //Humanitarian
          humDate = 12; //floor(map(dateCheck, 18, 21, 20, 40)); //Api 1
          loadJSON(url2, gotData2);
          loadJSON("LeaderLexicon.json", humData);
          break;
          
        case 31: //Killings
          stateOfKill = 6; //floor(map(dateCheck, 22, 25, 7, 11));
          url5 = api5.Master + api5.State[stateOfKill]
          loadJSON(url5, gotData5);
          loadJSON("LeaderLexicon.json", killData);
          break;
    }
}