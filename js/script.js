//ALL STUDENT ITEM LIST ELEMENTS ARE ADDED TOGETHER TO FORM THE $STUDENT VARIABLE
const $student = $(".student-item");

//===================================================================================//
//===================================================================================//

//A FUNCTION FORMULATED TO TAKE IN TWO ARGUMENTS THE PAGE & LIST OF STUDENTS ON THERE
function showPage(page, list) {

  //VARIABLE USED FOR DETERMINING THE DISPLAY
  let theDisplay = page * 10;

  //HIDES ALL STUDENT LIST ELEMENTS
  $($student).hide();

  //LOOP THROUGH FOR A DISPLAYED PAGE OF THE LIST ELEMENTS
  for (let i = 0; i < list.length; i++) {
    if(i >= theDisplay - 10 && i <= theDisplay - 1) {
      $(list[i]).show();
    }
  }
}

//===================================================================================//
//===================================================================================//

//A FUNCTION CREATED FOR THE PAGINATION BUTTONS, WITH THE LIST ELEMENTS LOOPED THROUGH
function appendPages (list) {

  //DETERMINE PAGE NUMBERS FROM THE LENGTH OF OUR LIST OF STUDENTS
  //DIVIDE TO PROVIDE 10 OR THE APPROXIMATE STUDENTS PER PAGE
  const pageNumbers = Math.ceil(list.length / 10);

  //CREATE INITIAL PAGINATION BEFORE APPENDING TO THE DOM
  const $pagination = $("<div class='pagination'></div>");

  //CREATE INITIAL UL BEFORE APPENDING TO THE DOM
  const $ul = $("<ul></ul>")

  //APPEND THE PAGINATION TO THE PAGE
  $(".page").append($pagination);

  //APPEND THE UL TO THE PAGINATION DIV
  $(".pagination").append($ul);

  //LOOP THROUGH PAGE NUMBERS TO CREATE PAGINATION BUTTONS
  for(let i = 1; i <= pageNumbers; i++) {
    if (i === 1) {

      //CREATES THE FIRST 'ACTIVE' PAGINATON BUTTON & APPENDS IT TO THE DOM
      let $singlePage = $("<li><a class='active' href='#'>" + i + "</li>");
      $($ul).append($singlePage);
    }

    //CREATES THE FOLLOWING 'INACTIVE' PAGINATION BUTTONS & APPENDS THEM TO THE DOM
    else {
      //CREATES THE ADDITIONAL PAGINATION BUTTONS & APPENDS THEM TO THE DOM
      let $singlePage = $("<li><a href='#'>" + i + "</li>");
      $($ul).append($singlePage);
    }
  }

  //A CLICK EVENT FOR THE PAGINATION BUTTONS
  $(".pagination a").on('click', function() {
    let $singlePage = $(this).text();

    //CALL THE FUNCTION
    showPage($singlePage, list);

    //ON THE CURRENT PAGINATION ACTIVE, WE NOW REMOVE IT
    $(".pagination a").removeClass("active");
    //THE NEXT EVENT WE CLICK FOR WILL BECOME ACTIVE
    $(this).addClass("active");
  });

  //IF THERE IS ONLY 1 PAGE, THE PAGINATION BUTTONS ARE HIDDEN
  if (pageNumbers === 1) {
    $(".pagination").hide();
  }
}

//===================================================================================//
//===================================================================================//

//A FUNCTION TO SEARCH THE STUDENTS WE HAVE ADDED TO THE PAGES
function searchIt () {
  //SET A STUDENT SEARCH VARIABLE & APPEND THE HTML TO THE DOM
  const $studentSearch = $("<div class='student-search'></div>");
  //SET AN INPUT OPTION & APPEND THE HTML TO THE DOM
  const $input = $("<input id='input' placeholder='Search For Students'>");

  //TO THE PAGE HEADER CLASS, WE APPEND THE STUDENT SEARCH VARIABLE CREATED ABOVE
  $('.page-header').append($studentSearch);
  //TO THE STUDNET SEARCH CLASS, WE APPEND THE INPUT VARIABLE CREATED ABOVE
  $('.student-search').append($input);

  //ON THE INPUT ID WE CREATE A CLICK EVENT
  $('#input').keyup(function() {
    //SET A VARAIBLE TO SEARCH THE VALUE OF THE INPUT ENTERED IN
    let $searchValue = $($input).val().toLowerCase();
    //SET A VARIABLE TO SEE IF THE MATCH WAS FOUND
    let matchFound;
    //SET A VARIABLE TO = FALSE ... WILL BECOME TRUE IF SEARCH TERM = MATCH OF STUDENT LIST
    let match = false;

    //WE HIDE THE STUDENT LIST, THE PAGINATION AND REMOVE THE MESSAGE
    $($student).hide();
    $(".pagination").hide();
    $('.message').remove();

    //LOOPS THROUGH STUDENT LIST
    for (let i = 0; i < $student.length; i++) {
      //STORE STUDENT NAMES IN A NAME VARIABLE
      let $name = $(".student-details h3").eq(i).text(); //can i use student-details or student item?
      //STORE EMAIL IN AN EMAIL VARIABLE
      let $email = $(".email").eq(i).text();

      //IF SEARCH CONTAINS EITHER NAME OR EMAIL
      if ($name.includes($searchValue) || $email.includes($searchValue)) {
        //ADD TO THE MATCHFOUND VARIABLE
        matchFound = $(matchFound).add($($student).eq(i));
        //SEARCH TERM = MATCH OF STUDENT
        match = true;
      }
    }

    //IF NO MATCHES ARE FOUND
    if (match === false) {
      //CREATE A MESSAGE TO SEND TO THE DOM
      let $message = $("<p class = 'message'> Sorry, No Students Found!</p>");
      //THEN APPEND THAT MESSAGE TO THE DOM
      $('.page').append($message);
    }
    else {
      //CALL ON SHOWPAGE & APPENDPAGES FUNCTIONS WITH THE ARGUMENT OF MATCHFOUND
      showPage(1, matchFound);
      appendPages(matchFound);
    }
    //IF SEARCH IS AN EMPTRY STRING
    if ($searchValue === "") {
      //HIDE ANY EXISTING STUDENT LIST OR PAGINATION
      $($student).hide();
      $(".pagination").hide();

      //CALL ON SHOWPAGE & APPENDPAGES FUNCTIONS WITH THE ARGUMENT STUDENTS
      showPage(1, $student);
      appendPages($student);
    }

  });
}

//===================================================================================//
//===================================================================================//

//CALL ON FUNCTIONS WHEN THE PAGE LOADS
showPage(1, $student);
appendPages($student);
searchIt();
