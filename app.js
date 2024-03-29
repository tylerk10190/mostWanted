"use strict"
/*
Build all of your functions for displaying and gathering information below (GUI).
*/

// app is the function called to start the entire application
let people = data;

function app(people){

  let searchType = prompt("Do you know the name of the person you are looking for? Enter 'yes' or 'no'").toLowerCase();
  switch(searchType){
    case 'yes':
      var foundPerson = searchByName(people);
      mainMenu(foundPerson, people);
      break;
    case 'no':
      otherMainMenu(people)
      break;
      default:
    app(people); // restart app
      break;
  }
}

// Menu function to call once you find who you are looking for
function mainMenu(person, people){

  /* Here we pass in the entire person object that we found in our search, as well as the entire original dataset of people. We need people in order to find descendants and other information that the user may want. */

  if(!person)
  {
    alert("Could not find that individual.");
    return app(people); // restart
  }
  // let displayOption = searchResult
  var displayOption = prompt("Found " + person.firstName + " " + person.lastName + " . Do you want to know their 'info', 'family', or 'descendants'? Type the option you want or 'restart' or 'quit'");

  switch(displayOption){
    case "info":
    displayPersonInfo(person)
    break;
    case "family":
    displayPersonFamily(person, people)
    break;
    case "descendants":
    // TODO: get person's descendants
     alert(printDescendantNames(findDescendants(data, person)));
    break;
    case "restart":
    app(people); // restart
    break;
    case "quit":
    return; // stop execution
    default:
    return mainMenu(person, people); // ask again
  }
}

function otherMainMenu(people)
{

  let peopleDataSet = people;
  let results = [0,1]
  while(results.length > 1){
  let userInput = prompt("Enter search criteria from list: Gender, Age, Height, Weight, Eye Color, Occupation.").toLowerCase()
  switch(userInput)
  {
    case "gender":
    results = searchByGender(people);
    alert("Search results that meet your criteria:" + "\n" + displayPeopleReturn(results) + "\n" + "Search by new criteria to narrow results.")    
    break;
    case "age":
    results = searchByAge(people);
    if(results.length === 0)
    {
      alert("No Results Found")
      return searchByAge(people);
    }
    alert("Search results that meet your criteria:" + "\n" + displayPeopleReturn(results) + "\n" + "Search by new criteria to narrow results.")
    break;
    case "height":
    results = searchByHeight(people)
    alert("Search results that meet your criteria:" + "\n" + displayPeopleReturn(results) + "\n" + "Search by new criteria to narrow results.")
    break;
    case "weight":
     results = searchByWeight(people)
    alert("Search results that meet your criteria:" + "\n" + displayPeopleReturn(results) + "\n" + "Search by new criteria to narrow results.")
    break;
    case "eye color":
    results = searchByEyeColor(people)
    alert("Search results that meet your criteria:" + "\n" + displayPeopleReturn(results) + "\n" + "Search by new criteria to narrow results.")
    break;
    case "occupation":
    results = searchByOccupation(people)
    alert("Search results that meet your criteria:" + "\n" + displayPeopleReturn(results) + "\n" + "Search by new criteria to narrow results.")
    break;
   
    alert("Please choose an criteria from the list")
    return otherMainMenu(); // ask again
  }
  people = results;
    if(people.length == 1)
      {
        userInput = prompt("Found " + displayPeopleReturn(people) + " . Do you want to know their 'info', 'family', or 'descendants'? Type the option you want or 'restart' or 'quit'").toLowerCase()
        switch(userInput){
          case "info":
          displayPersonInfo(people[0]);
          break;
          case "family":
          displayPersonFamily(people[0], peopleDataSet);
          break;
        }

      }
  }
}

function createParentIdArrays(array){
  let test2 = [];
  let a = array.map(a => a.parents[0]);
  let b = array.map(a => a.parents[1]);
  test2.push(a);
  test2.push(b);
  return test2;
}



function followUpQuestions(people, results){
  switch(people)
  {
    case "age":
    results = searchByAge(people)
    if(results.length === 0)
    {
      alert("No Results Found")
      return searchByAge(people);
    }
    break;
    case "height":
    searchByHeight(people)
    break;
    case "weight":
     searchByWeight(people)
    break;
    case "eye color":
    searchByEyeColor(people)
    break;
    case "occupation":
    searchByOccupation(people)
    break;
    default:
    alert("Please choose an criteria from the list")
    return otherMainMenu(people); // ask again
}
}


function searchByGender(people)
{
  let searchResult = []
  let userInput = prompt("Enter: Male or Female").toLowerCase()
        if(userInput == "male")
        {
         searchResult = people.filter(function (el)
         {
            if(el.gender == "male"){
            searchResult += el.firstName + " " + el.lastName + "\n"
            return true;
          }
          else{
            return false;
          }

         })
        }
        else if(userInput == "female")
        {
          searchResult = people.filter(function (el)
          {
            if(el.gender == "female"){
              searchResult += el.firstName + " " + el.lastName + "\n"
               return true;
          }
          else{
            return false;
          }
          })
          
        }
        else
        {
         alert("Please enter an option from the list")
        }
    // alert("Search results that meet your criteria:" + "\n" + searchResult + "\n" + "Search by new criteria to narrow results.")    
    return searchResult;
}

