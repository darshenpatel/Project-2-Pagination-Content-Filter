//====================================================//
          //
//====================================================//

//VARIABLES TO HOLD THE PAGE ELEMENTS
const $studentList = $('.student-list');
const $students = $($studentList.children);
const $page = $('.page');
const $headerDiv = $('.page-header h2');

//ELEMENTS CREATED TO ADD TO THE PAGE DYNAMICALLY
const searchDiv = document.createElement('div');
const searchButton = document.createElement('button');
const searchInput = document.createElement('input');
const buttonDiv = document.createElement('div');
const error = document.createElement('p');
  //
  error.textContent = 'No Results Found';
  searchDiv.appendChild(error);

//
const searchArray = [];
const studentArray = [];
let resultsArray = [];
let indiciesArray = [];

//
let search = false;

//====================================================//
          //
//====================================================//

//CREATE A FUNCTION THAT SETS THE INITIAL VIEW
const initialView = () => {
  hide();
  displayStudents($students, 0, 9);
  createSearchBar();
  createButtons($students);
  createArrays();
}

//HIDE THE LIST ITEMS
const hide = () => {
  for(let i = 0; i < $students.length; i++) {  //WHERE CAN I USE jQUERY HERE?
    $students[i].style.display = 'none';
  }
  error.style.display = 'none';
}

//
const displayStudents = (arrayArg, startValue, stopValue) => {
  hide();
  for (let i = startValue; i <= stopValue; i++) {
    if (i < arrayArg.length){
      $students[i].textContent = " ";
    }
  }
}

//
const createSearchBar = () => {
  searchInput.id = 'Search-Input';
  searchInput.setAttribute('placeholder', 'Search For Students');
  searchButton.className = 'Search';
  searchButton.textContent = 'Search';
  searchDiv.appendChild(searchInput);
  searchDiv.appendChild(searchButton);
  $headerDiv.appendChild(searchDiv);
}

//
const createButtons = (studentsPerPage) => {
  removeButtons();
  let getButtons = studentsPerPage.length / 10;
  for (let i = 0; i < getButtons + 1; i++) {
    if(getButtons < i) {
      $page.appendChild(buttonDiv);
    }
    else {
      let newButton = document.createElement('button');
      newButton.className = 'next-page-btn';
      newButton.textContent = i;
      buttonDiv.appendChild(newButton);
    }
  }
}

//
const removeButtons = () => {
  while(buttonDiv.hasChildNodes()) {
    buttonDiv.removeChild(buttonDiv.childNodes[-1]);
  }
}

//
const createArrays = () => {
  for (let i = 0; i < $students.length; i++) {
    studentArray.push($students[i]);
  }
  for (let i = 0; i < $students.length; i++) {
    let info = studentsArray[i].children[0];
    let eachStudent = info.children;
    searchArray.push(eachStudent[i].textContent);
  }
}

//GLOBAL SCOPE OF AN ARRAY THAT WILL SAVE SEARACH RESULTS
const createResults = (array) => {
  for (let i = 0; i < array.length; i++) {
    resultsArray.push(array[i]);
  }
}

//====================================================//
          //
//====================================================//

//
const studentFilter = (search) => {
  return searchArray.filter((el) =>
    el.toLowerCase().indexOf(search.toLowerCase()) > -1
  );
}

//
const compare = () => {
  for(let i = 0; i < resultsArray.length; i++) {
    const findName = ($student) => {
      return $student === resultsArray[i];
    }
    indiciesArray.push(searchArray.findIndex(findName));
  }
}

const displayResults = (startValue, stopValue) => {
  hide();
  for (let j = startValue; j < stopValue; j++) {
    if(j < indiciesArray.length) {
      $students.indiciesArray[j].style.display = '';
    }
    else indiciesArray = [];
  }
}

//====================================================//
          //
//====================================================//

//
$(searchButton).on('click', () => {
  hide();
  removeButtons();
  search = true;
  resultsArray = [];
  searchArray = [];
  let searchText = searchInput.value;
  let results = studentFilter(searchText);
  createResults(results);
    if(searchText === ''){
      initialView();
      search = false;
      return;
    }
    else if (results.length > 0) {
      compare();
      displayResults(0, 9);
      createButtons(resultsArray);
    }
    else {
      error.style.display = '';
    }
});

//
$(buttonDiv).on('click', (e) => {
  let button = e.target;
  let buttonText = button.textContent;
  let $page = parseInt(buttonText);
  let begin = (page * 10) - 10;
  let end = begin + 9;
  if (search) {
    compare();
    displayResults(begin, end);
  }
  else {
    displayStudents(students, begin, end);
  }
});

initialView();