function searchByHeight(people)
{
  let userInput = prompt("Please enter the height in inches")
      let height = people.filter(function(el)
      {
        if(el.height == userInput)
          {
          return true;
          }
        else
          {
            return false;
          }
      })
    return height;
}

function searchByWeight(people)
{
  let userInput = prompt("Please enter the weight")
      let weight = people.filter(function(el)
      {
        if(el.weight == userInput)
        {
          return true;
        }
        else
        {
          return false;
        }
      })
    return weight;
}

function searchByEyeColor(people)
{
   let userInput = prompt("Please enter eye color").toLowerCase()
      let eyeColor = people.filter(function(el)
      {
        if(el.eyeColor == userInput)
        {
          return true;
        }
        else
        {
          return false;
        }
      })
    return eyeColor;
}

function searchByOccupation(people)
{
  let userInput = prompt("Please enter occupation").toLowerCase()
      let occupation = people.filter(function(el)
      {

        if(el.occupation == userInput)
        {
          return true;
        }
        else
        {
          return false;
        }
      })
   return occupation;
}

function searchByName(people){
  var firstName = prompt("What is the person's first name?");
  var lastName = prompt("What is the person's last name?");
  let foundPeoples = people.filter(function(el){
    if(el.firstName.toLowerCase() === firstName && el.lastName.toLowerCase() === lastName){
      return true;
    }
    else
    {
      return false;
    }
  });
 
if (foundPeoples.length > 1) {


  return null;
}

 return foundPeoples[0];


}
// searchByAge(people);
        // let elAge = dobToAge(el.dob);

function dobToAge(dob)
{
  let today = new Date()
  let month = today.getMonth() + 1;
  let date = today.getDate();
  let year =  today.getFullYear();
  let todayDate = month + "/" + date + "/" + year
  let dobArray = dob.split("/");
  let dateArray = todayDate.split("/");
  let dateMonthbig = parseInt(dobArray[0]) < parseInt(dateArray[0]); 
  let monthsEqual = parseInt(dobArray[0]) === parseInt(dateArray[0]);
  let dayEqualish = parseInt(dobArray[1]) <= parseInt(dateArray[1]);
  
    if (dateMonthbig || (monthsEqual && dayEqualish))
  {
    let actualAge = parseInt(dateArray[2]) - parseInt(dobArray[2]);
    return(actualAge);
  }
  else{
    let actualAge = (parseInt(dateArray[2]) - parseInt(dobArray[2])) - 1;
    return(actualAge);
  }  

}
// dobToAge(prompt("Please enter a date of birth. Format: mm/dd/yyyy"))


function searchByAge(people)
{
  let userInput = (prompt("Please enter the age you would like to search for"))
  let filterResults = people.filter(function(el)
  {
    let elAge = dobToAge(el.dob)
    let ageResults = elAge - userInput
    if(ageResults == 0)
    {
      return true;
  }
    else 
    {
      return false;
    }
  })

  return filterResults;
}


// function searchByMultiple(people)
// {
//   let userInput = "Please enter all the criteria you would like to search for.";
//   let multipleFinds = people.filter(function(el)
//   {
//     for(let i = 0, i = el.length, i++;)
//       if(i === userInput)
//       {
//         console.log(el.fistName + " " + el.lastName)
//         return true;
//       }
//       else{
//         return false;
//       }
//   })

// }

function findParents(people){
let parentResults = []
let filterResults = people.filter(function(el){
  if(el.parents = [])
    {
      return false;
    }
  else
    {
      el.parents += parentResults
      return true;
    }
})
console.log(parentResults)
return parentResults;
}

function findSiblings(array, person){
  if(person.parents.length == 0){
      console.log("No Siblings")
  }
  else{
      let separateArrays = createParentIdArrays(array);
      let parent1Match = searchForParentMatch(separateArrays, person.parents[0]);
      let parent2Match = searchForParentMatch(separateArrays, person.parents[1]);
      let intersection = parent1Match.filter(element => parent2Match.includes(element));
      let childrenObjects = convertIndexToObject(data, intersection);
      let siblingObjects = removePersonFromArray(childrenObjects, person);
      let siblingNames = printSiblingNames(siblingObjects);
      return siblingNames;
  }
}



function findParents(person, people){
  let filterResults = people.filter(function(el){
    return person.parents.includes(el.id);
  })
  return filterResults;
}

function findSpouse(person, people){
  let filterResults = people.filter(function(el){
    return person.currentSpouse === el.id;
    })
  return filterResults;
}


// alerts a list of people


function displayPeople(people){
  alert(people.map(function(person){
    return person.firstName + " " + person.lastName;
  }).join("\n"));

}

function displayPeopleReturn(people){
  return people.map(function(person)
  {
    return person.firstName + " " + person.lastName;
  }).join("\n");
}


function displayPersonInfo(person){
  // print all of the information about a person:
  // height, weight, age, name, occupation, eye color.
  var personInfo = "Name: " + person.firstName + " " + person.lastName + "\n";
  personInfo += "ID Number: " + person.id + "\n";
  personInfo += "Gender: " + person.gender + "\n";
  personInfo += "D.O.B: " + person.dob + "\n";
  personInfo += "Height: " + person.height + "\n";
  personInfo += "Weight: " + person.weight + "\n";
  personInfo += "Eye Color: " + person.eyeColor + "\n";
  personInfo += "Occupation: " + person.occupation + "\n";
  // personInfo += "Parents: " + person.parents + "\n";
  // personInfo += "Curent Spouse: " + person.currentSpouse + "\n";
  // TODO: finish getting the rest of the information to display
  console.log("SEARCH RESULTS:" + "\n" + "\n" + personInfo);
}



function displayPeopleInfo(people){
  // print all of the information about a person:
  // height, weight, age, name, occupation, eye color.
  let personInfo = "";
  for (var i = 0; i < people.length; i++) {
      personInfo += "Name: " + people[i].firstName + " " + people[i].lastName;
      if (i != people.length -1){
        personInfo += "\n";
    }
  }
  return personInfo;

}


function promptFor(question, valid){
  do{
    var response = prompt(question).trim();
  } while(!response || !valid(response));
  return response;
}


function displayPersonFamily(person){
  var familyInfo = "Name: " + person.firstName + " " + person.lastName + "\n";

  familyInfo += "Parents: " + person.parents + "\n";
  familyInfo += "Curent Spouse: " + person.currentSpouse + "\n";
  console.log("SEARCH RESULTS:" + "\n" + familyInfo);
}




function displayDescendants(person){
    let personInfo = person.id;
    for(let i = 0; i < data.length; i++)
        if(person.id = person[i].parents);
    return person[i];
}

function printDescendantNames(objectArray){
  let listOfNames = [];
  for(let i = 0; i < objectArray.length; i++){
      let personInfo = "Descendant: " + objectArray[i].firstName + " " + objectArray[i].lastName + "\n";
      console.log(personInfo);
      listOfNames.push(personInfo);
  }
  return listOfNames;
}

function findDescendants(array, parent){
  let descendants = [];
  let nonDescendants = [];
  let separateArrays = createParentIdArrays(array);
  let idMatch = searchForParentMatch(separateArrays, parent.id);
  let children = convertIndexToObject(data, idMatch);
  for(let i = 0; i < children.length; i++){
      descendants.push(children[i]);
      let grandchildCheck = findDescendants(data, children[i]);
      if(!Array.isArray(grandchildCheck) || !grandchildCheck.length){
          nonDescendants.push(grandchildCheck);
      }
      else{
          descendants.push(grandchildCheck[0]); 
      }
  }
  return descendants;  
}


function searchForParentMatch(array, value){
  let indexes = [], i = -1, j = -1;
  
  while((i = array[0].indexOf(value, i + 1)) != -1){
      indexes.push(i);
  }
  while((j = array[1].indexOf(value, j + 1)) != -1){
      indexes.push(j);
  }
  return indexes;
}
// function displayPersonDescendants(person){
//   var desInfo = "Name: " + person.firstName + " " + person.lastName + "\n";
//   desInfo += "Descendants: " + person.

// }

// function that prompts and validates user input
// function promptFor(question, valid){
//   do{
//     var response = prompt(question).trim();
//   } while(!response || !valid(response));
//   return response;
// }

// helper function to pass into promptFor to validate yes/no answers

function convertIndexToObject(array, childIndex){
  let objectArray = [];
  for(let i = 0; i < array.length && i < childIndex.length; i++){
          objectArray.push(array[childIndex[i]]);
      }
  return objectArray;
}

function printChildNames(objectArray){
  let listOfNames = [];
  for(let i = 0; i < objectArray.length; i++){
      let personInfo = "Child: " + objectArray[i].firstName + " " + objectArray[i].lastName + "\n";
      console.log(personInfo);
      listOfNames.push(personInfo);
  }
  return listOfNames;
}

function printSingleTraitNames(objectArray){
  let listOfNames = [];
  for(let i = 0; i < objectArray.length; i++){
      let personInfo = objectArray[i].firstName + " " + objectArray[i].lastName;
      listOfNames.push(personInfo);
  }
  return listOfNames;
}
function printDescendantNames(objectArray){
  let listOfNames = [];
  for(let i = 0; i < objectArray.length; i++){
      let personInfo = "Descendant: " + objectArray[i].firstName + " " + objectArray[i].lastName + "\n";
      console.log(personInfo);
      listOfNames.push(personInfo);
  }
  return listOfNames;
}

function findChild(array, parent){
  let separateArrays = createParentIdArrays(array);
  let idMatch = searchForParentMatch(separateArrays, parent.id);
  let children = convertIndexToObject(data, idMatch);
  let childrenNames = (printChildNames(children));
  return childrenNames;
}




function yesNo(input){
  return input.toLowerCase() == "yes" || input.toLowerCase() == "no";
}

// helper function to pass in as default promptFor validation
function chars(input){
  return true; // default validation only
}





